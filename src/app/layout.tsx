import { Playfair_Display, Jost, Didact_Gothic } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });
const jost = Jost({ subsets: ["latin"], variable: "--font-sans", weight: ["200", "300", "400"] });
const didactGothic = Didact_Gothic({ subsets: ["latin"], variable: "--font-didact", weight: ["400"] });

export const metadata = {
  title: "REMY MUSE — Luxury Nail Studio",
  description: "Exquisite nail care and aesthetic ecosystem. Clean girl aesthetic, glassmorphism, and premium service in Da Nang.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${playfair.variable} ${jost.variable} ${didactGothic.variable} antialiased min-h-screen`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

