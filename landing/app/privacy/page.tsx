import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidad — FreshKeep",
  description: "Política de privacidad de FreshKeep. Conoce cómo protegemos tu información.",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-freshkeep-text/60 hover:text-freshkeep-text mb-8 transition-colors"
        >
          &larr; Volver al inicio
        </Link>

        <div className="glass-strong p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Política de Privacidad
          </h1>
          <p className="text-freshkeep-text/50 mb-8">
            Última actualización: 6 de febrero de 2026
          </p>

          <div className="space-y-8 text-freshkeep-text/80 leading-relaxed">
            <section>
              <p>
                En FreshKeep, nos comprometemos a proteger tu privacidad. Esta
                política describe cómo recopilamos, usamos y protegemos tu
                información personal cuando utilizas nuestra aplicación.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-freshkeep-text mb-3">
                1. Información que recopilamos
              </h2>
              <p className="mb-3">
                Podemos recopilar los siguientes tipos de información:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Información personal:</strong> nombre y correo
                  electrónico (si creas una cuenta).
                </li>
                <li>
                  <strong>Datos de alimentos:</strong> nombre, categoría, fecha
                  de vencimiento y cantidad de los productos que registras.
                </li>
                <li>
                  <strong>Datos del dispositivo:</strong> sistema operativo,
                  versión de la app y dirección IP.
                </li>
                <li>
                  <strong>Datos de uso:</strong> interacciones con la app,
                  funciones utilizadas y estadísticas de consumo.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-freshkeep-text mb-3">
                2. Cómo usamos tu información
              </h2>
              <p className="mb-3">Utilizamos tu información para:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Proveer los servicios de seguimiento de alimentos y alertas de
                  vencimiento.
                </li>
                <li>
                  Generar recetas personalizadas mediante inteligencia artificial
                  basadas en tus ingredientes disponibles.
                </li>
                <li>
                  Calcular estadísticas de desperdicio, ahorro y nutrición.
                </li>
                <li>Enviar notificaciones y recordatorios de vencimiento.</li>
                <li>Mejorar y optimizar la experiencia de la aplicación.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-freshkeep-text mb-3">
                3. Uso de inteligencia artificial
              </h2>
              <p>
                FreshKeep utiliza servicios de IA de terceros para generar
                recetas. Al usar esta función, los ingredientes que registras
                pueden ser enviados a proveedores de IA para procesar tu
                solicitud. No se envía información personal identificable, solo
                la lista de ingredientes necesaria para generar las recetas.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-freshkeep-text mb-3">
                4. Compartición de información
              </h2>
              <p className="mb-3">
                No vendemos ni compartimos tu información personal con terceros,
                excepto:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Con proveedores de servicios necesarios para el funcionamiento
                  de la app (hosting, IA, notificaciones).
                </li>
                <li>Cuando sea requerido por ley o autoridad competente.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-freshkeep-text mb-3">
                5. Seguridad de los datos
              </h2>
              <p>
                Implementamos medidas de seguridad razonables para proteger tu
                información. Sin embargo, ningún método de transmisión por
                internet es 100% seguro, por lo que no podemos garantizar
                seguridad absoluta.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-freshkeep-text mb-3">
                6. Tus derechos
              </h2>
              <p className="mb-3">Como usuario, tienes derecho a:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Acceder y actualizar tu información personal.</li>
                <li>Eliminar tu cuenta y todos los datos asociados.</li>
                <li>Controlar las notificaciones que recibes.</li>
                <li>Exportar tus datos de inventario.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-freshkeep-text mb-3">
                7. Retención de datos
              </h2>
              <p>
                Conservamos tu información solo durante el tiempo necesario para
                proporcionar nuestros servicios. Si eliminas tu cuenta, tus
                datos serán eliminados de nuestros servidores.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-freshkeep-text mb-3">
                8. Cambios en esta política
              </h2>
              <p>
                Podemos actualizar esta política periódicamente. Te
                notificaremos sobre cambios significativos a través de la
                aplicación.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-freshkeep-text mb-3">
                9. Contacto
              </h2>
              <p>
                Si tienes preguntas sobre esta política de privacidad, puedes
                contactarnos en:{" "}
                <a
                  href="mailto:victor.galvez56@gmail.com"
                  className="text-freshkeep-primary font-semibold hover:underline"
                >
                  victor.galvez56@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
