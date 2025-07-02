import prisma from "@/lib/prismadb";
import { NextResponse, NextRequest } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export async function GET() {
  try {
    const pictures = await prisma.picture.findMany();
    return NextResponse.json(pictures);
  } catch (error) {
    console.error("Error fetching pictures:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch pictures",
      },
      { status: 500 }
    );
  }
}

const bucketName = process.env.AWS_BUCKET_NAME;
const bucketRegion = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

if (!bucketName || !bucketRegion || !accessKeyId || !secretAccessKey) {
  throw new Error("Missing AWS configuration in environment variables");
}

const s3 = new S3Client({
  region: bucketRegion,
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const image = (formData.get("image") as File) || null;
    const category = formData.get("category") as string;
    const userId = formData.get("userId") as string;

    if (!image || !category || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (category !== "Home" && category !== "Away") {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    const fileKey = `images/${Date.now()}_${image.name}`;

    const uploadParams = {
      Bucket: bucketName,
      Key: fileKey,
      Body: new Uint8Array(await image.arrayBuffer()),
      ContentType: image.type,
    };

    const uploadCommand = new PutObjectCommand(uploadParams);
    await s3.send(uploadCommand);

    const imageUrl = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${fileKey}`;

    await prisma.picture.create({
      data: {
        url: imageUrl,
        userId: userId,
        category: category,
      },
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
