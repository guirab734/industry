"use client";

import { useSyncExternalStore } from "react";
import { QrReal } from "./QrReal";

/* O endereço vem de quem está acessando, então funciona igual no
   domínio próprio e no endereço da Vercel, sem nada fixo no código. */
const semMudanca = () => () => {};
const lerHost = () => window.location.host;
const noServidor = () => "";

export function QrDominio() {
  const host = useSyncExternalStore(semMudanca, lerHost, noServidor);

  return (
    <div className="flex items-center gap-5 rounded-2xl border border-paper/15 bg-paper/5 p-4">
      <div className="shrink-0 rounded-xl bg-paper p-2.5">
        <QrReal
          conteudo="/"
          resolverUrl
          tamanho={82}
          rotulo="Código QR para abrir este site"
        />
      </div>
      <div className="min-w-0">
        <p className="etiqueta text-paper/45">Escaneie ou digite</p>
        <p className="mt-2 truncate font-mono text-base font-medium text-paper">
          {host || " "}
        </p>
      </div>
    </div>
  );
}
