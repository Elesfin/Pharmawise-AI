
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
  },
  {
    name: 'Atenolol',
    class: 'Anti-hipertensivo (Betabloqueador)',
    indication: 'Hipertensão, arritmias, angina.',
    dosageAdult: '25mg a 100mg uma vez ao dia.',
    dosageChild: 'Sob orientação médica.',
    interactions: ['Verapamil', 'Diltiazem', 'Insulina'],
    contraindications: ['Bradicardia acentuada', 'Choque cardiogênico', 'Asma grave.'],
    sideEffects: ['Fadiga', 'Mãos e pés frios', 'Batimentos lentos'],
    notes: 'Não interromper o uso bruscamente.'
  },
  {
    name: 'Enalapril',
    class: 'Anti-hipertensivo (IECA)',
    indication: 'Hipertensão arterial, insuficiência cardíaca.',
    dosageAdult: '5mg a 40mg por dia (1 ou 2 doses).',
    dosageChild: '0.08mg/kg/dia.',
    interactions: ['Diuréticos poupadores de potássio', 'Lítio', 'AINEs'],
    contraindications: ['Histórico de angioedema', 'Gravidez.'],
    sideEffects: ['Tosse seca persistente', 'Tontura', 'Cefaleia'],
    notes: 'A tosse seca é um efeito colateral comum desta classe.'
  },
  {
    name: 'Hidroclorotiazida',
    class: 'Diurético Tiazídico',
    indication: 'Hipertensão, edema (inchaço).',
    dosageAdult: '12.5mg a 50mg uma vez ao dia.',
    dosageChild: '1-2mg/kg/dia.',
    interactions: ['Lítio', 'Digoxina', 'Antidiabéticos'],
    contraindications: ['Anúria', 'Hipersensibilidade a sulfonamidas.'],
    sideEffects: ['Hipopotassemia', 'Aumento do ácido úrico', 'Fotossensibilidade'],
    notes: 'Tomar preferencialmente pela manhã para evitar micção noturna.'
  },
  {
    name: 'Prednisona',
    class: 'Corticosteroide (Anti-inflamatório)',
    indication: 'Alergias graves, doenças autoimunes, inflamações.',
    dosageAdult: '5mg a 60mg por dia.',
    dosageChild: '0.1 a 2mg/kg/dia.',
    interactions: ['Antidiabéticos', 'AINEs', 'Vacinas de vírus vivos'],
    contraindications: ['Infecções fúngicas sistêmicas', 'Hipersensibilidade.'],
    sideEffects: ['Aumento de peso', 'Insônia', 'Aumento da glicemia', 'Osteoporose (uso longo)'],
    notes: 'Uso prolongado exige desmame gradual. Tomar pela manhã.'
  },
  {
    name: 'Cefalexina',
    class: 'Antibiótico (Cefalosporina)',
    indication: 'Infecções de pele, urinárias, respiratórias.',
    dosageAdult: '250mg a 500mg a cada 6 horas.',
    dosageChild: '25-50mg/kg/dia divididos em 4 doses.',
    interactions: ['Probenecida', 'Metformina'],
    contraindications: ['Alergia a cefalosporinas ou penicilinas.'],
    sideEffects: ['Diarreia', 'Náuseas', 'Urticária'],
    notes: 'Pode ser tomado com alimentos se causar desconforto gástrico.'
  },
  {
    name: 'Fluconazol',
    class: 'Antifúngico',
    indication: 'Candidíase, micoses de pele e unha.',
    dosageAdult: '150mg dose única (candidíase vaginal) ou semanal.',
    dosageChild: '3-12mg/kg conforme indicação.',
    interactions: ['Varfarina', 'Fenitoína', 'Rifampicina'],
    contraindications: ['Hipersensibilidade', 'Uso com terfenadina.'],
    sideEffects: ['Dor abdominal', 'Náuseas', 'Alteração no paladar'],
    notes: 'Dose única costuma ser suficiente para candidíase vaginal simples.'
  },
  {
    name: 'Salbutamol',
    class: 'Broncodilatador',
    indication: 'Asma, bronquite, falta de ar.',
    dosageAdult: '100-200mcg (1-2 jatos) até 4x ao dia.',
    dosageChild: '100mcg (1 jato) até 4x ao dia.',
    interactions: ['Betabloqueadores', 'Diuréticos'],
    contraindications: ['Hipersensibilidade', 'Ameaça de aborto.'],
    sideEffects: ['Tremores', 'Taquicardia', 'Cefaleia'],
    notes: 'Uso inalatório (bombinha) tem ação rápida.'
  },
  {
    name: 'Clonazepam',
    class: 'Benzodiazepínico (Psicotrópico - B1)',
    indication: 'Ansiedade, distúrbios do sono, crises epilépticas.',
    dosageAdult: '0.5mg a 6mg por dia (dividido).',
    dosageChild: '0.01-0.03mg/kg/dia.',
    interactions: ['Álcool', 'Opioides', 'Outros depressores do SNC'],
    contraindications: ['Glaucoma de ângulo fechado', 'Insuficiência respiratória grave.'],
    sideEffects: ['Sonolência', 'Incoordenação motora', 'Dependência'],
    notes: 'Medicamento controlado (Receita B1 Azul). Causa sedação.'
  },
  {
    name: 'Sertralina',
    class: 'Antidepressivo (ISRS - C1)',
    indication: 'Depressão, ansiedade, TOC, pânico.',
    dosageAdult: '50mg a 200mg uma vez ao dia.',
    dosageChild: 'Sob orientação especializada.',
    interactions: ['IMAOs', 'Tramadol', 'Varfarina'],
    contraindications: ['Uso de IMAOs', 'Hipersensibilidade.'],
    sideEffects: ['Náuseas', 'Insônia', 'Disfunção sexual'],
    notes: 'Medicamento controlado (Receita C1 Branca). Efeito demora 2-4 semanas.'
  },
  {
    name: 'Metronidazol',
    class: 'Anti-infeccioso / Antibiótico',
    indication: 'Infecções por protozoários e bactérias anaeróbias.',
    dosageAdult: '250mg a 500mg a cada 8 ou 12 horas.',
    dosageChild: '30-40mg/kg/dia divididos em 3 doses.',
    interactions: ['Álcool (Efeito Antabuse)', 'Varfarina', 'Lítio'],
    contraindications: ['Hipersensibilidade', 'Primeiro trimestre de gravidez.'],
    sideEffects: ['Gosto metálico', 'Náuseas', 'Urina escura'],
    notes: 'NÃO consumir álcool durante e até 48h após o tratamento.'
  },
  {
    name: 'Ciprofloxacino',
    class: 'Antibiótico (Quinolona)',
    indication: 'Infecções urinárias graves, respiratórias e gastrointestinais.',
    dosageAdult: '250mg a 750mg a cada 12 horas.',
    dosageChild: 'Uso restrito (risco articular). Sob orientação médica.',
    interactions: ['Antiácidos (espaçar 2h)', 'Teofilina', 'Varfarina'],
    contraindications: ['Hipersensibilidade a quinolonas', 'Uso com tizanidina.'],
    sideEffects: ['Náuseas', 'Diarreia', 'Risco de ruptura de tendão (raro)'],
    notes: 'Evitar exposição solar excessiva durante o uso.'
  },
  {
    name: 'Dexametasona',
    class: 'Corticosteroide potente',
    indication: 'Inflamações graves, alergias, edema cerebral.',
    dosageAdult: '0.75mg a 9mg por dia.',
    dosageChild: '0.02 a 0.3mg/kg/dia.',
    interactions: ['Antidiabéticos', 'AINEs', 'Fenitoína'],
    contraindications: ['Infecções sistêmicas não controladas.'],
    sideEffects: ['Retenção de líquidos', 'Aumento da pressão', 'Glicemia alta'],
    notes: 'Potência muito superior à prednisona.'
  },
  {
    name: 'Glibenclamida',
    class: 'Antidiabético (Sulfonilureia)',
    indication: 'Diabetes Mellitus Tipo 2.',
    dosageAdult: '2.5mg a 20mg por dia.',
    dosageChild: 'Não recomendado.',
    interactions: ['Álcool', 'AINEs', 'Miconazol'],
    contraindications: ['Diabetes Tipo 1', 'Cetoacidose', 'Insuficiência renal/hepática.'],
    sideEffects: ['Hipoglicemia (suor frio, tremor)', 'Aumento de peso'],
    notes: 'Risco de hipoglicemia prolongada em idosos.'
  }
];

export interface Legislation {
  title: string;
  recipeType: string;
  validity: string;
  retention: string;
  examples: string[];
  notes: string;
}

export const OFFLINE_LEGISLATION: Legislation[] = [
  {
    title: 'Portaria 344/98 - Lista A (Entorpecentes)',
    recipeType: 'Notificação de Receita A (Amarela)',
    validity: '30 dias',
    retention: 'Retém a Notificação, devolve a Receita.',
    examples: ['Morfina', 'Metilfenidato (Ritalina)', 'Oxicodona'],
    notes: 'Exige cadastro do profissional na Vigilância Sanitária.'
  },
  {
    title: 'Portaria 344/98 - Lista B1 (Psicotrópicos)',
    recipeType: 'Notificação de Receita B (Azul)',
    validity: '30 dias',
    retention: 'Retém a Notificação, devolve a Receita.',
    examples: ['Clonazepam', 'Alprazolam', 'Diazepam', 'Bromazepam'],
    notes: 'Limite de 5 ampolas ou tratamento para 60 dias.'
  },
  {
    title: 'Portaria 344/98 - Lista B2 (Anorexígenos)',
    recipeType: 'Notificação de Receita B2 (Azul)',
    validity: '30 dias',
    retention: 'Retém a Notificação + Termo de Responsabilidade.',
    examples: ['Sibutramina'],
    notes: 'Exige termo de consentimento assinado pelo paciente.'
  },
  {
    title: 'Portaria 344/98 - Lista C1 (Controle Especial)',
    recipeType: 'Receita de Controle Especial (Branca - 2 vias)',
    validity: '30 dias',
    retention: 'Retém a 1ª via, devolve a 2ª via.',
    examples: ['Antidepressivos', 'Anticonvulsivantes', 'Antipsicóticos'],
    notes: 'Válida em todo território nacional.'
  },
  {
    title: 'Antibióticos (RDC 20/2011)',
    recipeType: 'Receita Comum (Branca - 2 vias)',
    validity: '10 dias',
    retention: 'Retém a 1ª via, devolve a 2ª via.',
    examples: ['Amoxicilina', 'Azitromicina', 'Cefalexina'],
    notes: 'Deve conter identificação do comprador e fornecedor.'
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

// Pre-normalized data for faster lookups
export const MEDS_MAP = new Map<string, Medication>(
  OFFLINE_MEDS.map(med => [med.name.toLowerCase(), med])
);

export const SYMPTOMS_MAP = new Map<string, SymptomGuide>(
  OFFLINE_SYMPTOMS.map(s => [s.symptom.toLowerCase(), s])
);

// Search Index for keyword matching
export const SEARCH_INDEX = {
  meds: OFFLINE_MEDS.map(m => ({ name: m.name.toLowerCase(), data: m })),
  interactions: OFFLINE_INTERACTIONS.map(i => ({ 
    drugs: i.drugs.toLowerCase(), 
    tokens: i.drugs.toLowerCase().split(/[ +()]+/).filter(t => t.length > 2),
    data: i 
  })),
  symptoms: OFFLINE_SYMPTOMS.map(s => ({ symptom: s.symptom.toLowerCase(), data: s }))
};
