# Como apresentar o site da Velora

Roteiro de fala. A regra que vale para tudo: **não leia a tela.** O site é o
que a plateia olha; você é quem explica.

## Antes de começar

- [ ] Site aberto numa aba, já no topo da página
- [ ] Seu celular com o app aberto uma vez (ele funciona offline depois disso)
- [ ] Testar o wi-fi da sala

---

## 1 · Comece pela dor, não pela empresa (1 min)

Não abra dizendo "a Velora é um gateway de pagamentos". Ninguém se importa
ainda. Abra assim:

> "Imagina que você vende bolo por encomenda. O cliente pede, você manda sua
> chave Pix por mensagem, ele paga e te manda um print. Aí você abre o
> aplicativo do banco pra conferir se caiu mesmo. Todo pedido. Toda vez."

**Pergunte quem já pagou ou recebeu assim.** Vão levantar a mão. Pronto: a
turma entendeu o problema sem você usar uma palavra técnica.

## 2 · O que a empresa faz (1 min)

Agora sim. Mostre o topo do site e leia a frase grande em voz alta:

> "O dinheiro sai da conta dele e chega na sua antes de você piscar."

E complete com a analogia, que está na seção **Como funciona**:

> "Um gateway é o caixa da loja, só que na internet. No comércio de rua o
> caixa recebe o dinheiro, confere e avisa o vendedor que pode entregar. A
> Velora faz isso numa loja online, em menos de um segundo, sem ninguém
> operando."

## 3 · O quadro do antes e depois (30 s)

Desça até o quadro **sem a Velora × com a Velora**. Não leia os oito itens.
Aponte e diga:

> "Do lado esquerdo é o jeito que quase todo mundo faz hoje. Do lado direito
> é o que acontece quando existe um sistema no meio."

## 4 · O simulador — o momento principal (2 min)

Este é o ponto alto. Pare no simulador e **peça um valor para a plateia**.
Alguém vai gritar um número. Digite.

1. Clique em **Gerar cobrança** — o QR aparece
2. Diga: *"esse código é único, vale só pra essa compra"*
3. Clique em **Simular o pagamento**
4. Quando o comprovante sair: *"foi isso. Em menos de um segundo o lojista já
   sabe que pode fazer o bolo."*

Deixe o comprovante na tela por uns segundos antes de seguir.

## 5 · A empresa por dentro (1 min 30)

Suba até **A empresa**. Pare em três coisas só:

- **Missão** — leia, é uma frase
- **Organograma** — aponte para *Dados e monitoramento* e diga a frase que
  vale nota: *"esse time existir sozinho, e não como tarefa de alguém nas
  horas vagas, é o que coloca a empresa dentro da Indústria 4.0: a decisão
  sai do número medido, não do achismo."*
- **Objetivos** — mostre que cada meta tem uma coluna dizendo como se mede

Não leia os valores um por um. Deixe na tela e siga.

## 6 · Segurança e monitoramento (1 min)

Duas ideias, nada além disso:

> "Primeiro: a Velora nunca vê a senha de ninguém. Quem digita a senha é o
> cliente, dentro do app do banco dele."

> "Segundo: Pix funciona 24 horas por dia, então a plataforma também
> precisa. Sensores acompanham os servidores e disparam um alarme sozinhos
> quando algo começa a sair do normal — o aviso vem antes da queda, não
> depois."

Se perguntarem como, aí sim você fala do painel com Arduino. Só se
perguntarem.

## 7 · O app na mão da turma (1 min)

Vá para a seção **Aplicativo** e deixe o QR grande na tela.

> "Peguem o celular e apontem a câmera. Vocês vão instalar o ambiente de
> teste e fazer as próprias cobranças."

Diga em voz alta que é ambiente de teste e que nenhum dinheiro é
movimentado — está escrito na tela, mas fale mesmo assim.

Enquanto eles instalam, abra o app no seu celular e mostre a aba **Painel**,
tocando em *Atenção* e *Crítico*:

> "Isso é o que a operação enxerga. Verde é normal, amarelo é alguém vai
> conferir, vermelho é alarme tocando."

## 8 · Avaliações e contato (30 s)

Passe rápido:

> "Toda avaliação fica publicada como chegou, inclusive as que apontam o que
> falta. E o formulário de contato valida o que você digita antes de enviar."

## 9 · Feche em uma frase (30 s)

Não termine com "é isso, obrigado". Termine com:

> "A Velora vende uma coisa só: a certeza de que o dinheiro chega. Todo o
> resto do site existe pra provar isso."

---

## Se perguntarem

**"O pagamento é de verdade?"**
Não. O simulador do site e o app são ambiente de teste, os comprovantes saem
marcados como simulação e nada sai do navegador.

**"Onde ficam as avaliações?"**
No próprio navegador de quem escreveu. Não precisa de servidor, e por isso
funciona mesmo se a internet da sala cair.

**"Qual a ferramenta de Indústria 4.0?"**
Internet das Coisas. Sensores acompanham os servidores que sustentam a
plataforma e disparam alarme antes da falha. O código do painel está em
`prototipo-iot/`.

**"Por que IoT e não inteligência artificial?"**
IA descreve ou prevê, mas não aciona ninguém às três da manhã. O problema
aqui era ninguém estar olhando a tela — isso é sensor, não é modelo.
