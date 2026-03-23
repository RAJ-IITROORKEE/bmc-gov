import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Footer() {
  return (
    <footer className="bg-muted border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">About Burdwan Medical College</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {SITE_CONFIG.name} is a premier institution dedicated to excellence
              in patient care services, medical education, and research.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/institution"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  The Institution
                </Link>
              </li>
              <li>
                <Link
                  href="/departments"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Departments
                </Link>
              </li>
              <li>
                <Link
                  href="/academic/admission"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Admissions
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {SITE_CONFIG.contact.email}
                </a>
                <br />
                <a
                  href={`mailto:${SITE_CONFIG.contact.secondaryEmail}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {SITE_CONFIG.contact.secondaryEmail}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                <a
                  href={`tel:${SITE_CONFIG.contact.phoneHref}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {SITE_CONFIG.contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">
                  {SITE_CONFIG.contact.address}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights
              reserved.
            </p>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link
                href="/admin/login"
                className="hover:text-primary transition-colors"
              >
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
