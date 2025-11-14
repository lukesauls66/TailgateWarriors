import { NextRequest, NextResponse } from "next/server";
import { uploadFileToS3, isValidFileType, isValidFileSize } from "@/lib/s3";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    // Validate files
    const invalidFiles: string[] = [];
    const oversizedFiles: string[] = [];

    for (const file of files) {
      if (!isValidFileType(file)) {
        invalidFiles.push(file.name);
      }
      if (!isValidFileSize(file, 10)) {
        // 10MB limit
        oversizedFiles.push(file.name);
      }
    }

    if (invalidFiles.length > 0) {
      return NextResponse.json(
        {
          error: `Invalid file types: ${invalidFiles.join(
            ", "
          )}. Allowed types: Images (JPEG, PNG, GIF, WebP), PDF, Word documents, Excel files, and text files.`,
        },
        { status: 400 }
      );
    }

    if (oversizedFiles.length > 0) {
      return NextResponse.json(
        {
          error: `Files too large: ${oversizedFiles.join(
            ", "
          )}. Maximum size is 10MB per file.`,
        },
        { status: 400 }
      );
    }

    // Upload files to S3
    const uploadPromises = files.map((file) => uploadFileToS3(file));
    const uploadResults = await Promise.all(uploadPromises);

    return NextResponse.json(
      {
        message: "Files uploaded successfully",
        files: uploadResults,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload files" },
      { status: 500 }
    );
  }
}
