import HeroCarousel from "@/components/main/hero-carousel";
import NewsMarquee from "@/components/main/news-marquee";
import PrincipalMessage from "@/components/main/principal-message";
import MSVPMessage from "@/components/main/msvp-message";
import NoticesAchievements from "@/components/main/notices-achievements";
import DepartmentsCorner from "@/components/main/departments-corner";
import AboutSection from "@/components/main/about-section";
import ContactSection from "@/components/main/contact-section";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Banner Image */}
      <HeroCarousel />
      
      {/* News Marquee */}
      <NewsMarquee />
      
      {/* Messages and Notices Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side - Messages */}
            <div className="lg:col-span-2 space-y-8">
              <PrincipalMessage />
              <MSVPMessage />
            </div>
            
            {/* Right Side - Notices & Achievements */}
            <div className="lg:col-span-1">
              <NoticesAchievements />
            </div>
          </div>
        </div>
      </section>

      {/* Departments Corner */}
      <DepartmentsCorner />

      {/* About Section with History Timeline */}
      <AboutSection />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}
