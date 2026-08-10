import { NextResponse } from 'next/server';
import { sendTelegramMessage } from '@/lib/telegramService';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // যদি ইউজার থেকে কোনো মেসেজ বা কমান্ড আসে
    if (body.message && body.message.text) {
      const text = body.message.text;

      if (text === '/start') {
        await sendTelegramMessage("🛡️ *ChildGuard কন্ট্রোল প্যানেল*\n\nবট সফলভাবে যুক্ত হয়েছে! বাচ্চার ডিভাইস এখন আপনার সাথে কানেক্টেড।");
      } else if (text === '/status') {
        await sendTelegramMessage("🟢 ChildGuard সার্ভিস ব্যাকগ্রাউন্ডে চালু আছে।");
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
