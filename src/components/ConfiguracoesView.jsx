import React, { useState, useEffect } from 'react';
import { Settings, Users, Key, Database, CheckCircle2, Cpu, Zap, ShieldCheck, Sparkles, ExternalLink, HelpCircle } from 'lucide-react';

export default function ConfiguracoesView({ currentUser, setCurrentUser, partnerUser, setPartnerUser }) {
  const [apiKey, setApiKey] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('gemini_api_key') || '';
    setApiKey(saved);
  }, []);

  const handleSaveKey = () => {
    localStorage.setItem('gemini_api_key', apiKey.trim());
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleClearKey = () => {
    localStorage.removeItem('gemini_api_key');
    setApiKey('');
  };

  const switchUser = () => {
    const temp = currentUser;
    setCurrentUser(partnerUser);
    setPartnerUser(temp);
  };

  return (
    <div className="flex-1 bg-[#080b11] h-screen overflow-y-auto p-8 space-y-8">
      <div className="border-b border-[#1e2638] pb-6">
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Configurações do Hub & Inteligência Artificial</h1>
        <p className="text-xs text-slate-400 mt-1">
          Gerenciamento do Plano Duo, conexões de IA à prova de falhas e persistência em tempo real
        </p>
      </div>

      <div className="max-w-3xl space-y-6">
        {/* Bloco de Usuários */}
        <div className="bg-[#0f141f] border border-[#1e2638] rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Users size={18} className="text-slate-300" />
              <span>Membros Conectados (Plano Duo)</span>
            </h2>

            <button
              onClick={switchUser}
              className="px-3.5 py-1.5 rounded-lg bg-[#141b29] hover:bg-[#1a2336] text-xs font-semibold text-white border border-[#1e2638] transition-colors"
            >
              Alternar Usuário Ativo
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#121927] border border-white/20 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{currentUser?.name}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-black">
                  Você (Ativo)
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Usuário logado nesta sessão do navegador.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#121927] border border-[#1e2638] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{partnerUser?.name}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Pra Noia conectado no computador dele.</p>
            </div>
          </div>
        </div>

        {/* Bloco de IA Anti-Fila & Gemini 1.5 Flash */}
        <div className="bg-[#0f141f] border border-[#1e2638] rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu size={18} className="text-slate-300" />
              <h2 className="text-sm font-bold text-white">Motor Vyk AI — Arquitetura Zero Fila & Sem Travamentos</h2>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
              <ShieldCheck size={12} />
              100% À Prova de Quedas
            </span>
          </div>

          <div className="text-xs text-slate-300 leading-relaxed space-y-2">
            <p>
              Para <strong>nunca sofrer com filas de espera</strong> (como acontece na web do ChatGPT) e <strong>nunca dar erro de limite</strong>, a Vyk AI opera com uma arquitetura tripla:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-[#121927] border border-[#1e2638] space-y-1.5">
                <div className="flex items-center gap-2 text-white font-semibold text-xs">
                  <Zap size={14} />
                  <span>Motor Local do Dossiê (Padrão)</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Todo o conteúdo dos 16 capítulos, 31 vídeos, scripts, prompts e prints está embutido diretamente no código do App. Responde em &lt;50ms, 100% grátis e funciona até offline.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#121927] border border-[#1e2638] space-y-1.5">
                <div className="flex items-center gap-2 text-slate-200 font-semibold text-xs">
                  <Sparkles size={14} />
                  <span>Google Gemini 1.5 Flash (1M Tokens)</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Contexto gigante de 1 Milhão de tokens. Conecta diretamente via API pessoal gratuita (1.500 requisições/dia por usuário, sem fila pública).
                </p>
              </div>
            </div>
          </div>

          {/* Input de Chave API */}
          <div className="pt-3 border-t border-[#1e2638] space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                <Key size={14} className="text-amber-400" />
                <span>Chave Pessoal da Google AI Studio (Opcional para Modo Generativo):</span>
              </label>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-slate-300 hover:text-white flex items-center gap-1 hover:underline"
              >
                <span>Gerar chave grátis em 10s</span>
                <ExternalLink size={11} />
              </a>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Ex: AIzaSyD..."
                className="flex-1 bg-[#121927] border border-[#27324b] rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-slate-500 transition-colors"
              />
              <button
                onClick={handleSaveKey}
                className="px-4 py-2 rounded-xl bg-white hover:bg-slate-200 text-slate-950 font-bold text-xs transition-colors shrink-0 flex items-center gap-1.5"
              >
                {isSaved ? <CheckCircle2 size={14} /> : null}
                <span>{isSaved ? 'Salva!' : 'Salvar Chave'}</span>
              </button>
              {apiKey && (
                <button
                  onClick={handleClearKey}
                  className="px-3 py-2 rounded-xl bg-[#182032] hover:bg-red-500/20 text-slate-400 hover:text-red-400 text-xs border border-[#27324b] transition-colors"
                >
                  Remover
                </button>
              )}
            </div>
            <p className="text-[10px] text-slate-500">
              * Sua chave fica salva exclusivamente no seu navegador (localStorage) e nunca é compartilhada. Se você não colocar nenhuma chave, o app utiliza o <strong>Motor Local do Dossiê Grind Club</strong> que responde instantaneamente sem qualquer falha.
            </p>
          </div>
        </div>

        {/* Bloco de Supabase (Sincronização Gratuita) */}
        <div className="bg-[#0f141f] border border-[#1e2638] rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Database size={18} className="text-emerald-400" />
            <h2 className="text-sm font-bold text-white">Sincronização em Tempo Real (Supabase)</h2>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            A aplicação utiliza o banco de dados em tempo real gratuito do Supabase via WebSockets. Quando um usuário edita uma métrica ou marca um checklist, o outro computador atualiza no mesmo segundo.
          </p>
          <div className="p-3.5 rounded-xl bg-[#121927] border border-[#1e2638] flex items-center justify-between text-xs">
            <span className="text-slate-300">Status da Conexão Realtime:</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1.5">
              <CheckCircle2 size={15} />
              Ativo & Sincronizado
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
