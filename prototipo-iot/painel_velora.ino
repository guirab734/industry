/*
 * Painel de Operação Velora — protótipo de Indústria 4.0
 * ------------------------------------------------------
 * Monitora a saúde da plataforma de pagamentos e avisa a sala de
 * operação sem depender de alguém estar olhando para uma tela.
 *
 * O que ele lê:
 *   - tempo de resposta da API (simulado por um potenciômetro)
 *   - temperatura do servidor (sensor TMP36)
 *
 * O que ele mostra:
 *   - LCD 16x2 com pagamentos por minuto, tempo de resposta e temperatura
 *   - LED verde  = normal
 *   - LED amarelo = atenção
 *   - LED vermelho = crítico
 *   - Buzzer toca enquanto o estado for crítico
 *
 * Monta e roda inteiro no Tinkercad, sem hardware físico.
 *
 * LIGAÇÕES
 *   LCD 16x2   RS->12  E->11  D4->5  D5->4  D6->3  D7->2
 *              VSS->GND  VDD->5V  RW->GND  A->5V  K->GND
 *              contraste (V0) no meio de um potenciômetro de 10k
 *   TMP36      esquerda->5V  meio->A0  direita->GND
 *   Potenciômetro (simula a latência)  ponta->5V  meio->A1  ponta->GND
 *   LED verde    -> D8  com resistor de 220 ohm
 *   LED amarelo  -> D9  com resistor de 220 ohm
 *   LED vermelho -> D10 com resistor de 220 ohm
 *   Buzzer       -> D7  e GND
 */

#include <LiquidCrystal.h>

LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

const int PINO_TEMPERATURA = A0;
const int PINO_LATENCIA    = A1;

const int LED_VERDE    = 8;
const int LED_AMARELO  = 9;
const int LED_VERMELHO = 10;
const int BUZZER       = 7;

/* Limites que definem cada estado.
   São os mesmos números publicados na seção Segurança do site. */
const int  LATENCIA_ATENCAO  = 500;   // ms
const int  LATENCIA_CRITICA  = 1500;  // ms
const float TEMP_ATENCAO     = 40.0;  // graus Celsius
const float TEMP_CRITICA     = 50.0;  // graus Celsius

/* Dois alertas amarelos seguidos viram investigação obrigatória:
   o contador existe para provar isso na apresentação. */
int contagemAtencao = 0;
int estadoAnterior  = -1;

const int NORMAL   = 0;
const int ATENCAO  = 1;
const int CRITICO  = 2;

void setup() {
  lcd.begin(16, 2);

  pinMode(LED_VERDE, OUTPUT);
  pinMode(LED_AMARELO, OUTPUT);
  pinMode(LED_VERMELHO, OUTPUT);
  pinMode(BUZZER, OUTPUT);

  Serial.begin(9600);

  lcd.print("VELORA  PAINEL");
  lcd.setCursor(0, 1);
  lcd.print("iniciando...");
  delay(1500);
  lcd.clear();
}

void loop() {
  float temperatura = lerTemperatura();
  int   latencia    = lerLatencia();
  int   pixPorMin   = estimarPixPorMinuto(latencia);
  int   estado      = avaliarEstado(latencia, temperatura);

  mostrarNoLcd(pixPorMin, latencia, temperatura);
  acionarLuzes(estado);
  acionarAlarme(estado);
  registrarTroca(estado, latencia, temperatura);

  delay(500);
}

/* TMP36: 10 mV por grau, com deslocamento de 500 mV em zero grau. */
float lerTemperatura() {
  int leitura = analogRead(PINO_TEMPERATURA);
  float volts = leitura * 5.0 / 1024.0;
  return (volts - 0.5) * 100.0;
}

/* O potenciômetro faz o papel da latência medida pela API:
   girar o eixo é o mesmo que a plataforma degradar. */
int lerLatencia() {
  int leitura = analogRead(PINO_LATENCIA);
  return map(leitura, 0, 1023, 80, 2500);  // ms
}

/* Quanto pior a latência, menos pagamentos fecham por minuto. */
int estimarPixPorMinuto(int latencia) {
  int estimado = map(latencia, 80, 2500, 1400, 120);
  return constrain(estimado, 0, 1400);
}

int avaliarEstado(int latencia, float temperatura) {
  if (latencia >= LATENCIA_CRITICA || temperatura >= TEMP_CRITICA) {
    return CRITICO;
  }
  if (latencia >= LATENCIA_ATENCAO || temperatura >= TEMP_ATENCAO) {
    return ATENCAO;
  }
  return NORMAL;
}

void mostrarNoLcd(int pixPorMin, int latencia, float temperatura) {
  lcd.setCursor(0, 0);
  lcd.print("PIX/MIN ");
  lcd.print(pixPorMin);
  lcd.print("     ");  // limpa sobra do valor anterior

  lcd.setCursor(0, 1);
  lcd.print("RESP ");
  lcd.print(latencia);
  lcd.print("ms ");
  lcd.print((int) temperatura);
  lcd.print("C    ");
}

void acionarLuzes(int estado) {
  digitalWrite(LED_VERDE,    estado == NORMAL);
  digitalWrite(LED_AMARELO,  estado == ATENCAO);
  digitalWrite(LED_VERMELHO, estado == CRITICO);
}

void acionarAlarme(int estado) {
  if (estado == CRITICO) {
    tone(BUZZER, 880);
  } else {
    noTone(BUZZER);
  }
}

/* Só escreve no monitor serial quando o estado muda de verdade,
   para o histórico não virar ruído. */
void registrarTroca(int estado, int latencia, float temperatura) {
  if (estado == estadoAnterior) return;

  Serial.print("Estado: ");
  Serial.print(nomeDoEstado(estado));
  Serial.print(" | latencia ");
  Serial.print(latencia);
  Serial.print(" ms | temp ");
  Serial.print(temperatura);
  Serial.println(" C");

  if (estado == ATENCAO) {
    contagemAtencao++;
    if (contagemAtencao >= 2) {
      Serial.println(">> Dois alertas seguidos: abrir investigacao.");
    }
  }
  if (estado == NORMAL) {
    contagemAtencao = 0;
  }

  estadoAnterior = estado;
}

const char* nomeDoEstado(int estado) {
  if (estado == CRITICO) return "CRITICO";
  if (estado == ATENCAO) return "ATENCAO";
  return "NORMAL";
}
