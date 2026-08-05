"use client";

import { useEffect, useState } from "react";

type Leitura = { pixPorMin: number; latencia: number; temperatura: number };

const INICIAL: Leitura = { pixPorMin: 1284, latencia: 240, temperatura: 38 };

/**
 * Painel de saúde da plataforma. Os três estados e os limites são os
 * mesmos usados no monitoramento real.
 */
export function TelaPainel() {
  const [leitura, setLeitura] = useState<Leitura>(INICIAL);
  const [forcado, setForcado] = useState<null | "atencao" | "critico">(null);

  useEffect(() => {
    if (forcado) return;
    const id = window.setInterval(() => {
      setLeitura((atual) => ({
        pixPorMin: oscilar(atual.pixPorMin, 60, 900, 1600),
        latencia: oscilar(atual.latencia, 40, 160, 460),
        temperatura: oscilar(atual.temperatura, 1, 34, 41),
      }));
    }, 2000);
    return () => window.clearInterval(id);
  }, [forcado]);

  const mostrada: Leitura =
    forcado === "critico"
      ? { pixPorMin: 180, latencia: 1980, temperatura: 53 }
      : forcado === "atencao"
        ? { pixPorMin: 720, latencia: 890, temperatura: 44 }
        : leitura;

  const estado = avaliar(mostrada);

  return (
    <div className="flex-1 px-6 py-8">
      <div className={`rounded-3xl border p-6 ${ESTADOS[estado].borda}`}>
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className={`h-3.5 w-3.5 rounded-full ${ESTADOS[estado].ponto} ${
              estado === "normal" ? "pulso" : ""
            }`}
          />
          <p className={`font-display text-lg font-semibold ${ESTADOS[estado].texto}`}>
            {ESTADOS[estado].titulo}
          </p>
        </div>
        <p className="mt-3 text-sm text-paper/60">{ESTADOS[estado].acao}</p>
      </div>

      {/* O mesmo LCD 16x2 do circuito */}
      <div className="mt-6 rounded-2xl bg-[#0d3a2b] p-5 font-mono text-[#7dffc4]">
        <p className="tabular text-sm tracking-[0.1em]">
          PIX/MIN {String(mostrada.pixPorMin).padStart(5, " ")}
        </p>
        <p className="tabular mt-1.5 text-sm tracking-[0.1em]">
          RESP {mostrada.latencia}ms {mostrada.temperatura}C
        </p>
      </div>

      <dl className="mt-6 grid grid-cols-3 gap-3">
        <Metrica rotulo="Pix/min" valor={String(mostrada.pixPorMin)} />
        <Metrica rotulo="Resposta" valor={`${mostrada.latencia} ms`} />
        <Metrica rotulo="Servidor" valor={`${mostrada.temperatura} °C`} />
      </dl>

      <h2 className="mt-9 font-display text-lg font-semibold text-paper">
        Force um cenário
      </h2>
      <p className="mt-2 text-sm text-paper/50">
        Force a plataforma a piorar para ver como o alarme reage.
      </p>
      <div className="mt-4 grid grid-cols-3 gap-2.5">
        <Botao ativo={forcado === null} onClick={() => setForcado(null)}>
          Normal
        </Botao>
        <Botao
          ativo={forcado === "atencao"}
          onClick={() => setForcado("atencao")}
        >
          Atenção
        </Botao>
        <Botao
          ativo={forcado === "critico"}
          onClick={() => setForcado("critico")}
        >
          Crítico
        </Botao>
      </div>

      <p className="mt-8 rounded-2xl bg-paper/6 p-5 text-sm leading-relaxed text-paper/60">
        Na sala de operação existe um painel igual a este, só que na parede e
        com alarme sonoro — para ninguém depender de estar olhando uma tela às
        três da manhã.
      </p>
    </div>
  );
}

const ESTADOS = {
  normal: {
    titulo: "Tudo normal",
    acao: "Resposta dentro do esperado e servidor na temperatura certa.",
    ponto: "bg-velora",
    texto: "text-velora",
    borda: "border-velora/40",
  },
  atencao: {
    titulo: "Atenção",
    acao: "Está devagar ou esquentando. O plantonista confere antes de virar problema.",
    ponto: "bg-amber",
    texto: "text-amber",
    borda: "border-amber/40",
  },
  critico: {
    titulo: "Crítico",
    acao: "Alarme disparado. O plantão é acionado na hora.",
    ponto: "bg-alert",
    texto: "text-alert",
    borda: "border-alert/50",
  },
} as const;

/* Os mesmos limites do painel_velora.ino */
function avaliar({ latencia, temperatura }: Leitura) {
  if (latencia >= 1500 || temperatura >= 50) return "critico" as const;
  if (latencia >= 500 || temperatura >= 40) return "atencao" as const;
  return "normal" as const;
}

function oscilar(atual: number, passo: number, min: number, max: number) {
  const proximo = atual + Math.round((Math.random() - 0.5) * 2 * passo);
  return Math.max(min, Math.min(max, proximo));
}

function Metrica({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className="rounded-2xl bg-paper/6 p-4">
      <dt className="etiqueta text-paper/40">{rotulo}</dt>
      <dd className="tabular mt-2 font-mono text-base text-paper">{valor}</dd>
    </div>
  );
}

function Botao({
  children,
  ativo,
  onClick,
}: {
  children: React.ReactNode;
  ativo: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={ativo}
      className={`rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
        ativo ? "bg-paper text-ink" : "bg-paper/8 text-paper/70"
      }`}
    >
      {children}
    </button>
  );
}
