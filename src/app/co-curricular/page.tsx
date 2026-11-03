import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchoolLifeContent from "@/components/SchoolLifeContent";

export const metadata: Metadata = {
  title: "Co-Curricular | GBHS Bamenda",
  description: "Explore co-curricular activities and opportunities at GBHS Bamenda.",
};

export default function CoCurricularPage() {
  return (
    <main>
      <Header />
      <SchoolLifeContent type="co-curricular" />
      <Footer />
    </main>
  );
}
