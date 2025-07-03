import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ GameId: string }> }
) {
  const { GameId } = await params;

  try {
    const { date, location, opponentId } = await req.json();

    if (!date || !location || !opponentId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const updatedGame = await prisma.game.update({
      where: { id: GameId },
      data: { date, location, opponentId },
    });

    return NextResponse.json(updatedGame, { status: 200 });
  } catch (error) {
    console.error("Error updating game:", error);
    return NextResponse.json(
      { error: "Failed to update game" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ GameId: string }> }
) {
  const { GameId } = await params;

  try {
    const game = await prisma.game.findUnique({
      where: { id: GameId },
    });

    if (!game) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    await prisma.game.delete({
      where: { id: GameId },
    });

    return NextResponse.json(
      { message: "Game deleted successfully" },
      { status: 204 }
    );
  } catch (error) {
    console.error("Error deleting game:", error);
    return NextResponse.json(
      { error: "Failed to delete game" },
      { status: 500 }
    );
  }
}
