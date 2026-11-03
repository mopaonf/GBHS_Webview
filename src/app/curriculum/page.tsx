import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CurriculumContent from "@/components/CurriculumContent";

export const metadata: Metadata = {
  title: "Curriculum | GBHS Bamenda",
  description: "Explore the academic pathway and subjects offered at GBHS Bamenda.",
};

export default function CurriculumPage() {
  return (
    <main>
      <Header />
      <CurriculumContent />
      <Footer />
    </main>
  );
}
