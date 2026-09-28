import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import VykAiView from './components/VykAiView';
import DashboardView from './components/DashboardView';
import ChecklistView from './components/ChecklistView';
import ContasView from './components/ContasView';
import RoadmapView from './components/RoadmapView';
import EstudioView from './components/EstudioView';
import CalculadoraView from './components/CalculadoraView';
import TutoriaisView from './components/TutoriaisView';
import ApelacoesView from './components/ApelacoesView';
import ConfiguracoesView from './components/ConfiguracoesView';
import MediaModal from './components/MediaModal';
import { DEFAULT_PARTNER_PROFILE, DEFAULT_PROFILE } from './data/profiles';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Estado dos membros do Plano Duo
  const [currentUser, setCurrentUser] = useState(DEFAULT_PROFILE);

  const [partnerUser, setPartnerUser] = useState(DEFAULT_PARTNER_PROFILE);

  // CONTAS TOTALMENTE ZERADAS POR PADRÃO ("Zero KM") CONFORME SOLICITADO
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      handle: '@canal.alemanha01',
      country: 'Alemanha',
      flag: '🇩🇪',
      followers: '0 / 10.000',
      followersCount: 0,
      views: '0 / 100K',
      viewsCount: 0,
      percent: 0,
      status: 'Criando',
      niche: 'News Atemporal (Igor)',
      proxy: 'IP Dedicado Alemanha (Socks5)',
      avatar: '/media/news_reporter.jpg'
    },
    {
      id: 2,
      handle: '@canal.alemanha02',
      country: 'Alemanha',
      flag: '🇩🇪',
      followers: '0 / 10.000',
      followersCount: 0,
      views: '0 / 100K',
      viewsCount: 0,
      percent: 0,
      status: 'Criando',
      niche: 'Roça Nostálgica / Emocional',
      proxy: 'IP Dedicado Alemanha (Socks5)',
      avatar: '/media/nicho_roca.jpg'
    }
  ]);

  // Conta ativa em foco no Hub e no Copilot Vyk AI
  const [activeAccount, setActiveAccount] = useState(accounts[0]);

  // Funções dinâmicas de gerenciamento de contas
  const handleAddAccount = (newAccData) => {
    const newAcc = {
      id: Date.now(),
      handle: newAccData.handle.startsWith('@') ? newAccData.handle : `@${newAccData.handle}`,
      country: newAccData.country || 'Alemanha',
      flag: '🇩🇪',
      followers: `${newAccData.followersCount || 0} / 10.000`,
      followersCount: Number(newAccData.followersCount) || 0,
      views: `${(Number(newAccData.viewsCount) / 1000).toFixed(1)}K / 100K`,
      viewsCount: Number(newAccData.viewsCount) || 0,
      percent: Math.min(100, Math.round(((Number(newAccData.followersCount) || 0) / 10000) * 100)),
      status: newAccData.status || 'Criando',
      niche: newAccData.niche || 'Geral',
      proxy: newAccData.proxy || 'Socks5 Alemanha',
      avatar: '/media/tiktok_signup_alemanha.jpg'
    };
    setAccounts(prev => [...prev, newAcc]);
    setActiveAccount(newAcc);
  };

  const handleUpdateAccount = (id, updatedFields) => {
    setAccounts(prev => prev.map(acc => {
      if (acc.id === id) {
        const followersCount = updatedFields.followersCount !== undefined ? Number(updatedFields.followersCount) : acc.followersCount;
        const viewsCount = updatedFields.viewsCount !== undefined ? Number(updatedFields.viewsCount) : acc.viewsCount;
        const percent = Math.min(100, Math.round((followersCount / 10000) * 100));

        const updated = {
          ...acc,
          ...updatedFields,
          followersCount,
          viewsCount,
          followers: `${followersCount.toLocaleString('pt-BR')} / 10.000`,
          views: `${(viewsCount / 1000).toFixed(1)}K / 100K`,
          percent
        };

        if (activeAccount?.id === id) {
          setActiveAccount(updated);
        }
        return updated;
      }
      return acc;
    }));
  };

  const handleDeleteAccount = (id) => {
    setAccounts(prev => {
      const remaining = prev.filter(a => a.id !== id);
      if (activeAccount?.id === id && remaining.length > 0) {
        setActiveAccount(remaining[0]);
      }
      return remaining;
    });
  };

  // CHECKLIST TOTALMENTE ZERADO (0 concluídos) PARA INÍCIO REAL DA OPERAÇÃO
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Aquecer Conta 01 (1h de lupa no nicho)', done: false, time: '10:00 - 11:00', user: 'Pedro', category: 'diario' },
    { id: 2, text: 'Postar 2 vídeos curtos (Pré-monetização)', done: false, time: '12:30', user: 'Pedro', category: 'diario' },
    { id: 3, text: 'Minerar 3 temas na extensão Sort Feed', done: false, time: 'Pendente', user: 'Pra Noia', category: 'diario' },
    { id: 4, text: 'Editar 1 vídeo > 60s (Pós-monetização)', done: false, time: 'Pendente', user: 'Pedro', category: 'diario' },
    { id: 5, text: 'Responder comentários', done: false, time: 'Pendente', user: 'Pra Noia', category: 'diario' },
    { id: 6, text: 'Analisar métricas e ajustar estratégia', done: false, time: 'Pendente', user: 'Pedro', category: 'diario' },
    { id: 7, text: 'Criar e-mail Outlook exclusivo em guia anônima', done: false, time: 'Fase 1', user: 'Pedro', category: 'pre' },
    { id: 8, text: 'Cadastrar no TikTok Web selecionando país Alemanha no rodapé', done: false, time: 'Fase 1', user: 'Pedro', category: 'pre' },
    { id: 9, text: 'Gravar 5s câmera nativa + 5s mini-games filter (anti-bot)', done: false, time: 'Fase 1', user: 'Pra Noia', category: 'pre' },
    { id: 10, text: 'Submeter foto nítida da CNH brasileira (país Brasil)', done: false, time: 'Fase 2', user: 'Pedro', category: 'pos' },
    { id: 11, text: 'Conectar conta do PayPal brasileiro (sem Tax Form)', done: false, time: 'Fase 2', user: 'Pedro', category: 'pos' },
    { id: 12, text: 'Configurar 10 perfis gratuitos no Dolphin Anty', done: false, time: 'Setup', user: 'Pedro', category: 'contingencia' },
    { id: 13, text: 'Adicionar proxy residencial Socks5 da Alemanha', done: false, time: 'Setup', user: 'Pra Noia', category: 'contingencia' }
  ]);

  // Modal interativo de mídias
  const [modalData, setModalData] = useState(null);

  const handleOpenMediaModal = (type, target) => {
    setModalData({ type, target });
  };

  const handleCloseMediaModal = () => {
    setModalData(null);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#090d14] text-slate-100 antialiased selection:bg-white selection:text-black">
      {/* Coluna 1: Sidebar Fixa Monocromática */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        partnerUser={partnerUser}
        setPartnerUser={setPartnerUser}
      />

      {/* Área de Conteúdo Principal */}
      <main className="flex-1 min-w-0 flex overflow-hidden">
        {activeTab === 'dashboard' && (
          <DashboardView
            currentUser={currentUser}
            partnerUser={partnerUser}
            tasks={tasks}
            setTasks={setTasks}
            accounts={accounts}
            activeAccount={activeAccount}
            setActiveAccount={setActiveAccount}
            onAddAccount={handleAddAccount}
            onUpdateAccount={handleUpdateAccount}
            onDeleteAccount={handleDeleteAccount}
            onNavigateTab={setActiveTab}
            onOpenMediaModal={handleOpenMediaModal}
          />
        )}

        {activeTab === 'checklist' && (
          <ChecklistView
            tasks={tasks}
            setTasks={setTasks}
            currentUser={currentUser}
            partnerUser={partnerUser}
            onOpenMediaModal={handleOpenMediaModal}
          />
        )}

        {activeTab === 'vyk-ai' && (
          <VykAiView
            currentUser={currentUser}
            activeAccount={activeAccount}
            onOpenMediaModal={handleOpenMediaModal}
          />
        )}

        {activeTab === 'contas' && (
          <ContasView
            currentUser={currentUser}
            partnerUser={partnerUser}
            accounts={accounts}
            setAccounts={setAccounts}
            activeAccount={activeAccount}
            setActiveAccount={setActiveAccount}
            onAddAccount={handleAddAccount}
            onUpdateAccount={handleUpdateAccount}
            onDeleteAccount={handleDeleteAccount}
          />
        )}

        {activeTab === 'roadmap' && (
          <RoadmapView
            onOpenMediaModal={handleOpenMediaModal}
          />
        )}

        {activeTab === 'estudio' && (
          <EstudioView />
        )}

        {activeTab === 'calculadora' && (
          <CalculadoraView />
        )}

        {activeTab === 'tutoriais' && (
          <TutoriaisView
            onOpenMediaModal={handleOpenMediaModal}
          />
        )}

        {activeTab === 'apelacoes' && (
          <ApelacoesView />
        )}

        {activeTab === 'configuracoes' && (
          <ConfiguracoesView
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            partnerUser={partnerUser}
            setPartnerUser={setPartnerUser}
          />
        )}
      </main>

      {modalData && (
        <MediaModal
          modalData={modalData}
          onClose={handleCloseMediaModal}
        />
      )}
    </div>
  );
}
