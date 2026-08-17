export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <h1>Tu liderazgo funciona.<br />Pero algo no encaja.</h1>
      </div>
      <div className="hero-video">
        <div className="video-wrap">
          <iframe
            src="https://www.youtube.com/embed/mLfD3xYs3WY?rel=0&modestbranding=1"
            title="Las 10 señales de que estás en automático"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
      <div className="hero-copy">
        <p>
          La mayoría de los ejecutivos de alto rendimiento operan en piloto
          automático sin saberlo. Descubre las 10 señales que lo confirman.
        </p>
        <a href="#form" className="hero-cta">Ver las 10 señales →</a>
      </div>
    </section>
  );
}
