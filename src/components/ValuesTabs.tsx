"use client";

import { useState, type KeyboardEvent } from "react";

type ValueTab = {
  icon: string;
  title: string;
  shortDescription: string;
  heading: string;
  body: string[];
  imageUrl: string;
  imageAlt: string;
};

const values: ValueTab[] = [
  {
    icon: "✦",
    title: "Curiosity",
    shortDescription: "We ask better questions and stay open to discovery.",
    heading: "Outstanding students and bright futures",
    body: [
      "We are incredibly proud of every student. Our ambitious approach develops intellectual curiosity, independence, and high aspirations, enabling every young person to fulfil their potential.",
      "Alongside academic excellence, we nurture individual talents and instil strong values of citizenship, responsibility, and service.",
    ],
    imageUrl: "/images/curiosity.png",
    imageAlt: "Students arriving at their school campus",
  },
  {
    icon: "◉",
    title: "Creativity",
    shortDescription: "We make space for imagination, expression, and new ideas.",
    heading: "Learning shaped by imagination",
    body: [
      "We encourage every student to explore ideas, express themselves boldly, and approach challenges with imagination. Through creative learning, students discover new ways to understand the world and their place in it.",
      "Our community values original thinking, thoughtful expression, and the confidence to turn ideas into meaningful work.",
    ],
    imageUrl: "/images/contruction-works.png",
    imageAlt: "Workers building and fitting out a school classroom",
  },
  {
    icon: "★",
    title: "Confidence",
    shortDescription: "We help every student find their voice and use it well.",
    heading: "Confidence to take the next step",
    body: [
      "We create a supportive environment where students can grow in confidence, take on new challenges, and learn from experience. Every step forward helps young people recognise their strengths and trust their abilities.",
      "With encouragement and high expectations, students develop the resilience and self-belief to contribute positively to their school and wider community.",
    ],
    imageUrl: "/images/outstanding-students-and-bright-future.png",
    imageAlt: "Students learning together in a classroom",
  },
  {
    icon: "••",
    title: "Collaboration",
    shortDescription: "We learn with one another and contribute generously.",
    heading: "Growing stronger together",
    body: [
      "We believe students learn best when they listen, share, and work with others. Collaboration teaches them to value different perspectives, communicate clearly, and contribute generously to shared goals.",
      "Together, students build the practical relationships and sense of responsibility that help a community thrive.",
    ],
    imageUrl: "/images/co-curricular.png",
    imageAlt: "Students and community members collaborating at school",
  },
];

export default function ValuesTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeValue = values[activeIndex];

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (activeIndex + direction + values.length) % values.length;
    setActiveIndex(nextIndex);
    document.getElementById(`value-tab-${nextIndex}`)?.focus();
  };

  return (
    <>
      <section className="values-section section-wrap">
        <div className="values-heading">
          <p>Our school&apos;s</p>
          <h2>Values</h2>
        </div>
        <svg
          className="values-chevron"
          viewBox="0 0 40 100"
          aria-hidden="true"
          focusable="false"
        >
          <polyline
            points="5 10, 35 50, 5 90"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
          />
        </svg>
        <div className="values-list" role="tablist" aria-label="Our school's values">
          {values.map((value, index) => (
            <button
              className={`value-item value-tab${index === activeIndex ? " is-active" : ""}`}
              id={`value-tab-${index}`}
              key={`value-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-controls="value-panel"
              tabIndex={index === activeIndex ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              onKeyDown={handleKeyDown}
            >
              <span className="value-icon" aria-hidden="true">{value.icon}</span>
              <span className="value-tab-title">{value.title}</span>
              <span className="value-tab-description">{value.shortDescription}</span>
            </button>
          ))}
        </div>
      </section>

      <section
        className="results-section values-panel section-wrap"
        id="value-panel"
        role="tabpanel"
        aria-labelledby={`value-tab-${activeIndex}`}
      >
        <div className="split-copy values-panel-copy" key={`value-panel-copy-${activeIndex}`}>
          <h2 className="accent-heading">{activeValue.heading}</h2>
          {activeValue.body.map((paragraph, index) => (
            <p className="large-copy" key={`value-panel-paragraph-${activeIndex}-${index}`}>{paragraph}</p>
          ))}
        </div>
        <div
          className="split-image results-image values-panel-image"
          key={`value-panel-image-${activeIndex}`}
          role="img"
          aria-label={activeValue.imageAlt}
          style={{ backgroundImage: `url('${activeValue.imageUrl}')` }}
        />
      </section>
    </>
  );
}
