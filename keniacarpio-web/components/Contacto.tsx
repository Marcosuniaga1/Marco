const WHATSAPP_NUMBER = "584241054059";
const WHATSAPP_MESSAGE = "Hola Kenia, quiero agendar una cita";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;
const INSTAGRAM_URL = "https://www.instagram.com/saldelhueco/";

export default function Contacto() {
  return (
    <section
      id="contacto"
      className="section-padding relative bg-mystic-gradient"
    >
      <div className="absolute inset-0 soft-noise opacity-60" />
      <div className="absolute inset-0 starfield opacity-30" />

      <div className="container-narrow relative z-10">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-oro">
            Contacto
          </p>
          <h2 className="heading-serif text-4xl md:text-5xl">
            Agenda tu <span className="gold-text">cita</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-crema/70">
            Escríbeme directamente por WhatsApp o Instagram. Respondo
            personalmente y coordinamos día, hora y modalidad (presencial u
            online).
          </p>
        </div>

        <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-3xl border border-oro/30 bg-noche/50 p-8 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-oro/70"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366]/15 text-3xl">
              <svg
                viewBox="0 0 24 24"
                className="h-7 w-7 fill-[#25D366]"
                aria-hidden
              >
                <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.52-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
              </svg>
            </div>
            <h3 className="heading-serif text-2xl text-crema mb-2">WhatsApp</h3>
            <p className="text-sm text-crema/70 mb-4">
              +58 424 105 4059 — Mensaje precargado: “quiero agendar una cita”.
            </p>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-oro group-hover:gap-3 transition-all">
              Escribir ahora <span>→</span>
            </span>
          </a>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-3xl border border-oro/30 bg-noche/50 p-8 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-oro/70"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5] text-2xl text-white">
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white" aria-hidden>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.062-1.366.336-2.633 1.311-3.608.975-.975 2.242-1.249 3.608-1.311C8.416 2.175 8.796 2.163 12 2.163zm0 1.838c-3.158 0-3.51.012-4.745.068-.974.045-1.504.207-1.857.344-.467.182-.8.399-1.15.749-.35.35-.567.683-.749 1.15-.137.353-.299.883-.344 1.857-.056 1.235-.068 1.587-.068 4.745s.012 3.51.068 4.745c.045.974.207 1.504.344 1.857.182.467.399.8.749 1.15.35.35.683.567 1.15.749.353.137.883.299 1.857.344 1.235.056 1.587.068 4.745.068s3.51-.012 4.745-.068c.974-.045 1.504-.207 1.857-.344.467-.182.8-.399 1.15-.749.35-.35.567-.683.749-1.15.137-.353.299-.883.344-1.857.056-1.235.068-1.587.068-4.745s-.012-3.51-.068-4.745c-.045-.974-.207-1.504-.344-1.857a3.097 3.097 0 00-.749-1.15 3.097 3.097 0 00-1.15-.749c-.353-.137-.883-.299-1.857-.344C15.51 4.013 15.158 4 12 4zm0 3.135a4.865 4.865 0 110 9.73 4.865 4.865 0 010-9.73zm0 8.027a3.162 3.162 0 100-6.324 3.162 3.162 0 000 6.324zm6.406-8.225a1.137 1.137 0 11-2.273 0 1.137 1.137 0 012.273 0z" />
              </svg>
            </div>
            <h3 className="heading-serif text-2xl text-crema mb-2">Instagram</h3>
            <p className="text-sm text-crema/70 mb-4">
              @saldelhueco — Lecturas, rituales, contenido real y sin filtros.
            </p>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-oro group-hover:gap-3 transition-all">
              Ver perfil <span>→</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
