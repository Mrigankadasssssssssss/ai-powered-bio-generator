import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GridPattern from "@/components/magicui/animated-grid-pattern";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BioGenerator",
  description: "Generated by Mriganka",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GridPattern width={60} height={60} className="-z-10 opacity-35" />
        <TooltipProvider>

        {children}
        </TooltipProvider>
        </body>
    </html>
  );
}
