"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type StatKey = "students" | "ordinary" | "advanced";

type Statistic = {
  key: StatKey;
  label: string;
  icon: StatKey;
  total?: number;
  sat?: number;
  passed?: number;
  year?: number;
};

const statistics: Statistic[] = [
  // TODO: replace with real figures
  { key: "students", label: "Students enrolled", icon: "students", total: 1200, year: 2025 },
  { key: "ordinary", label: "GCE Ordinary Level", icon: "ordinary", sat: 340, passed: 312 },
  { key: "advanced", label: "GCE Advanced Level", icon: "advanced", sat: 180, passed: 160 },
];

const getPercentage = (stat: Statistic) => (
  stat.passed && stat.sat ? Math.round((stat.passed / stat.sat) * 100) : 100
);

function StatIcon({ type }: { type: StatKey }) {
  if (type === "students") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="9" cy="8" r="3" fill="none" />
        <path d="M3.5 19c.4-3 2.2-4.5 5.5-4.5s5.1 1.5 5.5 4.5" fill="none" />
        <path d="M15 5.5a3 3 0 0 1 0 5.8M16 14.8c2.6.4 4 1.8 4.5 4.2" fill="none" />
      </svg>
    );
  }

  if (type === "ordinary") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 5.5h8a3 3 0 0 1 3 3V19H7a3 3 0 0 0-3 3V5.5Z" fill="none" />
        <path d="M20 5.5h-5a3 3 0 0 0-3 3V19h5a3 3 0 0 1 3 3V5.5Z" fill="none" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m3 9 9-4 9 4-9 4-9-4Z" fill="none" />
      <path d="M7 11.2V15c2.8 2.4 7.2 2.4 10 0v-3.8M21 9v6" fill="none" />
    </svg>
  );
}

export default function Statistics() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [displayValues, setDisplayValues] = useState<Record<StatKey, number>>({
    students: 1,
    ordinary: 1,
    advanced: 1,
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const finalValues = statistics.reduce<Record<StatKey, number>>((values, stat) => {
      values[stat.key] = stat.total ?? getPercentage(stat);
      return values;
    }, { students: 1, ordinary: 1, advanced: 1 });

    let hasTriggered = false;
    let frameId = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || hasTriggered) return;
      hasTriggered = true;
      observer.disconnect();
      setIsVisible(true);
      const startTime = performance.now();

      const updateValues = (timestamp: number) => {
        const elapsed = timestamp - startTime;
        const nextValues = { ...finalValues };
        let allFinished = true;

        statistics.forEach((stat, index) => {
          const progress = Math.min(Math.max((elapsed - index * 150) / 4000, 0), 1);
          const easedProgress = 1 - (1 - progress) ** 3;
          nextValues[stat.key] = Math.round(1 + (finalValues[stat.key] - 1) * easedProgress);
          if (progress < 1) allFinished = false;
        });

        setDisplayValues(nextValues);
        if (!allFinished) frameId = requestAnimationFrame(updateValues);
      };

      frameId = requestAnimationFrame(updateValues);
    }, { threshold: 0.35 });

    observer.observe(section);
    return () => {
      observer.disconnect();
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`stats-section${isVisible ? " is-visible" : ""}`}
      aria-labelledby="stats-heading"
    >
      <div className="section-wrap">
        <div className="stats-heading">
          <div className="stats-kicker">Our results</div>
          <h2 id="stats-heading">Numbers that tell our story</h2>
        </div>
        <div className="stats-grid">
          {statistics.map((stat, index) => {
            const percentage = getPercentage(stat);
            const visualValue = displayValues[stat.key];
            const isStudents = stat.key === "students";
            const finalLabel = isStudents
              ? `${stat.label}: ${stat.total?.toLocaleString("en-US")} students`
              : `${stat.label}: ${percentage} percent, ${stat.passed} of ${stat.sat} candidates passed`;

            return (
              <article
                className="stats-card"
                key={stat.key}
                style={{ "--stats-delay": `${index * 150}ms` } as CSSProperties}
              >
                <div className="stats-icon"><StatIcon type={stat.icon} /></div>
                <div className="stats-visual">
                  <svg className="stats-ring" viewBox="0 0 200 200" aria-hidden="true">
                    <circle className="stats-ring-track" cx="100" cy="100" r="90" />
                    <circle
                      className="stats-ring-progress"
                      cx="100"
                      cy="100"
                      r="90"
                      pathLength="100"
                      style={{ "--stats-progress": `${isStudents ? 100 : percentage}` } as CSSProperties}
                    />
                  </svg>
                  <span className="stats-number" aria-hidden="true">
                    {visualValue.toLocaleString("en-US")}{isStudents ? "+" : "%"}
                  </span>
                </div>
                <h3>{stat.label}</h3>
                <p className="stats-support" aria-hidden="true">
                  {isStudents ? "Building futures together" : `${stat.passed} of ${stat.sat} candidates passed`}
                </p>
                <span className="stats-sr-only">{finalLabel}</span>
              </article>
            );
          })}
        </div>
        <p className="stats-note">GCE results, {statistics[0].year} session</p>
      </div>
    </section>
  );
}
