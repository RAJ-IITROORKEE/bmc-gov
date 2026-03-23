import HeroCarousel from "@/components/main/hero-carousel";
import NewsMarquee from "@/components/main/news-marquee";
import WelcomeSection from "@/components/main/welcome-section";
import AdministrationEvents from "@/components/main/administration-events";
import PrincipalMessage from "@/components/main/principal-message";
import NoticesAchievements from "@/components/main/notices-achievements";
import DepartmentsCorner from "@/components/main/departments-corner";
import ContactSection from "@/components/main/contact-section";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* 1. Hero Section with Banner Image */}
      <HeroCarousel />
      
      {/* 2. News Marquee - Disclaimer/Notice */}
      <NewsMarquee />
      
      {/* 3. Welcome Section (Left) + Administration/Events (Right) */}
      <section className="py-8 md:py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <WelcomeSection />
            <AdministrationEvents />
          </div>
        </div>
      </section>

      {/* 4. Principal Message (Left) + Notices/Tenders Toggle (Right) */}
      <section className="py-8 md:py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <PrincipalMessage />
            <NoticesAchievements />
          </div>
        </div>
      </section>

      {/* 5. Departments Section */}
      <DepartmentsCorner />

      {/* 6. Contact Section */}
      <ContactSection />

      {/* 7. Footer - Already in layout */}
    </div>
  );
}
