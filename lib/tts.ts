// ক্ষ্যাপার মিষ্টি কণ্ঠ — Gemini TTS (ফ্রি API), ব্যর্থ হলে ব্রাউজার ভয়েসে fallback

let cooldownUntil = 0;

const TTS_MODELS = ["gemini-2.5-flash-preview-tts", "gemini-2.5-pro-preview-tts"];
let workingTtsModel: string | null = null;

// PCM (16-bit, 24kHz, mono) বাইট ফেরত দেয় — AudioContext দিয়ে বাজানোর জন্য
export async function geminiTtsPcm(apiKey: string, text: string): Promise<Uint8Array | null> {
  if (Date.now() < cooldownUntil) return null;
  const order = workingTtsModel ? [workingTtsModel, ...TTS_MODELS.filter((m) => m !== workingTtsModel)] : TTS_MODELS;

  for (const model of order) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 8000);
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: ctrl.signal,
          body: JSON.stringify({
            contents: [{ parts: [{ text: `অল্পবয়সী কিশোরী মেয়ের খুব মিষ্টি, প্রাণবন্ত ও নরম কণ্ঠে বাংলায় বলো: ${text}` }] }],
            generationConfig: {
              responseModalities: ["AUDIO"],
              speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: "Leda" } } },
            },
          }),
        }
      );
      clearTimeout(timer);
      if (!res.ok) {
        if (res.status === 404) continue; // মডেল নেই — পরেরটা
        if (res.status === 429) {
          cooldownUntil = Date.now() + 5 * 60 * 1000;
          return null;
        }
        continue;
      }
      const data = await res.json();
      const b64: string | undefined = data?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (!b64) continue;
      workingTtsModel = model;
      const bin = atob(b64);
      const bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      return bytes;
    } catch {
      clearTimeout(timer);
      // টাইমআউট/নেট এরর — পরের মডেল
    }
  }
  cooldownUntil = Date.now() + 60 * 1000;
  return null;
}
