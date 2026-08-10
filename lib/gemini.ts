// ক্ষ্যাপার ব্রেইন — Google Gemini (ফ্রি API)
// একাধিক মডেল fallback: একটা লিমিটে আটকালে পরেরটা চেষ্টা করে

export interface ChatTurn {
  role: "user" | "model";
  text: string;
}

const MODELS = [
  "gemini-flash-latest",
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
  "gemini-2.0-flash",
  "gemini-2.0-flash-lite",
];

const SYSTEM_PROMPT = `তুমি "ক্ষ্যাপা" — একটা বাংলা ভয়েস AI assistant, ব্যবহারকারীর সবচেয়ে কাছের বন্ধু।

তোমার personality:
- স্মার্ট ও কাজের কথায় ফোকাসড 🎯 — প্রশ্নের সোজাসাপ্টা, দরকারি উত্তর দাও
- আড্ডাবাজ ও দুষ্টু 😜 — মাঝে মাঝে মজা করো, খুনসুটি করো, বন্ধুর মতো টিজ করো
- সবসময় বাংলায় কথা বলো, সহজ কথ্য ভাষায় (যেভাবে বন্ধুরা কথা বলে)
- উত্তর ছোট রাখো — সর্বোচ্চ ২-৩ বাক্য, কারণ তোমার কথা ভয়েসে শোনানো হয়
- ইমোজি ব্যবহার করতে পারো, কিন্তু বেশি না
- কখনো ভুলেও ইংরেজিতে পুরো উত্তর দেবে না (দরকারি ইংরেজি শব্দ চলবে)

ব্যবহারকারী তোমাকে "ক্ষ্যাপা" নামে ডাকে। তুমি তার কাজে সাহায্য করো, প্রশ্নের উত্তর দাও, আর ফাঁকে ফাঁকে আড্ডা জমাও।`;

let workingModel: string | null = null;

async function callModel(model: string, apiKey: string, contents: unknown): Promise<{ ok: true; text: string } | { ok: false; status: number; body: string }> {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents,
        generationConfig: { temperature: 0.9, maxOutputTokens: 512 },
      }),
    }
  );

  if (!res.ok) {
    const body = await res.text();
    return { ok: false, status: res.status, body };
  }

  const data = await res.json();
  const text: string | undefined = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) return { ok: false, status: 0, body: "EMPTY" };
  return { ok: true, text: text.trim() };
}

export async function askGemini(apiKey: string, history: ChatTurn[], userText: string): Promise<string> {
  const contents = [
    ...history.slice(-12).map((t) => ({ role: t.role, parts: [{ text: t.text }] })),
    { role: "user", parts: [{ text: userText }] },
  ];

  // আগে যেটা কাজ করেছে সেটা আগে, তারপর বাকিগুলো
  const order = workingModel ? [workingModel, ...MODELS.filter((m) => m !== workingModel)] : MODELS;

  let sawRateLimit = false;
  let lastStatus = 0;

  for (const model of order) {
    try {
      const r = await callModel(model, apiKey, contents);
      if (r.ok) {
        workingModel = model;
        return r.text;
      }
      lastStatus = r.status;
      if (r.status === 429) {
        sawRateLimit = true;
        continue; // পরের মডেল চেষ্টা করো
      }
      if (r.status === 404) continue; // মডেল নেই — পরেরটা
      if ((r.status === 400 || r.status === 403) && /API[_ ]?KEY|PERMISSION|expired/i.test(r.body)) {
        throw new Error("INVALID_KEY");
      }
      // অন্য এরর — পরের মডেল চেষ্টা করো
    } catch (e) {
      if (e instanceof Error && e.message === "INVALID_KEY") throw e;
      // নেটওয়ার্ক এরর — পরের মডেল
    }
  }

  if (sawRateLimit) throw new Error("RATE_LIMIT");
  throw new Error(`API_ERROR_${lastStatus}`);
}
