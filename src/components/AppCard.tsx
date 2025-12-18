import type { ReactNode } from "react";

type AppCardProps = {
  children: ReactNode;
  className?: string;
};

export default function AppCard({ children, className }: AppCardProps) {
  return (
    <div
      className={`rounded-2xl border border-cyan-500/40 bg-slate-900 p-4 shadow-md sm:p-6 ${
        className ?? ""
      }`}
    >
      {children}
    </div>
  );
}
