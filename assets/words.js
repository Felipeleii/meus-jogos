// words.js - Lista de palavras extraída do term.ooo
// Lista Rf (palavras válidas) e Pf (palavras-resposta)
// Fonte: bundle JS term.ooo (multi.811eb29.js)

// DATA DE INÍCIO do term.ooo (dia 0 = 2022-01-03)
const TERMO_START_DATE = new Date('2022-01-03T03:00:00.000Z');

// Normalização de acentos (do term.ooo: objeto Yf)
const ACCENT_MAP = {
  "abaca":"abacá","abara":"abará","abare":"abaré","abebe":"abebé","abece":"abecê","abede":"abedê","abico":"abicô","abobo":"abobó","abofe":"abofé","aboco":"aboço","abuxo":"abuxó","acaja":"acajá","acara":"acará","acaua":"acauã","acaca":"acaçá","acaem":"acaém","acola":"acolá","acona":"aconá","acroa":"acroá","acreu":"acréu","acuma":"acumã","acure":"acuré","adixa":"adixá","adoga":"adogã","adoca":"adoça","adoco":"adoço","advem":"advém","adion":"adíon","afefe":"afefé","afega":"afegã","afoxe":"afoxé","afura":"afurá","agace":"agacé","agada":"agadá","agare":"agaré","agogo":"agogô","agrao":"agrão","agrem":"agrém","aguai":"aguaí","aguca":"aguça","aguco":"aguço","aiara":"aiará","aiaca":"aiaçá","aioca":"aiocá","airao":"airão","aitao":"aitão","aiuca":"aiucá","aiuiu":"aiuiú","aivao":"aivão","ajabo":"ajabó","ajapa":"ajapá","ajara":"ajará","ajare":"ajaré","ajobo":"ajobó","ajupa":"ajupá","alaba":"alabá","alabe":"alabê","alafe":"alafé","alala":"alalá","alboi":"albói","aldea":"aldeã","alema":"alemã","alias":"aliás","alode":"alodê","aloes":"aloés","alpao":"alpão","altea":"alteá","alufa":"alufá","aluja":"alujá","alvao":"alvão","alcai":"alçai","alcam":"alçam","alcar":"alçar","alcas":"alças","alcou":"alçou","alcuz":"alçuz","amala":"amalá","amana":"amaná","amapa":"amapá","ambua":"ambuá","ambui":"ambuí","ambao":"ambão","amele":"amelê","ameca":"ameça","amore":"amoré","amure":"amurê","anaca":"anacã","anace":"anacé","anaia":"anaiá","anaja":"anajá","anaje":"anajé","anana":"ananá","anaue":"anauê","ancia":"anciã","angau":"angaú","aniao":"anião","anjao":"anjão","antao":"antão","anuai":"anuaí","anuja":"anujá","anuia":"anuía","anaos":"anãos","aneis":"anéis","anoes":"anões","apapa":"apapá","apiao":"apião","aprea":"apreá","aquem":"aquém","araba":"arabá","araia":"araiá","araio":"araió","araiu":"araiú","arama":"aramã","arata":"aratá","araue":"araué","araxa":"araxá","araca":"araçá","arede":"aredê","arere":"arerê","areao":"areão","argao":"argão","aribe":"aribé","arica":"aricá","arico":"aricó","arigo":"arigó","arima":"arimã","arina":"ariná","arita":"aritá","arjao":"arjão","armao":"armão","armeu":"arméu","arnes":"arnês","aroca":"arocá","arpao":"arpão","arpeu":"arpéu","arrua":"arruá","artao":"artão","aruai":"aruaí","arube":"arubé","aruma":"arumã","arura":"arurá","arcao":"arção","areus":"aréus","assua":"assuã","atala":"atalá","atare":"atarê","atera":"aterá","atica":"atiça","aticu":"atiçu","atoba":"atobá","atoto":"atotô","atras":"atrás","atens":"aténs","atois":"atóis","auacu":"auaçu","aucao":"aução","avare":"avaré","avela":"avelã","aveao":"aveão","avira":"avirá","aviao":"avião","avens":"avéns","axabo":"axabó","axexe":"axexê","axoxo":"axoxô","azala":"azalá","azibo":"azibó","acacu":"açacu","acala":"açalá","acame":"açame","acamo":"açamo","acuba":"açubá","acude":"açude","aculo":"açulo","acumi":"açumi","acoes":"ações","aerea":"aérea","aereo":"aéreo","aioli":"aïoli","aonio":"aônio","auste":"aúste"
};

// Função para normalizar palavra (remover acentos)
function normalizeWord(word) {
  return word.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

// Função para desnormalizar (adicionar acentos conforme mapa do term.ooo)
function denormalizeWord(word) {
  return ACCENT_MAP[word] || word;
}

// Calcula o índice do dia baseado na data de início do term.ooo
function getDayIndex(date) {
  const d = date ? new Date(date) : new Date();
  // Usar meia-noite no fuso horário local
  const local = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  return Math.floor((local - TERMO_START_DATE) / 86400000);
}

// Calcula o dia a partir do índice
function getDateFromIndex(idx) {
  const d = new Date(TERMO_START_DATE.getTime() + idx * 86400000);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

// Formata data para YYYY-MM-DD
function formatDate(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

// Exportar funções e dados para uso no jogo
window.TERMO = window.TERMO || {};
window.TERMO.getDayIndex = getDayIndex;
window.TERMO.getDateFromIndex = getDateFromIndex;
window.TERMO.formatDate = formatDate;
window.TERMO.normalizeWord = normalizeWord;
window.TERMO.denormalizeWord = denormalizeWord;
window.TERMO.START_DATE = TERMO_START_DATE;
