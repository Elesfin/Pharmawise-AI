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
  },
  {
    name: 'Levotiroxina Sódica',
    class: 'Hormônio Tireoidiano',
    indication: 'Hipotireoidismo e bócio.',
    dosageAdult: '25mcg a 200mcg uma vez ao dia em jejum.',
    dosageChild: 'Conforme peso e idade (uso pediátrico comum).',
    interactions: ['Carbonato de Cálcio', 'Sulfato Ferroso', 'Soja'],
    contraindications: ['Infarto agudo do miocárdio recente', 'Tireotoxicose'],
    sideEffects: ['Taquicardia', 'Insônia', 'Perda de peso'],
    notes: 'Tomar 30-60 min antes do café da manhã apenas com água.'
  },
  {
    name: 'Metoclopramida (Plasil)',
    class: 'Antiemético e Procinético',
    indication: 'Náuseas, vômitos e distúrbios da motilidade digestiva.',
    dosageAdult: '10mg até 3x ao dia.',
    dosageChild: '0,1 a 0,15mg/kg até 3x ao dia.',
    interactions: ['Antipsicóticos', 'Levodopa'],
    contraindications: ['Feocromocitoma', 'Epilepsia', 'Hemorragia TGI'],
    sideEffects: ['Sonolência', 'Sintomas extrapiramidais (tremores)'],
    notes: 'Risco de discinesia tardia em uso prolongado.'
  },
  {
    name: 'Ondansetrona (Vonau)',
    class: 'Antiemético',
    indication: 'Náuseas e vômitos (especialmente pós-quimio ou cirurgia).',
    dosageAdult: '4mg a 8mg até 3x ao dia.',
    dosageChild: '2mg a 4mg (conforme peso/idade).',
    interactions: ['Apomorfina', 'Tramadol'],
    contraindications: ['Uso de apomorfina', 'Hipersensibilidade'],
    sideEffects: ['Constipação', 'Cefaleia', 'Sensação de calor'],
    notes: 'Muito utilizado na forma de comprimidos orodispersíveis.'
  },
  {
    name: 'Fluconazol',
    class: 'Antifúngico Sistêmico',
    indication: 'Candidíase vaginal, micoses de pele e unhas.',
    dosageAdult: '150mg dose única (vaginal) ou semanal (unha).',
    dosageChild: '3mg a 6mg/kg conforme indicação.',
    interactions: ['Varfarina', 'Sinvastatina', 'Glibenclamida'],
    contraindications: ['Hipersensibilidade a azóis'],
    sideEffects: ['Dor abdominal', 'Náusea', 'Alteração no paladar'],
    notes: 'Tratamento de micose de unha pode durar meses.'
  },
  {
    name: 'Aciclovir',
    class: 'Antiviral',
    indication: 'Herpes simples e Herpes zoster.',
    dosageAdult: '200mg a 800mg 5x ao dia (conforme caso).',
    dosageChild: '20mg/kg até 4x ao dia.',
    interactions: ['Probenecida'],
    contraindications: ['Hipersensibilidade'],
    sideEffects: ['Cefaleia', 'Tontura', 'Mal-estar'],
    notes: 'Iniciar o uso preferencialmente aos primeiros sinais da lesão.'
  },
  {
    name: 'Albendazol',
    class: 'Anti-helmíntico (Vermífugo)',
    indication: 'Verminoses (Ascaris, Giardia, etc).',
    dosageAdult: '400mg dose única ou por 3 a 5 dias.',
    dosageChild: '400mg dose única (>2 anos) ou 200mg (1-2 anos).',
    interactions: ['Dexametasona', 'Praziquantel'],
    contraindications: ['Gravidez', 'Mulheres planejando engravidar'],
    sideEffects: ['Dor abdominal', 'Cefaleia'],
    notes: 'Tomar preferencialmente com refeição gordurosa.'
  },
  {
    name: 'Desloratadina',
    class: 'Anti-histamínico (2ª Geração)',
    indication: 'Rinite alérgica e urticária.',
    dosageAdult: '5mg uma vez ao dia.',
    dosageChild: '1,25mg (1-5 anos) ou 2,5mg (6-11 anos).',
    interactions: ['Eritromicina', 'Cetoconazol'],
    contraindications: ['Hipersensibilidade'],
    sideEffects: ['Fadiga', 'Boca seca', 'Cefaleia'],
    notes: 'Metabólito ativo da loratadina, não causa sonolência.'
  },
  {
    name: 'Salbutamol (Aerolin)',
    class: 'Broncodilatador (Beta-2 Agonista)',
    indication: 'Asma, bronquite e DPOC.',
    dosageAdult: '100mcg (1-2 jatos) até 4x ao dia.',
    dosageChild: '100mcg (1 jato) até 4x ao dia.',
    interactions: ['Betabloqueadores (ex: Atenolol)'],
    contraindications: ['Hipersensibilidade'],
    sideEffects: ['Tremor nas mãos', 'Taquicardia', 'Cãibras'],
    notes: 'Medicamento de resgate para crises de falta de ar.'
  },
  {
    name: 'Montelucaste de Sódio',
    class: 'Antagonista de Receptor de Leucotrienos',
    indication: 'Prevenção de asma e rinite alérgica.',
    dosageAdult: '10mg uma vez ao dia (à noite).',
    dosageChild: '4mg (2-5 anos) ou 5mg (6-14 anos).',
    interactions: ['Fenobarbital', 'Rifampicina'],
    contraindications: ['Hipersensibilidade'],
    sideEffects: ['Cefaleia', 'Dor abdominal', 'Alterações de humor'],
    notes: 'Não deve ser usado para tratar crises agudas de asma.'
  },
  {
    name: 'Ciclobenzaprina (Miosan)',
    class: 'Relaxante Muscular',
    indication: 'Espasmos musculares e dor lombar.',
    dosageAdult: '5mg a 10mg até 3x ao dia.',
    dosageChild: 'Não recomendado para menores de 15 anos.',
    interactions: ['IMAOs', 'Álcool', 'Antidepressivos'],
    contraindications: ['Glaucoma', 'Hipertiroidismo', 'Infarto recente'],
    sideEffects: ['Sonolência acentuada', 'Boca seca', 'Tontura'],
    notes: 'Evitar dirigir ou operar máquinas sob efeito.'
  },
  {
    name: 'Rivaroxabana (Xarelto)',
    class: 'Anticoagulante (Inibidor do Fator Xa)',
    indication: 'Prevenção de AVC e tratamento de trombose (TVP/EP).',
    dosageAdult: '10mg a 20mg uma vez ao dia.',
    dosageChild: 'Uso restrito.',
    interactions: ['Cetoconazol', 'Ritonavir', 'AINEs'],
    contraindications: ['Sangramento ativo', 'Doença hepática grave'],
    sideEffects: ['Sangramentos', 'Tontura', 'Náusea'],
    notes: 'Diferente da Varfarina, não exige monitoramento de RNI.'
  },
  {
    name: 'Clopidogrel',
    class: 'Antiagregante Plaquetário',
    indication: 'Prevenção de infarto e AVC em pacientes de risco.',
    dosageAdult: '75mg uma vez ao dia.',
    dosageChild: 'Não recomendado.',
    interactions: ['Omeprazol (reduz efeito)', 'AINEs'],
    contraindications: ['Hemorragia ativa (ex: úlcera)'],
    sideEffects: ['Hematomas', 'Sangramento nasal', 'Diarreia'],
    notes: 'Geralmente usado após colocação de stent cardíaco.'
  },
  {
    name: 'AAS (Aspirina)',
    class: 'Antiagregante e Analgésico',
    indication: 'Prevenção cardiovascular (100mg) ou dor/febre (500mg).',
    dosageAdult: '100mg/dia (prevenção) ou 500mg a cada 6h (dor).',
    dosageChild: 'Uso restrito (Risco de Síndrome de Reye).',
    interactions: ['Anticoagulantes', 'Metotrexato', 'AINEs'],
    contraindications: ['Úlcera gástrica', 'Dengue', 'Asma'],
    sideEffects: ['Irritação gástrica', 'Sangramentos'],
    notes: 'Evitar em crianças com sintomas virais (gripe/varicela).'
  },
  {
    name: 'Zolpidem',
    class: 'Hipnótico (Indutor do Sono)',
    indication: 'Tratamento de curta duração para insônia.',
    dosageAdult: '5mg a 10mg imediatamente antes de deitar.',
    dosageChild: 'Não recomendado.',
    interactions: ['Álcool', 'Outros depressores do SNC'],
    contraindications: ['Insuficiência respiratória grave', 'Apneia do sono'],
    sideEffects: ['Sonambulismo', 'Alucinações', 'Amnésia anterógrada'],
    notes: 'Receita B1 (Azul) ou C1 (Branca 2 vias) dependendo da dosagem.'
  },
  {
    name: 'Risperidona',
    class: 'Antipsicótico Atípico',
    indication: 'Esquizofrenia, irritabilidade no autismo, transtorno bipolar.',
    dosageAdult: '2mg a 6mg ao dia.',
    dosageChild: '0,25mg a 1mg (conforme peso/indicação).',
    interactions: ['Levodopa', 'Fluoxetina'],
    contraindications: ['Hipersensibilidade'],
    sideEffects: ['Ganho de peso', 'Aumento da prolactina', 'Sedação'],
    notes: 'Receita C1 (Branca 2 vias).'
  },
  {
    name: 'Carbonato de Lítio',
    class: 'Estabilizador de Humor',
    indication: 'Transtorno Bipolar (Maníaco-Depressivo).',
    dosageAdult: '300mg a 900mg ao dia (ajuste por litemia).',
    dosageChild: 'Uso restrito.',
    interactions: ['Diuréticos', 'AINEs', 'IECAs'],
    contraindications: ['Doença renal grave', 'Desidratação grave'],
    sideEffects: ['Tremores', 'Sede excessiva', 'Aumento da urina'],
    notes: 'Receita C1. Exige exames de sangue regulares (Litemia).'
  },
  {
    name: 'Sulfato Ferroso',
    class: 'Suplemento Mineral (Ferro)',
    indication: 'Anemia ferropriva e suplementação na gravidez.',
    dosageAdult: '40mg a 60mg de ferro elementar ao dia.',
    dosageChild: '3mg a 5mg/kg/dia.',
    interactions: ['Antiácidos', 'Tetraciclinas', 'Levotiroxina'],
    contraindications: ['Anemias não ferroprivas', 'Hemocromatose'],
    sideEffects: ['Constipação', 'Fezes escuras (normal)', 'Dor abdominal'],
    notes: 'Melhor absorvido com estômago vazio e Vitamina C (suco de laranja).'
  },
  {
    name: 'Furosemida (Lasix)',
    class: 'Diurético de Alça',
    indication: 'Edema (inchaço) associado a insuficiência cardíaca, renal ou hepática; Hipertensão.',
    dosageAdult: '20mg a 80mg ao dia.',
    dosageChild: '1mg a 2mg/kg até o máximo de 6mg/kg.',
    interactions: ['Aminoglicosídeos (ototoxicidade)', 'Lítio', 'Digoxina'],
    contraindications: ['Insuficiência renal com anúria', 'Pré-coma hepático', 'Hipocalemia grave'],
    sideEffects: ['Desidratação', 'Cãibras', 'Hipotensão', 'Perda de eletrólitos'],
    notes: 'Pode causar perda acentuada de potássio. Tomar preferencialmente pela manhã.'
  },
  {
    name: 'Glibenclamida',
    class: 'Antidiabético (Sulfonilureia)',
    indication: 'Diabetes Mellitus Tipo 2.',
    dosageAdult: '2,5mg a 20mg ao dia.',
    dosageChild: 'Não recomendado.',
    interactions: ['Álcool', 'Miconazol', 'Aspirina'],
    contraindications: ['Diabetes Tipo 1', 'Cetoacidose diabética', 'Gravidez'],
    sideEffects: ['Hipoglicemia acentuada', 'Ganho de peso', 'Náusea'],
    notes: 'Risco de hipoglicemia prolongada, especialmente em idosos.'
  },
  {
    name: 'Rosuvastatina (Crestor)',
    class: 'Hipolipemiante (Estatina)',
    indication: 'Hipercolesterolemia e prevenção de eventos cardiovasculares.',
    dosageAdult: '10mg a 40mg uma vez ao dia.',
    dosageChild: 'Uso restrito.',
    interactions: ['Ciclosporina', 'Varfarina', 'Antiácidos'],
    contraindications: ['Doença hepática ativa', 'Insuficiência renal grave', 'Gravidez'],
    sideEffects: ['Mialgia', 'Cefaleia', 'Astenia (fraqueza)'],
    notes: 'Uma das estatinas mais potentes. Pode ser tomada em qualquer horário.'
  },
  {
    name: 'Esomeprazol (Nexium)',
    class: 'Inibidor da Bomba de Prótons (IBP)',
    indication: 'Refluxo gastroesofágico, úlceras, erradicação de H. pylori.',
    dosageAdult: '20mg a 40mg uma vez ao dia.',
    dosageChild: 'Conforme peso (acima de 1 ano).',
    interactions: ['Clopidogrel', 'Atazanavir', 'Digoxina'],
    contraindications: ['Hipersensibilidade a benzimidazóis'],
    sideEffects: ['Cefaleia', 'Diarreia', 'Dor abdominal'],
    notes: 'Isômero do omeprazol com maior biodisponibilidade.'
  },
  {
    name: 'Cetoprofeno (Profenid)',
    class: 'Anti-inflamatório (AINE)',
    indication: 'Dor inflamatória, artrite, artrose, dor pós-operatória.',
    dosageAdult: '100mg a 200mg ao dia.',
    dosageChild: 'Uso restrito.',
    interactions: ['Anticoagulantes', 'Lítio', 'Metotrexato'],
    contraindications: ['Úlcera ativa', 'Insuficiência cardíaca grave', 'Dengue'],
    sideEffects: ['Gastrite', 'Náusea', 'Risco de sangramento'],
    notes: 'Disponível em diversas formas (gotas, comprimidos, gel, injetável).'
  },
  {
    name: 'Naproxeno (Flanax)',
    class: 'Anti-inflamatório (AINE)',
    indication: 'Dores musculares, articulares, dismenorreia, enxaqueca.',
    dosageAdult: '250mg a 500mg a cada 12h.',
    dosageChild: 'Uso restrito.',
    interactions: ['Hidroclorotiazida', 'Varfarina'],
    contraindications: ['Úlcera péptica', 'Asma induzida por AAS'],
    sideEffects: ['Azia', 'Tontura', 'Retenção de líquidos'],
    notes: 'Possui meia-vida longa, permitindo menos doses ao dia.'
  },
  {
    name: 'Meloxicam',
    class: 'Anti-inflamatório (AINE)',
    indication: 'Artrite reumatoide e osteoartrite.',
    dosageAdult: '7,5mg a 15mg uma vez ao dia.',
    dosageChild: 'Não recomendado.',
    interactions: ['Diuréticos', 'Colestiramina'],
    contraindications: ['Insuficiência renal grave', 'Úlcera ativa'],
    sideEffects: ['Dor abdominal', 'Diarreia', 'Anemia (raro)'],
    notes: 'Mais seletivo para COX-2 que outros AINEs tradicionais.'
  },
  {
    name: 'Venlafaxina (Efexor)',
    class: 'Antidepressivo (IRSN)',
    indication: 'Depressão, transtorno de ansiedade generalizada, fobia social.',
    dosageAdult: '75mg a 225mg ao dia.',
    dosageChild: 'Não recomendado.',
    interactions: ['IMAOs', 'Erva-de-São-João', 'Triptanos'],
    contraindications: ['Uso de IMAOs', 'Hipersensibilidade'],
    sideEffects: ['Náusea', 'Boca seca', 'Sudorese', 'Aumento da pressão arterial'],
    notes: 'Receita C1. Não interromper bruscamente (risco de síndrome de descontinuação).'
  },
  {
    name: 'Duloxetina (Cymbalta)',
    class: 'Antidepressivo (IRSN)',
    indication: 'Depressão, ansiedade, dor neuropática diabética, fibromialgia.',
    dosageAdult: '30mg a 60mg uma vez ao dia.',
    dosageChild: 'Não recomendado.',
    interactions: ['Fluvoxamina', 'Ciprofloxacino'],
    contraindications: ['Doença hepática', 'Glaucoma de ângulo fechado'],
    sideEffects: ['Náusea', 'Sonolência', 'Boca seca', 'Diminuição do apetite'],
    notes: 'Receita C1. Muito eficaz em quadros de dor crônica associada à depressão.'
  },
  {
    name: 'Paroxetina (Pondera)',
    class: 'Antidepressivo (ISRS)',
    indication: 'Depressão, TOC, pânico, fobia social, ansiedade generalizada.',
    dosageAdult: '20mg a 50mg uma vez ao dia.',
    dosageChild: 'Não recomendado.',
    interactions: ['IMAOs', 'Triptofano', 'Varfarina'],
    contraindications: ['Gravidez (Categoria D)', 'Uso de IMAOs'],
    sideEffects: ['Disfunção sexual', 'Náusea', 'Sonolência', 'Ganho de peso'],
    notes: 'Receita C1. Conhecida por ter uma síndrome de descontinuação mais intensa.'
  },
  {
    name: 'Citalopram',
    class: 'Antidepressivo (ISRS)',
    indication: 'Depressão e transtorno do pânico.',
    dosageAdult: '20mg a 40mg uma vez ao dia.',
    dosageChild: 'Não recomendado.',
    interactions: ['IMAOs', 'Linezolida', 'Pimozida'],
    contraindications: ['Prolongamento do intervalo QT', 'Uso de IMAOs'],
    sideEffects: ['Boca seca', 'Náusea', 'Sonolência', 'Aumento do suor'],
    notes: 'Receita C1. Considerado um dos ISRS com menos interações.'
  },
  {
    name: 'Diazepam (Valium)',
    class: 'Benzodiazepínico (Psicotrópico)',
    indication: 'Ansiedade, espasmos musculares, crises convulsivas, abstinência alcoólica.',
    dosageAdult: '5mg a 10mg até 3x ao dia.',
    dosageChild: 'Uso restrito.',
    interactions: ['Álcool', 'Opioides', 'Cimetidina'],
    contraindications: ['Miastenia gravis', 'Apneia do sono', 'Insuficiência hepática'],
    sideEffects: ['Sonolência', 'Ataxia (falta de coordenação)', 'Dependência'],
    notes: 'Receita B1 (Azul). Possui meia-vida muito longa.'
  },
  {
    name: 'Haloperidol (Haldol)',
    class: 'Antipsicótico Típico',
    indication: 'Esquizofrenia, delírios, agitação psicomotora, tiques (Tourette).',
    dosageAdult: '0,5mg a 20mg ao dia (conforme gravidade).',
    dosageChild: 'Conforme peso e idade.',
    interactions: ['Levodopa', 'Lítio', 'Álcool'],
    contraindications: ['Doença de Parkinson', 'Coma', 'Depressão do SNC'],
    sideEffects: ['Sintomas extrapiramidais (rigidez, tremores)', 'Discinesia'],
    notes: 'Receita C1. Antipsicótico clássico de alta potência.'
  },
  {
    name: 'Olanzapina (Zyprexa)',
    class: 'Antipsicótico Atípico',
    indication: 'Esquizofrenia e episódios de mania no transtorno bipolar.',
    dosageAdult: '5mg a 20mg uma vez ao dia.',
    dosageChild: 'Uso restrito.',
    interactions: ['Fluvoxamina', 'Carbamazepina', 'Tabagismo'],
    contraindications: ['Glaucoma de ângulo estreito'],
    sideEffects: ['Ganho de peso significativo', 'Aumento de apetite', 'Sedação'],
    notes: 'Receita C1. Monitorar perfil lipídico e glicêmico.'
  },
  {
    name: 'Valproato de Sódio / Ácido Valproico (Depakene)',
    class: 'Anticonvulsivante e Estabilizador de Humor',
    indication: 'Epilepsia, transtorno bipolar e prevenção de enxaqueca.',
    dosageAdult: '1000mg a 2000mg ao dia.',
    dosageChild: '15mg a 60mg/kg/dia.',
    interactions: ['Fenobarbital', 'Fenitoína', 'Aspirina'],
    contraindications: ['Doença hepática', 'Gravidez (Alto risco de malformação)'],
    sideEffects: ['Queda de cabelo', 'Ganho de peso', 'Náusea', 'Tremor'],
    notes: 'Receita C1. Monitorar função hepática e hemograma.'
  },
  {
    name: 'Carbamazepina (Tegretol)',
    class: 'Anticonvulsivante',
    indication: 'Epilepsia, neuralgia do trigêmeo, transtorno bipolar.',
    dosageAdult: '200mg a 1200mg ao dia.',
    dosageChild: '10mg a 20mg/kg/dia.',
    interactions: ['MUITAS: Reduz efeito de anticoncepcionais, varfarina'],
    contraindications: ['Bloqueio atrioventricular', 'Histórico de depressão de medula'],
    sideEffects: ['Tontura', 'Sonolência', 'Visão dupla', 'Rash cutâneo'],
    notes: 'Receita C1. É um potente indutor enzimático.'
  },
  {
    name: 'Fenitoína (Hidantal)',
    class: 'Anticonvulsivante',
    indication: 'Crises convulsivas e estado de mal epilético.',
    dosageAdult: '300mg a 400mg ao dia.',
    dosageChild: '5mg a 8mg/kg/dia.',
    interactions: ['Amiodarona', 'Cloranfenicol', 'Anticoncepcionais'],
    contraindications: ['Bradicardia sinusal', 'Bloqueio sinoatrial'],
    sideEffects: ['Hiperplasia gengival', 'Hirsutismo', 'Nistagmo', 'Ataxia'],
    notes: 'Receita C1. Exige higiene bucal rigorosa devido à gengiva.'
  },
  {
    name: 'Gabapentina',
    class: 'Anticonvulsivante e Analgésico Neuropático',
    indication: 'Dor neuropática e epilepsia.',
    dosageAdult: '900mg a 3600mg ao dia.',
    dosageChild: 'Uso restrito.',
    interactions: ['Antiácidos (espaçar 2h)', 'Morfina'],
    contraindications: ['Hipersensibilidade'],
    sideEffects: ['Sonolência', 'Tontura', 'Fadiga', 'Edema periférico'],
    notes: 'Receita C1. Muito utilizada para dor crônica (ex: herpes zoster).'
  },
  {
    name: 'Pregabalina (Lyrica)',
    class: 'Anticonvulsivante e Analgésico Neuropático',
    indication: 'Dor neuropática, fibromialgia, transtorno de ansiedade generalizada.',
    dosageAdult: '150mg a 600mg ao dia.',
    dosageChild: 'Não recomendado.',
    interactions: ['Oxicodona', 'Lorazepam', 'Álcool'],
    contraindications: ['Hipersensibilidade'],
    sideEffects: ['Tontura', 'Sonolência', 'Boca seca', 'Visão turva'],
    notes: 'Receita C1. Frequentemente preferida à gabapentina pela posologia.'
  },
  {
    name: 'Cetirizina (Zyrtec)',
    class: 'Anti-histamínico (2ª Geração)',
    indication: 'Rinite alérgica e urticária.',
    dosageAdult: '10mg uma vez ao dia.',
    dosageChild: '5mg a 10mg conforme idade.',
    interactions: ['Teofilina'],
    contraindications: ['Insuficiência renal grave'],
    sideEffects: ['Sonolência leve (em alguns pacientes)', 'Fadiga'],
    notes: 'Pode causar mais sonolência que a loratadina.'
  },
  {
    name: 'Fexofenadina (Allegra)',
    class: 'Anti-histamínico (2ª Geração)',
    indication: 'Rinite alérgica e urticária idiopática crônica.',
    dosageAdult: '60mg 2x/dia ou 120mg/180mg 1x/dia.',
    dosageChild: '30mg 2x/dia (acima de 6 anos).',
    interactions: ['Eritromicina', 'Cetoconazol', 'Suco de frutas'],
    contraindications: ['Hipersensibilidade'],
    sideEffects: ['Cefaleia', 'Sonolência (raro)', 'Náusea'],
    notes: 'Considerado um dos anti-histamínicos que menos causa sono.'
  },
  {
    name: 'Dexametasona (Decadron)',
    class: 'Corticoide Potente',
    indication: 'Processos inflamatórios, alérgicos, edema cerebral, COVID-19 grave.',
    dosageAdult: '0,5mg a 10mg ao dia.',
    dosageChild: '0,02mg a 0,3mg/kg/dia.',
    interactions: ['Fenitoína', 'Rifampicina', 'Diuréticos'],
    contraindications: ['Infecções fúngicas sistêmicas', 'Vacinas de vírus vivo'],
    sideEffects: ['Insônia', 'Aumento de apetite', 'Hiperglicemia', 'Supressão adrenal'],
    notes: 'Corticoide de longa duração e alta potência.'
  },
  {
    name: 'Finasterida',
    class: 'Inibidor da 5-alfa-redutase',
    indication: 'Hiperplasia prostática benigna (5mg) e calvície masculina (1mg).',
    dosageAdult: '1mg ou 5mg uma vez ao dia.',
    dosageChild: 'Não indicado.',
    interactions: ['Sem interações significativas conhecidas.'],
    contraindications: ['Mulheres (especialmente grávidas - risco fetal)', 'Crianças'],
    sideEffects: ['Diminuição da libido', 'Disfunção erétil', 'Ginecomastia'],
    notes: 'Mulheres grávidas não devem sequer manipular comprimidos quebrados.'
  },
  {
    name: 'Tamsulosina (Secotex)',
    class: 'Antagonista Alfa-1 Adrenérgico',
    indication: 'Sintomas da hiperplasia prostática benigna (HPB).',
    dosageAdult: '0,4mg uma vez ao dia (após o café).',
    dosageChild: 'Não indicado.',
    interactions: ['Outros alfa-bloqueadores', 'Cimetidina'],
    contraindications: ['Hipotensão ortostática', 'Insuficiência hepática grave'],
    sideEffects: ['Tontura', 'Ejaculação retrógrada', 'Cefaleia'],
    notes: 'Ajuda no relaxamento da musculatura da próstata e bexiga.'
  },
  {
    name: 'Sildenafila (Viagra)',
    class: 'Inibidor da PDE5',
    indication: 'Disfunção erétil e hipertensão arterial pulmonar.',
    dosageAdult: '25mg a 100mg (conforme necessidade, 1h antes).',
    dosageChild: 'Uso restrito (HAP).',
    interactions: ['Nitratos (Gravíssimo)', 'Ritonavir', 'Suco de toranja'],
    contraindications: ['Uso de nitratos', 'Doença cardíaca grave'],
    sideEffects: ['Cefaleia', 'Rubor facial', 'Dispepsia', 'Alteração visual'],
    notes: 'NÃO tomar com nitratos (ex: Isordil, Monocordil) - Risco de morte.'
  },
  {
    name: 'Tadalafila (Cialis)',
    class: 'Inibidor da PDE5',
    indication: 'Disfunção erétil, HPB e hipertensão pulmonar.',
    dosageAdult: '5mg (uso diário) ou 20mg (sob demanda).',
    dosageChild: 'Não indicado.',
    interactions: ['Nitratos (Gravíssimo)', 'Cetoconazol'],
    contraindications: ['Infarto recente', 'Angina instável', 'Uso de nitratos'],
    sideEffects: ['Dor nas costas', 'Mialgia', 'Cefaleia', 'Congestão nasal'],
    notes: 'Efeito dura até 36 horas ("pílula do fim de semana").'
  },
  {
    name: 'Alendronato de Sódio',
    class: 'Bisfosfonato',
    indication: 'Osteoporose em mulheres pós-menopausa e em homens.',
    dosageAdult: '70mg uma vez por semana.',
    dosageChild: 'Não recomendado.',
    interactions: ['Cálcio', 'Antiácidos', 'AINEs'],
    contraindications: ['Anormalidades no esôfago', 'Incapacidade de ficar em pé/sentado por 30 min'],
    sideEffects: ['Esofagite', 'Dor abdominal', 'Dor óssea/muscular'],
    notes: 'Tomar em jejum com copo cheio de água e não deitar por 30 min.'
  },
  {
    name: 'Ácido Fólico',
    class: 'Vitamina (B9)',
    indication: 'Anemia megaloblástica e prevenção de defeitos do tubo neural na gravidez.',
    dosageAdult: '5mg ao dia (ou conforme orientação).',
    dosageChild: 'Conforme orientação pediátrica.',
    interactions: ['Metotrexato', 'Fenitoína'],
    contraindications: ['Anemia perniciosa (sem B12)'],
    sideEffects: ['Raro: Reações alérgicas'],
    notes: 'Essencial para mulheres que desejam engravidar.'
  },
  {
    name: 'Metoprolol (Selozok)',
    class: 'Betabloqueador Seletivo',
    indication: 'Hipertensão, angina, insuficiência cardíaca e após infarto.',
    dosageAdult: '25mg a 200mg uma vez ao dia.',
    dosageChild: 'Uso restrito.',
    interactions: ['Verapamil', 'Diltiazem', 'Propafenona'],
    contraindications: ['Bloqueio cardíaco de 2º ou 3º grau', 'Bradicardia severa'],
    sideEffects: ['Cansaço', 'Tontura', 'Bradicardia', 'Mãos frias'],
    notes: 'A formulação de succinato (Selozok) é de liberação controlada.'
  },
  {
    name: 'Carvedilol',
    class: 'Betabloqueador Não Seletivo e Alfa-1 Bloqueador',
    indication: 'Insuficiência cardíaca, hipertensão e angina.',
    dosageAdult: '3,125mg a 50mg 2x ao dia.',
    dosageChild: 'Não recomendado.',
    interactions: ['Digoxina', 'Insulina', 'Rifampicina'],
    contraindications: ['Asma brônquica', 'DPOC grave', 'Insuficiência hepática'],
    sideEffects: ['Tontura', 'Fadiga', 'Hipotensão postural'],
    notes: 'Tomar com alimentos para reduzir o risco de queda de pressão.'
  },
  {
    name: 'Lorazepam (Lorax)',
    class: 'Benzodiazepínico',
    indication: 'Ansiedade, insônia associada à ansiedade e sedação pré-operatória.',
    dosageAdult: '1mg a 6mg ao dia divididos.',
    dosageChild: 'Uso restrito.',
    interactions: ['Álcool', 'Clozapina', 'Valproato'],
    contraindications: ['Glaucoma de ângulo estreito', 'Insuficiência respiratória'],
    sideEffects: ['Sedação', 'Tontura', 'Fraqueza muscular'],
    notes: 'Receita B1 (Azul). Meia-vida intermediária.'
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
  { drugs: 'Lítio + Diuréticos/AINEs', level: 'Alto', effect: 'Aumento da toxicidade do Lítio.', risk: 'Dano neurológico e renal.' },
  { drugs: 'Levotiroxina + Cálcio/Ferro', level: 'Moderado', effect: 'Redução da absorção do hormônio tireoidiano.', risk: 'Ineficácia do tratamento do hipotireoidismo.' },
  { drugs: 'Ciclobenzaprina + Álcool', level: 'Alto', effect: 'Potencialização da depression do SNC.', risk: 'Sedação profunda e risco de acidentes.' },
  { drugs: 'Rivaroxabana + Cetoconazol', level: 'Alto', effect: 'Aumento da exposição ao anticoagulante.', risk: 'Risco elevado de sangramentos graves.' },
  { drugs: 'Carbamazepina + Anticoncepcional', level: 'Alto', effect: 'Indução enzimática reduz níveis do contraceptivo.', risk: 'Falha na contracepção.' },
  { drugs: 'Fenitoína + Varfarina', level: 'Grave', effect: 'Alteração complexa no tempo de coagulação.', risk: 'Risco de sangramento ou trombose.' },
  { drugs: 'Dexametasona + Antidiabéticos', level: 'Moderado', effect: 'Corticoide aumenta a glicemia.', risk: 'Descontrole do diabetes.' }
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
