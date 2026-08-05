import { Comprovante } from "./Comprovante";
import { QrDominio } from "./QrDominio";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-ink pb-24 pt-32 text-paper sm:pb-32 sm:pt-40"
    >
      {/* clarão frio atrás do comprovante, sem virar gradiente decorativo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-0 h-[36rem] w-[36rem] rounded-full bg-velora/12 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl gap-16 px-5 sm:px-8 lg:grid-cols-[1.15fr_auto] lg:items-center lg:gap-20">
        <div>
          <p className="etiqueta text-velora">Recebimento por Pix</p>

          <h1 className="mt-6 max-w-[17ch] font-display text-mega font-semibold text-paper">
            O dinheiro sai da conta dele e chega na sua antes de você piscar.
          </h1>

          <p className="mt-8 max-w-[50ch] text-lg leading-relaxed text-paper/70">
            A Velora é o caminho que o Pix percorre entre quem compra e quem
            vende. A loja não confere extrato nem pede print de comprovante: o
            pagamento entra e o sistema avisa no mesmo segundo.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#como-funciona"
              className="rounded-full bg-velora px-7 py-3.5 font-medium text-paper transition-colors hover:bg-velora-dark"
            >
              Ver como funciona
            </a>
            <a
              href="#contato"
              className="rounded-full border border-paper/25 px-7 py-3.5 font-medium text-paper transition-colors hover:border-paper/60"
            >
              Falar com a gente
            </a>
          </div>

          <div className="mt-10 max-w-sm">
            <QrDominio />
          </div>
        </div>

        <Comprovante
          className="surgir justify-self-center lg:justify-self-end"
          fundo="var(--color-ink)"
          dados={{
            valor: "R$ 148,90",
            para: "Doceria do Bairro",
            de: "Marina A.",
            quando: "04/08/2026 · 14:32:07",
            id: "E1042 8817 4409",
            duracao: "0,8 s",
          }}
        />
      </div>
    </section>
  );
}
