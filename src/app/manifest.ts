import type { MetadataRoute } from "next";

/**
 * Manifesto do app. É ele que faz o navegador oferecer "Instalar",
 * e é dele que o PWABuilder parte para gerar o .apk.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Velora Sandbox — ambiente de teste",
    short_name: "Velora Sandbox",
    description:
      "Aplicativo de demonstração da Velora: cobranças de teste com QR Code e painel de monitoramento. Nenhum dinheiro é movimentado.",
    start_url: "/app",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0a1e28",
    theme_color: "#0a1e28",
    lang: "pt-BR",
    dir: "ltr",
    categories: ["business", "finance", "education"],
    icons: [
      {
        src: "/icone-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icone-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icone-mascara-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
