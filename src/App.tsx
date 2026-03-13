/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  Pill, 
  Search, 
  AlertTriangle, 
  Info, 
  ClipboardList, 
  Send,
  User,
  Bot,
  Loader2,
  ShieldCheck,
  LayoutGrid,
  X,
  AlertOctagon,
  Sparkles,
  Wifi,
  WifiOff,
  BookOpen,
  Check,
  CheckCheck,
  Clock
} from 'lucide-react';
import Markdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { askPharmaAI } from './services/geminiService';
import { 
  OFFLINE_MEDS, 
  OFFLINE_INTERACTIONS, 
  OFFLINE_LEGISLATION,
  MEDS_MAP,
  SEARCH_INDEX,
  Medication,
  Interaction,
  Legislation
} from './data/offlineDatabase';
import { GoogleGenAI } from "@google/genai";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  status?: 'sending' | 'sent' | 'read';
}

const getApiKey = () => {
  const key = process.env.GEMINI_API_KEY;
  if (!key || key === "MY_GEMINI_API_KEY" || key === "" || key.includes("TODO")) {
    return null;
  }
  return key;
};

const SEARCH_SUGGESTIONS = [
  'Amoxicilina',
  'Paracetamol posologia',
  'Interações Sildenafila',
  'Dipirona gotas dose',
  'Ibuprofeno infantil',
  'Omeprazol jejum',
  'Varfarina interações',
  'Azitromicina 500mg',
  'Mounjaro indicação',
  'Ozempic efeitos colaterais',
  'Posologia Amoxicilina',
  'Interações Varfarina',
  'Dose Dipirona infantil'
];

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Olá! Sou o **PharmaWise AI**, seu assistente especializado em farmácia de dispensação. Como posso ajudar você hoje com informações sobre medicamentos, interações ou posologia?\n\n*Este aplicativo não substitui a orientação médica ou farmacêutica. É indispensável a consulta com estes profissionais.*',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'read'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showReference, setShowReference] = useState(false);
  const [activeTab, setActiveTab] = useState<'meds' | 'interactions' | 'legislation'>('meds');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [isGeneratingLogo, setIsGeneratingLogo] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior, block: 'end' });
    } else if (scrollRef.current) {
      const { scrollHeight, clientHeight } = scrollRef.current;
      scrollRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior
      });
    }
  };

  useEffect(() => {
    // Small delay to ensure DOM is updated and images/markdown are rendered
    const timeoutId = setTimeout(() => {
      scrollToBottom('smooth');
    }, 150);
    return () => clearTimeout(timeoutId);
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setInput('');
    setMessages(prev => [...prev, { 
      role: 'user', 
      content: userMessage, 
      timestamp, 
      status: 'sending' as const
    }]);
    setIsLoading(true);

    // Update status to sent after a tiny delay
    setTimeout(() => {
      setMessages(prev => prev.map((m, i) => 
        i === prev.length - 1 ? { ...m, status: 'sent' as const } : m
      ));
    }, 500);

    // Check offline database first
    const offlineResponse = searchOffline(userMessage);
    const isDirectMatch = !offlineResponse.includes('Sinto muito, não encontrei');

    if (!isOnline || isDirectMatch) {
      setTimeout(() => {
        setMessages(prev => [
          ...prev.map(m => m.role === 'user' ? { ...m, status: 'read' as const } : m),
          { 
            role: 'assistant', 
            content: offlineResponse, 
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'read' as const
          }
        ]);
        setIsLoading(false);
      }, 1000);
      return;
    }

    try {
      const history = messages
        .filter(m => m.content !== messages[0].content)
        .map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        }));

      const response = await askPharmaAI(userMessage, history);
      setMessages(prev => [
        ...prev.map(m => m.role === 'user' ? { ...m, status: 'read' as const } : m),
        { 
          role: 'assistant', 
          content: response || 'Desculpe, não consegui processar sua solicitação.', 
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'read' as const
        }
      ]);
    } catch (error: any) {
      let errorMessage = 'Ocorreu um erro ao processar sua pergunta. Por favor, tente novamente mais tarde.';
      
      if (error.message === 'API_KEY_MISSING') {
        errorMessage = '### 🔑 Erro de Configuração da API\n\nA chave da API do Gemini não foi detectada.\n\n**Como resolver:**\n1. Clique no ícone de **Configurações** (engrenagem) no menu lateral do AI Studio.\n2. Vá em **Secrets**.\n3. Certifique-se de que a `GEMINI_API_KEY` está configurada corretamente.\n4. Se você acabou de adicionar, tente atualizar a página.';
      } else if (error.message?.includes('quota') || error.message?.includes('429')) {
        errorMessage = '### ⏳ Limite de Uso Atingido\n\nVocê atingiu o limite de uso gratuito do Gemini para este período.\n\n**O que fazer:**\n1. Aguarde alguns minutos ou horas para o limite resetar.\n2. Verifique se você está usando o modelo correto nas configurações.';
      }
      
      setMessages(prev => [
        ...prev.map(m => m.role === 'user' ? { ...m, status: 'read' as const } : m),
        { 
          role: 'assistant', 
          content: errorMessage, 
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'read' as const
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const normalizeText = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove accents
      .trim();
  };

  const searchOffline = (query: string): string => {
    const q = normalizeText(query);
    let results: string[] = [];

    // Exact Match
    const exactMed = MEDS_MAP.get(q);
    if (exactMed) {
      results.push(`### 💊 ${exactMed.name}\n**Classe:** ${exactMed.class}\n**Indicação:** ${exactMed.indication}\n\n**Posologia:**\n- Adulto: ${exactMed.dosageAdult}\n- Criança: ${exactMed.dosageChild}\n\n**Interações:** ${exactMed.interactions.join(', ')}\n**Notas:** ${exactMed.notes}`);
    }

    // Keyword Search
    if (results.length === 0) {
      SEARCH_INDEX.meds.forEach(m => {
        if (m.name.includes(q) || q.includes(m.name)) {
          results.push(`### 💊 ${m.data.name}\n**Classe:** ${m.data.class}\n**Posologia Adulto:** ${m.data.dosageAdult}`);
        }
      });

      SEARCH_INDEX.interactions.forEach(i => {
        if (i.drugs.includes(q)) {
          results.push(`### ⚠️ Interação: ${i.data.drugs}\n**Efeito:** ${i.data.effect}\n**Risco:** ${i.data.risk}`);
        }
      });

      OFFLINE_LEGISLATION.forEach(leg => {
        if (normalizeText(leg.title).includes(q) || leg.examples.some(ex => normalizeText(ex).includes(q))) {
          results.push(`### 📜 ${leg.title}\n**Receita:** ${leg.recipeType}\n**Validade:** ${leg.validity}\n**Retenção:** ${leg.retention}`);
        }
      });
    }

    if (results.length > 0) {
      return `### 📚 Base Local (Emergência)\n\n${results.join('\n\n---\n\n')}\n\n*Nota: Esta resposta foi gerada a partir do banco de dados local enquanto a API está sendo configurada.*`;
    }

    return `Sinto muito, não encontrei informações sobre "${query}" na base local.`;
  };

  const generateLogo = async () => {
    const apiKey = getApiKey();
    if (!apiKey) {
      setIsGeneratingLogo(false);
      return;
    }

    setIsGeneratingLogo(true);
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              text: 'A professional, modern, minimalist logo for a pharmacy AI application named "PharmaWise AI". The logo should feature a stylized mortar and pestle or a cross combined with a brain or digital circuit pattern. Colors: Emerald green, slate, and white. Clean lines, high resolution, professional branding style.',
            },
          ],
        },
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          setLogoUrl(`data:image/png;base64,${base64EncodeString}`);
          break;
        }
      }
    } catch (error) {
      console.error("Error generating logo:", error);
    } finally {
      setIsGeneratingLogo(false);
    }
  };

  useEffect(() => {
    generateLogo();
  }, []);

  const quickActions = [
    { label: 'Controlados', icon: ShieldCheck, prompt: 'Quais os tipos de receitas para medicamentos da Portaria 344/98 e quais devem ser retidas?' },
    { label: 'Interações', icon: AlertTriangle, prompt: 'Quais as principais interações medicamentosas da Varfarina?' },
    { label: 'Posologia', icon: ClipboardList, prompt: 'Qual a posologia usual da Amoxicilina para adultos?' },
    { label: 'Formas', icon: LayoutGrid, prompt: 'Explique as diferentes formas farmacêuticas e dê exemplos.' },
  ];

  return (
    <div className="flex flex-col h-screen bg-[#F8FAFC] font-sans text-slate-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200 overflow-hidden">
            {logoUrl ? (
              <img src={logoUrl} alt="PharmaWise Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : isGeneratingLogo ? (
              <Loader2 className="w-6 h-6 text-white animate-spin" />
            ) : (
              <Pill className="text-white w-6 h-6" />
            )}
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">PharmaWise <span className="text-emerald-600">AI</span></h1>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Assistente de Dispensação</p>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={() => setShowReference(!showReference)}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
              showReference
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-200" 
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            )}
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden md:inline">Guias de Referência</span>
          </button>
          
          <div className="hidden lg:flex items-center gap-2 text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs font-semibold">Base Local Ativa</span>
          </div>
          <div className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold transition-all",
            isOnline 
              ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
              : "bg-amber-100 text-amber-800 border-amber-200 shadow-sm animate-pulse"
          )}>
            {isOnline ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isOnline ? 'Online' : 'Modo Offline'}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex flex-col md:flex-row max-w-7xl mx-auto w-full relative">
        {/* Reference Sidebar */}
        <AnimatePresence>
          {showReference && (
            <motion.div 
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative z-30 w-full md:w-80 lg:w-96 bg-white border-r border-slate-200 flex flex-col h-[38vh] md:h-full shadow-lg md:shadow-none shrink-0"
            >
              <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                <h2 className="font-bold text-sm sm:text-base text-slate-700">Guias de Referência</h2>
                <button 
                  onClick={() => setShowReference(false)}
                  className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              <div className="flex border-b border-slate-100">
                <button 
                  onClick={() => setActiveTab('meds')}
                  className={cn(
                    "flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-all border-b-2",
                    activeTab === 'meds' ? "border-emerald-600 text-emerald-700 bg-emerald-50/30" : "border-transparent text-slate-400 hover:text-slate-600"
                  )}
                >
                  Meds
                </button>
                <button 
                  onClick={() => setActiveTab('interactions')}
                  className={cn(
                    "flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-all border-b-2",
                    activeTab === 'interactions' ? "border-orange-600 text-orange-700 bg-orange-50/30" : "border-transparent text-slate-400 hover:text-slate-600"
                  )}
                >
                  Interações
                </button>
                <button 
                  onClick={() => setActiveTab('legislation')}
                  className={cn(
                    "flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-all border-b-2",
                    activeTab === 'legislation' ? "border-slate-600 text-slate-700 bg-slate-50" : "border-transparent text-slate-400 hover:text-slate-600"
                  )}
                >
                  Legislação
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {activeTab === 'meds' ? (
                  OFFLINE_MEDS.map((med, i) => (
                    <div key={i} className="p-3 rounded-xl border border-slate-100 bg-white shadow-sm">
                      <h4 className="text-sm font-bold text-slate-800">{med.name}</h4>
                      <p className="text-[11px] text-slate-500 mt-1">{med.class}</p>
                      <div className="mt-2 pt-2 border-t border-slate-50">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Dose Adulto</p>
                        <p className="text-[11px] text-slate-700">{med.dosageAdult}</p>
                      </div>
                    </div>
                  ))
                ) : activeTab === 'interactions' ? (
                  OFFLINE_INTERACTIONS.map((int, i) => (
                    <div key={i} className="p-3 rounded-xl border border-orange-100 bg-orange-50/30 shadow-sm">
                      <h4 className="text-xs font-bold text-slate-800">{int.drugs}</h4>
                      <p className="text-[11px] text-orange-700 mt-1 font-medium">{int.effect}</p>
                    </div>
                  ))
                ) : (
                  OFFLINE_LEGISLATION.map((leg, i) => (
                    <div key={i} className="p-3 rounded-xl border border-slate-100 bg-white shadow-sm">
                      <h4 className="text-xs font-bold text-slate-800">{leg.title}</h4>
                      <p className="text-[11px] text-slate-600 mt-1"><span className="font-bold">Receita:</span> {leg.recipeType}</p>
                      <p className="text-[11px] text-slate-600"><span className="font-bold">Validade:</span> {leg.validity}</p>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Area Container */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {/* Chat Area */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scroll-smooth pb-52 md:pb-64"
          >
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={cn(
                "flex gap-3 max-w-[90%] md:max-w-[80%]",
                msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              <div className={cn(
                "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm border",
                msg.role === 'user' 
                  ? "bg-emerald-500 text-white border-emerald-400" 
                  : "bg-white border-slate-200 text-slate-600"
              )}>
                {msg.role === 'user' ? <User className="w-4 h-4 md:w-5 md:h-5" /> : <Bot className="w-4 h-4 md:w-5 md:h-5" />}
              </div>
              <div className="flex flex-col gap-1">
                <div className={cn(
                  "p-3 md:p-4 rounded-2xl shadow-sm relative group",
                  msg.role === 'user' 
                    ? "bg-emerald-600 text-white rounded-tr-none" 
                    : "bg-white border border-slate-100 text-slate-800 rounded-tl-none"
                )}>
                  <div className={cn(
                    "prose prose-sm max-w-none",
                    msg.role === 'user' ? "prose-invert" : "prose-slate"
                  )}>
                    <Markdown>{msg.content}</Markdown>
                  </div>
                </div>
                <div className={cn(
                  "flex items-center gap-1.5 px-1",
                  msg.role === 'user' ? "justify-end" : "justify-start"
                )}>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {msg.timestamp}
                  </span>
                  {msg.role === 'user' && (
                    <div className="flex items-center">
                      {msg.status === 'sending' && <Clock className="w-3 h-3 text-slate-300 animate-pulse" />}
                      {msg.status === 'sent' && <Check className="w-3 h-3 text-slate-300" />}
                      {msg.status === 'read' && <CheckCheck className="w-3 h-3 text-emerald-500" />}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4 mr-auto max-w-[85%]">
              <div className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-600 flex items-center justify-center shrink-0 animate-pulse">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-3">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
                <span className="text-xs font-medium text-slate-400">Consultando base técnica...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} className="h-4 w-full" />
          </div>

          {/* Quick Actions & Input Area */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC] to-transparent">
            {messages.length === 1 && !isLoading && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {quickActions.map((action, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(action.prompt)}
                    className="flex flex-col items-center gap-2 p-4 bg-white border border-slate-200 rounded-2xl hover:border-emerald-500 hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
                      <action.icon className="w-5 h-5 text-slate-500 group-hover:text-emerald-600" />
                    </div>
                    <span className="text-xs font-bold text-slate-600 group-hover:text-emerald-700">{action.label}</span>
                  </button>
                ))}
              </div>
            )}

            <div className="relative max-w-3xl mx-auto">
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-50">
                  {filteredSuggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setInput(s);
                        setShowSuggestions(false);
                      }}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-slate-50 flex items-center gap-3 border-b border-slate-50 last:border-0"
                    >
                      <Search className="w-4 h-4 text-slate-400" />
                      {s}
                    </button>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-2 bg-white border border-slate-200 p-2 rounded-2xl shadow-lg focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10 transition-all">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    if (e.target.value.length > 1) {
                      setFilteredSuggestions(SEARCH_SUGGESTIONS.filter(s => s.toLowerCase().includes(e.target.value.toLowerCase())).slice(0, 5));
                      setShowSuggestions(true);
                    } else {
                      setShowSuggestions(false);
                    }
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Pergunte sobre medicamentos, doses ou interações..."
                  className="flex-1 bg-transparent border-none focus:ring-0 px-4 py-2 text-sm"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 text-white p-3 rounded-xl transition-all shadow-md shadow-emerald-200 disabled:shadow-none"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-[10px] text-center text-slate-400 mt-3 font-medium">
                PharmaWise AI v2.0 • Inteligência Artificial para Dispensação Farmacêutica
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
