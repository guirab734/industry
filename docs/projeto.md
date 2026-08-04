# Transformação Digital na Indústria 4.0 — Velora

Documento do projeto. Reúne as decisões, o protótipo, os benefícios e o
plano de monitoramento, na ordem em que o enunciado pede.

## 1. A empresa

**Velora** — infraestrutura de recebimento por Pix. A empresa é o caminho
que o dinheiro percorre entre quem compra e quem vende: gera a cobrança,
reconhece o pagamento e avisa a loja no mesmo instante.

O cliente da Velora é o lojista pequeno e médio, que hoje recebe mandando a
chave Pix por mensagem e conferindo o extrato na mão para saber se o dinheiro
caiu.

Missão, visão, valores, objetivos e organograma completos estão publicados no
site, na seção **A empresa**.

## 2. A ferramenta de Indústria 4.0 escolhida

**Internet das Coisas (IoT).**

### Por que essa e não outra

O produto da Velora é software, mas o negócio dela depende de uma coisa
física: o servidor que responde às cobranças. Pix funciona 24 horas por dia,
inclusive de madrugada e no fim de semana. Cada minuto fora do ar é uma venda
que o lojista perde e não recupera.

Hoje esse servidor é vigiado por painéis dentro do computador — e ninguém
fica olhando para uma tela o tempo todo. O sensor resolve exatamente esse
buraco: ele não dorme, não almoça e não depende de alguém abrir o navegador.

As outras ferramentas não fecham o ciclo do mesmo jeito. Big Data e IA
descrevem o passado ou preveem o futuro, mas não acionam ninguém às três da
manhã. Nuvem já é onde a plataforma roda, não é uma mudança. IoT é a única
que transforma uma medição física em ação imediata, que é o problema real.

## 3. O protótipo

**Painel de Operação Velora** — um quadro físico, montado com Arduino, que
fica ligado na parede da sala de operação.

Código, ligações e guia de montagem no Tinkercad: [`../prototipo-iot/`](../prototipo-iot/).

### O que ele lê e o que ele mostra

| Lê | Mostra |
|---|---|
| Temperatura do servidor (TMP36) | LCD 16×2 com pagamentos por minuto, tempo de resposta e temperatura |
| Tempo de resposta da API (potenciômetro simula) | LED verde, amarelo ou vermelho, visível de longe |
| | Buzzer tocando enquanto o estado for crítico |

### Os três estados

| Cor | Critério | Ação |
|---|---|---|
| Verde | resposta < 500 ms e temperatura < 40 °C | nada a fazer |
| Amarelo | resposta de 500 ms a 1,5 s, ou temperatura ≥ 40 °C | plantonista confere |
| Vermelho | resposta ≥ 1,5 s ou temperatura ≥ 50 °C | alarme dispara, plantão acionado |

### As duas metades do protótipo

1. **Circuito no Tinkercad** — o painel físico, com o código Arduino rodando.
2. **App Velora Sandbox** — a versão de bolso do mesmo painel, com os mesmos
   limites, mais as telas de cobrança e histórico. Instalável no celular.

A segunda metade é o que liga o protótipo ao site: qualquer pessoa da plateia
escaneia o QR, instala e vê o mesmo alarme funcionando na própria mão.

## 4. Benefícios esperados

| Benefício | Indicador |
|---|---|
| Menos tempo fora do ar | de 43 min para menos de 5 min por mês |
| Problema visto antes de virar queda | alerta em média 8 min antes da falha |
| Cobertura sem depender de gente olhando tela | 24 h, inclusive de madrugada |
| Venda que deixaria de acontecer | cada minuto no ar é pedido que não cai |
| Manutenção antes da quebra | aquecimento anormal indica peça no fim da vida |
| Histórico para decidir | todo alerta registrado com data e causa |

## 5. Acompanhamento e monitoramento

- **Indicadores da semana:** disponibilidade, tempo médio de confirmação,
  alertas disparados e chamados de suporte abertos.
- **Painel:** o quadro na parede, mais o histórico guardado para consulta.
- **Ritual:** revisão toda segunda-feira entre Tecnologia e Operações.
- **Gatilho de ação:** dois alertas amarelos seguidos no mesmo dia viram
  investigação obrigatória — o código do Arduino conta isso e registra.

## 6. Conferência contra os critérios do enunciado

| Critério | Onde é atendido |
|---|---|
| Logo | Símbolo em SVG: um V que também é o sinal de confirmado |
| Missão, visão e valores | Seção A empresa |
| Objetivos | Tabela com prazo, meta e indicador de cada um |
| Organograma | Diagrama de quatro áreas com seus times |
| Inovação e capacidade de se reinventar | Quatro rotinas fixas, na seção A empresa |
| Seção de feedback dos clientes | Seção Avaliações, com média e distribuição |
| Formulário de contato | Seção Contato, com validação e foco no erro |
| Sistema de avaliação | Nota de 1 a 5 mais comentário, que persiste no navegador |
| Design atrativo e alinhado à identidade | Sistema visual derivado do comprovante de Pix |
| Navegação fácil e intuitiva | Página única, sete âncoras, menu fixo |
| Conteúdo claro e informativo | Linguagem sem jargão, com analogia antes da explicação |
| Escolha eficiente da ferramenta | IoT resolve o problema central do negócio |
| Demonstração prática | Circuito no Tinkercad e app instalável na plateia |
| Benefícios claros | Tabela da seção 4, com indicador para cada um |

### O que ficou de fora

**Cadastro no OlaClick.** Foi decisão do grupo não usar a plataforma. Se o
professor cobrar essa entrega, ela pode ser feita à parte cadastrando os
planos da Velora como itens de catálogo.
