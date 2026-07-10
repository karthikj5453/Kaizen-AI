import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { TrustedBy } from "@/components/landing/TrustedBy";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { PlatformFailSection } from "@/components/landing/PlatformFailSection";
import { SolutionSection } from "@/components/landing/SolutionSection";
import { PipelineSection } from "@/components/landing/PipelineSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { AgentsSection } from "@/components/landing/AgentsSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { RoadmapSection } from "@/components/landing/RoadmapSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="bg-[#09090B] min-h-screen text-[#FAFAFA]">
      <Navbar />
      
      <main className="flex flex-col gap-[20vh] pb-[20vh]">
        <HeroSection />
        <TrustedBy />
        <ProblemSection />
        <PlatformFailSection />
        <SolutionSection />
        <PipelineSection />
        <HowItWorksSection />
        <AgentsSection />
        <FeaturesSection />
        <RoadmapSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
