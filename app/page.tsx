import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureSplit from "@/components/FeatureSplit";
import TabsSection from "@/components/TabsSection";
import FaqAccordion from "@/components/FaqAccordion";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeatureSplit />
        <TabsSection />
        <FaqAccordion />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
