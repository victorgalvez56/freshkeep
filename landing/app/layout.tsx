import type { Metadata } from "next";
import { Playpen_Sans } from "next/font/google";
import "./globals.css";

const playpen = Playpen_Sans({
  subsets: ["latin"],
  variable: "--font-playpen",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FreshKeep — Reduce el desperdicio, cocina con lo que tienes",
  description:
    "Trackea tus alimentos, recibe alertas de vencimiento y genera recetas con IA usando lo que tienes en tu cocina. Descarga gratis en Play Store y App Store.",
  keywords: [
    "freshkeep",
    "food tracker",
    "desperdicio alimentario",
    "recetas con IA",
    "alimentos",
    "vencimiento",
  ],
  openGraph: {
    title: "FreshKeep — Reduce el desperdicio, cocina con lo que tienes",
    description:
      "Trackea tus alimentos, recibe alertas de vencimiento y genera recetas con IA.",
    type: "website",
    images: ["/icon.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={playpen.variable}>
      <body className="font-playpen text-freshkeep-text antialiased">
        {children}
      </body>
    </html>
  );
}
