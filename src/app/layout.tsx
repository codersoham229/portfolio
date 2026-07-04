import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  themeColor: "#030303",
};

export const metadata: Metadata = {
  title: "Soham Malekar | Frontend Developer & IT Engineer Workspace",
  description: "Explore the interactive digital workspace of Soham Malekar, an Information Technology engineer specializing in frontend development, UI/UX, and prompt engineering.",
  keywords: [
    "Soham Malekar",
    "Soham",
    "Malekar",
    "Frontend Developer",
    "IT Diploma",
    "Vidyalankar Polytechnic",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "Figma UI/UX"
  ],
  authors: [{ name: "Soham Malekar" }],
  creator: "Soham Malekar",
  openGraph: {
    title: "Soham Malekar | Developer Workspace",
    description: "Explore the interactive digital workspace of Soham Malekar. Check out projects, skill sets, and contact details.",
    type: "website",
    locale: "en_US",
    siteName: "Soham Malekar Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark antialiased scroll-smooth`}
    >
      <body className="bg-background text-foreground min-h-screen font-sans selection:bg-primary/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
