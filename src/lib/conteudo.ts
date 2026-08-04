/**
 * Todo o conteúdo institucional do site em um lugar só.
 * Os números são de referência para a apresentação — revise antes de
 * publicar em domínio de produção.
 */

export const empresa = {
  nome: "Velora",
  nomeCompleto: "VeloraPay",
  site: "velorapay.com.br",
  email: "contato@velorapay.com.br",
  posicionamento:
    "A Velora é o caminho que o dinheiro percorre entre quem compra e quem vende.",
};

export const navegacao = [
  { id: "inicio", rotulo: "Início" },
  { id: "como-funciona", rotulo: "Como funciona" },
  { id: "empresa", rotulo: "A empresa" },
  { id: "seguranca", rotulo: "Segurança" },
  { id: "avaliacoes", rotulo: "Avaliações" },
  { id: "contato", rotulo: "Contato" },
] as const;

/* ---------------------------------------------------------------- */
/* Como funciona — a explicação para quem nunca ouviu falar em gateway */
/* ---------------------------------------------------------------- */

export const passos = [
  {
    titulo: "O cliente escolhe pagar com Pix",
    texto:
      "Na hora de fechar a compra, ele clica em Pix. Nada é instalado, nada é baixado.",
  },
  {
    titulo: "A Velora gera a cobrança",
    texto:
      "Em menos de um segundo aparece um QR Code e um código para copiar. Cada cobrança é única e vale para aquela compra só.",
  },
  {
    titulo: "O cliente paga pelo banco dele",
    texto:
      "Ele abre o aplicativo do próprio banco, aponta a câmera ou cola o código e confirma. O dinheiro sai da conta dele.",
  },
  {
    titulo: "A loja recebe e é avisada na hora",
    texto:
      "O dinheiro entra na conta do lojista e a Velora avisa a loja no mesmo instante, para o pedido já sair da fila.",
  },
];

export const analogia = {
  pergunta: "O que é um gateway de pagamento, sem termo técnico?",
  resposta:
    "É o caixa da loja, só que na internet. No comércio de rua, o caixa recebe o dinheiro, confere se está tudo certo e avisa o vendedor que pode entregar. A Velora faz exatamente isso em uma loja online: recebe o Pix, confere e avisa. A diferença é que ela faz isso em menos de um segundo, sem ninguém operando, a qualquer hora do dia.",
};

export const semVelora = [
  "O lojista manda a chave Pix por mensagem",
  "O cliente paga e envia um print do comprovante",
  "Alguém confere o extrato na mão para ver se caiu",
  "O pedido só sai depois que essa conferência acontece",
];

export const comVelora = [
  "A cobrança é gerada sozinha, com valor certo",
  "O pagamento é reconhecido automaticamente",
  "A loja é avisada no mesmo segundo",
  "Ninguém precisa conferir extrato",
];

/* ---------------------------------------------------------------- */
/* A empresa                                                         */
/* ---------------------------------------------------------------- */

export const missao =
  "Fazer o pagamento pela internet ser tão simples quanto entregar uma nota de dinheiro na mão do vendedor — rápido, sem taxa escondida e sem exigir que o lojista entenda de tecnologia.";

export const visao =
  "Ser, até 2031, a forma de receber pela internet mais confiável do país para o pequeno e médio lojista, com o dinheiro na conta dele no mesmo dia da venda.";

export const valores = [
  {
    titulo: "O dinheiro é do lojista",
    texto:
      "O que foi vendido hoje é repassado hoje. A Velora não segura dinheiro de terceiro para render.",
  },
  {
    titulo: "Tarifa na cara",
    texto:
      "O preço fica publicado no site. Sem letra miúda, sem taxa que aparece só na fatura.",
  },
  {
    titulo: "Estar no ar é respeito",
    texto:
      "Cada minuto fora do ar é uma venda que o lojista perde. Tratamos disso como o problema mais grave que existe aqui.",
  },
  {
    titulo: "Simples por padrão",
    texto:
      "Se para usar precisa de manual, foi mal feito. O lojista tem que conseguir sozinho.",
  },
  {
    titulo: "Segurança sem pedir",
    texto:
      "Proteção contra fraude vem ligada desde o primeiro dia, não como item pago à parte.",
  },
];

export const objetivos = [
  {
    prazo: "Curto",
    janela: "6 meses",
    meta: "Manter a plataforma no ar 99,9% do tempo",
    indicador: "% de minutos disponíveis no mês",
  },
  {
    prazo: "Curto",
    janela: "6 meses",
    meta: "Confirmar 95% dos pagamentos em menos de 2 segundos",
    indicador: "tempo entre pagar e a loja ser avisada",
  },
  {
    prazo: "Curto",
    janela: "6 meses",
    meta: "Colocar um lojista novo para vender em até 24 horas",
    indicador: "horas entre cadastro e primeira cobrança",
  },
  {
    prazo: "Médio",
    janela: "2 anos",
    meta: "Chegar a 1.000 lojistas ativos",
    indicador: "nº de lojas com venda no mês",
  },
  {
    prazo: "Médio",
    janela: "2 anos",
    meta: "Reduzir em 40% os chamados de suporte por lojista",
    indicador: "chamados ÷ lojistas ativos",
  },
  {
    prazo: "Médio",
    janela: "2 anos",
    meta: "Repassar em D+0 para todo lojista aprovado",
    indicador: "% de repasses no mesmo dia",
  },
  {
    prazo: "Longo",
    janela: "5 anos",
    meta: "Aceitar também boleto e cartão, na mesma integração",
    indicador: "nº de meios de pagamento ativos",
  },
  {
    prazo: "Longo",
    janela: "5 anos",
    meta: "Obter certificação formal de segurança",
    indicador: "PCI DSS e ISO 27001",
  },
];

export const areas = [
  {
    nome: "Tecnologia e Produto",
    resumo: "Constrói e mantém a plataforma",
    times: ["Desenvolvimento", "Infraestrutura", "Dados e monitoramento"],
  },
  {
    nome: "Operações e Pagamentos",
    resumo: "Cuida do dinheiro entrando e saindo",
    times: ["Conciliação", "Repasses", "Suporte ao lojista"],
  },
  {
    nome: "Comercial e Parcerias",
    resumo: "Traz e acompanha os lojistas",
    times: ["Vendas", "Contas estratégicas", "Marketing"],
  },
  {
    nome: "Risco e Compliance",
    resumo: "Impede que a fraude passe",
    times: ["Antifraude", "Prevenção à lavagem", "Jurídico"],
  },
];

export const notaOrganograma =
  "Dados e monitoramento existir como time próprio, e não como tarefa de alguém nas horas vagas, é o que coloca a Velora dentro da Indústria 4.0: a decisão sai do número medido, não do achismo.";

export const inovacao = [
  {
    titulo: "Bandeja de teste permanente",
    texto:
      "Toda mudança grande vai primeiro para um grupo pequeno de lojistas voluntários antes de valer para todo mundo. Se quebrar, quebra para dez e não para mil.",
  },
  {
    titulo: "Revisão de incidente sem culpado",
    texto:
      "Toda queda vira um documento que descreve o que aconteceu e o que muda para não repetir. O documento é aberto para a empresa inteira.",
  },
  {
    titulo: "Número na mesa toda semana",
    texto:
      "Tempo de confirmação, disponibilidade e chamados de suporte são revisados semanalmente. Meta que não está sendo batida vira tarefa com responsável.",
  },
  {
    titulo: "O suporte manda no roadmap",
    texto:
      "O motivo mais repetido nos chamados do trimestre vira item obrigatório do trimestre seguinte. É o cliente escrevendo o que a gente constrói.",
  },
];

/* ---------------------------------------------------------------- */
/* Segurança e monitoramento                                         */
/* ---------------------------------------------------------------- */

export const seguranca = [
  {
    titulo: "A Velora não guarda a senha de ninguém",
    texto:
      "Quem digita a senha é o cliente, dentro do aplicativo do próprio banco dele. Essa informação nunca passa pela Velora.",
  },
  {
    titulo: "Cada cobrança serve uma vez",
    texto:
      "O código gerado vale para aquele pedido, com aquele valor. Não dá para reaproveitar nem alterar o valor depois.",
  },
  {
    titulo: "Padrão estranho acende alerta",
    texto:
      "Muitas tentativas seguidas, valor fora do normal da loja ou horário atípico levantam a mão automaticamente para revisão.",
  },
  {
    titulo: "Tudo fica registrado",
    texto:
      "Cada cobrança guarda quando foi criada, quando foi paga e quanto tempo levou. Dá para reconstruir qualquer venda depois.",
  },
];

export const prototipo = {
  problema:
    "A plataforma é vigiada por painéis dentro do computador. O problema é que ninguém fica olhando para um painel o dia inteiro — e o Pix funciona 24 horas por dia, inclusive de madrugada e no fim de semana.",
  solucao:
    "Um painel físico, montado com Arduino, que fica ligado na parede da sala de operação. Ele não depende de alguém abrir uma tela: a luz muda de cor e o alarme toca sozinho.",
  componentes: [
    { peca: "Arduino Uno", papel: "o cérebro do painel" },
    { peca: "Sensor de temperatura", papel: "mede o calor do servidor" },
    { peca: "Display LCD 16×2", papel: "mostra pagamentos por minuto e tempo de resposta" },
    { peca: "LED verde, amarelo e vermelho", papel: "estado da plataforma, visível de longe" },
    { peca: "Buzzer", papel: "alarme sonoro quando passa do limite" },
  ],
  estados: [
    {
      cor: "verde" as const,
      titulo: "Normal",
      criterio: "Resposta abaixo de 500 ms e temperatura sob controle",
      acao: "Nada a fazer",
    },
    {
      cor: "amarelo" as const,
      titulo: "Atenção",
      criterio: "Resposta entre 500 ms e 1,5 s, ou servidor esquentando",
      acao: "O plantonista confere antes de virar problema",
    },
    {
      cor: "vermelho" as const,
      titulo: "Crítico",
      criterio: "Resposta acima de 1,5 s, falha de confirmação ou calor excessivo",
      acao: "Alarme dispara e o plantão é acionado na hora",
    },
  ],
  beneficios: [
    { beneficio: "Menos tempo fora do ar", numero: "de 43 min para menos de 5 min por mês" },
    { beneficio: "Problema visto antes de virar queda", numero: "alerta em média 8 min antes da falha" },
    { beneficio: "Ninguém depende de estar olhando a tela", numero: "cobertura 24 h, inclusive de madrugada" },
    { beneficio: "Venda que deixaria de acontecer", numero: "cada minuto no ar é pedido que não cai" },
    { beneficio: "Manutenção antes da quebra", numero: "aquecimento anormal indica peça no fim da vida" },
    { beneficio: "Histórico para decidir", numero: "todo alerta fica registrado com data e causa" },
  ],
  monitoramento: [
    "Indicadores da semana: disponibilidade, tempo médio de confirmação, alertas disparados e chamados abertos.",
    "Painel: o próprio quadro na parede, mais o histórico guardado para consulta.",
    "Ritual: revisão toda segunda-feira entre Tecnologia e Operações.",
    "Gatilho: dois alertas amarelos seguidos no mesmo dia viram investigação obrigatória.",
  ],
};

/* ---------------------------------------------------------------- */
/* Avaliações iniciais — sementes exibidas antes da primeira visita   */
/* ---------------------------------------------------------------- */

export type Avaliacao = {
  id: string;
  nome: string;
  papel: string;
  nota: number;
  comentario: string;
  data: string;
};

export const avaliacoesIniciais: Avaliacao[] = [
  {
    id: "seed-1",
    nome: "Marina Alcântara",
    papel: "Doceria do Bairro",
    nota: 5,
    comentario:
      "Antes eu conferia o extrato a cada pedido para saber se tinha caído. Agora o sistema avisa sozinho e eu só faço o doce.",
    data: "2026-07-12",
  },
  {
    id: "seed-2",
    nome: "Rafael Nunes",
    papel: "Loja de peças",
    nota: 5,
    comentario:
      "Coloquei no ar num sábado à tarde e no domingo já tinha venda entrando. Não precisei chamar ninguém para configurar.",
    data: "2026-07-03",
  },
  {
    id: "seed-3",
    nome: "Camila Ferraz",
    papel: "Estúdio de tatuagem",
    nota: 4,
    comentario:
      "O recebimento é rápido e o suporte responde. Só senti falta de um relatório mensal mais mastigado para o contador.",
    data: "2026-06-21",
  },
  {
    id: "seed-4",
    nome: "Diego Sampaio",
    papel: "Mercado online",
    nota: 5,
    comentario:
      "O que mudou o jogo foi o repasse no mesmo dia. Melhorou meu caixa de um jeito que eu não esperava de um meio de pagamento.",
    data: "2026-06-09",
  },
  {
    id: "seed-5",
    nome: "Priscila Tavares",
    papel: "Ateliê de roupas",
    nota: 4,
    comentario:
      "Simples de entender, e eu não entendo nada de tecnologia. Foi o primeiro sistema que consegui configurar sem ajuda.",
    data: "2026-05-28",
  },
];
