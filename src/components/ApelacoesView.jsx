import React, { useState } from 'react';
import { FileText, Copy, Check, ShieldAlert } from 'lucide-react';

export default function ApelacoesView() {
  const [copiedId, setCopiedId] = useState(null);

  const appeals = [
    {
      id: 'alemao',
      lang: 'Alemão (Recomendado para contas DE)',
      title: 'Recurso contra "Nicht origineller Inhalt" (Conteúdo Não Original)',
      body: `Sehr geehrtes TikTok-Support-Team,

hiermit lege ich Einspruch gegen die Disqualifizierung meines Videos ein. Mein Inhalt ist zu 100 % originell und urheberrechtlich einwandfrei gestaltet. 

Die visuellen Elemente wurden von mir persönlich mithilfe von Schnittsoftware zusammengestellt, animiert und mit eigens erstellten Grafiken und Toneffekten versehen. Die Tonspur und das Skript wurden von Grund auf neu verfasst und stellen eine eigene journalistische und kreative Eigenleistung dar. Es handelt sich um eine autorale Videobearbeitung und keinesfalls um eine unerlaubte Wiederverwendung fremder Inhalte.

Ich bitte höflich um eine erneute manuelle Prüfung und Freischaltung des Videos für das Creator Rewards Programm.

Mit freundlichen Grüßen,
Kanalbetreiber`
    },
    {
      id: 'ingles',
      lang: 'Inglês (Universal)',
      title: 'Appeal for Disqualified Video (Original Content Appeal)',
      body: `Dear TikTok Support Team,

I am writing to formally appeal the disqualification of my video regarding "unoriginal content". 

This video was completely scripted, researched, and edited by me using professional desktop editing tools. All visual footage, sound effects, voiceovers, and dynamic motion graphics were compiled into an original narrative structure with significant creative and editorial value. 

No copyrighted clips were reused without transformative editing. I kindly request a manual review of my video to restore its monetization under the Creator Rewards Program.

Best regards,
Content Creator`
    }
  ];

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex-1 bg-[#080b11] h-screen overflow-y-auto p-8 space-y-8">
      <div className="border-b border-[#1e2638] pb-6">
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Central de Apelações & Suporte</h1>
        <p className="text-xs text-slate-400 mt-1">
          Modelos oficiais para recorrer de vídeos desqualificados por conteúdo não original no TikTok Studio
        </p>
      </div>

      <div className="max-w-4xl space-y-6">
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
          <ShieldAlert size={18} className="text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-200 leading-relaxed">
            <b>Regra do Artin:</b> Sempre apele de vídeos desqualificados dentro das primeiras 24 horas. Contas com diretriz da Alemanha têm taxa de reversão muito mais alta quando a contestação é feita em alemão ou inglês formal.
          </p>
        </div>

        {appeals.map((app) => (
          <div key={app.id} className="bg-[#0f141f] border border-[#1e2638] rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">{app.lang}</span>
                <h3 className="text-sm font-bold text-white mt-0.5">{app.title}</h3>
              </div>

              <button
                onClick={() => handleCopy(app.id, app.body)}
                className="px-3.5 py-1.5 rounded-lg bg-[#141b29] hover:bg-[#1a2336] text-xs font-semibold text-white flex items-center gap-1.5 transition-colors border border-[#1e2638]"
              >
                {copiedId === app.id ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copiedId === app.id ? 'Copiado!' : 'Copiar Texto'}</span>
              </button>
            </div>

            <pre className="p-4 bg-[#080b11] border border-[#1e2638] rounded-xl text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed">
              {app.body}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
