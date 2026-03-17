import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const feedbackId = `feedback:${Date.now()}`;
    await kv.hset(feedbackId, { name, email, message, timestamp: new Date().toISOString() });
    await kv.lpush("feedback_list", feedbackId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("KV Error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
