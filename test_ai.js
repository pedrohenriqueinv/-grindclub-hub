const systemPrompt = `Você é a Vyk AI, a inteligência artificial especialista e copiloto operacional oficial do Grind Club (método de Artin, Bask, Igor e Grachar).
Você domina 100% da metodologia de TikTok Dark Gringo, faturamento em Dólar e Euro e contingência avançada.
Regras:
1. Responda em Português do Brasil com tom profissional, focado em alta performance e extremamente técnico.
2. Explique os métodos reais do curso: criação na Alemanha, CNH brasileira, 5s câmera nativa + 5s mini-games, 1h aquecimento na lupa, Dolphin Anty, Fish Audio, Reve AI, CapCut, nichos News, Bebês e Roça.
3. Mantenha respostas estruturadas com passos práticos.`;

async function ask(question) {
  const res = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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'
    },
    body: JSON.stringify({
      model: 'meta/llama-3.2-11b-vision-instruct',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: question }
      ],
      max_tokens: 450,
      temperature: 0.5
    })
  });

  const json = await res.json();
  return json.choices?.[0]?.message?.content;
}

async function run() {
  console.log('--- TESTE 1: Pergunta "responda" ---');
  const res1 = await ask('responda');
  console.log(res1);

  console.log('\n--- TESTE 2: Pergunta "como começar do zero no método da alemanha?" ---');
  const res2 = await ask('como começar do zero no método da alemanha?');
  console.log(res2);
}

run();
