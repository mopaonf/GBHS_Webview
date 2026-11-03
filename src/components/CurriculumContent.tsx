"use client";

import Link from "next/link";
import { Fragment, useState, type CSSProperties, type KeyboardEvent } from "react";
import { intro, stages } from "@/data/curriculum";

export default function CurriculumContent() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stage = stages[activeIndex];

  const core = stage.slots.filter((slot) => slot.length === 1).map((slot) => slot[0]);
  const groups = stage.slots.filter((slot) => slot.length > 1);
  const total = stage.slots.flat().length;

  const stats: { value: number; label: string }[] = [];
  if (groups.length === 0) {
    stats.push({ value: core.length, label: "subjects" });
  } else {
    if (core.length > 0) stats.push({ value: core.length, label: "core subjects" });
    stats.push({ value: groups.length, label: "subject groups" });
    if (core.length === 0) stats.push({ value: total, label: "subjects available" });
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = stages.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    if (event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    if (next === null) return;
    event.preventDefault();
    setActiveIndex(next);
    document.getElementById(`curr-tab-${stages[next].id}`)?.focus();
  };

  const progress = (activeIndex / (stages.length - 1)) * 75;

  return (
    <>
      <section className="curr-banner">
        <div className="curr-banner-content">
          <h1>Our Curriculum</h1>
          <nav aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">›</span>
            <span aria-current="page">Curriculum</span>
          </nav>
        </div>
      </section>

      <section className="curr-explorer section-wrap">
        <div className="curr-intro">
          <div className="section-kicker">{intro.kicker}</div>
          <h2 className="accent-heading">
            A curriculum that <span>challenges, enriches</span> and prepares
          </h2>
          <p>{intro.text}</p>
          <p className="curr-hint">Select a stage below to see the subjects we offer.</p>
        </div>

        <div
          className="curr-steps"
          role="tablist"
          aria-label="School stages"
          style={{ "--progress": progress } as CSSProperties}
        >
          {stages.map((item, index) => (
            <button
              key={item.id}
              id={`curr-tab-${item.id}`}
              type="button"
              role="tab"
              className={`curr-step${index === activeIndex ? " is-active" : ""}${index < activeIndex ? " is-done" : ""}`}
              aria-selected={index === activeIndex}
              aria-controls="curr-panel"
              tabIndex={index === activeIndex ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              <span className="curr-step-dot">{index + 1}</span>
              <strong>{item.label}</strong>
              <span className="curr-step-badge">{item.badge}</span>
            </button>
          ))}
        </div>

        <div id="curr-panel" key={stage.id} className="curr-panel" role="tabpanel" aria-labelledby={`curr-tab-${stage.id}`}>
          <header className="curr-panel-head">
            <div>
              <p className="curr-panel-kicker">{stage.badge}</p>
              <h3>{stage.title}</h3>
              <p className="curr-tagline">{stage.tagline}</p>
            </div>
            <ul className="curr-stats">
              {stats.map((stat) => (
                <li key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </li>
              ))}
            </ul>
          </header>

          {stage.classes && (
            <ul className="curr-classes" aria-label="Classes in this stage">
              {stage.classes.map((item) => (
                <li key={item.code}>
                  <strong>{item.code}</strong> {item.name}
                </li>
              ))}
            </ul>
          )}

          {core.length > 0 && (
            <>
              <h4 className="curr-subhead">{groups.length ? "Core subjects" : "Subjects offered"}</h4>
              <ul className="curr-row curr-subject-row">
                {core.map((subject, index) => (
                  <li className="curr-subject" key={subject}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {subject}
                  </li>
                ))}
              </ul>
            </>
          )}

          {groups.length > 0 && (
            <>
              <h4 className="curr-subhead">Subject groups</h4>
              <p className="curr-hint">Subjects within the same group are alternatives to one another.</p>
              <ul className="curr-row curr-group-row" data-count={groups.length}>
                {groups.map((group, index) => (
                  <li className="curr-group" key={group.join("-")}>
                    <span className="curr-group-label">Group {index + 1}</span>
                    <ul>
                      {group.map((subject, i) => (
                        <Fragment key={subject}>
                          {i > 0 && (
                            <li className="curr-or" aria-hidden="true">
                              or
                            </li>
                          )}
                          <li className="curr-option">{subject}</li>
                        </Fragment>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>

      <section className="curr-cta">
        <h2>See it for yourself</h2>
        <p>Visit GBHS Bamenda, tour our classrooms and talk to our teachers about the programme.</p>
        <Link className="light-button" href="/#visit">
          Book a visit <span className="button-arrow" aria-hidden="true">→</span>
        </Link>
      </section>
    </>
  );
}
