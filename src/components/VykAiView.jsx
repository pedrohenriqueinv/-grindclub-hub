import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  Paperclip, 
  ArrowUp, 
  BookOpen, 
  BarChart2, 
  Image as ImageIcon, 
  DollarSign, 
  Play, 
  Edit3, 
  ExternalLink, 
  ChevronRight,
  MessageSquare,
  Sparkles,
  FileText,
  AtSign,
  Folder,
  Plus,
  Trash2,
  Clock,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { QUICK_ACTIONS, POPULAR_TOPICS, INITIAL_CHAT_MESSAGES } from '../data/courseKnowledge';
import { askVykAiHybrid } from '../data/fullCourseDossier';

const STORAGE_SESSIONS_KEY = 'grindclub_vyk_ai_sessions_v2';
const STORAGE_ACTIVE_ID_KEY = 'grindclub_vyk_ai_active_session_id_v2';

export default function VykAiView({ currentUser, activeAccount, onOpenMediaModal }) {
  // Inicialização segura das sessões de chat a partir do localStorage
  const [sessions, setSessions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_SESSIONS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Erro ao carregar sessões de chat:', e);
    }
    return [
      {
        id: 'session-default',
        title: 'Início da Operação & Criação',
        theme: 'Criação de conta (Alemanha)',
        createdAt: 'Hoje',
        messages: INITIAL_CHAT_MESSAGES
      }
    ];
  });

  const [activeSessionId, setActiveSessionId] = useState(() => {
    try {
      const savedId = localStorage.getItem(STORAGE_ACTIVE_ID_KEY);
      if (savedId) return savedId;
    } catch (e) {}
    return 'session-default';
  });

  // Sessão ativa atual
  const activeSession = sessions.find(s => s.id === activeSessionId) || sessions[0] || {
    id: 'session-default',
    title: 'Início da Operação & Criação',
    theme: 'Criação de conta (Alemanha)',
    messages: []
  };

  const messages = activeSession.messages || [];

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Sincronizar sessões e activeSessionId no localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_SESSIONS_KEY, JSON.stringify(sessions));
      localStorage.setItem(STORAGE_ACTIVE_ID_KEY, activeSessionId);
    } catch (e) {
      console.warn('Erro ao salvar no localStorage:', e);
    }
  }, [sessions, activeSessionId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Criar uma nova conversa com memória limpa
  const handleNewChat = () => {
    const newSessionId = `session-${Date.now()}`;
    const newSession = {
      id: newSessionId,
      title: 'Nova Conversa',
      theme: 'Estratégia Geral',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: 'ai',
          author: 'Vyk AI',
          avatar: 'logo',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: `Fala, ${currentUser?.name?.split(' ')[0] || 'Pedro'}! Iniciei uma nova sessão com memória limpa.\nEm qual etapa ou desafio da operação no TikTok Dark vamos focar agora?`
        }
      ]
    };

    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newSessionId);
  };

  // Excluir uma sessão de conversa
  const handleDeleteSession = (sessionId, e) => {
    e.stopPropagation();
    if (sessions.length <= 1) {
      // Se for a última sessão, apenas reseta
      handleClearCurrentSession();
      return;
    }

    setSessions(prev => {
      const filtered = prev.filter(s => s.id !== sessionId);
      if (activeSessionId === sessionId) {
        setActiveSessionId(filtered[0]?.id || 'session-default');
      }
      return filtered;
    });
  };

  // Limpar histórico da sessão atual
  const handleClearCurrentSession = () => {
    const greetingMsg = {
      id: `msg-${Date.now()}`,
      sender: 'ai',
      author: 'Vyk AI',
      avatar: 'logo',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: `Histórico desta conversa limpo. Como posso te orientar na operação agora?`
    };

    setSessions(prev => prev.map(s => {
      if (s.id === activeSessionId) {
        return {
          ...s,
          messages: [greetingMsg]
        };
      }
      return s;
    }));
  };

  // Envio de mensagem com trabalho sob contexto e histórico
  const handleSendMessage = async (textToSend) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      author: currentUser?.name || 'Pedro Henrique',
      avatar: currentUser?.avatar || 'PH',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: text
    };

    // Atualizar título automaticamente se for a primeira mensagem da sessão
    const isNewSessionTitle = activeSession.title === 'Nova Conversa';
    const smartTitle = isNewSessionTitle 
      ? (text.length > 28 ? `${text.slice(0, 28)}...` : text)
      : activeSession.title;

    // Detectar tema do contexto
    let updatedTheme = activeSession.theme || 'Estratégia Geral';
    const textLower = text.toLowerCase();
    if (textLower.includes('cnh') || textLower.includes('paypal') || textLower.includes('saque')) {
      updatedTheme = 'Validação & Pagamentos';
    } else if (textLower.includes('news') || textLower.includes('roteiro') || textLower.includes('igor')) {
      updatedTheme = 'Roteiros & Mineração News';
    } else if (textLower.includes('alemanha') || textLower.includes('dolphin') || textLower.includes('proxy')) {
      updatedTheme = 'Fundação & Contingência';
    } else if (textLower.includes('capcut') || textLower.includes('reve') || textLower.includes('fish audio')) {
      updatedTheme = 'Edição & Ferramentas IA';
    }

    // Adicionar mensagem do usuário na sessão ativa
    const currentMessages = [...(activeSession.messages || []), userMsg];
    setSessions(prev => prev.map(s => {
      if (s.id === activeSessionId) {
        return {
          ...s,
          title: smartTitle,
          theme: updatedTheme,
          messages: currentMessages
        };
      }
      return s;
    }));

    if (!textToSend) setInputValue('');
    setIsTyping(true);

    try {
      // Envia histórico completo da conversa + contexto da conta ativa para a IA trabalhar sobre contexto
      const accountContext = activeAccount ? {
        handle: activeAccount.handle,
        niche: activeAccount.niche,
        status: activeAccount.status,
        followers: activeAccount.followers
      } : null;

      const result = await askVykAiHybrid(text, currentMessages, accountContext);

      const aiMsg = {
        id: `msg-${Date.now()}`,
        sender: 'ai',
        author: 'Vyk AI',
        avatar: 'logo',
        source: result.source,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: result.text,
        card: result.card || null,
        prints: result.prints || []
      };

      // Adicionar resposta da IA e persistir
      setSessions(prev => prev.map(s => {
        if (s.id === activeSessionId) {
          return {
            ...s,
            messages: [...currentMessages, aiMsg]
          };
        }
        return s;
      }));
    } catch (err) {
      console.error('Erro na resposta:', err);
    } finally {
      setIsTyping(false);
    }
  };

  const renderIcon = (type) => {
    switch (type) {
      case 'book': return <BookOpen size={16} className="text-slate-300" />;
      case 'barchart': return <BarChart2 size={16} className="text-slate-300" />;
      case 'image': return <ImageIcon size={16} className="text-slate-300" />;
      case 'dollar': return <DollarSign size={16} className="text-slate-300" />;
      default: return <Sparkles size={16} className="text-slate-300" />;
    }
  };

  return (
    <div className="flex-1 flex h-screen overflow-hidden bg-[#090d14]">
      {/* Central Column: Chat & Hero */}
      <div className="flex-1 flex flex-col h-full border-r border-[#19202f] overflow-hidden">
        {/* Top Header */}
        <header className="h-14 border-b border-[#19202f] px-6 sm:px-8 flex items-center justify-between bg-[#090d14]/90 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold text-white tracking-wide">Vyk AI</span>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Online
              </div>
            </div>

            <span className="text-slate-600 hidden sm:inline">|</span>

            {/* Título da Conversa Ativa */}
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-300 max-w-xs truncate">
              <MessageSquare size={13} className="text-slate-500 shrink-0" />
              <span className="font-semibold truncate">{activeSession.title}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Botão Nova Conversa */}
            <button
              onClick={handleNewChat}
              className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-200 text-black font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
              title="Iniciar novo chat com memória limpa"
            >
              <Plus size={14} />
              <span className="hidden sm:inline">Nova Conversa</span>
            </button>

            {/* Search Bar */}
            <div className="relative w-48 hidden md:block">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Buscar mensagens..."
                className="w-full bg-[#0e131f] border border-[#19202f] rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-300 placeholder:text-slate-500 focus:outline-none focus:border-slate-500"
              />
            </div>

            {/* User Avatar */}
            <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[11px] font-bold text-white shadow-sm">
              {currentUser?.avatar || 'PH'}
            </div>
          </div>
        </header>

        {/* Scrollable Chat Area */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 space-y-6">
          {/* Se a conversa tiver poucas mensagens, mostra o Hero e as Ações Rápidas */}
          {messages.length <= 2 && (
            <div className="text-center max-w-xl mx-auto pt-2 pb-2">
              <div className="w-14 h-14 rounded-full bg-[#121826] border border-[#1e2638] mx-auto flex items-center justify-center shadow-lg mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="text-white">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 3v4m0 10v4m-9-9h4m10 0h4" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              </div>

              <h1 className="text-xl font-extrabold text-white tracking-tight">Vyk AI Copilot</h1>
              <p className="text-xs font-semibold text-slate-400 mt-0.5">Memória Contínua • Método Oficial Grind Club</p>

              {/* Quick Actions (4 Cards Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 max-w-4xl mx-auto mt-4">
                {QUICK_ACTIONS.map((qa) => (
                  <button
                    key={qa.id}
                    onClick={() => handleSendMessage(qa.prompt)}
                    className="bg-[#0e131f] hover:bg-[#131927] border border-[#19202f] hover:border-slate-500 rounded-xl p-3 text-left transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="w-6 h-6 rounded-md bg-[#141b29] flex items-center justify-center">
                          {renderIcon(qa.icon)}
                        </div>
                        <span className="text-slate-500 group-hover:text-white transition-colors text-xs">→</span>
                      </div>
                      <div className="text-xs font-bold text-white group-hover:text-slate-100 transition-colors">
                        {qa.title.replace(' →', '')}
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5 leading-snug line-clamp-2">
                        {qa.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages Stream */}
          <div className="max-w-3xl mx-auto space-y-5 pt-2">
            {messages.map((msg) => (
              <div key={msg.id} className="space-y-3">
                {msg.sender === 'user' ? (
                  /* User Message Bubble */
                  <div className="flex justify-end items-end gap-2.5">
                    <div className="bg-[#141b29] border border-[#1e2638] rounded-2xl rounded-tr-sm px-4 py-3 max-w-lg text-xs text-slate-100 leading-relaxed shadow-md">
                      {msg.text}
                      <div className="text-[10px] text-slate-500 text-right mt-1.5">{msg.time}</div>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                      {msg.avatar}
                    </div>
                  </div>
                ) : (
                  /* AI Message Bubble */
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#121826] border border-[#1e2638] flex items-center justify-center shrink-0 mt-0.5">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="text-white">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 3v4m0 10v4m-9-9h4m10 0h4" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </div>

                    <div className="space-y-3 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{msg.author}</span>
                        <span className="text-[10px] text-slate-500">{msg.time}</span>
                      </div>

                      <div className="text-xs text-slate-200 leading-relaxed whitespace-pre-line font-sans">
                        {msg.text}
                      </div>

                      {/* Structured Card if present */}
                      {msg.card && (
                        <div className="bg-[#0e131f] border border-[#19202f] rounded-2xl p-4 space-y-3.5 shadow-lg max-w-xl mt-2">
                          <h4 className="text-xs font-bold text-white tracking-wide border-b border-[#19202f] pb-2">
                            {msg.card.title}
                          </h4>

                          {msg.card.steps && msg.card.steps.length > 0 && (
                            <div className="space-y-2.5">
                              {msg.card.steps.map((st, idx) => (
                                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                                  <span className="w-4 h-4 rounded-full bg-[#141b29] text-slate-300 border border-[#1e2638] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                    {idx + 1}
                                  </span>
                                  <span className="leading-snug">{st}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Action Buttons */}
                          {msg.card.actions && (
                            <div className="flex items-center gap-2 pt-2 border-t border-[#19202f]">
                              {msg.card.actions.map((act, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => onOpenMediaModal(act.actionType || act.type, act.target)}
                                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                                    idx === 0
                                      ? 'bg-white hover:bg-slate-200 text-black shadow-sm'
                                      : 'bg-[#141b29] hover:bg-[#1a2336] text-slate-200 border border-[#1e2638]'
                                  }`}
                                >
                                  {idx === 0 ? <Play size={11} className="fill-black" /> : null}
                                  <span>{act.label}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-400 pl-11">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px] text-slate-400 ml-1">Vyk AI está formulando a resposta...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Bar Footer */}
        <div className="p-4 border-t border-[#19202f] bg-[#090d14]">
          <div className="max-w-3xl mx-auto space-y-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="bg-[#0e131f] border border-[#19202f] rounded-full px-4 py-2 flex items-center gap-2.5 shadow-xl focus-within:border-slate-500 transition-colors"
            >
              <button
                type="button"
                className="text-slate-400 hover:text-white flex items-center justify-center transition-colors shrink-0"
              >
                <Paperclip size={16} />
              </button>

              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Digite sua mensagem para o Vyk AI (memória contínua ativa)..."
                className="flex-1 bg-transparent border-none text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none"
              />

              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="w-8 h-8 rounded-full bg-[#1e2638] hover:bg-white text-white hover:text-black disabled:opacity-30 flex items-center justify-center transition-all shrink-0 font-bold"
              >
                <ArrowUp size={16} strokeWidth={2.5} />
              </button>
            </form>

            <div className="flex items-center justify-between text-[10px] text-slate-500 px-2">
              <span>Sessão atual: <strong className="text-slate-400">{activeSession.title}</strong></span>
              <span>Memória persistente ativa • Salvo no navegador</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Chats Salvos, Contexto & Tópicos */}
      <div className="w-80 h-full overflow-y-auto p-5 space-y-6 bg-[#090d14] shrink-0 border-l border-[#19202f]">
        {/* Bloco 1: Histórico de Conversas Salvas (Memória) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-slate-400" />
              <h3 className="text-xs font-bold text-white tracking-wide">Chats Salvos</h3>
              <span className="text-[10px] font-mono text-slate-400 bg-[#121826] px-1.5 py-0.2 rounded border border-[#1e2638]">
                {sessions.length}
              </span>
            </div>

            <button
              onClick={handleNewChat}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-semibold transition-colors"
              title="Nova Conversa"
            >
              <Plus size={13} />
              <span>Novo</span>
            </button>
          </div>

          {/* Lista de Sessões Salvas */}
          <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
            {sessions.map((sess) => {
              const isActive = sess.id === activeSessionId;
              const msgCount = sess.messages?.length || 0;
              return (
                <div
                  key={sess.id}
                  onClick={() => setActiveSessionId(sess.id)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer group flex items-center justify-between text-xs ${
                    isActive
                      ? 'bg-[#121826] border-white/30 text-white shadow-sm'
                      : 'bg-[#0e131f] hover:bg-[#121826] border-[#19202f] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <MessageSquare size={13} className={isActive ? 'text-white shrink-0' : 'text-slate-600 shrink-0'} />
                    <div className="min-w-0">
                      <div className="font-semibold truncate text-[11px] leading-tight">
                        {sess.title}
                      </div>
                      <div className="text-[9px] text-slate-500 flex items-center gap-1.5 mt-0.5 font-mono">
                        <span>{sess.createdAt}</span>
                        <span>•</span>
                        <span>{msgCount} msgs</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleDeleteSession(sess.id, e)}
                    className="text-slate-600 hover:text-rose-400 p-1 rounded transition-colors opacity-0 group-hover:opacity-100 shrink-0"
                    title="Excluir este chat"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bloco 2: Contexto Operacional em Tempo Real */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white tracking-wide">Contexto da Conversa</h3>
            <button
              onClick={handleClearCurrentSession}
              className="text-[10px] text-slate-500 hover:text-slate-300 flex items-center gap-1 transition-colors"
              title="Limpar mensagens desta conversa"
            >
              <RotateCcw size={11} />
              <span>Limpar</span>
            </button>
          </div>

          <div className="bg-[#0e131f] border border-[#19202f] rounded-2xl p-4 space-y-3 text-xs">
            <div className="flex items-start gap-2.5">
              <BookOpen size={14} className="text-slate-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-slate-500 block">Tema Ativo</span>
                <span className="text-slate-200 font-medium">{activeSession.theme || 'Estratégia Geral'}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 pt-2 border-t border-[#19202f]">
              <AtSign size={14} className="text-slate-400 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] text-slate-500 block">Conta Relacionada</span>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-slate-200 font-semibold truncate text-[11px]">{activeAccount?.handle || '@canal.alemanha01'}</span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                    {activeAccount?.status || 'Ativa'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2.5 pt-2 border-t border-[#19202f]">
              <Folder size={14} className="text-slate-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-slate-500 block">Memória de Contexto</span>
                <span className="text-slate-200 font-medium">{messages.length} mensagens preservadas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bloco 3: Tópicos Populares */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-white tracking-wide">
            Tópicos Populares do Dossiê
          </h3>
          <div className="space-y-1.5">
            {POPULAR_TOPICS.map((top, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(top.prompt)}
                className="w-full text-left p-2.5 rounded-xl bg-[#0e131f] hover:bg-[#131927] border border-[#19202f] hover:border-slate-600 transition-all group flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2 truncate pr-2">
                  <MessageSquare size={13} className="text-slate-500 group-hover:text-white shrink-0" />
                  <span className="text-slate-300 group-hover:text-white font-medium truncate text-[11px]">
                    {top.title}
                  </span>
                </div>
                <ChevronRight size={13} className="text-slate-600 group-hover:text-white shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
