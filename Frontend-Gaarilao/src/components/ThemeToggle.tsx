import type { Theme } from "../hooks/useTheme";

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a7 7 0 0 0 11 11Z" />
    </svg>
  );
}

const optionBase =
  "flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-semibold transition-colors " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80";

interface ThemeToggleProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export function ThemeToggle({ theme, onThemeChange }: ThemeToggleProps) {
  const isDark = theme === "dark";

  return (
    <div
      role="group"
      aria-label="Color theme"
      className="flex items-center gap-0.5 rounded-full border border-white/25 bg-black/20 p-0.5"
    >
      <button
        type="button"
        onClick={() => onThemeChange("light")}
        aria-pressed={!isDark}
        aria-label="Use light mode"
        title="Light mode"
        className={`${optionBase} ${
          isDark
            ? "text-white/80 hover:bg-white/10 hover:text-white"
            : "bg-white text-brand shadow-sm"
        }`}
      >
        <SunIcon />
        <span className="hidden lg:inline">Light</span>
      </button>
      <button
        type="button"
        onClick={() => onThemeChange("dark")}
        aria-pressed={isDark}
        aria-label="Use dark mode"
        title="Dark mode"
        className={`${optionBase} ${
          isDark
            ? "bg-white text-brand shadow-sm"
            : "text-white/80 hover:bg-white/10 hover:text-white"
        }`}
      >
        <MoonIcon />
        <span className="hidden lg:inline">Dark</span>
      </button>
    </div>
  );
}
