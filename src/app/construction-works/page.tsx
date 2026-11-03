import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchoolLifeContent from "@/components/SchoolLifeContent";

export const metadata: Metadata = {
  title: "Construction Works | GBHS Bamenda",
  description: "Follow the construction and development of the GBHS Bamenda campus.",
};

export default function ConstructionWorksPage() {
  return (
    <main>
      <Header />
      <SchoolLifeContent type="construction" />
      <Footer />
    </main>
  );
}
