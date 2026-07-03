import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import ClientBody from "./[locale]/ClientBody";

// Configuración de las fuentes de Google
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});


export const metadata: Metadata = {
  title: "Markvera - Desarrollo de Software a Medida",
  description: "Expertos en el desarrollo de software a medida. Nuestro equipo está dedicado a transformar tus ideas en soluciones digitales eficientes y personalizadas.",
}; 


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`dark ${plusJakartaSans.variable} ${inter.variable}`}
    >
      <head>
        {/* Aquí puedes añadir etiquetas adicionales si las necesitas */}
      </head>
      <body
        suppressHydrationWarning
        className="antialiased font-body bg-[#0b0f12] text-slate-100 selection:bg-[#cdef24] selection:text-[#0b0f12]"
      >
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}