import { useMemo, useState, useEffect } from "react";
import { TrendingUp, Phone, Menu, X, Target, Lightbulb, Rocket, Building, Shield, Zap, Eye, Unlock, CheckCircle2, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import logoSvg from "@/assets/logo.svg";
import logoMobileSvg from "@/assets/logo-mobile.svg";
import logoFooterSvg from "@/assets/logo-footer.svg";
import logoFooterMobileSvg from "@/assets/logo-footer-mobile.svg";

const CONFIG = {
  brand: {
    name: "Kalyan AI",
    email: "future@kalyanai.io",
    domain: "kalyanai.io",
    address: "Bradford Business Centre, 121 - 123 Bradford Street, Birmingham, B120NS",
    facebook: "#",
    instagram: "#",
    twitter: "#",
    linkedin: "#",
    year: new Date().getFullYear(),
  },
  process: [
    {
      step: "01",
      title: "Business Discovery & Strategy",
      icon: Target,
      text: (
        <>
          Assess your <span className="text-[#06B6D4] font-semibold">business model</span> and identify{" "}
          <span className="text-[#06B6D4] font-semibold">high-impact AI opportunities</span> that unlock{" "}
          <span className="text-[#06B6D4] font-semibold">revenue</span>.
        </>
      ),
      benefits: [
        "Deep business & market analysis",
        "Revenue opportunity mapping",
        "Strategic AI roadmap development",
        "Clear ROI projections"
      ]
    },
    {
      step: "02",
      title: "Strategic Design & Architecture",
      icon: Lightbulb,
      text: (
        <>
          Design <span className="text-[#06B6D4] font-semibold">AI systems</span> that create{" "}
          <span className="text-[#06B6D4] font-semibold">competitive advantage</span> and drive{" "}
          <span className="text-[#06B6D4] font-semibold">growth</span>.
        </>
      ),
      benefits: [
        "Custom AI transformation architecture",
        "Revenue model innovation",
        "Competitive positioning strategy",
        "Scalable system design"
      ]
    },
    {
      step: "03",
      title: "Implementation & Growth",
      icon: Rocket,
      text: (
        <>
          Launch systems with <span className="text-[#06B6D4] font-semibold">clear ROI</span>. Scale and maintain{" "}
          <span className="text-[#06B6D4] font-semibold">competitive edge</span>.
        </>
      ),
      benefits: [
        "Production systems in 2-4 weeks",
        "Measurable business impact",
        "Continuous competitive advantage",
        "Team training & ownership"
      ]
    }
  ]
};

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xl md:text-3xl tracking-wide font-bold uppercase text-[#06B6D4] underline">
      {children}
    </p>
  );
}

function StickyCtaButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 800) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-up">
      <a
        href="https://calendly.com/sandeep-kalyanai/ai-opportunity-assessment"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold bg-[#06B6D4] text-white shadow-2xl hover:scale-105 transition-all"
      >
        <Phone className="w-4 h-4" />
        Book Free Call
      </a>
    </div>
  );
}

export default function HowWeWork() {
  const year = useMemo(() => CONFIG.brand.year, []);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Load Calendly script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sticky CTA Button */}
      <StickyCtaButton />

      {/* Navigation */}
      <nav className="bg-background sticky top-0 z-50 shadow-none">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <a href="/">
            <img src={logoSvg} alt="Kalyan AI - AI Implementation Partner" className="hidden md:block h-16 md:h-20 lg:h-24 w-auto" />
            <img src={logoMobileSvg} alt="Kalyan AI - AI Implementation Partner" className="block md:hidden h-16 w-auto" />
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/" className="text-sm font-bold text-[#191970] hover:text-primary transition-colors">Home</a>
            <a href="/about" className="text-sm font-bold text-[#191970] hover:text-primary transition-colors">About</a>
            <a href="/how-we-work" className="text-sm font-bold text-[#06B6D4] transition-colors">How We Work</a>
            <a href="/faq" className="text-sm font-bold text-[#191970] hover:text-primary transition-colors">FAQ</a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#191970] hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background animate-fade-up">
            <div className="px-4 py-4 space-y-3">
              <a
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-base font-bold text-[#191970] hover:bg-accent hover:text-primary rounded-lg transition-colors"
              >
                Home
              </a>
              <a
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-base font-bold text-[#191970] hover:bg-accent hover:text-primary rounded-lg transition-colors"
              >
                About
              </a>
              <a
                href="/how-we-work"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-base font-bold text-[#06B6D4] rounded-lg"
              >
                How We Work
              </a>
              <a
                href="/faq"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-base font-bold text-[#191970] hover:bg-accent hover:text-primary rounded-lg transition-colors"
              >
                FAQ
              </a>
            </div>
          </div>
        )}
      </nav>

      <main>
        {/* Hero Section */}
        <section className="hero-section relative min-h-[60vh] flex items-center py-12 md:py-20 px-6">
          <div className="hero-section__bg" />
          
          {/* Floating geometric shapes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-20 h-20 border-2 border-[#06B6D4]/30 rounded-lg animate-float" style={{ animationDelay: '0s' }} />
            <div className="absolute top-40 right-20 w-16 h-16 border-2 border-[#06B6D4]/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-32 left-1/4 w-12 h-12 border-2 border-[#06B6D4]/25 rounded-lg rotate-45 animate-float" style={{ animationDelay: '2s' }} />
            <div className="absolute bottom-20 right-1/3 w-24 h-24 border-2 border-[#06B6D4]/15 rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
          </div>
          
          <div className="max-w-5xl mx-auto w-full relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Transform Your Business with <span className="text-[#06B6D4]">AI</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              <span className="text-[#06B6D4] font-semibold">Strategic vision</span>.{" "}
              <span className="text-[#06B6D4] font-semibold">Technical depth</span>.{" "}
              <span className="text-[#06B6D4] font-semibold">Measurable results</span>.
            </p>
          </div>
        </section>

        {/* Process Steps Section - Icon-Based Premium Cards */}
        <section className="mx-auto max-w-7xl px-6 py-16 md:py-24 mt-0">
          <div className="hero-section rounded-3xl p-12 relative overflow-hidden">
            <div className="hero-section__bg" />
            
            {/* Background glow effects */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#06B6D4]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10">
              <div className="text-center mb-16">
                <SectionEyebrow>
                  <span className="text-white">Three Step Process</span>
                </SectionEyebrow>
                <h2 className="text-3xl md:text-5xl font-bold text-white mt-6 mb-4">
                  From Discovery to <span className="text-[#06B6D4]">Transformation</span>
                </h2>
                <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                  Production systems in <span className="text-[#06B6D4] font-semibold">weeks</span>, not months
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {CONFIG.process.map((proc) => {
                  const IconComponent = proc.icon;
                  return (
                    <div
                      key={proc.step}
                      className="hero-section relative rounded-2xl p-6 border-2 border-white/20 hover:border-[#06B6D4] hover:scale-105 hover:shadow-[0_0_60px_rgba(6,182,212,0.2)] transition-all duration-500 group overflow-hidden shadow-lg"
                    >
                      <div className="hero-section__bg" />
                      
                      {/* Step number badge */}
                      <div className="absolute top-6 right-6 bg-[#06B6D4] text-white text-xl font-bold px-4 py-2 rounded-lg shadow-lg z-10">
                        {proc.step}
                      </div>

                      {/* Icon */}
                      <div className="relative z-10 w-20 h-20 rounded-xl bg-gradient-to-br from-[#06B6D4]/30 to-[#06B6D4]/10 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-500">
                        <IconComponent className="w-10 h-10 text-[#06B6D4]" />
                      </div>

                      {/* Content */}
                      <div className="relative z-10">
                        <h3 className="text-2xl font-bold text-white mb-4 text-center">
                          {proc.title}
                        </h3>
                        <p className="text-base text-blue-100 leading-relaxed text-center">
                          {proc.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Our Approach Section */}
        <section className="mx-auto max-w-7xl px-6 py-16 md:py-24 hero-section rounded-3xl relative overflow-hidden">
          <div className="hero-section__bg" />
          
          <div className="relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Business <span className="text-[#06B6D4]">Transformation</span>
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                <span className="text-[#06B6D4] font-semibold">15+ years</span> P&L leadership meets{" "}
                <span className="text-[#06B6D4] font-semibold">AI innovation</span>
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Card 1: Business-First Strategy */}
              <div className="backdrop-blur-xl bg-white/10 rounded-xl p-8 border border-white/20 hover:border-[#06B6D4] hover:scale-105 hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] transition-all duration-500 group">
                <div className="w-16 h-16 rounded-lg bg-[#06B6D4]/20 flex items-center justify-center mb-6 mx-auto group-hover:bg-[#06B6D4]/40 group-hover:scale-110 transition-all duration-500">
                  <Building className="w-8 h-8 text-[#06B6D4]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 text-center">Business Transformation</h3>
                <p className="text-base text-blue-100 leading-relaxed text-center">
                  Start with <span className="text-[#06B6D4] font-semibold">business goals</span>, apply{" "}
                  <span className="text-[#06B6D4] font-semibold">AI strategically</span> to achieve them.
                </p>
              </div>

              {/* Card 2: Technical Excellence */}
              <div className="backdrop-blur-xl bg-white/10 rounded-xl p-8 border border-white/20 hover:border-[#06B6D4] hover:scale-105 hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] transition-all duration-500 group">
                <div className="w-16 h-16 rounded-lg bg-[#06B6D4]/20 flex items-center justify-center mb-6 mx-auto group-hover:bg-[#06B6D4]/40 group-hover:scale-110 transition-all duration-500">
                  <Shield className="w-8 h-8 text-[#06B6D4]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 text-center">Innovation Edge</h3>
                <p className="text-base text-blue-100 leading-relaxed text-center">
                  Access to <span className="text-[#06B6D4] font-semibold">cutting-edge AI capabilities</span> that put you at{" "}
                  <span className="text-[#06B6D4] font-semibold">the forefront of innovation</span>.
                </p>
              </div>

              {/* Card 3: Fast ROI */}
              <div className="backdrop-blur-xl bg-white/10 rounded-xl p-8 border border-white/20 hover:border-[#06B6D4] hover:scale-105 hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] transition-all duration-500 group">
                <div className="w-16 h-16 rounded-lg bg-[#06B6D4]/20 flex items-center justify-center mb-6 mx-auto group-hover:bg-[#06B6D4]/40 group-hover:scale-110 transition-all duration-500">
                  <TrendingUp className="w-8 h-8 text-[#06B6D4]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 text-center">Rapid Value Creation</h3>
                <p className="text-base text-blue-100 leading-relaxed text-center">
                  <span className="text-[#06B6D4] font-semibold">Production systems</span> in 2-4 weeks.{" "}
                  <span className="text-[#06B6D4] font-semibold">Measurable ROI</span> in weeks, not months.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* White Space Separator */}
        <div className="bg-background py-8 md:py-12" />

        {/* What Makes Us Different Section */}
        <section className="mx-auto max-w-7xl px-6 py-16 md:py-24 animated-gradient rounded-3xl relative overflow-hidden">
          {/* Background glow effects */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#06B6D4]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
          
          {/* Floating geometric shapes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 right-20 w-24 h-24 border-2 border-[#06B6D4]/30 rounded-lg animate-float" style={{ animationDelay: '0s' }} />
            <div className="absolute bottom-32 left-20 w-20 h-20 border-2 border-[#06B6D4]/20 rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
          </div>
          
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                What Makes Us <span className="text-[#06B6D4]">Different</span>
              </h2>
              <p className="text-xl text-blue-100">
                Strategic partner. Proven results. Cutting-edge AI.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Strategic Vision */}
              <div className="bg-white/5 backdrop-blur-md border border-[#06B6D4]/30 rounded-xl p-8 hover:shadow-[0_0_40px_rgba(6,182,212,0.2)] hover:border-[#06B6D4]/60 transition-all">
                <div className="w-16 h-16 rounded-lg bg-[#06B6D4]/20 flex items-center justify-center mb-6 mx-auto">
                  <Eye className="w-8 h-8 text-[#06B6D4]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 text-center">Strategic Vision</h3>
                <p className="text-base text-blue-100 leading-relaxed text-center">
                  15+ years P&L leadership meets cutting-edge AI. Business transformation, not just tech.
                </p>
              </div>

              {/* No Vendor Lock-In */}
              <div className="bg-white/5 backdrop-blur-md border border-[#06B6D4]/30 rounded-xl p-8 hover:shadow-[0_0_40px_rgba(6,182,212,0.2)] hover:border-[#06B6D4]/60 transition-all">
                <div className="w-16 h-16 rounded-lg bg-[#06B6D4]/20 flex items-center justify-center mb-6 mx-auto">
                  <Unlock className="w-8 h-8 text-[#06B6D4]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 text-center">You Own Everything</h3>
                <p className="text-base text-blue-100 leading-relaxed text-center">
                  Built on your stack. Full documentation. Total control. No vendor lock-in.
                </p>
              </div>

              {/* Transformation Not Automation */}
              <div className="bg-white/5 backdrop-blur-md border border-[#06B6D4]/30 rounded-xl p-8 hover:shadow-[0_0_40px_rgba(6,182,212,0.2)] hover:border-[#06B6D4]/60 transition-all">
                <div className="w-16 h-16 rounded-lg bg-[#06B6D4]/20 flex items-center justify-center mb-6 mx-auto">
                  <Rocket className="w-8 h-8 text-[#06B6D4]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 text-center">Strategic Transformation</h3>
                <p className="text-base text-blue-100 leading-relaxed text-center">
                  Automation plus new revenue models and competitive advantages. Transform how you compete.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* White Space Separator */}
        <div className="bg-background py-8 md:py-12" />

        {/* CTA Section */}
        <section className="mx-auto max-w-5xl px-6 py-12 md:py-16 hero-section rounded-3xl relative overflow-hidden">
          <div className="hero-section__bg" />
          
          <div className="relative z-10 text-center">
            <div className="flex items-center justify-center mb-10">
              <a
                href="https://calendly.com/sandeep-kalyanai/ai-opportunity-assessment"
                className="group inline-flex items-center gap-3 rounded-full px-12 py-6 text-xl md:text-2xl font-bold bg-[#06B6D4] text-white shadow-2xl hover:shadow-cyan-500/30 hover:scale-110 transition-all"
              >
                <span>Book Your Free Assessment →</span>
                <TrendingUp className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Calendly Inline Embed */}
            <div id="calendly" className="mt-12 rounded-3xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-lg border border-white/20 p-2">
              <div
                className="calendly-inline-widget"
                data-url="https://calendly.com/sandeep-kalyanai/ai-opportunity-assessment?hide_gdpr_banner=1&primary_color=06b6d4"
                style={{ minWidth: '320px', height: '700px' }}
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="hero-section text-white mt-20 relative overflow-hidden">
        <div className="hero-section__bg" />
        
        <div className="mx-auto max-w-7xl px-6 py-16 relative z-10">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Company Info */}
            <div>
              <img src={logoFooterSvg} alt="Kalyan AI Logo" className="hidden md:block h-16 mb-6" />
              <img src={logoFooterMobileSvg} alt="Kalyan AI Logo" className="block md:hidden h-16 mb-6" />
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <div className="space-y-3 text-blue-100">
                <p>
                  <a href={`mailto:${CONFIG.brand.email}`} className="hover:text-[#06B6D4] transition-colors">
                    {CONFIG.brand.email}
                  </a>
                </p>
                <p className="text-sm">{CONFIG.brand.address}</p>
              </div>
              
              <h3 className="text-xl font-bold mb-4 mt-6">Follow Us</h3>
              <div className="flex items-center gap-4">
                <a href={CONFIG.brand.facebook} className="hover:text-[#06B6D4] transition-colors" aria-label="Facebook">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href={CONFIG.brand.instagram} className="hover:text-[#06B6D4] transition-colors" aria-label="Instagram">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href={CONFIG.brand.twitter} className="hover:text-[#06B6D4] transition-colors" aria-label="Twitter/X">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href={CONFIG.brand.linkedin} className="hover:text-[#06B6D4] transition-colors" aria-label="LinkedIn">
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <div className="space-y-3">
                <a href="/" className="block text-blue-100 hover:text-[#06B6D4] transition-colors">Home</a>
                <a href="/about" className="block text-blue-100 hover:text-[#06B6D4] transition-colors">About</a>
                <a href="/how-we-work" className="block text-blue-100 hover:text-[#06B6D4] transition-colors">How We Work</a>
                <a href="/faq" className="block text-blue-100 hover:text-[#06B6D4] transition-colors">FAQ</a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-blue-100 text-sm">
              © {year} {CONFIG.brand.name}. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="/privacy" className="text-blue-100 hover:text-[#06B6D4] transition-colors">Privacy Policy</a>
              <a href="/terms" className="text-blue-100 hover:text-[#06B6D4] transition-colors">Terms of Service</a>
              <a href="/dpa" className="text-blue-100 hover:text-[#06B6D4] transition-colors">DPA</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
