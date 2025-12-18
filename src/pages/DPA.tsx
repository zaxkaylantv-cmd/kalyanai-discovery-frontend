import { Link } from "react-router-dom";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import logoSvg from "@/assets/logo.svg";
import logoMobileSvg from "@/assets/logo-mobile.svg";

export default function DPA() {
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
          <ShieldCheck className="w-16 h-16 mx-auto mb-6 text-[#06B6D4]" />
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Data Processing Agreement</h1>
          <p className="text-xl text-blue-100">Our commitment to protecting your data</p>
          <p className="text-sm text-blue-200 mt-4">Last updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#191970] mb-4">1. Introduction and Definitions</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              This Data Processing Agreement ("DPA") forms part of the agreement between Kalyan AI ("Processor", "we", "us") and the customer ("Controller", "you") for the provision of AI transformation and implementation services.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              This DPA reflects the parties' agreement with regard to the processing of Personal Data in accordance with the requirements of UK GDPR and Data Protection Act 2018.
            </p>
            
            <h3 className="text-2xl font-semibold text-[#191970] mb-3">Definitions</h3>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li><strong>"Personal Data"</strong> means any information relating to an identified or identifiable natural person processed in connection with our services</li>
              <li><strong>"Data Subject"</strong> means the individual to whom Personal Data relates</li>
              <li><strong>"Processing"</strong> means any operation performed on Personal Data</li>
              <li><strong>"Sub-processor"</strong> means any third party appointed to process Personal Data on behalf of the Processor</li>
              <li><strong>"UK GDPR"</strong> means the UK General Data Protection Regulation</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#191970] mb-4">2. Scope and Application</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              This DPA applies to all processing of Personal Data by Kalyan AI when acting as a Processor on behalf of the Controller in connection with:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>AI strategy and implementation services</li>
              <li>Business transformation consulting</li>
              <li>Automation workflow development</li>
              <li>Integration services with third-party platforms</li>
              <li>Ongoing support and optimization services</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#191970] mb-4">3. Data Processing Details</h2>
            
            <h3 className="text-2xl font-semibold text-[#191970] mb-3">3.1 Nature and Purpose of Processing</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We process Personal Data for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Providing AI transformation and implementation services</li>
              <li>Developing and deploying automation workflows</li>
              <li>Integrating AI solutions with existing business systems</li>
              <li>Training and supporting client teams</li>
              <li>Monitoring and optimizing AI system performance</li>
            </ul>

            <h3 className="text-2xl font-semibold text-[#191970] mb-3">3.2 Duration of Processing</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Processing will continue for the duration of the service agreement and for such period afterwards as required by law or agreed in writing by both parties.
            </p>

            <h3 className="text-2xl font-semibold text-[#191970] mb-3">3.3 Types of Personal Data</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Categories of Personal Data that may be processed include:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Contact information (names, email addresses, phone numbers)</li>
              <li>Professional information (job titles, company details)</li>
              <li>Business communication data</li>
              <li>Technical data (IP addresses, system logs)</li>
              <li>Any other data provided by the Controller in connection with our services</li>
            </ul>

            <h3 className="text-2xl font-semibold text-[#191970] mb-3">3.4 Categories of Data Subjects</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Data Subjects may include:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Controller's employees and contractors</li>
              <li>Controller's customers and prospects</li>
              <li>Controller's suppliers and business partners</li>
              <li>End users of Controller's products or services</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#191970] mb-4">4. Processor Obligations</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              As Processor, we undertake to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Process Personal Data only on documented instructions from the Controller</li>
              <li>Ensure that persons authorized to process Personal Data are bound by confidentiality obligations</li>
              <li>Implement appropriate technical and organizational measures to ensure security of Personal Data</li>
              <li>Only engage Sub-processors with prior written authorization from the Controller</li>
              <li>Assist the Controller in responding to Data Subject requests</li>
              <li>Assist the Controller in ensuring compliance with security, breach notification, and impact assessment obligations</li>
              <li>Delete or return all Personal Data after the end of services, unless retention is required by law</li>
              <li>Make available all information necessary to demonstrate compliance with this DPA</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#191970] mb-4">5. Security Measures</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We implement comprehensive technical and organizational security measures, including:
            </p>
            
            <h3 className="text-2xl font-semibold text-[#191970] mb-3">Technical Measures</h3>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Encryption of data in transit using TLS/SSL protocols</li>
              <li>Encryption of data at rest where applicable</li>
              <li>Regular security testing and vulnerability assessments</li>
              <li>Secure authentication and access controls</li>
              <li>Network security measures including firewalls</li>
              <li>Regular backups and disaster recovery procedures</li>
            </ul>

            <h3 className="text-2xl font-semibold text-[#191970] mb-3">Organizational Measures</h3>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Data protection policies and procedures</li>
              <li>Employee training on data protection</li>
              <li>Confidentiality agreements with staff and contractors</li>
              <li>Access controls based on principle of least privilege</li>
              <li>Incident response and breach notification procedures</li>
              <li>Regular review and update of security measures</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#191970] mb-4">6. Sub-processors</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The Controller provides general authorization for the engagement of Sub-processors. We currently use or may use the following categories of Sub-processors:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li><strong>Cloud infrastructure providers</strong> (e.g., AWS, Azure, Google Cloud)</li>
              <li><strong>AI service providers</strong> (e.g., OpenAI, Anthropic)</li>
              <li><strong>Automation platforms</strong> (e.g., Make.com, n8n)</li>
              <li><strong>Communication services</strong> (e.g., email providers, scheduling tools)</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We will:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Inform the Controller of any intended changes concerning addition or replacement of Sub-processors</li>
              <li>Give the Controller the opportunity to object to such changes within 30 days</li>
              <li>Ensure that Sub-processors are bound by data protection obligations equivalent to those in this DPA</li>
              <li>Remain fully liable to the Controller for the performance of Sub-processors' obligations</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#191970] mb-4">7. Data Subject Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We will assist the Controller in fulfilling its obligations to respond to Data Subject requests to exercise their rights under UK GDPR, including:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Right of access to Personal Data</li>
              <li>Right to rectification of inaccurate Personal Data</li>
              <li>Right to erasure ("right to be forgotten")</li>
              <li>Right to restriction of processing</li>
              <li>Right to data portability</li>
              <li>Right to object to processing</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              We will respond to Controller's requests for assistance within a reasonable timeframe, taking into account the nature of the request.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#191970] mb-4">8. Data Breach Notification</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              In the event of a Personal Data breach, we will:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Notify the Controller without undue delay and, where feasible, within 24 hours of becoming aware of the breach</li>
              <li>Provide all relevant information about the breach, including:
                <ul className="list-circle pl-6 mt-2 space-y-1">
                  <li>Nature of the breach and categories and approximate numbers of Data Subjects and records affected</li>
                  <li>Likely consequences of the breach</li>
                  <li>Measures taken or proposed to address the breach</li>
                </ul>
              </li>
              <li>Cooperate with the Controller and take reasonable steps to mitigate the effects of the breach</li>
              <li>Document all breaches regardless of whether notification is required</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#191970] mb-4">9. Data Protection Impact Assessments</h2>
            <p className="text-muted-foreground leading-relaxed">
              We will provide reasonable assistance to the Controller in conducting Data Protection Impact Assessments (DPIAs) and prior consultations with supervisory authorities when required under UK GDPR.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#191970] mb-4">10. International Data Transfers</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              When Personal Data is transferred outside the UK, we ensure appropriate safeguards are in place, such as:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Standard Contractual Clauses approved by the UK Information Commissioner's Office</li>
              <li>Adequacy decisions recognizing equivalent data protection standards</li>
              <li>Other legally recognized transfer mechanisms under UK GDPR</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              We will inform the Controller of any such transfers and the safeguards in place.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#191970] mb-4">11. Audits and Inspections</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We will allow the Controller or its authorized auditor to conduct audits and inspections to verify compliance with this DPA. The Controller shall:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Provide reasonable advance notice of any audit (minimum 30 days)</li>
              <li>Conduct audits during normal business hours</li>
              <li>Minimize disruption to our operations</li>
              <li>Execute appropriate confidentiality agreements</li>
              <li>Bear all costs associated with the audit</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#191970] mb-4">12. Data Deletion and Return</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Upon termination or expiry of services, we will, at the Controller's choice:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Delete all Personal Data and existing copies, unless storage is required by law</li>
              <li>Return all Personal Data to the Controller in a commonly used electronic format</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              We will certify to the Controller that we have complied with this obligation within 30 days of the end of services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#191970] mb-4">13. Liability and Indemnification</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Each party's liability under this DPA shall be subject to the limitations and exclusions set out in the main service agreement.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The Processor shall indemnify and hold harmless the Controller against all claims, losses, and damages arising from the Processor's breach of this DPA or applicable data protection laws.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#191970] mb-4">14. Term and Termination</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              This DPA shall remain in effect for as long as we process Personal Data on behalf of the Controller. Either party may terminate this DPA if the other party materially breaches its obligations and fails to remedy within 30 days of written notice.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#191970] mb-4">15. Amendments</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this DPA from time to time to reflect changes in data protection laws or our processing activities. We will notify the Controller of material changes and obtain consent where required by law.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#191970] mb-4">16. Governing Law and Jurisdiction</h2>
            <p className="text-muted-foreground leading-relaxed">
              This DPA shall be governed by and construed in accordance with the laws of England and Wales. The parties submit to the exclusive jurisdiction of the courts of England and Wales.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-[#191970] mb-4">17. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              For questions or concerns regarding this DPA or our data processing practices, please contact:
            </p>
            <div className="bg-accent/10 border-2 border-[#06B6D4]/30 rounded-lg p-6">
              <p className="text-muted-foreground mb-2"><strong>Kalyan AI</strong></p>
              <p className="text-muted-foreground mb-2">Data Protection Contact</p>
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
