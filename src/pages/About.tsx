import { useMemo, useState, useEffect } from "react";
import { TrendingUp, Phone, Menu, X, Target, Shield, Zap, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import logoSvg from "@/assets/logo.svg";
import logoMobileSvg from "@/assets/logo-mobile.svg";
import logoFooterSvg from "@/assets/logo-footer.svg";
import logoFooterMobileSvg from "@/assets/logo-footer-mobile.svg";
import founderImage from "@/assets/founder-sandeep.webp";

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
  founder: {
    h2: "AI Transformation. Real Results.",
    intro: "I'm Sandeep Kalyan, founder with <span class='text-[#06B6D4] font-semibold'>15+ years of business leadership</span> across industries. I've owned <span class='text-[#06B6D4] font-semibold'>P&L</span>, scaled teams, and built businesses under real-world pressure. <span class='text-[#06B6D4] font-semibold'>Now</span>, I lead <span class='text-[#06B6D4] font-semibold'>Kalyan AI</span>, a team of strategists, developers, and transformation specialists who unlock <span class='text-[#06B6D4] font-semibold'>revenue growth</span> and <span class='text-[#06B6D4] font-semibold'>competitive advantages</span> using AI. My business experience ensures we solve <span class='text-[#06B6D4] font-semibold'>real problems</span>, not just implement technology.",
    nuvoLabs: "As a <span class='text-[#06B6D4] font-semibold'>contributor and shareholder of Nuvo Labs</span>, a deep tech AI research company, I bring <span class='text-[#06B6D4] font-semibold'>cutting-edge AI capabilities</span> directly to Kalyan AI. This connection keeps us at the <span class='text-[#06B6D4] font-semibold'>forefront of AI innovation</span> and enables my deep understanding of cutting-edge AI technologies so I can effectively guide my clients. My deep tech AI understanding stems from this hands-on involvement in pioneering AI research (see FAQ for more about Nuvo Labs). <span class='text-[#06B6D4] font-semibold'>Business strategy meets technical innovation</span>, delivering outcomes that actually matter to your bottom line.",
    photoAlt: "Portrait of Sandeep Kalyan"
  }
};

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xl md:text-3xl tracking-wide font-bold uppercase text-[#06B6D4] underline">
      {children}
    </p>
  );
}

function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [end]);
  
  return <span>{count}{suffix}</span>;
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

export default function About() {
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
            <a href="/about" className="text-sm font-bold text-[#06B6D4] transition-colors">About</a>
            <a href="/how-we-work" className="text-sm font-bold text-[#191970] hover:text-primary transition-colors">How We Work</a>
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
                className="block px-4 py-3 text-base font-bold text-[#06B6D4] rounded-lg"
              >
                About
              </a>
              <a
                href="/how-we-work"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-base font-bold text-[#191970] hover:bg-accent hover:text-primary rounded-lg transition-colors"
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
        <section className="hero-section relative min-h-[50vh] flex items-center py-12 md:py-20 px-6">
          <div className="hero-section__bg" />
          
          {/* Floating geometric elements */}
          <div className="absolute top-20 left-10 w-32 h-32 border border-[#06B6D4]/20 rounded-lg rotate-12 animate-float" />
          <div className="absolute bottom-20 right-10 w-24 h-24 border border-[#06B6D4]/30 rounded-full animate-float" style={{ animationDelay: '1s' }} />
          
          <div className="max-w-5xl mx-auto w-full relative z-10 text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-normal">
              Your <span className="text-[#06B6D4]">AI</span> Transformation Partner
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              <span className="text-[#06B6D4] font-semibold">15+ years business leadership.</span> <span className="text-[#06B6D4] font-semibold">Cutting-edge</span> <span className="text-[#06B6D4]">AI</span> innovation.
            </p>
          </div>
        </section>

        {/* About Us Section */}
        <section className="py-16 md:py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="hero-section rounded-3xl p-12 relative overflow-hidden">
              <div className="hero-section__bg" />
              
              {/* Background glow effects */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#06B6D4]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                  <p className="text-lg md:text-xl tracking-widest font-bold uppercase text-[#06B6D4] mb-6">
                    ABOUT US
                  </p>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-normal">
                    Strategic <span className="text-[#06B6D4]">AI</span>. Real Impact.
                  </h2>
                  <p className="text-lg md:text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
                    <span className="text-[#06B6D4]">AI</span> systems that unlock <span className="text-[#06B6D4] font-semibold">revenue</span> and <span className="text-[#06B6D4] font-semibold">competitive advantage</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Founder / AI Transformation Section */}
        <section className="mx-auto max-w-7xl px-6 py-16 md:py-24 animated-gradient rounded-3xl relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#06B6D4]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center tracking-normal">
              <span className="text-[#06B6D4]">AI</span> Transformation. Real Results.
            </h2>
            
            {/* Two column layout - Image and Intro */}
            <div className="grid md:grid-cols-[2fr_3fr] gap-12 mb-16 items-center">
              {/* Founder Image */}
              <div className="relative group max-w-xs md:max-w-sm mx-auto">
                {/* Primary teal glow - thicker */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#06B6D4]/30 to-blue-500/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
                
                {/* Secondary deeper glow for depth */}
                <div className="absolute inset-0 bg-[#06B6D4]/20 rounded-2xl blur-xl group-hover:opacity-80 transition-all duration-500" />
                
                <img 
                  src={founderImage} 
                  alt="Sandeep Kalyan, Founder of Kalyan AI - 15+ years business leadership in AI transformation"
                  className="relative rounded-2xl shadow-2xl w-full aspect-square object-cover border-[3px] border-[#06B6D4]/40 group-hover:scale-[1.02] transition-all duration-500"
                />
              </div>
              
              {/* Intro Text */}
              <div className="space-y-6">
                <p className="text-lg text-blue-100 leading-relaxed">
                  {CONFIG.founder.intro.split('. ').map((sentence, i) => {
                    const processedSentence = sentence.replace(/\bAI\b/g, '<span class="text-[#06B6D4] font-semibold">AI</span>');
                    return (
                      <span
                        key={i}
                        dangerouslySetInnerHTML={{
                          __html: processedSentence + (i < CONFIG.founder.intro.split('. ').length - 1 ? '. ' : '')
                        }}
                      />
                    );
                  })}
                </p>
                
                <p className="text-lg text-blue-100 leading-relaxed">
                  {CONFIG.founder.nuvoLabs.split('. ').map((sentence, i) => {
                    const processedSentence = sentence.replace(/\bAI\b/g, '<span class="text-[#06B6D4] font-semibold">AI</span>');
                    return (
                      <span
                        key={i}
                        dangerouslySetInnerHTML={{
                          __html: processedSentence + (i < CONFIG.founder.nuvoLabs.split('. ').length - 1 ? '. ' : '')
                        }}
                      />
                    );
                  })}
                </p>
              </div>
            </div>
            
            {/* What We Do - Card Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* Card 1 */}
              <div className="backdrop-blur-xl bg-white/10 rounded-xl p-8 border border-white/20 hover:border-[#06B6D4] hover:scale-105 hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] transition-all duration-500 group">
              <div className="w-14 h-14 rounded-lg bg-[#06B6D4]/20 flex items-center justify-center mb-6 mx-auto group-hover:bg-[#06B6D4]/40 transition-colors">
                  <Target className="w-7 h-7 text-[#06B6D4]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Business Transformation</h3>
                <p className="text-blue-100 leading-relaxed">
                  Identify where <span className="text-[#06B6D4]">AI</span> creates <span className="text-[#06B6D4] font-semibold">competitive advantage</span>.
                </p>
              </div>
              
              {/* Card 2 */}
              <div className="backdrop-blur-xl bg-white/10 rounded-xl p-8 border border-white/20 hover:border-[#06B6D4] hover:scale-105 hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] transition-all duration-500 group">
              <div className="w-14 h-14 rounded-lg bg-[#06B6D4]/20 flex items-center justify-center mb-6 mx-auto group-hover:bg-[#06B6D4]/40 transition-colors">
                  <TrendingUp className="w-7 h-7 text-[#06B6D4]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Unlock Revenue</h3>
                <p className="text-blue-100 leading-relaxed">
                  <span className="text-[#06B6D4] font-semibold">New products</span> and <span className="text-[#06B6D4] font-semibold">opportunities</span> through <span className="text-[#06B6D4]">AI</span>.
                </p>
              </div>
              
              {/* Card 3 */}
              <div className="backdrop-blur-xl bg-white/10 rounded-xl p-8 border border-white/20 hover:border-[#06B6D4] hover:scale-105 hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] transition-all duration-500 group">
                <div className="w-14 h-14 rounded-lg bg-[#06B6D4]/20 flex items-center justify-center mb-6 mx-auto group-hover:bg-[#06B6D4]/40 transition-colors">
                  <Zap className="w-7 h-7 text-[#06B6D4]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Deliver Fast</h3>
                <p className="text-blue-100 leading-relaxed">
                  <span className="text-[#06B6D4] font-semibold">Production systems</span> in weeks. <span className="text-[#06B6D4] font-semibold">Measurable ROI</span>.
                </p>
              </div>
            </div>
            
            {/* What You Get - Highlight Banner */}
            <div className="border-2 border-[#06B6D4] px-8 py-6 bg-[#06B6D4]/10 rounded-xl text-center backdrop-blur-sm">
              <p className="text-lg text-blue-100 leading-relaxed">
                <span className="font-bold text-[#06B6D4]">Transformed operations. New growth.</span> Revenue streams and competitive edge for the <span className="text-[#06B6D4]">AI</span> era.
              </p>
            </div>
          </div>
        </section>

        {/* Three Pillars Section */}
        <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="text-center mb-16">
            <p className="text-cyan-500 font-semibold text-2xl">The Three Pillars Of Our Success</p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="hero-section rounded-2xl border-2 border-[#06B6D4]/40 backdrop-blur-sm p-8 shadow-lg hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:-translate-y-2 hover:scale-[1.03] hover:border-[#06B6D4]/80 text-center group transition-all duration-500 animate-fade-in relative overflow-hidden">
              <div className="hero-section__bg" />
              <div className="relative z-10">
                <div className="text-cyan-300 mb-6 mx-auto transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <Target className="w-16 h-16 mx-auto text-white drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Strategic Vision</h3>
                <p className="text-lg text-blue-50 leading-relaxed text-center">
                  Deep <span className="text-[#06B6D4]">AI</span> <span className="text-[#06B6D4] font-semibold">expertise</span>. <span className="text-[#06B6D4] font-semibold">Opportunities</span> others miss.
                </p>
              </div>
            </div>
            
            <div className="hero-section rounded-2xl border-2 border-[#06B6D4]/40 backdrop-blur-sm p-8 shadow-lg hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:-translate-y-2 hover:scale-[1.03] hover:border-[#06B6D4]/80 text-center group transition-all duration-500 animate-fade-in relative overflow-hidden">
              <div className="hero-section__bg" />
              <div className="relative z-10">
                <div className="text-cyan-300 mb-6 mx-auto transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <Zap className="w-16 h-16 mx-auto text-white drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Transformation Expertise</h3>
                <p className="text-lg text-blue-50 leading-relaxed">
                  <span className="text-[#06B6D4] font-semibold">Revenue models</span> that drive <span className="text-[#06B6D4] font-semibold">growth</span>.
                </p>
              </div>
            </div>
            
            <div className="hero-section rounded-2xl border-2 border-[#06B6D4]/40 backdrop-blur-sm p-8 shadow-lg hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:-translate-y-2 hover:scale-[1.03] hover:border-[#06B6D4]/80 text-center group transition-all duration-500 animate-fade-in relative overflow-hidden">
              <div className="hero-section__bg" />
              <div className="relative z-10">
                <div className="text-cyan-300 mb-6 mx-auto transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <Shield className="w-16 h-16 mx-auto text-white drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Innovation Edge</h3>
                <p className="text-lg text-blue-50 leading-relaxed text-center">
                  Systems that <span className="text-[#06B6D4] font-semibold">scale</span> with <span className="text-[#06B6D4] font-semibold">technology</span>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mx-auto max-w-5xl px-6 py-16 md:py-24 hero-section rounded-3xl relative overflow-hidden">
          <div className="hero-section__bg" />
          <div className="text-center relative z-10">
            <div className="inline-block mb-6">
              <span className="px-6 py-3 rounded-full bg-gradient-to-r from-[#06B6D4] to-[#0EA5E9] text-white text-base font-bold uppercase tracking-wide shadow-lg">
                Let's Talk About Your Business
              </span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready to <span className="text-[#06B6D4]">Transform?</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Book a 30-minute <span className="text-[#06B6D4]">AI</span> strategy session
            </p>
            
            <div className="flex items-center justify-center mb-10">
              <a
                href="https://calendly.com/sandeep-kalyanai/ai-opportunity-assessment"
                className="group inline-flex items-center gap-3 rounded-full px-12 py-6 text-xl md:text-2xl font-bold bg-gradient-to-br from-[#191970] to-[#0C0C52] text-white shadow-2xl hover:shadow-primary/50 hover:scale-110 transition-all"
              >
                <span>Book Your Free Call →</span>
                <TrendingUp className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Calendly Inline Embed */}
            <div id="calendly" className="mt-12 rounded-3xl overflow-hidden shadow-2xl border border-[#06B6D4]/20">
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
          <div className="grid gap-12 md:grid-cols-3 items-start mb-12">
            <div className="text-center md:text-left">
              <img
                src={logoFooterSvg}
                alt="Kalyan AI - AI Implementation Partner"
                className="hidden md:block h-20 md:h-24 w-auto mb-6 mx-auto md:mx-0"
              />
              <img
                src={logoFooterMobileSvg}
                alt="Kalyan AI - AI Implementation Partner"
                className="block md:hidden h-20 w-auto mb-6 mx-auto"
              />
            </div>
            
            <div className="text-center md:text-left">
              <h4 className="font-bold text-xl mb-6 text-[#06B6D4]">Contact</h4>
              <ul className="space-y-4 text-blue-100">
                <li>
                  <a
                    className="hover:text-[#06B6D4] transition-colors flex items-center gap-2 justify-center md:justify-start"
                    href={`mailto:${CONFIG.brand.email}`}
                  >
                    {CONFIG.brand.email}
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-[#06B6D4] transition-colors flex items-center gap-2 justify-center md:justify-start"
                    href={`https://${CONFIG.brand.domain}`}
                  >
                    {CONFIG.brand.domain}
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="text-center md:text-left">
              <h4 className="font-bold text-xl mb-6 text-[#06B6D4]">Follow Us</h4>
              <div className="flex items-center gap-4 justify-center md:justify-start">
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
          </div>
          
          <div className="grid gap-12 md:grid-cols-3 items-start mb-12">
            <div></div>
            
            <div className="text-center md:text-left">
              <h4 className="font-bold text-xl mb-6 text-[#06B6D4]">Location</h4>
              <p className="text-blue-100 leading-relaxed">{CONFIG.brand.address}</p>
            </div>
          </div>
          
          <div className="border-t border-white/20 pt-8 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-blue-100/80 text-sm">
                © {year} {CONFIG.brand.name}. All rights reserved.
              </p>
              <div className="flex items-center gap-6 text-sm text-blue-100/80">
                <a href="/privacy" className="hover:text-[#06B6D4] transition-colors">
                  Privacy
                </a>
                <a href="/dpa" className="hover:text-[#06B6D4] transition-colors">
                  DPA
                </a>
                <a href="/terms" className="hover:text-[#06B6D4] transition-colors">
                  Terms
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
