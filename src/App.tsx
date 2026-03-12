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
  BookOpen, 
  ClipboardList, 
  Send,
  User,
  Bot,
  Loader2,
  ShieldCheck,
  LayoutGrid,
  X,
  ArrowLeftRight,
  AlertOctagon,
  CheckCircle2,
  Calculator,
  Baby,
  Star,
  Sparkles,
  Wifi,
  WifiOff,
  ChevronLeft,
  Stethoscope,
  Thermometer
} from 'lucide-react';
import Markdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { askPharmaAI } from './services/geminiService';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const DOSAGE_FORMS = [
  {
    category: 'Sólidas',
    items: [
      { name: 'Comprimidos', description: 'Forma sólida obtida por compressão de pós.', examples: 'Paracetamol, Dipirona.' },
      { name: 'Cápsulas', description: 'Invólucro gelatinoso contendo fármaco sólido ou líquido.', examples: 'Amoxicilina, Omeprazol.' },
      { name: 'Drágeas', description: 'Comprimidos revestidos com camadas de açúcar e corante.', examples: 'Buscopan Composto.' },
      { name: 'Pós', description: 'Mistura de fármacos secos finamente divididos.', examples: 'Sais de Reidratação.' },
    ]
  },
  {
    category: 'Líquidas',
    items: [
      { name: 'Xaropes', description: 'Soluções aquosas com alta concentração de açúcar.', examples: 'Xarope de Guaco, Ambroxol.' },
      { name: 'Soluções', description: 'Misturas homogêneas de um ou mais solutos em solvente.', examples: 'Dipirona Gotas.' },
      { name: 'Suspensões', description: 'Partículas sólidas dispersas em um meio líquido.', examples: 'Amoxicilina Suspensão, Nimesulida.' },
      { name: 'Elixires', description: 'Soluções hidroalcoólicas edulcoradas e aromatizadas.', examples: 'Elixir de Vitamina B12.' },
    ]
  },
  {
    category: 'Semissólidas',
    items: [
      { name: 'Pomadas', description: 'Base gordurosa, consistência macia, para uso tópico.', examples: 'Nebacetin.' },
      { name: 'Cremes', description: 'Emulsão de óleo em água ou água em óleo.', examples: 'Cetoconazol Creme.' },
      { name: 'Géis', description: 'Sistema semissólido de partículas orgânicas ou inorgânicas.', examples: 'Diclofenaco Gel.' },
      { name: 'Pastas', description: 'Contêm grande porcentagem de pós insolúveis.', examples: 'Pasta d\'Água.' },
    ]
  },
  {
    category: 'Outras',
    items: [
      { name: 'Aerosóis', description: 'Partículas finas sólidas ou líquidas em gás.', examples: 'Salbutamol (Bombinha).' },
      { name: 'Supositórios', description: 'Forma sólida para inserção retal.', examples: 'Glicerina Supositório.' },
      { name: 'Colírios', description: 'Soluções ou suspensões estéreis para uso ocular.', examples: 'Tobramicina Colírio.' },
    ]
  }
];

const COMMON_INTERACTIONS = [
  {
    level: 'Gravíssimo',
    color: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-100',
    items: [
      { drugs: 'Sildenafila + Nitratos', effect: 'Hipotensão severa e fatal.', risk: 'Risco de colapso cardiovascular.' },
      { drugs: 'Varfarina + AAS/AINEs', effect: 'Aumento drástico do risco de hemorragia.', risk: 'Hemorragias gastrointestinais graves.' },
    ]
  },
  {
    level: 'Alto',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-100',
    items: [
      { drugs: 'Digoxina + Furosemida', effect: 'Aumento da toxicidade digitálica por hipocalemia.', risk: 'Arritmias cardíacas.' },
      { drugs: 'Enalapril + Espironolactona', effect: 'Risco de hipercalemia severa.', risk: 'Parada cardíaca por excesso de potássio.' },
    ]
  },
  {
    level: 'Moderado',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    items: [
      { drugs: 'Anticoncepcionais + Rifampicina', effect: 'Redução da eficácia do anticoncepcional.', risk: 'Gravidez indesejada.' },
      { drugs: 'Estatinas + Suco de Toranja', effect: 'Aumento da concentração da estatina no sangue.', risk: 'Risco de rabdomiólise (lesão muscular).' },
    ]
  }
];

const COMMON_DOSAGES = [
  {
    category: 'Antibióticos',
    items: [
      { name: 'Amoxicilina', adult: '500mg a 1g a cada 8h.', child: '20-50mg/kg/dia (3 doses).', note: 'Ajustar em insuficiência renal grave.' },
      { name: 'Azitromicina', adult: '500mg 1x ao dia (3-5 dias).', child: '10mg/kg 1x ao dia (3 dias).', note: 'Tomar 1h antes ou 2h após as refeições.' },
    ]
  },
  {
    category: 'Analgésicos/Antitérmicos',
    items: [
      { name: 'Dipirona', adult: '500mg a 1g até 4x ao dia.', child: '10-12mg/kg (1 gota/kg) até 4x ao dia.', note: 'Risco de agranulocitose (raro).' },
      { name: 'Paracetamol', adult: '500mg a 1g (máx 4g/dia).', child: '10-15mg/kg a cada 4-6h.', note: 'Risco de hepatotoxicidade em excesso.' },
    ]
  },
  {
    category: 'Anti-inflamatórios',
    items: [
      { name: 'Ibuprofeno', adult: '400mg a 600mg a cada 6-8h.', child: '5-10mg/kg a cada 6-8h.', note: 'Tomar com alimentos.' },
      { name: 'Nimesulida', adult: '100mg a cada 12h.', child: 'Contraindicado < 12 anos.', note: 'Uso máx 7 dias.' },
    ]
  }
];

const FEATURED_MEDS = [
  // ... existing featured meds
];

const SYMPTOMS_DATA = [
  {
    symptom: 'Febre',
    medications: [
      { name: 'Paracetamol', class: 'Analgésico/Antitérmico', note: 'Primeira escolha para febre.' },
      { name: 'Dipirona', class: 'Analgésico/Antitérmico', note: 'Potente ação antitérmica.' },
      { name: 'Ibuprofeno', class: 'AINE', note: 'Útil se houver inflamação associada.' }
    ]
  },
  {
    symptom: 'Dor de Cabeça (Cefaleia)',
    medications: [
      { name: 'Aspirina (AAS)', class: 'AINE/Analgésico', note: 'Evitar em crianças (Risco de Síndrome de Reye).' },
      { name: 'Neosaldina', class: 'Associação', note: 'Contém dipirona, isometepteno e cafeína.' },
      { name: 'Naramig', class: 'Triptano', note: 'Específico para enxaqueca.' }
    ]
  },
  {
    symptom: 'Tosse Seca',
    medications: [
      { name: 'Dropropizina', class: 'Antitussígeno', note: 'Inibe o reflexo da tosse.' },
      { name: 'Levodropropizina', class: 'Antitussígeno', note: 'Ação periférica.' }
    ]
  },
  {
    symptom: 'Tosse com Catarro (Produtiva)',
    medications: [
      { name: 'Ambroxol', class: 'Mucolítico', note: 'Facilita a expectoração.' },
      { name: 'Acetilcisteína', class: 'Mucolítico/Expectorante', note: 'Fluidez do muco.' },
      { name: 'Guaifenesina', class: 'Expectorante', note: 'Aumenta o volume das secreções para facilitar a saída.' }
    ]
  },
  {
    symptom: 'Alergia / Coriza',
    medications: [
      { name: 'Loratadina', class: 'Antihistamínico', note: 'Não causa sonolência na maioria dos pacientes.' },
      { name: 'Desloratadina', class: 'Antihistamínico', note: 'Segunda geração, ação prolongada.' },
      { name: 'Fexofenadina (Allegra)', class: 'Antihistamínico', note: 'Baixo risco de sedação.' }
    ]
  },
  {
    symptom: 'Azia / Má Digestão',
    medications: [
      { name: 'Omeprazol', class: 'IBP', note: 'Uso em jejum para melhor eficácia.' },
      { name: 'Hidróxido de Alumínio', class: 'Antiácido', note: 'Alívio imediato por neutralização.' },
      { name: 'Domperidona', class: 'Pró-cinético', note: 'Acelera o esvaziamento gástrico.' }
    ]
  }
];

import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";

const getApiKey = () => {
  const key = process.env.GEMINI_API_KEY;
  if (!key || key === "MY_GEMINI_API_KEY" || key === "") {
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
      content: 'Olá! Sou o **PharmaWise AI**, seu assistente especializado em farmácia de dispensação. Como posso ajudar você hoje com informações sobre medicamentos, interações ou posologia?\n\n*Este aplicativo não substitui a orientação médica ou farmacêutica. É indispensável a consulta com estes profissionais.*'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showReference, setShowReference] = useState(false);
  const [activeTab, setActiveTab] = useState<'forms' | 'interactions' | 'posology' | 'featured' | 'symptoms'>('forms');
  const [checker, setChecker] = useState({ drugA: '', drugB: '' });
  const [posologySearch, setPosologySearch] = useState('');
  const [symptomSearch, setSymptomSearch] = useState('');
  const [calculator, setCalculator] = useState({ medication: '', weight: '', frequency: '8h' });
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [isGeneratingLogo, setIsGeneratingLogo] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    if (!isOnline) {
      setTimeout(() => {
        const offlineResponse = searchOffline(userMessage);
        setMessages(prev => [...prev, { role: 'assistant', content: offlineResponse }]);
        setIsLoading(false);
      }, 800);
      return;
    }

    try {
      // Prepare history for Gemini (excluding the initial greeting if needed, 
      // but here we include everything except the current message which is added in the service)
      const history = messages
        .filter(m => m.content !== messages[0].content) // Skip initial greeting to keep context clean
        .map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        }));

      const response = await askPharmaAI(userMessage, history);
      setMessages(prev => [...prev, { role: 'assistant', content: response || 'Desculpe, não consegui processar sua solicitação.' }]);
    } catch (error: any) {
      let errorMessage = 'Ocorreu um erro ao processar sua pergunta. Por favor, tente novamente mais tarde.';
      
      if (error.message === 'API_KEY_MISSING') {
        errorMessage = '### Erro de Configuração\n\nA chave da API do Gemini (GEMINI_API_KEY) não foi encontrada. \n\n**Se você estiver no Vercel:**\n1. Vá em Settings -> Environment Variables.\n2. Adicione `GEMINI_API_KEY` com sua chave.\n3. Faça um novo Deploy.';
      }
      
      setMessages(prev => [...prev, { role: 'assistant', content: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  const searchOffline = (query: string): string => {
    const q = query.toLowerCase();
    let results: string[] = [];

    // Search in Dosages
    COMMON_DOSAGES.forEach(cat => {
      cat.items.forEach(item => {
        if (item.name.toLowerCase().includes(q)) {
          results.push(`**${item.name} (Posologia)**\n- Adulto: ${item.adult}\n- Criança: ${item.child}\n- Nota: ${item.note}`);
        }
      });
    });

    // Search in Interactions
    COMMON_INTERACTIONS.forEach(level => {
      level.items.forEach(item => {
        if (item.drugs.toLowerCase().includes(q)) {
          results.push(`**Interação: ${item.drugs}**\n- Nível: ${level.level}\n- Efeito: ${item.effect}\n- Risco: ${item.risk}`);
        }
      });
    });

    // Search in Symptoms
    SYMPTOMS_DATA.forEach(data => {
      if (data.symptom.toLowerCase().includes(q)) {
        const meds = data.medications.map(m => `- **${m.name}** (${m.class}): ${m.note}`).join('\n');
        results.push(`**Sintoma: ${data.symptom}**\nMedicamentos sugeridos:\n${meds}`);
      }
    });

    // Search in Dosage Forms
    DOSAGE_FORMS.forEach(cat => {
      cat.items.forEach(item => {
        if (item.name.toLowerCase().includes(q)) {
          results.push(`**Forma Farmacêutica: ${item.name}**\n- Descrição: ${item.description}\n- Exemplos: ${item.examples}`);
        }
      });
    });

    if (results.length > 0) {
      return `### Resultados da Busca Offline (Base de Dados Local)\n\nEncontrei as seguintes informações na minha base de dados local para "**${query}**":\n\n${results.join('\n\n---\n\n')}\n\n*Nota: Como você está offline, estou usando apenas minha base de dados de referência local. Para uma análise completa com IA, conecte-se à internet.*`;
    }

    return `Sinto muito, não encontrei informações específicas sobre "**${query}**" na minha base de dados offline.\n\nComo estou **offline**, minha capacidade de resposta está limitada à base de dados local pré-carregada. Por favor, conecte-se à internet para usar todo o poder da inteligência artificial do PharmaWise AI.`;
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

  const handleCheckInteraction = () => {
    if (!checker.drugA || !checker.drugB) return;
    const prompt = `Quais as interações medicamentosas entre ${checker.drugA} e ${checker.drugB}? Indique o nível de risco e descreva o efeito.`;
    setInput(prompt);
    setChecker({ drugA: '', drugB: '' });
    if (window.innerWidth < 768) setShowReference(false);
  };

  const handleCheckPosology = () => {
    if (!posologySearch) return;
    const prompt = `Qual a posologia recomendada para ${posologySearch}? Inclua doses para adultos e crianças (se aplicável) e observações importantes.`;
    setInput(prompt);
    setPosologySearch('');
    if (window.innerWidth < 768) setShowReference(false);
  };

  const handleCalculate = () => {
    if (!calculator.medication) return;
    const weightInfo = calculator.weight ? `para uma criança de ${calculator.weight}kg` : 'para um adulto';
    const prompt = `Calcule a posologia de ${calculator.medication} ${weightInfo}, com frequência de ${calculator.frequency}. Forneça a dose por administração e orientações de segurança.`;
    setInput(prompt);
    setCalculator({ medication: '', weight: '', frequency: '8h' });
    if (window.innerWidth < 768) setShowReference(false);
  };

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
            onClick={() => {
              setShowReference(!showReference);
              if (!showReference) setActiveTab('forms');
            }}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
              showReference
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-200" 
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            )}
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden md:inline">Guias de Referência</span>
            <span className="md:hidden">Guias</span>
          </button>
          
          <div className="hidden lg:flex items-center gap-2 text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs font-semibold">Baseado em Evidências</span>
          </div>
          <div className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold transition-all",
            isOnline 
              ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
              : "bg-amber-50 text-amber-700 border-amber-100"
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
                <div className={cn(
                  "flex items-center gap-2",
                  activeTab === 'forms' ? "text-emerald-700" : activeTab === 'interactions' ? "text-orange-700" : activeTab === 'posology' ? "text-blue-700" : activeTab === 'featured' ? "text-purple-700" : "text-rose-700"
                )}>
                  {activeTab === 'forms' ? <LayoutGrid className="w-5 h-5" /> : activeTab === 'interactions' ? <AlertTriangle className="w-5 h-5" /> : activeTab === 'posology' ? <ClipboardList className="w-5 h-5" /> : activeTab === 'featured' ? <Star className="w-5 h-5" /> : <Stethoscope className="w-5 h-5" />}
                  <h2 className="font-bold text-sm sm:text-base">
                    {activeTab === 'forms' ? 'Formas Farmacêuticas' : activeTab === 'interactions' ? 'Guia de Interações' : activeTab === 'posology' ? 'Guia de Posologia' : activeTab === 'featured' ? 'Medicamentos em Destaque' : 'Busca por Sintomas'}
                  </h2>
                </div>
                <button 
                  onClick={() => setShowReference(false)}
                  className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

                {/* Tabs inside sidebar */}
                <div className="flex border-b border-slate-100 overflow-x-auto no-scrollbar">
                  <button 
                    onClick={() => setActiveTab('forms')}
                    className={cn(
                      "flex-1 min-w-[80px] py-3 text-[10px] font-bold uppercase tracking-wider transition-all border-b-2",
                      activeTab === 'forms' ? "border-emerald-600 text-emerald-700 bg-emerald-50/30" : "border-transparent text-slate-400 hover:text-slate-600"
                    )}
                  >
                    Formas
                  </button>
                  <button 
                    onClick={() => setActiveTab('interactions')}
                    className={cn(
                      "flex-1 min-w-[80px] py-3 text-[10px] font-bold uppercase tracking-wider transition-all border-b-2",
                      activeTab === 'interactions' ? "border-orange-600 text-orange-700 bg-orange-50/30" : "border-transparent text-slate-400 hover:text-slate-600"
                    )}
                  >
                    Interações
                  </button>
                  <button 
                    onClick={() => setActiveTab('posology')}
                    className={cn(
                      "flex-1 min-w-[80px] py-3 text-[10px] font-bold uppercase tracking-wider transition-all border-b-2",
                      activeTab === 'posology' ? "border-blue-600 text-blue-700 bg-blue-50/30" : "border-transparent text-slate-400 hover:text-slate-600"
                    )}
                  >
                    Posologia
                  </button>
                  <button 
                    onClick={() => setActiveTab('featured')}
                    className={cn(
                      "flex-1 min-w-[80px] py-3 text-[10px] font-bold uppercase tracking-wider transition-all border-b-2",
                      activeTab === 'featured' ? "border-purple-600 text-purple-700 bg-purple-50/30" : "border-transparent text-slate-400 hover:text-slate-600"
                    )}
                  >
                    Destaques
                  </button>
                  <button 
                    onClick={() => setActiveTab('symptoms')}
                    className={cn(
                      "flex-1 min-w-[80px] py-3 text-[10px] font-bold uppercase tracking-wider transition-all border-b-2",
                      activeTab === 'symptoms' ? "border-rose-600 text-rose-700 bg-rose-50/30" : "border-transparent text-slate-400 hover:text-slate-600"
                    )}
                  >
                    Sintomas
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {activeTab === 'forms' ? (
                DOSAGE_FORMS.map((cat, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-1">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">{cat.category}</h3>
                    </div>
                    <div className="space-y-4">
                      {cat.items.map((item, j) => (
                        <div key={j} className="p-3 rounded-xl border border-slate-100 bg-white hover:border-emerald-200 transition-colors">
                          <h4 className="text-sm font-bold text-slate-800">{item.name}</h4>
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.description}</p>
                          <div className="mt-2 pt-2 border-t border-slate-50 flex items-start gap-1.5">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500 mt-0.5 shrink-0" />
                            <p className="text-[10px] text-slate-400"><span className="font-bold text-slate-500">Ex:</span> {item.examples}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : activeTab === 'interactions' ? (
                <div className="space-y-6">
                  {/* Interaction Checker Tool */}
                  <div className="bg-slate-900 rounded-xl p-4 text-white shadow-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <ArrowLeftRight className="w-4 h-4 text-emerald-400" />
                      <h3 className="text-xs font-bold uppercase tracking-wider">Verificador Rápido</h3>
                    </div>
                    <div className="space-y-3">
                      <input 
                        type="text" 
                        placeholder="Medicamento A"
                        value={checker.drugA}
                        onChange={(e) => setChecker({...checker, drugA: e.target.value})}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/50 placeholder:text-white/40"
                      />
                      <input 
                        type="text" 
                        placeholder="Medicamento B"
                        value={checker.drugB}
                        onChange={(e) => setChecker({...checker, drugB: e.target.value})}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/50 placeholder:text-white/40"
                      />
                      <button 
                        onClick={handleCheckInteraction}
                        disabled={!checker.drugA || !checker.drugB}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-700 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2"
                      >
                        <Search className="w-3 h-3" />
                        Verificar Conflito
                      </button>
                    </div>
                  </div>

                  {/* Common Interactions List */}
                  {COMMON_INTERACTIONS.map((group, i) => (
                    <div key={i} className="space-y-3">
                      <div className="flex items-center gap-2 border-b border-slate-100 pb-1">
                        <AlertOctagon className={cn("w-3 h-3", group.color)} />
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Risco {group.level}</h3>
                      </div>
                      <div className="space-y-3">
                        {group.items.map((item, j) => (
                          <div key={j} className={cn("p-3 rounded-xl border transition-all", group.bg, group.border)}>
                            <h4 className="text-xs font-bold text-slate-800">{item.drugs}</h4>
                            <p className="text-[11px] text-slate-600 mt-1 font-medium">{item.effect}</p>
                            <div className="mt-2 pt-2 border-t border-black/5 flex items-start gap-1.5">
                              <Info className="w-3 h-3 text-slate-400 mt-0.5 shrink-0" />
                              <p className="text-[10px] text-slate-500 italic">{item.risk}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : activeTab === 'posology' ? (
                <div className="space-y-6">
                  <div className="bg-slate-900 rounded-xl p-4 text-white shadow-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Calculator className="w-4 h-4 text-blue-400" />
                      <h3 className="text-xs font-bold uppercase tracking-wider">Calculadora de Dose</h3>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] text-white/50 uppercase font-bold mb-1 block">Medicamento</label>
                        <input 
                          type="text" 
                          placeholder="Ex: Amoxicilina, Paracetamol..."
                          value={calculator.medication}
                          onChange={(e) => setCalculator({...calculator, medication: e.target.value})}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50 placeholder:text-white/40"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-white/50 uppercase font-bold mb-1 block">Peso (kg) - Opcional</label>
                          <input 
                            type="number" 
                            placeholder="Ex: 15"
                            value={calculator.weight}
                            onChange={(e) => setCalculator({...calculator, weight: e.target.value})}
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50 placeholder:text-white/40"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-white/50 uppercase font-bold mb-1 block">Frequência</label>
                          <select 
                            value={calculator.frequency}
                            onChange={(e) => setCalculator({...calculator, frequency: e.target.value})}
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none"
                          >
                            <option value="4h" className="bg-slate-800">4 em 4h</option>
                            <option value="6h" className="bg-slate-800">6 em 6h</option>
                            <option value="8h" className="bg-slate-800">8 em 8h</option>
                            <option value="12h" className="bg-slate-800">12 em 12h</option>
                            <option value="24h" className="bg-slate-800">1x ao dia</option>
                          </select>
                        </div>
                      </div>
                      <button 
                        onClick={handleCalculate}
                        disabled={!calculator.medication || !isOnline}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 mt-2"
                      >
                        <Calculator className="w-3 h-3" />
                        {isOnline ? 'Calcular Posologia' : 'Cálculo Requer Internet'}
                      </button>
                    </div>
                  </div>

                  {/* Offline Notice for Calculator */}
                  {!isOnline && (
                    <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <p className="text-[10px] text-amber-800 leading-tight">
                        As ferramentas de cálculo e busca por IA estão desativadas. Use as listas de referência abaixo para informações básicas.
                      </p>
                    </div>
                  )}

                  {/* Posology Search Tool (Legacy) */}
                  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-white">
                    <div className="flex items-center gap-2 mb-3">
                      <Search className="w-4 h-4 text-slate-400" />
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Consulta Rápida</h3>
                    </div>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Nome do medicamento..."
                        value={posologySearch}
                        onChange={(e) => setPosologySearch(e.target.value)}
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50 placeholder:text-white/40"
                      />
                      <button 
                        onClick={handleCheckPosology}
                        disabled={!posologySearch || !isOnline}
                        className="bg-slate-700 hover:bg-slate-600 disabled:opacity-50 p-2 rounded-lg transition-all"
                      >
                        <Search className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Common Dosages List */}
                  {COMMON_DOSAGES.map((cat, i) => (
                    <div key={i} className="space-y-3">
                      <div className="flex items-center gap-2 border-b border-slate-100 pb-1">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">{cat.category}</h3>
                      </div>
                      <div className="space-y-4">
                        {cat.items.map((item, j) => (
                          <div key={j} className="p-3 rounded-xl border border-slate-100 bg-white hover:border-blue-200 transition-colors">
                            <h4 className="text-sm font-bold text-slate-800">{item.name}</h4>
                            <div className="mt-2 space-y-2">
                              <div className="flex items-start gap-2">
                                <User className="w-3 h-3 text-blue-600 mt-0.5 shrink-0" />
                                <div>
                                  <p className="text-[10px] font-bold text-blue-700 uppercase">Adulto</p>
                                  <p className="text-[11px] text-slate-600">{item.adult}</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <Baby className="w-3 h-3 text-emerald-600 mt-0.5 shrink-0" />
                                <div>
                                  <p className="text-[10px] font-bold text-emerald-700 uppercase">Pediátrico</p>
                                  <p className="text-[11px] text-slate-600">{item.child}</p>
                                </div>
                              </div>
                            </div>
                            <div className="mt-2 pt-2 border-t border-slate-50 flex items-start gap-1.5">
                              <Info className="w-3 h-3 text-slate-400 mt-0.5 shrink-0" />
                              <p className="text-[10px] text-slate-500 italic">{item.note}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : activeTab === 'featured' ? (
                <div className="space-y-6">
                  {FEATURED_MEDS.map((cat, i) => (
                    <div key={i} className="space-y-3">
                      <div className="flex items-center gap-2 border-b border-slate-100 pb-1">
                        <Sparkles className="w-3 h-3 text-purple-500" />
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">{cat.category}</h3>
                      </div>
                      <div className="space-y-4">
                        {cat.items.map((item, j) => (
                          <div key={j} className="p-4 rounded-xl border border-slate-100 bg-white hover:border-purple-200 transition-all group">
                            <div className="flex items-start justify-between">
                              <h4 className="text-sm font-bold text-slate-800 group-hover:text-purple-700 transition-colors">{item.name}</h4>
                              <span className="text-[9px] px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded font-bold uppercase">{item.type}</span>
                            </div>
                            <p className="text-xs text-slate-600 mt-2 leading-relaxed">{item.description}</p>
                            <div className="mt-3 space-y-2">
                              <div className="flex items-start gap-2">
                                <CheckCircle2 className="w-3 h-3 text-emerald-500 mt-0.5 shrink-0" />
                                <p className="text-[11px] text-slate-500"><span className="font-bold text-slate-700">Indicação:</span> {item.indication}</p>
                              </div>
                              <div className="flex items-start gap-2 p-2 bg-purple-50 rounded-lg border border-purple-100/50">
                                <Star className="w-3 h-3 text-purple-500 mt-0.5 shrink-0 fill-purple-500" />
                                <p className="text-[10px] text-purple-700 font-medium">{item.highlight}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Symptom Search Tool */}
                  <div className="bg-rose-900 rounded-xl p-4 text-white shadow-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Search className="w-4 h-4 text-rose-400" />
                      <h3 className="text-xs font-bold uppercase tracking-wider text-rose-100">Buscar por Sintoma</h3>
                    </div>
                    <div className="space-y-3">
                      <input 
                        type="text" 
                        placeholder="Ex: Febre, Tosse, Azia..."
                        value={symptomSearch}
                        onChange={(e) => setSymptomSearch(e.target.value)}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500/50 placeholder:text-white/40"
                      />
                    </div>
                  </div>

                  {/* Symptoms List */}
                  {SYMPTOMS_DATA.filter(item => 
                    item.symptom.toLowerCase().includes(symptomSearch.toLowerCase()) ||
                    item.medications.some(med => med.name.toLowerCase().includes(symptomSearch.toLowerCase()))
                  ).map((data, i) => (
                    <div key={i} className="space-y-3">
                      <div className="flex items-center gap-2 border-b border-slate-100 pb-1">
                        <Thermometer className="w-3 h-3 text-rose-500" />
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">{data.symptom}</h3>
                      </div>
                      <div className="space-y-3">
                        {data.medications.map((med, j) => (
                          <div key={j} className="p-3 rounded-xl border border-slate-100 bg-white hover:border-rose-200 transition-colors">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-bold text-slate-800">{med.name}</h4>
                              <span className="text-[9px] px-1.5 py-0.5 bg-rose-50 text-rose-600 rounded font-bold uppercase">{med.class}</span>
                            </div>
                            <div className="mt-2 flex items-start gap-1.5">
                              <Info className="w-3 h-3 text-slate-400 mt-0.5 shrink-0" />
                              <p className="text-[10px] text-slate-500 italic">{med.note}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
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
            className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scroll-smooth pb-32 md:pb-6"
          >
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={cn(
                "flex gap-4 max-w-[85%]",
                msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm",
                msg.role === 'user' ? "bg-emerald-100 text-emerald-700" : "bg-white border border-slate-200 text-slate-600"
              )}>
                {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              <div className={cn(
                "p-3 md:p-4 rounded-2xl shadow-sm",
                msg.role === 'user' 
                  ? "bg-emerald-600 text-white rounded-tr-none" 
                  : "bg-white border border-slate-200 rounded-tl-none"
              )}>
                <div className={cn(
                  "prose prose-slate max-w-none",
                  msg.role === 'user' ? "prose-invert" : ""
                )}>
                  <Markdown>{msg.content}</Markdown>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4 max-w-[85%] mr-auto">
              <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
              </div>
              <div className="p-4 bg-white border border-slate-200 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                <span className="text-sm text-slate-500 italic">Analisando literatura farmacêutica...</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions & Input Area */}
        <div className="p-4 md:p-6 bg-white border-t border-slate-200 space-y-4">
          {/* Quick Actions */}
          {messages.length < 3 && (
            <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2 -mx-2 px-2 md:flex-wrap md:overflow-visible md:pb-0 md:mx-0 md:px-0">
              {quickActions.map((action, i) => (
                <button
                  key={i}
                  onClick={() => setInput(action.prompt)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full text-xs md:text-sm font-medium text-slate-600 transition-colors shrink-0 md:shrink"
                >
                  <action.icon className="w-4 h-4" />
                  {action.label}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="relative group">
            {/* Suggestions Dropdown */}
            <AnimatePresence>
              {showSuggestions && filteredSuggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-full left-0 w-full mb-2 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-50"
                >
                  <div className="p-2 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
                    <Search className="w-3 h-3 text-slate-400" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Sugestões de Busca</span>
                  </div>
                  <div className="max-h-48 overflow-y-auto">
                    {filteredSuggestions.map((suggestion, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setInput(suggestion);
                          setShowSuggestions(false);
                        }}
                        className="w-full text-left px-4 py-3 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors flex items-center gap-3 border-b border-slate-50 last:border-0"
                      >
                        <Search className="w-4 h-4 text-slate-300" />
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <textarea
              rows={1}
              value={input}
              onChange={(e) => {
                const val = e.target.value;
                setInput(val);
                if (val.trim()) {
                  const filtered = SEARCH_SUGGESTIONS.filter(s => 
                    s.toLowerCase().includes(val.toLowerCase()) && 
                    s.toLowerCase() !== val.toLowerCase()
                  );
                  setFilteredSuggestions(filtered);
                  setShowSuggestions(true);
                } else {
                  setShowSuggestions(false);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                  setShowSuggestions(false);
                }
                if (e.key === 'Escape') {
                  setShowSuggestions(false);
                }
              }}
              onBlur={() => {
                // Delay to allow click on suggestion
                setTimeout(() => setShowSuggestions(false), 200);
              }}
              onFocus={() => {
                if (input.trim()) {
                  setShowSuggestions(true);
                }
              }}
              disabled={!isOnline}
              placeholder={isOnline ? "Pergunte sobre interações, posologia ou administração..." : "IA indisponível no modo offline. Use os guias laterais."}
              className={cn(
                "w-full border rounded-2xl px-5 py-4 pr-14 focus:outline-none transition-all resize-none",
                isOnline 
                  ? "bg-slate-50 border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" 
                  : "bg-slate-100 border-slate-200 cursor-not-allowed text-slate-400"
              )}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading || !isOnline}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white rounded-xl transition-all shadow-md active:scale-95"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          {/* Disclaimer */}
          <div className="flex items-start gap-2 text-[10px] text-slate-400 leading-tight">
            <AlertTriangle className="w-3 h-3 shrink-0 mt-0.5" />
            <p>
              AVISO: O PharmaWise AI é uma ferramenta de suporte à decisão para profissionais e estudantes. 
              As informações fornecidas não substituem o julgamento clínico. Sempre consulte as bulas oficiais e diretrizes do Ministério da Saúde/ANVISA.
            </p>
          </div>
        </div>
      </div>
    </main>
    </div>
  );
}
