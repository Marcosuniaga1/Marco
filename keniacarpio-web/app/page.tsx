import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SalDelHueco from "@/components/SalDelHueco";
import Services from "@/components/Services";
import PromoBanner from "@/components/PromoBanner";
import About from "@/components/About";
import Testimonios from "@/components/Testimonios";
import Trayectoria from "@/components/Trayectoria";
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import Chat from "@/components/Chat";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <Header />
      <Hero />
      <SalDelHueco />
      <Services />
      <PromoBanner />
      <About />
      <Testimonios />
      <Trayectoria />
      <Contacto />
      <Footer />
      <FloatingButtons />
      <Chat />
    </main>
  );
}
