import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await kv.incr("downloads_count");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("KV Error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
