import { GoogleGenAI, Type } from "@google/genai";

const getApiKey = () => {
  const key = process.env.GEMINI_API_KEY;
  if (!key || key === "MY_GEMINI_API_KEY" || key === "" || key.includes("TODO")) {
    return null;
  }
  return key;
};

const SYSTEM_INSTRUCTION = `Você é o PharmaWise AI, um assistente técnico especializado para farmácia de dispensação no Brasil.
Sua missão é fornecer informações precisas e atualizadas sobre medicamentos e legislação farmacêutica (ANVISA, Portaria 344/98, RDC 20/2011, etc.).

REGRAS DE RESPOSTA:
1. Responda de forma DIRETA e CONCISA. Use listas ou frases curtas.
2. Priorize SEMPRE informações oficiais da ANVISA e do Bulário Eletrônico.
3. Se a informação não estiver na base local, use a busca online para encontrar dados ATUALIZADOS no portal da ANVISA ou fontes técnicas confiáveis (Conselho Federal de Farmácia, bulas oficiais).
4. Para medicamentos controlados, indique: Tipo de Receita, Validade, Quantidade Máxima e o que deve ser Retido.
5. Simplifique termos técnicos para o farmacêutico ou balconista de farmácia.

CONTINUIDADE E CONTEXTO:
- Mantenha o contexto do medicamento atual. Se o usuário perguntar "e a posologia?", assuma que ele se refere ao último medicamento discutido.

DIRETRIZES:
- Foco em: Formas Farmacêuticas, Interações, Administração, Posologia e Retenção de Receitas.
- SEMPRE termine com o aviso: "Este aplicativo não substitui a orientação médica ou farmacêutica. É indispensável a consulta com estes profissionais."
- Responda em Português do Brasil.`;

export async function askPharmaAI(prompt: string, history: any[] = []) {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    throw new Error("API_KEY_MISSING");
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history,
        { role: "user", parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.2,
        tools: [{ googleSearch: {} }],
      },
    });
    return response.text;
  } catch (error) {
    console.error("Erro ao consultar o PharmaWise AI:", error);
    throw error;
  }
}
