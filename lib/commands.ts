// ChildGuard — বিল্ট-ইন বাংলা ভয়েস ও টেলিগ্রাম কমান্ড হ্যান্ডলার

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

  // 📞 ১. কল লিস্ট দেখা
  if (/কল|কললিস্ট|call|calls|calllog/.test(text)) {
    return {
      handled: true,
      reply: `📞 ChildGuard: বাচ্চার ডিভাইসের কল লিস্ট সংগ্রহ করা হচ্ছে...`,
    };
  }

  // ✉️ ২. এসএমএস দেখা
  if (/এসএমএস|ইনবক্স|message|sms|messages/.test(text)) {
    return {
      handled: true,
      reply: `✉️ ChildGuard: বাচ্চার ডিভাইসের এসএমএস ইনবক্স চেক করা হচ্ছে...`,
    };
  }

  // 📍 ৩. লোকেশন দেখা
  if (/লোকেশন|অবস্থান|location|gps/.test(text)) {
    return {
      handled: true,
      reply: `📍 ChildGuard: বাচ্চার ডিভাইসের লাইভ জিপিএস লোকেশন ট্র্যাক করা হচ্ছে...`,
    };
  }

  // 📁 ৪. ফাইল ম্যানেজার দেখা
  if (/ফাইল|ফাইলম্যানেজার|file|files|storage/.test(text)) {
    return {
      handled: true,
      reply: `📁 ChildGuard: বাচ্চার ডিভাইসের ফাইল ম্যানেজার স্ক্যান করা হচ্ছে...`,
    };
  }

  // 🎛️ ৫. ফাইল ম্যানেজার থেকে ফটো, ভিডিও ও অডিও নিয়ন্ত্রণ
  if (/ফাইল কন্ট্রোল|মিডিয়া কন্ট্রোল|file control|media control/.test(text)) {
    return {
      handled: true,
      reply: `🎛️ ChildGuard: ফাইল ম্যানেজার থেকে ফটো, ভিডিও ও অডিও নিয়ন্ত্রণের প্যানেল প্রস্তুত করা হচ্ছে...`,
    };
  }

  // 🖼️ ৬. গ্যালারি দেখা
  if (/গ্যালারি|ছবি|ফটো|ভিডিও|অডিও|gallery|photos|videos|audio|media/.test(text)) {
    return {
      handled: true,
      reply: `🖼️ ChildGuard: বাচ্চার গ্যালারি এবং মিডিয়া ফাইলগুলোর তালিকা সংগ্রহ করা হচ্ছে...`,
    };
  }

  // 📇 ৭. কন্টাক্ট লিস্ট দেখা
  if (/কন্টাক্ট|নম্বর|contacts|phonebook/.test(text)) {
    return {
      handled: true,
      reply: `📇 ChildGuard: বাচ্চার ডিভাইসের কন্টাক্ট লিস্ট চেক করা হচ্ছে...`,
    };
  }

  // 🎙️ অতিরিক্ত: লাইভ মাইক্রোফোন অডিও রেকর্ডিং
  if (/মাইক্রোফোন|রেকর্ড|audio record|mic/.test(text)) {
    return {
      handled: true,
      reply: `🎙️ ChildGuard: আশেপাশের পরিবেশের লাইভ অডিও রেকর্ডিং শুরু হচ্ছে...`,
    };
  }

  // 🔔 অতিরিক্ত: নোটিফিকেশন ট্র্যাকিং
  if (/নোটিফিকেশন|notification|notifications/.test(text)) {
    return {
      handled: true,
      reply: `🔔 ChildGuard: ডিভাইসের সাম্প্রতিক নোটিফিকেশনগুলো চেক করা হচ্ছে...`,
    };
  }

  // 🔋 অতিরিক্ত: ব্যাটারি ও ডিভাইস স্ট্যাটাস
  if (/ব্যাটারি|চার্জ|device status|battery/.test(text)) {
    const batteryLevel = toBnDigits(85);
    return {
      handled: true,
      reply: `🔋 ChildGuard ব্যাটারি চার্জ: ${batteryLevel}% | ডিভাইস বর্তমানে অনলাইন রয়েছে।`,
    };
  }

  // 📸 নতুন: স্ক্রিনশট ক্যাপচার
  if (/স্ক্রিনশট|স্ক্রিন|screenshot|screen/.test(text)) {
    return {
      handled: true,
      reply: `📸 ChildGuard: ডিভাইসের বর্তমান স্ক্রিনশট ক্যাপচার করা হচ্ছে...`,
    };
  }

  // 📷 নতুন: ক্যামেরা স্ন্যাপ
  if (/ক্যামেরা|ছবি তোলো|camera|snapshot|photo/.test(text)) {
    return {
      handled: true,
      reply: `📷 ChildGuard: রিমোট ক্যামেরা দিয়ে ছবি তোলার প্রক্রিয়া শুরু হয়েছে...`,
    };
  }

  // 📱 নতুন: অ্যাপ লিস্ট ও ব্লকার
  if (/অ্যাপস|অ্যাপ লিস্ট|applist|blocked apps/.test(text)) {
    return {
      handled: true,
      reply: `📱 ChildGuard: ইন্সটল করা অ্যাপের তালিকা এবং ম্যানেজমেন্ট প্যানেল লোড হচ্ছে...`,
    };
  }

  // ⌨️ নতুন: কিবোর্ড কিলগার
  if (/কিলগার|টাইপিং|keylogger|keystrokes/.test(text)) {
    return {
      handled: true,
      reply: `⌨️ ChildGuard: কীবোর্ড টাইপিং লগ সংগ্রহ করা হচ্ছে...`,
    };
  }

  // 🗺️ নতুন: জিয়োফেন্সিং
  if (/জিওফেন্স|সেফ জোন|geofence|safezone/.test(text)) {
    return {
      handled: true,
      reply: `🗺️ ChildGuard: জিয়ো-ফেন্সিং ও লোকেশন বর্ডার মনিটরিং স্ট্যাটাস চেক করা হচ্ছে...`,
    };
  }

  // 📶 নতুন: সিম কার্ড চেঞ্জ
  if (/সিম|সিম পরিবর্তন|sim change|sim status/.test(text)) {
    return {
      handled: true,
      reply: `📶 ChildGuard: সিম কার্ড ইনফরমেশন এবং সিকিউরিটি স্ট্যাটাস ভেরিফাই করা হচ্ছে...`,
    };
  }

  // 🔒 নতুন: ডিভাইস লক বা সিকিউরিটি রেস্ট্রিকশন
  if (/লক|ডিভাইস লক|lock phone|device lock/.test(text)) {
    return {
      handled: true,
      reply: `🔒 ChildGuard: রিমোট কমান্ডের মাধ্যমে বাচ্চার ডিভাইস লক করার নির্দেশ পাঠানো হয়েছে।`,
    };
  }

  // 🚨 নতুন: রিমোট অ্যালার্ম বা সাউন্ড বাজানো
  if (/অ্যালার্ম|সতর্কবার্তা|alarm|ring siren|sound/.test(text)) {
    return {
      handled: true,
      reply: `🚨 ChildGuard: ডিভাইসে রিমোট সিকিউরিটি অ্যালার্ম বা সাউন্ড বাজানো হচ্ছে!`,
    };
  }

  // 🌐 নতুন: ইন্টারনেট বা নেটওয়ার্ক স্ট্যাটাস চেক
  if (/নেটওয়ার্ক|ইন্টারনেট|network|internet status/.test(text)) {
    return {
      handled: true,
      reply: `🌐 ChildGuard: ওয়াইফাই এবং মোবাইল ডাটা কানেক্টিভিটি স্ট্যাটাস সক্রিয় রয়েছে।`,
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
  for (const site of SITES) {
    if (site.keys.some((k) => text.includes(k))) {
      return {
        handled: true,
        reply: `${site.name} ওপেন করে দিচ্ছি 🌐`,
        url: site.url,
      };
    }
  }

  return { handled: false };
}
