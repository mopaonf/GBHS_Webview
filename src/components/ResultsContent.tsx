"use client";

import { useMemo, useState, type CSSProperties } from "react";
import Link from "next/link";
import { examResults, type ResultLevel } from "@/data/results";

const levels: ResultLevel[] = ["Advanced Level", "Ordinary Level"];
const years = [...new Set(examResults.map((result) => result.year))].sort((a, b) => b - a);

export default function ResultsContent() {
  const [year, setYear] = useState(years[0]);
  const [level, setLevel] = useState<ResultLevel>(levels[0]);
  const result = useMemo(
    () => examResults.find((item) => item.year === year && item.level === level) ?? examResults[0],
    [level, year],
  );
  return (
    <>
      <section className="results-page-banner">
        <div className="results-page-banner-content">
          <div className="section-kicker">Academic achievement</div>
          <h1>Results that reflect <span>possibility</span></h1>
          <p>Celebrating the discipline, ambition, and progress of GBHS students.</p>
          <nav aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">›</span>
            <span aria-current="page">Results</span>
          </nav>
        </div>
      </section>

      <div className="results-page-main">
        <section className="results-page-intro section-wrap">
          <div>
            <div className="section-kicker">GCE merit sheet</div>
            <h2 className="accent-heading">Our students <span>rise</span> to the challenge</h2>
          </div>
          <p>Explore the official school result summary by examination level and session. Select a year and level to view the pass rate, candidate figures, and successful candidates grouped by subjects passed.</p>
        </section>

        <section className="results-explorer section-wrap" aria-labelledby="results-heading">
          <div className="results-controls">
            <div>
              <div className="section-kicker">Choose a session</div>
              <h2 id="results-heading">{result.year} {result.level}</h2>
            </div>
            <div className="results-selects">
              <label>
                <span>GCE year</span>
                <select value={year} onChange={(event) => setYear(Number(event.target.value))}>
                  {years.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </label>
              <label>
                <span>Examination level</span>
                <select value={level} onChange={(event) => setLevel(event.target.value as ResultLevel)}>
                  {levels.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </label>
            </div>
          </div>

          <div className="results-summary" aria-label={`${result.year} ${result.level} summary`}>
            <div className="results-rate">
              <div className="results-rate-ring" style={{ "--result-rate": `${result.passRate}%` } as CSSProperties}>
                <strong>{result.passRate.toFixed(2)}%</strong>
                <span>passed</span>
              </div>
            </div>
            <div className="results-stat"><strong>{result.registered}</strong><span>registered</span></div>
            <div className="results-stat"><strong>{result.subjects}</strong><span>subjects recorded</span></div>
            <div className="results-stat"><strong>{result.passed}</strong><span>candidates passed</span></div>
            <div className="results-stat"><strong>{result.sanctioned}</strong><span>sanctioned</span></div>
          </div>

          <div className="results-merit-heading">
            <div>
              <div className="section-kicker">Successful candidates</div>
              <h3>Merit by subjects passed</h3>
            </div>
            <p>{result.passed} successful candidates listed alphabetically within each group.</p>
          </div>

          <div className="results-groups">
            {result.groups.map((group, index) => (
              <details className="results-group" key={`${result.year}-${result.level}-${group.subjects}`} open={index === 0}>
                <summary>
                  <span className="results-group-number">{String(index + 1).padStart(2, "0")}</span>
                  <span><strong>{group.subjects} subjects passed</strong><small>{group.count} {group.count === 1 ? "candidate" : "candidates"}</small></span>
                  <span className="results-group-icon" aria-hidden="true">+</span>
                </summary>
                <ol>
                  {group.students.map((student) => <li key={student}>{student}</li>)}
                </ol>
              </details>
            ))}
          </div>
        </section>
      </div>

      <section className="results-page-cta">
        <h2>Every result is a beginning.</h2>
        <p>We are proud of the commitment behind every name and every achievement.</p>
        <Link className="light-button" href="/#visit">Visit GBHS <span className="button-arrow" aria-hidden="true">→</span></Link>
      </section>
    </>
  );
}
