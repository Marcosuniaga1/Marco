import { steps } from "@/lib/site";

const icons: Record<string, React.ReactNode> = {
  eye: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  unlock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 9.9-1" />
    </svg>
  ),
  compass: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
};

export default function Steps() {
  return (
    <section className="steps">
      <h2>¿Qué pasa después de reconocer dónde estás?</h2>
      <div className="steprow">
        {steps.map((s, i) => (
          <div className="step" key={s.title}>
            <div className="circle">{icons[s.icon]}</div>
            <div className="content">
              <div className="paso">Paso {i + 1}</div>
              <h3>{s.title}</h3>
              <p className="stext">{s.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
