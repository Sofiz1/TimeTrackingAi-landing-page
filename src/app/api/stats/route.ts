import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

const redis = Redis.fromEnv();

export async function GET() {
  try {
    const downloads = await redis.get<number>("downloads_count") || 0;
    return NextResponse.json({ downloads });
  } catch (error) {
    console.error("Redis Error:", error);
    return NextResponse.json({ downloads: 0 });
  }
}
