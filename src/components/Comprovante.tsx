import { Simbolo } from "./Logo";

export type DadosComprovante = {
  valor: string;
  para: string;
  de: string;
  quando: string;
  id: string;
  duracao: string;
};

/**
 * O comprovante de Pix — a peça que dá identidade ao site.
 * Aparece no topo da página como resultado pronto e é o mesmo objeto
 * que o simulador produz quando o visitante testa uma cobrança.
 */
export function Comprovante({
  dados,
  className = "",
  fundo = "var(--color-surface)",
}: {
  dados: DadosComprovante;
  className?: string;
  /** Cor do fundo atrás do cartão — é ela que o picote precisa vestir. */
  fundo?: string;
}) {
  return (
    <figure
      style={{ color: fundo }}
      className={`picotado w-full max-w-sm bg-paper shadow-[0_18px_50px_-20px_rgba(10,30,40,0.55)] ${className}`}
    >
      <div className="px-7 py-8 text-ink">
        <div className="flex items-center justify-between">
          <Simbolo className="h-7 w-7" />
          <span className="etiqueta text-velora-dark">Pagamento aprovado</span>
        </div>

        <p className="etiqueta mt-7 text-ink-40">Valor</p>
        <p className="tabular mt-1.5 font-display text-4xl font-semibold tracking-[-0.03em]">
          {dados.valor}
        </p>

        <dl className="mt-7 space-y-3 border-t border-line pt-5 text-sm">
          <Linha rotulo="Para" valor={dados.para} />
          <Linha rotulo="De" valor={dados.de} />
          <Linha rotulo="Quando" valor={dados.quando} mono />
          <Linha rotulo="Identificador" valor={dados.id} mono />
        </dl>

        <p className="mt-6 flex items-center gap-2 border-t border-line pt-5 text-sm text-ink-70">
          <span
            className="pulso inline-block h-2 w-2 shrink-0 rounded-full bg-velora"
            aria-hidden
          />
          Confirmado em{" "}
          <span className="tabular font-mono font-medium text-ink">
            {dados.duracao}
          </span>
        </p>
      </div>
    </figure>
  );
}

function Linha({
  rotulo,
  valor,
  mono = false,
}: {
  rotulo: string;
  valor: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="shrink-0 text-ink-40">{rotulo}</dt>
      <dd
        className={`text-right font-medium ${mono ? "tabular font-mono text-[0.8rem]" : ""}`}
      >
        {valor}
      </dd>
    </div>
  );
}
