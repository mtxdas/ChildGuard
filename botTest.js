const TelegramBotApi = require('node-telegram-bot-api');
const TelegramBot = TelegramBotApi.default || TelegramBotApi;

const token = '8996153136:AAFAJK1_uf4uPG3oK2zut4n_0bFIgd7rSVA';
const bot = new TelegramBot(token, { polling: true });

console.log("🤖 টেলিগ্রাম বট রানিং... মেসেজের জন্য অপেক্ষা করছে।");

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  console.log(`📩 মেসেজ এসেছে: ${text}`);

  if (text === '/start') {
    bot.sendMessage(chatId, "🛡️ *ChildGuard কন্ট্রোল প্যানেল*\n\nবট সফলভাবে যুক্ত হয়েছে! বাচ্চার ডিভাইস এখন কানেক্টেড।", { parse_mode: 'Markdown' });
  } else {
    bot.sendMessage(chatId, `আপনি পাঠিয়েছেন: ${text}`);
  }
});
