import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "IT360 - Soluciones Informáticas para Pymes y Profesionales",
  description: "Venta de equipos, soporte técnico y desarrollo de software a medida. Todo lo que tu negocio necesita en tecnología.",
  keywords: "informática, soporte técnico, desarrollo web, venta de equipos, pymes, tecnología",
  authors: [{ name: "IT360" }],
  openGraph: {
    title: "IT360 - Soluciones Informáticas Integrales",
    description: "Todo lo que tu negocio necesita en tecnología",
    type: "website",
    locale: "es_AR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
