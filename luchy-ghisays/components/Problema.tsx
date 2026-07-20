import { problems } from "@/lib/site";

const icons: Record<string, React.ReactNode> = {
  target: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  ),
  loop: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12a9 9 0 1 1-2.64-6.36" />
      <polyline points="21 3 21 9 15 9" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 16 14" />
    </svg>
  ),
};

export default function Problema() {
  return (
    <section className="problema">
      <h2>Reconocerías esto en alguien que conoces…</h2>
      <div className="pcards">
        {problems.map((p) => (
          <article className="pcard" key={p.title}>
            <div className="picon">{icons[p.icon]}</div>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
          </article>
        ))}
      </div>
      <div className="transition">
        Esto no es casualidad. <em>Es un patrón.</em>
      </div>
    </section>
  );
}
