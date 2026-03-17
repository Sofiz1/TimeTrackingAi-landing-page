import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

const redis = Redis.fromEnv();

export async function POST() {
  try {
    await redis.incr("downloads_count");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Redis Error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
