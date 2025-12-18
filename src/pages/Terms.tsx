import { Link } from "react-router-dom";
import { FileText, ArrowLeft } from "lucide-react";
import logoSvg from "@/assets/logo.svg";
import logoMobileSvg from "@/assets/logo-mobile.svg";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-background sticky top-0 z-50 shadow-sm border-b">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <Link to="/">
            <img src={logoSvg} alt="Kalyan AI - AI Implementation Partner" className="hidden md:block h-16 md:h-20 lg:h-24 w-auto" />
            <img src={logoMobileSvg} alt="Kalyan AI - AI Implementation Partner" className="block md:hidden h-16 w-auto" />
          </Link>
          <Link to="/" className="flex items-center gap-2 text-sm font-bold text-[#191970] hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0A192F] to-[#112240] py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <FileText className="w-16 h-16 mx-auto mb-6 text-[#06B6D4]" />
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Terms & Conditions</h1>
          <p className="text-xl text-blue-100">Our service terms and conditions</p>
          <p className="text-sm text-blue-200 mt-4">Last updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#191970] mb-4">1. Agreement to Terms</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              These Terms and Conditions ("Terms") govern your use of Kalyan AI's website and services. By accessing our website or engaging our services, you agree to be bound by these Terms.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              If you do not agree with any part of these Terms, please do not use our website or services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#191970] mb-4">2. Description of Services</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Kalyan AI provides AI transformation and implementation services, including:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>AI strategy consulting and business transformation advisory</li>
              <li>Automation workflow development and implementation</li>
              <li>Integration of AI solutions with existing business systems</li>
              <li>Training and knowledge transfer to client teams</li>
              <li>Ongoing support and optimization services</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Specific deliverables, timelines, and pricing will be agreed in writing through individual service agreements or statements of work.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#191970] mb-4">3. Eligibility</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our services are intended for businesses and individuals aged 18 or older. By using our services, you represent that you have the legal capacity to enter into these Terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#191970] mb-4">4. Service Agreements</h2>
            <h3 className="text-2xl font-semibold text-[#191970] mb-3">4.1 Engagement Process</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Services begin with a complimentary strategy session. If we identify opportunities that align with your goals, we will propose a custom engagement with:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Defined scope of work and deliverables</li>
              <li>Project timeline and milestones</li>
              <li>Pricing and payment terms</li>
              <li>Success metrics and KPIs</li>
            </ul>

            <h3 className="text-2xl font-semibold text-[#191970] mb-3">4.2 Client Obligations</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Clients agree to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Provide timely access to necessary systems, data, and personnel</li>
              <li>Respond promptly to requests for information or feedback</li>
              <li>Designate a primary point of contact for the engagement</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Maintain confidentiality of proprietary information shared by Kalyan AI</li>
            </ul>

            <h3 className="text-2xl font-semibold text-[#191970] mb-3">4.3 Changes to Scope</h3>
            <p className="text-muted-foreground leading-relaxed">
              Any changes to the agreed scope of work must be documented in writing and may result in adjustments to timelines and fees.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#191970] mb-4">5. Fees and Payment</h2>
            <h3 className="text-2xl font-semibold text-[#191970] mb-3">5.1 Pricing</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Service fees are determined on a project basis and will be specified in the service agreement. Pricing may be structured as:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Fixed project fee</li>
              <li>Time and materials basis</li>
              <li>Retainer arrangement</li>
              <li>Value-based pricing tied to outcomes</li>
            </ul>

            <h3 className="text-2xl font-semibold text-[#191970] mb-3">5.2 Payment Terms</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Unless otherwise agreed:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Invoices are due within 14 days of issue</li>
              <li>Initial deposit may be required before work commences</li>
              <li>Payment milestones may be established for larger projects</li>
              <li>Late payments may incur interest charges of 2% per month</li>
            </ul>

            <h3 className="text-2xl font-semibold text-[#191970] mb-3">5.3 Expenses</h3>
            <p className="text-muted-foreground leading-relaxed">
              Third-party costs incurred on behalf of the client (e.g., software licenses, API fees) will be billed separately unless included in the agreed fee structure.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#191970] mb-4">6. Intellectual Property</h2>
            <h3 className="text-2xl font-semibold text-[#191970] mb-3">6.1 Client Ownership</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Upon full payment, clients own:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Custom code and configurations developed specifically for the client</li>
              <li>Documentation and training materials created for the engagement</li>
              <li>All data and content provided by the client</li>
            </ul>

            <h3 className="text-2xl font-semibold text-[#191970] mb-3">6.2 Kalyan AI Ownership</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Kalyan AI retains ownership of:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Pre-existing intellectual property and methodologies</li>
              <li>General knowledge and techniques developed during the engagement</li>
              <li>Templates, frameworks, and tools used across multiple clients</li>
            </ul>

            <h3 className="text-2xl font-semibold text-[#191970] mb-3">6.3 Third-Party Components</h3>
            <p className="text-muted-foreground leading-relaxed">
              Solutions may incorporate third-party software, APIs, or services subject to their respective license terms. Clients are responsible for compliance with such terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#191970] mb-4">7. Confidentiality</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Both parties agree to maintain the confidentiality of proprietary and sensitive information disclosed during the engagement, including:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Business strategies and plans</li>
              <li>Technical implementations and configurations</li>
              <li>Financial information</li>
              <li>Customer and employee data</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Confidentiality obligations survive termination of the engagement and remain in effect for 3 years unless otherwise agreed.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Exceptions include information that is publicly available, independently developed, or required to be disclosed by law.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#191970] mb-4">8. Data Protection and Privacy</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We process personal data in accordance with:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Our Privacy Policy</li>
              <li>Our Data Processing Agreement (DPA)</li>
              <li>UK GDPR and Data Protection Act 2018</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Clients acknowledge and agree to the terms of our Privacy Policy and DPA, which form part of these Terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#191970] mb-4">9. Warranties and Disclaimers</h2>
            <h3 className="text-2xl font-semibold text-[#191970] mb-3">9.1 Service Warranties</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We warrant that:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Services will be performed with reasonable skill and care</li>
              <li>We have the necessary expertise and authorization to provide services</li>
              <li>Services will comply with applicable laws and professional standards</li>
            </ul>

            <h3 className="text-2xl font-semibold text-[#191970] mb-3">9.2 Disclaimers</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Except as expressly stated, services are provided "as is" without warranties of any kind. We specifically disclaim:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Warranties of merchantability or fitness for a particular purpose</li>
              <li>Guarantees of specific business outcomes or ROI</li>
              <li>Responsibility for third-party services, software, or platforms</li>
            </ul>

            <h3 className="text-2xl font-semibold text-[#191970] mb-3">9.3 AI Technology Disclaimer</h3>
            <p className="text-muted-foreground leading-relaxed">
              AI technologies are rapidly evolving. While we implement best practices, we cannot guarantee that AI systems will be error-free or produce perfect results in all scenarios. Clients are responsible for validating outputs and maintaining appropriate human oversight.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#191970] mb-4">10. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              To the maximum extent permitted by law:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Our total liability for any claims arising from services shall not exceed the fees paid by the client for those services</li>
              <li>We are not liable for indirect, consequential, or special damages including lost profits, revenue, or data</li>
              <li>We are not liable for delays or failures due to circumstances beyond our reasonable control</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Nothing in these Terms excludes or limits liability for death or personal injury caused by negligence, fraud, or other liabilities that cannot be excluded by law.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#191970] mb-4">11. Indemnification</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Clients agree to indemnify and hold harmless Kalyan AI from claims arising from:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Client's use of deliverables in violation of applicable laws</li>
              <li>Client's breach of these Terms</li>
              <li>Third-party claims related to client's data or content</li>
              <li>Client's misuse or modification of deliverables</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#191970] mb-4">12. Term and Termination</h2>
            <h3 className="text-2xl font-semibold text-[#191970] mb-3">12.1 Term</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Service agreements commence on the effective date and continue until completion of deliverables or as specified in the agreement.
            </p>

            <h3 className="text-2xl font-semibold text-[#191970] mb-3">12.2 Termination for Convenience</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Either party may terminate with 30 days written notice. Client remains responsible for:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Fees for work completed to date</li>
              <li>Non-cancellable commitments made on client's behalf</li>
            </ul>

            <h3 className="text-2xl font-semibold text-[#191970] mb-3">12.3 Termination for Cause</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Either party may terminate immediately if the other party:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Materially breaches these Terms and fails to remedy within 14 days</li>
              <li>Becomes insolvent or enters bankruptcy proceedings</li>
              <li>Engages in fraudulent or illegal conduct</li>
            </ul>

            <h3 className="text-2xl font-semibold text-[#191970] mb-3">12.4 Effects of Termination</h3>
            <p className="text-muted-foreground leading-relaxed">
              Upon termination, we will return or destroy client data as directed, and provisions regarding confidentiality, intellectual property, and liability shall survive.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#191970] mb-4">13. Website Use</h2>
            <h3 className="text-2xl font-semibold text-[#191970] mb-3">13.1 Acceptable Use</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You may not use our website to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Violate any laws or regulations</li>
              <li>Infringe intellectual property rights</li>
              <li>Transmit harmful code or malware</li>
              <li>Attempt unauthorized access to systems</li>
              <li>Interfere with website operations</li>
            </ul>

            <h3 className="text-2xl font-semibold text-[#191970] mb-3">13.2 Website Availability</h3>
            <p className="text-muted-foreground leading-relaxed">
              We strive to maintain website availability but do not guarantee uninterrupted access. We may suspend access for maintenance or other reasons without liability.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#191970] mb-4">14. Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our solutions may integrate with third-party services (e.g., AI APIs, automation platforms, cloud providers). Clients acknowledge:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Third-party services are subject to their own terms and pricing</li>
              <li>We are not responsible for third-party service availability or changes</li>
              <li>Clients are responsible for maintaining necessary third-party accounts and licenses</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#191970] mb-4">15. Force Majeure</h2>
            <p className="text-muted-foreground leading-relaxed">
              Neither party shall be liable for delays or failures due to circumstances beyond reasonable control, including natural disasters, pandemics, war, government actions, internet failures, or third-party service outages.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#191970] mb-4">16. Dispute Resolution</h2>
            <h3 className="text-2xl font-semibold text-[#191970] mb-3">16.1 Negotiation</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Parties agree to attempt to resolve disputes through good-faith negotiation before pursuing other remedies.
            </p>

            <h3 className="text-2xl font-semibold text-[#191970] mb-3">16.2 Mediation</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If negotiation fails, parties agree to mediation before an agreed mediator or through the Centre for Effective Dispute Resolution (CEDR).
            </p>

            <h3 className="text-2xl font-semibold text-[#191970] mb-3">16.3 Litigation</h3>
            <p className="text-muted-foreground leading-relaxed">
              If mediation is unsuccessful, disputes shall be resolved through the courts of England and Wales.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#191970] mb-4">17. General Provisions</h2>
            <h3 className="text-2xl font-semibold text-[#191970] mb-3">17.1 Entire Agreement</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              These Terms, together with any service agreements, constitute the entire agreement between parties and supersede prior agreements or representations.
            </p>

            <h3 className="text-2xl font-semibold text-[#191970] mb-3">17.2 Amendments</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may update these Terms from time to time. Material changes will be communicated to active clients. Continued use of services after changes constitutes acceptance.
            </p>

            <h3 className="text-2xl font-semibold text-[#191970] mb-3">17.3 Assignment</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Clients may not assign or transfer their rights or obligations without our prior written consent. We may assign our rights to an affiliate or in connection with a business transfer.
            </p>

            <h3 className="text-2xl font-semibold text-[#191970] mb-3">17.4 Severability</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If any provision is found invalid or unenforceable, remaining provisions shall continue in full force and effect.
            </p>

            <h3 className="text-2xl font-semibold text-[#191970] mb-3">17.5 Waiver</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Failure to enforce any provision does not constitute a waiver of that or any other provision.
            </p>

            <h3 className="text-2xl font-semibold text-[#191970] mb-3">17.6 Notices</h3>
            <p className="text-muted-foreground leading-relaxed">
              Notices shall be in writing and sent to the addresses specified in the service agreement or to <a href="mailto:future@kalyanai.io" className="text-[#06B6D4] hover:underline font-semibold">future@kalyanai.io</a>.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#191970] mb-4">18. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of England and Wales, without regard to conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-[#191970] mb-4">19. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              For questions about these Terms or our services, please contact:
            </p>
            <div className="bg-accent/10 border-2 border-[#06B6D4]/30 rounded-lg p-6">
              <p className="text-muted-foreground mb-2"><strong>Kalyan AI</strong></p>
              <p className="text-muted-foreground mb-2">Email: <a href="mailto:future@kalyanai.io" className="text-[#06B6D4] hover:underline font-semibold">future@kalyanai.io</a></p>
              <p className="text-muted-foreground">Address: Bradford Business Centre, 121 - 123 Bradford Street, Birmingham, B120NS</p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-[#0A192F] to-[#112240] text-white py-12 px-6 mt-20">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-blue-100 mb-4">© {new Date().getFullYear()} Kalyan AI. All rights reserved.</p>
          <div className="flex items-center justify-center gap-6 text-sm text-blue-100/80">
            <Link to="/privacy" className="hover:text-[#06B6D4] transition-colors">Privacy</Link>
            <Link to="/dpa" className="hover:text-[#06B6D4] transition-colors">DPA</Link>
            <Link to="/terms" className="hover:text-[#06B6D4] transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
