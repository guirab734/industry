import { Logo } from "./Logo";
import { empresa, navegacao } from "@/lib/conteudo";

export function Rodape() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-10">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-5 leading-relaxed text-ink-70">
              {empresa.posicionamento}
            </p>
          </div>

          <nav aria-label="Navegação do rodapé">
            <p className="etiqueta text-ink-40">Seções</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-10 gap-y-2.5">
              {navegacao.map(({ id, rotulo }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="text-ink-70 transition-colors hover:text-ink"
                  >
                    {rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-7 text-sm text-ink-40">
          <p>
            © {new Date().getFullYear()} {empresa.nomeCompleto}
          </p>
          <p className="font-mono">{empresa.site}</p>
        </div>
      </div>
    </footer>
  );
}
