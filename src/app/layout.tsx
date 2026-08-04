import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  IBM_Plex_Mono,
  Instrument_Sans,
} from "next/font/google";
import "./globals.css";

/* Display: grotesca com personalidade, usada só em títulos */
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

/* Corpo: neutra e confortável em texto corrido */
const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

/* Dados: valores, códigos e o display do painel */
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Velora — receba por Pix sem conferir extrato",
  description:
    "A Velora é o caminho que o Pix percorre entre quem compra e quem vende: a cobrança nasce sozinha, o pagamento é reconhecido na hora e a loja é avisada no mesmo segundo.",
  openGraph: {
    title: "Velora — receba por Pix sem conferir extrato",
    description:
      "O dinheiro sai da conta dele e chega na sua antes de você piscar.",
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a1e28",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${bricolage.variable} ${instrument.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
