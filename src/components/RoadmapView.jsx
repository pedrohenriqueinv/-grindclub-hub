import React from 'react';
import { Calendar, Play, CheckCircle2, Shield, Sparkles, Layers } from 'lucide-react';

export default function RoadmapView({ onOpenMediaModal }) {
  const phases = [
    {
      range: 'Dias 1 e 2',
      title: 'Fase 1: Fundação & Blindagem da Conta',
      desc: 'Criação de e-mail no Outlook, cadastro no TikTok Web selecionando país Alemanha, validação por câmera nativa (5s) e mini-games filter, seguido de 1 hora de aquecimento na lupa.',
      badge: 'Essencial',
      target: 'alemanha'
    },
    {
      range: 'Dias 3 a 14',
      title: 'Fase 2: Sprint de Pré-Monetização (Metas 10k/100k)',
      desc: 'Produção em massa de vídeos curtos de 15 a 20 segundos para viralização rápida. Text-to-speech no Fish Audio (resgate dos 8.000 pontos), Lip Sync no DreamFace e edição no CapCut.',
      badge: 'Produção',
      target: 'ferramentas-ia'
    },
    {
      range: 'Dia 15',
      title: 'Fase 3: Aprovação & Documentos (CNH + PayPal)',
      desc: 'Inscrição no Programa de Recompensas do Criador. Envio da CNH brasileira (emissor Brasil) e conexão da conta PayPal brasileira sem necessidade de formulário fiscal dos EUA.',
      badge: 'Monetização',
      target: 'paypal'
    },
    {
      range: 'Dias 16 a 30',
      title: 'Fase 4: Pós-Monetização & Vídeos Acima de 60 Segundos',
      desc: 'Mudança de formato obrigatória para vídeos >60 segundos. Roteirização de News (Google Flow + repórter Telemundo) ou Nicho Qual a Diferença com retenção máxima.',
      badge: 'Lucro em Escala',
      target: 'ferramentas-ia'
    },
    {
      range: 'Mês 2 em Diante',
      title: 'Fase 5: Escala Multicontas com Antidetect',
      desc: 'Configuração do Dolphin Anty (10 perfis grátis) ou AdsPower com proxies dedicados residenciais da Alemanha. Para escala de dezenas de contas, integração no VMOS Cloud.',
      badge: 'Escala 5 Dígitos',
      target: 'contingencia'
    }
  ];

  return (
    <div className="flex-1 bg-[#080b11] h-screen overflow-y-auto p-8 space-y-8">
      <div className="border-b border-[#1e2638] pb-6">
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Roadmap Operacional — Dia 1 ao 30</h1>
        <p className="text-xs text-slate-400 mt-1">
          Cronograma militar validado pelo Artin para sair do zero até os primeiros saques no PayPal
        </p>
      </div>

      <div className="max-w-3xl space-y-4">
        {phases.map((ph, idx) => (
          <div
            key={idx}
            className="bg-[#0f141f] border border-[#1e2638] rounded-2xl p-6 space-y-4 hover:border-slate-500 transition-all group"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#141b29] border border-[#1e2638] text-white font-bold text-xs flex items-center justify-center">
                  0{idx + 1}
                </span>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{ph.range}</span>
                  <h3 className="text-base font-bold text-white group-hover:text-slate-100 transition-colors">
                    {ph.title}
                  </h3>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-[#182032] text-slate-300 border border-[#27324b] text-[10px] font-semibold self-start sm:self-auto">
                {ph.badge}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed pl-11">
              {ph.desc}
            </p>

            <div className="pl-11 pt-2 flex items-center gap-3">
              <button
                onClick={() => onOpenMediaModal('tutorial', ph.target)}
                className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-slate-200 text-black text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
              >
                <Play size={12} className="fill-black" />
                <span>Ver Passo a Passo Detalhado</span>
              </button>

              <button
                onClick={() => onOpenMediaModal('prints', ph.target)}
                className="px-3.5 py-1.5 rounded-lg bg-[#182032] hover:bg-[#232e48] text-slate-200 border border-[#27324b] text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <span>Ver Prints das Aulas</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
