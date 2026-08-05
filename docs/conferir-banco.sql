-- Confere se o banco das avaliações ficou do jeito certo.
-- Cole no SQL Editor do Supabase e clique em Run. Não altera nada.
--
-- Resultado esperado:
--   avaliacoes  = 5   (as iniciais; mais, se alguém já avaliou)
--   politicas   = 2   (uma de leitura, uma de publicação)
--   tempo_real  = 1   (a tabela está na publicação do Realtime)
--   rls_ligada  = true

select
  (select count(*) from public.avaliacoes) as avaliacoes,

  (select count(*) from pg_policies
    where schemaname = 'public' and tablename = 'avaliacoes') as politicas,

  (select count(*) from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'avaliacoes') as tempo_real,

  (select relrowsecurity from pg_class
    where oid = 'public.avaliacoes'::regclass) as rls_ligada;
