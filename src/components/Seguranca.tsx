import { Secao } from "./Secao";
import { monitoramento, seguranca } from "@/lib/conteudo";

export function Seguranca() {
  return (
    <Secao
      id="seguranca"
      etiqueta="Segurança"
      titulo="O que a Velora faz para o dinheiro chegar inteiro"
      intro="Duas coisas mantêm um meio de pagamento de pé: impedir que a fraude passe e não sair do ar."
      escura
    >
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

      {/* Monitoramento, em uma ideia só */}
      <div className="mt-16 grid gap-10 rounded-3xl border border-paper/12 p-8 sm:p-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h3 className="font-display text-2xl font-semibold text-paper text-balance">
            {monitoramento.titulo}
          </h3>
          <p className="mt-5 text-lg leading-relaxed text-paper/70">
            {monitoramento.texto}
          </p>
        </div>

        <ul className="space-y-4 lg:self-center">
          {monitoramento.pontos.map((ponto) => (
            <li key={ponto} className="flex gap-3.5 text-paper/80">
              <span
                aria-hidden
                className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-velora"
              />
              {ponto}
            </li>
          ))}
        </ul>
      </div>
    </Secao>
  );
}
