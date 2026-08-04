import { criarArmazem } from "./armazem";

export type Transacao = {
  id: string;
  centavos: number;
  em: string; // ISO
  duracaoMs: number;
};

export const armazemTransacoes = criarArmazem<Transacao[]>(
  "velora.sandbox.transacoes",
  [],
);

export function formatarBRL(centavos: number) {
  return (centavos / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

/**
 * Identificador de teste. O prefixo fica no começo de propósito: quem
 * bater o olho já sabe que não é uma transação real.
 */
export function gerarIdTeste(centavos: number) {
  const base = ((centavos + 1) * 2654435761) % 1e10;
  return `TESTE-${base.toString(36).toUpperCase().padStart(7, "0").slice(0, 7)}`;
}

/**
 * Conteúdo do QR. Não é um payload Pix válido, e isso é intencional:
 * se alguém apontar o app do banco, não acontece nada; se apontar a
 * câmera, lê em texto claro que a cobrança é de mentira.
 */
export function conteudoQrTeste(centavos: number, id: string) {
  return [
    "VELORA SANDBOX - COBRANCA DE TESTE",
    `Valor simulado: ${formatarBRL(centavos)}`,
    `Identificador: ${id}`,
    "NAO E UMA COBRANCA REAL. NENHUM DINHEIRO E MOVIMENTADO.",
  ].join("\n");
}
