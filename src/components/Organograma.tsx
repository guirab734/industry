import { areas } from "@/lib/conteudo";

/**
 * Organograma em quatro áreas. Desenhado com bordas em vez de imagem
 * para continuar legível em qualquer tamanho de tela e no zoom.
 */
export function Organograma() {
  return (
    <figure className="overflow-hidden rounded-3xl border border-line bg-paper p-8 sm:p-12">
      <figcaption className="sr-only">
        Organograma da Velora: a Direção Geral se divide em quatro áreas, cada
        uma com seus times.
      </figcaption>

      {/* Topo */}
      <div className="flex flex-col items-center">
        <div className="rounded-full bg-ink px-7 py-3 text-center font-display text-lg font-semibold text-paper">
          Direção Geral
        </div>
        <div aria-hidden className="h-8 w-px bg-line" />
      </div>

      {/* Barra que liga as quatro áreas — começa e termina sobre as das pontas */}
      <div aria-hidden className="mx-[12.5%] hidden h-px bg-line lg:block" />

      <div className="grid gap-8 lg:grid-cols-4 lg:gap-5">
        {areas.map((area) => (
          <div key={area.nome} className="flex flex-col items-center">
            <div aria-hidden className="hidden h-8 w-px bg-line lg:block" />

            {/* altura fixa para as quatro caixas descerem do mesmo ponto */}
            <div className="flex w-full flex-col justify-center rounded-2xl border border-line bg-surface p-5 text-center lg:min-h-[9.5rem]">
              <h4 className="font-display text-base font-semibold text-balance">
                {area.nome}
              </h4>
              <p className="mt-2 text-sm text-ink-70">{area.resumo}</p>
            </div>

            <div aria-hidden className="h-6 w-px bg-line" />

            <ul className="w-full space-y-2">
              {area.times.map((time) => (
                <li
                  key={time}
                  className="rounded-xl border border-line bg-paper px-4 py-2.5 text-center text-sm text-ink-70"
                >
                  {time}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </figure>
  );
}
