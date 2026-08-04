"use client";

import { useSyncExternalStore } from "react";

/**
 * Guarda uma lista no localStorage e avisa quem estiver ouvindo.
 *
 * Existe para o site funcionar sem servidor: as avaliações que o visitante
 * envia continuam lá quando ele volta. É lido por `useSyncExternalStore`,
 * então o servidor renderiza o valor inicial e o navegador assume depois,
 * sem descompasso de hidratação.
 */
export type Armazem<T> = {
  ler: () => T;
  lerNoServidor: () => T;
  gravar: (valor: T) => void;
  assinar: (ouvinte: () => void) => () => void;
};

export function criarArmazem<T>(chave: string, inicial: T): Armazem<T> {
  const ouvintes = new Set<() => void>();

  // getSnapshot precisa devolver a mesma referência enquanto nada mudar,
  // senão o React entra em laço. Por isso guardamos o texto cru lido.
  let ultimoBruto: string | null = null;
  let ultimoValor: T = inicial;

  function ler(): T {
    let bruto: string | null = null;
    try {
      bruto = localStorage.getItem(chave);
    } catch {
      bruto = null;
    }

    if (bruto === ultimoBruto) return ultimoValor;

    ultimoBruto = bruto;
    if (bruto === null) {
      ultimoValor = inicial;
      return ultimoValor;
    }

    try {
      ultimoValor = JSON.parse(bruto) as T;
    } catch {
      ultimoValor = inicial;
    }
    return ultimoValor;
  }

  function gravar(valor: T) {
    try {
      localStorage.setItem(chave, JSON.stringify(valor));
    } catch {
      // Navegador sem storage: mantemos o valor só nesta sessão.
      ultimoBruto = null;
      ultimoValor = valor;
    }
    ouvintes.forEach((ouvinte) => ouvinte());
  }

  function assinar(ouvinte: () => void) {
    ouvintes.add(ouvinte);
    // Outra aba mexeu no mesmo dado
    window.addEventListener("storage", ouvinte);
    return () => {
      ouvintes.delete(ouvinte);
      window.removeEventListener("storage", ouvinte);
    };
  }

  return { ler, lerNoServidor: () => inicial, gravar, assinar };
}

export function useArmazem<T>(armazem: Armazem<T>): T {
  return useSyncExternalStore(
    armazem.assinar,
    armazem.ler,
    armazem.lerNoServidor,
  );
}
