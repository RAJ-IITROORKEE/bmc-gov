import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Burdwan Medical College and Hospital",
    template: "%s | BMC&H",
  },
  description:
    "Burdwan Medical College and Hospital - A Center of Excellence in Patient Care Services, Medical Education and Research",
  keywords: [
    "Burdwan Medical College",
    "BMC",
    "Medical Education",
    "Healthcare",
    "MBBS",
    "MD/MS",
    "Medical College Burdwan",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
