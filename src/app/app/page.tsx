import type { Metadata, Viewport } from "next";
import { Sandbox } from "@/components/app/Sandbox";

export const metadata: Metadata = {
  title: "Velora Sandbox — ambiente de teste",
  description:
    "Aplicativo de demonstração da Velora: faça cobranças de teste, veja o QR nascer e acompanhe o painel de monitoramento. Nenhum dinheiro é movimentado.",
};

export const viewport: Viewport = {
  themeColor: "#0a1e28",
  // O app ocupa a tela inteira quando instalado
  viewportFit: "cover",
};

export default function AppPage() {
  return <Sandbox />;
}
