import React, { useEffect, useState } from "react";
import { Brain, Mic, Sparkles } from "lucide-react";
import PageShell from "../components/PageShell";
import GlowCard from "../components/GlowCard";

const Welcome: React.FC = () => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const stored = window.localStorage.getItem("kalyanai_theme");
        if (stored === "light" || stored === "dark") {
          setTheme(stored);
        }
      }
    } catch (error) {
      console.error("Failed to read theme from localStorage", error);
    }
  }, []);

  const isLightTheme = theme === "light";

  const handleGetStarted = () => {
    window.location.href = "http://185.151.29.141/discovery";
  };

  return (
    <PageShell hideBrand title="">
      <div
        className={
          isLightTheme
            ? "min-h-screen bg-slate-50 text-slate-900"
            : "min-h-screen bg-slate-950 text-slate-100"
        }
      >
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-6 sm:px-6 sm:py-10">
          {/* Main content */}
          <main className="flex flex-1 items-center justify-start pt-8 sm:pt-12 pb-6 sm:pb-10">
            <GlowCard>
              <div className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-6 py-14 sm:px-10 sm:py-20">
                <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_60%),_radial-gradient(circle_at_bottom,_rgba(56,189,248,0.16),_transparent_60%)]" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.02)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.02)_50%,rgba(255,255,255,0.02)_75%,transparent_75%,transparent)] bg-[length:120px_120px] opacity-20" />

                <div className="relative z-10 flex h-full flex-col justify-between gap-6">
                  {/* Hero */}
                  <div className="space-y-5 text-center">
                    <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-cyan-500/50 bg-slate-950/80 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200 shadow-lg shadow-cyan-500/20 backdrop-blur">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#06B6D4] animate-pulse" />
                      <span>Discovery Intelligence</span>
                    </div>

                    <div className="space-y-4">
                      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Kalyan <span className="text-[#06B6D4]">AI</span> -{" "}
                        <span className="text-white">Discovery Intelligence</span>
                      </h1>
                      <div className="mx-auto h-px w-32 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                      <p className="mx-auto max-w-3xl text-sm text-cyan-300 sm:text-base">
                        AI that researches each company to prep you, listens to your calls, and turns them into
                        clear deals, next steps, and coaching.
                      </p>
                    </div>

                    <div className="mx-auto grid max-w-2xl gap-3 text-[11px] text-slate-200 sm:text-xs md:grid-cols-3">
                      {[
                        "90-second AI briefings tailored to each prospect.",
                        "Pain, priorities, and champions surfaced automatically.",
                        "Ready-to-send follow-ups drafted in seconds.",
                      ].map((item) => (
                        <div
                          key={item}
                          className="rounded-full border border-cyan-500/20 bg-slate-900/50 px-4 py-2 text-center text-[10px] font-semibold tracking-wide text-slate-200 shadow-md shadow-cyan-500/15 transition duration-200 hover:-translate-y-0.5 hover:border-cyan-500/60 hover:text-cyan-100 hover:shadow-cyan-500/25"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-cyan-500/70 to-transparent" />

                  {/* Feature summary */}
                  <div className="mt-10 space-y-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-100 text-center">
                      What&apos;s inside this workspace
                    </p>
                    <div className="grid gap-5 md:grid-cols-3">
                      <div className="rounded-2xl border border-slate-800/80 bg-gradient-to-b from-slate-950/70 via-slate-950/50 to-slate-950/40 p-5 text-center shadow-lg shadow-cyan-500/10 transition duration-200 hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-cyan-500/20">
                        <Sparkles className="mx-auto mb-3 h-6 w-6 text-cyan-200 drop-shadow-[0_4px_8px_rgba(6,182,212,0.25)]" />
                        <h3 className="text-sm font-semibold text-white">Pre-Call Plan</h3>
                        <p className="mt-2 text-[11px] text-slate-300">
                          AI researches each company and goal, then hands you a focused outline plus must-ask questions.
                        </p>
                      </div>
                      <div className="rounded-2xl border border-slate-800/80 bg-gradient-to-b from-slate-950/70 via-slate-950/50 to-slate-950/40 p-5 text-center shadow-lg shadow-cyan-500/10 transition duration-200 hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-cyan-500/20">
                        <Mic className="mx-auto mb-3 h-6 w-6 text-cyan-200 drop-shadow-[0_4px_8px_rgba(6,182,212,0.25)]" />
                        <h3 className="text-sm font-semibold text-white">Discovery Calls</h3>
                        <p className="mt-2 text-[11px] text-slate-300">
                          Upload a call and get transcripts, highlights, and the real signal: pain, priorities, risks, and wins.
                        </p>
                      </div>
                      <div className="rounded-2xl border border-slate-800/80 bg-gradient-to-b from-slate-950/70 via-slate-950/50 to-slate-950/40 p-5 text-center shadow-lg shadow-cyan-500/10 transition duration-200 hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-cyan-500/20">
                        <Brain className="mx-auto mb-3 h-6 w-6 text-cyan-200 drop-shadow-[0_4px_8px_rgba(6,182,212,0.25)]" />
                        <h3 className="text-sm font-semibold text-white">Post-Call Coaching</h3>
                        <p className="mt-2 text-[11px] text-slate-300">
                          AI coaches you after every conversation—celebrating strengths, flagging misses, and giving clear next steps.
                        </p>
                      </div>
                    </div>
                  </div>
                <div className="mt-10 flex justify-center">
                  <button
                    type="button"
                    onClick={handleGetStarted}
                    className="inline-flex items-center justify-center rounded-full bg-[#06B6D4] px-10 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/50 ring-2 ring-cyan-300/70 ring-offset-2 ring-offset-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-400 hover:shadow-cyan-400/60"
                  >
                    Get started
                  </button>
                </div>
                </div>
              </div>
            </GlowCard>
          </main>
        </div>
      </div>
    </PageShell>
  );
};

export default Welcome;
