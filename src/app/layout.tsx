import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { PageLoader } from "@/components/layout/PageLoader";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Ibrahim Ilias Ouazzani | AI Systems | Content Creator | Community",
  description:
    "Portfolio of Ibrahim Ilias Ouazzani: AI systems builder, content creator, and community contributor. Spanning OpenClaw configuration, NLP chatbots, 27K+ TikTok growth, and major event volunteering.",
  keywords: [
    "Ibrahim Ilias Ouazzani",
    "AI Systems",
    "OpenClaw",
    "LLM Integration",
    "NLP Chatbot",
    "Video Editing",
    "Content Creator",
    "Volunteering",
    "Hackathon",
    "Morocco",
  ],
  authors: [{ name: "Ibrahim Ilias Ouazzani" }],
  openGraph: {
    title: "Ibrahim Ilias Ouazzani | Portfolio",
    description:
      "AI systems builder, content creator, and community contributor.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ibrahim Ilias Ouazzani | Portfolio",
    description:
      "AI systems builder, content creator, and community contributor.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="grain-overlay">
        <PageLoader>{children}</PageLoader>
      </body>
    </html>
  );
}
