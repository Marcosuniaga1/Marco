import Hero from "@/components/Hero";
import LeadForm from "@/components/LeadForm";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <LeadForm />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
  );
}
