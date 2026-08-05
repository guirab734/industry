"use client";

import { Secao } from "./Secao";
import { QrReal } from "./QrReal";

const PASSOS_ANDROID = [
  "Aponte a câmera para o código e abra o link",
  "Toque nos três pontos do navegador",
  "Escolha Instalar aplicativo ou Adicionar à tela inicial",
  "Ou baixe o .apk e abra o arquivo, liberando a instalação quando o celular pedir",
];

const PASSOS_IPHONE = [
  "Aponte a câmera para o código e abra o link no Safari",
  "Toque no botão de compartilhar",
  "Escolha Adicionar à Tela de Início",
];

export function Aplicativo() {
  return (
    <Secao
      id="aplicativo"
      etiqueta="Aplicativo"
      titulo="Instale o ambiente de teste no seu celular"
      intro="O Velora Sandbox é o app onde qualquer pessoa faz uma cobrança de mentira, vê o QR nascer e acompanha o pagamento ser confirmado. Nenhum dinheiro é movimentado."
    >
      <div className="grid gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
        <div className="justify-self-center rounded-3xl border border-line bg-paper p-8 text-center">
          {/* resolverUrl completa "/app" com o domínio de quem está acessando */}
          <QrReal
            conteudo="/app"
            resolverUrl
            tamanho={210}
            rotulo="Código QR para abrir o Velora Sandbox"
            className="mx-auto"
          />
          <p className="mt-6 text-sm text-ink-40">Aponte a câmera do celular</p>
          <a
            href="/app"
            className="mt-4 inline-block rounded-full bg-velora px-6 py-3 font-medium text-paper transition-colors hover:bg-velora-dark"
          >
            Abrir aqui mesmo
          </a>

          {/* download é atributo, não texto: o navegador salva em vez de abrir */}
          <a
            href="/velora-sandbox.apk"
            download="velora-sandbox.apk"
            className="mt-3 flex items-center justify-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink-40"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden>
              <path
                d="M12 4v10m0 0 4-4m-4 4-4-4M5 19h14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Baixar o .apk
          </a>
          <p className="mt-2.5 text-xs text-ink-40">Android · 1 MB</p>
        </div>

        <div>
          <h3 className="font-display text-xl font-semibold">
            O que dá para fazer no app
          </h3>
          <ul className="mt-5 space-y-3.5">
            {[
              "Cobrar — digite um valor, gere a cobrança e confirme o pagamento",
              "Histórico — todas as cobranças de teste, com o tempo de cada confirmação",
              "Painel — como está a plataforma neste momento",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-ink-70">
                <span
                  aria-hidden
                  className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-velora"
                />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-9 grid gap-6 sm:grid-cols-2">
            <Instrucoes titulo="No Android" passos={PASSOS_ANDROID} />
            <Instrucoes titulo="No iPhone" passos={PASSOS_IPHONE} />
          </div>

          <p className="mt-8 rounded-2xl border border-amber/40 bg-amber/8 p-5 text-sm leading-relaxed text-ink-70">
            <strong className="font-semibold text-ink">
              É um ambiente de demonstração.
            </strong>{" "}
            As cobranças são simuladas, os comprovantes saem marcados como teste
            e nada sai do seu celular. Serve para entender como funciona, não
            para receber de verdade.
          </p>
        </div>
      </div>
    </Secao>
  );
}

function Instrucoes({ titulo, passos }: { titulo: string; passos: string[] }) {
  return (
    <div className="rounded-2xl border border-line bg-paper p-6">
      <h4 className="font-display font-semibold">{titulo}</h4>
      <ol className="mt-4 space-y-2.5">
        {passos.map((passo, i) => (
          <li key={passo} className="flex gap-3 text-sm text-ink-70">
            <span className="tabular shrink-0 font-mono text-velora-dark">
              {i + 1}
            </span>
            {passo}
          </li>
        ))}
      </ol>
    </div>
  );
}
