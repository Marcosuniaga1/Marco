import { testimonials } from "@/lib/testimonials";

export default function Testimonials() {
  return (
    <section className="bg-crema px-5 py-16">
      <h2 className="section-title">Lo que dicen quienes ya aprendieron</h2>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <article
            key={t.name}
            className="rounded-2xl border-l-[5px] border-dorado bg-white p-7 shadow-card"
          >
            <div className="mb-3 text-[1.1rem] text-dorado" aria-hidden="true">
              ★★★★★
            </div>
            <p className="mb-4 italic text-[#555]">&ldquo;{t.quote}&rdquo;</p>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-vinotinto text-[1.1rem] font-bold text-crema">
                {t.initial}
              </div>
              <div>
                <strong className="block text-vinotinto">{t.name}</strong>
                <span className="text-[0.85rem] text-[#999]">{t.role}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
