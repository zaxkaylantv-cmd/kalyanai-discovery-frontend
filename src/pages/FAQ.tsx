import { useState, useEffect } from "react";
import { Menu, X, Phone, ChevronDown, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
    tagline: "Your AI Implementation Partner"
  },
  faqs: [
    {
      question: "What industries do you work with?",
      answer: "We work with businesses across various sectors including professional services, e-commerce, healthcare, and technology. Our AI solutions are designed to be industry-agnostic and customised to your specific business needs."
    },
    {
      question: "How long does implementation take?",
      answer: "Implementation timelines vary based on project scope. Simple automation projects can be deployed in 2-4 weeks, while comprehensive AI transformations typically take 8-12 weeks. We'll provide a detailed timeline during our discovery session."
    },
    {
      question: "Do I need technical expertise?",
      answer: "No technical expertise required. We handle all the technical implementation and provide comprehensive training for your team. Our solutions are designed to be user-friendly and intuitive."
    },
    {
      question: "What's your pricing structure?",
      answer: "We provide bespoke pricing tailored to each business based on your specific requirements, scope, and goals. Every project is unique, so we evaluate factors like complexity, timeline, integration needs, and desired outcomes to create a customised proposal. Book a strategy session to discuss your needs and receive a personalised quote that delivers maximum value for your investment."
    },
    {
      question: "How do you measure ROI?",
      answer: "We establish clear KPIs before implementation including time saved, cost reduction, revenue increase, and efficiency gains. Most clients see positive ROI within weeks, not months, through immediate operational savings and increased capacity. Our rapid deployment approach means you start seeing measurable results from day one."
    },
    {
      question: "What ongoing support do you provide?",
      answer: "We provide comprehensive post-implementation support including system monitoring, updates, training, and optimisation. Support packages are customised based on your needs and can include 24/7 monitoring for critical systems."
    },
    {
      question: "Can AI integrate with our existing tools?",
      answer: "Yes. We specialise in connecting AI capabilities with your current tech stack including CRMs, ERPs, email platforms, databases, and custom applications. Our solutions work within your existing infrastructure, avoiding costly replacements or migrations."
    },
    {
      question: "What if we've never used AI before?",
      answer: "Perfect. Most of our clients start from zero AI experience. We guide you through the entire journey with clear explanations, hands-on training, and continuous support. You don't need technical knowledge, just a willingness to improve your business operations."
    },
    {
      question: "How do you ensure data security and privacy?",
      answer: "Data security is paramount. We implement enterprise-grade encryption, secure API connections, role-based access controls, and comply with GDPR and relevant regulations. Your data remains in your systems or approved cloud services, never exposed to unauthorized access."
    },
    {
      question: "What makes Kalyan AI different from other providers?",
      answer: "We combine 15+ years of business leadership with deep tech AI innovation from Nuvo Labs, where Sandeep is a contributor and shareholder. This unique blend means we understand your business challenges first, then apply cutting-edge AI strategically to solve them. We're not just implementing technology - we're transforming businesses and driving revenue growth. Plus, we deliver production-ready systems in weeks, not months, so you see results fast."
    },
    {
      question: "Do you offer training for our team?",
      answer: "Absolutely. Training is built into every implementation. We conduct hands-on sessions during deployment, create custom documentation, and provide ongoing support. Your team becomes self-sufficient while having expert backup when needed."
    },
    {
      question: "What happens after implementation?",
      answer: "You receive 30 days of included support for optimisation and adjustments. After that, you can choose ongoing support packages or operate independently. We're always available for upgrades, scaling, or new projects as your needs evolve."
    },
    {
      question: "Can we start with a small pilot project?",
      answer: "Yes, and we recommend it. Starting with a focused 2-4 week pilot lets you see tangible results quickly, build confidence, and prove ROI before scaling. Many clients begin with one workflow and expand to multiple departments after seeing the impact."
    },
    {
      question: "What if the AI doesn't deliver the expected results?",
      answer: "We establish clear KPIs and success metrics before starting. Our discovery process identifies realistic, achievable goals. We work iteratively with daily updates, so you see progress continuously. If something isn't working, we adjust in real-time, no waiting until project end."
    },
    {
      question: "Who are Nuvo Labs?",
      answer: "Nuvo Labs is a deep tech AI research and development company pioneering breakthrough innovations in artificial intelligence. At Nuvo Labs, teams of researchers, engineers, data scientists, system architects, and product developers work side by side to develop technologies that go beyond incremental improvements. With multiple patents pending, their work delivers breakthrough technologies shaping the next era of computing and AI. As a contributor and shareholder of Nuvo Labs, Sandeep brings this cutting-edge deep tech AI expertise directly to Kalyan AI, ensuring our clients benefit from the most advanced AI capabilities available."
    }
  ],
};

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

const FAQ = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
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
            <a href="/how-we-work" className="text-sm font-bold text-[#191970] hover:text-primary transition-colors">How We Work</a>
            <a href="/faq" className="text-sm font-bold text-[#06B6D4] transition-colors">FAQ</a>
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
              <a href="/" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-base font-bold text-[#191970] hover:bg-accent hover:text-primary rounded-lg transition-colors">
                Home
              </a>
              <a href="/about" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-base font-bold text-[#191970] hover:bg-accent hover:text-primary rounded-lg transition-colors">
                About
              </a>
              <a href="/how-we-work" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-base font-bold text-[#191970] hover:bg-accent hover:text-primary rounded-lg transition-colors">
                How We Work
              </a>
              <a href="/faq" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-base font-bold text-[#06B6D4] rounded-lg">
                FAQ
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="hero-section relative min-h-[50vh] flex items-center py-12 md:py-20 px-6">
        <div className="hero-section__bg" />
        
        {/* Floating geometric elements */}
        <div className="absolute top-20 left-10 w-32 h-32 border border-[#06B6D4]/20 rounded-lg rotate-12 animate-float" />
        <div className="absolute bottom-20 right-10 w-24 h-24 border border-[#06B6D4]/30 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/4 w-16 h-16 border border-[#06B6D4]/10 rounded-lg rotate-45 animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="max-w-5xl mx-auto w-full relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-normal">
            Frequently Asked <span className="text-[#06B6D4]">Questions</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Everything you need to know about <span className="text-[#06B6D4] font-semibold">AI</span> transformation with Kalyan <span className="text-[#06B6D4]">AI</span>
          </p>
        </div>
      </section>

      {/* Spacer */}
      <div className="bg-background py-8 md:py-12" />

      {/* FAQ Section */}
      <section className="py-16 md:py-24 px-6 hero-section relative overflow-hidden">
        <div className="hero-section__bg" />
        
        {/* Background elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#06B6D4]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle, #06B6D4 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <p className="text-lg md:text-xl tracking-widest font-bold uppercase text-[#06B6D4] mb-6">
              FAQ
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-normal">
              Common <span className="text-[#06B6D4]">Questions</span>
            </h2>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {CONFIG.faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-[#06B6D4] hover:scale-105 hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] transition-all duration-300 group"
              >
                <AccordionTrigger className="px-6 py-5 text-left hover:no-underline [&[data-state=open]]:bg-gradient-to-r [&[data-state=open]]:from-[#06B6D4]/20 [&[data-state=open]]:to-transparent">
                  <span className="font-bold text-lg text-white group-hover:text-[#06B6D4] transition-colors pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-5 pt-2 text-white/70 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Spacer */}
      <div className="bg-background py-8 md:py-12" />

      {/* CTA Section */}
      <section className="mx-auto max-w-5xl px-6 py-16 md:py-24 hero-section rounded-3xl relative overflow-hidden">
        <div className="hero-section__bg" />
        
        {/* Floating shapes */}
        <div className="absolute top-10 right-10 w-20 h-20 border border-[#06B6D4]/20 rounded-lg rotate-12 animate-float" />
        <div className="absolute bottom-10 left-10 w-16 h-16 border border-[#06B6D4]/30 rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
        
        <div className="relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Book a free <span className="text-[#06B6D4] font-semibold">30-minute</span> strategy session to discuss your <span className="text-[#06B6D4]">AI</span> transformation
          </p>
          
            {/* Calendly embed container */}
            <div className="backdrop-blur-xl bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-[#06B6D4] hover:shadow-[0_0_40px_rgba(6,182,212,0.2)] transition-all duration-300 shadow-xl">
              <div
                className="calendly-inline-widget"
                data-url="https://calendly.com/sandeep-kalyanai/ai-opportunity-assessment?hide_gdpr_banner=1&primary_color=06b6d4"
                style={{ minWidth: "320px", height: "700px" }}
              />
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="hero-section text-white mt-20 relative overflow-hidden">
        <div className="hero-section__bg" />
        
        <div className="mx-auto max-w-7xl px-6 py-16 relative z-10">
          <div className="grid gap-12 md:grid-cols-3 items-start mb-12">
            <div className="text-center md:text-left">
              <img src={logoFooterSvg} alt="Kalyan AI - AI Implementation Partner" className="hidden md:block h-20 md:h-24 w-auto mb-6 mx-auto md:mx-0" />
              <img src={logoFooterMobileSvg} alt="Kalyan AI - AI Implementation Partner" className="block md:hidden h-20 w-auto mb-6 mx-auto" />
            </div>
            
            <div className="text-center md:text-left">
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
              <p className="text-blue-100 leading-relaxed">
                {CONFIG.brand.address}
              </p>
            </div>
          </div>
          
          <div className="border-t border-white/20 pt-8 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-blue-100/80 text-sm">
                © {CONFIG.brand.year} {CONFIG.brand.name}. All rights reserved.
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
    </div>
  );
};

export default FAQ;
