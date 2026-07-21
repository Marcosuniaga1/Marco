import Hero from "@/components/Hero";
import ProblemSolution from "@/components/ProblemSolution";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import Testimonial from "@/components/Testimonial";
import WhoIsFor from "@/components/WhoIsFor";
import Guarantee from "@/components/Guarantee";
import Faq from "@/components/Faq";
import FinalCTA from "@/components/FinalCTA";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProblemSolution />
      <HowItWorks />
      <Benefits />
      <Testimonial />
      <WhoIsFor />
      <Guarantee />
      <Faq />
      <FinalCTA />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
