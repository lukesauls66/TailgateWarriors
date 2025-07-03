import prisma from "@/lib/prismadb";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  try {
    const faqs = await prisma.fAQ.findMany();
    return NextResponse.json(faqs, { status: 200 });
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch FAQs",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { question, answer } = await req.json();

    if (!question || !answer) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await prisma.fAQ.create({
      data: {
        question,
        answer,
      },
    });

    return NextResponse.json(
      { message: "FAQ created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating FAQ:", error);
    return NextResponse.json(
      {
        error: "Failed to create FAQ",
      },
      { status: 500 }
    );
  }
}
