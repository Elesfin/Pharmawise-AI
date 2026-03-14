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
    name: 'Losartana Potássica',
    class: 'Anti-hipertensivo (BRA)',
    indication: 'Hipertensão arterial e insuficiência cardíaca.',
    dosageAdult: '500mg a 100mg uma vez ao dia.',
    dosageChild: 'Não recomendado.',
    interactions: ['Diuréticos poupadores de potássio', 'Lítio'],
    contraindications: ['Gravidez', 'Insuficiência renal grave'],
    sideEffects: ['Tontura', 'Hipotensão', 'Hipercalemia'],
    notes: 'Monitorar níveis de potássio.'
  },
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
    name: 'Sinvastatina',
    class: 'Hipolipemiante (Estatina)',
    indication: 'Colesterol alto e prevenção cardiovascular.',
    dosageAdult: '10mg a 40mg uma vez ao dia (à noite).',
    dosageChild: 'Uso restrito.',
    interactions: ['Suco de toranja (grapefruit)', 'Itraconazol'],
    contraindications: ['Doença hepática ativa', 'Gravidez'],
    sideEffects: ['Dores musculares (mialgia)', 'Aumento de enzimas hepáticas'],
    notes: 'A síntese de colesterol é maior durante a noite.'
  },
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
    name: 'Domperidona',
    class: 'Antiemético e Procinético',
    indication: 'Náuseas, vômitos, má digestão.',
    dosageAdult: '10mg até 3x ao dia.',
    dosageChild: '0,25mg/kg até 3x ao dia.',
    interactions: ['Cetoconazol', 'Eritromicina'],
    contraindications: ['Prolactinoma', 'Hemorragia gastrointestinal'],
    sideEffects: ['Boca seca', 'Sonolência leve'],
    notes: 'Tomar 15-30 min antes das refeições.'
  }
];

export const OFFLINE_INTERACTIONS: Interaction[] = [
  { drugs: 'Sildenafila + Nitratos', level: 'Gravíssimo', effect: 'Hipotensão severa e fatal.', risk: 'Risco de colapso cardiovascular.' },
  { drugs: 'Varfarina + AAS', level: 'Alto', effect: 'Aumento do risco de hemorragia.', risk: 'Hemorragia gastrointestinal.' },
  { drugs: 'Sinvastatina + Suco de Toranja', level: 'Moderado', effect: 'Aumento da concentração da estatina.', risk: 'Risco de rabdomiólise (lesão muscular).' },
  { drugs: 'Amoxicilina + Anticoncepcional', level: 'Moderado', effect: 'Possível redução da eficácia do contraceptivo.', risk: 'Gravidez indesejada.' },
  { drugs: 'Digoxina + Furosemida', level: 'Alto', effect: 'Aumento do risco de toxicidade digitálica.', risk: 'Arritmias cardíacas por hipocalemia.' },
  { drugs: 'Fluoxetina + Tramadol', level: 'Grave', effect: 'Risco de Síndrome Serotoninérgica.', risk: 'Confusão, agitação, tremores e febre.' }
];

export const OFFLINE_LEGISLATION: Legislation[] = [
  {
    title: 'Portaria 344/98 - Lista A (Entorpecentes)',
    recipeType: 'Notificação de Receita A (Amarela)',
    validity: '30 dias',
    retention: 'Retém a Notificação, devolve a Receita ao paciente.',
    examples: ['Morfina', 'Metilfenidato (Ritalina)', 'Meperidina'],
    notes: 'Válida em todo território nacional se acompanhada de receita.'
  },
  {
    title: 'Portaria 344/98 - Lista B1 (Psicotrópicos)',
    recipeType: 'Notificação de Receita B1 (Azul)',
    validity: '30 dias',
    retention: 'Retém a Notificação, devolve a Receita ao paciente.',
    examples: ['Diazepam', 'Clonazepam', 'Alprazolam', 'Bromazepam'],
    notes: 'Válida apenas no estado de emissão (ou com justificativa).'
  },
  {
    title: 'Portaria 344/98 - Lista C1 (Controle Especial)',
    recipeType: 'Receita de Controle Especial (Branca 2 vias)',
    validity: '30 dias',
    retention: '1ª via retida na farmácia, 2ª via devolvida.',
    examples: ['Fluoxetina', 'Sertralina', 'Amitriptilina', 'Fenobarbital'],
    notes: 'Pode prescrever até 3 substâncias por receita.'
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
