// app/api/audit/route.ts
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  try {
    // Get the path to the PDF file in the public folder
    const filePath = path.join(process.cwd(), "public", "SIR_Audit_Report.pdf");

    // Read the file as buffer
    const pdfBuffer = await fs.readFile(filePath);

    // Convert buffer to base64
    const base64Data = pdfBuffer.toString("base64");

    // Return the base64 data
    return new NextResponse(base64Data, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    console.error("Error reading PDF file:", error);
    return new NextResponse(JSON.stringify({ error: "PDF file not found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
