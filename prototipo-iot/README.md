# Protótipo IoT — Painel de Operação Velora

Protótipo da parte 2 do desafio: a ferramenta de Indústria 4.0 escolhida é
**Internet das Coisas (IoT)**, aplicada ao problema real da empresa.

## O problema

A Velora é um meio de pagamento por Pix, e Pix funciona 24 horas por dia.
A plataforma é vigiada por painéis dentro do computador — mas ninguém fica
olhando para uma tela de madrugada ou no fim de semana. Quando a plataforma
degrada, o tempo até alguém perceber é tempo de venda perdida do lojista.

## A solução

Um painel físico com Arduino, pendurado na parede da sala de operação. Ele
não depende de alguém abrir nada: a luz muda de cor e o alarme toca sozinho.

| Peça | Papel |
|---|---|
| Arduino Uno | cérebro do painel |
| Sensor TMP36 | mede a temperatura do servidor |
| Potenciômetro | simula a latência da API durante a demonstração |
| LCD 16×2 | pagamentos por minuto, tempo de resposta e temperatura |
| LED verde / amarelo / vermelho | estado da plataforma, visível de longe |
| Buzzer | alarme sonoro no estado crítico |

## Estados

| Cor | Critério | Ação |
|---|---|---|
| Verde | resposta < 500 ms e temperatura < 40 °C | nada a fazer |
| Amarelo | resposta entre 500 ms e 1,5 s, ou temperatura ≥ 40 °C | plantonista confere |
| Vermelho | resposta ≥ 1,5 s ou temperatura ≥ 50 °C | alarme dispara, plantão acionado |

Dois alertas amarelos seguidos viram investigação obrigatória — o código
conta isso e registra no monitor serial.

## Como montar no Tinkercad

1. Crie um circuito novo e adicione um **Arduino Uno R3**.
2. Faça as ligações descritas no cabeçalho de [`painel_velora.ino`](painel_velora.ino).
3. Troque o editor de código para **Texto** e cole o arquivo inteiro.
4. Clique em **Iniciar simulação**.
5. Gire o potenciômetro devagar: o LCD acompanha, o LED muda de verde para
   amarelo e depois vermelho, e o buzzer dispara. É essa a demonstração ao vivo.

## Como isso se liga ao site

Os limites usados aqui são os mesmos publicados na seção **Segurança** do
site, e o painel reproduzido lá na tela mostra o mesmo LCD e as mesmas três
luzes. O protótipo e o site contam a mesma história: a plataforma que
confirma o pagamento em menos de um segundo só consegue fazer isso porque
alguém está de olho nela o tempo todo.
