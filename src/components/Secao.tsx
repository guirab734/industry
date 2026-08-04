import type { ReactNode } from "react";

/** Cabeçalho e espaçamento comuns a todas as seções da página. */
export function Secao({
  id,
  etiqueta,
  titulo,
  intro,
  children,
  escura = false,
  className = "",
}: {
  id: string;
  etiqueta: string;
  titulo: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  escura?: boolean;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`${escura ? "bg-ink text-paper" : "bg-surface text-ink"} py-24 sm:py-32 ${className}`}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <header className="max-w-3xl">
          <p className={`etiqueta ${escura ? "text-velora" : "text-velora-dark"}`}>
            {etiqueta}
          </p>
          <h2 className="mt-5 font-display text-titulo font-semibold text-balance">
            {titulo}
          </h2>
          {intro && (
            <p
              className={`mt-6 max-w-[58ch] text-lg leading-relaxed ${
                escura ? "text-paper/70" : "text-ink-70"
              }`}
            >
              {intro}
            </p>
          )}
        </header>
        <div className="mt-14">{children}</div>
      </div>
    </section>
  );
}
