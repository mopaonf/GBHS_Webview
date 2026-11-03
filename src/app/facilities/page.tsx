import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchoolLifeContent from "@/components/SchoolLifeContent";

export const metadata: Metadata = {
  title: "Facilities | GBHS Bamenda",
  description: "Explore the learning spaces and facilities at GBHS Bamenda.",
};

export default function FacilitiesPage() {
  return (
    <main>
      <Header />
      <SchoolLifeContent type="facilities" />
      <Footer />
    </main>
  );
}
