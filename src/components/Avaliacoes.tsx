"use client";

import { useMemo, useState } from "react";
import { Secao } from "./Secao";
import { criarArmazem, useArmazem } from "@/lib/armazem";
import { avaliacoesIniciais, type Avaliacao } from "@/lib/conteudo";

const armazem = criarArmazem<Avaliacao[]>(
  "velora.avaliacoes",
  avaliacoesIniciais,
);

/**
 * Sistema de avaliação. As notas ficam guardadas no próprio navegador,
 * então o que o visitante enviar continua lá quando ele voltar — sem
 * depender de servidor.
 */
export function Avaliacoes() {
  const avaliacoes = useArmazem(armazem);
  const [enviada, setEnviada] = useState(false);

  const [nome, setNome] = useState("");
  const [papel, setPapel] = useState("");
  const [nota, setNota] = useState(0);
  const [comentario, setComentario] = useState("");
  const [erro, setErro] = useState<string | null>(null);

  const media = useMemo(
    () =>
      avaliacoes.reduce((soma, a) => soma + a.nota, 0) /
      Math.max(avaliacoes.length, 1),
    [avaliacoes],
  );

  const distribuicao = useMemo(
    () =>
      [5, 4, 3, 2, 1].map((estrela) => ({
        estrela,
        quantidade: avaliacoes.filter((a) => a.nota === estrela).length,
      })),
    [avaliacoes],
  );

  function enviar(evento: React.FormEvent) {
    evento.preventDefault();

    if (nota === 0) {
      setErro("Escolha de 1 a 5 estrelas para enviar.");
      return;
    }
    if (comentario.trim().length < 10) {
      setErro("Escreva pelo menos 10 caracteres no comentário.");
      return;
    }

    setErro(null);
    armazem.gravar([
      {
        id: `local-${Date.now()}`,
        nome: nome.trim() || "Cliente Velora",
        papel: papel.trim() || "Lojista",
        nota,
        comentario: comentario.trim(),
        data: new Date().toISOString().slice(0, 10),
      },
      ...avaliacoes,
    ]);

    setNome("");
    setPapel("");
    setNota(0);
    setComentario("");
    setEnviada(true);
  }

  return (
    <Secao
      id="avaliacoes"
      etiqueta="Avaliações"
      titulo="O que os lojistas dizem"
      intro="Nota e comentário ficam publicados como chegam, inclusive os que apontam o que falta. Avaliação escondida não serve para melhorar nada."
    >
      <div className="grid gap-8 lg:grid-cols-[20rem_1fr] lg:gap-12">
        {/* Média e distribuição */}
        <div className="h-fit rounded-3xl border border-line bg-paper p-8 lg:sticky lg:top-24">
          <p className="etiqueta text-ink-40">Nota média</p>
          <div className="mt-4 flex items-end gap-3">
            <span className="tabular font-display text-6xl leading-none font-semibold">
              {media.toFixed(1).replace(".", ",")}
            </span>
            <span className="pb-1.5 text-ink-40">de 5</span>
          </div>
          <Estrelas nota={Math.round(media)} className="mt-4" />
          <p className="mt-3 text-sm text-ink-40">
            {avaliacoes.length}{" "}
            {avaliacoes.length === 1 ? "avaliação" : "avaliações"}
          </p>

          <ul className="mt-7 space-y-2.5 border-t border-line pt-6">
            {distribuicao.map(({ estrela, quantidade }) => (
              <li key={estrela} className="flex items-center gap-3 text-sm">
                <span className="tabular w-3 text-ink-40">{estrela}</span>
                <span
                  aria-hidden
                  className="h-2 flex-1 overflow-hidden rounded-full bg-surface"
                >
                  <span
                    className="block h-full rounded-full bg-velora"
                    style={{
                      width: `${(quantidade / Math.max(avaliacoes.length, 1)) * 100}%`,
                    }}
                  />
                </span>
                <span className="tabular w-5 text-right text-ink-40">
                  {quantidade}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          {/* Formulário */}
          <form
            onSubmit={enviar}
            noValidate
            className="rounded-3xl border border-line bg-paper p-8"
          >
            <h3 className="font-display text-xl font-semibold">
              Deixe a sua avaliação
            </h3>

            <fieldset className="mt-6">
              <legend className="etiqueta text-ink-40">Sua nota</legend>
              <div className="mt-3 flex gap-1.5">
                {[1, 2, 3, 4, 5].map((estrela) => (
                  <button
                    key={estrela}
                    type="button"
                    onClick={() => setNota(estrela)}
                    aria-pressed={nota === estrela}
                    aria-label={`${estrela} ${estrela === 1 ? "estrela" : "estrelas"}`}
                    className="rounded-md p-1 transition-transform hover:scale-110"
                  >
                    <Estrela cheia={estrela <= nota} className="h-8 w-8" />
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Campo
                id="aval-nome"
                nome="nome"
                autoComplete="name"
                rotulo="Seu nome"
                valor={nome}
                aoMudar={setNome}
                placeholder="Como quer aparecer"
              />
              <Campo
                id="aval-papel"
                nome="loja"
                autoComplete="organization"
                rotulo="Sua loja"
                valor={papel}
                aoMudar={setPapel}
                placeholder="Opcional"
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="aval-comentario"
                className="etiqueta block text-ink-40"
              >
                Comentário
              </label>
              <textarea
                id="aval-comentario"
                name="comentario"
                rows={4}
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                placeholder="Conte como foi usar a Velora no dia a dia da sua loja."
                aria-describedby={erro ? "aval-erro" : undefined}
                className="mt-3 w-full resize-y rounded-2xl border border-line bg-surface px-5 py-4 text-ink outline-none placeholder:text-ink-40 focus:border-velora"
              />
            </div>

            {erro && (
              <p
                id="aval-erro"
                role="alert"
                className="mt-4 rounded-xl bg-alert/10 px-4 py-3 text-sm text-alert"
              >
                {erro}
              </p>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                className="rounded-full bg-velora px-7 py-3.5 font-medium text-paper transition-colors hover:bg-velora-dark"
              >
                Publicar avaliação
              </button>
              {enviada && !erro && (
                <p role="status" className="text-sm text-velora-dark">
                  Publicada. Ela já aparece na lista abaixo.
                </p>
              )}
            </div>
          </form>

          {/* Lista */}
          <ul className="mt-8 space-y-4">
            {avaliacoes.slice(0, 6).map((avaliacao) => (
              <li
                key={avaliacao.id}
                className="rounded-3xl border border-line bg-paper p-7"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-display font-semibold">{avaliacao.nome}</p>
                    <p className="text-sm text-ink-40">{avaliacao.papel}</p>
                  </div>
                  <Estrelas nota={avaliacao.nota} />
                </div>
                <p className="mt-4 leading-relaxed text-ink-70">
                  {avaliacao.comentario}
                </p>
                <p className="tabular mt-4 font-mono text-xs text-ink-40">
                  {formatarData(avaliacao.data)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Secao>
  );
}

function Campo({
  id,
  nome,
  rotulo,
  valor,
  aoMudar,
  autoComplete,
  placeholder,
}: {
  id: string;
  nome: string;
  rotulo: string;
  valor: string;
  aoMudar: (v: string) => void;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="etiqueta block text-ink-40">
        {rotulo}
      </label>
      <input
        id={id}
        name={nome}
        autoComplete={autoComplete}
        value={valor}
        onChange={(e) => aoMudar(e.target.value)}
        placeholder={placeholder}
        className="mt-3 w-full rounded-2xl border border-line bg-surface px-5 py-3.5 text-ink outline-none placeholder:text-ink-40 focus:border-velora"
      />
    </div>
  );
}

function Estrelas({
  nota,
  className = "",
}: {
  nota: number;
  className?: string;
}) {
  return (
    <span
      className={`flex gap-0.5 ${className}`}
      role="img"
      aria-label={`${nota} de 5 estrelas`}
    >
      {[1, 2, 3, 4, 5].map((e) => (
        <Estrela key={e} cheia={e <= nota} className="h-4 w-4" />
      ))}
    </span>
  );
}

function Estrela({
  cheia,
  className = "",
}: {
  cheia: boolean;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="m12 3.6 2.6 5.3 5.9.85-4.25 4.14 1 5.86L12 17l-5.25 2.75 1-5.86L3.5 9.75l5.9-.85z"
        fill={cheia ? "var(--color-amber)" : "none"}
        stroke={cheia ? "var(--color-amber)" : "var(--color-ink-40)"}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function formatarData(iso: string) {
  const [ano, mes, dia] = iso.split("-");
  return `${dia}/${mes}/${ano}`;
}
