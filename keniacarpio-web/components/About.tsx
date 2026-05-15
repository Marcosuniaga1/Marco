import Image from "next/image";

export default function About() {
  return (
    <section
      id="sobre-mi"
      className="section-padding relative bg-noche"
    >
      <div className="container-narrow grid gap-12 md:grid-cols-2 md:items-start">
        <div className="relative md:sticky md:top-28">
          <div className="aspect-[4/5] w-full overflow-hidden rounded-3xl border border-oro/20 bg-violeta-deep shadow-2xl shadow-violeta/30">
            <Image
              src="/img/kenia.jpeg"
              alt="Kenia Carpio sosteniendo cartas de tarot"
              width={800}
              height={1000}
              priority
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden h-32 w-32 rounded-full border border-oro/40 bg-gradient-to-br from-oro/20 to-violeta/40 backdrop-blur md:flex items-center justify-center">
            <span className="font-serif text-2xl gold-text">SDH</span>
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-oro">
            Sobre mí
          </p>
          <h2 className="heading-serif mb-6 text-4xl md:text-5xl">
            Kenia siempre supo que era{" "}
            <span className="gold-text">distinta</span>
          </h2>

          <div className="space-y-4 text-crema/80 leading-relaxed">
            <p>
              No porque alguien se lo dijera, sino porque no encajaba. Creció
              siendo la oveja negra de una familia estructurada, católica y
              machista, mientras ella era la jeva artística, intensa, curiosa y
              poco obediente. Se veía diferente, pensaba diferente y sentía
              diferente.
            </p>
            <p>
              Desde niña hacía rituales sin saber que se llamaban rituales: para
              empatarse con el niño que le gustaba, para pasar matemáticas, para
              que la vida le diera lo que deseaba.{" "}
              <span className="text-oro">Y se lo daba.</span>
            </p>
            <p>
              Con el tiempo entendió que las cosas escuchan, que la energía
              responde, que la vibración existe. Manifestó sueños grandes y
              pequeños: amor, viajes, encuentros, escenarios, mudanzas,
              creación.
            </p>
            <p className="font-serif text-xl text-crema italic">
              Pero despertar no es solo magia bonita. También es choque.
            </p>
            <p>
              Cuando decidió tomarse lo espiritual en serio, estudiar Tarot y
              metafísica, su vida cambió por completo. No solo ganó claridad:
              ganó preguntas. Y con ellas llegaron pruebas, rupturas internas y
              externas, y un proceso profundo de transformación.
            </p>
            <p>
              Acaba de atravesar su primera, y ojalá única, depresión. Un año
              jodido. Real. Oscuro. Que le enseñó que incluso con herramientas,
              el despertar no siempre es luz.{" "}
              <span className="text-oro">
                Que hay huecos que no se saltan, se atraviesan.
              </span>
            </p>
            <p>
              Hoy entiende que estar en la mierda también es parte del camino. Y
              que no se trata de evitar el dolor, sino de no quedarse sola en
              él. Por eso nace su misión: acompañar a otros a salir de sus
              huecos sin romantizar el sufrimiento, usando el poder interior,
              el Tarot como espejo y la joda como medicina.
            </p>
            <p>
              Además de tarotista, Kenia es{" "}
              <span className="text-oro">psicopedagoga, actriz, locutora y
              creadora de contenido</span>. Une psicología, arte, misticismo y
              humor en una sola voz.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-oro/30 bg-violeta-deep/40 p-6">
            <p className="font-serif text-2xl text-crema leading-snug">
              No es una bruja común.{" "}
              <span className="gold-text">Es una bruja consciente.</span>
            </p>
            <p className="mt-2 text-sm uppercase tracking-[0.3em] text-oro/80">
              Sin poses · Sin filtros · Bien brutal · Bien bruja
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { n: "Tarot", l: "Lecturas" },
              { n: "Rituales", l: "Con intención" },
              { n: "Kits", l: "Energéticos" },
              { n: "Shows", l: "Para eventos" },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-2xl border border-oro/20 bg-violeta-deep/40 p-4 text-center"
              >
                <p className="gold-text font-serif text-lg font-bold">{s.n}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-crema/60">
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
