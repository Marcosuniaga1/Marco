import { aboutLuchy } from "@/lib/site";

export default function SobreLuchy() {
  return (
    <section className="sobre">
      <div className="sobre-inner">
        <div className="photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={aboutLuchy.photo} alt={aboutLuchy.photoAlt} />
        </div>
        <div className="copy">
          <div className="eyebrow">{aboutLuchy.eyebrow}</div>
          <h2>{aboutLuchy.heading}</h2>
          {aboutLuchy.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <p className="firma">{aboutLuchy.closing}</p>
        </div>
      </div>
    </section>
  );
}
