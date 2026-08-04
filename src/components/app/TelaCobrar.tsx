"use client";

import { useRef, useState } from "react";
import { QrReal } from "../QrReal";
import { Simbolo } from "../Logo";
import {
  armazemTransacoes,
  conteudoQrTeste,
  formatarBRL,
  gerarIdTeste,
  type Transacao,
} from "@/lib/transacoes";

type Etapa = "valor" | "cobranca" | "pago";

export function TelaCobrar({ transacoes }: { transacoes: Transacao[] }) {
  const [etapa, setEtapa] = useState<Etapa>("valor");
  const [centavos, setCentavos] = useState(0);
  const [copiado, setCopiado] = useState(false);
  const [pagando, setPagando] = useState(false);
  const temporizadores = useRef<number[]>([]);

  const id = gerarIdTeste(centavos);
  // Tempo de confirmação derivado do valor: varia entre cobranças e é
  // sempre o mesmo para o mesmo valor, então a demonstração é repetível.
  const duracao = 700 + (centavos % 600);

  function digitar(tecla: string) {
    if (tecla === "apagar") {
      setCentavos((v) => Math.floor(v / 10));
      return;
    }
    if (tecla === "00") {
      setCentavos((v) => (v === 0 ? 0 : Math.min(v * 100, 99_999_999)));
      return;
    }
    setCentavos((v) => Math.min(v * 10 + Number(tecla), 99_999_999));
  }

  function simularPagamento() {
    setPagando(true);
    const t = window.setTimeout(() => {
      setPagando(false);
      setEtapa("pago");
      armazemTransacoes.gravar([
        {
          id,
          centavos,
          em: new Date().toISOString(),
          duracaoMs: duracao,
        },
        ...transacoes,
      ]);
    }, 1100);
    temporizadores.current.push(t);
  }

  async function copiar() {
    try {
      await navigator.clipboard.writeText(conteudoQrTeste(centavos, id));
      setCopiado(true);
      temporizadores.current.push(
        window.setTimeout(() => setCopiado(false), 2000),
      );
    } catch {
      setCopiado(false);
    }
  }

  function recomecar() {
    setEtapa("valor");
    setCentavos(0);
    setCopiado(false);
  }

  if (etapa === "pago") {
    return (
      <div className="surgir flex flex-1 flex-col items-center justify-center px-6 py-8">
        <div className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-paper p-7 text-ink">
          {/* Marca d'água: sai junto com o comprovante em qualquer print */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <span className="-rotate-24 text-4xl font-bold tracking-[0.25em] text-alert/12">
              SIMULAÇÃO
            </span>
          </span>

          <div className="relative">
            <div className="flex items-center justify-between">
              <Simbolo className="h-7 w-7" />
              <span className="etiqueta text-velora-dark">Aprovado</span>
            </div>

            <p className="etiqueta mt-7 text-ink-40">Valor simulado</p>
            <p className="tabular mt-1.5 font-display text-4xl font-semibold">
              {formatarBRL(centavos)}
            </p>

            <dl className="mt-7 space-y-3 border-t border-line pt-5 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-ink-40">Identificador</dt>
                <dd className="tabular font-mono text-xs">{id}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-40">Confirmado em</dt>
                <dd className="tabular font-mono text-xs">
                  {(duracao / 1000).toFixed(1).replace(".", ",")} s
                </dd>
              </div>
            </dl>

            <p className="mt-6 rounded-xl bg-alert/10 px-4 py-3 text-center text-xs text-alert">
              Comprovante de teste. Nenhum dinheiro foi movimentado.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={recomecar}
          className="mt-6 w-full max-w-sm rounded-full bg-velora px-6 py-4 font-medium text-paper"
        >
          Fazer outra cobrança
        </button>
      </div>
    );
  }

  if (etapa === "cobranca") {
    return (
      <div className="surgir flex flex-1 flex-col items-center px-6 py-8">
        <p className="etiqueta text-paper/40">Mostre para quem vai pagar</p>
        <div className="mt-5 rounded-3xl bg-paper p-5">
          <QrReal
            conteudo={conteudoQrTeste(centavos, id)}
            tamanho={196}
            rotulo="Código QR da cobrança de teste"
          />
        </div>

        <p className="tabular mt-6 font-display text-4xl font-semibold text-paper">
          {formatarBRL(centavos)}
        </p>
        <p className="mt-1.5 font-mono text-xs text-paper/40">{id}</p>

        <button
          type="button"
          onClick={copiar}
          aria-live="polite"
          className="mt-6 w-full max-w-sm rounded-xl border border-paper/20 px-4 py-3.5 text-sm text-paper/70"
        >
          {copiado ? "Copiado" : "Copiar código"}
        </button>

        <div className="mt-auto w-full max-w-sm space-y-3 pt-8">
          <button
            type="button"
            onClick={simularPagamento}
            disabled={pagando}
            className="w-full rounded-full bg-velora px-6 py-4 font-medium text-paper disabled:opacity-60"
          >
            {pagando ? "Confirmando…" : "Simular o pagamento"}
          </button>
          <button
            type="button"
            onClick={recomecar}
            className="w-full rounded-full border border-paper/20 px-6 py-4 font-medium text-paper/70"
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col px-6 py-8">
      <p className="etiqueta text-paper/40">Valor da venda</p>
      <p
        className={`tabular mt-3 font-display text-5xl font-semibold ${
          centavos === 0 ? "text-paper/25" : "text-paper"
        }`}
      >
        {formatarBRL(centavos)}
      </p>

      <div className="mt-auto grid grid-cols-3 gap-3 pt-8">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "00", "0", "apagar"].map(
          (tecla) => (
            <button
              key={tecla}
              type="button"
              onClick={() => digitar(tecla)}
              aria-label={tecla === "apagar" ? "Apagar último dígito" : tecla}
              className="rounded-2xl bg-paper/8 py-4 font-mono text-2xl text-paper transition-colors active:bg-paper/20"
            >
              {tecla === "apagar" ? "⌫" : tecla}
            </button>
          ),
        )}
      </div>

      <button
        type="button"
        onClick={() => setEtapa("cobranca")}
        disabled={centavos === 0}
        className="mt-4 w-full rounded-full bg-velora px-6 py-4 font-medium text-paper disabled:opacity-40"
      >
        Gerar cobrança
      </button>
    </div>
  );
}
