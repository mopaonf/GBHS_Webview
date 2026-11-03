import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutContent from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "About GBHS Bamenda | Discover GBHS",
  description: "Discover the people, values, and learning community of GBHS Bamenda.",
};

export default function AboutPage() {
  return (
    <main>
      <Header />
      <AboutContent />
      <Footer />
    </main>
  );
}
