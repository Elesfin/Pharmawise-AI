import { GoogleGenAI, Type } from "@google/genai";

const getApiKey = () => {
  const key = process.env.GEMINI_API_KEY;
  if (!key || key === "MY_GEMINI_API_KEY" || key === "") {
    return null;
  }
  return key;
};

const SYSTEM_INSTRUCTION = `Você é o PharmaWise AI, um assistente técnico simplificado para farmácia de dispensação.
Sua missão é responder perguntas sobre medicamentos e legislação farmacêutica de forma extremamente DIRETA e CONCISA.

REGRAS DE RESPOSTA:
1. Responda APENAS o que foi perguntado.
2. Seja o mais breve possível, usando listas ou frases curtas.
3. Simplifique termos técnicos complexos para facilitar o entendimento rápido.
4. Evite introduções e conclusões longas.
5. Para medicamentos controlados (Portaria 344/98), indique apenas o tipo de receita, validade e o que reter.

CONTINUIDADE E CONTEXTO:
- Mantenha o contexto do medicamento atual. Se o usuário perguntar "e a posologia?" ou "quais as interações?", assuma que ele se refere ao último medicamento discutido.
- Só mude o contexto se o usuário mencionar explicitamente o nome de outro medicamento.

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
      },
    });
    return response.text;
  } catch (error) {
    console.error("Erro ao consultar o PharmaWise AI:", error);
    throw error;
  }
}
