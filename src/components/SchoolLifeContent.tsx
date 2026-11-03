import Link from "next/link";

type SchoolLifePage = {
  title: string;
  kicker: string;
  introHeading: string;
  introAccent: string;
  intro: string;
  image: string;
  imageAlt: string;
  highlights: { title: string; text: string }[];
  galleryLabels: string[];
  galleryImages: string[];
};

const pages: Record<"construction" | "facilities" | "co-curricular", SchoolLifePage> = {
  construction: {
    title: "Construction Works",
    kicker: "Growing our school",
    introHeading: "Building a stronger",
    introAccent: "learning environment",
    intro: "Our construction programme is helping GBHS Bamenda create spaces that support ambitious teaching, joyful learning, and a welcoming school community. This page will share progress as new work takes shape across the campus.",
    image: "/images/tropical-building-construction-site.png",
    imageAlt: "Construction works at GBHS Bamenda",
    highlights: [
      { title: "A campus with purpose", text: "Each improvement is planned around the daily experience of students, teachers, and families." },
      { title: "Work in progress", text: "We are documenting the stages of construction and renovation as the school continues to develop." },
      { title: "Looking ahead", text: "New and improved spaces will give students more room to learn, collaborate, and pursue their ambitions." },
    ],
    galleryLabels: ["Building construction site", "Campus building maintenance", "Newly painted veranda"],
    galleryImages: [
      "/images/tropical-building-construction-site.png",
      "/images/tropical-campus-building-under-maintenance.png",
      "/images/newly-painted-veranda-under-construction.png",
    ],
  },
  facilities: {
    title: "Facilities",
    kicker: "Spaces to learn and thrive",
    introHeading: "Places that make",
    introAccent: "learning possible",
    intro: "From classrooms and study areas to the wider school grounds, our facilities are an important part of the GBHS experience. We are continuing to develop practical, welcoming spaces where students can focus, connect, and grow.",
    image: "/images/newly-renovated-building-and-yard.png",
    imageAlt: "Facilities at GBHS Bamenda",
    highlights: [
      { title: "Ready for learning", text: "Our classrooms and study spaces are shaped to support focused teaching and active participation." },
      { title: "A welcoming campus", text: "Shared spaces help students feel part of a community and give school life room to flourish." },
      { title: "Developing for tomorrow", text: "As the campus grows, we will continue to improve the spaces and resources available to every learner." },
    ],
    galleryLabels: ["Renovated building and yard", "Vibrant campus corridor", "Maroon and gold renovation"],
    galleryImages: [
      "/images/newly-renovated-building-and-yard.png",
      "/images/vibrant-burgundy-and-yellow-corridor.png",
      "/images/maroon-and-gold-building-renovation.png",
    ],
  },
  "co-curricular": {
    title: "Co-Curricular",
    kicker: "Learning beyond the classroom",
    introHeading: "Space to discover",
    introAccent: "more of your potential",
    intro: "Co-curricular life gives students the opportunity to explore interests, build confidence, and learn alongside one another. Through clubs, activities, sport, and creative opportunities, students discover new strengths and make a meaningful contribution to school life.",
    image: "/images/co-curricular.png",
    imageAlt: "Students taking part in co-curricular activities at GBHS Bamenda",
    highlights: [
      { title: "Discover new interests", text: "Students can try new activities, follow their curiosity, and develop skills beyond their academic subjects." },
      { title: "Grow through teamwork", text: "Shared activities help students communicate, take responsibility, and value the contribution of others." },
      { title: "Build confidence", text: "Every opportunity to participate helps students find their voice and take pride in what they can achieve." },
    ],
    galleryLabels: ["Clubs and activities photograph", "Sport and teamwork photograph", "Creative learning photograph"],
    galleryImages: [
      "/images/co-curricular.png",
      "/images/celebrating-our-students-achievements.png",
      "/images/learning-that-reaches-beyond-the-classroom.png",
    ],
  },
};

export default function SchoolLifeContent({ type }: { type: keyof typeof pages }) {
  const page = pages[type];

  return (
    <>
      <section className="school-life-banner" style={{ backgroundImage: `linear-gradient(90deg, rgb(20 27 64 / 80%), rgb(29 39 89 / 45%)), url('${page.image}')` }}>
        <div className="school-life-banner-content">
          <div className="section-kicker">{page.kicker}</div>
          <h1>{page.title}</h1>
          <nav aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">›</span>
            <span aria-current="page">{page.title}</span>
          </nav>
        </div>
      </section>

      <section className="school-life-intro section-wrap">
        <div className="school-life-intro-copy">
          <div className="section-kicker">{page.kicker}</div>
          <h2 className="accent-heading">{page.introHeading} <span>{page.introAccent}</span></h2>
          <p>{page.intro}</p>
        </div>
        <div className="school-life-feature-image" role="img" aria-label={page.imageAlt} style={{ backgroundImage: `url('${page.image}')` }} />
      </section>

      <section className="school-life-highlights section-wrap">
        <div className="section-kicker">Our approach</div>
        <h2 className="accent-heading">Designed for <span>possibility</span></h2>
        <div className="school-life-highlight-grid">
          {page.highlights.map((highlight, index) => (
            <article className="school-life-highlight" key={highlight.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{highlight.title}</h3>
              <p>{highlight.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="school-life-gallery section-wrap">
        <div className="section-kicker">A closer look</div>
        <h2 className="accent-heading">Photographs from <span>our campus</span></h2>
        <div className="school-life-gallery-grid">
          {page.galleryLabels.map((label, index) => (
            <div
              className="school-life-photo-placeholder"
              key={label}
              role="img"
              aria-label={label}
              style={{ backgroundImage: `linear-gradient(0deg, rgb(20 27 64 / 78%), transparent 62%), url('${page.galleryImages[index]}')` }}
            >
              <span>Photo {String(index + 1).padStart(2, "0")}</span>
              <strong>{label}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="school-life-cta">
        <h2>See GBHS for yourself</h2>
        <p>Visit our campus and discover the spaces where our community learns and grows.</p>
        <Link className="light-button" href="/#visit">Book a visit <span className="button-arrow" aria-hidden="true">→</span></Link>
      </section>
    </>
  );
}
