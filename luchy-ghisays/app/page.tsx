import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problema from "@/components/Problema";
import Magnet from "@/components/Magnet";
import FormSection from "@/components/FormSection";
import Steps from "@/components/Steps";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="shell">
      <Header />
      <Hero />
      <Problema />
      <Magnet />
      <FormSection />
      <Steps />
      <Testimonials />
      <Faq />
      <Footer />
    </div>
  );
}
