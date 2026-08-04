import { Secao } from "./Secao";
import { prototipo, seguranca } from "@/lib/conteudo";

const CORES = {
  verde: { bg: "bg-velora", texto: "text-velora", borda: "border-velora/40" },
  amarelo: { bg: "bg-amber", texto: "text-amber", borda: "border-amber/40" },
  vermelho: { bg: "bg-alert", texto: "text-alert", borda: "border-alert/40" },
} as const;

export function Seguranca() {
  return (
    <Secao
      id="seguranca"
      etiqueta="Segurança e monitoramento"
      titulo="O que a Velora faz para o dinheiro chegar inteiro"
      intro="Duas coisas mantêm um meio de pagamento de pé: impedir que a fraude passe e não sair do ar. A segunda é a que quase ninguém conta, e é onde está o nosso protótipo."
      escura
    >
      {/* Segurança em linguagem de gente */}
      <ul className="grid gap-px overflow-hidden rounded-3xl border border-paper/12 bg-paper/12 sm:grid-cols-2">
        {seguranca.map((item) => (
          <li key={item.titulo} className="bg-ink p-7">
            <h3 className="font-display text-lg font-semibold text-paper">
              {item.titulo}
            </h3>
            <p className="mt-3 leading-relaxed text-paper/70">{item.texto}</p>
          </li>
        ))}
      </ul>

      {/* Protótipo */}
      <div className="mt-24">
        <p className="etiqueta text-velora">O protótipo</p>
        <h3 className="mt-5 max-w-[20ch] font-display text-titulo font-semibold text-balance">
          Um alarme na parede para quando a plataforma tossir
        </h3>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="space-y-6 text-lg leading-relaxed text-paper/75">
            <p>
              <span className="font-medium text-paper">O problema. </span>
              {prototipo.problema}
            </p>
            <p>
              <span className="font-medium text-paper">A solução. </span>
              {prototipo.solucao}
            </p>
          </div>

          <PainelFisico />
        </div>

        {/* Componentes */}
        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h4 className="font-display text-xl font-semibold text-paper">
              O que tem dentro
            </h4>
            <ul className="mt-6 divide-y divide-paper/12 border-y border-paper/12">
              {prototipo.componentes.map((c) => (
                <li
                  key={c.peca}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3.5"
                >
                  <span className="font-mono text-sm text-paper">{c.peca}</span>
                  <span className="text-sm text-paper/60">{c.papel}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xl font-semibold text-paper">
              O que cada cor quer dizer
            </h4>
            <ul className="mt-6 space-y-3">
              {prototipo.estados.map((estado) => {
                const cor = CORES[estado.cor];
                return (
                  <li
                    key={estado.titulo}
                    className={`rounded-2xl border ${cor.borda} bg-paper/4 p-5`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        aria-hidden
                        className={`h-3 w-3 shrink-0 rounded-full ${cor.bg}`}
                      />
                      <span className={`font-display font-semibold ${cor.texto}`}>
                        {estado.titulo}
                      </span>
                    </div>
                    <p className="mt-2.5 text-sm text-paper/70">
                      {estado.criterio}
                    </p>
                    <p className="mt-1.5 text-sm text-paper/50">{estado.acao}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Benefícios */}
        <h4 className="mt-20 font-display text-xl font-semibold text-paper">
          O que a gente ganha com isso
        </h4>
        <ul className="mt-6 grid gap-px overflow-hidden rounded-3xl border border-paper/12 bg-paper/12 sm:grid-cols-2 lg:grid-cols-3">
          {prototipo.beneficios.map((b) => (
            <li key={b.beneficio} className="bg-ink p-6">
              <p className="font-medium text-paper">{b.beneficio}</p>
              <p className="tabular mt-2 font-mono text-sm text-velora">
                {b.numero}
              </p>
            </li>
          ))}
        </ul>

        {/* Acompanhamento */}
        <h4 className="mt-20 font-display text-xl font-semibold text-paper">
          Como acompanhamos depois de instalado
        </h4>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {prototipo.monitoramento.map((linha) => (
            <li
              key={linha}
              className="flex gap-3 rounded-2xl border border-paper/12 p-5 text-paper/75"
            >
              <span
                aria-hidden
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-velora"
              />
              {linha}
            </li>
          ))}
        </ul>
      </div>
    </Secao>
  );
}

/** Reprodução do painel: o display e as três luzes, como ficam na parede. */
function PainelFisico() {
  return (
    <div className="rounded-3xl border border-paper/15 bg-paper/4 p-7">
      <p className="etiqueta text-paper/40">Painel de operação</p>

      {/* Display LCD 16×2 */}
      <div className="mt-5 rounded-xl bg-[#0d3a2b] p-5 font-mono text-[#7dffc4] shadow-inner">
        <p className="tabular text-sm tracking-[0.12em]">PIX/MIN 1.284</p>
        <p className="tabular mt-1.5 text-sm tracking-[0.12em]">
          RESP 240ms 38C
        </p>
      </div>

      {/* As três luzes */}
      <div className="mt-6 flex items-center justify-around">
        {(["verde", "amarelo", "vermelho"] as const).map((cor) => (
          <div key={cor} className="flex flex-col items-center gap-2.5">
            <span
              aria-hidden
              className={`h-7 w-7 rounded-full ${CORES[cor].bg} ${
                cor === "verde"
                  ? "pulso shadow-[0_0_22px_var(--color-velora)]"
                  : "opacity-20"
              }`}
            />
            <span className="font-mono text-[0.65rem] uppercase tracking-wider text-paper/50">
              {cor}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-6 border-t border-paper/12 pt-5 text-sm text-paper/60">
        Verde aceso e alarme calado: a plataforma está respondendo dentro do
        esperado neste instante.
      </p>
    </div>
  );
}
