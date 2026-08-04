"use client";

import {
  armazemTransacoes,
  formatarBRL,
  type Transacao,
} from "@/lib/transacoes";

export function TelaHistorico({ transacoes }: { transacoes: Transacao[] }) {
  const total = transacoes.reduce((soma, t) => soma + t.centavos, 0);
  const tempoMedio =
    transacoes.length > 0
      ? transacoes.reduce((soma, t) => soma + t.duracaoMs, 0) /
        transacoes.length /
        1000
      : 0;

  if (transacoes.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        <div
          aria-hidden
          className="grid h-16 w-16 place-items-center rounded-2xl border border-dashed border-paper/25"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7 text-paper/30">
            <path
              d="M4 6h16M4 12h16M4 18h10"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <h2 className="mt-6 font-display text-xl font-semibold text-paper">
          Nenhuma cobrança ainda
        </h2>
        <p className="mt-3 max-w-xs text-paper/50">
          Faça uma cobrança de teste na aba Cobrar e ela aparece aqui, com o
          tempo que levou para ser confirmada.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 px-6 py-8">
      <div className="grid grid-cols-2 gap-3">
        <Resumo rotulo="Total simulado" valor={formatarBRL(total)} />
        <Resumo
          rotulo="Tempo médio"
          valor={`${tempoMedio.toFixed(1).replace(".", ",")} s`}
        />
      </div>

      <div className="mt-8 flex items-baseline justify-between">
        <h2 className="font-display text-lg font-semibold text-paper">
          Cobranças
        </h2>
        <button
          type="button"
          onClick={() => armazemTransacoes.gravar([])}
          className="text-sm text-paper/50 underline underline-offset-4"
        >
          Limpar
        </button>
      </div>

      <ul className="mt-4 space-y-2.5">
        {transacoes.map((t) => (
          <li
            key={`${t.id}-${t.em}`}
            className="flex items-center justify-between gap-4 rounded-2xl bg-paper/6 px-5 py-4"
          >
            <div className="min-w-0">
              <p className="tabular font-display font-semibold text-paper">
                {formatarBRL(t.centavos)}
              </p>
              <p className="truncate font-mono text-xs text-paper/40">{t.id}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-sm text-velora">Aprovada</p>
              <p className="tabular font-mono text-xs text-paper/40">
                {new Date(t.em).toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Resumo({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className="rounded-2xl bg-paper/6 p-5">
      <p className="etiqueta text-paper/40">{rotulo}</p>
      <p className="tabular mt-2 font-display text-xl font-semibold text-paper">
        {valor}
      </p>
    </div>
  );
}
