import type { ReactNode } from "react";

type GlowCardProps = {
  children: ReactNode;
  className?: string;
};

export default function GlowCard({ children, className }: GlowCardProps) {
  return (
    <div className="relative rounded-3xl border border-cyan-500/40 bg-slate-900/70 p-6 sm:p-8">
      <div className={className ? `relative ${className}` : "relative"}>{children}</div>
    </div>
  );
}
