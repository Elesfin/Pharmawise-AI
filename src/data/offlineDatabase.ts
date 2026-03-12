
export interface Medication {
  name: string;
  class: string;
  indication: string;
  dosageAdult: string;
  dosageChild: string;
  interactions: string[];
  contraindications: string[];
  sideEffects: string[];
  notes: string;
}

export interface Interaction {
  drugs: string;
  level: 'Gravíssimo' | 'Alto' | 'Moderado' | 'Leve';
  effect: string;
  risk: string;
}

export interface SymptomGuide {
  symptom: string;
  recommendations: {
    name: string;
    class: string;
    note: string;
  }[];
}

export const OFFLINE_MEDS: Medication[] = [
  {
    name: 'Amoxicilina',
    class: 'Antibiótico (Penicilina)',
    indication: 'Infecções bacterianas (garganta, ouvido, sinusite, urinária).',
    dosageAdult: '500mg a 1g a cada 8 horas.',
    dosageChild: '20-50mg/kg/dia divididos em 3 doses.',
    interactions: ['Alopurinol', 'Anticoncepcionais orais', 'Metotrexato'],
    contraindications: ['Alergia a penicilinas ou cefalosporinas.'],
    sideEffects: ['Diarreia', 'Náuseas', 'Erupções cutâneas'],
    notes: 'Pode ser tomado com ou sem alimentos. Completar o ciclo do tratamento.'
  },
  {
    name: 'Dipirona',
    class: 'Analgésico e Antitérmico',
    indication: 'Dor e febre.',
    dosageAdult: '500mg a 1g até 4 vezes ao dia.',
    dosageChild: '10-12mg/kg (aprox. 1 gota por kg) até 4 vezes ao dia.',
    interactions: ['Ciclosporina', 'Clorpromazina', 'Álcool'],
    contraindications: ['Alergia a pirazolonas', 'Asma induzida por analgésicos', 'Gravidez (3º trimestre)'],
    sideEffects: ['Hipotensão', 'Reações alérgicas'],
    notes: 'Risco raro de agranulocitose. Monitorar pressão arterial.'
  },
  {
    name: 'Paracetamol',
    class: 'Analgésico e Antitérmico',
    indication: 'Dor leve a moderada e febre.',
    dosageAdult: '500mg a 1g a cada 4-6 horas (máx 4g/dia).',
    dosageChild: '10-15mg/kg a cada 4-6 horas.',
    interactions: ['Álcool', 'Varfarina', 'Anticonvulsivantes'],
    contraindications: ['Doença hepática grave', 'Hipersensibilidade'],
    sideEffects: ['Hepatotoxicidade (em doses altas)', 'Reações cutâneas raras'],
    notes: 'Evitar consumo de álcool durante o uso. Cuidado com outros remédios que contenham paracetamol.'
  },
  {
    name: 'Ibuprofeno',
    class: 'Anti-inflamatório Não Esteroidal (AINE)',
    indication: 'Inflamação, dor e febre.',
    dosageAdult: '400mg a 600mg a cada 6-8 horas.',
    dosageChild: '5-10mg/kg a cada 6-8 horas.',
    interactions: ['Lítio', 'Metotrexato', 'Anti-hipertensivos', 'Outros AINEs'],
    contraindications: ['Úlcera gastroduodenal ativa', 'Insuficiência renal grave', 'Asma'],
    sideEffects: ['Dor de estômago', 'Náuseas', 'Risco cardiovascular em uso prolongado'],
    notes: 'Tomar preferencialmente após as refeições para proteger o estômago.'
  },
  {
    name: 'Omeprazol',
    class: 'Inibidor da Bomba de Prótons (IBP)',
    indication: 'Gastrite, úlcera, refluxo gastroesofágico.',
    dosageAdult: '20mg a 40mg uma vez ao dia.',
    dosageChild: 'Sob orientação médica específica (geralmente 0.7-3mg/kg).',
    interactions: ['Cetoconazol', 'Clopidogrel', 'Digoxina'],
    contraindications: ['Hipersensibilidade ao omeprazol ou benzimidazóis.'],
    sideEffects: ['Cefaleia', 'Diarreia', 'Dor abdominal'],
    notes: 'Tomar em jejum, 30 minutos antes do café da manhã.'
  },
  {
    name: 'Loratadina',
    class: 'Antihistamínico (Antialérgico)',
    indication: 'Rinite alérgica, urticária, coceira.',
    dosageAdult: '10mg uma vez ao dia.',
    dosageChild: '2-12 anos (>30kg): 10mg; (<30kg): 5mg.',
    interactions: ['Cetoconazol', 'Eritromicina', 'Cimetidina'],
    contraindications: ['Hipersensibilidade', 'Crianças menores de 2 anos.'],
    sideEffects: ['Cefaleia', 'Boca seca', 'Sonolência (raro)'],
    notes: 'Geralmente não causa sono. Pode ser tomado a qualquer hora.'
  },
  {
    name: 'Azitromicina',
    class: 'Antibiótico (Macrolídeo)',
    indication: 'Infecções respiratórias, DSTs, infecções de pele.',
    dosageAdult: '500mg uma vez ao dia por 3 a 5 dias.',
    dosageChild: '10mg/kg uma vez ao dia por 3 dias.',
    interactions: ['Antitrombóticos', 'Digoxina', 'Antiácidos (espaçar 2h)'],
    contraindications: ['Hipersensibilidade a macrolídeos.'],
    sideEffects: ['Diarreia', 'Vômitos', 'Dor abdominal'],
    notes: 'Pode ser administrado com alimentos para reduzir desconforto gástrico.'
  },
  {
    name: 'Simeticona',
    class: 'Antiflatulento',
    indication: 'Excesso de gases, desconforto abdominal.',
    dosageAdult: '40mg a 125mg até 4 vezes ao dia.',
    dosageChild: '3 a 5 gotas até 3 vezes ao dia.',
    interactions: ['Nenhuma interação significativa conhecida.'],
    contraindications: ['Obstrução intestinal', 'Hipersensibilidade.'],
    sideEffects: ['Raros'],
    notes: 'Pode ser usado após as refeições ou ao deitar.'
  },
  {
    name: 'Metformina',
    class: 'Antidiabético (Biguanida)',
    indication: 'Diabetes Mellitus Tipo 2.',
    dosageAdult: '500mg a 850mg 2 a 3 vezes ao dia.',
    dosageChild: 'Sob orientação médica rigorosa.',
    interactions: ['Contraste iodado', 'Álcool', 'Diuréticos'],
    contraindications: ['Insuficiência renal grave', 'Cetoacidose diabética', 'Insuficiência hepática.'],
    sideEffects: ['Náuseas', 'Diarreia', 'Gosto metálico'],
    notes: 'Tomar durante ou após as refeições para reduzir efeitos colaterais gastrointestinais.'
  },
  {
    name: 'Losartana',
    class: 'Anti-hipertensivo (BRA)',
    indication: 'Hipertensão arterial, proteção renal em diabéticos.',
    dosageAdult: '50mg a 100mg uma vez ao dia.',
    dosageChild: 'Não recomendado.',
    interactions: ['Lítio', 'Suplementos de potássio', 'AINEs'],
    contraindications: ['Gravidez', 'Insuficiência hepática grave.'],
    sideEffects: ['Tontura', 'Hipotensão', 'Hipercalemia'],
    notes: 'Monitorar níveis de potássio e função renal.'
  }
];

export const OFFLINE_INTERACTIONS: Interaction[] = [
  {
    drugs: 'Sildenafila + Nitratos (Isordil, Monocordil)',
    level: 'Gravíssimo',
    effect: 'Queda fatal da pressão arterial.',
    risk: 'Colapso cardiovascular imediato.'
  },
  {
    drugs: 'Varfarina + Aspirina (AAS)',
    level: 'Gravíssimo',
    effect: 'Aumento extremo do risco de sangramento.',
    risk: 'Hemorragias internas graves.'
  },
  {
    drugs: 'Digoxina + Furosemida',
    level: 'Alto',
    effect: 'Aumento da toxicidade da digoxina.',
    risk: 'Arritmias cardíacas graves.'
  },
  {
    drugs: 'Enalapril + Espironolactona',
    level: 'Alto',
    effect: 'Acúmulo excessivo de potássio no sangue.',
    risk: 'Parada cardíaca.'
  },
  {
    drugs: 'Álcool + Paracetamol',
    level: 'Alto',
    effect: 'Sobrecarga tóxica ao fígado.',
    risk: 'Hepatite medicamentosa aguda.'
  },
  {
    drugs: 'Álcool + Metronidazol',
    level: 'Alto',
    effect: 'Efeito Antabuse (vômitos, taquicardia, calor).',
    risk: 'Mal-estar intenso e risco cardiovascular.'
  },
  {
    drugs: 'Estatinas + Suco de Toranja (Grapefruit)',
    level: 'Moderado',
    effect: 'Aumento da concentração da estatina.',
    risk: 'Lesão muscular (rabdomiólise).'
  },
  {
    drugs: 'Anticoncepcionais + Antibióticos (Rifampicina)',
    level: 'Moderado',
    effect: 'Redução da eficácia contraceptiva.',
    risk: 'Gravidez indesejada.'
  }
];

export const OFFLINE_SYMPTOMS: SymptomGuide[] = [
  {
    symptom: 'Febre',
    recommendations: [
      { name: 'Paracetamol', class: 'Analgésico', note: 'Seguro para a maioria das idades.' },
      { name: 'Dipirona', class: 'Analgésico', note: 'Eficaz para febres altas.' },
      { name: 'Ibuprofeno', class: 'AINE', note: 'Útil se houver dor associada.' }
    ]
  },
  {
    symptom: 'Dor de Cabeça',
    recommendations: [
      { name: 'Neosaldina', class: 'Associação', note: 'Contém cafeína para potencializar o efeito.' },
      { name: 'Paracetamol', class: 'Analgésico', note: 'Opção segura para dores leves.' },
      { name: 'Ibuprofeno', class: 'AINE', note: 'Eficaz para dores tensionais.' }
    ]
  },
  {
    symptom: 'Gripe e Resfriado',
    recommendations: [
      { name: 'Multigrip / Cimegripe', class: 'Associação', note: 'Trata múltiplos sintomas (dor, febre, coriza).' },
      { name: 'Vitamina C', class: 'Suplemento', note: 'Auxilia no sistema imunológico.' },
      { name: 'Descongestionante Nasal', class: 'Tópico', note: 'Uso por no máximo 3-5 dias.' }
    ]
  },
  {
    symptom: 'Azia e Queimação',
    recommendations: [
      { name: 'Hidróxido de Alumínio', class: 'Antiácido', note: 'Alívio imediato.' },
      { name: 'Omeprazol', class: 'IBP', note: 'Para tratamento contínuo (tomar em jejum).' },
      { name: 'Sal de Frutas', class: 'Antiácido', note: 'Uso ocasional após excessos.' }
    ]
  },
  {
    symptom: 'Tosse Seca',
    recommendations: [
      { name: 'Dropropizina', class: 'Antitussígeno', note: 'Acalma a tosse irritativa.' },
      { name: 'Levodropropizina', class: 'Antitussígeno', note: 'Menos efeitos centrais.' }
    ]
  },
  {
    symptom: 'Tosse com Catarro',
    recommendations: [
      { name: 'Ambroxol', class: 'Mucolítico', note: 'Ajuda a soltar o catarro.' },
      { name: 'Acetilcisteína', class: 'Expectorante', note: 'Fluidez das secreções.' }
    ]
  }
];
