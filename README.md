# Velora — site institucional

Site de página única da **Velora**, plataforma de recebimento por Pix,
escrito para quem não é da área: explica o que um meio de pagamento faz,
sem jargão, e deixa o visitante testar uma cobrança na própria página.

Feito para o desafio de Transformação Digital na Indústria 4.0.

## Rodando

```bash
npm install
npm run dev
```

Abre em <http://localhost:3000>.

```bash
npm run build   # build de produção
npm run lint    # eslint
```

## O que tem no site

| Seção | Conteúdo |
|---|---|
| Início | Posicionamento e um comprovante de Pix confirmado |
| Como funciona | A analogia do caixa, os quatro passos, o antes e depois, e o simulador |
| A empresa | Missão, visão, valores, objetivos por prazo, organograma e inovação |
| Segurança | Como o dinheiro fica protegido e o protótipo IoT de monitoramento |
| Avaliações | Média, distribuição das notas e formulário de nota + comentário |
| Contato | Formulário validado e canais diretos |

### As duas funcionalidades interativas

- **Sistema de avaliação** — nota de 1 a 5 e comentário. As avaliações ficam
  no `localStorage` do navegador, então o que for enviado continua lá na
  próxima visita. A média e a distribuição recalculam na hora.
- **Formulário de contato** — validação de nome, e-mail e mensagem, com erro
  em linha e foco automático no primeiro campo errado.

Nenhum dos dois depende de servidor: o site inteiro é estático e funciona
mesmo sem internet depois de carregado — o que tira o risco da apresentação.

### O simulador de cobrança

Em *Como funciona* o visitante digita um valor, gera a cobrança, vê o QR
Code nascer e acompanha o pagamento ser confirmado, com o comprovante saindo
no fim. É demonstração: nada é cobrado de ninguém e nada sai do navegador.

## Identidade visual

O sistema todo sai do **comprovante de Pix**: números em fonte monoespaçada,
borda picotada de recibo no cartão de comprovante e o verde de "aprovado"
como único acento forte.

| Papel | Valor |
|---|---|
| Texto e painéis escuros | `#0a1e28` petróleo |
| Fundo | `#edf2f1` menta acinzentado |
| Acento | `#00a878` verde aprovado |
| Atenção / falha | `#e8a317` / `#e4572e` |

Tipografia: Bricolage Grotesque nos títulos, Instrument Sans no texto,
IBM Plex Mono em valores e códigos.

O símbolo da marca é um **V que também é o sinal de confirmado** — a mesma
forma que aparece no fim de todo pagamento aprovado.

## O aplicativo — Velora Sandbox

Em `/app` roda o **Velora Sandbox**, ambiente de teste instalável no celular
(PWA). Três telas: **Cobrar** (teclado, QR real e comprovante), **Histórico**
e **Painel** (o monitoramento, com os mesmos limites do circuito do Arduino).

Instala pelo próprio navegador, sem loja de aplicativos: a seção *Aplicativo*
do site traz um QR Code apontando para ele. Funciona offline depois da
primeira abertura.

As cobranças são simuladas. O comprovante sai com marca d'água de simulação,
o identificador começa com `TESTE-` e o QR codifica um texto que diz, em
português claro, que não é uma cobrança real — de propósito, para que nenhuma
tela do app possa ser usada como comprovante falso.

### Gerando o .apk

O app é um PWA, então dá para empacotar como APK sem escrever código Android:
suba o site, abra [pwabuilder.com](https://www.pwabuilder.com), informe a URL
e baixe o pacote Android assinado.

## Protótipo de Indústria 4.0

O código do Arduino e as instruções de montagem no Tinkercad estão em
[`prototipo-iot/`](prototipo-iot/).

## Documentação

- [`docs/projeto.md`](docs/projeto.md) — ferramenta escolhida, protótipo,
  benefícios, monitoramento e conferência contra os critérios do enunciado
- [`docs/apresentacao.md`](docs/apresentacao.md) — roteiro minuto a minuto

## Estrutura

```
src/
  app/          layout, estilos globais e a página
  components/   uma seção por arquivo
  lib/
    conteudo.ts todo o texto institucional em um lugar só
prototipo-iot/  código do Arduino e guia de montagem
```

Para mudar qualquer texto do site, mexa em `src/lib/conteudo.ts` — os
componentes não têm conteúdo escrito dentro deles, salvo os títulos de seção.

## Antes de publicar em domínio de produção

Os indicadores usados no site (disponibilidade, tempo de confirmação, metas
e avaliações) são de referência para a apresentação. Revise ou substitua por
números reais antes de colocar no ar como material institucional.

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4
