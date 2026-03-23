import React from "react";
import { Metadata } from "next";
import Navbar from "@/components/main/navbar";
import Footer from "@/components/main/footer";

export const metadata: Metadata = {
  title: {
    default: "Burdwan Medical College and Hospital",
    template: "%s | BMC",
  },
  description:
    "Burdwan Medical College and Hospital provides top-notch medical education and healthcare services. A Center of Excellence in Patient Care Services, Medical Education and Research.",
};

export default function MainLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
