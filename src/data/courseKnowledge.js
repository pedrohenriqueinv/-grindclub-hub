// Base de conhecimento completa do curso Grind Club (Artin, Bask, Igor, Grachar)

export const QUICK_ACTIONS = [
  {
    id: 'start-zero',
    title: 'Começar do zero →',
    desc: 'Me guie passo a passo para criar minha primeira conta na Alemanha.',
    icon: 'book',
    prompt: 'Como criar uma conta na Alemanha? Me mostre o passo a passo completo.'
  },
  {
    id: 'script-video',
    title: 'Roteiro de vídeo →',
    desc: 'Gere 3 roteiros de News para eu editar no CapCut.',
    icon: 'barchart',
    prompt: 'Gere 3 roteiros de News no formato atemporal para eu editar no CapCut.'
  },
  {
    id: 'prompt-image',
    title: 'Prompts de imagem →',
    desc: 'Crie prompts em inglês para o Reve AI.',
    icon: 'image',
    prompt: 'Crie prompts em inglês de alta fidelidade para o Reve AI sem censura.'
  },
  {
    id: 'simulate-earnings',
    title: 'Simular ganhos →',
    desc: 'Calcule meu faturamento com base em 500K views e RPM de $0,80.',
    icon: 'dollar',
    prompt: 'Calcule meu faturamento com base em 500K views e RPM de $0,80.'
  }
];

export const POPULAR_TOPICS = [
  { title: 'Validação de identidade com CNH', prompt: 'Como funciona a validação de identidade usando CNH brasileira na conta da Alemanha?' },
  { title: 'Aquecimento de conta (1 hora)', prompt: 'Como fazer o aquecimento correto da conta por 1 hora na aba de pesquisa (lupa)?' },
  { title: 'Roteiros de News', prompt: 'Qual é o método do Igor para minerar repórter no YouTube e montar roteiros de notícias?' },
  { title: 'Prompts para Reve AI', prompt: 'Quais os melhores comandos e macetes para gerar imagens no Reve AI sem gastar créditos?' },
  { title: 'Como apelar um vídeo', prompt: 'Como recorrer de um vídeo desqualificado por conteúdo não original no TikTok Studio?' },
  { title: 'Configuração no Dolphin Anty', prompt: 'Como configurar os 10 perfis gratuitos do Dolphin Anty com proxy residencial da Alemanha?' },
  { title: 'Calcular RPM do meu nicho', prompt: 'Qual a diferença entre o RPM gringo e o brasileiro e como estimar os ganhos?' },
  { title: 'Estratégia pós-monetização', prompt: 'O que muda após monetizar? Por que os vídeos precisam ter mais de 1 minuto?' },
];

export const INITIAL_CHAT_MESSAGES = [
  {
    id: 'msg-1',
    sender: 'user',
    author: 'Pedro Henrique',
    avatar: 'PH',
    time: '14:21',
    text: 'Como criar uma conta na Alemanha? Me mostre o passo a passo completo.'
  },
  {
    id: 'msg-2',
    sender: 'ai',
    author: 'Vyk AI',
    avatar: 'logo',
    time: '14:21',
    text: 'Claro, Pedro! Vou te mostrar o passo a passo completo para criar uma conta na Alemanha seguindo o método do Grind Club.',
    card: {
      title: 'Passo a passo — Conta na Alemanha',
      steps: [
        'Criar e-mail no Outlook (novo e sem uso anterior)',
        'Acessar o TikTok Web e selecionar Alemanha como país',
        'Criar a conta e validar com número/telefone',
        'Gravar 5s na câmera nativa + 5s com mini-games filter',
        'Fazer 1 hora de aquecimento na aba de busca (lupa)'
      ],
      actions: [
        { label: 'Ver Tutorial Completo', actionType: 'tutorial', target: 'alemanha' },
        { label: 'Ver Prints', actionType: 'prints', target: 'alemanha' }
      ]
    }
  }
];

export const TUTORIALS_DATA = [
  {
    id: 'alemanha',
    title: 'Criação de Conta Gringa com Diretriz da Alemanha',
    subtitle: 'O Segredo para burlar o Tax Form americano e receber via PayPal brasileiro',
    steps: [
      {
        num: 1,
        title: 'Criação do E-mail Outlook',
        desc: 'Abra uma aba anônima no navegador e acesse outlook.com. Crie uma conta de e-mail nova. O Outlook não costuma exigir número de telefone no cadastro inicial. Lembre-se de vincular um e-mail secundário para segurança.'
      },
      {
        num: 2,
        title: 'Seleção do País Alemanha no TikTok Web',
        desc: 'Acesse tiktok.com em aba limpa ou pelo navegador antidetect. Na parte inferior da tela de login/cadastro, localize o seletor onde consta Brasil e altere manualmente para Alemanha (Deutschland). Isso garante que o TikTok defina a diretriz europeia para a sua conta.',
        image: '/media/tiktok_signup_alemanha.jpg'
      },
      {
        num: 3,
        title: 'Verificação Anti-Shadowban (Câmera Nativa + Mini-Games)',
        desc: 'No primeiro login no celular, abra a câmera nativa do app do TikTok e grave 5 segundos filmando qualquer lugar (pode salvar em rascunhos). Em seguida, procure na lupa por "mini-games filter" e grave 5 segundos com o filtro interativo. Isso envia telemetria de hardware real para o algoritmo descartar suspeitas de bot.',
        image: '/media/aquecimento.jpg'
      },
      {
        num: 4,
        title: 'Aquecimento na Lupa por 1 Hora',
        desc: 'Navegue 1 hora na conta usando exclusivamente a ferramenta de busca (lupa), pesquisando apenas assuntos do seu nicho. Assista vídeos até o fim, curta alguns e salve referências. Quando sua For You Page (FYP) entregar 100% de conteúdos do nicho, a conta está aquecida.'
      }
    ],
    prints: [
      { title: 'Seleção da Alemanha no TikTok Web', path: '/media/tiktok_signup_alemanha.jpg' },
      { title: 'Aquecimento na Prática via Lupa', path: '/media/aquecimento.jpg' }
    ]
  },
  {
    id: 'paypal',
    title: 'Cadastro de Documento CNH e Conexão com PayPal',
    subtitle: 'Como aprovar identidade e receber pagamentos todo dia 15',
    steps: [
      {
        num: 1,
        title: 'Acessar o Programa de Recompensas do Criador',
        desc: 'Após atingir 10k seguidores e 100k visualizações nos últimos 30 dias, acesse o TikTok Studio e clique no banner azul do Programa de Recompensas do Criador.'
      },
      {
        num: 2,
        title: 'Verificação de Identidade com CNH Brasileira',
        desc: 'Na tela de seleção de país emissor, escolha Brasil! O TikTok Alemanha aceita documentos brasileiros oficiais. Selecione Carteira de Habilitação (CNH) e envie foto nítida frente e verso.',
        image: '/media/paypal_doc.jpg'
      },
      {
        num: 3,
        title: 'Conexão com PayPal Brasileiro',
        desc: 'Na segunda etapa, o sistema alemão NÃO pede formulário fiscal dos EUA (W-8BEN/SSN). Basta clicar em configurar método de pagamento, fazer login na sua conta do PayPal brasileiro e autorizar a conexão.',
        image: '/media/paypal_connect.jpg'
      },
      {
        num: 4,
        title: 'Recebimento todo dia 15',
        desc: 'Os pagamentos em Dólar e Euro são transferidos automaticamente todo dia 15 do mês seguinte diretamente para o seu PayPal, com saque automático para seu banco brasileiro.',
        image: '/media/resultados_paypal.jpg'
      }
    ],
    prints: [
      { title: 'Seleção da CNH Brasileira no TikTok Alemanha', path: '/media/paypal_doc.jpg' },
      { title: 'Conexão do PayPal no Programa de Recompensas', path: '/media/paypal_connect.jpg' },
      { title: 'Pagamento de R$ 44.566,92 recebido dia 15', path: '/media/resultados_paypal.jpg' }
    ]
  },
  {
    id: 'contingencia',
    title: 'Navegadores Antidetect: Dolphin Anty & AdsPower',
    subtitle: 'Isolamento de impressões digitais e gerenciamento de múltiplos perfis com proxy',
    steps: [
      {
        num: 1,
        title: 'Dolphin Anty (10 Perfis Grátis)',
        desc: 'Baixe o Dolphin Anty e crie sua conta no plano gratuito (10 perfis inclusos para sempre). Crie um perfil escolhendo SO correspondente e configure o proxy residencial da Alemanha no formato IP:Porta:Usuário:Senha.',
        image: '/media/dolphin.jpg'
      },
      {
        num: 2,
        title: 'AdsPower com IP2Location',
        desc: 'No AdsPower, crie novo perfil, selecione o verificador IP2Location e adicione proxy Socks5/HTTP com a tag "Proxy Alemanha". Faça a verificação de IP antes de iniciar o navegador.',
        image: '/media/adspower.jpg'
      },
      {
        num: 3,
        title: 'Escala com VMOS Cloud',
        desc: 'Para quem opera dezenas de contas, utilize o VMOS Cloud para ter celulares Android na nuvem rodando 24/7 com o app OwlProxy ativado.',
        image: '/media/resultados_tiktok.jpg'
      }
    ],
    prints: [
      { title: 'Interface de Proxies no AdsPower', path: '/media/adspower.jpg' },
      { title: 'Gerenciador de Perfis Dolphin Anty', path: '/media/dolphin.jpg' },
      { title: 'Fazenda de Celulares Virtuais no VMOS Cloud', path: '/media/resultados_tiktok.jpg' }
    ]
  },
  {
    id: 'ferramentas-ia',
    title: 'Ferramentas de IA para Produção de Vídeos',
    subtitle: 'Fish Audio, DreamFace, Reve AI, CapCut e Extensão de Mineração',
    steps: [
      {
        num: 1,
        title: 'Fish Audio — Texto para Fala Ultra Realista',
        desc: 'Faça login com Google no fish.audio e ganhe 8.000 pontos gratuitos (suficiente para monetizar uma conta). Escolha vozes nativas em inglês/alemão/espanhol para a narração.',
        image: '/media/fishaudio.jpg'
      },
      {
        num: 2,
        title: 'DreamFace — Sincronização Labial (Lip Sync)',
        desc: 'No dreamfaceapp.com, envie a foto do seu personagem e faça o upload do áudio gerado no Fish Audio. O sistema sincroniza lábios e expressões faciais automaticamente.',
        image: '/media/dreamface.jpg'
      },
      {
        num: 3,
        title: 'Reve AI — Personagens e Imagens sem Censura',
        desc: 'No app.reve.com, gere imagens de celebridades e autoridades usando referências. Sempre inclua no prompt a instrução "uma única imagem no formato 9:16" para economizar créditos diários.',
        image: '/media/reveai.jpg'
      },
      {
        num: 4,
        title: 'Extensão Sort Feed for TikTok',
        desc: 'Instale a extensão no Chrome para ver taxa de engajamento, salvamentos, compartilhamentos e baixar vídeos sem marca d água ou áudios MP3 direto no feed.',
        image: '/media/extensao_3.jpg'
      },
      {
        num: 5,
        title: 'Edição Dinâmica no CapCut Desktop',
        desc: 'No CapCut Desktop, remova o fundo do personagem com recorte automático ou chroma key, adicione zooms na timeline a cada 2 a 3 segundos, legendas automáticas e efeitos sonoros de transição.',
        image: '/media/nicho_diferenca_capcut.jpg'
      }
    ],
    prints: [
      { title: 'Fish Audio com 8.000 Pontos Grátis', path: '/media/fishaudio.jpg' },
      { title: 'DreamFace Gerador de Avatar Lip Sync', path: '/media/dreamface.jpg' },
      { title: 'Reve AI Geração de Personagens', path: '/media/reveai.jpg' },
      { title: 'Extensão Sort Feed no Feed do TikTok', path: '/media/extensao_3.jpg' },
      { title: 'Timeline de Edição no CapCut Desktop', path: '/media/nicho_diferenca_capcut.jpg' }
    ]
  }
];
