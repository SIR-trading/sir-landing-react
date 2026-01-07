export default function DisclaimerPage() {
  const disclaimerItems = [
    {
      title: "Trustless Launch",
      content:
        "The Protocol will be launched in a trustless manner, meaning that once the launch has occurred, the token allocations are immutable and cannot be altered by the team or any other entity. This ensures a decentralized and transparent distribution process.",
    },
    {
      title: "Risk of Bugs and Attacks",
      content:
        "While the development team will make all reasonable efforts to minimize bugs and vulnerabilities through thorough testing and, where possible, independent audits, it is impossible to guarantee the complete absence of bugs or vulnerabilities. By participating, you acknowledge that the Protocol may be subject to bugs, vulnerabilities, or attacks that could result in partial or total loss of your funds. The development team, contributors, and associated parties shall not be held liable for any loss or damage arising from bugs, vulnerabilities, or attacks.",
    },
    {
      title: "Value of Token SIR",
      content:
        "The value of the token SIR is highly volatile and can be influenced by a variety of factors beyond the control of the development team, including market conditions, regulatory changes, and technological advancements. The development team does not guarantee any specific value of the token SIR and is not responsible for any loss of value or potential loss of funds associated with the token SIR.",
    },
    {
      title: "Not Financial Advice",
      content:
        "The information provided on the Protocol's website and in related materials is for informational purposes only and does not constitute financial, investment, or other professional advice. Participation in the funding of the Protocol should be based on your own research and assessment of the risks involved.",
    },
    {
      title: "Legal Compliance",
      content:
        "It is your responsibility to ensure that your participation in the funding of the Protocol complies with all applicable laws and regulations in your jurisdiction. The development team is not responsible for any legal consequences arising from your participation.",
    },
    {
      title: "Acceptance of Risks",
      content:
        "By participating in the funding of the Protocol, you accept all risks associated with your participation, including but not limited to financial loss, regulatory risk, and technical risks. You agree that you are participating at your own risk and that the development team, contributors, and associated parties shall not be held liable for any loss or damage arising from your participation.",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="w-full bg-background-darker px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-accent to-transparent" />
          <h1 className="mb-4 font-geist text-4xl font-bold text-text-primary md:text-5xl">
            Disclaimer
          </h1>
          <p className="text-lg text-text-secondary">
            Important information about participating in SIR
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full bg-background px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-xl border border-border bg-background-elevated p-8">
            <p className="mb-8 text-text-secondary">
              By participating in the funding of SIR (&quot;the Protocol&quot;), you
              acknowledge and agree to the following terms:
            </p>

            <div className="space-y-6">
              {disclaimerItems.map((item, index) => (
                <div
                  key={index}
                  className="border-b border-border pb-6 last:border-0 last:pb-0"
                >
                  <h3 className="mb-2 font-semibold text-text-primary">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="w-full bg-background-darker px-4 py-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm text-text-muted">
            Last updated: January 2025
          </p>
        </div>
      </section>
    </main>
  );
}
