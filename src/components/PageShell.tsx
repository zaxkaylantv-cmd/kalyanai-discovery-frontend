import type { ReactNode } from "react";

type PageShellProps = {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  headerRight?: ReactNode;
  headerAlign?: "left" | "center";
  subtitleClassName?: string;
  hideBrand?: boolean;
};

export default function PageShell({
  title,
  subtitle,
  children,
  headerRight,
  headerAlign = "left",
  subtitleClassName,
  hideBrand = false,
}: PageShellProps) {
  const headerClasses =
    headerAlign === "center"
      ? "mb-6 flex flex-col items-center gap-3 text-center"
      : "mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between";

  return (
    <div className="min-h-screen bg-[#020817] text-white">
      <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-10">
        <header className={headerClasses}>
          <div>
            {title && (
              <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                {title}
              </h1>
            )}
            {subtitle && (
              <p
                className={
                  subtitleClassName ?? "mt-1 text-sm text-slate-300"
                }
              >
                {subtitle}
              </p>
            )}
          </div>
          {headerRight && (
            <div className="sm:mt-1 flex items-center">{headerRight}</div>
          )}
        </header>
        {children}
      </div>
    </div>
  );
}
