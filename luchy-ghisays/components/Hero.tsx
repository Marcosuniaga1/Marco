"use client";
import { useState } from "react";

export default function Hero() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="hero">
      <div className="hero-copy">
        <h1>Tu liderazgo funciona.<br />Pero algo no encaja.</h1>
      </div>
      <div className="hero-video">
        <div className="video-wrap">
          {playing ? (
            <iframe
              src="https://www.youtube.com/embed/mJ2m-DWh504?rel=0&modestbranding=1&autoplay=1"
              title="Las 10 señales de que estás en automático"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              className="yt-facade"
              onClick={() => setPlaying(true)}
              aria-label="Reproducir video"
            >
              <img
                src={`https://i.ytimg.com/vi/mJ2m-DWh504/hqdefault.jpg`}
                alt="Ver video"
                loading="lazy"
              />
              <span className="yt-play">▶</span>
            </button>
          )}
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
