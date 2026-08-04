"use client";

import { useEffect, useRef, useState } from "react";
import { Comprovante } from "./Comprovante";

type Etapa = "valor" | "cobranca" | "pago";

/**
 * Simulador de cobrança.
 *
 * É o site provando a tese em vez de descrevê-la: o visitante digita um
 * valor, vê a cobrança nascer e acompanha o pagamento sendo confirmado.
 * Nada sai do navegador — é uma demonstração, não uma cobrança real.
 */
export function Simulador() {
  const [etapa, setEtapa] = useState<Etapa>("valor");
  const [centavos, setCentavos] = useState(14890);
  const [copiado, setCopiado] = useState(false);
  const [duracao, setDuracao] = useState("0,0 s");
  const temporizadores = useRef<number[]>([]);

  useEffect(
    () => () => temporizadores.current.forEach((t) => window.clearTimeout(t)),
    [],
  );

  const valorFormatado = (centavos / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const codigo = gerarCodigo(centavos);

  function aoDigitar(bruto: string) {
    const digitos = bruto.replace(/\D/g, "").slice(0, 9);
    setCentavos(Number(digitos));
  }

  function gerarCobranca() {
    setCopiado(false);
    setEtapa("cobranca");
  }

  function simularPagamento() {
    const inicio = performance.now();
    const t = window.setTimeout(() => {
      const decorrido = (performance.now() - inicio) / 1000;
      setDuracao(`${decorrido.toFixed(1).replace(".", ",")} s`);
      setEtapa("pago");
    }, 900);
    temporizadores.current.push(t);
  }

  function recomecar() {
    setEtapa("valor");
    setCopiado(false);
  }

  async function copiar() {
    try {
      await navigator.clipboard.writeText(codigo);
      setCopiado(true);
      const t = window.setTimeout(() => setCopiado(false), 2200);
      temporizadores.current.push(t);
    } catch {
      setCopiado(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-paper">
      <div className="grid lg:grid-cols-[1.1fr_1fr]">
        {/* Lado do lojista */}
        <div className="border-b border-line p-8 sm:p-10 lg:border-b-0 lg:border-r">
          <p className="etiqueta text-ink-40">Você é a loja</p>
          <h3 className="mt-4 font-display text-2xl font-semibold">
            Faça uma cobrança de mentira
          </h3>
          <p className="mt-3 text-ink-70">
            Escolha um valor e acompanhe o que acontece. Nada é cobrado de
            ninguém — é uma demonstração que roda dentro do seu navegador.
          </p>

          <label
            htmlFor="valor-simulado"
            className="etiqueta mt-8 block text-ink-40"
          >
            Valor da venda
          </label>
          <div className="mt-3 flex items-center gap-3 rounded-2xl border border-line bg-surface px-5 py-4 focus-within:border-velora">
            <span className="font-mono text-lg text-ink-40">R$</span>
            <input
              id="valor-simulado"
              name="valor"
              inputMode="numeric"
              autoComplete="off"
              value={(centavos / 100).toFixed(2).replace(".", ",")}
              onChange={(e) => aoDigitar(e.target.value)}
              disabled={etapa !== "valor"}
              className="tabular w-full bg-transparent font-mono text-2xl font-medium text-ink outline-none disabled:opacity-55"
            />
          </div>

          {etapa === "valor" ? (
            <button
              type="button"
              onClick={gerarCobranca}
              disabled={centavos < 1}
              className="mt-6 w-full rounded-full bg-ink px-6 py-3.5 font-medium text-paper transition-colors hover:bg-ink-70 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Gerar cobrança
            </button>
          ) : (
            <button
              type="button"
              onClick={recomecar}
              className="mt-6 w-full rounded-full border border-line px-6 py-3.5 font-medium text-ink transition-colors hover:border-ink-40"
            >
              Começar de novo
            </button>
          )}

          <ol className="mt-9 space-y-3 border-t border-line pt-7 text-sm">
            <Marco ativa={etapa === "valor"} feita={etapa !== "valor"}>
              A loja pede o valor
            </Marco>
            <Marco
              ativa={etapa === "cobranca"}
              feita={etapa === "pago"}
            >
              A Velora gera o código
            </Marco>
            <Marco ativa={etapa === "pago"} feita={etapa === "pago"}>
              O pagamento é confirmado
            </Marco>
          </ol>
        </div>

        {/* Lado do cliente — escuro, porque aqui a cena é a tela do celular */}
        <div className="flex flex-col items-center justify-center bg-ink p-8 text-center text-paper sm:p-10">
          {etapa === "valor" && (
            <div className="max-w-xs text-paper/40">
              <QrPlaceholder />
              <p className="mt-6 text-sm">
                O código aparece aqui assim que a cobrança for criada.
              </p>
            </div>
          )}

          {etapa === "cobranca" && (
            <div className="surgir w-full max-w-xs">
              <p className="etiqueta text-velora">Você é o cliente</p>
              <div className="mt-5 inline-block rounded-2xl bg-paper p-4">
                <QrCode semente={centavos} />
              </div>
              <p className="tabular mt-5 font-display text-3xl font-semibold text-paper">
                {valorFormatado}
              </p>
              <p className="mt-2 text-sm text-paper/60">
                No app do banco, é aqui que o cliente aponta a câmera.
              </p>

              <button
                type="button"
                onClick={copiar}
                aria-live="polite"
                className="mt-5 w-full truncate rounded-xl border border-paper/20 px-4 py-3 font-mono text-xs text-paper/70 transition-colors hover:border-paper/50"
              >
                {copiado ? "Código copiado" : codigo}
              </button>

              <button
                type="button"
                onClick={simularPagamento}
                className="mt-4 w-full rounded-full bg-velora px-6 py-3.5 font-medium text-paper transition-colors hover:bg-velora-dark"
              >
                Simular o pagamento
              </button>
            </div>
          )}

          {etapa === "pago" && (
            <Comprovante
              className="surgir"
              fundo="var(--color-ink)"
              dados={{
                valor: valorFormatado,
                para: "Sua loja",
                de: "Cliente de teste",
                quando: agora(),
                id: codigo.slice(0, 16).toUpperCase(),
                duracao,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function Marco({
  children,
  ativa,
  feita,
}: {
  children: React.ReactNode;
  ativa: boolean;
  feita: boolean;
}) {
  return (
    <li className="flex items-center gap-3">
      <span
        aria-hidden
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[0.6rem] ${
          feita
            ? "border-velora bg-velora text-paper"
            : ativa
              ? "border-velora text-velora"
              : "border-line text-transparent"
        }`}
      >
        ✓
      </span>
      <span className={feita || ativa ? "text-ink" : "text-ink-40"}>
        {children}
      </span>
    </li>
  );
}

function QrPlaceholder() {
  return (
    <div
      aria-hidden
      className="mx-auto grid h-40 w-40 place-items-center rounded-2xl border border-dashed border-line"
    >
      <svg viewBox="0 0 24 24" className="h-9 w-9 opacity-45">
        <path
          d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 14h2v2h-2zM16 16h2v2h-2zM14 18h2v2h-2zM18 18h2v2h-2z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

/** QR ilustrativo: desenho determinístico a partir do valor, sem payload real. */
function QrCode({ semente }: { semente: number }) {
  const n = 21;
  const celulas: boolean[] = [];
  let x = (semente + 7919) * 2654435761;
  for (let i = 0; i < n * n; i++) {
    x = (x * 1103515245 + 12345) & 0x7fffffff;
    celulas.push((x >> 8) % 100 < 46);
  }

  const marcador = (linha: number, coluna: number) =>
    (linha < 7 && coluna < 7) ||
    (linha < 7 && coluna >= n - 7) ||
    (linha >= n - 7 && coluna < 7);

  return (
    <svg
      viewBox={`0 0 ${n} ${n}`}
      className="h-36 w-36"
      role="img"
      aria-label="Código QR ilustrativo da cobrança"
      shapeRendering="crispEdges"
    >
      <rect width={n} height={n} fill="white" />
      {celulas.map((preenchida, i) => {
        const linha = Math.floor(i / n);
        const coluna = i % n;
        if (marcador(linha, coluna) || !preenchida) return null;
        return (
          <rect key={i} x={coluna} y={linha} width="1" height="1" fill="#0a1e28" />
        );
      })}
      {[
        [0, 0],
        [0, n - 7],
        [n - 7, 0],
      ].map(([linha, coluna]) => (
        <g key={`${linha}-${coluna}`} fill="#0a1e28">
          <rect x={coluna} y={linha} width="7" height="7" />
          <rect x={coluna + 1} y={linha + 1} width="5" height="5" fill="white" />
          <rect x={coluna + 2} y={linha + 2} width="3" height="3" />
        </g>
      ))}
    </svg>
  );
}

function gerarCodigo(centavos: number) {
  const base = (centavos * 2654435761) % 1e12;
  return `00020126velora${base.toString(36)}5204000053039865802BR`;
}

function agora() {
  return new Date().toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}
