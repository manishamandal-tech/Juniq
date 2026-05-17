import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "JG University — Shape Your Future",
  description:
    "JG University is a UGC-approved, tech-driven university in Ahmedabad, Gujarat. Offering UG, PG, Doctoral and Certificate programmes since 1965.",
  keywords:
    "JG University, Ahmedabad, Gujarat, UGC approved, BBA, BCA, BTech, MBA, admissions 2026",
  openGraph: {
    title: "JG University — Shape Your Future",
    description:
      "A tech-driven university empowering students with experiential learning and global exposure.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${dmSans.variable} font-dm bg-jg-navy text-white antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
