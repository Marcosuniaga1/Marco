import LeadForm from "./LeadForm";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <div className="ring">
          <span>↻</span>
        </div>
        <h1>¿Funcionas pero algo te falta?</h1>
        <p>
          La mayoría de los ejecutivos en automático no lo saben. Descubre dónde
          estás atrapado.
        </p>
      </div>
      <LeadForm variant="hero" />
    </section>
  );
}
