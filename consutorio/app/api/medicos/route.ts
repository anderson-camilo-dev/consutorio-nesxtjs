import { NextRequest, NextResponse } from "next/server";
import { medicos } from "@/app/data";

export async function GET() {
  return NextResponse.json(medicos);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  medicos.push({ ...data, id: Date.now().toString() });
  return NextResponse.json({ success: true });
}
