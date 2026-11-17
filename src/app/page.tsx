import Footer from "@/components/Footer";
import Link from "next/link";
import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import SchoolTour from "@/components/SchoolTour";
import DestinationUniversities from "@/components/DestinationUniversities";
import InstagramGallery from "@/components/InstagramGallery";
import Statistics from "@/components/Statistics";
import ValuesTabs from "@/components/ValuesTabs";
import type { ReactNode } from "react";

const Arrow = () => <span className="button-arrow" aria-hidden="true">→</span>;
const AccentHeading = ({ children }: { children: ReactNode }) => <h2 className="accent-heading">{children}</h2>;

export default function Home() {
  return (
    <main>
      <Header />

      <HeroSlider />

      <section className="split-section intro-panel">
        <div className="split-image intro-image" role="img" aria-label="GBHS students learning with a teacher" />
        <div className="split-copy">
          <AccentHeading>The complete <span>school</span><br />experience</AccentHeading>
          <p className="lead">An exceptional education in Ntamulung - Bamenda II.</p>
          <p>We are a vibrant and nurturing community, where learning is purposeful, joyful, and ambitious. GBHS Bamenda combines academic excellence with a commitment to developing the whole child intellectually, emotionally, socially, creatively, and physically.</p>
          <Link className="solid-button" href="/about">Discover GBHS <Arrow /></Link>
        </div>
      </section>

      <section className="mission-section section-wrap" id="about">
        <div className="section-kicker">Our school</div>
        <div className="mission-grid">
          <div>
            <AccentHeading>Our <span>mission</span></AccentHeading>
            <p className="large-copy">At GBHS Bamenda, we see every student as an individual, inspiring and equipping them to be ambitious, happy, motivated, and ready to shape a brighter future for themselves and society.</p>
          </div>
          <div className="mission-image" role="img" aria-label="GBHS student working creatively in class" />
        </div>
      </section>

      <section className="results-section section-wrap">
        <div className="split-copy">
          <AccentHeading>Outstanding <span>students</span><br />and bright futures</AccentHeading>
          <p className="large-copy">We are incredibly proud of every student. Our ambitious approach develops intellectual curiosity, independence, and high aspirations, enabling every young person to fulfil their potential.</p>
          <p>Alongside academic excellence, we nurture individual talents and instil strong values of citizenship, responsibility, and service.</p>
          <Link className="solid-button" href="/results">Learn more <Arrow /></Link>
        </div>
        <div className="split-image results-image" role="img" aria-label="Students collaborating outdoors at school" />
      </section>

      <SchoolTour />

      <section className="school-life-section section-wrap">
        <div className="school-life-grid">
          <Link className="school-life-card school-life-pastoral" href="/construction-works">
            <div className="school-life-card-content">
              <h2>Construction Works</h2>
            </div>
          </Link>
          <Link className="school-life-card school-life-cocurricular" href="/co-curricular">
            <div className="school-life-card-content">
              <h2>Co-Curricular</h2>
            </div>
          </Link>
          <Link className="school-life-card school-life-facilities" href="/facilities">
            <div className="school-life-card-content">
              <h2>Facilities</h2>
            </div>
          </Link>
        </div>
      </section>

      <ValuesTabs />

      <section className="events-banner section-wrap" id="visit">
        <div className="events-image" role="img" aria-label="Students enjoying a school activity" />
        <div className="events-copy"><h2>Open Events</h2><p>Join us for a full tour of GBHS Bamenda and meet our community.</p></div>
        <a className="light-button" href="mailto:info@gbhs.edu">Book here <Arrow /></a>
      </section>

      <section className="curriculum-section section-wrap" id="curriculum">
        <div className="section-kicker">Explore our</div>
        <h2 className="display-heading">Curriculum</h2>
        <div className="curriculum-card">
          <div className="curriculum-image" role="img" aria-label="Students learning together in class" />
          <div className="curriculum-copy">
            <AccentHeading>A curriculum that<br /><span>challenges, enriches</span><br />and prepares</AccentHeading>
            <p>Our ambitious curriculum supports the Cameroon pathway from Form 1 through Form 5, then Lower Sixth and Upper Sixth. Students build strong foundations for the GCE Ordinary Level and Advanced Level while being challenged to achieve their best.</p>
            <Link className="outline-button" href="/curriculum">Find out more <Arrow /></Link>
          </div>
        </div>
      </section>

      <Statistics />

      <section className="news-section section-wrap" id="community">
        <div className="section-kicker">Latest from GBHS</div>
        <AccentHeading>News <span>&amp; updates</span></AccentHeading>
        <p>Read stories from across our school community and discover the moments that make GBHS Bamenda special.</p>
        <div className="news-grid">
          <article className="news-card news-card-one"><span>Student life</span><h3>Learning that reaches beyond the classroom</h3></article>
          <article className="news-card news-card-two"><span>Community</span><h3>Celebrating our students&apos; achievements</h3></article>
          <article className="news-card news-card-three"><span>Creativity</span><h3>Making room for brave ideas</h3></article>
        </div>
      </section>

      <DestinationUniversities />

      <section className="instagram-section section-wrap">
        <div className="instagram-mark" aria-hidden="true">
          {Array.from({ length: 18 }, (_, index) => <span key={index} />)}
        </div>
        <div className="instagram-social-heading">
          <h2>GBHS on</h2>
          <div className="instagram-socials" aria-label="GBHS social media">
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
        <div className="instagram-line" />
        <InstagramGallery />
      </section>

      <Footer />
    </main>
  );
}