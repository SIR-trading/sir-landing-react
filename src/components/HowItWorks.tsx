import Image from "next/image";

const HowItWorks: React.FC = () => {
  return (
    <section className="w-full bg-background-darker px-4 py-24">
      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <div className="mb-12 text-center" data-aos="fade-up">
          <h2 className="section-header-new mb-4">How It Works</h2>
          <p className="mx-auto max-w-3xl text-lg text-text-secondary">
            Constant leverage up to a price threshold through best-effort convexity. LPs earn fees and SIR token rewards.
          </p>
        </div>

        {/* Vault Diagram */}
        <div
          className="relative mx-auto w-full max-w-4xl"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {/* Warm glow effect behind the diagram */}
          <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-b from-accent/10 via-transparent to-transparent blur-3xl" />

          <div className="rounded-xl border border-border bg-background-elevated/50 p-6 backdrop-blur-sm md:p-10">
            <Image
              src="/VaultDiagram.svg"
              alt="SIR Vault Architecture"
              width={1024}
              height={400}
              priority
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
