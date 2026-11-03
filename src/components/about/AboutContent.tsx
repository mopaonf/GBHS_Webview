"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import {
  leadership,
  principalMessage,
  schoolFacts,
  staff,
  studentLeaders,
} from "@/data/about";

function AboutReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setVisible(true);
      observer.disconnect();
    }, { threshold: 0.15 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={`about-reveal${visible ? " is-visible" : ""} ${className}`}>{children}</div>;
}

function AboutBanner() {
  return (
    <section className="about-banner">
      <div className="about-banner-content">
        <h1>Discover GBHS</h1>
        <p><Link href="/">Home</Link><span aria-hidden="true">›</span> About</p>
      </div>
    </section>
  );
}

function AtAGlance() {
  return (
    <section className="about-glance section-wrap">
      <div className="about-glance-copy">
        <div className="section-kicker">At a glance</div>
        <h2 className="accent-heading">A school with a <span>story</span></h2>
        <p>GBHS Bamenda is a welcoming school community where students are encouraged to learn with purpose, grow in confidence, and look ahead with ambition.</p>
      </div>
      <div className="about-facts">
        {schoolFacts.map((fact) => (
          <div className="about-fact" key={fact.label}>
            <strong>{fact.value}</strong>
            <span>{fact.label}{fact.placeholder ? " · placeholder" : ""}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function PrincipalMessage() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="about-principal">
      <div className="section-wrap">
        <div className="about-principal-frame">
          <div
            className={`about-initials about-principal-portrait${principalMessage.photo ? " about-photo" : ""}`}
            aria-label={`${principalMessage.name}, ${principalMessage.title}`}
            style={principalMessage.photo ? { backgroundImage: `url('${principalMessage.photo}')` } : undefined}
          >
            {!principalMessage.photo && "PN"}
          </div>
        </div>
        <div className="about-principal-copy">
          <div className="section-kicker">A word from the Principal</div>
          <div className="about-quote-mark" aria-hidden="true">&ldquo;</div>
          <div className={`about-message${expanded ? " is-expanded" : ""}`}>
            {principalMessage.paragraphs.map((paragraph, index) => (
              <p className={`${index === 0 ? "about-drop-cap" : ""}${index > 1 ? " about-extra-paragraph" : ""}`} key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <blockquote>{principalMessage.pullQuote}</blockquote>
          <button className="outline-button" type="button" aria-expanded={expanded} aria-controls="principal-message" onClick={() => setExpanded(!expanded)}>
            {expanded ? "Show less" : "Read full message"}
          </button>
          <div id="principal-message" className="about-signature">
            <strong>{principalMessage.name}</strong>
            <span>{principalMessage.title}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

const getInitials = (name: string) => name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2);

function LeadershipTeam() {
  return (
    <section className="about-leadership section-wrap">
      <div className="section-kicker">People who lead with care</div>
      <h2 className="accent-heading">Our <span>leadership</span> team</h2>
      <div className="about-leadership-grid">
        {leadership.map((member) => (
          <article className="about-leader-card" key={member.role}>
            <div className="about-person-frame">
              <div
                className={`about-initials${member.photo ? " about-photo" : ""}`}
                style={member.photo ? { backgroundImage: `url('${member.photo}')` } : undefined}
                aria-label={`${member.name}, ${member.role}`}
              >
                {!member.photo && getInitials(member.name)}
              </div>
            </div>
            <div className="about-leader-copy">
              <h3>{member.name}</h3>
              <p>{member.role}</p>
              <span>{member.responsibility}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function StudentLeaders() {
  return (
    <section className="about-student-leaders section-wrap">
      <h2>Student <span>leaders</span></h2>
      <div className="about-student-list">
        {studentLeaders.map((leader) => (
          <div className="about-student-item" key={leader.role}>
            <div className="about-student-avatar">{getInitials(leader.name)}</div>
            <div><strong>{leader.name}</strong><span>{leader.role}</span></div>
          </div>
        ))}
      </div>
    </section>
  );
}

const departments = ["All", "Sciences", "Languages", "Arts and Humanities", "Technical and Vocational", "Administration"];

function StaffDirectory() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? staff : staff.filter((member) => member.department === active);
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
    event.preventDefault();
    const next = (index + (event.key === "ArrowRight" ? 1 : -1) + departments.length) % departments.length;
    setActive(departments[next]);
    document.getElementById(`staff-tab-${next}`)?.focus();
  };

  return (
    <section className="about-staff section-wrap">
      <div className="section-kicker">Our teaching community</div>
      <h2 className="accent-heading">Meet our <span>teachers</span></h2>
      <div className="about-filter-wrap">
        <div className="about-filters" role="tablist" aria-label="Staff departments">
          {departments.map((department, index) => (
            <button id={`staff-tab-${index}`} className={active === department ? "is-active" : ""} key={department} type="button" role="tab" aria-selected={active === department} aria-controls="staff-directory-panel" onClick={() => setActive(department)} onKeyDown={(event) => handleKeyDown(event, index)}>{department}</button>
          ))}
        </div>
      </div>
      <div id="staff-directory-panel" className="about-staff-grid" role="tabpanel" aria-labelledby={`staff-tab-${departments.indexOf(active)}`} aria-live="polite">
        {filtered.length ? filtered.map((member) => (
          <article className="about-staff-card" key={member.id}>
            <div className="about-staff-avatar">{getInitials(member.name)}</div>
            <div><h3>{member.name}</h3><p>{member.subject}</p><span>{member.department}</span></div>
          </article>
        )) : <p className="about-empty">No staff listed yet.</p>}
      </div>
    </section>
  );
}

function AboutCta() {
  return (
    <section className="about-cta">
      <h2>Come and meet us</h2>
      <p>Discover the warmth, ambition, and possibility of GBHS Bamenda in person.</p>
      <Link className="light-button" href="/#visit">Book a visit <span className="button-arrow" aria-hidden="true">→</span></Link>
    </section>
  );
}

export default function AboutContent() {
  return (
    <>
      <AboutBanner />
      <AboutReveal><AtAGlance /></AboutReveal>
      <AboutReveal><PrincipalMessage /></AboutReveal>
      <AboutReveal><LeadershipTeam /></AboutReveal>
      <AboutReveal><StudentLeaders /></AboutReveal>
      <AboutReveal><StaffDirectory /></AboutReveal>
      <AboutCta />
    </>
  );
}
