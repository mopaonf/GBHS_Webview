'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Slide = {
   image: string;
   objectPosition?: string;
   kicker: string;
   title: ReactNode;
   cta: string;
   href: string;
};

const slides: Slide[] = [
   {
      image: '/images/hero/hero-slide-1.png',
      kicker: 'Welcome to GBHS Bamenda',
      title: (
         <>
            Where childhood and ambition
            <br />
            <strong>grow together.</strong>
         </>
      ),
      cta: 'Discover GBHS',
      href: '/about',
   },
   {
      image: '/images/hero/hero-slide-2.png',
      kicker: 'A complete school experience',
      title: (
         <>
            Learning that builds
            <br />
            <strong>confident young people.</strong>
         </>
      ),
      cta: 'Explore our curriculum',
      href: '#curriculum',
   },
   {
      image: '/images/hero/hero-slide-3.png',
      objectPosition: 'center 25%',
      kicker: 'Open events',
      title: (
         <>
            Come and see
            <br />
            <strong>our school for yourself.</strong>
         </>
      ),
      cta: 'Book a visit',
      href: '#visit',
   },
];

const INTERVAL = 10000;

export default function HeroSlider() {
   const [index, setIndex] = useState(0);
   const [paused, setPaused] = useState(false);
   const touchX = useRef<number | null>(null);
   const total = slides.length;

   const go = (i: number) => setIndex((i + total) % total);

   useEffect(() => {
      if (paused) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const id = window.setInterval(
         () => setIndex((i) => (i + 1) % total),
         INTERVAL,
      );
      return () => window.clearInterval(id);
   }, [paused, total]);

   return (
      <section
         className="landing-hero"
         aria-roledescription="carousel"
         aria-label="GBHS highlights"
         onFocus={() => setPaused(true)}
         onBlur={() => setPaused(false)}
         onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX;
         }}
         onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
            touchX.current = null;
         }}
      >
         {slides.map((slide, i) => (
            <div
               key={slide.kicker}
               className={`hero-slide${i === index ? ' is-active' : ''}`}
               role="group"
               aria-roledescription="slide"
               aria-label={`${i + 1} of ${total}`}
               aria-hidden={i !== index}
            >
               <div className="hero-bg">
                  <Image
                     src={slide.image}
                     alt=""
                     fill
                     sizes="100vw"
                     className="hero-img"
                     style={{
                        objectPosition: slide.objectPosition ?? 'center',
                     }}
                     priority={i === 0}
                  />
               </div>
               <div className="landing-hero-content">
                  <p>{slide.kicker}</p>
                  <h1>{slide.title}</h1>
                  <Link
                     className="solid-button"
                     href={slide.href}
                     tabIndex={i === index ? 0 : -1}
                  >
                     {slide.cta}{' '}
                     <span className="button-arrow" aria-hidden="true">
                        →
                     </span>
                  </Link>
               </div>
            </div>
         ))}

         <button
            type="button"
            className="hero-arrow hero-prev"
            aria-label="Previous slide"
            onClick={() => go(index - 1)}
         >
            ‹
         </button>
         <button
            type="button"
            className="hero-arrow hero-next"
            aria-label="Next slide"
            onClick={() => go(index + 1)}
         >
            ›
         </button>

         <div className="hero-dots">
            {slides.map((slide, i) => (
               <button
                  key={slide.kicker}
                  type="button"
                  className={`hero-dot${i === index ? ' is-active' : ''}`}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => go(i)}
               />
            ))}
         </div>
      </section>
   );
}
