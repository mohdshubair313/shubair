"use client";

import { useState, useEffect, useCallback } from "react";

interface ContributionDay {
  date: string;
  count: number;
  level: number; // 0-4
}

interface ContributionWeek {
  days: ContributionDay[];
}

const GITHUB_USERNAME = "mohdshubair313";

const getContributionColor = (level: number, isDark: boolean) => {
  if (isDark) {
    const colors = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];
    return colors[level] || colors[0];
  }
  const colors = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
  return colors[level] || colors[0];
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["", "Mon", "", "Wed", "", "Fri", ""];

export default function GitHubContributions() {
  const [weeks, setWeeks] = useState<ContributionWeek[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchContributions = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
      );
      if (!res.ok) throw new Error("API error");
      const data = await res.json();

      // The API returns { total: { lastYear: number }, contributions: [ { date, count, level } ] }
      const contributions: { date: string; count: number; level: number }[] =
        data.contributions || [];
      const total = data.total?.lastYear ?? 0;

      // Group into weeks (Sun-Sat)
      const grouped: ContributionWeek[] = [];
      let currentWeek: ContributionDay[] = [];

      for (const day of contributions) {
        const d = new Date(day.date);
        const dow = d.getUTCDay(); // 0=Sun

        if (dow === 0 && currentWeek.length > 0) {
          grouped.push({ days: currentWeek });
          currentWeek = [];
        }
        currentWeek.push({
          date: day.date,
          count: day.count,
          level: day.level,
        });
      }
      if (currentWeek.length > 0) {
        grouped.push({ days: currentWeek });
      }

      setWeeks(grouped);
      setTotalContributions(total);
      setError(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    fetchContributions();

    // Observe theme
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    setIsDark(document.documentElement.classList.contains("dark"));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, [fetchContributions]);

  if (!mounted) return null;

  // Month labels
  const monthLabels: { label: string; col: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, i) => {
    const firstDay = week.days[0];
    if (firstDay) {
      const month = new Date(firstDay.date).getUTCMonth();
      if (month !== lastMonth) {
        monthLabels.push({ label: MONTHS[month], col: i });
        lastMonth = month;
      }
    }
  });

  // Error / fallback — link to GitHub profile
  if (error) {
    return (
      <div id="github" data-section="GitHub" className="flex w-full flex-col scroll-mt-24">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-serif text-3xl tracking-wide text-neutral-900 dark:text-white">
            GitHub
          </h3>
        </div>
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://ghchart.rshah.org/${GITHUB_USERNAME}`}
            alt="GitHub contributions"
            className="w-full max-w-full dark:invert dark:hue-rotate-180 rounded"
          />
        </a>
      </div>
    );
  }

  return (
    <div id="github" data-section="GitHub" className="flex w-full flex-col scroll-mt-24">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-serif text-3xl tracking-wide text-neutral-900 dark:text-white">
          GitHub
        </h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {loading
            ? "Loading..."
            : `${totalContributions.toLocaleString()} contributions in the last year`}
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-900 dark:border-neutral-700 dark:border-t-white" />
        </div>
      ) : (
        <>
          <div className="flex w-full text-neutral-500 dark:text-neutral-400 overflow-hidden relative">
            {/* Day labels */}
            <div className="mt-5 mr-2 grid grid-rows-7 gap-[2px] text-[10px] leading-none shrink-0 z-10">
              {DAYS.map((day, i) => (
                <div key={i} className="flex items-center justify-end">
                  {day}
                </div>
              ))}
            </div>

            {/* Grid */}
            <div className="w-full overflow-x-auto pb-4 -mb-4 scrollbar-thin">
              <div className="flex flex-col gap-1 min-w-[600px] md:min-w-0 w-full pr-2">
                {/* Month labels */}
                <div
                  className="grid h-4 w-full items-end text-[10px] leading-none"
                  style={{
                    gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))`,
                  }}
                >
                  {monthLabels.map((m) => (
                    <span key={`${m.label}-${m.col}`} style={{ gridColumnStart: m.col + 1 }}>
                      {m.label}
                    </span>
                  ))}
                </div>

                {/* Contribution squares */}
                <div
                  className="grid w-full grid-rows-7 gap-[2px]"
                  style={{
                    gridAutoFlow: "column",
                    gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))`,
                  }}
                >
                  {weeks.flatMap((week) =>
                    week.days.map((day) => (
                      <div
                        key={day.date}
                        className="aspect-square w-full rounded-[2px]"
                        style={{
                          backgroundColor: getContributionColor(day.level, isDark),
                        }}
                        title={`${day.count} contribution${day.count !== 1 ? "s" : ""} on ${day.date}`}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Legend + link */}
          <div className="mt-3 flex items-center justify-between text-[10px] text-neutral-400 dark:text-neutral-500">
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              @{GITHUB_USERNAME}
            </a>
            <div className="flex items-center gap-1">
              <span>Less</span>
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className="w-[10px] h-[10px] rounded-[2px]"
                  style={{ backgroundColor: getContributionColor(level, isDark) }}
                />
              ))}
              <span>More</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
