import HeroCarousel from "@/components/main/hero-carousel";
import NewsMarquee from "@/components/main/news-marquee";
import ContentPanels from "@/components/main/content-panels";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroCarousel />
      <NewsMarquee />
      <ContentPanels />
      
      {/* Welcome Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Welcome to Burdwan Medical College and Hospital
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Established as a premier institution for medical education and healthcare,
            BMC&H is committed to excellence in patient care services, medical education,
            and research. We strive to create competent healthcare professionals who serve
            society with dedication and compassion.
          </p>
        </div>
      </section>
    </div>
  );
}
