# Banco de dados das avaliações

As avaliações do site ficam num Postgres hospedado no **Supabase**. O
navegador de quem visita fala direto com ele — não existe back end no meio.

Sem configurar nada, o site funciona igual: as avaliações voltam a ficar
guardadas no navegador de quem escreveu. A configuração abaixo é o que faz
uma pessoa ver o que a outra escreveu.

## Como ligar (uns 10 minutos)

**1. Crie o projeto**

Entre em [supabase.com](https://supabase.com), crie uma conta e um projeto
novo. O plano gratuito basta com folga. Escolha a região mais perto — para
o Brasil, `South America (São Paulo)`.

**2. Crie a tabela**

No painel do projeto, vá em **SQL Editor → New query**, cole o conteúdo de
[`banco.sql`](./banco.sql) inteiro e clique em **Run**.

Esse arquivo cria a tabela, liga a proteção de acesso, libera o tempo real
e já insere as cinco avaliações iniciais. Pode rodar de novo sem estragar
nada.

**3. Copie as duas chaves**

Em **Project Settings → API**, copie:

- **Project URL** → vai em `NEXT_PUBLIC_SUPABASE_URL`
- **anon public** → vai em `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Não use a chave `service_role`.** Ela ignora todas as regras de proteção
e daria a qualquer visitante o poder de apagar a tabela.

**4. Coloque na Vercel**

Em **Settings → Environment Variables**, adicione as duas com esses nomes
exatos, marcando os três ambientes (Production, Preview, Development).
Depois vá em **Deployments** e clique em **Redeploy** no último.

O prefixo `NEXT_PUBLIC_` é obrigatório: sem ele o Next.js não entrega a
variável para o navegador, e é o navegador que precisa dela.

**5. Para rodar na sua máquina**

```bash
cp .env.example .env.local   # preencha as duas linhas
npm run dev
```

## Como conferir o banco

Rode [`conferir-banco.sql`](./conferir-banco.sql) no SQL Editor. Ele não
altera nada e devolve uma linha só:

| avaliacoes | politicas | tempo_real | rls_ligada |
|---|---|---|---|
| 5 | 2 | 1 | true |

Se algum número vier diferente, rode o `banco.sql` de novo inteiro.

## Como saber se ligou

Abra a seção **Avaliações**. Embaixo da nota média deve aparecer um ponto
verde com *"Atualiza sozinho quando alguém avalia"*. Se não aparecer, as
variáveis não chegaram — confira o nome delas e refaça o deploy.

Teste de verdade: abra o site em dois celulares, publique uma avaliação num
deles e olhe o outro. Ela aparece sozinha, sem recarregar.

## Por que é seguro deixar a chave pública

A chave `anon` vai junto com o JavaScript para o navegador de quem acessa —
qualquer pessoa consegue lê-la. Isso é normal, e é assim que o Supabase foi
desenhado. Quem manda no que ela pode fazer é a **Row Level Security**, que
roda dentro do banco:

| Ação | Permitido? | Por quê |
|---|---|---|
| Ler avaliações | sim | são públicas, é o ponto delas |
| Publicar avaliação | sim | é o que o formulário faz |
| Editar avaliação | **não** | não existe policy de `update` |
| Apagar avaliação | **não** | não existe policy de `delete` |
| Ver outra tabela | **não** | a RLS bloqueia o que não tem policy |

Além disso o banco valida por conta própria, então nem quem contornar a
tela consegue gravar lixo: nota entre 1 e 5, comentário entre 10 e 600
caracteres, nome e loja até 60.

## O que ainda não tem

Coisas que ficaram de fora de propósito, e que você deve saber apontar se
alguém perguntar:

- **Não tem limite de envios.** Uma pessoa insistente pode publicar muitas
  avaliações seguidas. Resolver isso direito exige back end, ou a proteção
  contra abuso do próprio Supabase.
- **Não tem moderação.** O que for escrito aparece na hora. Se aparecer algo
  impróprio na apresentação, dá para apagar pelo painel do Supabase, em
  **Table Editor → avaliacoes**.
- **Não tem login.** Ninguém prova ser quem diz. É adequado para um
  depoimento público, não para nota fiscal.

Se em algum momento o site sair do trabalho de escola e virar produção, é
por aí que se começa.

## Se der problema

**Ficou "Carregando…" e depois apareceu um aviso amarelo**
O site não conseguiu falar com o banco e mostrou as avaliações anteriores
para não deixar a seção vazia. Ele desiste depois de 6 segundos. Confira se
o projeto do Supabase não está pausado — o plano gratuito pausa sozinho
depois de uma semana sem uso.

**Publiquei e deu erro**
Provavelmente o `banco.sql` não rodou até o fim, ou a policy de `insert`
não foi criada. Rode o arquivo de novo inteiro.

**`relation "avaliacoes" is already member of publication`**
Sinal de que o arquivo já tinha rodado antes, com sucesso. Versões antigas
do `banco.sql` paravam aí na segunda execução; a atual passa direto. Rode
o `conferir-banco.sql` para ter certeza de que está tudo no lugar.

**Aparece para mim mas não para os outros**
As variáveis foram configuradas só no ambiente local. Falta colocá-las na
Vercel e refazer o deploy.
