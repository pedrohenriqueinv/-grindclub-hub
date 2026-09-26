import React, { useState } from 'react';
import { 
  CheckSquare, 
  Square, 
  Plus, 
  RotateCcw, 
  Calendar, 
  Clock, 
  User, 
  Sparkles, 
  Filter, 
  ShieldCheck, 
  Flame, 
  CheckCircle2,
  Trash2,
  AlertCircle,
  Check
} from 'lucide-react';

export default function ChecklistView({ tasks = [], setTasks, currentUser, partnerUser, onOpenMediaModal }) {
  const [activeCategory, setActiveCategory] = useState('diario');
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskTime, setNewTaskTime] = useState('Pendente');
  const [newTaskUser, setNewTaskUser] = useState(currentUser?.name?.split(' ')[0] || 'Pedro');
  const [showAddModal, setShowAddModal] = useState(false);

  // Categorias de tarefas do método Grind Club
  const categories = [
    { id: 'diario', label: 'Rotina Diária Duo', badge: 'Essencial' },
    { id: 'pre', label: 'Checklist Pré-Monetização (0 a 10K)', badge: 'Fase 1' },
    { id: 'pos', label: 'Checklist Pós-Monetização (>60s)', badge: 'Fase 2' },
    { id: 'contingencia', label: 'Contingência & Antidetect', badge: 'Segurança' }
  ];

  const filteredTasks = tasks.filter(t => {
    if (activeCategory === 'diario') return t.category === 'diario' || !t.category;
    return t.category === activeCategory;
  });

  const completedCount = filteredTasks.filter(t => t.done).length;
  const totalCount = filteredTasks.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const toggleTask = (id) => {
    if (!setTasks) return;
    setTasks(prev => prev.map(t => {
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

  const handleResetDaily = () => {
    if (!setTasks) return;
    setTasks(prev => prev.map(t => {
      if (t.category === 'diario' || !t.category) {
        return { ...t, done: false, completedBy: null };
      }
      return t;
    }));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim() || !setTasks) return;

    const newTask = {
      id: Date.now(),
      text: newTaskText.trim(),
      time: newTaskTime || 'Pendente',
      user: newTaskUser,
      category: activeCategory,
      done: false
    };

    setTasks(prev => [newTask, ...prev]);
    setNewTaskText('');
    setNewTaskTime('Pendente');
    setShowAddModal(false);
  };

  const handleDeleteTask = (id) => {
    if (!setTasks) return;
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="flex-1 bg-[#090d14] h-screen overflow-y-auto p-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#19202f] pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#141b29] border border-[#1e2638] flex items-center justify-center text-white">
              <CheckSquare size={18} />
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Checklist Operacional Duo</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-[#141b29] text-slate-300 border border-[#1e2638] text-xs font-semibold">
              Sincronizado em Tempo Real
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Rotina diária de alta performance para Pedro Henrique & Parceiro • Execução disciplinada do método Grind Club
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleResetDaily}
            className="px-3.5 py-2 bg-[#121826] hover:bg-[#1a2336] text-slate-300 hover:text-white text-xs font-semibold rounded-xl border border-[#1e2638] flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw size={14} />
            <span>Resetar Diário</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-white hover:bg-slate-200 text-black font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 transition-all"
          >
            <Plus size={16} />
            <span>Nova Tarefa</span>
          </button>
        </div>
      </div>

      {/* Overview Progress Card */}
      <div className="bg-[#0e131f] border border-[#19202f] rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-2 flex-1">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-white flex items-center gap-2">
              <span>Progresso da Categoria:</span>
              <span className="text-slate-300">{categories.find(c => c.id === activeCategory)?.label}</span>
            </span>
            <span className="text-slate-400 font-mono font-semibold">
              {completedCount} / {totalCount} concluídos ({progressPercent}%)
            </span>
          </div>

          <div className="w-full bg-[#131927] h-2 rounded-full overflow-hidden border border-[#1e2638]">
            <div 
              className="bg-white h-full rounded-full transition-all duration-500" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0 text-xs">
          <div className="p-3 rounded-xl bg-[#121826] border border-[#1e2638] flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-800 text-white font-bold text-xs flex items-center justify-center">
              {currentUser?.avatar || 'PH'}
            </div>
            <div>
              <div className="text-[10px] text-slate-400">Atribuído a</div>
              <div className="font-bold text-white">{currentUser?.name}</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#121826] border border-[#1e2638] flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center">
              {partnerUser?.avatar || 'A'}
            </div>
            <div>
              <div className="text-[10px] text-slate-400">Parceiro</div>
              <div className="font-bold text-white">{partnerUser?.name}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shrink-0 ${
                isActive
                  ? 'bg-white text-black shadow-md'
                  : 'bg-[#0e131f] hover:bg-[#151c2b] text-slate-400 hover:text-slate-200 border border-[#19202f]'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                isActive ? 'bg-black text-white' : 'bg-[#182032] text-slate-400'
              }`}>
                {cat.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Task List */}
      <div className="bg-[#0e131f] border border-[#19202f] rounded-2xl p-5 space-y-3 shadow-lg">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 text-slate-500 space-y-2">
            <CheckCircle2 size={36} className="mx-auto text-slate-600 opacity-60" />
            <p className="text-xs font-medium">Nenhuma tarefa nesta categoria no momento.</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                task.done
                  ? 'bg-[#0c101a]/70 border-[#151c2b] opacity-75'
                  : 'bg-[#121826] border-[#1e2638] hover:border-slate-500'
              }`}
            >
              <div className="flex items-center gap-3.5 flex-1 min-w-0 pr-4">
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors shrink-0 ${
                    task.done
                      ? 'bg-white text-black'
                      : 'border border-slate-600 hover:border-slate-400'
                  }`}
                >
                  {task.done ? <Check size={14} strokeWidth={3} /> : null}
                </button>

                <div className="min-w-0">
                  <p className={`text-xs font-medium leading-snug truncate ${
                    task.done ? 'line-through text-slate-500' : 'text-slate-200'
                  }`}>
                    {task.text}
                  </p>
                  {task.completedBy && (
                    <span className="text-[10px] text-emerald-400 font-semibold block mt-0.5">
                      ✓ Concluído por {task.completedBy}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {task.time && (
                  <span className={`text-[10px] font-mono px-2.5 py-1 rounded-md border ${
                    task.time === 'Pendente' 
                      ? 'bg-[#182032] text-slate-400 border-[#27324b]' 
                      : 'bg-[#141b29] text-slate-200 border-[#1e2638]'
                  }`}>
                    {task.time}
                  </span>
                )}

                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {task.user || 'Duo'}
                </span>

                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="w-7 h-7 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 flex items-center justify-center transition-colors"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Nova Tarefa */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e131f] border border-[#1e2638] rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1e2638] pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Plus size={16} />
                <span>Adicionar Tarefa ao Checklist</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddTask} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold">Descrição da Tarefa:</label>
                <input
                  type="text"
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  placeholder="Ex: Aquecer conta por 1 hora na lupa"
                  className="w-full bg-[#121826] border border-[#1e2638] rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-slate-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-semibold">Horário / Prazo:</label>
                  <input
                    type="text"
                    value={newTaskTime}
                    onChange={(e) => setNewTaskTime(e.target.value)}
                    placeholder="Ex: 10:00 - 11:00 ou Pendente"
                    className="w-full bg-[#121826] border border-[#1e2638] rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-slate-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-semibold">Responsável:</label>
                  <select
                    value={newTaskUser}
                    onChange={(e) => setNewTaskUser(e.target.value)}
                    className="w-full bg-[#121826] border border-[#1e2638] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-slate-500"
                  >
                    <option value={currentUser?.name?.split(' ')[0] || 'Pedro'}>{currentUser?.name}</option>
                    <option value={partnerUser?.name?.split(' ')[0] || 'Parceiro'}>{partnerUser?.name}</option>
                    <option value="Duo">Duo (Ambos)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#1e2638]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#182032] text-slate-300 hover:text-white font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-white hover:bg-slate-200 text-black font-bold"
                >
                  Salvar Tarefa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
