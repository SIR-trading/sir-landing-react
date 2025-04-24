"use client";
import { useEffect, useState } from "react";

export default function AuditPage() {
  const [, setPdf] = useState<string | null>(null);
  const [status, setStatus] = useState<"pending" | "success" | "error">(
    "pending",
  );

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await fetch("/api/audit");
        if (!response.ok) {
          throw new Error("Failed to fetch PDF");
        }
        const data = await response.text();
        setPdf(data);
        setStatus("success");
      } catch (error) {
        console.error("Error fetching PDF:", error);
        setStatus("error");
      }
    };

    fetchPdf()
      .then((r) => r)
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="bg-black-russian-950 container flex h-[calc(90vh-36px)] min-h-[500px] w-full flex-col items-center justify-center gap-12 rounded-lg">
      {status === "pending" && <div>Loading...</div>}
      {status === "error" && <div>Error</div>}
      {status === "success" && (
        <div className="h-[calc(90vh-36px)] min-h-[500px] w-full px-[20px] py-[20px]">
          <iframe
            className="min-h-full w-full rounded-lg"
            src="/SIR_Audit_Report.pdf"
          />
        </div>
      )}
    </div>
  );
}
