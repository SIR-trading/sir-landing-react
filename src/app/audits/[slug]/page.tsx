"use client";
import { useEffect, useState } from "react";

export default function AuditPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const [, setPdf] = useState<string | null>(null);
  const [status, setStatus] = useState<"pending" | "success" | "error">(
    "pending",
  );

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await fetch(`/api/audit/${slug}`);
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
  }, [slug]);

  return (
    <div className="h-full min-h-[500px] w-full flex-1 px-5">
      {status === "pending" && <div>Loading...</div>}
      {status === "error" && <div>Error</div>}
      {status === "success" && (
        <iframe
          className="min-h-full w-full rounded-lg"
          src={`/audit/${slug}.pdf`}
        />
      )}
    </div>
  );
}
