"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

/**
 * QR Code de verdade, escaneável. Diferente do QR ilustrativo do
 * simulador da home, este codifica o conteúdo que recebe.
 */
export function QrReal({
  conteudo,
  tamanho = 220,
  className = "",
  rotulo,
  resolverUrl = false,
}: {
  conteudo: string;
  tamanho?: number;
  className?: string;
  rotulo: string;
  /** Trata `conteudo` como caminho e completa com o domínio de quem acessa. */
  resolverUrl?: boolean;
}) {
  const [svg, setSvg] = useState<string | null>(null);

  useEffect(() => {
    let ativo = true;
    const alvo = resolverUrl
      ? new URL(conteudo, window.location.href).href
      : conteudo;

    QRCode.toString(alvo, {
      type: "svg",
      margin: 0,
      errorCorrectionLevel: "M",
      color: { dark: "#0a1e28", light: "#ffffff" },
    })
      .then((gerado) => {
        if (ativo) setSvg(gerado);
      })
      .catch(() => {
        if (ativo) setSvg(null);
      });
    return () => {
      ativo = false;
    };
  }, [conteudo, resolverUrl]);

  if (!svg) {
    return (
      <div
        aria-hidden
        className={`animate-pulse rounded-xl bg-ink/10 ${className}`}
        style={{ width: tamanho, height: tamanho }}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={rotulo}
      className={`[&>svg]:h-full [&>svg]:w-full ${className}`}
      style={{ width: tamanho, height: tamanho }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
