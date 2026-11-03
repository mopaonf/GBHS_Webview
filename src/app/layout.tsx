import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GBHS Bamenda | Government High School",
  description:
    "GBHS Bamenda — Ntamulung quarter, Bamenda II Subdivision, Mezam Division, NWR. Building confident, curious, and capable young people.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
