"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Simbolo } from "../Logo";
import { TelaCobrar } from "./TelaCobrar";
import { TelaHistorico } from "./TelaHistorico";
import { TelaPainel } from "./TelaPainel";
import { useArmazem } from "@/lib/armazem";
import { armazemTransacoes } from "@/lib/transacoes";

const ABAS = [
  { id: "cobrar", rotulo: "Cobrar" },
  { id: "historico", rotulo: "Histórico" },
  { id: "painel", rotulo: "Painel" },
] as const;

type Aba = (typeof ABAS)[number]["id"];

export function Sandbox() {
  const [aba, setAba] = useState<Aba>("cobrar");
  const transacoes = useArmazem(armazemTransacoes);

  // Registra o service worker: é ele que faz o app abrir sem internet.
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch(() => {
      /* sem service worker o app continua funcionando, só não fica offline */
    });
  }, []);

  return (
    <div className="flex min-h-dvh flex-col bg-ink text-paper">
      {/* Faixa que não sai da tela em nenhum momento */}
      <p className="bg-amber px-4 py-2 text-center text-xs font-semibold tracking-wide text-ink">
        AMBIENTE DE TESTE — nenhum dinheiro é movimentado
      </p>

      <header className="flex items-center justify-between px-6 pt-6">
        <span className="inline-flex items-center gap-2.5">
          <Simbolo className="h-8 w-8" claro />
          <span className="font-display text-lg font-semibold">
            Velora <span className="text-paper/40">Sandbox</span>
          </span>
        </span>
        <Link
          href="/"
          className="text-sm text-paper/50 underline underline-offset-4"
        >
          Site
        </Link>
      </header>

      {/* pb extra: a barra de abas é sticky e pode cobrir o fim do conteúdo */}
      <main className="flex flex-1 flex-col pb-4">
        {aba === "cobrar" && <TelaCobrar transacoes={transacoes} />}
        {aba === "historico" && <TelaHistorico transacoes={transacoes} />}
        {aba === "painel" && <TelaPainel />}
      </main>

      <nav
        aria-label="Telas do aplicativo"
        className="sticky bottom-0 grid grid-cols-3 border-t border-paper/12 bg-ink pb-[env(safe-area-inset-bottom)]"
      >
        {ABAS.map(({ id, rotulo }) => (
          <button
            key={id}
            type="button"
            onClick={() => setAba(id)}
            aria-current={aba === id ? "page" : undefined}
            className={`py-4 text-sm font-medium transition-colors ${
              aba === id ? "text-velora" : "text-paper/45"
            }`}
          >
            {rotulo}
          </button>
        ))}
      </nav>
    </div>
  );
}
