import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ResultsContent from "@/components/ResultsContent";

export const metadata: Metadata = {
  title: "GCE Results | GBHS Bamenda",
  description: "Explore GBHS Bamenda GCE results by examination level and year.",
};

export default function ResultsPage() {
  return (
    <main>
      <Header />
      <ResultsContent />
      <Footer />
    </main>
  );
}
