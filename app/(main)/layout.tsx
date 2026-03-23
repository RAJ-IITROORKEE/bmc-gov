import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Burdwan Medical College and Hospital",
    template: "%s | BMC&H",
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
      {/* Navbar will be added here */}
      <main className="flex-1">{children}</main>
      {/* Footer will be added here */}
    </div>
  );
}
