import prisma from "@/lib/prismadb";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  try {
    const games = await prisma.game.findMany({
      include: {
        opponent: true,
      },
      orderBy: {
        date: "asc",
      },
    });
    return NextResponse.json(games, { status: 200 });
  } catch (error) {
    console.error("Error fetching games:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch games",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { date, location, opponentId } = await req.json();

    if (!date || !location || !opponentId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newGame = await prisma.game.create({
      data: {
        date,
        location,
        opponentId,
      },
      include: {
        opponent: true,
      },
    });

    return NextResponse.json({ newGame }, { status: 201 });
  } catch (error) {
    console.error("Error creating game:", error);
    return NextResponse.json(
      {
        error: "Failed to create game",
      },
      { status: 500 }
    );
  }
}
