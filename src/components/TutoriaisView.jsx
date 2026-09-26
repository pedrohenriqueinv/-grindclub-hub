import React from 'react';
import { TUTORIALS_DATA } from '../data/courseKnowledge';
import { Play, Image as ImageIcon, CheckCircle } from 'lucide-react';

export default function TutoriaisView({ onOpenMediaModal }) {
  return (
    <div className="flex-1 bg-[#080b11] h-screen overflow-y-auto p-8 space-y-8">
      <div className="border-b border-[#1e2638] pb-6">
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Biblioteca de Tutoriais & Prints do Curso</h1>
        <p className="text-xs text-slate-400 mt-1">
          Guias operacionais oficiais extraídos diretamente das aulas em vídeo do Grind Club
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
        {TUTORIALS_DATA.map((tut) => (
          <div
            key={tut.id}
            className="bg-[#0f141f] border border-[#1e2638] rounded-2xl overflow-hidden hover:border-slate-500 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Thumbnail do Primeiro Print */}
              <div className="aspect-video bg-black/40 border-b border-[#1e2638] overflow-hidden relative group">
                <img
                  src={tut.prints[0]?.path || '/media/resultados_paypal.jpg'}
                  alt={tut.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f141f] via-transparent to-transparent opacity-80" />
                <span className="absolute bottom-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-white border border-white/10">
                  {tut.steps.length} Passos Detalhados
                </span>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="text-base font-bold text-white leading-snug">{tut.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{tut.subtitle}</p>
              </div>
            </div>

            <div className="p-5 pt-0 flex items-center gap-2.5">
              <button
                onClick={() => onOpenMediaModal('tutorial', tut.id)}
                className="flex-1 py-2 bg-white hover:bg-slate-200 text-black font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <Play size={13} className="fill-black" />
                <span>Ver Tutorial Completo</span>
              </button>

              <button
                onClick={() => onOpenMediaModal('prints', tut.id)}
                className="px-3.5 py-2 bg-[#182032] hover:bg-[#232e48] text-slate-200 border border-[#27324b] text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <ImageIcon size={14} />
                <span>Prints ({tut.prints.length})</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
