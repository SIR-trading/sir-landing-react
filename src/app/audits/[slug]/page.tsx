import AuditDetailClient from "./AuditDetailClient";

interface AuditPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: AuditPageProps) {
  const { slug } = await params;
  const title = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: `${title} Audit | SIR Trading`,
    description: `Security audit report: ${title}`,
  };
}

export default async function AuditPage({ params }: AuditPageProps) {
  const { slug } = await params;
  return <AuditDetailClient slug={slug} />;
}
