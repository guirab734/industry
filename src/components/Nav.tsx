"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { navegacao } from "@/lib/conteudo";

export function Nav() {
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);
  const [ativo, setAtivo] = useState<string>(navegacao[0].id);

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 24);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  // Marca no menu a seção que está na tela.
  useEffect(() => {
    const observador = new IntersectionObserver(
      (entradas) => {
        const visivel = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visivel) setAtivo(visivel.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    navegacao.forEach(({ id }) => {
      const alvo = document.getElementById(id);
      if (alvo) observador.observe(alvo);
    });
    return () => observador.disconnect();
  }, []);

  // No topo a barra flutua sobre o hero escuro; a partir daí ela vira clara.
  const sobreEscuro = !rolou && !aberto;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        sobreEscuro
          ? "border-b border-transparent"
          : aberto
            ? "border-b border-line bg-surface"
            : "border-b border-line bg-surface/85 backdrop-blur-md"
      }`}
    >
      <nav
        aria-label="Navegação principal"
        className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        {/* Sobre o hero escuro a marca precisa da versão clara */}
        <a href="#inicio" aria-label="Velora, ir para o início">
          <Logo claro={sobreEscuro} />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navegacao.map(({ id, rotulo }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={ativo === id ? "location" : undefined}
                className={`rounded-full px-3.5 py-2 text-sm transition-colors ${
                  ativo === id
                    ? sobreEscuro
                      ? "bg-paper/15 text-paper"
                      : "bg-ink text-paper"
                    : sobreEscuro
                      ? "text-paper/60 hover:text-paper"
                      : "text-ink-70 hover:text-ink"
                }`}
              >
                {rotulo}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contato"
          className="hidden rounded-full bg-velora px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-velora-dark md:inline-block"
        >
          Falar com a gente
        </a>

        <button
          type="button"
          onClick={() => setAberto((v) => !v)}
          aria-expanded={aberto}
          aria-controls="menu-mobile"
          className={`flex h-11 w-11 items-center justify-center rounded-full border md:hidden ${
            sobreEscuro
              ? "border-paper/25 text-paper"
              : "border-line text-ink"
          }`}
        >
          <span className="sr-only">{aberto ? "Fechar menu" : "Abrir menu"}</span>
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
            {aberto ? (
              <path
                d="m6 6 12 12M18 6 6 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 8h16M4 16h16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </nav>

      {aberto && (
        <div
          id="menu-mobile"
          className="border-t border-line bg-surface px-5 pb-6 pt-2 md:hidden"
        >
          <ul className="flex flex-col">
            {navegacao.map(({ id, rotulo }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setAberto(false)}
                  className="block border-b border-line py-3.5 text-lg text-ink"
                >
                  {rotulo}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contato"
            onClick={() => setAberto(false)}
            className="mt-5 block rounded-full bg-velora px-5 py-3 text-center font-medium text-paper"
          >
            Falar com a gente
          </a>
        </div>
      )}
    </header>
  );
}
