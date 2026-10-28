import type { Metadata } from "next";
import "./globals.css";
import { ClientProviders } from "@/components/ui/ClientProviders";
import { personalInfo } from "@/data/portfolio";

export const metadata: Metadata = {
  title: `${personalInfo.name} — B.Tech CSE (3rd Year) | SIET Prayagraj`,
  description: personalInfo.shortBio,
  keywords: [
    "Samir Khan",
    "Shambhunath Institute of Engineering and Technology",
    "SIET Prayagraj",
    "B.Tech CSE",
    "Software Engineer",
    "Full-Stack Developer",
    "Backend Developer",
    "Docker",
    "MongoDB",
    "React",
    "FastAPI",
    "Python",
    "C++",
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
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
