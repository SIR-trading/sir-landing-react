import Section from "~/components/common/Section";

export default function DisclaimerPage() {
  return (
    <div className="container">
      <Section variant="background" header="Disclaimer" className="text-left">
        <div className="section-text-block">
          <span>
            By participating in the funding of SIR (&#34;the Protocol&#34;), you
            acknowledge and agree to the following terms:
          </span>
          <div className="flex flex-col gap-4">
            <div>
              <span className="font-bold">Trustless Launch:</span>{" "}
              <span>
                The Protocol will be launched in a trustless manner, meaning
                that once the launch has occurred, the token allocations are
                immutable and cannot be altered by the team or any other entity.
                This ensures a decentralized and transparent distribution
                process.
              </span>
            </div>
            <div>
              <span className="font-bold">Risk of Bugs and Attacks:</span>{" "}
              <span>
                While the development team will make all reasonable efforts to
                minimize bugs and vulnerabilities through thorough testing and,
                where possible, independent audits, it is impossible to
                guarantee the complete absence of bugs or vulnerabilities. By
                participating, you acknowledge that the Protocol may be subject
                to bugs, vulnerabilities, or attacks that could result in
                partial or total loss of your funds. The development team,
                contributors, and associated parties shall not be held liable
                for any loss or damage arising from bugs, vulnerabilities, or
                attacks.
              </span>
            </div>
            <div>
              <span className="font-bold">Value of Token SIR:</span>{" "}
              <span>
                The value of the token SIR is highly volatile and can be
                influenced by a variety of factors beyond the control of the
                development team, including market conditions, regulatory
                changes, and technological advancements. The development team
                does not guarantee any specific value of the token SIR and is
                not responsible for any loss of value or potential loss of funds
                associated with the token SIR.
              </span>
            </div>
            <div>
              <span className="font-bold">Not financial advice:</span>{" "}
              <span>
                The information provided on the Protocol&#39;s website and in
                related materials is for informational purposes only and does
                not constitute financial, investment, or other professional
                advice. Participation in the funding of the Protocol should be
                based on your own research and assessment of the risks involved.
              </span>
            </div>
            <div>
              <span className="font-bold">Legal Compliance:</span>{" "}
              <span>
                It is your responsibility to ensure that your participation in
                the funding of the Protocol complies with all applicable laws
                and regulations in your jurisdiction. The development team is
                not responsible for any legal consequences arising from your
                participation.
              </span>
            </div>
            <div>
              <span className="font-bold">Acceptance of Risks:</span>{" "}
              <span>
                By participating in the funding of the Protocol, you accept all
                risks associated with your participation, including but not
                limited to financial loss, regulatory risk, and technical risks.
                You agree that you are participating at your own risk and that
                the development team, contributors, and associated parties shall
                not be held liable for any loss or damage arising from your
                participation.
              </span>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
