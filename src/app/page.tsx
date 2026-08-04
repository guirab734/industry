import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { ComoFunciona } from "@/components/ComoFunciona";
import { Empresa } from "@/components/Empresa";
import { Seguranca } from "@/components/Seguranca";
import { Aplicativo } from "@/components/Aplicativo";
import { Avaliacoes } from "@/components/Avaliacoes";
import { Contato } from "@/components/Contato";
import { Rodape } from "@/components/Rodape";

export default function Home() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-6 focus:py-3 focus:text-paper"
      >
        Pular para o conteúdo
      </a>
      <Nav />
      <main id="conteudo">
        <Hero />
        <ComoFunciona />
        <Empresa />
        <Seguranca />
        <Aplicativo />
        <Avaliacoes />
        <Contato />
      </main>
      <Rodape />
    </>
  );
}
