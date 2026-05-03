import { Noto_Serif, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";

const notoSerif = Noto_Serif({ 
  subsets: ["latin"], 
  variable: "--font-serif",
  weight: ["400", "700"],
  style: ["normal", "italic"]
});

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans",
  weight: ["300", "400", "500", "600"]
});

export const metadata = {
  title: "REMY MUSE — Luxury Nail Studio & Aesthetic Atelier",
  description: "A curated digital sanctuary where nail artistry meets architectural design. Explore bespoke nail services and editorial aesthetics in the heart of Saigon.",
  openGraph: {
    title: "REMY MUSE | Luxury Nail Atelier",
    description: "The Art of Precision. A curated experience of stillness and architectural beauty for your aesthetic identity.",
    url: "https://remymuse.vn",
    siteName: "REMY MUSE",
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "REMY MUSE | Luxury Nail Atelier",
    description: "The Art of Precision. A curated experience of stillness.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${notoSerif.variable} ${inter.variable} antialiased min-h-screen bg-cloud`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}


