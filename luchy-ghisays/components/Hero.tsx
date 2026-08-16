import LeadForm from "./LeadForm";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <div className="ring">
          <span>↻</span>
        </div>
        <h1>Tu liderazgo funciona.<br />Pero algo no encaja.</h1>
        <p>
          La mayoría de los ejecutivos de alto rendimiento operan en piloto
          automático sin saberlo. Descubre las 10 señales que lo confirman.
        </p>
      </div>
      <LeadForm variant="hero" />
    </section>
  );
}
