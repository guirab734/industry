"use client";

import { useRef, useState } from "react";
import { Secao } from "./Secao";
import { empresa } from "@/lib/conteudo";

const CHAVE = "velora.mensagens";

const ASSUNTOS = [
  "Quero receber pela Velora",
  "Já sou lojista e preciso de ajuda",
  "Dúvida sobre tarifa",
  "Outro assunto",
];

type Erros = Partial<Record<"nome" | "email" | "mensagem", string>>;

export function Contato() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [assunto, setAssunto] = useState(ASSUNTOS[0]);
  const [mensagem, setMensagem] = useState("");
  const [erros, setErros] = useState<Erros>({});
  const [enviado, setEnviado] = useState(false);
  const formulario = useRef<HTMLFormElement>(null);

  function validar(): Erros {
    const novos: Erros = {};
    if (nome.trim().length < 2) novos.nome = "Escreva o seu nome.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()))
      novos.email = "Confira o e-mail: parece faltar alguma coisa.";
    if (mensagem.trim().length < 10)
      novos.mensagem = "Conte um pouco mais, com pelo menos 10 caracteres.";
    return novos;
  }

  function enviar(evento: React.FormEvent) {
    evento.preventDefault();
    const novos = validar();
    setErros(novos);

    // Quem errou precisa chegar no campo errado sem caçar com o teclado
    if (Object.keys(novos).length > 0) {
      requestAnimationFrame(() => {
        formulario.current
          ?.querySelector<HTMLElement>('[aria-invalid="true"]')
          ?.focus();
      });
      return;
    }

    try {
      const anteriores = JSON.parse(localStorage.getItem(CHAVE) ?? "[]");
      localStorage.setItem(
        CHAVE,
        JSON.stringify([
          {
            nome: nome.trim(),
            email: email.trim(),
            assunto,
            mensagem: mensagem.trim(),
            em: new Date().toISOString(),
          },
          ...anteriores,
        ]),
      );
    } catch {
      /* sem storage: a confirmação na tela continua valendo */
    }

    setEnviado(true);
    setNome("");
    setEmail("");
    setMensagem("");
    setAssunto(ASSUNTOS[0]);
  }

  return (
    <Secao
      id="contato"
      etiqueta="Contato"
      titulo="Fale com quem constrói"
      intro="Sem robô, sem menu de atendimento com nove opções. Escreva o que precisa e alguém do time responde."
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_20rem] lg:gap-16">
        <form
          ref={formulario}
          onSubmit={enviar}
          noValidate
          className="rounded-3xl border border-line bg-paper p-8 sm:p-10"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Campo
              id="contato-nome"
              nome="nome"
              autoComplete="name"
              rotulo="Nome"
              valor={nome}
              aoMudar={setNome}
              erro={erros.nome}
              placeholder="Como podemos te chamar"
            />
            <Campo
              id="contato-email"
              nome="email"
              autoComplete="email"
              tipo="email"
              modoTeclado="email"
              semCorretor
              rotulo="E-mail"
              valor={email}
              aoMudar={setEmail}
              erro={erros.email}
              placeholder="voce@sualoja.com.br"
            />
          </div>

          <div className="mt-5">
            <label htmlFor="contato-assunto" className="etiqueta block text-ink-40">
              Assunto
            </label>
            <select
              id="contato-assunto"
              name="assunto"
              value={assunto}
              onChange={(e) => setAssunto(e.target.value)}
              className="mt-3 w-full rounded-2xl border border-line bg-surface px-5 py-3.5 text-ink outline-none focus:border-velora"
            >
              {ASSUNTOS.map((opcao) => (
                <option key={opcao}>{opcao}</option>
              ))}
            </select>
          </div>

          <div className="mt-5">
            <label
              htmlFor="contato-mensagem"
              className="etiqueta block text-ink-40"
            >
              Mensagem
            </label>
            <textarea
              id="contato-mensagem"
              name="mensagem"
              rows={5}
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              placeholder="Conte o que a sua loja vende e como você recebe hoje."
              aria-invalid={Boolean(erros.mensagem)}
              aria-describedby={erros.mensagem ? "erro-mensagem" : undefined}
              className={`mt-3 w-full resize-y rounded-2xl border bg-surface px-5 py-4 text-ink outline-none placeholder:text-ink-40 focus:border-velora ${
                erros.mensagem ? "border-alert" : "border-line"
              }`}
            />
            {erros.mensagem && (
              <p id="erro-mensagem" role="alert" className="mt-2 text-sm text-alert">
                {erros.mensagem}
              </p>
            )}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              className="rounded-full bg-velora px-7 py-3.5 font-medium text-paper transition-colors hover:bg-velora-dark"
            >
              Enviar mensagem
            </button>
            {enviado && (
              <p role="status" className="text-sm text-velora-dark">
                Mensagem registrada. Respondemos em até um dia útil.
              </p>
            )}
          </div>
        </form>

        <aside className="h-fit rounded-3xl bg-ink p-8 text-paper">
          <p className="etiqueta text-velora">Canais diretos</p>
          <dl className="mt-7 space-y-6 text-sm">
            <div>
              <dt className="text-paper/50">E-mail</dt>
              <dd className="mt-1.5">
                <a
                  href={`mailto:${empresa.email}`}
                  className="font-mono text-paper underline decoration-velora underline-offset-4"
                >
                  {empresa.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-paper/50">Site</dt>
              <dd className="mt-1.5 font-mono text-paper">{empresa.site}</dd>
            </div>
            <div>
              <dt className="text-paper/50">Atendimento</dt>
              <dd className="mt-1.5 text-paper/80">
                Segunda a sexta, das 9h às 18h. A plataforma, essa fica no ar 24
                horas.
              </dd>
            </div>
          </dl>

          <p className="mt-8 flex items-center gap-2.5 border-t border-paper/12 pt-6 text-sm text-paper/70">
            <span
              aria-hidden
              className="pulso inline-block h-2 w-2 shrink-0 rounded-full bg-velora"
            />
            Plataforma operando normalmente
          </p>
        </aside>
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
  erro,
  tipo = "text",
  autoComplete,
  modoTeclado,
  semCorretor = false,
  placeholder,
}: {
  id: string;
  nome: string;
  rotulo: string;
  valor: string;
  aoMudar: (v: string) => void;
  erro?: string;
  tipo?: string;
  autoComplete?: string;
  modoTeclado?: "email" | "text" | "tel";
  semCorretor?: boolean;
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
        type={tipo}
        autoComplete={autoComplete}
        inputMode={modoTeclado}
        spellCheck={semCorretor ? false : undefined}
        autoCapitalize={semCorretor ? "none" : undefined}
        value={valor}
        onChange={(e) => aoMudar(e.target.value)}
        placeholder={placeholder}
        aria-invalid={Boolean(erro)}
        aria-describedby={erro ? `erro-${id}` : undefined}
        className={`mt-3 w-full rounded-2xl border bg-surface px-5 py-3.5 text-ink outline-none placeholder:text-ink-40 focus:border-velora ${
          erro ? "border-alert" : "border-line"
        }`}
      />
      {erro && (
        <p id={`erro-${id}`} role="alert" className="mt-2 text-sm text-alert">
          {erro}
        </p>
      )}
    </div>
  );
}
