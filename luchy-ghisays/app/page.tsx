import Header from "@/components/Header";
import Hero from "@/components/Hero";
import VideoSection from "@/components/VideoSection";
import SobreLuchy from "@/components/SobreLuchy";
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
      <VideoSection />
      <Problema />
      <Magnet />
      <FormSection />
      <Steps />
      <SobreLuchy />
      <Testimonials />
      <Faq />
      <Footer />
    </div>
  );
}
