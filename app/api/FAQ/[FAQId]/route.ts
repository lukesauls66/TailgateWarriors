import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ FAQId: string }> }
) {
  const { FAQId } = await params;

  try {
    const { question, answer } = await req.json();

    if (!question || !answer) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const updatedFAQ = await prisma.fAQ.update({
      where: { id: FAQId },
      data: { question, answer },
    });

    return NextResponse.json(updatedFAQ, { status: 200 });
  } catch (error) {
    console.error("Error updating FAQ:", error);
    return NextResponse.json(
      { error: "Failed to update FAQ" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ FAQId: string }> }
) {
  const { FAQId } = await params;

  try {
    const faq = await prisma.fAQ.findUnique({
      where: { id: FAQId },
    });

    if (!faq) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
    }

    await prisma.fAQ.delete({
      where: { id: FAQId },
    });

    return NextResponse.json(
      { message: "FAQ deleted successfully" },
      { status: 204 }
    );
  } catch (error) {
    console.error("Error deleting FAQ:", error);
    return NextResponse.json(
      { error: "Failed to delete FAQ" },
      { status: 500 }
    );
  }
}
