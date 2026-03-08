import { Inter, Playfair_Display, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display" });
const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-noto-sans-kr",
  weight: ["300", "400", "500", "700", "900"]
});

export const metadata = {
  title: "Website 2.0 | Vibrant Nail Salon Ecosystem",
  description: "Next-gen nail salon experience with Virtual Consultant & Advanced Booking.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} ${notoSansKR.variable} font-sans gradient-mesh min-h-screen text-brand-900 selection:bg-brand-pink/30 selection:text-brand-900`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
