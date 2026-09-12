import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Muhammad Furqan",
  description: "Full-stack developer with 15 years of experience building web and mobile products from concept to deployment. AI-first: integrating LLMs and shipping on the edge.",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body className={`${inter.className} relative flex min-h-screen flex-col bg-background`}>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
    </body>
    </html>
  );
}
