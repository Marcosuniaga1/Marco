import { signals, site } from "@/lib/site";

export default function Magnet() {
  return (
    <section className="magnet">
      <div className="magnet-inner">
        <div className="magnet-media">
          <div className="magnet-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={site.magnetImage}
              alt="Ejecutivo abrumado por una maraña de pensamientos en automático"
            />
          </div>
          <div className="magnet-caption">
            <p className="cap-title">{site.magnetCaption.title}</p>
            <p className="cap-text">{site.magnetCaption.text}</p>
          </div>
        </div>
        <div className="magnet-content">
          <div className="eyebrow">PDF de diagnóstico</div>
          <h2>Las 10 señales de que estás en automático</h2>
          <div className="sub">
            Una lista de diagnóstico creada específicamente para ejecutivos.
          </div>
          <div className="desc">
            En 5 minutos de lectura, sabrás exactamente dónde estás atrapado. Y
            qué significa.
          </div>
          <div className="signals">
            {signals.map((text, i) => (
              <div className="signal" key={i}>
                <div className="num">{i + 1}</div>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
