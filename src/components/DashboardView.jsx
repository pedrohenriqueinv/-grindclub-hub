import React, { useState } from 'react';
import { 
  DollarSign, 
  Calendar, 
  BarChart2, 
  Play, 
  Search, 
  Bell, 
  MoreHorizontal, 
  ChevronRight, 
  Check, 
  ExternalLink, 
  Sparkles, 
  Circle, 
  Film, 
  Scissors, 
  Volume2, 
  Send, 
  CheckCircle2,
  Lock,
  Globe
} from 'lucide-react';

export default function DashboardView({ 
  currentUser, 
  partnerUser, 
  tasks, 
  setTasks, 
  accounts, 
  setAccounts, 
  activeAccount, 
  setActiveAccount,
  onAddAccount,
  onUpdateAccount,
  onDeleteAccount,
  onNavigateTab,
  onOpenMediaModal
}) {
  // Estado do Simulador de Ganhos - Iniciando Zerado ("Zero KM")
  const [calcViews, setCalcViews] = useState(0);
  const [calcRpm, setCalcRpm] = useState(0.00);
  const [calcVideos, setCalcVideos] = useState(0);

  // Mini chat no widget da Vyk AI
  const [quickAiInput, setQuickAiInput] = useState('');
  const [selectedAccDetails, setSelectedAccDetails] = useState(null);
  const [showAddAccModal, setShowAddAccModal] = useState(false);
  const [newAccForm, setNewAccForm] = useState({
    handle: '',
    country: 'Alemanha',
    niche: 'News Atemporal',
    followersCount: 0,
    viewsCount: 0,
    status: 'Criando'
  });

  // Cálculos do simulador
  const faturamentoUsd = (calcViews / 1000) * calcRpm * calcVideos;
  const faturamentoBrl = faturamentoUsd * 5.20;
  const parteDuo = faturamentoBrl / 2;

  const safeTasks = tasks || [];
  const safeAccounts = accounts || [];

  // Toggle checklist
  const toggleTask = (id) => {
    if (!setTasks) return;
    setTasks(prev => (prev || []).map(t => {
      if (t.id === id) {
        const nextDone = !t.done;
        return { 
          ...t, 
          done: nextDone,
          completedBy: nextDone ? (currentUser?.name?.split(' ')[0] || 'Você') : null 
        };
      }
      return t;
    }));
  };

  const completedTasks = safeTasks.filter(t => t.done).length;
  const totalTasks = safeTasks.length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleSendQuickAi = (promptText) => {
    const text = promptText || quickAiInput;
    if (!text.trim()) return;
    onNavigateTab('vyk-ai');
  };

  // SVG Sparkline Helper
  const Sparkline = ({ color = '#10b981' }) => (
    <svg width="48" height="20" viewBox="0 0 48 20" fill="none" className="shrink-0">
      <path 
        d="M2 14L10 10L18 13L26 6L34 9L42 3L46 5" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );

  // SVG Circular Progress Ring
  const ProgressRing = ({ percent = 50, size = 68, stroke = 6 }) => {
    const radius = (size - stroke) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percent / 100) * circumference;

    return (
      <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="rotate-[-90deg]">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#1a2234"
            strokeWidth={stroke}
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#ffffff"
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-700"
          />
        </svg>
        <span className="absolute text-xs font-extrabold text-white">
          {percent}%
        </span>
      </div>
    );
  };

  return (
    <div className="flex-1 bg-[#090d14] h-screen overflow-y-auto flex flex-col">
      {/* Top Header */}
      <header className="h-14 border-b border-[#19202f] px-8 flex items-center justify-between bg-[#090d14]/90 backdrop-blur-sm shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <h1 className="text-lg font-extrabold text-white tracking-tight">Dashboard</h1>
          <span className="inline-flex max-w-[132px] items-center gap-2 truncate rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2.5 py-1 text-[10px] font-semibold text-cyan-200">
            <span className="size-1.5 rounded-full bg-cyan-300" />
            <span className="truncate">{currentUser?.name || 'Pedro Henrique'}</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-64 hidden md:block">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Buscar algo..."
              className="w-full bg-[#0e131f] border border-[#19202f] rounded-lg pl-8 pr-10 py-1.5 text-xs text-slate-300 placeholder:text-slate-500 focus:outline-none focus:border-slate-500"
            />
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-500 bg-[#141b29] px-1.5 py-0.5 rounded">
              ⌘ K
            </span>
          </div>

          <button className="w-8 h-8 rounded-lg hover:bg-[#0e131f] text-slate-400 hover:text-white flex items-center justify-center transition-colors">
            <Bell size={16} />
          </button>

          <div className="size-8 rounded-full bg-gradient-to-br from-cyan-300/90 to-sky-500/80 border border-white/20 flex items-center justify-center text-[11px] font-bold text-slate-950 shadow-sm" role="img" aria-label={`Perfil ativo: ${currentUser?.name || 'Pedro Henrique'}`} title={`Perfil ativo: ${currentUser?.name || 'Pedro Henrique'}`}>
            {currentUser?.avatar || 'PH'}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="p-8 space-y-6 flex-1">
        {/* Row 1: 4 Metric KPI Cards - TOTALMENTE ZERADOS ("Zero KM") */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Faturamento Acumulado */}
          <div className="bg-[#0e131f] border border-[#19202f] rounded-2xl p-4 space-y-2 relative">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#141b29] border border-[#1e2638] flex items-center justify-center text-slate-200">
                <DollarSign size={17} />
              </div>
              <div>
                <span className="text-[11px] font-medium text-slate-400 block leading-tight">Faturamento Acumulado</span>
                <div className="text-xl font-extrabold text-white tracking-tight mt-0.5">US$ 0,00</div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-slate-400">R$ 0,00</span>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-0.5">
                  0%
                </span>
                <Sparkline color="#475569" />
              </div>
            </div>
          </div>

          {/* Card 2: Próximo Pagamento */}
          <div className="bg-[#0e131f] border border-[#19202f] rounded-2xl p-4 space-y-2 relative">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#141b29] border border-[#1e2638] flex items-center justify-center text-slate-200">
                <Calendar size={17} />
              </div>
              <div>
                <span className="text-[11px] font-medium text-slate-400 block leading-tight">Próximo Pagamento</span>
                <div className="text-xl font-extrabold text-white tracking-tight mt-0.5">--</div>
              </div>
            </div>
            <div className="pt-1">
              <span className="text-xs text-slate-400">Aguardando 1º faturamento (Meta: 10K seg.)</span>
            </div>
          </div>

          {/* Card 3: RPM Médio */}
          <div className="bg-[#0e131f] border border-[#19202f] rounded-2xl p-4 space-y-2 relative">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#141b29] border border-[#1e2638] flex items-center justify-center text-slate-200">
                <BarChart2 size={17} />
              </div>
              <div>
                <span className="text-[11px] font-medium text-slate-400 block leading-tight">RPM Médio</span>
                <div className="text-xl font-extrabold text-white tracking-tight mt-0.5">US$ 0,00</div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-1.5 pt-1">
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-0.5">
                0%
              </span>
              <Sparkline color="#475569" />
            </div>
          </div>

          {/* Card 4: Visualizações (Mês) */}
          <div className="bg-[#0e131f] border border-[#19202f] rounded-2xl p-4 space-y-2 relative">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#141b29] border border-[#1e2638] flex items-center justify-center text-slate-200">
                <Play size={17} className="fill-slate-200" />
              </div>
              <div>
                <span className="text-[11px] font-medium text-slate-400 block leading-tight">Visualizações (Mês)</span>
                <div className="text-xl font-extrabold text-white tracking-tight mt-0.5">0</div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-1.5 pt-1">
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-0.5">
                0%
              </span>
              <Sparkline color="#475569" />
            </div>
          </div>
        </div>

        {/* Row 2: Minhas Contas Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-extrabold text-white tracking-tight">Minhas Contas</h2>
              <span className="text-[10px] font-mono text-slate-400 bg-[#121826] px-2 py-0.5 rounded-full border border-[#19202f]">
                {safeAccounts.length} cadastradas
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAddAccModal(true)}
                className="text-xs px-3 py-1.5 bg-white hover:bg-slate-200 text-black font-bold rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <span>+ Nova Conta</span>
              </button>
              <button 
                onClick={() => onNavigateTab('contas')}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-medium transition-colors px-2 py-1.5"
              >
                <span>Gerenciar</span>
                <ChevronRight size={13} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {safeAccounts.map((acc) => {
              const isSelected = activeAccount?.id === acc.id;
              return (
                <div 
                  key={acc.id}
                  onClick={() => setActiveAccount(acc)}
                  className={`bg-[#0e131f] border rounded-2xl p-4 flex flex-col justify-between transition-all cursor-pointer group hover:bg-[#121826] relative ${
                    isSelected 
                      ? 'border-white ring-1 ring-white/20 shadow-lg' 
                      : 'border-[#19202f] hover:border-[#27324b]'
                  }`}
                >
                  {/* Top info with country and menu */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden">
                        {acc.avatar ? (
                          <img src={acc.avatar} alt={acc.handle} loading="lazy" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-[10px] font-bold text-white">{acc.handle.slice(1, 3).toUpperCase()}</span>
                        )}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-slate-100 transition-colors flex items-center gap-1.5">
                          <span>{acc.handle}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                          <span className="text-xs">{acc.flag || '🇩🇪'}</span>
                          <span>{acc.country || 'Alemanha'}</span>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedAccDetails(acc);
                      }}
                      className="text-slate-500 hover:text-white transition-colors p-1"
                      title="Editar métricas ou detalhes"
                    >
                      <MoreHorizontal size={14} />
                    </button>
                  </div>

                  {/* Middle Progress Ring & Counts */}
                  <div className="my-3.5 flex items-center gap-4">
                    <ProgressRing percent={acc.percent || 0} size={64} stroke={5} />
                    <div className="space-y-1.5 text-[11px]">
                      <div>
                        <div className="font-bold text-white">{acc.followers}</div>
                        <div className="text-[10px] text-slate-500">Seguidores</div>
                      </div>
                      <div>
                        <div className="font-bold text-white">{acc.views}</div>
                        <div className="text-[10px] text-slate-500">Visualizações</div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Status Pill */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#19202f]/80">
                    <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[#141b29] text-slate-300 border border-[#1e2638]">
                      {acc.status}
                    </span>
                    <span className={`text-[10px] font-mono ${isSelected ? 'text-white font-bold' : 'text-slate-500'}`}>
                      {isSelected ? '● Ativa' : 'Alternar'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Row 3: Main 3-Column / Bento Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (span 4): Checklist Diário & Simulador */}
          <div className="lg:col-span-4 space-y-6">
            {/* Checklist Diário */}
            <div className="bg-[#0e131f] border border-[#19202f] rounded-2xl p-5 space-y-3.5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-white tracking-wide">Checklist Diário</h3>
                <div className="text-[11px] text-slate-400 font-mono">
                  Hoje <span className="text-white font-bold">{completedTasks} / {totalTasks}</span> concluídos
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="w-full bg-[#131927] h-1.5 rounded-full overflow-hidden border border-[#1e2638]">
                  <div 
                    className="bg-white h-full rounded-full transition-all duration-500" 
                    style={{ width: `${progressPercent}%` }} 
                  />
                </div>
                <div className="text-right text-[10px] text-slate-500 font-mono font-bold">
                  {progressPercent}%
                </div>
              </div>

              {/* Checklist Items */}
              <div className="space-y-2 pt-1">
                {safeTasks.slice(0, 6).map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className="flex items-center justify-between text-xs py-1 cursor-pointer group select-none"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <div className={`w-4 h-4 rounded-[4px] flex items-center justify-center transition-colors shrink-0 ${
                        task.done 
                          ? 'bg-white text-black' 
                          : 'border border-slate-600 group-hover:border-slate-400'
                      }`}>
                        {task.done ? <Check size={11} strokeWidth={3} /> : null}
                      </div>
                      <span className={`text-[11px] leading-tight truncate ${
                        task.done ? 'line-through text-slate-500' : 'text-slate-300 group-hover:text-white'
                      }`}>
                        {task.text}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] text-slate-500 font-mono">
                        {task.time || 'Pendente'}
                      </span>
                      <span className="text-slate-600 text-xs">...</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Simulador de Ganhos */}
            <div className="bg-[#0e131f] border border-[#19202f] rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2">
                <DollarSign size={15} className="text-slate-300" />
                <h3 className="text-xs font-bold text-white tracking-wide">Simulador de Ganhos</h3>
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Visualizações por vídeo</label>
                  <input
                    type="number"
                    value={calcViews}
                    onChange={(e) => setCalcViews(Number(e.target.value))}
                    className="w-full bg-[#121826] border border-[#19202f] rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-slate-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">RPM (US$)</label>
                  <input
                    type="number"
                    step="0.05"
                    value={calcRpm}
                    onChange={(e) => setCalcRpm(Number(e.target.value))}
                    className="w-full bg-[#121826] border border-[#19202f] rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-slate-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Vídeos/mês</label>
                  <input
                    type="number"
                    value={calcVideos}
                    onChange={(e) => setCalcVideos(Number(e.target.value))}
                    className="w-full bg-[#121826] border border-[#19202f] rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-slate-500"
                  />
                </div>
              </div>

              {/* Output Results */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#19202f]">
                <div>
                  <span className="text-[10px] text-slate-400 block">Faturamento Bruto (US$)</span>
                  <div className="text-xs font-extrabold text-white mt-0.5">
                    US$ {faturamentoUsd.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 block">Em Reais (R$)</span>
                  <div className="text-xs font-extrabold text-white mt-0.5">
                    R$ {faturamentoBrl.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 block">Sua Parte (50%)</span>
                  <div className="text-xs font-extrabold text-white mt-0.5">
                    R$ {parteDuo.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Center Column (span 4): Roadmap & Ferramentas Rápidas */}
          <div className="lg:col-span-4 space-y-6">
            {/* Roadmap (Dia 1 ao 30) */}
            <div className="bg-[#0e131f] border border-[#19202f] rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar size={15} className="text-slate-300" />
                  <h3 className="text-xs font-bold text-white tracking-wide">Roadmap (Dia 1 ao 30)</h3>
                </div>
                <button 
                  onClick={() => onNavigateTab('roadmap')}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-medium transition-colors"
                >
                  <span>Ver completo</span>
                  <ChevronRight size={13} />
                </button>
              </div>

              {/* 5-Step Horizontal Stepper */}
              <div className="flex items-center justify-between relative px-2 pt-2">
                <div className="absolute top-4 left-6 right-6 h-[1px] bg-[#1e2638] -z-0" />
                
                {[
                  { num: 1, label: 'Dias 1-2', sub: 'Fundação & Blindagem', active: true },
                  { num: 2, label: 'Dias 3-14', sub: 'Pré-Monetização' },
                  { num: 3, label: 'Dia 15', sub: 'Aprovação & Documentação' },
                  { num: 4, label: 'Dias 16-30', sub: 'Escala Pós-Monetização' },
                  { num: 5, label: 'Mês 2+', sub: 'Escala Multicontas' },
                ].map((st) => (
                  <div key={st.num} className="flex flex-col items-center text-center relative z-10">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      st.active 
                        ? 'bg-white text-black shadow-md' 
                        : 'bg-[#141b29] text-slate-400 border border-[#1e2638]'
                    }`}>
                      {st.num}
                    </div>
                    <span className="text-[10px] font-semibold text-slate-300 mt-1.5 leading-tight">{st.label}</span>
                    <span className="text-[8px] text-slate-500 leading-none mt-0.5 max-w-[55px] truncate">{st.sub}</span>
                  </div>
                ))}
              </div>

              {/* Stepper Preview Card */}
              <div className="bg-[#121826] border border-[#1e2638] rounded-xl p-3.5 flex items-center gap-3 mt-2">
                <div className="w-16 h-12 rounded-lg bg-black overflow-hidden border border-slate-800 shrink-0">
                  <img src="/media/tiktok_signup_alemanha.jpg" alt="TikTok" loading="lazy" className="w-full h-full object-cover opacity-80" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white leading-tight">Etapa 1 — Fundação & Blindagem</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-snug line-clamp-1">
                    Criação de e-mail, conta na Alemanha, validação de câmera e mini-games.
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button 
                      onClick={() => onOpenMediaModal('tutorial', 'alemanha')}
                      className="px-2.5 py-1 rounded bg-white text-black text-[10px] font-bold flex items-center gap-1 hover:bg-slate-200 transition-colors"
                    >
                      <Play size={9} className="fill-black" />
                      <span>Ver Tutorial</span>
                    </button>
                    <button 
                      onClick={() => onOpenMediaModal('prints', 'alemanha')}
                      className="px-2.5 py-1 rounded bg-[#182032] border border-[#27324b] text-slate-300 text-[10px] font-semibold hover:text-white transition-colors"
                    >
                      Ver Prints
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Ferramentas Rápidas */}
            <div className="bg-[#0e131f] border border-[#19202f] rounded-2xl p-5 space-y-3.5">
              <div className="flex items-center gap-2">
                <Sparkles size={15} className="text-slate-300" />
                <h3 className="text-xs font-bold text-white tracking-wide">Ferramentas Rápidas</h3>
              </div>

              <div className="grid grid-cols-5 gap-2 pt-1">
                {[
                  { name: 'Roteiro', sub: '(Gemini)', icon: Sparkles },
                  { name: 'Prompts', sub: '(Reve AI)', icon: Circle },
                  { name: 'Sort Feed', sub: '(Extensão)', icon: Film },
                  { name: 'CapCut', sub: '(Edição)', icon: Scissors },
                  { name: 'Áudios', sub: '(SFX)', icon: Volume2 },
                ].map((tool, idx) => {
                  const Icon = tool.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => onNavigateTab('estudio')}
                      className="p-2.5 rounded-xl bg-[#121826] hover:bg-[#1a2336] border border-[#1e2638] hover:border-slate-500 flex flex-col items-center justify-center text-center transition-all group"
                    >
                      <Icon size={16} className="text-slate-400 group-hover:text-white mb-1.5 transition-colors" />
                      <span className="text-[10px] font-bold text-slate-200 leading-tight block">{tool.name}</span>
                      <span className="text-[8px] text-slate-500 leading-none">{tool.sub}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Rail (span 4): Vyk AI Widget + Últimos Tutoriais */}
          <div className="lg:col-span-4 space-y-6">
            {/* Vyk AI Widget */}
            <div className="bg-[#0e131f] border border-[#19202f] rounded-2xl p-5 space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-white">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 3v4m0 10v4m-9-9h4m10 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white leading-tight">Vyk AI</h4>
                    <span className="text-[10px] text-slate-400">Seu mentor do Grind Club</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online
                </div>
              </div>

              {/* Greeting Bubble */}
              <div className="p-3 rounded-xl bg-[#121826] border border-[#1e2638] text-xs text-slate-300 leading-relaxed">
                Fala, {currentUser?.name?.split(' ')[0] || 'Pedro'}!<br/>
                Em que posso te ajudar hoje?
              </div>

              {/* Quick Prompts List */}
              <div className="space-y-1.5">
                {[
                  { label: 'Como criar conta na Alemanha?', icon: '💬' },
                  { label: 'Me dá um roteiro de vídeo news', icon: '🎬' },
                  { label: 'Gerar prompts (Reve AI)', icon: '🎨' },
                  { label: 'Calcular ganhos do meu canal', icon: '🧮' },
                  { label: 'Como apelar um vídeo?', icon: '⏱️' }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendQuickAi(item.label)}
                    className="w-full p-2.5 rounded-xl bg-[#121826] hover:bg-[#182133] border border-[#1e2638] hover:border-slate-500 flex items-center justify-between text-left text-xs transition-all group"
                  >
                    <span className="text-slate-300 group-hover:text-white truncate pr-2">
                      {item.label}
                    </span>
                    <ChevronRight size={13} className="text-slate-600 group-hover:text-white shrink-0" />
                  </button>
                ))}
              </div>

              {/* Quick Input Bar */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendQuickAi();
                }}
                className="bg-[#121826] border border-[#1e2638] rounded-xl p-1.5 flex items-center gap-2 focus-within:border-slate-500 transition-colors"
              >
                <input
                  type="text"
                  value={quickAiInput}
                  onChange={(e) => setQuickAiInput(e.target.value)}
                  placeholder="Digite sua pergunta..."
                  className="flex-1 bg-transparent border-none text-xs text-slate-200 placeholder-slate-500 px-2 focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-7 h-7 rounded-lg bg-white text-black flex items-center justify-center font-bold hover:bg-slate-200 transition-colors shrink-0"
                >
                  <Send size={12} className="fill-black" />
                </button>
              </form>
            </div>

            {/* Últimos Tutoriais */}
            <div className="bg-[#0e131f] border border-[#19202f] rounded-2xl p-5 space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Play size={14} className="text-slate-300" />
                  <h3 className="text-xs font-bold text-white tracking-wide">Últimos Tutoriais</h3>
                </div>
                <button 
                  onClick={() => onNavigateTab('tutoriais')}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-medium transition-colors"
                >
                  <span>Ver todos</span>
                  <ChevronRight size={13} />
                </button>
              </div>

              <div className="space-y-2 pt-1">
                {[
                  { title: 'Criando conta na Alemanha', time: '3 min', target: 'alemanha' },
                  { title: 'Validação com CNH brasileira', time: '4 min', target: 'paypal' },
                  { title: 'Configuração no Dolphin Anty', time: '5 min', target: 'contingencia' },
                ].map((tut, idx) => (
                  <div
                    key={idx}
                    onClick={() => onOpenMediaModal('tutorial', tut.target)}
                    className="p-2.5 rounded-xl bg-[#121826] hover:bg-[#182133] border border-[#1e2638] hover:border-slate-500 flex items-center justify-between cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-white shrink-0 group-hover:border-slate-500">
                        <Play size={11} className="fill-white" />
                      </div>
                      <div>
                        <h5 className="text-xs font-semibold text-slate-200 group-hover:text-white leading-tight">
                          {tut.title}
                        </h5>
                        <span className="text-[10px] text-slate-500">{tut.time}</span>
                      </div>
                    </div>
                    <ChevronRight size={13} className="text-slate-600 group-hover:text-white" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Interativo de Detalhes e Edição da Conta */}
      {selectedAccDetails && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e131f] border border-[#1e2638] rounded-2xl p-6 max-w-md w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1e2638] pb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-lg">{selectedAccDetails.flag || '🇩🇪'}</span>
                <div>
                  <h3 className="text-sm font-bold text-white">{selectedAccDetails.handle}</h3>
                  <span className="text-[10px] text-slate-400">{selectedAccDetails.country || 'Alemanha'} • {selectedAccDetails.niche || 'Geral'}</span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedAccDetails(null)}
                className="text-slate-400 hover:text-white text-xs p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {/* Ajustar Status */}
              <div>
                <label className="text-[10px] text-slate-400 block mb-1 font-semibold">Status Operacional</label>
                <select
                  value={selectedAccDetails.status}
                  onChange={(e) => {
                    const updated = { ...selectedAccDetails, status: e.target.value };
                    setSelectedAccDetails(updated);
                    if (onUpdateAccount) onUpdateAccount(selectedAccDetails.id, { status: e.target.value });
                  }}
                  className="w-full bg-[#121826] border border-[#1e2638] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-slate-500"
                >
                  <option value="Criando">Criando (Passo 1)</option>
                  <option value="Aquecendo">Aquecendo (Lupa & Filtros)</option>
                  <option value="Postando (Pré-10k)">Postando (Pré-10k)</option>
                  <option value="Monetizada">Monetizada (&gt;10k &amp; Aprovada)</option>
                  <option value="Em Apelação">Em Apelação (Vídeo Desqualificado)</option>
                </select>
              </div>

              {/* Ajustar Seguidores e Visualizações */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-[#121826] border border-[#1e2638] space-y-1">
                  <label className="text-[10px] text-slate-400 block font-semibold">Seguidores Atuais</label>
                  <input
                    type="number"
                    value={selectedAccDetails.followersCount || 0}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      const updated = { 
                        ...selectedAccDetails, 
                        followersCount: val,
                        followers: `${val.toLocaleString('pt-BR')} / 10.000`,
                        percent: Math.min(100, Math.round((val / 10000) * 100))
                      };
                      setSelectedAccDetails(updated);
                      if (onUpdateAccount) onUpdateAccount(selectedAccDetails.id, { followersCount: val });
                    }}
                    className="w-full bg-[#0a0e17] border border-[#1e2638] rounded-lg px-2.5 py-1.5 text-xs text-white font-bold focus:outline-none focus:border-slate-500"
                  />
                  <span className="text-[9px] text-slate-500">Meta: 10.000 seguidores</span>
                </div>

                <div className="p-3 rounded-xl bg-[#121826] border border-[#1e2638] space-y-1">
                  <label className="text-[10px] text-slate-400 block font-semibold">Visualizações Totais</label>
                  <input
                    type="number"
                    value={selectedAccDetails.viewsCount || 0}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      const updated = { 
                        ...selectedAccDetails, 
                        viewsCount: val,
                        views: `${(val / 1000).toFixed(1)}K / 100K`
                      };
                      setSelectedAccDetails(updated);
                      if (onUpdateAccount) onUpdateAccount(selectedAccDetails.id, { viewsCount: val });
                    }}
                    className="w-full bg-[#0a0e17] border border-[#1e2638] rounded-lg px-2.5 py-1.5 text-xs text-white font-bold focus:outline-none focus:border-slate-500"
                  />
                  <span className="text-[9px] text-slate-500">Meta: 100.000 views qualificadas</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#121826] border border-[#1e2638] space-y-1">
                <span className="text-[10px] text-slate-400 block">Ambiente & Proxy</span>
                <div className="font-semibold text-white flex items-center gap-2">
                  <Globe size={13} className="text-emerald-400" />
                  <span>{selectedAccDetails.proxy || 'Socks5 Alemanha Residencial'}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#1e2638]">
              <button
                onClick={() => {
                  if (onDeleteAccount) {
                    onDeleteAccount(selectedAccDetails.id);
                  }
                  setSelectedAccDetails(null);
                }}
                className="px-3 py-2 rounded-xl text-rose-400 hover:bg-rose-500/10 text-xs font-semibold transition-colors"
              >
                Excluir Conta
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setActiveAccount(selectedAccDetails);
                    setSelectedAccDetails(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-slate-200 text-black font-bold text-xs transition-colors shadow-sm"
                >
                  Definir Ativa
                </button>
                <button
                  onClick={() => setSelectedAccDetails(null)}
                  className="px-4 py-2 rounded-xl bg-[#182032] text-slate-300 text-xs font-semibold"
                >
                  Salvar e Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Cadastrar Nova Conta Direto pelo Dashboard */}
      {showAddAccModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e131f] border border-[#1e2638] rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1e2638] pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Cadastrar Nova Conta no Hub</span>
              </h3>
              <button 
                onClick={() => setShowAddAccModal(false)}
                className="text-slate-400 hover:text-white text-xs p-1"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newAccForm.handle.trim()) return;
                if (onAddAccount) {
                  onAddAccount(newAccForm);
                }
                setNewAccForm({
                  handle: '',
                  country: 'Alemanha',
                  niche: 'News Atemporal',
                  followersCount: 0,
                  viewsCount: 0,
                  status: 'Criando'
                });
                setShowAddAccModal(false);
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Handle / Nome da Conta (@):</label>
                <input
                  type="text"
                  required
                  placeholder="@canal.alemanha03"
                  value={newAccForm.handle}
                  onChange={(e) => setNewAccForm({ ...newAccForm, handle: e.target.value })}
                  className="w-full bg-[#121826] border border-[#1e2638] rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-slate-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">País / Diretriz:</label>
                  <select
                    value={newAccForm.country}
                    onChange={(e) => setNewAccForm({ ...newAccForm, country: e.target.value })}
                    className="w-full bg-[#121826] border border-[#1e2638] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-slate-500"
                  >
                    <option value="Alemanha">Alemanha (Recomendada)</option>
                    <option value="Estados Unidos">Estados Unidos</option>
                    <option value="França">França</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Nicho:</label>
                  <select
                    value={newAccForm.niche}
                    onChange={(e) => setNewAccForm({ ...newAccForm, niche: e.target.value })}
                    className="w-full bg-[#121826] border border-[#1e2638] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-slate-500"
                  >
                    <option value="News Atemporal">News Atemporal</option>
                    <option value="Roça Nostálgica">Roça Nostálgica</option>
                    <option value="Curiosidades">Curiosidades</option>
                    <option value="Bebês Fofos">Bebês Fofos IA</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#1e2638]">
                <button
                  type="button"
                  onClick={() => setShowAddAccModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#182032] text-slate-300 hover:text-white font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-white hover:bg-slate-200 text-black font-bold shadow-sm"
                >
                  Criar Conta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
