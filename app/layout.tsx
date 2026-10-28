import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { personalInfo } from "@/data/portfolio";

export const metadata: Metadata = {
  title: `${personalInfo.name} — ${personalInfo.headline}`,
  description: personalInfo.shortBio,
  keywords: [
    "Samir",
    "Software Engineer",
    "Full-Stack Developer",
    "AI/ML Engineer",
    "Computer Science Engineering",
    "Next.js Portfolio",
    "Distributed Systems",
  ],
  authors: [{ name: personalInfo.name, url: personalInfo.social.github }],
  openGraph: {
    title: `${personalInfo.name} — Engineering What's Next`,
    description: personalInfo.shortBio,
    type: "website",
    locale: "en_US",
    siteName: `${personalInfo.name} Engineering Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${personalInfo.name} — Engineering What's Next`,
    description: personalInfo.shortBio,
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
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body className="bg-background text-foreground min-h-screen selection:bg-cyan-500/30 selection:text-cyan-200">
        <ThemeProvider>
          <ScrollProgress />
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
