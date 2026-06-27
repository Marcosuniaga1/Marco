import { problems } from "@/lib/site";

export default function Problema() {
  return (
    <section className="problema">
      <h2>Reconocerías esto en alguien que conoces…</h2>
      <ul>
        {problems.map((p) => (
          <li key={p.bold}>
            <b>{p.bold}</b> <span>{p.rest}</span>
          </li>
        ))}
      </ul>
      <div className="transition">
        Esto no es casualidad. <em>Es un patrón.</em>
      </div>
    </section>
  );
}
