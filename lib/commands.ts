// ক্ষ্যাপা — বিল্ট-ইন বাংলা ভয়েস কমান্ড হ্যান্ডলার

export interface CommandResult {
  handled: boolean;
  reply?: string;
  url?: string;
}

const SITES: { keys: string[]; name: string; url: string }[] = [
  { keys: ["ইউটিউব", "youtube"], name: "ইউটিউব", url: "https://www.youtube.com" },
  { keys: ["ফেসবুক", "facebook"], name: "ফেসবুক", url: "https://www.facebook.com" },
  { keys: ["গুগল", "google"], name: "গুগল", url: "https://www.google.com" },
  { keys: ["জিমেইল", "ইমেইল", "gmail"], name: "জিমেইল", url: "https://mail.google.com" },
  { keys: ["হোয়াটসঅ্যাপ", "whatsapp"], name: "হোয়াটসঅ্যাপ", url: "https://web.whatsapp.com" },
  { keys: ["ইনস্টাগ্রাম", "instagram"], name: "ইনস্টাগ্রাম", url: "https://www.instagram.com" },
  { keys: ["টিকটক", "tiktok"], name: "টিকটক", url: "https://www.tiktok.com" },
  { keys: ["ম্যাপ", "মানচিত্র", "maps"], name: "গুগল ম্যাপ", url: "https://maps.google.com" },
  { keys: ["উইকিপিডিয়া", "wikipedia"], name: "উইকিপিডিয়া", url: "https://bn.wikipedia.org" },
  { keys: ["ক্রিকইনফো", "cricinfo"], name: "ক্রিকইনফো", url: "https://www.espncricinfo.com" },
];

const BN_DAYS = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];
const BN_MONTHS = [
  "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
  "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর",
];

function toBnDigits(n: number | string): string {
  const map: Record<string, string> = { "0": "০", "1": "১", "2": "২", "3": "৩", "4": "৪", "5": "৫", "6": "৬", "7": "৭", "8": "৮", "9": "৯" };
  return String(n).replace(/[0-9]/g, (d) => map[d]);
}

export function handleCommand(rawText: string): CommandResult {
  const text = rawText.trim().toLowerCase();

  // ⏰ সময়
  if (/সময়|কয়টা বাজে|কটা বাজে|টাইম/.test(text)) {
    const now = new Date();
    let h = now.getHours();
    const m = now.getMinutes();
    const part = h < 4 ? "রাত" : h < 12 ? "সকাল" : h < 16 ? "দুপুর" : h < 18 ? "বিকেল" : h < 20 ? "সন্ধ্যা" : "রাত";
    h = h % 12 === 0 ? 12 : h % 12;
    return { handled: true, reply: `এখন ${part} ${toBnDigits(h)}টা ${m > 0 ? `বেজে ${toBnDigits(m)} মিনিট` : ""} ⏰` };
  }

  // 📅 তারিখ / বার
  if (/তারিখ|কি বার|কী বার|কোন বার|আজকে.*দিন/.test(text)) {
    const now = new Date();
    return {
      handled: true,
      reply: `আজ ${BN_DAYS[now.getDay()]}, ${toBnDigits(now.getDate())} ${BN_MONTHS[now.getMonth()]} ${toBnDigits(now.getFullYear())} 📅`,
    };
  }

  // 🎵 ইউটিউবে গান/ভিডিও সার্চ
  const ytMatch = text.match(/ইউটিউবে?\s+(.+?)\s*(গান|ভিডিও)?\s*(চালাও|ছাড়ো|দেখাও|প্লে করো|সার্চ করো)/);
  if (ytMatch && ytMatch[1]) {
    const q = ytMatch[1].trim();
    return {
      handled: true,
      reply: `ইউটিউবে "${q}" খুঁজে দিচ্ছি, উপভোগ করো! 🎵`,
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`,
    };
  }

  // 🔍 গুগল সার্চ
  const searchMatch =
    text.match(/(?:গুগলে?\s+)?(.+?)\s*(?:সার্চ করো|সার্চ দাও|খুঁজে দাও|খোঁজো|খুঁজো)/) ||
    text.match(/সার্চ করো\s+(.+)/);
  if (searchMatch && searchMatch[1]) {
    const q = searchMatch[1].replace(/গুগলে?/g, "").trim();
    if (q.length > 1) {
      return {
        handled: true,
        reply: `"${q}" নিয়ে সার্চ করে দিচ্ছি 🔍`,
        url: `https://www.google.com/search?q=${encodeURIComponent(q)}`,
      };
    }
  }

  // 🌐 সাইট খোলা
  if (/খোলো|খুলো|ওপেন|যাও|চালু করো/.test(text)) {
    for (const site of SITES) {
      if (site.keys.some((k) => text.includes(k))) {
        return { handled: true, reply: `${site.name} খুলে দিচ্ছি! 🚀`, url: site.url };
      }
    }
  }

  return { handled: false };
}
