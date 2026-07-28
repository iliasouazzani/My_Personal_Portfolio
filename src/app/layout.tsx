import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { LayoutClient } from "./layout-client";

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
    siteName: "Ibrahim Ilias Ouazzani Portfolio",
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
        <LayoutClient>{children}</LayoutClient>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Ibrahim Ilias Ouazzani",
              url: "https://iliasouazzani.vercel.app",
              jobTitle: "AI Systems Builder & Content Creator",
              email: "iliasouazzani303@gmail.com",
              telephone: "+212 615153736",
              knowsLanguage: ["Arabic", "French", "English"],
              description:
                "AI systems builder specializing in OpenClaw configuration, NLP chatbot development, and distributed computing. Also a content creator with 27K+ TikTok followers and volunteer at major international events.",
            }),
          }}
        />
      </body>
    </html>
  );
}
