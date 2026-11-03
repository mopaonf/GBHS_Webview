export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-top">
        <div className="footer-brand-column">
          <a href="#" className="brand brand-footer" aria-label="GBHS home">
            <span className="brand-mark">GBHS</span>
            <span>GBHS<span className="brand-dot">.</span></span>
          </a>
          <p>Curious minds.<br />Kind hearts.</p>
          <div className="footer-socials">
            <a href="#community" aria-label="Instagram">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </a>
            <a href="#community" aria-label="Facebook">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14 8h3V4h-3c-3.3 0-5 1.8-5 5v3H6v4h3v4h4v-4h3l1-4h-4V9c0-.7.3-1 1-1Z" fill="currentColor" />
              </svg>
            </a>
            <a href="#community" aria-label="TikTok">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15 4c.3 2.2 1.5 3.5 3.7 3.7v3.2c-1.3.1-2.5-.3-3.7-1v6.2a5.1 5.1 0 1 1-4.4-5.1v3.3a1.9 1.9 0 1 0 1.2 1.8V4H15Z" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>
        <div className="footer-column">
          <h3>Explore</h3>
          <div className="footer-links">
            <a href="#about">Our school</a>
            <a href="#curriculum">Curriculum</a>
            <a href="#community">News &amp; updates</a>
          </div>
        </div>
        <div className="footer-column">
          <h3>Community</h3>
          <div className="footer-links">
            <a href="#visit">Open events</a>
            <a href="#community">Student life</a>
            <a href="mailto:info@gbhs.edu">Contact us</a>
          </div>
        </div>
        <div className="footer-column footer-contact">
          <h3>Get in touch</h3>
          <p>GBHS Bamenda<br />Ntamulung quarter - Bamenda II Subdivision<br />Mezam Division, NWR</p>
          <a href="mailto:info@gbhs.edu">info@gbhs.edu</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 GBHS</span>
        <span>Government High School</span>
        <span>Built for curious minds.</span>
      </div>
    </footer>
  );
}
