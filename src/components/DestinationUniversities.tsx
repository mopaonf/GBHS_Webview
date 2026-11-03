"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent, type TouchEvent } from "react";

type University = {
  name: string;
  logo: string | null;
  alt: string;
};

const universities: University[] = [
  { name: "University of Bamenda", logo: "/universities/bamenda.png", alt: "University of Bamenda logo" },
  { name: "University of Buea", logo: "/universities/buea.png", alt: "University of Buea logo" },
  { name: "École Nationale Supérieure des Travaux Publics", logo: "/universities/travaux-publics.png", alt: "École Nationale Supérieure des Travaux Publics logo" },
  { name: "Catholic University of Central Africa", logo: "/universities/ucac.png", alt: "Catholic University of Central Africa logo" },
  { name: "École Nationale Supérieure Polytechnique de Yaoundé", logo: "/universities/enspy.png", alt: "École Nationale Supérieure Polytechnique de Yaoundé logo" },
  { name: "National Polytechnic Institute", logo: "/universities/polytechnic-institute.png", alt: "National Polytechnic Institute logo" },
  { name: "Catholic University of Cameroon (CATUC), Bamenda", logo: "/universities/catuc.png", alt: "Catholic University of Cameroon (CATUC), Bamenda logo" },
];

const initials = (name: string) => name
  .replace(/\([^)]*\)/g, "")
  .split(/\s+/)
  .filter(Boolean)
  .slice(0, 3)
  .map((word) => word[0])
  .join("");

export default function DestinationUniversities() {
  const [activeIndex, setActiveIndex] = useState(universities.length);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const touchStart = useRef<number | null>(null);

  const move = (direction: 1 | -1) => {
    setActiveIndex((index) => index + direction);
    setIsTransitioning(true);
  };

  const handleTransitionEnd = () => {
    if (activeIndex >= universities.length * 2) {
      setIsTransitioning(false);
      setActiveIndex(universities.length);
    } else if (activeIndex < universities.length) {
      setIsTransitioning(false);
      setActiveIndex(universities.length * 2 - 1);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    }
  };

  const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
    touchStart.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    if (touchStart.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(distance) > 40) move(distance < 0 ? 1 : -1);
    touchStart.current = null;
  };

  const slides = [...universities, ...universities, ...universities];

  return (
    <section
      className="destinations-section section-wrap"
      role="region"
      aria-roledescription="carousel"
      aria-label="Destination universities"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <h2 className="accent-heading"><span>Destination</span> Universities</h2>
      <p className="destinations-intro">
        Many of our students continue their studies at leading universities in the North West Region and across Cameroon.
      </p>
      <div
        className="destinations-band"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button className="destinations-arrow destinations-prev" type="button" aria-label="Previous universities" onClick={() => move(-1)}>
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="m14 5-7 7 7 7" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </button>
        <div className="destinations-viewport">
          <div
            className="destinations-track"
            style={{
              transform: `translateX(calc(-${activeIndex} * (100% / var(--destinations-visible))))`,
              transition: isTransitioning ? "transform 400ms ease" : "none",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {slides.map((university, index) => (
              <div className="destinations-logo-box" key={`${university.name}-${index}`}>
                {university.logo ? (
                  <Image
                    src={university.logo}
                    alt={university.alt}
                    width={220}
                    height={110}
                    style={{ width: "220px", height: "110px", objectFit: "contain" }}
                    unoptimized={university.logo.endsWith(".svg")}
                  />
                ) : (
                  <span className="destinations-placeholder" aria-label={university.alt}>{initials(university.name)}</span>
                )}
              </div>
            ))}
          </div>
        </div>
        <button className="destinations-arrow destinations-next" type="button" aria-label="Next universities" onClick={() => move(1)}>
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="m10 5 7 7-7 7" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </button>
      </div>
      <a className="outline-button destinations-button" href="#curriculum">Learn more</a>
    </section>
  );
}
