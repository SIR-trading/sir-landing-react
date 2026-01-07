"use client";
import { useEffect, useState } from "react";

export default function AuditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [slug, setSlug] = useState<string | null>(null);
  const [status, setStatus] = useState<"pending" | "success" | "error">("pending");

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const { slug } = await params;
        const response = await fetch(`/api/audit/${slug}`);
        if (!response.ok) {
          throw new Error("Failed to fetch PDF");
        }
        setSlug(slug);
        setStatus("success");
      } catch (error) {
        console.error("Error fetching PDF:", error);
        setStatus("error");
      }
    };

    fetchPdf().catch((e) => console.log(e));
  }, [params]);

  if (status === "pending") {
    return (
      <div className="flex h-[600px] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-accent/20 border-t-accent" />
          <p className="text-text-secondary">Loading audit report...</p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex h-[600px] items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
            <svg className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-red-400">Failed to load audit report</p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg border border-accent/50 bg-accent/10 px-4 py-2 text-sm text-accent transition-all duration-300 hover:bg-accent/20"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <iframe
      className="h-[700px] w-full md:h-[800px]"
      src={`/audit/${slug}.pdf`}
      title="Audit Report"
    />
  );
}
