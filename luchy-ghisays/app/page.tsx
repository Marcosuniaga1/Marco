import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StickyBar from "@/components/StickyBar";
import SobreLuchy from "@/components/SobreLuchy";
import Problema from "@/components/Problema";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="shell">
      <Header />
      <Hero />
      <Problema />
      <SobreLuchy />
      <Faq />
      <Footer />
      <StickyBar />
    </div>
  );
}
