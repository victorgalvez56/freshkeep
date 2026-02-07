import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Términos y Condiciones — FreshKeep",
  description: "Términos y condiciones de uso de FreshKeep.",
};

export default function TermsAndConditions() {
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
            Términos y Condiciones
          </h1>
          <p className="text-freshkeep-text/50 mb-8">
            Última actualización: 6 de febrero de 2026
          </p>

          <div className="space-y-8 text-freshkeep-text/80 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-freshkeep-text mb-3">
                1. Aceptación de los términos
              </h2>
              <p>
                Al descargar, instalar o usar la aplicación FreshKeep, aceptas
                estos términos y condiciones. Si no estás de acuerdo, no
                utilices la aplicación.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-freshkeep-text mb-3">
                2. Descripción del servicio
              </h2>
              <p className="mb-3">
                FreshKeep es una aplicación de gestión de alimentos que permite:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Registrar y trackear alimentos con fechas de vencimiento.</li>
                <li>Recibir alertas y notificaciones antes de que tus alimentos venzan.</li>
                <li>Generar recetas personalizadas con inteligencia artificial basadas en tus ingredientes disponibles.</li>
                <li>Visualizar estadísticas de desperdicio, ahorro y nutrición.</li>
                <li>Escanear etiquetas de productos para registro rápido.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-freshkeep-text mb-3">
                3. Registro y cuenta de usuario
              </h2>
              <p className="mb-3">
                <strong>3.1</strong> Para usar ciertas funciones, puede ser
                necesario crear una cuenta.
              </p>
              <p className="mb-3">
                <strong>3.2</strong> Eres responsable de mantener la
                confidencialidad de tu contraseña y de todas las actividades que
                ocurran bajo tu cuenta.
              </p>
              <p>
                <strong>3.3</strong> No debes compartir tu cuenta con terceros.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-freshkeep-text mb-3">
                4. Uso aceptable
              </h2>
              <p className="mb-3">
                <strong>4.1</strong> La aplicación es para uso personal y no
                comercial.
              </p>
              <p className="mb-3">
                <strong>4.2</strong> Queda prohibido:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Usar la app para fines ilegales.</li>
                <li>Intentar acceder sin autorización a los sistemas de FreshKeep.</li>
                <li>Distribuir malware o contenido dañino a través de la app.</li>
                <li>Recopilar datos de otros usuarios sin consentimiento.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-freshkeep-text mb-3">
                5. Recetas generadas por IA
              </h2>
              <p className="mb-3">
                <strong>5.1</strong> Las recetas generadas por inteligencia
                artificial son sugerencias automatizadas basadas en los
                ingredientes que registras.
              </p>
              <p className="mb-3">
                <strong>5.2</strong> FreshKeep no garantiza la exactitud
                nutricional, la seguridad alimentaria ni la idoneidad de las
                recetas para condiciones médicas específicas, alergias o
                intolerancias.
              </p>
              <p>
                <strong>5.3</strong> Es responsabilidad del usuario verificar
                que los ingredientes y preparaciones sean seguros para su
                consumo, especialmente en caso de alergias alimentarias.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-freshkeep-text mb-3">
                6. Alertas y notificaciones
              </h2>
              <p className="mb-3">
                <strong>6.1</strong> FreshKeep envía notificaciones sobre fechas
                de vencimiento como herramienta de ayuda.
              </p>
              <p>
                <strong>6.2</strong> No garantizamos la entrega puntual de todas
                las notificaciones. El usuario es el responsable final de
                verificar el estado de sus alimentos antes de consumirlos.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-freshkeep-text mb-3">
                7. Propiedad intelectual
              </h2>
              <p>
                Todo el contenido de FreshKeep, incluyendo diseño, código,
                gráficos, logos y texto, es propiedad de FreshKeep y está
                protegido por leyes de propiedad intelectual.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-freshkeep-text mb-3">
                8. Privacidad y protección de datos
              </h2>
              <p>
                El tratamiento de tus datos personales se rige por nuestra{" "}
                <Link
                  href="/privacy"
                  className="text-freshkeep-primary font-semibold hover:underline"
                >
                  Política de Privacidad
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-freshkeep-text mb-3">
                9. Limitación de responsabilidad
              </h2>
              <p className="mb-3">
                <strong>9.1</strong> FreshKeep se proporciona &quot;tal cual&quot;,
                sin garantías de ningún tipo.
              </p>
              <p className="mb-3">
                <strong>9.2</strong> No garantizamos que el servicio sea
                ininterrumpido o libre de errores.
              </p>
              <p>
                <strong>9.3</strong> FreshKeep no se hace responsable por
                decisiones tomadas basándose en la información proporcionada por
                la app, incluyendo el consumo de alimentos vencidos o recetas
                generadas por IA.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-freshkeep-text mb-3">
                10. Modificaciones del servicio
              </h2>
              <p>
                Nos reservamos el derecho de modificar, suspender o descontinuar
                cualquier función de la aplicación en cualquier momento, con o
                sin previo aviso.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-freshkeep-text mb-3">
                11. Terminación de cuenta
              </h2>
              <p className="mb-3">
                <strong>11.1</strong> Puedes eliminar tu cuenta en cualquier
                momento desde la configuración de la app.
              </p>
              <p>
                <strong>11.2</strong> Nos reservamos el derecho de suspender o
                eliminar cuentas que violen estos términos.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-freshkeep-text mb-3">
                12. Ley aplicable
              </h2>
              <p>
                Estos términos se rigen por las leyes de la República del Perú.
                Cualquier disputa será resuelta en los tribunales de Lima, Perú.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-freshkeep-text mb-3">
                13. Cambios en los términos
              </h2>
              <p>
                Podemos actualizar estos términos periódicamente. El uso
                continuado de la app después de los cambios constituye la
                aceptación de los nuevos términos.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-freshkeep-text mb-3">
                14. Contacto
              </h2>
              <p>
                Para preguntas sobre estos términos, contáctanos en:{" "}
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
