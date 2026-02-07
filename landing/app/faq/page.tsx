import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes — FreshKeep",
  description: "Resuelve tus dudas sobre FreshKeep. Preguntas frecuentes sobre la app.",
};

const faqSections = [
  {
    icon: "📱",
    title: "Sobre la app",
    questions: [
      {
        q: "¿Qué es FreshKeep?",
        a: "FreshKeep es una app gratuita para trackear tus alimentos, recibir alertas antes de que venzan y generar recetas con inteligencia artificial usando los ingredientes que ya tienes.",
      },
      {
        q: "¿Es gratis?",
        a: "Sí, FreshKeep es completamente gratuita. Puedes descargarla en App Store y Google Play sin costo.",
      },
      {
        q: "¿En qué dispositivos está disponible?",
        a: "FreshKeep está disponible para iOS (iPhone) y Android. Puedes descargarla desde App Store o Google Play.",
      },
    ],
  },
  {
    icon: "📦",
    title: "Inventario de alimentos",
    questions: [
      {
        q: "¿Cómo agrego alimentos?",
        a: "Puedes agregar alimentos manualmente ingresando nombre, categoría y fecha de vencimiento. También puedes escanear etiquetas de productos para un registro más rápido.",
      },
      {
        q: "¿Puedo escanear etiquetas?",
        a: "Sí, FreshKeep incluye un escáner que te permite fotografiar etiquetas de productos para registrar automáticamente la información del alimento.",
      },
      {
        q: "¿Cuántos alimentos puedo registrar?",
        a: "No hay límite. Puedes registrar todos los alimentos que necesites sin restricciones.",
      },
    ],
  },
  {
    icon: "🔔",
    title: "Alertas y notificaciones",
    questions: [
      {
        q: "¿Cómo funcionan las alertas de vencimiento?",
        a: "FreshKeep te envía notificaciones antes de que tus alimentos venzan, para que puedas consumirlos a tiempo o planificar recetas.",
      },
      {
        q: "¿Puedo personalizar las notificaciones?",
        a: "Sí, puedes configurar con cuántos días de anticipación quieres recibir las alertas desde la sección de ajustes.",
      },
      {
        q: "No recibo notificaciones, ¿qué hago?",
        a: "Verifica que los permisos de notificaciones estén habilitados en la configuración de tu dispositivo para FreshKeep.",
      },
    ],
  },
  {
    icon: "🤖",
    title: "Recetas con IA",
    questions: [
      {
        q: "¿Cómo genera FreshKeep las recetas?",
        a: "FreshKeep usa inteligencia artificial para analizar los ingredientes que tienes disponibles y generar recetas personalizadas que puedes preparar con lo que ya tienes.",
      },
      {
        q: "¿Las recetas son seguras para personas con alergias?",
        a: "Las recetas son sugerencias generadas por IA. Si tienes alergias o intolerancias alimentarias, siempre verifica los ingredientes antes de preparar cualquier receta.",
      },
      {
        q: "¿Necesito internet para generar recetas?",
        a: "Sí, la generación de recetas con IA requiere conexión a internet.",
      },
    ],
  },
  {
    icon: "🔒",
    title: "Privacidad y seguridad",
    questions: [
      {
        q: "¿Qué datos recopila FreshKeep?",
        a: "Recopilamos información básica del dispositivo y los datos de alimentos que registras. Puedes leer los detalles completos en nuestra Política de Privacidad.",
      },
      {
        q: "¿Puedo eliminar mi cuenta y datos?",
        a: "Sí, puedes eliminar tu cuenta y todos los datos asociados desde la sección de ajustes de la app en cualquier momento.",
      },
      {
        q: "¿Mis datos son compartidos con terceros?",
        a: "No vendemos tus datos. Solo compartimos información con proveedores de servicios necesarios para el funcionamiento de la app (como el servicio de IA para recetas).",
      },
    ],
  },
  {
    icon: "💬",
    title: "Soporte",
    questions: [
      {
        q: "Tengo un problema con la app, ¿qué hago?",
        a: "Intenta cerrar y volver a abrir la app. Si el problema persiste, asegúrate de tener la última versión instalada. Si continúa, escríbenos a victor.galvez56@gmail.com.",
      },
      {
        q: "¿Cómo puedo sugerir una mejora?",
        a: "Nos encanta recibir sugerencias. Escríbenos a victor.galvez56@gmail.com con tu idea y la evaluaremos para futuras actualizaciones.",
      },
    ],
  },
];

export default function FAQ() {
  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-freshkeep-text/60 hover:text-freshkeep-text mb-8 transition-colors"
        >
          &larr; Volver al inicio
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Preguntas Frecuentes
        </h1>
        <p className="text-freshkeep-text/50 mb-10">
          Encuentra respuestas a las dudas más comunes sobre FreshKeep.
        </p>

        <div className="space-y-8">
          {faqSections.map((section) => (
            <div key={section.title} className="glass-strong p-6 md:p-8">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                <span className="text-2xl">{section.icon}</span>
                {section.title}
              </h2>
              <div className="space-y-5">
                {section.questions.map((item) => (
                  <div key={item.q}>
                    <h3 className="font-bold text-freshkeep-text mb-1">
                      {item.q}
                    </h3>
                    <p className="text-freshkeep-text/70 leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="glass mt-10 p-6 text-center">
          <p className="text-freshkeep-text/70 mb-2">
            ¿No encontraste lo que buscabas?
          </p>
          <a
            href="mailto:victor.galvez56@gmail.com"
            className="text-freshkeep-primary font-semibold hover:underline"
          >
            Escríbenos a victor.galvez56@gmail.com
          </a>
        </div>
      </div>
    </main>
  );
}
