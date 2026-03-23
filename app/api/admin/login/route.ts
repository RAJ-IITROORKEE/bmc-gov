import { NextResponse } from "next/server";

interface LoginBody {
  username?: string;
  password?: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LoginBody;

    const username = body.username?.trim() ?? "";
    const password = body.password ?? "";

    const correctUsername = process.env.ADMIN_USERNAME || "admin";
    const correctPassword = process.env.ADMIN_PASSWORD || "bmc@2024";

    const success =
      username === correctUsername.trim() && password === correctPassword;

    if (!success) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
