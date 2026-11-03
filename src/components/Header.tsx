"use client";

import { useState } from "react";
import Link from "next/link";

const PeopleIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path d="M16 20v-1.6a3.4 3.4 0 0 0-3.4-3.4H6.4A3.4 3.4 0 0 0 3 18.4V20M9.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM17 11a3 3 0 1 0-1.1-5.8M16.2 15h1.4a3.4 3.4 0 0 1 3.4 3.4V20" />
  </svg>
);

const EnvelopeIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <rect x="3" y="5" width="18" height="14" rx="1.5" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

const PhoneIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path d="M7.2 3.5 4.8 4.8a2 2 0 0 0-1 2.2c1.2 6.3 6.1 11.2 12.4 12.4a2 2 0 0 0 2.2-1l1.3-2.4a1.5 1.5 0 0 0-.5-2l-2.6-1.7a1.5 1.5 0 0 0-1.9.2l-1.2 1.2a12.3 12.3 0 0 1-4.4-4.4l1.2-1.2a1.5 1.5 0 0 0 .2-1.9L8.9 4a1.5 1.5 0 0 0-1.7-.5Z" />
  </svg>
);

const MenuIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

const BrandMark = () => (
  <span className="header-brand-mark" aria-hidden="true">GBHS</span>
);

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="site-header">
        <div className="header-column header-left">
          <a href="#community" aria-label="People and community"><PeopleIcon /></a>
          <a href="mailto:info@gbhs.edu" aria-label="Email GBHS"><EnvelopeIcon /></a>
        </div>
        <a href="#" className="header-brand" aria-label="GBHS home">
          <BrandMark />
          <span><strong>GBHS Bamenda</strong><small>Government High School</small></span>
        </a>
        <div className="header-column header-right">
          <a href="tel:+10000000000" aria-label="Call GBHS"><PhoneIcon /></a>
          <button type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)}><MenuIcon /></button>
        </div>
      </header>
      {menuOpen && (
        <div className="menu-panel">
          <button type="button" className="menu-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">×</button>
          <nav aria-label="Site menu">
            <Link href="/" onClick={() => setMenuOpen(false)}>Home <span>›</span></Link>
            <Link href="/about" onClick={() => setMenuOpen(false)}>About GBHS <span>›</span></Link>
            <Link href="/#visit" onClick={() => setMenuOpen(false)}>Admissions <span>›</span></Link>
            <Link href="/#curriculum" onClick={() => setMenuOpen(false)}>Curriculum <span>›</span></Link>
            <Link href="/#community" onClick={() => setMenuOpen(false)}>News &amp; updates <span>›</span></Link>
            <a href="mailto:info@gbhs.edu" onClick={() => setMenuOpen(false)}>Contact</a>
          </nav>
          <div className="menu-side-links">
            <Link href="/#about" onClick={() => setMenuOpen(false)}>Our mission</Link>
            <Link href="/#community" onClick={() => setMenuOpen(false)}>Our values</Link>
            <Link href="/#visit" onClick={() => setMenuOpen(false)}>Open events</Link>
            <a href="tel:+10000000000">Call the school</a>
          </div>
        </div>
      )}
    </>
  );
}
