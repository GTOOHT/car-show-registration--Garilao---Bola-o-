import type { Theme } from "../hooks/useTheme";
import { ThemeToggle } from "./ThemeToggle";

function SteeringWheelIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      className="h-8 w-8 sm:h-9 sm:w-9"
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="17" />
      <circle cx="24" cy="24" r="4.5" />
      <path d="M24 7v12.5M8.2 29.4l11.6-3M39.8 29.4l-11.6-3" />
    </svg>
  );
}

interface DashboardHeaderProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export function DashboardHeader({ theme, onThemeChange }: DashboardHeaderProps) {
  const subtitle = (
    <>
      Browse, search and filter event registrations.{" "}
      <span className="whitespace-nowrap font-semibold text-white">AutoVista Events</span>
      <span className="mx-1 text-white/60">·</span>
      Sorsogon City Coliseum
    </>
  );

  return (
    <header className="brand-banner sticky top-0 z-40 border-b border-black/25 shadow-[0_10px_24px_-12px_rgba(70,5,17,0.7)]">
      <div className="mx-auto w-full max-w-6xl px-4 py-2.5 sm:py-0">
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-blue text-white ring-1 ring-inset ring-white/25 sm:my-2.5 sm:h-16 sm:w-16">
            <SteeringWheelIcon />
          </div>

          <div className="min-w-0 flex-1 sm:py-2.5">
            <h1 className="brand-banner-title text-sm font-extrabold uppercase leading-[1.15] tracking-wide sm:text-xl lg:text-2xl lg:leading-tight">
              Car Show 2027 — Registration Dashboard
            </h1>
            <p className="mt-1 hidden text-sm font-medium leading-snug text-white/90 sm:block">
              {subtitle}
            </p>
          </div>

          <div className="shrink-0">
            <ThemeToggle theme={theme} onThemeChange={onThemeChange} />
          </div>
        </div>

        {/* On phones the subtitle gets the full banner width so it stays two lines. */}
        <p className="mt-1.5 pb-0.5 text-xs font-medium leading-snug text-white/90 sm:hidden">
          {subtitle}
        </p>
      </div>
    </header>
  );
}
