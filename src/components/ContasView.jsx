import React, { useState } from 'react';
import { Plus, Shield, Globe, Smartphone, CheckCircle, AlertCircle, RefreshCw, Trash2, Edit2, Check } from 'lucide-react';

export default function ContasView({ 
  currentUser, 
  partnerUser,
  accounts = [],
  setAccounts,
  activeAccount,
  setActiveAccount,
  onAddAccount,
  onUpdateAccount,
  onDeleteAccount
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAcc, setEditingAcc] = useState(null);
  const [newAcc, setNewAcc] = useState({
    handle: '',
    niche: 'News Atemporal',
    responsible: currentUser?.name || 'Pedro Henrique',
    country: 'Alemanha',
    environment: 'Dolphin Anty',
    proxy: 'IP Residencial Dedicado (Socks5)',
    status: 'Criando',
    followersCount: 0,
    viewsCount: 0
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newAcc.handle.trim()) return;

    if (onAddAccount) {
      onAddAccount({
        handle: newAcc.handle,
        niche: newAcc.niche,
        country: newAcc.country,
        responsible: newAcc.responsible,
        proxy: newAcc.proxy,
        status: newAcc.status,
        followersCount: Number(newAcc.followersCount) || 0,
        viewsCount: Number(newAcc.viewsCount) || 0
      });
    }

    setNewAcc({
      handle: '',
      niche: 'News Atemporal',
      responsible: currentUser?.name || 'Pedro Henrique',
      country: 'Alemanha',
      environment: 'Dolphin Anty',
      proxy: 'IP Residencial Dedicado (Socks5)',
      status: 'Criando',
      followersCount: 0,
      viewsCount: 0
    });
    setShowAddModal(false);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingAcc) return;

    if (onUpdateAccount) {
      onUpdateAccount(editingAcc.id, {
        status: editingAcc.status,
        followersCount: Number(editingAcc.followersCount),
        viewsCount: Number(editingAcc.viewsCount),
        proxy: editingAcc.proxy,
        niche: editingAcc.niche
      });
    }
    setEditingAcc(null);
  };

  return (
    <div className="flex-1 bg-[#090d14] h-screen overflow-y-auto p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#19202f] pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Gerenciador de Contas & Contingência</h1>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#121826] text-slate-300 border border-[#1e2638]">
              {accounts.length} Contas Ativas
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Controle de perfis Dark Gringo, isolamento de antidetect (Dolphin Anty) e proxies residenciais
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-white hover:bg-slate-200 text-black font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 transition-all self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Cadastrar Nova Conta</span>
        </button>
      </div>

      {/* Contas Grid */}
      {accounts.length === 0 ? (
        <div className="bg-[#0e131f] border border-dashed border-[#19202f] rounded-2xl p-12 text-center max-w-xl mx-auto space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#141b29] border border-[#1e2638] text-white flex items-center justify-center mx-auto">
            <Globe size={24} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Nenhuma conta cadastrada ainda</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Sua operação está zerada e pronta para iniciar. Cadastre a sua primeira conta com diretriz da Alemanha para começar o aquecimento.
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-2.5 bg-white hover:bg-slate-200 text-black text-xs font-bold rounded-xl transition-all shadow-md"
          >
            + Cadastrar Primeira Conta
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {accounts.map((acc) => {
            const isSelected = activeAccount?.id === acc.id;
            return (
              <div 
                key={acc.id} 
                className={`bg-[#0e131f] border rounded-2xl p-5 space-y-4 transition-all relative ${
                  isSelected 
                    ? 'border-white ring-1 ring-white/30 shadow-xl' 
                    : 'border-[#19202f] hover:border-[#27324b]'
                }`}
              >
                {/* Header do Card */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-sm text-white overflow-hidden">
                      {acc.avatar ? (
                        <img src={acc.avatar} alt={acc.handle} loading="lazy" className="w-full h-full object-cover" />
                      ) : (
                        acc.handle.slice(1, 3).toUpperCase()
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white tracking-wide flex items-center gap-1.5">
                        <span>{acc.handle}</span>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Conta Ativa no Copilot" />
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium">{acc.niche || 'News Atemporal'}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setEditingAcc(acc)}
                      className="text-slate-500 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-[#141b29]"
                      title="Editar Métricas"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => onDeleteAccount && onDeleteAccount(acc.id)}
                      className="text-slate-600 hover:text-rose-400 transition-colors p-1.5 rounded-lg hover:bg-[#141b29]"
                      title="Excluir Conta"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Métricas Zeradas ou em Progresso */}
                <div className="grid grid-cols-2 gap-2 bg-[#121826] p-3 rounded-xl border border-[#1e2638] text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Seguidores</span>
                    <span className="font-bold text-white text-sm mt-0.5 block">{acc.followers || '0 / 10.000'}</span>
                    <span className="text-[9px] text-slate-500">Progresso: {acc.percent || 0}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Visualizações</span>
                    <span className="font-bold text-white text-sm mt-0.5 block">{acc.views || '0 / 100K'}</span>
                    <span className="text-[9px] text-slate-500">Qualificadas</span>
                  </div>
                </div>

                {/* Detalhes Técnicos */}
                <div className="space-y-2 pt-1 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Diretriz:</span>
                    <span className="text-white font-medium flex items-center gap-1">
                      <span>{acc.flag || '🇩🇪'}</span>
                      <span>{acc.country || 'Alemanha'}</span>
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Proxy Dedicado:</span>
                    <span className="text-slate-300 font-mono text-[11px] truncate max-w-[170px]">{acc.proxy || 'Socks5 Residencial'}</span>
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="pt-2 border-t border-[#19202f] flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#141b29] text-slate-300 border border-[#1e2638]">
                    {acc.status}
                  </span>

                  <button
                    onClick={() => setActiveAccount(acc)}
                    className={`text-xs px-3 py-1 rounded-lg font-bold transition-all ${
                      isSelected
                        ? 'bg-white text-black'
                        : 'bg-[#182032] hover:bg-[#222d45] text-slate-300 hover:text-white border border-[#27324b]'
                    }`}
                  >
                    {isSelected ? '● Ativa' : 'Tornar Ativa'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal de Cadastro de Nova Conta */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0e131f] border border-[#1e2638] rounded-2xl w-full max-w-lg p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1e2638] pb-3">
              <h3 className="text-base font-bold text-white">Cadastrar Nova Conta no Hub</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white text-xs p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Handle da Conta (@):</label>
                <input
                  type="text"
                  required
                  placeholder="@canal.alemanha03"
                  value={newAcc.handle}
                  onChange={(e) => setNewAcc({ ...newAcc, handle: e.target.value })}
                  className="w-full bg-[#121826] border border-[#1e2638] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-slate-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Nicho:</label>
                  <select
                    value={newAcc.niche}
                    onChange={(e) => setNewAcc({ ...newAcc, niche: e.target.value })}
                    className="w-full bg-[#121826] border border-[#1e2638] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-slate-500"
                  >
                    <option value="News Atemporal">News Atemporal</option>
                    <option value="Roça Nostálgica">Roça Nostálgica</option>
                    <option value="Curiosidades">Curiosidades</option>
                    <option value="Bebês Fofos">Bebês Fofos IA</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">País / Diretriz:</label>
                  <select
                    value={newAcc.country}
                    onChange={(e) => setNewAcc({ ...newAcc, country: e.target.value })}
                    className="w-full bg-[#121826] border border-[#1e2638] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-slate-500"
                  >
                    <option value="Alemanha">Alemanha (Recomendada)</option>
                    <option value="Estados Unidos">Estados Unidos</option>
                    <option value="França">França</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Seguidores Iniciais:</label>
                  <input
                    type="number"
                    value={newAcc.followersCount}
                    onChange={(e) => setNewAcc({ ...newAcc, followersCount: e.target.value })}
                    className="w-full bg-[#121826] border border-[#1e2638] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-slate-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Visualizações Iniciais:</label>
                  <input
                    type="number"
                    value={newAcc.viewsCount}
                    onChange={(e) => setNewAcc({ ...newAcc, viewsCount: e.target.value })}
                    className="w-full bg-[#121826] border border-[#1e2638] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Proxy Dedicado / Socks5:</label>
                <input
                  type="text"
                  placeholder="IP Residencial Alemanha (Socks5)"
                  value={newAcc.proxy}
                  onChange={(e) => setNewAcc({ ...newAcc, proxy: e.target.value })}
                  className="w-full bg-[#121826] border border-[#1e2638] rounded-xl px-3.5 py-2 text-white font-mono focus:outline-none focus:border-slate-500"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-[#1e2638]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-[#182032] transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-white hover:bg-slate-200 text-black transition-colors"
                >
                  Salvar Conta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Edição de Conta */}
      {editingAcc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0e131f] border border-[#1e2638] rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1e2638] pb-3">
              <h3 className="text-sm font-bold text-white">Editar Conta: {editingAcc.handle}</h3>
              <button 
                onClick={() => setEditingAcc(null)}
                className="text-slate-400 hover:text-white text-xs p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Status Operacional:</label>
                <select
                  value={editingAcc.status}
                  onChange={(e) => setEditingAcc({ ...editingAcc, status: e.target.value })}
                  className="w-full bg-[#121826] border border-[#1e2638] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-slate-500"
                >
                  <option value="Criando">Criando (Passo 1)</option>
                  <option value="Aquecendo">Aquecendo (Lupa & Filtros)</option>
                  <option value="Postando (Pré-10k)">Postando (Pré-10k)</option>
                  <option value="Monetizada">Monetizada (&gt;10k &amp; Aprovada)</option>
                  <option value="Em Apelação">Em Apelação (Vídeo Desqualificado)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Seguidores:</label>
                  <input
                    type="number"
                    value={editingAcc.followersCount}
                    onChange={(e) => setEditingAcc({ ...editingAcc, followersCount: e.target.value })}
                    className="w-full bg-[#121826] border border-[#1e2638] rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-slate-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Visualizações:</label>
                  <input
                    type="number"
                    value={editingAcc.viewsCount}
                    onChange={(e) => setEditingAcc({ ...editingAcc, viewsCount: e.target.value })}
                    className="w-full bg-[#121826] border border-[#1e2638] rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Proxy / Informações:</label>
                <input
                  type="text"
                  value={editingAcc.proxy || ''}
                  onChange={(e) => setEditingAcc({ ...editingAcc, proxy: e.target.value })}
                  className="w-full bg-[#121826] border border-[#1e2638] rounded-xl px-3.5 py-2 text-white font-mono focus:outline-none focus:border-slate-500"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-[#1e2638]">
                <button
                  type="button"
                  onClick={() => setEditingAcc(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-[#182032] transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-white hover:bg-slate-200 text-black transition-colors"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
