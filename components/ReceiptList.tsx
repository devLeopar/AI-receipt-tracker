"use client";

import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useUser } from "@clerk/nextjs";
import { ChevronRight, FileText } from "lucide-react";
export default function ReceiptList() {
  const { user } = useUser();
  const receipts = useQuery(api.receipts.getReceipts, {
    userId: user?.id || "",
  });

  if (!user) {
    return (
      <div className="w-full p-8 text-center">
        <p className="text-gray-600">Please sign in to view your receipts.</p>
      </div>
    );
  }

  if (!receipts) {
    return (
      <div className="w-full p-8 text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading receipts...</p>
      </div>
    );
  }

  if (receipts.length === 0) {
    return (
      <div className="w-full p-8 text-center border border-gray-200 rounded-lg bg-gray-50">
        <p className="text-gray-600">No receipts have been uploaded yet.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">Your Receipts</h2>
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]"></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Uploaded</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[40px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {receipts.map((receipt: Doc<"receipts">) => (
              <TableRow
                key={receipt._id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() =>
                  (window.location.href = `/receipt/${receipt._id}`)
                }
              >
                <TableCell className="py-2">
                  <FileText className="h-6 w-6 text-red-500" />
                </TableCell>
                <TableCell className="font-medium">
                  {receipt.fileDisplayName || receipt.fileName}
                </TableCell>
                <TableCell>
                  {new Date(receipt.uploadedAt).toLocaleString()}
                </TableCell>
                <TableCell>{formatFileSize(receipt.size)}</TableCell>
                <TableCell>
                  {receipt.transactionAmount
                    ? `${receipt.transactionAmount} ${receipt.currency || ""}`
                    : "-"}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      receipt.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : receipt.status === "processed"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {receipt.status.charAt(0).toUpperCase() +
                      receipt.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <ChevronRight className="h-5 w-5 text-gray-400 ml-auto" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// Helper function to format file size
function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
