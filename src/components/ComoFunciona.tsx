import { Secao } from "./Secao";
import { Simulador } from "./Simulador";
import { analogia, comVelora, passos, semVelora } from "@/lib/conteudo";

export function ComoFunciona() {
  return (
    <Secao
      id="como-funciona"
      etiqueta="Como funciona"
      titulo="Um pagamento inteiro, do clique ao aviso na loja"
      intro="São quatro passos, e o cliente só percebe dois deles. O resto acontece sozinho, no tempo de uma respiração."
    >
      {/* A analogia vem antes de qualquer explicação técnica */}
      <div className="rounded-3xl bg-ink p-8 text-paper sm:p-12">
        <h3 className="max-w-[24ch] font-display text-2xl font-semibold sm:text-3xl">
          {analogia.pergunta}
        </h3>
        <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-paper/75">
          {analogia.resposta}
        </p>
      </div>

      {/* Quatro passos: aqui a numeração significa ordem de verdade */}
      <ol className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2">
        {passos.map((passo, i) => (
          <li key={passo.titulo} className="bg-paper p-8">
            <span className="tabular font-mono text-sm text-velora-dark">
              Passo {i + 1}
            </span>
            <h3 className="mt-3 font-display text-xl font-semibold text-balance">
              {passo.titulo}
            </h3>
            <p className="mt-3 leading-relaxed text-ink-70">{passo.texto}</p>
          </li>
        ))}
      </ol>

      {/* O contraste que faz o valor aparecer para quem não é da área */}
      <div className="mt-16 grid gap-6 md:grid-cols-2">
        <Lista
          titulo="Recebendo por Pix na mão"
          rotulo="Sem a Velora"
          itens={semVelora}
          tom="ruim"
        />
        <Lista
          titulo="Recebendo pela Velora"
          rotulo="Com a Velora"
          itens={comVelora}
          tom="bom"
        />
      </div>

      <div className="mt-16">
        <h3 className="font-display text-2xl font-semibold">
          Experimente agora
        </h3>
        <p className="mt-3 max-w-[58ch] text-ink-70">
          A melhor forma de entender é ver acontecer. Gere uma cobrança de
          mentira e acompanhe o pagamento sendo confirmado.
        </p>
        <div className="mt-8">
          <Simulador />
        </div>
      </div>
    </Secao>
  );
}

function Lista({
  titulo,
  rotulo,
  itens,
  tom,
}: {
  titulo: string;
  rotulo: string;
  itens: readonly string[];
  tom: "bom" | "ruim";
}) {
  const bom = tom === "bom";
  return (
    <div
      className={`rounded-3xl border p-8 ${
        bom ? "border-velora/35 bg-velora/6" : "border-line bg-paper"
      }`}
    >
      <p className={`etiqueta ${bom ? "text-velora-dark" : "text-ink-40"}`}>
        {rotulo}
      </p>
      <h3 className="mt-4 font-display text-xl font-semibold">{titulo}</h3>
      <ul className="mt-6 space-y-3.5">
        {itens.map((item) => (
          <li key={item} className="flex gap-3 text-ink-70">
            <span
              aria-hidden
              className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${
                bom ? "bg-velora" : "bg-ink-40"
              }`}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
