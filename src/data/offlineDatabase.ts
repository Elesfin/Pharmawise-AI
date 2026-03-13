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
  }
];

export const OFFLINE_INTERACTIONS: Interaction[] = [
  { drugs: 'Sildenafila + Nitratos', level: 'Gravíssimo', effect: 'Hipotensão severa e fatal.', risk: 'Risco de colapso cardiovascular.' },
  { drugs: 'Varfarina + AAS', level: 'Alto', effect: 'Aumento do risco de hemorragia.', risk: 'Hemorragia gastrointestinal.' }
];

export const OFFLINE_LEGISLATION: Legislation[] = [
  {
    title: 'Portaria 344/98 - Lista A e B',
    recipeType: 'Notificação de Receita (Amarela/Azul)',
    validity: '30 dias',
    retention: 'Retém a Notificação, devolve a Receita ao paciente.',
    examples: ['Morfina', 'Diazepam', 'Ritalina'],
    notes: 'Exige preenchimento completo do comprador.'
  },
  {
    title: 'RDC 20/2011 - Antibióticos',
    recipeType: 'Receita de Controle Especial (Branca 2 vias)',
    validity: '10 dias',
    retention: '1ª via retida na farmácia, 2ª via devolvida.',
    examples: ['Amoxicilina', 'Azitromicina'],
    notes: 'Válida em todo território nacional.'
  }
];

export const MEDS_MAP = new Map(OFFLINE_MEDS.map(m => [m.name.toLowerCase(), m]));

export const SEARCH_INDEX = {
  meds: OFFLINE_MEDS.map(m => ({ name: m.name.toLowerCase(), data: m })),
  interactions: OFFLINE_INTERACTIONS.map(i => ({ drugs: i.drugs.toLowerCase(), tokens: i.drugs.toLowerCase().split(/[ +]+/), data: i })),
  legislation: OFFLINE_LEGISLATION.map(l => ({ title: l.title.toLowerCase(), data: l }))
};
