import React from 'react';
import { X, Play, Image as ImageIcon } from 'lucide-react';
import { TUTORIALS_DATA } from '../data/courseKnowledge';

export default function MediaModal({ modalData, onClose }) {
  if (!modalData) return null;

  const tutorial = TUTORIALS_DATA.find(t => t.id === modalData.target) || TUTORIALS_DATA[0];
  const isPrintsOnly = modalData.type === 'prints';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0f141f] border border-[#1e2638] rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#1e2638] flex items-center justify-between bg-[#121927]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#141b29] border border-[#1e2638] flex items-center justify-center text-white">
              {isPrintsOnly ? <ImageIcon size={20} /> : <Play size={20} />}
            </div>
            <div>
              <h3 className="text-base font-bold text-white leading-tight">
                {isPrintsOnly ? `Prints & Evidências: ${tutorial.title}` : tutorial.title}
              </h3>
              <p className="text-xs text-slate-400">{tutorial.subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#182032] hover:bg-[#222d44] text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* If Prints Only view */}
          {isPrintsOnly ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tutorial.prints.map((p, idx) => (
                <div key={idx} className="bg-[#121927] border border-[#1e2638] rounded-xl overflow-hidden group">
                  <div className="overflow-hidden bg-black/40 aspect-video flex items-center justify-center">
                    <img
                      src={p.path}
                      alt={p.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3 text-xs font-semibold text-slate-200 border-t border-[#1e2638]">
                    {p.title}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Full Tutorial with Steps and Images */
            <div className="space-y-6">
              {tutorial.steps.map((st) => (
                <div key={st.num} className="bg-[#121927] border border-[#1e2638] rounded-xl p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-white text-black text-xs font-bold flex items-center justify-center">
                      {st.num}
                    </span>
                    <h4 className="text-sm font-bold text-white">{st.title}</h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pl-9">
                    {st.desc}
                  </p>
                  {st.image && (
                    <div className="pl-9 pt-2">
                      <div className="rounded-lg overflow-hidden border border-[#1e2638] bg-black/60 max-w-lg">
                        <img src={st.image} alt={st.title} className="w-full object-cover" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#1e2638] bg-[#0b0f17] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#182032] hover:bg-[#232e48] text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
