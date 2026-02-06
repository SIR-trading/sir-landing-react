import AuditLayoutClient from "./AuditLayoutClient";

export const metadata = {
  title: "Security Audits | SIR Trading",
  description: "Independent security audit reports for the SIR protocol.",
};

export default function AuditLayout({ children }: { children: React.ReactNode }) {
  return <AuditLayoutClient>{children}</AuditLayoutClient>;
}
