import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import SalDelHueco from "@/components/SalDelHueco";
import Services from "@/components/Services";
import PromoBanner from "@/components/PromoBanner";
import Trayectoria from "@/components/Trayectoria";
import Testimonios from "@/components/Testimonios";
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import Chat from "@/components/Chat";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <Header />
      <Hero />
      <About />
      <SalDelHueco />
      <Services />
      <PromoBanner />
      <Trayectoria />
      <Testimonios />
      <Contacto />
      <Footer />
      <FloatingButtons />
      <Chat />
    </main>
  );
}
