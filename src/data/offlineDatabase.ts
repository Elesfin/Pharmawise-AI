/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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
  level: string;
  effect: string;
  risk: string;
}

export interface Legislation {
  title: string;
  recipeType: string;
  validity: string;
  retention: string;
  examples: string[];
  notes: string;
}

export const OFFLINE_MEDS: Medication[] = [
  // --- ANTIBIÓTICOS (RDC 20/2011) ---
  {
    name: 'Amoxicilina',
    class: 'Antibiótico (Penicilina)',
    indication: 'Infecções bacterianas (garganta, ouvido, sinusite).',
    dosageAdult: '500mg a 1g a cada 8h ou 12h.',
    dosageChild: '20-50mg/kg/dia divididos em 3 doses.',
    interactions: ['Anticoncepcionais (reduz eficácia)', 'Alopurinol'],
    contraindications: ['Alergia a penicilinas'],
    sideEffects: ['Diarreia', 'Náusea', 'Rash cutâneo'],
    notes: 'Completar sempre o ciclo de tratamento.'
  },
  {
    name: 'Amoxicilina + Clavulanato',
    class: 'Antibiótico (Penicilina + Inibidor de Beta-lactamase)',
    indication: 'Infecções resistentes, sinusites, pneumonias, mordidas.',
    dosageAdult: '500/125mg 3x/dia ou 875/125mg 2x/dia.',
    dosageChild: '25-45mg/kg/dia (base amox) em doses divididas.',
    interactions: ['Varfarina', 'Metotrexato'],
    contraindications: ['Histórico de icterícia colestática por amox/clav'],
    sideEffects: ['Diarreia intensa', 'Candidíase oral/vaginal'],
    notes: 'Tomar no início da refeição para minimizar efeitos TGI.'
  },
  {
    name: 'Azitromicina',
    class: 'Antibiótico (Macrolídeo)',
    indication: 'Infecções respiratórias, DSTs, infecções de pele.',
    dosageAdult: '500mg uma vez ao dia por 3 a 5 dias.',
    dosageChild: '10mg/kg uma vez ao dia.',
    interactions: ['Antitussígenos', 'Ergotamina', 'Varfarina'],
    contraindications: ['Hipersensibilidade a macrolídeos'],
    sideEffects: ['Desconforto abdominal', 'Vômitos'],
    notes: 'Pode ser tomado com ou sem alimentos.'
  },
  {
    name: 'Cefalexina',
    class: 'Antibiótico (Cefalosporina)',
    indication: 'Infecções de pele, urinárias e respiratórias.',
    dosageAdult: '500mg a cada 6h.',
    dosageChild: '25-50mg/kg/dia divididos em 4 doses.',
    interactions: ['Probenecida', 'Metformina'],
    contraindications: ['Alergia a cefalosporinas ou penicilinas'],
    sideEffects: ['Diarreia', 'Candidíase'],
    notes: 'Receita Branca 2 vias (Antibiótico).'
  },
  {
    name: 'Ciprofloxacino',
    class: 'Antibiótico (Quinolona)',
    indication: 'Infecções urinárias graves, prostatites, diarreia bacteriana.',
    dosageAdult: '500mg a 750mg a cada 12h.',
    dosageChild: 'Uso restrito (risco em cartilagens).',
    interactions: ['Antiácidos (reduz absorção)', 'Cafeína', 'Teofilina'],
    contraindications: ['Gravidez', 'Menores de 18 anos (geralmente)'],
    sideEffects: ['Tendinite', 'Náusea', 'Tontura'],
    notes: 'Evitar leite e derivados 2h antes/depois.'
  },
  {
    name: 'Nitrofurantoína',
    class: 'Antisséptico Urinário',
    indication: 'Cistite aguda e prevenção de infecção urinária.',
    dosageAdult: '100mg a cada 6h (tratamento) ou 100mg à noite (prevenção).',
    dosageChild: '5-7mg/kg/dia divididos em 4 doses.',
    interactions: ['Antiácidos com magnésio'],
    contraindications: ['Insuficiência renal grave', 'Final da gravidez'],
    sideEffects: ['Urina escura (normal)', 'Náusea'],
    notes: 'Tomar com alimentos para melhorar absorção.'
  },

  // --- ANTI-HIPERTENSIVOS E CARDIO ---
  {
    name: 'Losartana Potássica',
    class: 'Anti-hipertensivo (BRA)',
    indication: 'Hipertensão arterial e insuficiência cardíaca.',
    dosageAdult: '50mg a 100mg uma vez ao dia.',
    dosageChild: 'Não recomendado.',
    interactions: ['Diuréticos poupadores de potássio', 'Lítio'],
    contraindications: ['Gravidez', 'Insuficiência renal grave'],
    sideEffects: ['Tontura', 'Hipotensão', 'Hipercalemia'],
    notes: 'Monitorar níveis de potássio.'
  },
  {
    name: 'Atenolol',
    class: 'Anti-hipertensivo (Betabloqueador)',
    indication: 'Hipertensão, arritmias, angina.',
    dosageAdult: '25mg a 100mg uma vez ao dia.',
    dosageChild: 'Não recomendado.',
    interactions: ['Verapamil', 'Diltiazem'],
    contraindications: ['Asma grave', 'Bradicardia', 'Bloqueio cardíaco'],
    sideEffects: ['Fadiga', 'Mãos e pés frios', 'Bradicardia'],
    notes: 'Não interromper o uso bruscamente.'
  },
  {
    name: 'Anlodipino',
    class: 'Anti-hipertensivo (Bloqueador de Canais de Cálcio)',
    indication: 'Hipertensão e angina.',
    dosageAdult: '5mg a 10mg uma vez ao dia.',
    dosageChild: 'Não recomendado.',
    interactions: ['Sinvastatina (máx 20mg)', 'Ciclosporina'],
    contraindications: ['Hipotensão grave', 'Choque cardiogênico'],
    sideEffects: ['Edema (inchaço) nos tornozelos', 'Cefaleia', 'Rubor'],
    notes: 'O inchaço é um efeito colateral comum e dose-dependente.'
  },
  {
    name: 'Enalapril',
    class: 'Anti-hipertensivo (IECA)',
    indication: 'Hipertensão e insuficiência cardíaca.',
    dosageAdult: '5mg a 40mg ao dia (1 ou 2 doses).',
    dosageChild: 'Sob orientação médica.',
    interactions: ['AAS', 'AINEs', 'Diuréticos poupadores de potássio'],
    contraindications: ['Gravidez', 'Histórico de angioedema'],
    sideEffects: ['Tosse seca persistente', 'Tontura'],
    notes: 'A tosse é um efeito clássico desta classe (IECA).'
  },
  {
    name: 'Hidroclorotiazida',
    class: 'Diurético Tiazídico',
    indication: 'Hipertensão e edema.',
    dosageAdult: '12,5mg a 50mg uma vez ao dia (manhã).',
    dosageChild: 'Sob orientação médica.',
    interactions: ['Lítio', 'Digoxina', 'AINEs'],
    contraindications: ['Anúria', 'Hipersensibilidade a sulfonamidas'],
    sideEffects: ['Cãibras', 'Aumento do ácido úrico', 'Perda de potássio'],
    notes: 'Tomar pela manhã para evitar micção noturna.'
  },
  {
    name: 'Espironolactona',
    class: 'Diurético Poupador de Potássio',
    indication: 'Hipertensão, edema, insuficiência cardíaca, acne hormonal.',
    dosageAdult: '25mg a 100mg ao dia.',
    dosageChild: 'Uso restrito.',
    interactions: ['Suplementos de potássio', 'IECAs/BRAs'],
    contraindications: ['Hipercalemia', 'Insuficiência renal aguda'],
    sideEffects: ['Ginecomastia (em homens)', 'Irregularidade menstrual'],
    notes: 'Pode aumentar significativamente o potássio no sangue.'
  },

  // --- DIABETES ---
  {
    name: 'Metformina',
    class: 'Antidiabético Oral (Biguanida)',
    indication: 'Diabetes Mellitus Tipo 2.',
    dosageAdult: '500mg a 850mg 2 a 3x ao dia.',
    dosageChild: 'Uso restrito a casos específicos.',
    interactions: ['Contraste iodado', 'Álcool'],
    contraindications: ['Insuficiência renal grave', 'Acidose metabólica'],
    sideEffects: ['Náusea', 'Diarreia (comum no início)', 'Gosto metálico'],
    notes: 'Tomar durante ou após as refeições para reduzir efeitos TGI.'
  },
  {
    name: 'Gliclazida',
    class: 'Antidiabético (Sulfonilureia)',
    indication: 'Diabetes Mellitus Tipo 2.',
    dosageAdult: '30mg a 120mg uma vez ao dia (café da manhã).',
    dosageChild: 'Não recomendado.',
    interactions: ['Miconazol', 'Álcool', 'Aspirina'],
    contraindications: ['Diabetes Tipo 1', 'Cetoacidose'],
    sideEffects: ['Hipoglicemia', 'Ganho de peso'],
    notes: 'Risco de hipoglicemia se pular refeições.'
  },

  // --- COLESTEROL ---
  {
    name: 'Sinvastatina',
    class: 'Hipolipemiante (Estatina)',
    indication: 'Colesterol alto e prevenção cardiovascular.',
    dosageAdult: '10mg a 40mg uma vez ao dia (à noite).',
    dosageChild: 'Uso restrito.',
    interactions: ['Sucone de toranja (grapefruit)', 'Itraconazol'],
    contraindications: ['Doença hepática ativa', 'Gravidez'],
    sideEffects: ['Dores musculares (mialgia)', 'Aumento de enzimas hepáticas'],
    notes: 'A síntese de colesterol é maior durante a noite.'
  },
  {
    name: 'Atorvastatina',
    class: 'Hipolipemiante (Estatina)',
    indication: 'Colesterol alto e prevenção de eventos cardíacos.',
    dosageAdult: '10mg a 80mg uma vez ao dia.',
    dosageChild: 'Uso restrito.',
    interactions: ['Claritromicina', 'Ciclosporina'],
    contraindications: ['Doença hepática', 'Gravidez'],
    sideEffects: ['Mialgia', 'Azia', 'Alterações hepáticas'],
    notes: 'Pode ser tomada em qualquer horário do dia.'
  },

  // --- GASTRO ---
  {
    name: 'Omeprazol',
    class: 'Inibidor da Bomba de Prótons (IBP)',
    indication: 'Gastrite, úlcera, refluxo gastroesofágico.',
    dosageAdult: '20mg a 40mg uma vez ao dia em jejum.',
    dosageChild: 'Sob orientação médica específica.',
    interactions: ['Clopidogrel', 'Cetoconazol'],
    contraindications: ['Hipersensibilidade ao fármaco'],
    sideEffects: ['Cefaleia', 'Dor abdominal', 'Gases'],
    notes: 'Tomar preferencialmente 30 min antes do café da manhã.'
  },
  {
    name: 'Pantoprazol',
    class: 'Inibidor da Bomba de Prótons (IBP)',
    indication: 'Gastrite, refluxo, proteção gástrica.',
    dosageAdult: '20mg a 40mg uma vez ao dia em jejum.',
    dosageChild: 'Uso restrito.',
    interactions: ['Atazanavir', 'Varfarina'],
    contraindications: ['Hipersensibilidade'],
    sideEffects: ['Diarreia', 'Tontura'],
    notes: 'Menos interações medicamentosas que o Omeprazol.'
  },
  {
    name: 'Domperidona',
    class: 'Antiemético e Procinético',
    indication: 'Náuseas, vômitos, má digestão.',
    dosageAdult: '10mg até 3x ao dia.',
    dosageChild: '0,25mg/kg até 3x ao dia.',
    interactions: ['Cetoconazol', 'Eritromicina'],
    contraindications: ['Prolactinoma', 'Hemorragia gastrointestinal'],
    sideEffects: ['Boca seca', 'Sonolência leve'],
    notes: 'Tomar 15-30 min antes das refeições.'
  },
  {
    name: 'Bromoprida',
    class: 'Antiemético e Procinético',
    indication: 'Náuseas, vômitos, distúrbios da motilidade digestiva.',
    dosageAdult: '10mg 3x ao dia ou 1 gota/kg (gotas).',
    dosageChild: '0,5mg a 1mg/kg/dia.',
    interactions: ['Antipsicóticos', 'Álcool'],
    contraindications: ['Feocromocitoma', 'Epilepsia'],
    sideEffects: ['Sonolência', 'Reações extrapiramidais (raro)'],
    notes: 'Disponível em cápsulas, gotas e injetável.'
  },

  // --- DOR E INFLAMAÇÃO ---
  {
    name: 'Dipirona',
    class: 'Analgésico e Antitérmico',
    indication: 'Dor e febre.',
    dosageAdult: '500mg a 1g até 4x ao dia.',
    dosageChild: '10-12mg/kg (aprox. 1 gota por kg) até 4x ao dia.',
    interactions: ['Ciclosporina'],
    contraindications: ['Alergia a pirazolonas', 'Asma'],
    sideEffects: ['Hipotensão', 'Reações alérgicas'],
    notes: 'Uso comum em gotas (500mg/ml).'
  },
  {
    name: 'Paracetamol',
    class: 'Analgésico e Antitérmico',
    indication: 'Dor leve a moderada e febre.',
    dosageAdult: '500mg a 1g a cada 4-6h (Máx 4g/dia).',
    dosageChild: '10-15mg/kg a cada 4-6h.',
    interactions: ['Álcool (risco hepático)', 'Varfarina'],
    contraindications: ['Doença hepática grave'],
    sideEffects: ['Raro em doses normais', 'Hepatotoxicidade em dose alta'],
    notes: 'Cuidado com outros produtos que contenham paracetamol.'
  },
  {
    name: 'Ibuprofeno',
    class: 'Anti-inflamatório Não Esteroidal (AINE)',
    indication: 'Inflamação, dor e febre.',
    dosageAdult: '400mg a 600mg a cada 6-8h.',
    dosageChild: '5-10mg/kg a cada 6-8h.',
    interactions: ['Anticoagulantes', 'Anti-hipertensivos (reduz efeito)'],
    contraindications: ['Úlcera ativa', 'Insuficiência renal', 'Dengue'],
    sideEffects: ['Dor de estômago', 'Risco de sangramento'],
    notes: 'Evitar em casos de suspeita de Dengue.'
  },
  {
    name: 'Nimesulida',
    class: 'Anti-inflamatório (AINE)',
    indication: 'Dor aguda, inflamação, dismenorreia.',
    dosageAdult: '100mg a cada 12h.',
    dosageChild: 'Não recomendado para menores de 12 anos.',
    interactions: ['Lítio', 'Metotrexato'],
    contraindications: ['Insuficiência hepática', 'Úlcera péptica'],
    sideEffects: ['Hepatotoxicidade (uso prolongado)', 'Azia'],
    notes: 'Uso limitado a no máximo 7-10 dias.'
  },
  {
    name: 'Diclofenaco Potássico',
    class: 'Anti-inflamatório (AINE)',
    indication: 'Dor inflamatória, reumatismo, pós-operatório.',
    dosageAdult: '50mg a cada 8h ou 12h.',
    dosageChild: 'Uso restrito.',
    interactions: ['Digoxina', 'Diuréticos'],
    contraindications: ['Úlcera gástrica', 'Insuficiência cardíaca grave'],
    sideEffects: ['Dor epigástrica', 'Náusea', 'Retenção de líquidos'],
    notes: 'Tomar com água, sem mastigar.'
  },

  // --- PSICOTRÓPICOS (PORTARIA 344/98) ---
  {
    name: 'Clonazepam',
    class: 'Benzodiazepínico (Psicotrópico)',
    indication: 'Ansiedade, distúrbios do sono, crises epiléticas.',
    dosageAdult: '0,5mg a 2mg ao dia (conforme prescrição).',
    dosageChild: 'Uso restrito e controlado.',
    interactions: ['Álcool', 'Outros depressores do SNC'],
    contraindications: ['Glaucoma de ângulo fechado', 'Insuficiência respiratória'],
    sideEffects: ['Sonolência', 'Dificuldade de concentração', 'Dependência'],
    notes: 'Receita B1 (Azul). Risco de dependência física e psíquica.'
  },
  {
    name: 'Alprazolam',
    class: 'Benzodiazepínico (Psicotrópico)',
    indication: 'Transtorno de ansiedade e pânico.',
    dosageAdult: '0,25mg a 0,5mg 3x ao dia.',
    dosageChild: 'Não recomendado.',
    interactions: ['Cetoconazol', 'Álcool'],
    contraindications: ['Miastenia gravis', 'Insuficiência respiratória'],
    sideEffects: ['Sedação', 'Fadiga', 'Irritabilidade'],
    notes: 'Receita B1 (Azul). Uso por curto período.'
  },
  {
    name: 'Fluoxetina',
    class: 'Antidepressivo (ISRS)',
    indication: 'Depressão, ansiedade, TOC, bulimia.',
    dosageAdult: '20mg a 60mg uma vez ao dia (manhã).',
    dosageChild: 'Uso sob rigorosa supervisão.',
    interactions: ['IMAOs', 'Tramadol', 'Varfarina'],
    contraindications: ['Uso concomitante com IMAOs'],
    sideEffects: ['Insônia', 'Náusea', 'Perda de apetite', 'Disfunção sexual'],
    notes: 'Receita C1 (Branca 2 vias). Efeito demora 2-4 semanas.'
  },
  {
    name: 'Sertralina',
    class: 'Antidepressivo (ISRS)',
    indication: 'Depressão, pânico, fobia social, estresse pós-traumático.',
    dosageAdult: '50mg a 200mg uma vez ao dia.',
    dosageChild: 'Uso sob orientação.',
    interactions: ['IMAOs', 'Lítio'],
    contraindications: ['Uso de IMAOs'],
    sideEffects: ['Diarreia', 'Tremor', 'Suor excessivo'],
    notes: 'Receita C1 (Branca 2 vias). Considerado seguro em idosos.'
  },
  {
    name: 'Escitalopram',
    class: 'Antidepressivo (ISRS)',
    indication: 'Depressão e transtornos de ansiedade.',
    dosageAdult: '10mg a 20mg uma vez ao dia.',
    dosageChild: 'Não recomendado.',
    interactions: ['IMAOs', 'Selegilina'],
    contraindications: ['Prolongamento do intervalo QT'],
    sideEffects: ['Náusea', 'Aumento do suor', 'Fadiga'],
    notes: 'Receita C1 (Branca 2 vias). Geralmente bem tolerado.'
  },
  {
    name: 'Amitriptilina',
    class: 'Antidepressivo Tricíclico',
    indication: 'Depressão, dor neuropática, prevenção de enxaqueca.',
    dosageAdult: '25mg a 150mg ao dia (geralmente à noite).',
    dosageChild: 'Uso restrito.',
    interactions: ['Álcool', 'Anticolinérgicos'],
    contraindications: ['Infarto recente', 'Glaucoma'],
    sideEffects: ['Boca seca', 'Constipação', 'Visão turva', 'Sonolência'],
    notes: 'Receita C1 (Branca 2 vias). Efeito sedativo potente.'
  },
  {
    name: 'Quetiapina',
    class: 'Antipsicótico Atípico',
    indication: 'Esquizofrenia, transtorno bipolar, insônia (off-label).',
    dosageAdult: '25mg a 800mg ao dia (conforme indicação).',
    dosageChild: 'Uso restrito.',
    interactions: ['Fenitoína', 'Cetoconazol'],
    contraindications: ['Hipersensibilidade'],
    sideEffects: ['Ganho de peso', 'Sonolência intensa', 'Boca seca'],
    notes: 'Receita C1 (Branca 2 vias). Monitorar glicemia e peso.'
  },

  // --- OUTROS COMUNS ---
  {
    name: 'Loratadina',
    class: 'Anti-histamínico (Antialérgico)',
    indication: 'Rinite alérgica e urticária.',
    dosageAdult: '10mg uma vez ao dia.',
    dosageChild: '5mg (2-12 anos) ou 10mg (>12 anos).',
    interactions: ['Cetoconazol', 'Eritromicina'],
    contraindications: ['Hipersensibilidade'],
    sideEffects: ['Raro: Cefaleia', 'Boca seca'],
    notes: 'Não causa sono na maioria dos pacientes.'
  },
  {
    name: 'Prednisona',
    class: 'Corticoide Oral',
    indication: 'Alergias graves, inflamações, doenças autoimunes.',
    dosageAdult: '5mg a 60mg ao dia.',
    dosageChild: '0,14mg a 2mg/kg/dia.',
    interactions: ['Vacinas de vírus vivo', 'Antidiabéticos'],
    contraindications: ['Infecções fúngicas sistêmicas'],
    sideEffects: ['Aumento de peso', 'Retenção de líquidos', 'Gastrite'],
    notes: 'Não interromper o uso sem desmame se usado por > 7 dias.'
  },
  {
    name: 'Varfarina',
    class: 'Anticoagulante Oral',
    indication: 'Prevenção de trombose e embolia.',
    dosageAdult: '2,5mg a 10mg ao dia (ajuste por RNI).',
    dosageChild: 'Uso hospitalar/especializado.',
    interactions: ['MUITAS: Vitamina K, AAS, Antibióticos, Anti-inflamatórios'],
    contraindications: ['Risco de hemorragia ativa', 'Gravidez'],
    sideEffects: ['Sangramentos', 'Equimoses (manchas roxas)'],
    notes: 'Exige monitoramento rigoroso do RNI (tempo de coagulação).'
  }
];

export const OFFLINE_INTERACTIONS: Interaction[] = [
  { drugs: 'Sildenafila + Nitratos', level: 'Gravíssimo', effect: 'Hipotensão severa e fatal.', risk: 'Risco de colapso cardiovascular.' },
  { drugs: 'Varfarina + AAS', level: 'Alto', effect: 'Aumento do risco de hemorragia.', risk: 'Hemorragia gastrointestinal.' },
  { drugs: 'Sinvastatina + Suco de Toranja', level: 'Moderado', effect: 'Aumento da concentração da estatina.', risk: 'Risco de rabdomiólise (lesão muscular).' },
  { drugs: 'Amoxicilina + Anticoncepcional', level: 'Moderado', effect: 'Possível redução da eficácia do contraceptivo.', risk: 'Gravidez indesejada.' },
  { drugs: 'Digoxina + Furosemida', level: 'Alto', effect: 'Aumento do risco de toxicidade digitálica.', risk: 'Arritmias cardíacas por hipocalemia.' },
  { drugs: 'Fluoxetina + Tramadol', level: 'Grave', effect: 'Risco de Síndrome Serotoninérgica.', risk: 'Confusão, agitação, tremores e febre.' },
  { drugs: 'Metformina + Contraste Iodado', level: 'Grave', effect: 'Risco de Acidose Láctica.', risk: 'Falência renal aguda.' },
  { drugs: 'Omeprazol + Clopidogrel', level: 'Moderado', effect: 'Redução da eficácia antiagregante do clopidogrel.', risk: 'Aumento do risco de eventos cardíacos.' },
  { drugs: 'Lítio + Diuréticos/AINEs', level: 'Alto', effect: 'Aumento da toxicidade do Lítio.', risk: 'Dano neurológico e renal.' }
];

export const OFFLINE_LEGISLATION: Legislation[] = [
  {
    title: 'Portaria 344/98 - Lista A (Entorpecentes)',
    recipeType: 'Notificação de Receita A (Amarela)',
    validity: '30 dias',
    retention: 'Retém a Notificação, devolve a Receita ao paciente.',
    examples: ['Morfina', 'Metilfenidato (Ritalina)', 'Meperidina', 'Oxicodona'],
    notes: 'Válida em todo território nacional se acompanhada de receita.'
  },
  {
    title: 'Portaria 344/98 - Lista B1 (Psicotrópicos)',
    recipeType: 'Notificação de Receita B1 (Azul)',
    validity: '30 dias',
    retention: 'Retém a Notificação, devolve a Receita ao paciente.',
    examples: ['Diazepam', 'Clonazepam', 'Alprazolam', 'Bromazepam', 'Midazolam'],
    notes: 'Válida apenas no estado de emissão (ou com justificativa).'
  },
  {
    title: 'Portaria 344/98 - Lista B2 (Anorexígenos)',
    recipeType: 'Notificação de Receita B2 (Azul Especial)',
    validity: '30 dias',
    retention: 'Retém a Notificação, devolve a Receita.',
    examples: ['Sibutramina'],
    notes: 'Exige Termo de Responsabilidade do prescritor.'
  },
  {
    title: 'Portaria 344/98 - Lista C1 (Controle Especial)',
    recipeType: 'Receita de Controle Especial (Branca 2 vias)',
    validity: '30 dias',
    retention: '1ª via retida na farmácia, 2ª via devolvida.',
    examples: ['Fluoxetina', 'Sertralina', 'Amitriptilina', 'Fenobarbital', 'Quetiapina'],
    notes: 'Pode prescrever até 3 substâncias por receita.'
  },
  {
    title: 'Portaria 344/98 - Lista C2 (Retinoides)',
    recipeType: 'Notificação de Receita Especial (Branca)',
    validity: '30 dias',
    retention: 'Retém a Notificação e Termo de Consentimento.',
    examples: ['Isotretinoína (Roacutan)'],
    notes: 'Rigoroso controle devido ao risco de teratogenia.'
  },
  {
    title: 'RDC 20/2011 - Antimicrobianos (Antibióticos)',
    recipeType: 'Receita de Controle Especial (Branca 2 vias)',
    validity: '10 dias',
    retention: '1ª via retida na farmácia, 2ª via devolvida.',
    examples: ['Amoxicilina', 'Azitromicina', 'Cefalexina', 'Ciprofloxacino'],
    notes: 'Deve conter dados do paciente, emitente e comprador.'
  },
  {
    title: 'RDC 471/2021 - Ivermectina/Nitazoxanida',
    recipeType: 'Receita Simples (Venda sob prescrição)',
    validity: 'Conforme prescrição',
    retention: 'Não retém (atualmente)',
    examples: ['Ivermectina', 'Nitazoxanida'],
    notes: 'Voltaram ao regime de receita simples após período de retenção.'
  }
];

export const MEDS_MAP = new Map(OFFLINE_MEDS.map(m => [m.name.toLowerCase(), m]));

export const SEARCH_INDEX = {
  meds: OFFLINE_MEDS.map(m => ({ name: m.name.toLowerCase(), data: m })),
  interactions: OFFLINE_INTERACTIONS.map(i => ({ drugs: i.drugs.toLowerCase(), tokens: i.drugs.toLowerCase().split(/[ +]+/), data: i })),
  legislation: OFFLINE_LEGISLATION.map(l => ({ title: l.title.toLowerCase(), data: l }))
};
