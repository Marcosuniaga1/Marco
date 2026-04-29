import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import SalDelHueco from "@/components/SalDelHueco";
import Trayectoria from "@/components/Trayectoria";
import Testimonios from "@/components/Testimonios";
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <Header />
      <Hero />
      <About />
      <Services />
      <SalDelHueco />
      <Trayectoria />
      <Testimonios />
      <Contacto />
      <Footer />
      <FloatingButtons />
    </main>
  );
}
