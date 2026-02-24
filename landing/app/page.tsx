import Image from "next/image";
import Link from "next/link";

function StoreButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <a
        href="https://apps.apple.com/pe/app/fresh-keep/id6758866761?l=en-GB"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors"
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
          <path d="M17.9 5c-.1.1-.1.2-.2.3l-3 5.1 3.2 5.5c.1.2.2.3.2.5 0 .1-.1.3-.2.4-.5.8-1.4 1.2-2.3 1.2-.5 0-.9-.1-1.3-.4l-3.2-1.9-3.2 1.9c-.4.2-.8.4-1.3.4-.9 0-1.8-.5-2.3-1.2-.1-.1-.2-.3-.2-.4 0-.2.1-.3.2-.5l3.2-5.5-3-5.1c-.1-.1-.1-.2-.2-.3 0-.2.1-.3.2-.4C5.2 3.7 6 3.3 6.8 3.3c.5 0 .9.1 1.3.4L11.3 5.6l3.2-1.9c.4-.2.8-.4 1.3-.4.8 0 1.6.4 2.1 1.1 0 .1 0 .3 0 .6z" />
        </svg>
        <div className="text-left">
          <div className="text-[10px] leading-none">Descarga en</div>
          <div className="text-lg font-semibold leading-tight">App Store</div>
        </div>
      </a>
      <div
        className="inline-flex items-center gap-3 bg-black/50 text-white/70 px-6 py-3 rounded-xl cursor-default relative"
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
          <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 1.33a1 1 0 010 1.724l-2.302 1.33-2.535-2.535 2.535-2.849zM5.864 3.457L16.8 9.79l-2.302 2.302L5.864 3.457z" />
        </svg>
        <div className="text-left">
          <div className="text-[10px] leading-none">Muy pronto en</div>
          <div className="text-lg font-semibold leading-tight">
            Google Play
          </div>
        </div>
        <span className="absolute -top-2 -right-2 bg-freshkeep-primary text-freshkeep-text text-[10px] font-bold px-2 py-0.5 rounded-full">
          Pronto
        </span>
      </div>
    </div>
  );
}

const features = [
  {
    icon: "📦",
    title: "Inventario inteligente",
    description:
      "Trackea todos tus alimentos y recibe alertas antes de que venzan. Nunca más tires comida por olvidarla en la nevera.",
  },
  {
    icon: "🤖",
    title: "Recetas con IA",
    description:
      "Genera recetas personalizadas usando los ingredientes que ya tienes. Cocina rico sin desperdiciar nada.",
  },
  {
    icon: "📊",
    title: "Estadísticas",
    description:
      "Visualiza tu desperdicio, ahorro y nutrición. Entiende tus hábitos y mejora semana a semana.",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1 text-center md:text-left">
              <Image
                src="/title-logo.png"
                alt="FreshKeep"
                width={280}
                height={80}
                className="mx-auto md:mx-0 mb-6 w-[200px] md:w-[280px] h-auto"
                priority
              />
              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
                Reduce el desperdicio,{" "}
                <span className="text-freshkeep-primary">
                  cocina con lo que tienes
                </span>
              </h1>
              <p className="text-lg md:text-xl text-freshkeep-text/70 mb-8 max-w-lg mx-auto md:mx-0">
                Trackea tus alimentos, recibe alertas de vencimiento y genera
                recetas con IA. Todo en una app gratuita.
              </p>
              <div className="flex justify-center md:justify-start">
                <StoreButtons />
              </div>
            </div>
            <div className="flex-1 flex justify-center mt-8 md:mt-0">
              <div className="relative w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px]">
                <div className="absolute -inset-8 bg-freshkeep-primary/20 rounded-[3rem] blur-3xl" />
                <Image
                  src="/onboarding-1.png"
                  alt="FreshKeep App"
                  width={400}
                  height={800}
                  className="relative rounded-[2rem] shadow-2xl w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">
            Todo lo que necesitas para{" "}
            <span className="text-freshkeep-primary">cuidar tu comida</span>
          </h2>
          <p className="text-center text-freshkeep-text/60 mb-12 max-w-2xl mx-auto">
            FreshKeep te ayuda a reducir el desperdicio alimentario con
            herramientas inteligentes y fáciles de usar.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="glass p-8 hover:bg-white/25 transition-colors"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-freshkeep-text/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="glass-strong p-8 sm:p-10 md:p-16">
            <Image
              src="/icon.png"
              alt="FreshKeep icon"
              width={80}
              height={80}
              className="mx-auto mb-6 rounded-2xl w-[60px] sm:w-[80px] h-auto"
            />
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Descarga FreshKeep gratis
            </h2>
            <p className="text-freshkeep-text/70 mb-8 max-w-md mx-auto">
              Empieza a reducir el desperdicio alimentario hoy. Disponible en
              iOS. Muy pronto en Android.
            </p>
            <div className="flex justify-center">
              <StoreButtons />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-10 border-t border-freshkeep-text/10">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-freshkeep-text/50 text-sm">
            FreshKeep &copy; {new Date().getFullYear()}. Todos los derechos
            reservados.
          </p>
          <nav className="flex gap-6 text-sm">
            <Link
              href="/privacy"
              className="text-freshkeep-text/50 hover:text-freshkeep-text transition-colors"
            >
              Privacidad
            </Link>
            <Link
              href="/terms"
              className="text-freshkeep-text/50 hover:text-freshkeep-text transition-colors"
            >
              Términos
            </Link>
            <Link
              href="/faq"
              className="text-freshkeep-text/50 hover:text-freshkeep-text transition-colors"
            >
              FAQ
            </Link>
            <a
              href="mailto:victor.galvez56@gmail.com"
              className="text-freshkeep-text/50 hover:text-freshkeep-text transition-colors"
            >
              Contacto
            </a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
