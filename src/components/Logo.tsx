/**
 * Marca da Velora.
 *
 * O símbolo é um V que também é o sinal de confirmado — a mesma forma
 * que aparece no fim de todo pagamento aprovado. As duas hastes curtas
 * atrás dele são o rastro de velocidade.
 */
export function Simbolo({
  className = "",
  claro = false,
}: {
  className?: string;
  claro?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      role="img"
      aria-label="Símbolo da Velora"
    >
      <rect
        width="40"
        height="40"
        rx="11"
        className={claro ? "fill-paper/12" : "fill-ink"}
      />
      {/* rastro */}
      <path
        d="M7 15.5h5M5 21h7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="text-velora opacity-40"
      />
      {/* o V que é o confirmado */}
      <path
        d="M15.5 19.5 21.5 27 33 12.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-velora"
      />
    </svg>
  );
}

export function Logo({
  className = "",
  claro = false,
}: {
  className?: string;
  claro?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Simbolo className="h-8 w-8 shrink-0" claro={claro} />
      <span
        className={`font-display text-[1.35rem] font-semibold tracking-[-0.02em] ${
          claro ? "text-paper" : "text-ink"
        }`}
      >
        Velora
      </span>
    </span>
  );
}
