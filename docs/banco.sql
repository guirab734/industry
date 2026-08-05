-- Banco de dados das avaliações da Velora
--
-- Cole este arquivo inteiro no SQL Editor do Supabase e clique em Run.
-- Pode rodar mais de uma vez sem estragar nada.
--
-- O navegador fala direto com este banco, usando a chave `anon`, que é
-- pública. Quem limita o que essa chave pode fazer é a Row Level Security
-- daqui de baixo: qualquer um lê e escreve uma avaliação, mas ninguém
-- altera nem apaga o que já está publicado.

create table if not exists public.avaliacoes (
  id         uuid        primary key default gen_random_uuid(),
  nome       text        not null,
  papel      text        not null,
  nota       smallint    not null,
  comentario text        not null,
  criado_em  timestamptz not null default now(),

  -- O banco é a última linha de defesa: sem back end, a validação da tela
  -- pode ser contornada, mas estas regras não.
  constraint nome_no_tamanho       check (char_length(nome) between 1 and 60),
  constraint papel_no_tamanho      check (char_length(papel) between 1 and 60),
  constraint nota_de_1_a_5         check (nota between 1 and 5),
  constraint comentario_no_tamanho check (char_length(comentario) between 10 and 600)
);

create index if not exists avaliacoes_criado_em_idx
  on public.avaliacoes (criado_em desc);

alter table public.avaliacoes enable row level security;

-- Leitura liberada: as avaliações são públicas, é o ponto delas.
drop policy if exists "qualquer um lê" on public.avaliacoes;
create policy "qualquer um lê"
  on public.avaliacoes for select
  to anon, authenticated
  using (true);

-- Escrita liberada, mas só de linha nova.
drop policy if exists "qualquer um publica" on public.avaliacoes;
create policy "qualquer um publica"
  on public.avaliacoes for insert
  to anon, authenticated
  with check (true);

-- Não existe policy de update nem de delete. Sem ela, a RLS bloqueia:
-- nem quem tiver a chave anon consegue editar ou apagar uma avaliação.

-- Faz o INSERT chegar sozinho em quem está com o site aberto.
-- Precisa do teste: `add table` dá erro se a tabela já estiver na
-- publicação, e isso derrubaria a execução inteira numa segunda rodada.
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'avaliacoes'
  ) then
    alter publication supabase_realtime add table public.avaliacoes;
  end if;
end $$;

-- Avaliações iniciais, as mesmas que o site mostra sem banco configurado.
insert into public.avaliacoes (nome, papel, nota, comentario, criado_em)
select * from (values
  ('Marina Alcântara', 'Doceria do Bairro', 5::smallint,
   'Antes eu conferia o extrato a cada pedido para saber se tinha caído. Agora o sistema avisa sozinho e eu só faço o doce.',
   '2026-07-12'::timestamptz),
  ('Rafael Nunes', 'Loja de peças', 5::smallint,
   'Coloquei no ar num sábado à tarde e no domingo já tinha venda entrando. Não precisei chamar ninguém para configurar.',
   '2026-07-03'::timestamptz),
  ('Camila Ferraz', 'Estúdio de tatuagem', 4::smallint,
   'O recebimento é rápido e o suporte responde. Só senti falta de um relatório mensal mais mastigado para o contador.',
   '2026-06-21'::timestamptz),
  ('Diego Sampaio', 'Mercado online', 5::smallint,
   'O que mudou o jogo foi o repasse no mesmo dia. Melhorou meu caixa de um jeito que eu não esperava de um meio de pagamento.',
   '2026-06-09'::timestamptz),
  ('Priscila Tavares', 'Ateliê de roupas', 4::smallint,
   'Simples de entender, e eu não entendo nada de tecnologia. Foi o primeiro sistema que consegui configurar sem ajuda.',
   '2026-05-28'::timestamptz)
) as iniciais
where not exists (select 1 from public.avaliacoes);
