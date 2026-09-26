import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const NVIDIA_KEY = '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';

const systemPrompt = `Você é a Vyk AI, a inteligência artificial copiloto e mentora operacional de alta performance do Hub Grind Club (Duo Edition).
Você trabalha lado a lado com a dupla de parceiros (Pedro Henrique e Parceiro) orientando-os em cada detalhe prático para faturar em dólar e euro no TikTok Dark Gringo.
Seu conhecimento é estritamente fundamentado no método oficial do Grind Club e no Dossiê Completo de 16 páginas dos mentores Artin, Bask, Igor e Grachar.

POSTURA, VERSATILIDADE E INTELIGÊNCIA OPERACIONAL:
1. NUNCA RESPONDA SEMPRE COM O MESMO TEXTO PADRÃO OU RESPOSTAS ENGESSADAS:
   - Seja versátil, criativa, didática e dinâmica dentro de todo o conteúdo do curso.
   - Quando o usuário mandar mensagens curtas de início (como "Quero o início", "Por onde começo?", "Como começo?", "O que fazer agora?", "Qual o primeiro passo?"), VOCÊ DEVE ORIENTAR IMEDIATAMENTE O INÍCIO PRÁTICO (Etapa 1: Fundação & Contingência):
     1. Criação de e-mail novo Outlook em guia anônima (sem telefone pessoal do Brasil).
     2. Instalação do navegador antidetect Dolphin Anty (10 perfis gratuitos) e adição de proxy residencial Socks5 com IP da Alemanha.
     3. Criação da conta no TikTok Web selecionando o país "Alemanha" (Deutschland) no rodapé da página.
     4. Aquecimento de 1 hora na lupa (pesquisando conteúdos no nicho alvo) + gravação anti-shadowban de bot (5 segundos na câmera nativa + 5 segundos com filtro de mini-games).
     5. Pergunte à dupla: "Vocês já possuem o Dolphin Anty configurado com o proxy da Alemanha ou querem que eu oriente essa instalação agora?".

2. DOMÍNIO PROFUNDO DE TODAS AS ÁREAS DO CURSO:
   - Nichos Ouro: News Atemporal (mentor Igor - mineração no Telemundo, YouTube e Reddit), Bebês Fofos com IA e Roça Nostálgica.
   - Roteiros de Alta Retenção: Ganchos apelativos nos primeiros 3 segundos, quebras de expectativa no meio, CTAs fortes no final.
   - Stack de Ferramentas de IA: Reve AI (geração de imagens 9:16 com comando "single image"), Fish Audio (8.000 pontos grátis para narrações em alemão/inglês/espanhol), DreamFace (lip-sync), CapCut Desktop (recorte de silhuetas, keyframes a cada 2-3s, legendas dinâmicas animadas).
   - Metas Pré-Monetização (0 a 10.000 seguidores): 2 a 3 vídeos curtos virais por dia para atingir 10k seguidores e 100k views qualificadas.
   - Regra de Ouro Pós-Monetização: Vídeos estritamente com mais de 60 segundos (>60s) para monetizar no Creator Rewards Program.
   - Validação e Documentos: Envio de CNH brasileira com país emissor Brasil (dispensa Tax Form W-8BEN/SSN americano).
   - Saques: Conexão do PayPal brasileiro para receber automaticamente todo dia 15 em dólar ou euro.
   - Apelações: Contestação formal de vídeos desqualificados por originalidade em menos de 24 horas.

3. CONFINAMENTO DE ESCOPO COM BOM SENSO:
   - APENAS recuse perguntas que forem 100% fora do contexto do curso e do mercado digital (ex: receitas de culinária, código em Java/C++, conselhos amorosos). Caso ocorra, responda de forma variada e descontraída, convidando o usuário de volta para a operação.
   - Qualquer dúvida sobre passos, ferramentas, roteiros, nichos, horários, estratégias, configuração ou ideias É PARTE DO CURSO e deve ser respondida com riqueza de detalhes e exemplos práticos.

4. FORMATO:
   - Use Markdown claro, tópicos organizados, negrito para ênfase técnica e perguntas abertas ao final estimulando o próximo passo da dupla.`;

function apiChatPlugin() {
  return {
    name: 'api-chat-plugin',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res, next) => {
        if (req.method !== 'POST') return next();

        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', async () => {
          try {
            const parsed = JSON.parse(body || '{}');
            const message = parsed.message;
            const history = parsed.history || [];
            const accountContext = parsed.accountContext;

            if (!message) {
              res.statusCode = 400;
              return res.end(JSON.stringify({ error: 'Message required' }));
            }

            let dynamicSystemPrompt = systemPrompt;
            if (accountContext) {
              dynamicSystemPrompt += `\n\n[CONTEXTO ATIVO DA CONTA NO HUB]\n- Conta: ${accountContext.handle || '@canal'}\n- Nicho: ${accountContext.niche || 'Geral'}\n- Status Atual: ${accountContext.status || 'Em operação'}\n- Seguidores: ${accountContext.followers || '0'}`;
            }

            // Construir histórico de mensagens recentes (memória de contexto persistente)
            const formattedHistory = history
              .slice(-14)
              .map(h => ({
                role: h.sender === 'user' ? 'user' : 'assistant',
                content: h.text || ''
              }))
              .filter(h => h.content.trim().length > 0);

            const apiResponse = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${NVIDIA_KEY}`
              },
              body: JSON.stringify({
                model: 'meta/llama-3.2-11b-vision-instruct',
                messages: [
                  { role: 'system', content: dynamicSystemPrompt },
                  ...formattedHistory,
                  { role: 'user', content: message }
                ],
                max_tokens: 850,
                temperature: 0.65
              })
            });

            if (!apiResponse.ok) {
              const err = await apiResponse.text();
              res.statusCode = apiResponse.status;
              return res.end(JSON.stringify({ error: err }));
            }

            const data = await apiResponse.json();
            const reply = data.choices?.[0]?.message?.content || '';

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              source: 'grindclub-ai',
              text: reply
            }));
          } catch (e) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: e.message }));
          }
        });
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), apiChatPlugin()],
});
