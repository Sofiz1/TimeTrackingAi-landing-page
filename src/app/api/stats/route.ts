import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const downloads = await kv.get<number>("downloads_count") || 0;
    return NextResponse.json({ downloads });
  } catch (error) {
    console.error("KV Error:", error);
    return NextResponse.json({ downloads: 0 });
  }
}
