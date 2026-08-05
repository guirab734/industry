import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Ligação com o banco de dados.
 *
 * O navegador fala direto com o Supabase, sem back end no meio. A chave
 * usada aqui é a `anon`, feita para ficar pública: quem manda no que ela
 * pode fazer são as políticas de acesso do banco, escritas em `docs/banco.sql`.
 *
 * Sem as duas variáveis de ambiente o site continua de pé — as avaliações
 * voltam a ficar guardadas no próprio navegador.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const chaveAnonima = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const bancoLigado = Boolean(url && chaveAnonima);

export const banco: SupabaseClient | null =
  url && chaveAnonima
    ? createClient(url, chaveAnonima, {
        // Ninguém faz login no site: não há sessão para guardar.
        auth: { persistSession: false, autoRefreshToken: false },
      })
    : null;
