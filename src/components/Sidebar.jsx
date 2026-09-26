import React, { useState } from 'react';
import { 
  Home, 
  User, 
  BookOpen, 
  CheckSquare,
  Wand2, 
  Calculator, 
  PlayCircle, 
  MessageSquare, 
  FileText, 
  Settings, 
  Users,
  ChevronRight,
  CheckCircle2,
  ArrowRightLeft
} from 'lucide-react';

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  currentUser, 
  setCurrentUser,
  partnerUser, 
  setPartnerUser 
}) {
  const [showSwitchModal, setShowSwitchModal] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'contas', label: 'Contas', icon: User },
    { id: 'roadmap', label: 'Roadmap', icon: BookOpen },
    { id: 'checklist', label: 'Checklist', icon: CheckSquare },
    { id: 'estudio', label: 'Estúdio', icon: Wand2 },
    { id: 'calculadora', label: 'Calculadora', icon: Calculator },
    { id: 'tutoriais', label: 'Tutoriais', icon: PlayCircle },
    { id: 'vyk-ai', label: 'Vyk AI', icon: MessageSquare },
    { id: 'apelacoes', label: 'Apelações', icon: FileText },
    { id: 'configuracoes', label: 'Configurações', icon: Settings },
  ];

  const handleSwitchUser = () => {
    const temp = currentUser;
    setCurrentUser(partnerUser);
    setPartnerUser(temp);
    setShowSwitchModal(false);
  };

  return (
    <aside className="w-64 bg-[#090d14] border-r border-[#19202f] flex flex-col justify-between h-screen select-none shrink-0 z-30">
      {/* Top Section: Logo & Nav */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Brand Logo (Monocromático Stealth) */}
        <div className="p-5 flex items-center gap-3 border-b border-[#19202f]/60">
          <div className="w-9 h-9 rounded-xl bg-[#141b29] border border-[#222b3d] flex items-center justify-center p-[2px] shadow-md">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M12 2a10 10 0 1 0 10 10h-6" />
              <path d="M12 6a6 6 0 1 0 6 6h-3" />
            </svg>
          </div>
          <div>
            <div className="font-extrabold tracking-wider text-base text-white leading-tight">GRINDCLUB</div>
            <div className="text-[10px] font-semibold text-slate-400 tracking-widest uppercase">OPS HUB</div>
          </div>
        </div>

        {/* Navigation Items (Sem Azul) */}
        <nav className="p-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#151b27] text-white shadow-sm border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#0e131f]'
                }`}
              >
                <Icon size={17} className={isActive ? 'text-white' : 'text-slate-500'} />
                <span>{item.label}</span>
                {item.id === 'vyk-ai' && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                )}
                {item.id === 'checklist' && (
                  <span className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#1e2638] text-slate-300 border border-slate-700">
                    Duo
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Duo Plan & Interactive User Switcher */}
      <div className="p-3 border-t border-[#19202f] bg-[#0c1018]">
        {/* Duo Plan Header */}
        <div className="bg-[#101624] border border-[#19202f] rounded-xl p-2.5 mb-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users size={14} className="text-slate-300" />
            <span className="text-xs font-semibold text-slate-200">Plano Duo</span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#182032] text-slate-300 border border-slate-700">
            2/2 membros
          </span>
        </div>

        {/* User 1: Pedro Henrique (Ativo) */}
        <div 
          onClick={() => setShowSwitchModal(true)}
          className="flex items-center justify-between p-2 rounded-xl hover:bg-[#141b29] transition-all cursor-pointer group border border-transparent hover:border-slate-700 mb-1"
          title="Clique para alternar sessão de usuário"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center font-bold text-xs text-white shadow-sm ring-1 ring-white/20">
              {currentUser?.avatar || 'PH'}
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-slate-200 group-hover:text-white leading-tight">
                {currentUser?.name || 'Pedro Henrique'}
              </div>
              <div className="text-[10px] text-white font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                Você (Ativo)
              </div>
            </div>
          </div>
          <ArrowRightLeft size={13} className="text-slate-500 group-hover:text-white transition-colors" />
        </div>

        {/* User 2: Parceiro */}
        <div 
          onClick={handleSwitchUser}
          className="flex items-center justify-between p-2 rounded-xl hover:bg-[#141b29] transition-all cursor-pointer group border border-transparent hover:border-slate-700"
          title="Alternar para este membro"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#182032] border border-slate-700 flex items-center justify-center font-bold text-xs text-slate-300">
              {partnerUser?.avatar || 'A'}
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-slate-400 group-hover:text-slate-200 leading-tight">
                {partnerUser?.name || 'Parceiro'}
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Online
              </div>
            </div>
          </div>
          <ChevronRight size={14} className="text-slate-600 group-hover:text-slate-400" />
        </div>
      </div>

      {/* Modal / Dialog de Troca de Usuários Duo */}
      {showSwitchModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e131f] border border-[#19202f] rounded-2xl p-6 max-w-sm w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#19202f] pb-3">
              <div className="flex items-center gap-2">
                <Users size={16} className="text-white" />
                <h3 className="text-sm font-bold text-white">Alternar Membro da Dupla</h3>
              </div>
              <button
                onClick={() => setShowSwitchModal(false)}
                className="text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              O Hub adapta a visão, saudações da Vyk AI e registros de tarefas conforme o membro selecionado:
            </p>

            <div className="space-y-2.5">
              <div className="p-3.5 rounded-xl bg-[#141b29] border border-white/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-600 text-white font-bold text-xs flex items-center justify-center">
                    {currentUser?.avatar || 'PH'}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{currentUser?.name}</div>
                    <div className="text-[10px] text-white font-medium">Sessão Atual (Ativo)</div>
                  </div>
                </div>
                <CheckCircle2 size={18} className="text-white" />
              </div>

              <div 
                onClick={handleSwitchUser}
                className="p-3.5 rounded-xl bg-[#101522] border border-[#19202f] hover:border-slate-500 flex items-center justify-between cursor-pointer transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#182032] border border-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center">
                    {partnerUser?.avatar || 'A'}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-300 group-hover:text-white">{partnerUser?.name}</div>
                    <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Conectado no outro PC
                    </div>
                  </div>
                </div>
                <button className="px-3 py-1 bg-white hover:bg-slate-200 text-slate-950 font-bold text-[10px] rounded-lg transition-colors">
                  Ativar
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-[#19202f] flex justify-end">
              <button
                onClick={() => setShowSwitchModal(false)}
                className="px-4 py-2 rounded-xl bg-[#182032] hover:bg-[#222c42] text-xs font-semibold text-slate-200"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
