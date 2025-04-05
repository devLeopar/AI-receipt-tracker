"use server";

import { api } from "@/convex/_generated/api";
import convex from "@/lib/convexClient";
import { currentUser } from "@clerk/nextjs/server";
import { getFileDownloadUrl } from "./getFileDownloadUrl";
import { inngest } from "@/inngest/client";
import  events  from "@/inngest/constants";

export async function uploadPDF(formData: FormData) {
  const user = await currentUser();
  if (!user) {
    return {
      success: false,
      error: "Unauthorized",
    };
  }

  try {
    const file = formData.get("file") as File;

    if (!file) {
      return {
        success: false,
        error: "No file uploaded",
      };
    }

    // Check if the file is a PDF
    if (
      !file.type.includes("pdf") &&
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
      return {
        success: false,
        error: "Only PDF files are allowed",
      };
    }

    // Get upload URL from Convex
    const uploadUrl = await convex.mutation(api.receipts.generateUploadUrl, {});

    // Convert file to arrayBuffer for fetch API
    const arrayBuffer = await file.arrayBuffer();

    // Upload the file to Convex storage
    const uploadResponse = await fetch(uploadUrl, {
      method: "POST",
      body: new Uint8Array(arrayBuffer),
      headers: {
        "Content-Type": file.type,
      },
    });

    if (!uploadResponse.ok) {
      throw new Error(
        `Failed to upload file to Convex storage: ${uploadResponse.statusText}`,
      );
    }

    // Get the storage ID from the response
    const { storageId } = await uploadResponse.json();

    const receiptId = await convex.mutation(api.receipts.storeReceipt, {
      userId: user.id,
      fileId: storageId,
      fileName: file.name,
      size: file.size,
      mimeType: file.type,
    });

    // Generate the file URL
    const fileUrl = await getFileDownloadUrl(storageId);

    await inngest.send({
      name: events.EXTRACT_DATA_FROM_PDF_AND_SAVE_TO_DATABASE,
      data: {
        url: fileUrl.downloadUrl,
        receiptId,
      },
    });

    return {
      success: true,
      data: {
        receiptId,
        fileName: file.name,
      },
    };
  } catch (error) {
    console.error("Server action upload error", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unknown error occured server action upload process!",
    };
  }
}
