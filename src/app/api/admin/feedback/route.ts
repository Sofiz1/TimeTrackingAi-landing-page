import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

const redis = Redis.fromEnv();

export async function GET(req: Request) {
  // Simple check for basic security (use a better method in real production)
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (token !== "timetrackingai-admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const feedbackIds = await redis.lrange("feedback_list", 0, -1);
    const feedbackData = await Promise.all(
      feedbackIds.map((id) => redis.hgetall(id))
    );

    return NextResponse.json({ feedback: feedbackData });
  } catch (error) {
    console.error("Redis Error:", error);
    return NextResponse.json({ error: "Failed to fetch feedback" }, { status: 500 });
  }
}
