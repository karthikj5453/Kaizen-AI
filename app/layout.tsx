import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#09090B",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Kaizen AI — AI-Powered Skill Assessment & Learning Platform",
    template: "%s | Kaizen AI",
  },
  description:
    "Kaizen AI uses eight specialized AI agents to evaluate your technical skills, adapt in real-time, and deliver a personalized learning roadmap. Stop guessing your gaps — know exactly what to learn next.",
  keywords: [
    "AI assessment",
    "skill evaluation",
    "technical interview prep",
    "learning roadmap",
    "adaptive learning",
    "AI agents",
    "skill gap analysis",
    "continuous improvement",
    "kaizen",
    "developer assessment",
  ],
  authors: [{ name: "Kaizen AI" }],
  creator: "Kaizen AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kaizen-ai.app",
    siteName: "Kaizen AI",
    title: "Kaizen AI — AI-Powered Skill Assessment & Learning Platform",
    description:
      "Eight specialized AI agents collaborate to evaluate your skills, adapt in real-time, and deliver a personalized roadmap to your next role.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaizen AI — AI-Powered Skill Assessment",
    description:
      "Eight specialized AI agents. Adaptive assessments. Personalized learning roadmaps.",
    creator: "@kaizenai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;0,14..32,800;0,14..32,900;1,14..32,400&family=JetBrains+Mono:wght@400;500;600&family=Noto+Serif+JP:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
        {/* Structured data for FAQPage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Kaizen AI",
              applicationCategory: "EducationApplication",
              description:
                "AI-powered multi-agent self-assessment platform for skill gap discovery and personalized learning roadmaps.",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            }),
          }}
        />
      </head>
      <body className="bg-base font-sans text-primary antialiased relative">
        <div className="bg-noise" />
        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
