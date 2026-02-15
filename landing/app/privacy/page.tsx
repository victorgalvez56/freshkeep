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
              <p className="mb-3">
                FreshKeep utiliza inteligencia artificial para dos funciones
                principales: escaneo de etiquetas y generacion de recetas. Estos
                datos se procesan a traves de nuestro servidor y se envian a
                OpenAI para su analisis. A continuacion detallamos que datos se
                envian en cada caso:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-3">
                <li>
                  <strong>Escaneo de etiquetas:</strong> cuando tomas una foto
                  de un producto, la imagen se envia a nuestro servidor y luego
                  a OpenAI (GPT-4o) para extraer nombre, fecha de vencimiento,
                  categoria y otros datos del producto. La imagen no se almacena
                  en nuestros servidores.
                </li>
                <li>
                  <strong>Generacion de recetas:</strong> cuando solicitas
                  recetas, se envia la lista de ingredientes de tu inventario
                  (nombre, cantidad, unidad y estado de vencimiento) a nuestro
                  servidor y luego a OpenAI (GPT-4o-mini) para generar
                  sugerencias. No se envian datos personales identificables.
                </li>
              </ul>
              <p className="mb-3">
                <strong>Consentimiento:</strong> antes de usar cualquier funcion
                de IA por primera vez, la app te mostrara un dialogo solicitando
                tu consentimiento explicito. Puedes revocar este consentimiento
                en cualquier momento desde los ajustes de la aplicacion.
              </p>
              <p>
                <strong>Proveedor de IA:</strong> actualmente utilizamos OpenAI
                como proveedor. Puedes consultar su politica de privacidad en{" "}
                <a
                  href="https://openai.com/privacy"
                  className="text-freshkeep-primary font-semibold hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  openai.com/privacy
                </a>
                . Los datos enviados a traves de la API no se utilizan para
                entrenar sus modelos.
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
