# Roteiro da apresentação — 10 minutos

A ideia central: **não descrever o produto, fazer ele acontecer na frente de
todo mundo.** Você tem três demonstrações ao vivo (o simulador do site, o
circuito no Tinkercad e o app na mão da plateia). Elas são o trabalho — o
resto é ligação entre uma e outra.

## Antes de começar

- [ ] Site aberto numa aba, já no topo
- [ ] Tinkercad aberto em outra aba, circuito montado e **parado**
- [ ] Seu celular com o app já instalado, espelhado na tela se der
- [ ] Testar o wi-fi da sala. Se estiver ruim, o app já funciona offline
      depois de aberto uma vez — abra antes de entrar
- [ ] Deixar o volume do computador ligado (o buzzer precisa ser ouvido)

---

## 1 · O problema (1 min)

Comece pela dor, não pela empresa.

> "Imagina que você vende bolo por encomenda. O cliente pede, você manda sua
> chave Pix por mensagem, ele paga e te manda um print. Aí você abre o
> aplicativo do banco pra conferir se caiu mesmo. Todo pedido. Toda vez."

Pergunte quem na sala já pagou ou recebeu assim. Vão levantar a mão — e aí
todo mundo entendeu o problema sem você explicar nada técnico.

## 2 · A empresa (1 min 30)

Rápido. É contexto, não é o ponto alto.

Navegue até **A empresa** e pare em três coisas só:

- **Missão** — leia em voz alta, é uma frase.
- **Organograma** — aponte para *Dados e monitoramento*. Diga a frase que
  vale nota: *"esse time existir sozinho, e não como tarefa de alguém nas
  horas vagas, é o que coloca a empresa dentro da Indústria 4.0: a decisão
  sai do número medido, não do achismo."*
- **Objetivos** — mostre que cada meta tem uma coluna dizendo como se mede.

Não leia os valores um por um. Deixe na tela e siga.

## 3 · O site, ao vivo (2 min)

Vá para **Como funciona**.

1. Leia a analogia do caixa da loja. É ela que faz o leigo entender.
2. Passe pelo quadro *sem a Velora × com a Velora*.
3. **Pare no simulador.** Peça um valor para a plateia — alguém grita "cem
   reais". Digite. Gere a cobrança. Mostre o QR nascendo. Clique em simular o
   pagamento e deixe o comprovante aparecer.

> "Foi isso. Em oito décimos de segundo o lojista já sabe que pode fazer o
> bolo."

Depois desça até **Avaliações** e mostre a média e o formulário — mas não
demore, você volta nele no fim se sobrar tempo.

## 4 · O QR do app (30 s) — o momento que ninguém mais vai ter

Vá para a seção **Aplicativo** e deixe o QR grande na tela.

> "Peguem o celular. Apontem a câmera. Vocês vão instalar o ambiente de
> testes da empresa e fazer as próprias cobranças enquanto eu continuo."

Deixe o QR na tela enquanto fala. A plateia mexendo no seu produto durante a
sua apresentação é o que separa esse trabalho dos outros. Diga em voz alta
que é ambiente de teste e que nenhum dinheiro é movimentado — está escrito na
tela, mas fale mesmo assim.

## 5 · O protótipo, ao vivo (3 min)

Aqui é o coração. Vá para o Tinkercad.

1. **Explique o problema antes de ligar:** *"tudo que vocês acabaram de fazer
   depende de um servidor respondendo. E servidor esquenta, trava, cai. De
   madrugada, sem ninguém olhando."*
2. **Inicie a simulação.** LED verde aceso, LCD mostrando os números.
3. **Gire o potenciômetro devagar.** O LED vira amarelo. Pare aí um segundo:
   *"isso é o plantonista sendo chamado antes de virar problema."*
4. **Continue girando.** LED vermelho e **buzzer tocando.** Deixe tocar. O
   silêncio da sala com o alarme tocando é o melhor momento da apresentação.
5. **Volte para o verde** e o alarme cala.

Depois abra o app no seu celular, aba **Painel**, e mostre os mesmos três
estados no botão "Force um cenário".

> "É o mesmo limite, o mesmo alarme. Um na parede da fábrica, outro no bolso
> de quem está de plantão."

## 6 · A costura (1 min)

Esse é o slide que diferencia o trabalho. Diga o ciclo inteiro, apontando:

> "O cliente paga → a Velora confirma em menos de um segundo → o painel mede
> se a plataforma está aguentando → o alerta dispara antes da queda → nenhuma
> venda se perde. O sensor não é enfeite: ele protege a única coisa que a
> empresa vende, que é a certeza de que o dinheiro chega."

## 7 · Benefícios e monitoramento (1 min)

Volte ao site, seção **Segurança**, e mostre a tabela de benefícios com os
números. Depois a lista de acompanhamento:

- indicadores da semana
- painel de histórico
- revisão toda segunda-feira
- dois amarelos seguidos viram investigação

Termine em uma frase, não em "é isso, obrigado":

> "A gente não colocou sensor porque é bonito. Colocou porque quarenta e três
> minutos fora do ar por mês eram vendas dos nossos lojistas indo embora."

---

## Se perguntarem

**"O pagamento é de verdade?"**
Não. O app é ambiente de teste, os comprovantes saem marcados como simulação
e nada sai do celular. É para entender como funciona.

**"Por que IoT e não inteligência artificial?"**
IA descreve ou prevê, mas não aciona ninguém às três da manhã. O problema
aqui era ninguém estar olhando a tela — isso é sensor, não é modelo.

**"O site guarda as avaliações onde?"**
No próprio navegador de quem escreveu. Não precisa de servidor, e por isso
funciona mesmo se a internet da sala cair.

**"Quanto custa montar o painel?"**
Arduino Uno, sensor, LCD, três LEDs e um buzzer. Menos de cem reais em peça,
contra o prejuízo de uma hora fora do ar.

## Divisão se for em grupo

| Pessoa | Fala |
|---|---|
| 1 | Problema e empresa (partes 1 e 2) |
| 2 | Site e simulador (parte 3) e o QR (parte 4) |
| 3 | Protótipo no Tinkercad (parte 5) |
| 4 | Costura, benefícios e fechamento (partes 6 e 7) |

Quem não está falando fica de olho na plateia instalando o app — e ajuda quem
travar.
