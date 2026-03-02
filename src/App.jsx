import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Activity,
  BrainCircuit,
  ChevronRight,
  FlaskConical,
  Gauge,
  Sparkles,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const diagnosticLabels = [
  "Epigenetic Age",
  "Microbiome Score",
  "Cortisol Optimization",
];

const feedMessages = [
  "Optimizing Circadian Rhythm...",
  "Nutrient absorption variance recalibrated.",
  "Adaptive fasting protocol synchronized.",
  "VO2 max envelope updated.",
  "Inflammatory load trending down 12%.",
];

const protocolCards = [
  {
    title: "Genomic Calibration",
    subtitle: "Helix-Driven Risk Profiling",
    description:
      "We decode inherited tendencies into a working protocol matrix that continuously informs every recommendation.",
    accent: "#CC5833",
  },
  {
    title: "Live Clinical Mapping",
    subtitle: "Cellular Pattern Acquisition",
    description:
      "Your metabolic signatures, endocrine cycles, and recovery feedback are layered into one responsive operating model.",
    accent: "#2E4036",
  },
  {
    title: "Cardiac Performance Loop",
    subtitle: "Predictive Nervous System Tuning",
    description:
      "Autonomic stress and rhythm behavior are monitored to keep performance high without tipping into physiological debt.",
    accent: "#CC5833",
  },
];

const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

function MagneticButton({ children, className = "", inverse = false }) {
  const buttonRef = useRef(null);

  const handleMove = (event) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) {
      return;
    }

    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    gsap.to(buttonRef.current, {
      x: x * 0.12,
      y: y * 0.12,
      scale: 1.035,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.35,
      ease: "power3.out",
    });
  };

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`group relative overflow-hidden rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-transform ${className}`}
    >
      <span
        className={`absolute inset-0 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0 ${inverse ? "bg-cream" : "bg-clay"}`}
      />
      <span
        className={`relative z-10 inline-flex items-center gap-2 ${inverse ? "text-cream group-hover:text-moss" : "text-moss group-hover:text-cream"}`}
      >
        {children}
        <ChevronRight size={16} />
      </span>
    </button>
  );
}

function App() {
  const appRef = useRef(null);
  const heroRef = useRef(null);
  const schedulerRef = useRef(null);
  const saveButtonRef = useRef(null);
  const cursorRef = useRef(null);
  const manifestoTextureRef = useRef(null);
  const protocolCardsRef = useRef([]);
  const helixRef = useRef(null);
  const laserRef = useRef(null);
  const ekgRef = useRef(null);

  const [isScrolled, setIsScrolled] = useState(false);
  const [diagnosticStack, setDiagnosticStack] = useState(diagnosticLabels);
  const [typedText, setTypedText] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const shuffler = setInterval(() => {
      setDiagnosticStack((current) => {
        const next = [...current];
        next.unshift(next.pop());
        return next;
      });
    }, 3000);

    return () => clearInterval(shuffler);
  }, []);

  useEffect(() => {
    const activeMessage = feedMessages[messageIndex];
    const isTyping = charIndex < activeMessage.length;

    const timer = setTimeout(
      () => {
        if (isTyping) {
          setTypedText(activeMessage.slice(0, charIndex + 1));
          setCharIndex((index) => index + 1);
          return;
        }

        setCharIndex(0);
        setTypedText("");
        setMessageIndex((index) => (index + 1) % feedMessages.length);
      },
      isTyping ? 42 : 1400,
    );

    return () => clearTimeout(timer);
  }, [charIndex, messageIndex]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-part]",
        { y: 72, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.14,
          delay: 0.2,
        },
      );

      gsap.fromTo(
        ".split-word",
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.04,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".manifesto-copy",
            start: "top 70%",
          },
        },
      );

      gsap.to(manifestoTextureRef.current, {
        yPercent: -16,
        ease: "none",
        scrollTrigger: {
          trigger: ".manifesto-section",
          scrub: true,
          start: "top bottom",
          end: "bottom top",
        },
      });

      const dayNodes = gsap.utils.toArray(".schedule-day");
      const sequence = [1, 3, 5, 2];
      const cursorTimeline = gsap.timeline({
        repeat: -1,
        repeatDelay: 1,
        defaults: { ease: "power2.out" },
      });

      cursorTimeline
        .set(cursorRef.current, { opacity: 1, x: -10, y: -10 })
        .to(cursorRef.current, { x: 10, y: 10, duration: 0.45 });

      sequence.forEach((target, idx) => {
        const node = dayNodes[target];
        cursorTimeline
          .to(cursorRef.current, {
            x: node.offsetLeft + node.offsetWidth * 0.55,
            y: node.offsetTop + node.offsetHeight * 0.5,
            duration: idx === 0 ? 0.55 : 0.45,
          })
          .to(
            node,
            {
              scale: 0.94,
              duration: 0.08,
              transformOrigin: "center",
            },
            "<",
          )
          .to(node, {
            scale: 1,
            duration: 0.14,
          })
          .to(node, {
            backgroundColor: "#2E4036",
            color: "#F2F0E9",
            duration: 0.18,
          });
      });

      cursorTimeline
        .to(cursorRef.current, {
          x: saveButtonRef.current.offsetLeft + saveButtonRef.current.offsetWidth / 2,
          y: saveButtonRef.current.offsetTop + saveButtonRef.current.offsetHeight / 2,
          duration: 0.6,
        })
        .to(
          saveButtonRef.current,
          {
            scale: 0.96,
            duration: 0.08,
            transformOrigin: "center",
          },
          "<",
        )
        .to(saveButtonRef.current, { scale: 1, duration: 0.18 })
        .to(cursorRef.current, { opacity: 0, duration: 0.3 });

      gsap.to(helixRef.current, {
        rotate: 360,
        transformOrigin: "center",
        duration: 12,
        ease: "none",
        repeat: -1,
      });

      gsap.fromTo(
        laserRef.current,
        { yPercent: -120 },
        {
          yPercent: 140,
          duration: 2.2,
          ease: "none",
          repeat: -1,
        },
      );

      gsap.fromTo(
        ekgRef.current,
        { strokeDashoffset: 220 },
        {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
        },
      );

      const cards = protocolCardsRef.current.filter(Boolean);
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0.5 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 84%",
            },
          },
        );

        if (index > 0) {
          const previousCard = cards[index - 1];
          ScrollTrigger.create({
            trigger: card,
            start: "top 88%",
            end: "top 28%",
            scrub: true,
            onUpdate: (self) => {
              const progress = self.progress;
              gsap.to(previousCard, {
                scale: 1 - progress * 0.1,
                opacity: 1 - progress * 0.5,
                filter: `blur(${progress * 20}px)`,
                duration: 0.08,
                overwrite: true,
                ease: "none",
              });
            },
          });
        }
      });
    }, appRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={appRef} className="bg-cream text-charcoal">
      <nav className="fixed left-1/2 top-5 z-50 w-[min(92vw,78rem)] -translate-x-1/2 px-2">
        <div
          className={`rounded-full border px-6 py-3 transition-all duration-500 ${
            isScrolled
              ? "border-black/10 bg-white/60 text-moss shadow-lg shadow-black/5 backdrop-blur-xl"
              : "border-white/20 bg-transparent text-cream"
          }`}
        >
          <div className="flex items-center justify-between gap-6">
            <div className="font-jakarta text-sm font-semibold tracking-[0.14em]">
              NURA HEALTH
            </div>
            <div className="hidden items-center gap-7 text-xs font-medium uppercase tracking-[0.12em] md:flex">
              <a href="#features">Systems</a>
              <a href="#manifesto">Manifesto</a>
              <a href="#protocol">Protocol</a>
              <a href="#membership">Membership</a>
            </div>
            <MagneticButton
              className={`${isScrolled ? "bg-cream/70 ring-1 ring-black/5" : "bg-white/10 ring-1 ring-white/20"}`}
              inverse={!isScrolled}
            >
              Begin Intake
            </MagneticButton>
          </div>
        </div>
      </nav>

      <header
        ref={heroRef}
        className="relative flex min-h-[100dvh] items-end overflow-hidden px-6 pb-14 pt-32 md:px-12 md:pb-20"
        style={{
          backgroundImage:
            "linear-gradient(165deg, rgba(46,64,54,0.82) 0%, rgba(16,19,17,0.95) 70%), url(https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?auto=format&fit=crop&w=2100&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <div className="max-w-4xl">
          <p
            data-hero-part
            className="mb-6 font-mono text-xs uppercase tracking-[0.26em] text-cream/80"
          >
            Clinical Boutique Performance System
          </p>
          <h1 className="text-5xl leading-[0.92] text-cream md:text-8xl">
            <span
              data-hero-part
              className="block font-jakarta font-extrabold tracking-[-0.04em]"
            >
              Nature is the
            </span>
            <span
              data-hero-part
              className="block font-cormorant text-[1.4em] italic tracking-[-0.02em] text-clay"
            >
              Algorithm.
            </span>
          </h1>
          <p
            data-hero-part
            className="mt-8 max-w-2xl font-outfit text-base text-cream/85 md:text-lg"
          >
            A precision longevity instrument that fuses systems biology, adaptive
            diagnostics, and bespoke performance protocols into one living clinical
            interface.
          </p>
        </div>
      </header>

      <section id="features" className="px-6 py-24 md:px-12">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-moss/70">
              Precision Micro-UI Dashboard
            </p>
            <h2 className="mt-2 font-jakarta text-3xl font-bold tracking-[-0.03em] text-moss md:text-5xl">
              Functional Artifacts
            </h2>
          </div>
          <Sparkles className="hidden text-clay md:block" size={30} />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <article className="rounded-[2.6rem] border border-moss/20 bg-white/80 p-6 shadow-[0_24px_60px_-30px_rgba(26,26,26,0.45)] backdrop-blur-sm">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-outfit text-lg font-semibold text-moss">
                Audit Intelligence
              </h3>
              <FlaskConical size={20} className="text-clay" />
            </div>
            <div className="relative h-56 overflow-hidden rounded-[2rem] bg-gradient-to-br from-white to-cream p-4">
              {diagnosticStack.map((item, index) => (
                <div
                  key={item}
                  className="absolute left-4 right-4 rounded-[1.5rem] border border-moss/15 bg-white p-4 shadow-sm transition-all duration-700"
                  style={{
                    top: `${index * 18}px`,
                    zIndex: diagnosticStack.length - index,
                    transform: `scale(${1 - index * 0.05})`,
                    opacity: 1 - index * 0.22,
                    transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-moss/60">
                    Biomarker {index + 1}
                  </p>
                  <p className="mt-1 font-outfit text-base font-semibold text-charcoal">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[2.6rem] border border-moss/20 bg-white/80 p-6 shadow-[0_24px_60px_-30px_rgba(26,26,26,0.45)] backdrop-blur-sm">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-outfit text-lg font-semibold text-moss">Neural Stream</h3>
              <BrainCircuit size={20} className="text-clay" />
            </div>
            <div className="rounded-[2rem] bg-charcoal p-5 text-cream">
              <div className="mb-5 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-cream/70">
                <span className="relative inline-flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-clay opacity-70" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-clay" />
                </span>
                Live Feed
              </div>
              <p className="min-h-16 font-mono text-sm leading-relaxed text-cream/90">
                {typedText}
                <span className="ml-1 inline-block h-4 w-2 animate-cursor rounded-[2px] bg-clay align-middle" />
              </p>
            </div>
          </article>

          <article className="rounded-[2.6rem] border border-moss/20 bg-white/80 p-6 shadow-[0_24px_60px_-30px_rgba(26,26,26,0.45)] backdrop-blur-sm">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-outfit text-lg font-semibold text-moss">
                Adaptive Regimen
              </h3>
              <Gauge size={20} className="text-clay" />
            </div>
            <div ref={schedulerRef} className="relative rounded-[2rem] bg-cream p-5">
              <div className="grid grid-cols-7 gap-2">
                {weekDays.map((day, idx) => (
                  <div
                    key={`${day}-${idx}`}
                    className="schedule-day flex h-11 items-center justify-center rounded-2xl border border-moss/20 bg-white font-mono text-xs font-semibold text-moss transition-colors"
                  >
                    {day}
                  </div>
                ))}
              </div>
              <button
                ref={saveButtonRef}
                className="mt-5 w-full rounded-2xl bg-moss px-4 py-3 font-outfit text-sm font-semibold tracking-[0.08em] text-cream"
              >
                Save Protocol
              </button>
              <svg
                ref={cursorRef}
                className="pointer-events-none absolute left-3 top-3 h-8 w-8 opacity-0"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4 2L20 12L12 13L10 21L4 2Z"
                  fill="#CC5833"
                  stroke="#1A1A1A"
                  strokeWidth="1"
                />
              </svg>
            </div>
          </article>
        </div>
      </section>

      <section
        id="manifesto"
        className="manifesto-section relative overflow-hidden rounded-[3rem] bg-charcoal px-6 py-28 md:px-12"
      >
        <div
          ref={manifestoTextureRef}
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(120deg, rgba(26,26,26,0.7), rgba(46,64,54,0.5)), url(https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1900&q=80)",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        <div className="manifesto-copy relative z-10 max-w-6xl">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-cream/70">
            The Manifesto
          </p>
          <div className="space-y-8 text-4xl leading-tight text-cream md:text-7xl">
            <p className="font-jakarta font-bold tracking-[-0.03em]">
              {"Modern medicine asks: What is wrong?".split(" ").map((word, index) => (
                <span key={index} className="mr-[0.3em] inline-block overflow-hidden">
                  <span className="split-word inline-block">{word}</span>
                </span>
              ))}
            </p>
            <p className="font-cormorant text-[1.18em] italic tracking-[-0.02em] text-clay">
              {"We ask: What is optimal?".split(" ").map((word, index) => (
                <span key={index} className="mr-[0.3em] inline-block overflow-hidden">
                  <span className="split-word inline-block">{word}</span>
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      <section id="protocol" className="px-4 py-24 md:px-8">
        <div className="mb-10 px-2 md:px-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-moss/70">
            Sticky Stacking Archive
          </p>
          <h2 className="mt-2 font-jakarta text-3xl font-bold tracking-[-0.03em] text-moss md:text-5xl">
            Protocol Engine
          </h2>
        </div>

        <div className="space-y-10">
          {protocolCards.map((card, index) => (
            <article
              key={card.title}
              ref={(element) => {
                protocolCardsRef.current[index] = element;
              }}
              className="sticky top-8 grid min-h-[100dvh] items-center rounded-[3rem] border border-moss/20 bg-white/75 p-8 shadow-[0_30px_80px_-32px_rgba(26,26,26,0.45)] backdrop-blur-sm md:grid-cols-2 md:gap-10 md:p-14"
            >
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-moss/65">
                  {card.subtitle}
                </p>
                <h3 className="mt-4 font-jakarta text-4xl font-bold tracking-[-0.03em] text-charcoal md:text-6xl">
                  {card.title}
                </h3>
                <p className="mt-6 max-w-xl font-outfit text-base leading-relaxed text-charcoal/80 md:text-lg">
                  {card.description}
                </p>
              </div>

              <div className="relative overflow-hidden rounded-[2.4rem] bg-charcoal p-6">
                {index === 0 && (
                  <svg ref={helixRef} viewBox="0 0 280 280" className="mx-auto h-72 w-72">
                    <circle cx="140" cy="140" r="112" fill="none" stroke="#2E4036" strokeWidth="16" />
                    <path
                      d="M60 90 C130 40, 150 240, 220 190"
                      stroke="#CC5833"
                      strokeWidth="8"
                      fill="none"
                    />
                    <path
                      d="M60 190 C130 240, 150 40, 220 90"
                      stroke="#F2F0E9"
                      strokeWidth="8"
                      fill="none"
                    />
                    {Array.from({ length: 8 }).map((_, i) => (
                      <line
                        key={i}
                        x1={78 + i * 18}
                        y1={97 + Math.sin(i) * 10}
                        x2={78 + i * 18}
                        y2={183 + Math.cos(i) * 10}
                        stroke="#CC5833"
                        strokeWidth="3"
                        opacity="0.6"
                      />
                    ))}
                  </svg>
                )}

                {index === 1 && (
                  <div className="relative h-72 overflow-hidden rounded-[2rem] border border-cream/10 bg-[#101211] p-5">
                    <div className="grid h-full grid-cols-6 gap-2">
                      {Array.from({ length: 30 }).map((_, i) => (
                        <div
                          key={i}
                          className="rounded-md border border-moss/25 bg-moss/15"
                        />
                      ))}
                    </div>
                    <div
                      ref={laserRef}
                      className="absolute inset-x-3 h-14 rounded-full bg-gradient-to-b from-clay/0 via-clay/35 to-clay/0 blur-xl"
                    />
                  </div>
                )}

                {index === 2 && (
                  <div className="h-72 rounded-[2rem] border border-cream/10 bg-[#101211] p-5">
                    <svg viewBox="0 0 320 180" className="h-full w-full">
                      <defs>
                        <linearGradient id="ekgGradient" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#2E4036" />
                          <stop offset="50%" stopColor="#CC5833" />
                          <stop offset="100%" stopColor="#F2F0E9" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0 90 H45 L70 90 L92 40 L118 142 L141 55 L165 90 H320"
                        fill="none"
                        stroke="url(#ekgGradient)"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray="220"
                        ref={ekgRef}
                      />
                    </svg>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="membership" className="px-6 pb-20 pt-24 md:px-12">
        <div className="mb-10 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-moss/70">
            Membership
          </p>
          <h2 className="mt-2 font-jakarta text-4xl font-bold tracking-[-0.03em] text-moss md:text-6xl">
            Clinical Performance Access
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              name: "Foundational",
              price: "$280",
              description: "Quarterly diagnostics and monthly protocol updates.",
              highlight: false,
            },
            {
              name: "Performance",
              price: "$620",
              description: "Continuous telemetry, priority clinician review, and adaptive regimen tuning.",
              highlight: true,
            },
            {
              name: "Executive",
              price: "$980",
              description: "Dedicated medical strategist and white-glove biological optimization.",
              highlight: false,
            },
          ].map((tier) => (
            <article
              key={tier.name}
              className={`rounded-[2.6rem] border p-8 ${
                tier.highlight
                  ? "border-moss bg-moss text-cream shadow-[0_24px_70px_-24px_rgba(46,64,54,0.65)]"
                  : "border-moss/20 bg-white"
              }`}
            >
              <h3
                className={`font-outfit text-xl font-semibold ${tier.highlight ? "text-cream" : "text-moss"}`}
              >
                {tier.name}
              </h3>
              <p className="mt-4 font-jakarta text-5xl font-bold tracking-[-0.03em]">
                {tier.price}
                <span className="ml-1 font-mono text-sm font-medium">/mo</span>
              </p>
              <p
                className={`mt-5 font-outfit text-base leading-relaxed ${tier.highlight ? "text-cream/85" : "text-charcoal/75"}`}
              >
                {tier.description}
              </p>
              <MagneticButton
                className={`mt-8 w-full justify-center ${
                  tier.highlight
                    ? "bg-clay text-cream ring-1 ring-clay/60"
                    : "bg-cream ring-1 ring-moss/20"
                }`}
                inverse={tier.highlight}
              >
                Select Plan
              </MagneticButton>
            </article>
          ))}
        </div>
      </section>

      <footer className="rounded-t-[4rem] bg-charcoal px-6 py-12 text-cream md:px-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-jakarta text-xl font-bold tracking-[0.06em]">NURA HEALTH</p>
            <p className="mt-3 max-w-md font-outfit text-cream/75">
              A high-touch performance medicine platform where data fidelity meets
              human physiology.
            </p>
          </div>

          <div className="grid gap-6 font-mono text-xs uppercase tracking-[0.12em] text-cream/70 md:grid-cols-3">
            <a href="#" className="hover:text-cream">
              Clinical Journal
            </a>
            <a href="#" className="hover:text-cream">
              Security & Compliance
            </a>
            <a href="#" className="hover:text-cream">
              Concierge Support
            </a>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] text-cream/85">
            <span className="relative inline-flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#6de28f] opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#6de28f]" />
            </span>
            System Operational
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-cream/55">
            © 2026 Nura Health
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
