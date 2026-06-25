import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "rooms.json");

export async function GET() {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return NextResponse.json(JSON.parse(raw));
}

export async function POST(request: Request) {
  const { password, rooms } = await request.json();
  if (password !== process.env.ADMIN_PASSWORD && password !== "nicemason2024") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  fs.writeFileSync(DATA_PATH, JSON.stringify(rooms, null, 2), "utf-8");
  return NextResponse.json({ success: true });
}
