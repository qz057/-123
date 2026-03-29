import { CoreCapabilitiesSection } from "@/components/sections/home/core-capabilities";
import { DiagnosePreviewSection } from "@/components/sections/home/diagnose-preview";
import { FinalCtaSection } from "@/components/sections/home/final-cta";
import { HeroSection } from "@/components/sections/home/hero";
import { PainPointsSection } from "@/components/sections/home/pain-points";
import { ProductJourneySection } from "@/components/sections/home/product-journey";
import { TemplatesPreviewSection } from "@/components/sections/home/templates-preview";
import { TrustSection } from "@/components/sections/home/trust-section";
import { UseCasesPreviewSection } from "@/components/sections/home/use-cases-preview";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductJourneySection />
      <PainPointsSection />
      <CoreCapabilitiesSection />
      <DiagnosePreviewSection />
      <TemplatesPreviewSection />
      <UseCasesPreviewSection />
      <TrustSection />
      <FinalCtaSection />
    </>
  );
}
