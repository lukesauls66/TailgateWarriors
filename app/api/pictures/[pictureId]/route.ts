import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

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

    return NextResponse.json(
      { message: "Picture deleted successfully" },
      { status: 204 }
    );
  } catch (error) {
    console.error("Error deleting picture:", error);
    return NextResponse.json(
      { error: "Failed to delete picture" },
      { status: 500 }
    );
  }
}
