import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prismadb";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: "Missing email or password" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const isPasswordValid = await bcrypt.compare(password, user.hashPassword);
  if (!isPasswordValid) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  return NextResponse.json(
    { message: "Login successful", user: { id: user.id, email: user.email } },
    { status: 200 }
  );
}
