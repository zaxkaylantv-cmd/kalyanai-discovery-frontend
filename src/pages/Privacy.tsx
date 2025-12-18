import { Link } from "react-router-dom";
import { Shield, ArrowLeft } from "lucide-react";
import logoSvg from "@/assets/logo.svg";
import logoMobileSvg from "@/assets/logo-mobile.svg";

export default function Privacy() {
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
          <Shield className="w-16 h-16 mx-auto mb-6 text-[#06B6D4]" />
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-xl text-blue-100">How we protect and handle your information</p>
          <p className="text-sm text-blue-200 mt-4">Last updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#191970] mb-4">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Kalyan AI ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              By using our services, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#191970] mb-4">2. Information We Collect</h2>
            <h3 className="text-2xl font-semibold text-[#191970] mb-3">2.1 Personal Information</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Book a consultation or strategy session</li>
              <li>Contact us via email or phone</li>
              <li>Subscribe to our newsletter or communications</li>
              <li>Fill out forms on our website</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mb-4">
              This information may include: name, email address, phone number, company name, job title, and business information.
            </p>

            <h3 className="text-2xl font-semibold text-[#191970] mb-3">2.2 Automatically Collected Information</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              When you visit our website, we automatically collect certain information about your device, including:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Browser type and version</li>
              <li>IP address</li>
              <li>Operating system</li>
              <li>Referring URLs and pages viewed</li>
              <li>Time and date of visits</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#191970] mb-4">3. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Provide, operate, and maintain our services</li>
              <li>Process and manage your bookings and appointments</li>
              <li>Communicate with you about our services, including responding to inquiries</li>
              <li>Send you business updates, marketing communications, and relevant content (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Analyse usage patterns and trends</li>
              <li>Comply with legal obligations</li>
              <li>Protect against fraudulent or illegal activity</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#191970] mb-4">4. Legal Basis for Processing (UK GDPR)</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Under UK GDPR, we process your personal data based on:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li><strong>Consent:</strong> When you provide explicit consent for specific processing activities</li>
              <li><strong>Contract:</strong> To fulfil our contractual obligations when providing services to you</li>
              <li><strong>Legitimate Interests:</strong> For business operations, analytics, and improving our services</li>
              <li><strong>Legal Obligation:</strong> To comply with applicable laws and regulations</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#191970] mb-4">5. Data Sharing and Disclosure</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We do not sell your personal information. We may share your information with:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li><strong>Service Providers:</strong> Third-party vendors who assist us in operating our website and delivering services (e.g., Calendly for scheduling, email service providers)</li>
              <li><strong>Business Partners:</strong> With your consent, to provide specific services or solutions</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
              <li><strong>Business Transfers:</strong> In connection with any merger, sale, or acquisition of all or part of our business</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              All third-party service providers are contractually required to maintain the confidentiality and security of your information.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#191970] mb-4">6. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We implement appropriate technical and organisational security measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication</li>
              <li>Employee training on data protection</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#191970] mb-4">7. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain your personal information only for as long as necessary to fulfil the purposes for which it was collected, including legal, accounting, or reporting requirements. When information is no longer needed, we securely delete or anonymise it.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#191970] mb-4">8. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Under UK GDPR, you have the following rights regarding your personal data:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li><strong>Right of Access:</strong> Request a copy of your personal data</li>
              <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete data</li>
              <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
              <li><strong>Right to Restrict Processing:</strong> Request limitation on how we process your data</li>
              <li><strong>Right to Data Portability:</strong> Request transfer of your data to another service</li>
              <li><strong>Right to Object:</strong> Object to processing based on legitimate interests or direct marketing</li>
              <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time where processing is based on consent</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              To exercise any of these rights, please contact us at <a href="mailto:future@kalyanai.io" className="text-[#06B6D4] hover:underline font-semibold">future@kalyanai.io</a>
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#191970] mb-4">9. Cookies and Tracking</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our website uses cookies and similar tracking technologies to enhance your experience. Cookies are small data files stored on your device. We use:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for website functionality</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
              <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              You can control cookies through your browser settings. Disabling certain cookies may affect website functionality.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#191970] mb-4">10. Third-Party Links</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies before providing any personal information.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#191970] mb-4">11. International Data Transfers</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your information may be transferred to and processed in countries outside the UK. When we transfer data internationally, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses or adequacy decisions.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#191970] mb-4">12. Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#191970] mb-4">13. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last updated" date. We encourage you to review this policy periodically. Continued use of our services after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#191970] mb-4">14. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
            </p>
            <div className="bg-accent/10 border-2 border-[#06B6D4]/30 rounded-lg p-6">
              <p className="text-muted-foreground mb-2"><strong>Kalyan AI</strong></p>
              <p className="text-muted-foreground mb-2">Email: <a href="mailto:future@kalyanai.io" className="text-[#06B6D4] hover:underline font-semibold">future@kalyanai.io</a></p>
              <p className="text-muted-foreground">Address: Bradford Business Centre, 121 - 123 Bradford Street, Birmingham, B120NS</p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-[#191970] mb-4">15. Complaints</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you have concerns about how we handle your personal data, you have the right to lodge a complaint with the UK supervisory authority:
            </p>
            <div className="bg-accent/10 border-2 border-[#06B6D4]/30 rounded-lg p-6">
              <p className="text-muted-foreground mb-2"><strong>Information Commissioner's Office (ICO)</strong></p>
              <p className="text-muted-foreground mb-2">Website: <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-[#06B6D4] hover:underline font-semibold">https://ico.org.uk</a></p>
              <p className="text-muted-foreground">Phone: 0303 123 1113</p>
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
