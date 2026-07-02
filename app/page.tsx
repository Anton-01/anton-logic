import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ServicesSection />
        <ProjectsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
