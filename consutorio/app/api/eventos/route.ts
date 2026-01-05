import { NextRequest, NextResponse } from "next/server";
import { eventos } from "@/app/data";

export async function GET() {
  return NextResponse.json(eventos);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  eventos.push({ ...data, id: Date.now().toString() });
  return NextResponse.json({ success: true });
}
