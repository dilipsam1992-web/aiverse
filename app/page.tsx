import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustSection from "@/components/TrustSection";
import PortfolioSection from "@/components/PortfolioSection";
import BeforeAfter from "@/components/BeforeAfter";
import ServicesSection from "@/components/ServicesSection";
import WhySection from "@/components/WhySection";
import ProcessSection from "@/components/ProcessSection";
import ResultsSection from "@/components/ResultsSection";
import LeadForm from "@/components/LeadForm";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "AIVERSE",
  alternateName: "AIVERSE.AI",
  slogan: "AI Solutions. Real Impact.",
  description:
    "AI-powered jewellery advertising agency creating premium cinematic ads, AI UGC videos and AI model photoshoots for jewellery brands.",
  email: "aiverse.ai1105@gmail.com",
  knowsAbout: [
    "AI Advertising",
    "Jewellery Marketing",
    "AI UGC Ads",
    "AI Model Photoshoots",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <AnnouncementBar />
      <Navbar />
      <main>
        <Hero />
        <TrustSection />
        <PortfolioSection />
        <BeforeAfter />
        <ServicesSection />
        <WhySection />
        <ProcessSection />
        <ResultsSection />
        <LeadForm />
        <FinalCTA />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
