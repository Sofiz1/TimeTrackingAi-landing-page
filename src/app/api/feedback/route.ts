import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

const redis = Redis.fromEnv();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const feedbackId = `feedback:${Date.now()}`;
    await redis.hset(feedbackId, { name, email, message, timestamp: new Date().toISOString() });
    await redis.lpush("feedback_list", feedbackId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Redis Error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
