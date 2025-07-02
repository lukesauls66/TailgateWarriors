import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ pictureId: string }> }
) {
  const { pictureId } = await params;

  try {
    const picture = await prisma.picture.findUnique({
      where: { id: pictureId },
    });

    if (!picture) {
      return NextResponse.json({ error: "Picture not found" }, { status: 404 });
    }

    await prisma.picture.delete({
      where: { id: pictureId },
    });
  } catch (error) {
    console.error("Error deleting picture:", error);
    return NextResponse.json(
      { error: "Failed to delete picture" },
      { status: 500 }
    );
  }
}
