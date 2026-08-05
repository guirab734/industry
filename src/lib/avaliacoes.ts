"use client";

import { useSyncExternalStore } from "react";
import { banco, bancoLigado } from "./supabase";
import { criarArmazem } from "./armazem";
import { avaliacoesIniciais, type Avaliacao } from "./conteudo";

/**
 * De onde saem as avaliações do site.
 *
 * Com as variáveis do Supabase configuradas, elas ficam no banco e todo
 * mundo vê o que os outros escreveram — inclusive ao vivo, sem recarregar
 * a página. Sem elas, tudo continua no navegador de quem escreveu, que é
 * como o site funcionava antes.
 *
 * Quem usa isso não precisa saber qual dos dois está valendo: o componente
 * chama `useAvaliacoes` e `publicarAvaliacao`, e pronto.
 */

export type Fonte = "banco" | "navegador";

export type EstadoAvaliacoes = {
  itens: Avaliacao[];
  carregando: boolean;
  erro: string | null;
  fonte: Fonte;
};

type Linha = {
  id: string;
  nome: string;
  papel: string;
  nota: number;
  comentario: string;
  criado_em: string;
};

const COLUNAS = "id,nome,papel,nota,comentario,criado_em";
const LIMITE = 50;

/* Banco lento ou fora do ar não pode deixar a seção em esqueleto para
   sempre — passou disso, o site desiste e mostra o que já tem. */
const LIMITE_DE_ESPERA = 6000;

const armazemLocal = criarArmazem<Avaliacao[]>(
  "velora.avaliacoes",
  avaliacoesIniciais,
);

const ouvintes = new Set<() => void>();

/* O React exige que a leitura devolva a mesma referência enquanto nada
   mudar, senão entra em laço de renderização. Por isso o estado é trocado
   inteiro a cada mudança, e nunca alterado no lugar. */
const NO_SERVIDOR: EstadoAvaliacoes = {
  itens: avaliacoesIniciais,
  carregando: false,
  erro: null,
  fonte: bancoLigado ? "banco" : "navegador",
};

let estado: EstadoAvaliacoes = bancoLigado
  ? { itens: [], carregando: true, erro: null, fonte: "banco" }
  : NO_SERVIDOR;

let cacheLocal: EstadoAvaliacoes = NO_SERVIDOR;
let jaBuscou = false;

function definir(parcial: Partial<EstadoAvaliacoes>) {
  estado = { ...estado, ...parcial };
  ouvintes.forEach((ouvinte) => ouvinte());
}

function paraAvaliacao(linha: Linha): Avaliacao {
  return {
    id: linha.id,
    nome: linha.nome,
    papel: linha.papel,
    nota: linha.nota,
    comentario: linha.comentario,
    data: linha.criado_em.slice(0, 10),
  };
}

async function buscar() {
  if (!banco) return;

  try {
    const { data, error } = await banco
      .from("avaliacoes")
      .select(COLUNAS)
      .order("criado_em", { ascending: false })
      .limit(LIMITE)
      .abortSignal(AbortSignal.timeout(LIMITE_DE_ESPERA));

    if (error) throw error;

    definir({
      itens: (data as Linha[]).map(paraAvaliacao),
      carregando: false,
      erro: null,
    });
  } catch {
    /* Banco fora do ar ou sem internet: o site continua de pé, mostrando
       as avaliações iniciais em vez de uma seção vazia. */
    definir({
      itens: estado.itens.length ? estado.itens : avaliacoesIniciais,
      carregando: false,
      erro: "Não foi possível carregar as avaliações agora. Mostrando as anteriores.",
    });
  }
}

function ler(): EstadoAvaliacoes {
  if (bancoLigado) return estado;

  // Sem banco, a verdade está no localStorage.
  const itens = armazemLocal.ler();
  if (itens !== cacheLocal.itens) {
    cacheLocal = { itens, carregando: false, erro: null, fonte: "navegador" };
  }
  return cacheLocal;
}

function assinar(ouvinte: () => void) {
  ouvintes.add(ouvinte);

  const desfazer: Array<() => void> = [
    () => {
      ouvintes.delete(ouvinte);
    },
  ];

  // Numa constante local o TypeScript mantém a garantia de que não é nulo
  // dentro das funções de limpeza mais abaixo.
  const cliente = banco;

  if (cliente) {
    if (!jaBuscou) {
      jaBuscou = true;
      void buscar();
    }

    /* Avaliação escrita por outra pessoa aparece sozinha na tela — é o que
       torna a demonstração ao vivo interessante. */
    const canal = cliente
      .channel("avaliacoes-ao-vivo")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "avaliacoes" },
        (mensagem) => {
          const nova = paraAvaliacao(mensagem.new as Linha);
          if (estado.itens.some((item) => item.id === nova.id)) return;
          definir({ itens: [nova, ...estado.itens].slice(0, LIMITE) });
        },
      )
      .subscribe();

    // Se o tempo real falhar, voltar para a aba já traz o que faltou.
    const aoVoltar = () => {
      if (document.visibilityState === "visible") void buscar();
    };
    document.addEventListener("visibilitychange", aoVoltar);

    desfazer.push(() => {
      document.removeEventListener("visibilitychange", aoVoltar);
      void cliente.removeChannel(canal);
    });
  } else {
    desfazer.push(armazemLocal.assinar(ouvinte));
  }

  return () => desfazer.forEach((fn) => fn());
}

export function useAvaliacoes(): EstadoAvaliacoes {
  return useSyncExternalStore(assinar, ler, () => NO_SERVIDOR);
}

export type NovaAvaliacao = {
  nome: string;
  papel: string;
  nota: number;
  comentario: string;
};

export async function publicarAvaliacao(
  nova: NovaAvaliacao,
): Promise<{ ok: boolean; erro?: string }> {
  if (!banco) {
    const anteriores = armazemLocal.ler();
    armazemLocal.gravar([
      {
        ...nova,
        id: `local-${Date.now()}`,
        data: new Date().toISOString().slice(0, 10),
      },
      ...anteriores,
    ]);
    return { ok: true };
  }

  try {
    const { data, error } = await banco
      .from("avaliacoes")
      .insert(nova)
      .select(COLUNAS)
      .abortSignal(AbortSignal.timeout(LIMITE_DE_ESPERA))
      .single();

    if (error) throw error;

    // Não espera o aviso do tempo real: quem escreveu vê na hora.
    const publicada = paraAvaliacao(data as Linha);
    if (!estado.itens.some((item) => item.id === publicada.id)) {
      definir({ itens: [publicada, ...estado.itens].slice(0, LIMITE) });
    }
    return { ok: true };
  } catch {
    return {
      ok: false,
      erro: "Não deu para publicar agora. Tente de novo em instantes.",
    };
  }
}
