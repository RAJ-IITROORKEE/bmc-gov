import { createHash } from "node:crypto";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function getCloudinaryConfig() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const folder = process.env.CLOUDINARY_PDF_FOLDER || "bmc/documents";

  if (!cloudName || !apiKey || !apiSecret) {
    return null;
  }

  return { cloudName, apiKey, apiSecret, folder };
}

export async function POST(request: Request) {
  try {
    const config = getCloudinaryConfig();

    if (!config) {
      return NextResponse.json(
        {
          message:
            "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.",
        },
        { status: 500 },
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ message: "PDF file is required" }, { status: 400 });
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json({ message: "Only PDF files are allowed" }, { status: 400 });
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const payload = `folder=${config.folder}&timestamp=${timestamp}${config.apiSecret}`;
    const signature = createHash("sha1").update(payload).digest("hex");

    const uploadForm = new FormData();
    uploadForm.append("file", file);
    uploadForm.append("api_key", config.apiKey);
    uploadForm.append("timestamp", String(timestamp));
    uploadForm.append("folder", config.folder);
    uploadForm.append("signature", signature);

    const cloudinaryResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${config.cloudName}/raw/upload`,
      {
        method: "POST",
        body: uploadForm,
      },
    );

    const uploadResult = (await cloudinaryResponse.json()) as {
      secure_url?: string;
      public_id?: string;
      error?: { message?: string };
    };

    if (!cloudinaryResponse.ok || !uploadResult.secure_url) {
      return NextResponse.json(
        {
          message: uploadResult.error?.message || "Failed to upload PDF to Cloudinary",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      fileUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    });
  } catch {
    return NextResponse.json({ message: "Failed to upload PDF" }, { status: 500 });
  }
}
