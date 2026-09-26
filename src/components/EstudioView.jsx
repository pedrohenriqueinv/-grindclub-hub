import React, { useState } from 'react';
import { Wand2, Copy, Check, Sparkles, FileText, Image as ImageIcon } from 'lucide-react';

export default function EstudioView() {
  const [selectedFormat, setSelectedFormat] = useState('news');
  const [topicInput, setTopicInput] = useState('');
  const [generatedScript, setGeneratedScript] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e) => {
    e.preventDefault();
    const topic = topicInput || 'Notícia Impactante de Última Hora';

    let script = '';
    if (selectedFormat === 'news') {
      script = `[FORMATO: NEWS ATEMPORAL (Mentor Igor)]
TEMA: ${topic}
ÂNCORA/REPÓRTER: Take recortado do Noticias Telemundo / IA

[00:00 - 00:03] GANCHO DE RETENÇÃO (Repórter olhando para câmera):
"O que acaba de acontecer chocou as autoridades e está dividindo a opinião pública no mundo inteiro!"

[00:04 - 00:20] DESENVOLVIMENTO DO FATO (Imagens dramáticas geradas no Google Flow):
"${topic}. Imagens revelam que os envolvidos não esperavam essa reação imediata. A investigação preliminar aponta para consequências sem precedentes nas próximas semanas."

[00:21 - 00:45] TENSÃO & DETALHES (Cenas com zooms e sound effects de woosh):
"Testemunhas locais afirmam que a situação escalou rapidamente. Enquanto parte da população condena a atitude, especialistas afirmam que o caso pode abrir um precedente histórico."

[00:46 - 01:05] CTA & PERGUNTA DE COMENTÁRIOS:
"E na sua opinião, isso foi um ato de coragem ou irresponsabilidade? Deixe seu comentário aqui embaixo e siga para atualizações urgentes!"`;
    } else if (selectedFormat === 'diferenca') {
      script = `[FORMATO: QUAL A DIFERENÇA? (Mentor Grachar)]
TEMA: ${topic}
PERSONAGEM: Avatar apontando para ambos os lados da tela

[00:00 - 00:05] GANCHO (Personagem no centro):
"Você realmente sabe a diferença entre ${topic}? Aposto que 90% das pessoas erram essa resposta!"

[00:06 - 00:25] ELEMENTO A (Personagem aponta para a ESQUERDA + Efeito Woosh):
"Primeiro, o elemento A se destaca pelas suas características únicas de adaptação, formato da carcaça e peso superior, sendo encontrado predominantemente em áreas continentais."

[00:26 - 00:48] ELEMENTO B (Personagem aponta para a DIREITA + Efeito Ding):
"Já o elemento B possui uma anatomia completamente voltada para hidrodinâmica, garras reduzidas e hábitos alimentares exclusivamente carnívoros."

[00:49 - 01:05] CONCLUSÃO & CTA:
"Qual dos dois você achava que era o mais perigoso? Comente abaixo e já segue a página para mais comparações incríveis!"`;
    } else {
      script = `[FORMATO: BEBÊS FOFOS / ROÇA]
TEMA: ${topic}
VOZ: Fish Audio infantil/afetuosa + Lip Sync DreamFace

"Olha que fofura! Você teria coragem de passar direto sem deixar um coraçãozinho para mim? Deixe um comentário de carinho e compartilhe com alguém que precisa de alegria hoje!"`;
    }

    setGeneratedScript(script);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 bg-[#080b11] h-screen overflow-y-auto p-8 space-y-8">
      <div className="border-b border-[#1e2638] pb-6">
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Estúdio Criativo de Roteiros & Prompts</h1>
        <p className="text-xs text-slate-400 mt-1">
          Gere roteiros estruturados para bater +60s de retenção e prompts fotográficos sem censura
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl">
        {/* Formulário de Criação */}
        <div className="bg-[#0f141f] border border-[#1e2638] rounded-2xl p-6 space-y-5">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Wand2 size={16} className="text-slate-300" />
            <span>Configurar Criação</span>
          </h2>

          <div className="space-y-3">
            <label className="text-xs text-slate-400 block">Escolha o Formato do Nicho Ouro:</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSelectedFormat('news')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                  selectedFormat === 'news'
                    ? 'bg-white text-black border-white shadow-sm'
                    : 'bg-[#121927] text-slate-400 border-[#1e2638]'
                }`}
              >
                News Atemporal
              </button>

              <button
                type="button"
                onClick={() => setSelectedFormat('diferenca')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                  selectedFormat === 'diferenca'
                    ? 'bg-white text-black border-white shadow-sm'
                    : 'bg-[#121927] text-slate-400 border-[#1e2638]'
                }`}
              >
                Qual a Diferença?
              </button>

              <button
                type="button"
                onClick={() => setSelectedFormat('viral')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                  selectedFormat === 'viral'
                    ? 'bg-white text-black border-white shadow-sm'
                    : 'bg-[#121927] text-slate-400 border-[#1e2638]'
                }`}
              >
                Bebês / Roça
              </button>
            </div>
          </div>

          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1">
                Tema ou Notícia Minerada (ou link transcrito):
              </label>
              <textarea
                rows={4}
                value={topicInput}
                onChange={(e) => setTopicInput(e.target.value)}
                placeholder="Ex: Tartaruga marinha vs Jabuti gigante da floresta, ou Caso da atleta polêmica..."
                className="w-full bg-[#121927] border border-[#1e2638] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-slate-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-white hover:bg-slate-200 text-black font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all"
            >
              <Sparkles size={16} />
              <span>Gerar Roteiro Autoral de Alta Retenção</span>
            </button>
          </form>
        </div>

        {/* Preview do Roteiro Gerado */}
        <div className="bg-[#0f141f] border border-[#1e2638] rounded-2xl p-6 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-[#1e2638] pb-3">
            <span className="text-xs font-bold text-white flex items-center gap-2">
              <FileText size={15} className="text-slate-300" />
              <span>Roteiro Pronto para o CapCut</span>
            </span>

            {generatedScript && (
              <button
                onClick={copyToClipboard}
                className="px-3 py-1 rounded-lg bg-[#141b29] hover:bg-[#1a2336] text-xs font-semibold text-white flex items-center gap-1.5 transition-colors border border-[#1e2638]"
              >
                {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                <span>{copied ? 'Copiado!' : 'Copiar Roteiro'}</span>
              </button>
            )}
          </div>

          <div className="flex-1 bg-[#080b11] border border-[#1e2638] rounded-xl p-4 overflow-y-auto max-h-96">
            {generatedScript ? (
              <pre className="text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed">
                {generatedScript}
              </pre>
            ) : (
              <div className="h-full flex items-center justify-center text-center text-xs text-slate-500 p-8">
                Preencha o tema e clique em Gerar para ver o roteiro com marcações de cortes e áudios.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
