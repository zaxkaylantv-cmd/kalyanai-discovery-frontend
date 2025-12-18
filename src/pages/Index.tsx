import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckSquare, Menu, X, Clock, Award, TrendingUp, TrendingDown, Zap, Rocket, Target, ShieldCheck, Shield, ChevronDown, ChevronRight, Phone, Star, Building, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import heroImage from "@/assets/hero-automation.jpg";
import founderImage from "@/assets/founder-sandeep.jpg";
import logoSvg from "@/assets/logo.svg";
import logoMobileSvg from "@/assets/logo-mobile.svg";
import logoFooterSvg from "@/assets/logo-footer.svg";
import logoFooterMobileSvg from "@/assets/logo-footer-mobile.svg";
import processDiscovery from "@/assets/process-discovery.jpg";
import processImplementation from "@/assets/process-implementation.jpg";
import processOptimisation from "@/assets/process-optimisation.jpg";
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
    tagline: "Your AI Implementation Partner"
  },
  hero: {
    h1: "AI Powered Business Transformation",
    sub: "AI doesn't have to be confusing. It has to work.\nWe solve real problems and unlock new revenue",
    subHighlights: ["work", "real problems", "new revenue"],
    primaryCta: {
      label: "Start Your AI Journey",
      href: "https://calendly.com/sandeep-kalyanai/ai-opportunity-assessment"
    },
    secondaryCta: {
      label: "See FAQ →",
      href: "#faq"
    },
    proof: [{
      icon: "✅",
      text: "25+ SMEs automated"
    }, {
      icon: "⚙️",
      text: "40+ workflows built"
    }, {
      icon: "⏱️",
      text: "Avg 17 hours saved/week"
    }]
  },
  proof: {
    results: [{
      title: "Email Triage Time, 90 min/day → 20 min/day",
      timeframe: "(within 14 days of kickoff)",
      description: "Inbox auto-sorted with one-line summaries; review a daily digest instead of every email."
    }, {
      title: "Support First Response Time, 7m → 1m 45s",
      timeframe: "(within 2 weeks of go-live)",
      description: "Tickets auto-classified and routed; first-reply drafts generated for agents to approve."
    }, {
      title: "Ticket Notes Auto-Drafted, 0% → 80% of tickets",
      timeframe: "(by week 3)",
      description: "AI creates internal notes/summaries; agents review and tweak instead of writing from scratch."
    }, {
      title: "Weekly Reporting Time, 4 hrs → 15 min",
      timeframe: "(within 10 days of kickoff)",
      description: "Data pulls, cleaning, and charts automated; you just review and send."
    }]
  },
  offer: {
    h2: "AI Strategy Session",
    bullets: ["Business & AI Assessment", "Custom Transformation Roadmap", "High-Impact Opportunities", "Clear Next Steps"],
    faq: [{
      q: "What happens in the strategy session?",
      a: "We analyse your business goals, current operations, and growth challenges to identify where AI can create the most impact, whether through automation, new revenue streams, operational excellence, or competitive positioning. You'll leave with a clear, actionable roadmap."
    }, {
      q: "Is this just about automation?",
      a: "No. While automation is one powerful tool, we focus on holistic business transformation. <span class='text-[#06B6D4] font-semibold'>My 15+ years of business leadership</span> combined with our AI capabilities means we help you unlock growth, reduce costs, create new offerings, and build sustainable competitive advantages. We understand business first, then apply AI strategically."
    }, {
      q: "What's the investment?",
      a: "The initial strategy session is completely free with no obligation. If we identify opportunities that align with your goals, we'll propose a custom engagement based on the scope and expected ROI."
    }]
  },
  process: [{
    step: "01",
    title: "Discovery (Week 1)",
    text: "30‑minute assessment; identify 2 to 3 targets; agree a single KPI (hours saved, SLA, or response time).",
    ticks: ["Free initial assessment", "No obligation"]
  }, {
    step: "02",
    title: "Implementation (Weeks 2 to 3)",
    text: "Build with Make, ChatGPT, Claude and custom glue; daily progress; train your team as we go.",
    ticks: ["Daily updates", "Hands‑on training included"]
  }, {
    step: "03",
    title: "Optimisation (Week 4+)",
    text: "Refine based on real usage; scale what works; optional ongoing support to keep things smooth.",
    ticks: ["30‑day support included", "Ongoing optimisation available"]
  }],
  founder: {
    h2: "AI Transformation. Real Results.",
    intro: "I'm Sandeep Kalyan, with <span class='text-[#06B6D4] font-semibold'>15+ years of business leadership</span> across industries. I've owned P&L, scaled teams under pressure, and know what it takes to drive real growth. <span class='text-[#06B6D4] font-semibold'>Today</span>, I lead <span class='text-[#06B6D4] font-semibold'>Kalyan AI</span>, a team of strategists, developers, and transformation specialists who help businesses unlock new revenue models and competitive advantages using AI as a strategic enabler.",
    nuvoLabs: "My expertise in <span class='text-[#06B6D4] font-semibold'>deep tech AI innovation</span> gives Kalyan AI direct access to cutting-edge capabilities that keep us at the forefront of what's possible. <span class='text-[#06B6D4] font-semibold'>My 15+ years of business experience</span> combined with deep tech AI expertise means we deliver AI transformation with <span class='text-[#06B6D4] font-semibold'>strategic vision and technical depth</span>.",
    whatWeDo: {
      title: "What we do",
      points: ["Business Transformation, not just optimisation: We assess your entire business model, operations, revenue streams, customer experience, competitive positioning, and identify where AI can create step-change improvements, not just incremental gains.", "Unlock new revenue models: Beyond cost reduction, we help you create new products, services, and market opportunities using AI capabilities that weren't possible before.", "De-risk and deliver fast: Production systems in weeks, built within your existing stack, with clear ownership, training, and measurable ROI from day one."]
    },
    outcome: "Transformed operations and new growth opportunities. Beyond cost reduction: new revenue streams, competitive differentiation, and strategic positioning for the AI era. 15+ years business experience combined with deep tech AI expertise delivers outcomes that matter.",
    photoAlt: "Portrait of Sandeep Kalyan"
  },
  cta: {
    h2: "Ready To Build Momentum?",
    sub: "Book A Free 30‑Minute AI Strategy Assessment, No Obligation, No Pitch.",
    button: {
      label: "Book your assessment →",
      href: "https://calendly.com/sandeep-kalyanai/ai-opportunity-assessment"
    },
    subtext: "Partner with a founder who's walked in your shoes and knows how to turn AI into business outcomes.",
    trust: ["30‑min call", "Free assessment", "No commitment"]
  },
  faqs: [{
    q: "How is this different from just implementing automation tools?",
    a: "We take a business-first approach. Whilst many providers focus on isolated automations, we look at your entire value chain, operations, revenue models, customer experience, and competitive positioning. AI is the enabler, but business transformation is the goal. You'll gain operational efficiency AND new growth opportunities."
  }, {
    q: "What kind of business outcomes can I expect?",
    a: "Our clients typically see multiple benefits: 40-70% reduction in manual work, faster decision-making with real-time insights, new revenue streams from AI-enhanced offerings, and improved competitive positioning. We set clear KPIs on day one, whether it's cost reduction, revenue growth, speed to market, or customer satisfaction."
  }, {
    q: "Is this only for tech-savvy companies?",
    a: "Not at all. We work with traditional businesses across manufacturing, professional services, healthcare, retail, and more. We translate complex AI capabilities into practical business solutions, train your team, and ensure smooth adoption. If you can describe your business challenges, we can help transform them."
  }, {
    q: "How do you ensure this creates lasting value, not just a short-term fix?",
    a: "We build for sustainability: systems integrate with your existing tools, your team learns alongside us, and we document everything. Post-implementation, you own the solution. We also offer ongoing optimisation to help you scale what works and adapt as your business grows. This is transformation, not a band-aid."
  }, {
    q: "How do you integrate with our existing systems?",
    a: "We work within your current tech stack, CRM, email, databases, spreadsheets, and APIs. No need to rip and replace. We use secure, least-privilege access and can provide audit trails. Most implementations go live in 2 to 4 weeks with minimal disruption to daily operations."
  }, {
    q: "Will I be locked into specific vendors or platforms?",
    a: "No. We build solutions using industry-standard tools and APIs that you control. You own all code, configurations, and integrations. We document everything thoroughly and train your team, so you're never dependent on us. You can maintain, modify, or migrate the systems independently at any time."
  }, {
    q: "How do you handle our data privacy and security?",
    a: "We follow strict data protection principles: least-privilege access, encryption in transit and at rest, and compliance with GDPR/UK data protection laws. We never store your sensitive data on our systems. All AI processing uses enterprise-grade providers with robust security certifications. We can provide detailed security documentation and sign NDAs or DPAs as needed."
  }, {
    q: "Where will our AI solutions be hosted?",
    a: "Your solutions run within your existing infrastructure or trusted cloud providers you choose (AWS, Azure, Google Cloud, etc.). For workflow automation, we typically use platforms like Make.com or n8n hosted in EU/UK regions. You maintain full control over where your data lives and can specify geographic requirements."
  }, {
    q: "Who maintains the AI systems after implementation?",
    a: "You own everything we build, full documentation and training included. Most clients manage day-to-day operations themselves after our handover. We offer optional ongoing support packages for monitoring, optimization, and scaling. You're never locked in, maintain it yourself, use your internal team, or keep us on retainer. Your choice."
  }]
};

// Simple SVG Icons
const Icon = ({
  name,
  className = "w-6 h-6"
}: {
  name: string;
  className?: string;
}) => {
  switch (name) {
    case "automation":
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
          <path strokeWidth="1.5" d="M4 8h8M4 12h12M4 16h6" />
          <circle cx="18" cy="6" r="2" strokeWidth="1.5" />
        </svg>;
    case "optimise":
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
          <path strokeWidth="1.5" d="M3 12h4l3 8 4-16 3 8h4" />
        </svg>;
    case "integrate":
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
          <path strokeWidth="1.5" d="M8 12h8M12 8v8" />
          <rect x="3" y="3" width="6" height="6" rx="2" strokeWidth="1.5" />
          <rect x="15" y="15" width="6" height="6" rx="2" strokeWidth="1.5" />
        </svg>;
    default:
      return null;
  }
};
function SectionEyebrow({
  children
}: {
  children: React.ReactNode;
}) {
  return <p className="text-xl md:text-3xl tracking-wide font-bold uppercase text-[#06B6D4] underline">
      {children}
    </p>;
}
function Badge({
  children
}: {
  children: React.ReactNode;
}) {
  return <span className="inline-flex items-center rounded-full border border-primary/20 px-3 py-1 text-sm text-cyan-600 font-bold">
      {children}
    </span>;
}

// Animated Counter Component
function AnimatedCounter({
  end,
  suffix = ""
}: {
  end: number;
  suffix?: string;
}) {
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

// Sticky CTA Button
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
  return <div className="fixed bottom-6 right-6 z-50 animate-fade-up">
      <a href="https://calendly.com/sandeep-kalyanai/ai-opportunity-assessment" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold bg-[#06B6D4] text-white shadow-2xl hover:scale-105 transition-all">
        <Phone className="w-4 h-4" />
        Book Free Call
      </a>
    </div>;
}
// Floating Particles Component
const FloatingParticles = () => {
  const particles = useMemo(() => {
    return Array.from({
      length: 15
    }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 12 + 8,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.4 + 0.2
    }));
  }, []);
  return <>
      {particles.map(particle => <div key={particle.id} className="floating-particle" style={{
      width: `${particle.size}px`,
      height: `${particle.size}px`,
      left: `${particle.left}%`,
      top: `${particle.top}%`,
      opacity: particle.opacity,
      animation: `float-particle ${particle.duration}s ease-in-out infinite`,
      animationDelay: `${particle.delay}s`
    }} aria-hidden="true" />)}
    </>;
};
export default function Index() {
  const year = useMemo(() => CONFIG.brand.year, []);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

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
  return <div className="min-h-screen bg-background text-foreground">
      {/* Sticky CTA Button */}
      <StickyCtaButton />

      {/* Navigation */}
      <nav className="bg-background sticky top-0 z-50 shadow-none">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <img src={logoSvg} alt="Kalyan AI - AI Implementation Partner" className="hidden md:block h-16 md:h-20 lg:h-24 w-auto" />
          <img src={logoMobileSvg} alt="Kalyan AI - AI Implementation Partner" className="block md:hidden h-16 w-auto" />
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/" className="text-sm font-bold text-[#191970] hover:text-primary transition-colors">Home</a>
            <a href="/about" className="text-sm font-bold text-[#191970] hover:text-primary transition-colors">About</a>
            <a href="/how-we-work" className="text-sm font-bold text-[#191970] hover:text-primary transition-colors">How We Work</a>
            <a href="/faq" className="text-sm font-bold text-[#191970] hover:text-primary transition-colors">FAQ</a>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-[#191970] hover:text-primary transition-colors" aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && <div className="md:hidden bg-background animate-fade-up">
            <div className="px-4 py-4 space-y-3">
              <a href="/" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-base font-bold text-[#191970] hover:bg-accent hover:text-primary rounded-lg transition-colors">
                Home
              </a>
              <a href="/about" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-base font-bold text-[#191970] hover:bg-accent hover:text-primary rounded-lg transition-colors">
                About
              </a>
              <a href="/how-we-work" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-base font-bold text-[#191970] hover:bg-accent hover:text-primary rounded-lg transition-colors">
                How We Work
              </a>
              <a href="/faq" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-base font-bold text-[#191970] hover:bg-accent hover:text-primary rounded-lg transition-colors">
                FAQ
              </a>
            </div>
          </div>}
      </nav>

      {/* Hero - Neural Network Design */}
      <section className="hero-section relative min-h-[85vh] md:min-h-[85vh] min-h-[70vh] flex items-center py-12 md:py-20 px-6">
        <div className="hero-section__bg" />

        {/* Floating Particles */}
        <FloatingParticles />


        <div className="max-w-7xl md:mx-auto mx-0 w-full relative z-10">
          <div className="max-w-[720px] text-center md:text-left">
            <h1 className="hero-title text-5xl md:text-6xl lg:text-7xl mb-5 animate-fade-in">
              {CONFIG.hero.h1.split('.').map((part, i) => <span key={i}>
                  {part.includes('AI') ? <>
                      {part.split('AI')[0]}
                      <span className="text-[#06B6D4]">AI</span>
                      {part.split('AI')[1]}
                    </> : part}
                  {i < CONFIG.hero.h1.split('.').length - 1 && '.'}
                  {i < CONFIG.hero.h1.split('.').length - 1 && <br />}
                </span>)}
            </h1>

            <p className="hero-subtitle text-lg md:text-xl mb-10 animate-fade-in delay-100">
              {CONFIG.hero.sub.split('\n').map((line, i) => {
              let processedLine = line;
              // Highlight AI first
              processedLine = processedLine.replace(/\bAI\b/g, '<span class="text-[#06B6D4] font-semibold">AI</span>');
              // Then highlight other phrases
              CONFIG.hero.subHighlights?.forEach(phrase => {
                processedLine = processedLine.replace(phrase, `<span class="text-[#06B6D4] font-semibold">${phrase}</span>`);
              });
              return <span key={i} dangerouslySetInnerHTML={{
                __html: processedLine
              }} />;
            }).reduce((acc, curr, i) => {
              if (i === 0) return [curr];
              return [...acc, <br key={`br-${i}`} />, curr];
            }, [] as React.ReactNode[])}
            </p>

            <div className="flex gap-4 items-center flex-wrap mt-12 animate-fade-in delay-200 justify-center md:justify-start">
              <Link to="/discovery" className="hero-btn-gradient inline-flex items-center justify-center rounded-xl font-bold
                           h-10 px-4 text-sm
                           sm:h-11 sm:px-5 sm:text-sm
                           tracking-normal whitespace-nowrap" aria-label="Get Started">
                Get Started
                <span className="ml-2">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="bg-background py-8 md:py-12" />

      {/* Four Ways Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="hero-section rounded-3xl p-12 relative overflow-hidden">
            <div className="hero-section__bg" />
            
            {/* Background glow effects */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#06B6D4]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10">
              <div className="text-center mb-16">
                
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
                  Four Ways We Build Your <span className="text-[#06B6D4]">AI</span> Advantage
                </h2>
                <p className="text-2xl font-medium">
                  <span className="text-white">We don't just implement</span> <span className="text-[#06B6D4]">AI</span>. <span className="text-white">We give you the</span> <span className="text-[#06B6D4]">defensible advantage</span>.
                </p>
              </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Card 1 - Gain Competitive Edge */}
            <div className="group relative bg-gradient-to-br from-[#0A192F] to-[#1a2744] border-2 border-[#06B6D4]/30 hover:border-[#06B6D4] p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-fade-in">
              <div className="flex justify-center md:justify-start">
                <div className="w-12 h-12 rounded-full bg-[#06B6D4]/20 flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
                  <Zap className="text-[#06B6D4] w-6 h-6" />
                </div>
              </div>
                <div className="text-xl font-bold text-white mb-2">Gain Competitive Edge</div>
              <p className="text-sm text-blue-100/80 mt-2">
                While others hesitate, you execute
              </p>
            </div>

            {/* Card 2 - Scale Without Limits */}
            <div className="group relative bg-gradient-to-br from-[#0A192F] to-[#1a2744] border-2 border-[#06B6D4]/30 hover:border-[#06B6D4] p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-fade-in" style={{
            animationDelay: '0.1s'
          }}>
              <div className="flex justify-center md:justify-start">
                <div className="w-12 h-12 rounded-full bg-[#06B6D4]/20 flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
                  <Rocket className="text-[#06B6D4] w-6 h-6" />
                </div>
              </div>
              <div className="text-xl font-bold text-white mb-2 text-center md:text-left">Scale Without Limits</div>
              <p className="text-sm text-blue-100/80 mt-2 text-center md:text-left">
                <span className="text-[#06B6D4]">AI</span> scales instantly, your team doesn't have to
              </p>
            </div>

            {/* Card 3 - Own Your Market Position */}
            <div className="group relative bg-gradient-to-br from-[#0A192F] to-[#1a2744] border-2 border-[#06B6D4]/30 hover:border-[#06B6D4] p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-fade-in" style={{
            animationDelay: '0.2s'
          }}>
              <div className="flex justify-center md:justify-start">
                <div className="w-12 h-12 rounded-full bg-[#06B6D4]/20 flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
                  <Target className="text-[#06B6D4] w-6 h-6" />
                </div>
              </div>
                <div className="text-xl font-bold text-white mb-2 text-center md:text-left">Own Your Market Position</div>
              <p className="text-sm text-blue-100/80 mt-2 text-center md:text-left">
                Turn <span className="text-[#06B6D4]">AI</span> into your differentiation, not just efficiency
              </p>
            </div>

            {/* Card 4 - Build a Moat */}
            <div className="group relative bg-gradient-to-br from-[#0A192F] to-[#1a2744] border-2 border-[#06B6D4]/30 hover:border-[#06B6D4] p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-fade-in" style={{
            animationDelay: '0.3s'
          }}>
              <div className="flex justify-center md:justify-start">
                <div className="w-12 h-12 rounded-full bg-[#06B6D4]/20 flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
                  <ShieldCheck className="text-[#06B6D4] w-6 h-6" />
                </div>
              </div>
                <div className="text-xl font-bold text-white mb-2 text-center md:text-left">Build a Moat</div>
              <p className="text-sm text-blue-100/80 mt-2 text-center md:text-left">
                Your processes become your competitive barrier
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <a href="https://calendly.com/sandeep-kalyanai/ai-opportunity-assessment" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#06B6D4] hover:bg-[#0891B2] text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              Book Your Strategy Session
              <ChevronRight className="w-5 h-5" />
            </a>
            <p className="text-sm text-blue-100/80 mt-4">
              Free 30 min assessment • No obligation • See your competitive gaps
            </p>
          </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="bg-background py-8 md:py-12" />

      <main>

      {/* Why Choose Us Section - Cutting Edge AI Design */}
      <section id="why-choose-us" className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-[#0A192F] via-[#112240] to-[#1a2744]">
        {/* Floating Particles Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-[#06B6D4] rounded-full opacity-20 animate-float-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Animated Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 text-sm font-bold tracking-wider bg-gradient-to-r from-[#06B6D4] to-[#0EA5E9] text-white rounded-full shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                THE DIFFERENCE
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              AI Transformation.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] to-[#0EA5E9] animate-pulse">
                Real Results
              </span>
            </h2>
          </div>

          {/* Holographic Gradient Card - Main Value Prop */}
          <div className="mb-12 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#06B6D4] via-[#0EA5E9] to-[#06B6D4] rounded-2xl opacity-50 blur-xl group-hover:opacity-75 transition-opacity animate-pulse" />
            <div className="relative backdrop-blur-xl bg-white/5 rounded-2xl p-8 sm:p-12 border-2 border-[#06B6D4]/50 shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_50px_rgba(6,182,212,0.5)] transition-all">
              <p className="text-lg sm:text-xl text-white/90 leading-relaxed text-center">
                <span className="text-[#06B6D4] font-bold">15+ years business leadership</span> meets <span className="text-[#06B6D4] font-bold">deep tech AI innovation</span>. Automation + <span className="text-[#0EA5E9] font-bold">transformation</span> that drives <span className="text-[#06B6D4] font-bold">revenue and competitive advantage</span>.
              </p>
            </div>
          </div>

          {/* 3 Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 place-items-center md:place-items-stretch">
            {/* Metric 1 */}
            <div className="backdrop-blur-xl bg-white/5 rounded-xl p-6 border border-[#06B6D4]/30 hover:border-[#06B6D4] hover:scale-105 hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all group">
              <div className="text-center">
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] to-[#0EA5E9] mb-2 group-hover:animate-pulse">
                  <AnimatedCounter end={15} suffix="+" />
                </div>
                <p className="text-white/80 font-medium">Years</p>
                <p className="text-[#06B6D4] text-sm mt-2">Business Experience</p>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="backdrop-blur-xl bg-white/5 rounded-xl p-6 border border-[#06B6D4]/30 hover:border-[#06B6D4] hover:scale-105 hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all group">
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <TrendingUp className="w-12 h-12 text-[#06B6D4] group-hover:animate-pulse" />
                </div>
                <p className="text-white font-bold text-xl mb-1">Proven Business Impact</p>
                <p className="text-white/70 text-sm">Measurable results in weeks</p>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="backdrop-blur-xl bg-white/5 rounded-xl p-6 border border-[#06B6D4]/30 hover:border-[#06B6D4] hover:scale-105 hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all group">
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <Award className="w-12 h-12 text-[#06B6D4] group-hover:animate-pulse" />
                </div>
                <p className="text-white font-bold text-xl mb-1">Deeper AI Understanding</p>
                <p className="text-white/70 text-sm">Through Deep Tech AI Expertise</p>
              </div>
            </div>
          </div>

          {/* 3 Approach Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Approach 1 */}
            <div className="backdrop-blur-xl bg-white/5 rounded-xl p-8 border border-white/10 hover:border-[#06B6D4] hover:scale-105 hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] transition-all group flex flex-col items-center md:items-start">
              <div className="mb-4">
                <div className="w-14 h-14 rounded-lg bg-[#06B6D4]/20 flex items-center justify-center group-hover:bg-[#06B6D4]/40 transition-colors">
                  <Target className="w-7 h-7 text-[#06B6D4] group-hover:animate-pulse" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Business Transformation Strategy</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Identify how AI creates competitive advantages.
              </p>
            </div>

            {/* Approach 2 */}
            <div className="backdrop-blur-xl bg-white/5 rounded-xl p-8 border border-white/10 hover:border-[#06B6D4] hover:scale-105 hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] transition-all group flex flex-col items-center md:items-start">
              <div className="mb-4">
                <div className="w-14 h-14 rounded-lg bg-[#06B6D4]/20 flex items-center justify-center group-hover:bg-[#06B6D4]/40 transition-colors">
                  <Shield className="w-7 h-7 text-[#06B6D4] group-hover:animate-pulse" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Future Proof Architecture</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Built on your infrastructure.
              </p>
            </div>

            {/* Approach 3 */}
            <div className="backdrop-blur-xl bg-white/5 rounded-xl p-8 border border-white/10 hover:border-[#06B6D4] hover:scale-105 hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] transition-all group flex flex-col items-center md:items-start">
              <div className="mb-4">
                <div className="w-14 h-14 rounded-lg bg-[#06B6D4]/20 flex items-center justify-center group-hover:bg-[#06B6D4]/40 transition-colors">
                  <Zap className="w-7 h-7 text-[#06B6D4] group-hover:animate-pulse" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Rapid Value Creation</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Measurable business impact in weeks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="bg-background py-8 md:py-12" />

        {/* Offer - SIGNATURE BANNER */}
        <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-[#0A192F] via-[#112240] to-[#1a2744]" aria-labelledby="offer-heading">
          {/* Background decorations */}
          <div className="absolute inset-0">
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
            
            {/* Glowing teal accents */}
            <div className="absolute top-20 left-10 w-96 h-96 bg-[#06B6D4]/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#0EA5E9]/10 rounded-full blur-3xl animate-pulse" style={{
            animationDelay: '1s'
          }}></div>
            
            {/* Floating particles */}
            
            
          </div>
          
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Ribbon Banner */}
              <div className="inline-block mb-8 px-6 py-3 bg-gradient-to-r from-[#06B6D4] to-[#0EA5E9] rounded-full shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-transform duration-300">
                <span className="text-[#0A192F] font-bold text-lg">SIGNATURE OFFER</span>
              </div>
              
              <h2 id="offer-heading" className="text-4xl md:text-6xl font-bold text-white mb-8 drop-shadow-lg">
                <span className="text-[#06B6D4]">AI</span> Strategy Session
              </h2>
              
              <p className="text-xl md:text-2xl text-[#E0F2FE] mb-12 leading-relaxed">
                <span className="font-bold text-[#06B6D4]">Transform operations</span> and <span className="font-bold text-[#06B6D4]">unlock revenue streams</span> with <span className="text-[#06B6D4]">AI</span>
              </p>
              
              {/* Offer details in enhanced glassmorphism cards */}
              <div className="grid sm:grid-cols-2 gap-6 mb-12 max-w-3xl mx-auto">
                {CONFIG.offer.bullets.map((b, i) => <div key={b} className="flex flex-col items-center gap-4 text-center bg-white/5 backdrop-blur-md p-6 rounded-xl border border-[#06B6D4]/30 hover:shadow-[0_0_40px_rgba(6,182,212,0.2)] hover:border-[#06B6D4]/60 transition-all duration-300 group">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#06B6D4] to-[#0EA5E9] flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.8)] transition-shadow duration-300">
                      <CheckSquare className="w-5 h-5 text-[#0A192F]" />
                    </div>
                    <span className="text-[#E0F2FE] text-lg leading-relaxed group-hover:text-white transition-colors duration-300" dangerouslySetInnerHTML={{
                  __html: b.replace(/\bAI\b/g, '<span class="text-[#06B6D4]">AI</span>')
                }} />
                  </div>)}
              </div>
              
              <div className="mb-12">
                <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-[#06B6D4]/30 px-8 py-4 rounded-full shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                  <Shield className="w-8 h-8 text-[#06B6D4]" />
                  <span className="text-xl font-bold text-white">No-Obligation Consultation</span>
                </div>
              </div>
              
              <a href={CONFIG.hero.primaryCta.href} className="inline-block rounded-full px-12 py-6 text-xl md:text-2xl font-bold bg-gradient-to-r from-[#06B6D4] to-[#0EA5E9] text-[#0A192F] shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:shadow-[0_0_60px_rgba(6,182,212,0.6)] hover:scale-105 transition-all duration-300 mb-10" aria-label="Book your assessment">
                Book Your Free Strategy Session →
              </a>
              
              <Accordion type="single" collapsible className="max-w-2xl mx-auto">
                {CONFIG.offer.faq.map((f, index) => (
                  <AccordionItem 
                    key={f.q} 
                    value={`item-${index}`}
                    className="border-b border-[#06B6D4]/20 bg-white/5 backdrop-blur-md rounded-lg mb-3 overflow-hidden hover:bg-white/10 transition-all duration-300"
                  >
                    <AccordionTrigger className="px-6 py-4 text-left hover:no-underline group">
                      <span className="font-bold text-white text-lg group-hover:text-[#06B6D4] transition-colors duration-300">
                        {f.q}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 pt-2">
                      <div 
                        className="text-[#E0F2FE] leading-relaxed text-left" 
                        dangerouslySetInnerHTML={{
                          __html: f.a.replace(/\bAI\b/g, '<span class="text-[#06B6D4] font-semibold">AI</span>')
                        }} 
                      />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Spacer */}
        <div className="bg-background py-8 md:py-12" />

        {/* Calendly Embed Section */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 hero-section relative overflow-hidden">
          <div className="hero-section__bg" />
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Book Your Free AI Strategy Session
              </h2>
              <p className="text-lg text-white max-w-2xl mx-auto">
                Schedule your <span className="text-[#06B6D4] font-semibold">complimentary 30-minute consultation</span>
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-4 border border-gray-200">
              <div 
                className="calendly-inline-widget" 
                data-url="https://calendly.com/sandeep-kalyanai/ai-opportunity-assessment?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=06b6d4"
                style={{ minWidth: '320px', height: '700px' }}
              />
            </div>
          </div>
        </section>

      </main>

      {/* Spacer */}
      <div className="bg-background py-8 md:py-12" />

      {/* Footer */}
      <footer className="hero-section text-white mt-20 relative overflow-hidden">
        <div className="hero-section__bg" />
        
        <div className="mx-auto max-w-7xl px-6 py-16 relative z-10">
          <div className="flex flex-col md:grid gap-12 md:grid-cols-3 items-center md:items-start mb-12">
            <div className="flex flex-col items-center md:items-start md:text-left w-full max-w-md md:max-w-none">
              <img src={logoFooterSvg} alt="Kalyan AI - AI Implementation Partner" className="hidden md:block h-20 md:h-24 w-auto mb-6 mx-auto md:mx-0" />
              <img src={logoFooterMobileSvg} alt="Kalyan AI - AI Implementation Partner" className="block md:hidden h-20 w-auto mb-6 mx-auto" />
              
            </div>
            
            <div className="flex flex-col items-center md:items-start md:text-left w-full max-w-md md:max-w-none">
              <h4 className="font-bold text-xl mb-6 text-[#06B6D4]">Contact</h4>
              <ul className="space-y-4 text-blue-100">
                <li>
                  <a className="hover:text-[#06B6D4] transition-colors flex items-center gap-2 justify-center md:justify-start" href={`mailto:${CONFIG.brand.email}`}>
                    {CONFIG.brand.email}
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#06B6D4] transition-colors flex items-center gap-2 justify-center md:justify-start" href={`https://${CONFIG.brand.domain}`}>
                    {CONFIG.brand.domain}
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col items-center md:items-start md:text-left w-full max-w-md md:max-w-none">
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
              <p className="text-blue-100 leading-relaxed">
                {CONFIG.brand.address}
              </p>
            </div>
          </div>
          
          <div className="border-t border-white/20 pt-8 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-blue-100/80 text-sm">
                © {year} {CONFIG.brand.name}. All rights reserved.
              </p>
              <div className="flex items-center gap-6 text-sm text-blue-100/80">
                <a href="/privacy" className="hover:text-[#06B6D4] transition-colors">Privacy</a>
                <a href="/dpa" className="hover:text-[#06B6D4] transition-colors">DPA</a>
                <a href="/terms" className="hover:text-[#06B6D4] transition-colors">Terms</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>;
}
