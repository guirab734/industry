import { Secao } from "./Secao";
import { Organograma } from "./Organograma";
import {
  inovacao,
  missao,
  notaOrganograma,
  objetivos,
  valores,
  visao,
} from "@/lib/conteudo";

export function Empresa() {
  return (
    <Secao
      id="empresa"
      etiqueta="A empresa"
      titulo="Quem opera o caminho do seu dinheiro"
      intro="Lidar com pagamento alheio é lidar com confiança. Por isso o que a Velora persegue, como se organiza e o que mede estão escritos aqui, e não guardados."
    >
      {/* Missão e visão */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Cartao rotulo="Missão" texto={missao} destaque />
        <Cartao rotulo="Visão" texto={visao} />
      </div>

      {/* Valores */}
      <h3 className="mt-20 font-display text-2xl font-semibold">Valores</h3>
      {/* São cinco valores: o primeiro ocupa duas colunas para a grade fechar */}
      <ul className="mt-8 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {valores.map((valor, i) => (
          <li
            key={valor.titulo}
            className={`bg-paper p-7 ${i === 0 ? "sm:col-span-2" : ""}`}
          >
            <h4 className="font-display text-lg font-semibold">{valor.titulo}</h4>
            <p className="mt-3 leading-relaxed text-ink-70">{valor.texto}</p>
          </li>
        ))}
      </ul>

      {/* Objetivos */}
      <h3 className="mt-20 font-display text-2xl font-semibold">Objetivos</h3>
      <p className="mt-3 max-w-[58ch] text-ink-70">
        Cada objetivo tem um jeito de saber se foi alcançado. Meta sem número é
        intenção, não objetivo.
      </p>

      <div className="mt-8 overflow-x-auto rounded-3xl border border-line bg-paper">
        <table className="w-full min-w-[42rem] border-collapse text-left">
          <caption className="sr-only">
            Objetivos da Velora por prazo, com a meta e o indicador que a mede.
          </caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="etiqueta px-6 py-4 text-ink-40">
                Prazo
              </th>
              <th scope="col" className="etiqueta px-6 py-4 text-ink-40">
                Meta
              </th>
              <th scope="col" className="etiqueta px-6 py-4 text-ink-40">
                Como medimos
              </th>
            </tr>
          </thead>
          <tbody>
            {objetivos.map((objetivo, i) => (
              <tr
                key={objetivo.meta}
                className={i > 0 ? "border-t border-line" : undefined}
              >
                <td className="whitespace-nowrap px-6 py-5 align-top">
                  <span className="font-medium">{objetivo.prazo}</span>
                  <span className="mt-0.5 block font-mono text-xs text-ink-40">
                    {objetivo.janela}
                  </span>
                </td>
                <td className="px-6 py-5 align-top text-ink">{objetivo.meta}</td>
                <td className="px-6 py-5 align-top text-ink-70">
                  {objetivo.indicador}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Organograma */}
      <h3 className="mt-20 font-display text-2xl font-semibold">
        Como a equipe se organiza
      </h3>
      <div className="mt-8">
        <Organograma />
      </div>
      <p className="mt-6 max-w-[62ch] border-l-2 border-velora pl-5 text-ink-70">
        {notaOrganograma}
      </p>

      {/* Inovação */}
      <h3 className="mt-20 font-display text-2xl font-semibold">
        Como a Velora se reinventa
      </h3>
      <p className="mt-3 max-w-[58ch] text-ink-70">
        Quatro rotinas fixas, e nenhuma delas depende de alguém ter uma boa ideia
        no banho.
      </p>
      <ul className="mt-8 grid gap-6 md:grid-cols-2">
        {inovacao.map((item) => (
          <li
            key={item.titulo}
            className="rounded-3xl border border-line bg-paper p-7"
          >
            <h4 className="font-display text-lg font-semibold">{item.titulo}</h4>
            <p className="mt-3 leading-relaxed text-ink-70">{item.texto}</p>
          </li>
        ))}
      </ul>
    </Secao>
  );
}

function Cartao({
  rotulo,
  texto,
  destaque = false,
}: {
  rotulo: string;
  texto: string;
  destaque?: boolean;
}) {
  return (
    <div
      className={`rounded-3xl p-8 sm:p-10 ${
        destaque ? "bg-ink text-paper" : "border border-line bg-paper text-ink"
      }`}
    >
      <p className={`etiqueta ${destaque ? "text-velora" : "text-velora-dark"}`}>
        {rotulo}
      </p>
      <p
        className={`mt-6 font-display text-xl leading-snug font-medium text-balance sm:text-2xl ${
          destaque ? "text-paper" : "text-ink"
        }`}
      >
        {texto}
      </p>
    </div>
  );
}
