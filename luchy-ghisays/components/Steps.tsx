import { steps } from "@/lib/site";

export default function Steps() {
  return (
    <section className="steps">
      <h2>¿Qué pasa después de reconocer dónde estás?</h2>
      <div className="steprow">
        {steps.map((text, i) => (
          <div className="step" key={i}>
            <div className="n">{i + 1}</div>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
