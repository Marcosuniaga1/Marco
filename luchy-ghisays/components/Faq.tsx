import { faqs } from "@/lib/site";

export default function Faq() {
  return (
    <section className="faq">
      <h2>Preguntas frecuentes</h2>
      {faqs.map((item) => (
        <details key={item.q}>
          <summary>{item.q}</summary>
          <div className="ans">{item.a}</div>
        </details>
      ))}
    </section>
  );
}
