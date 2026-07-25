// game.js - Lógica central do jogo (Termo, Dueto, Quarteto)
// Inspirado no term.ooo mas implementação independente

window.TERMO = window.TERMO || {};

// === CONSTANTES ===
const START_DATE = new Date('2022-01-03T03:00:00.000Z');
const COLORS = {
  right: '#3aa394',
  place: '#d3ad69',
  wrong: '#312a2c',
  empty: '#4c4347',
  text: '#fafaff'
};

// === FUNÇÕES DE DATA ===
function getDayIndex(date) {
  const d = date ? new Date(date) : new Date();
  const local = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  return Math.floor((local - START_DATE) / 86400000);
}

function getDateFromIndex(idx) {
  const ts = START_DATE.getTime() + idx * 86400000;
  const d = new Date(ts);
  // Adjust for timezone
  return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
}

function formatDate(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function formatDateBR(date) {
  const d = new Date(date);
  return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
}

// === FUNÇÕES DE PALAVRAS ===
function normalizeWord(word) {
  return word.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function denormalizeWord(word) {
  const map = window.TERMO.ACCENT_MAP || {};
  return map[word] || word;
}

function getAnswerForDay(dayIdx, mode) {
  const answers = window.TERMO.ANSWER_WORDS || [];
  const duoIdx = window.TERMO.DUETO_IDX || [];
  const quatIdx = window.TERMO.QUART_IDX || [];
  
  if (mode === 1) {
    // Termo: direct index
    return [answers[dayIdx % answers.length]];
  } else if (mode === 2) {
    // Dueto: index into WB/duoIdx
    const i = (2 * dayIdx) % duoIdx.length;
    return duoIdx.slice(i, i + 2).map(idx => answers[idx]);
  } else if (mode === 4) {
    // Quarteto: index into QB/quatIdx
    const i = (4 * dayIdx) % quatIdx.length;
    return quatIdx.slice(i, i + 4).map(idx => answers[idx]);
  }
  return [];
}

function isValidWord(word) {
  const validWords = window.TERMO.VALID_WORDS;
  const answers = window.TERMO.ANSWER_WORDS || [];
  const accentMap = window.TERMO.ACCENT_MAP || {};
  
  if (!word || word.length !== 5) return false;
  const norm = normalizeWord(word);
  
  // Check in valid words set (normalized)
  if (validWords && validWords.has(norm)) return true;
  // Check in answer words
  if (answers.some(w => normalizeWord(w) === norm)) return true;
  // Check accent map keys (normalized -> accented)
  if (accentMap[norm]) return true;
  
  return false;
}

// === LÓGICA DO JOGO ===
function checkGuess(guess, target) {
  // guess and target are arrays of chars (normalized)
  const result = new Array(5).fill('wrong');
  const targetCount = {};
  
  // Count target chars
  for (let i = 0; i < 5; i++) {
    if (guess[i] === target[i]) {
      result[i] = 'right';
    } else {
      targetCount[target[i]] = (targetCount[target[i]] || 0) + 1;
    }
  }
  
  // Check for 'place' (right letter, wrong position)
  for (let i = 0; i < 5; i++) {
    if (result[i] !== 'right' && targetCount[guess[i]] > 0) {
      result[i] = 'place';
      targetCount[guess[i]]--;
    }
  }
  
  return result;
}

// === GERENCIAMENTO DE ESTADO ===
function getStorageKey(mode, dayIdx) {
  return `termo_${mode}_${dayIdx}`;
}

function saveState(mode, dayIdx, state) {
  try {
    localStorage.setItem(getStorageKey(mode, dayIdx), JSON.stringify(state));
  } catch(e) {}
}

function loadState(mode, dayIdx) {
  try {
    const raw = localStorage.getItem(getStorageKey(mode, dayIdx));
    return raw ? JSON.parse(raw) : null;
  } catch(e) { return null; }
}

// === NAVEGAÇÃO DE DATAS ===
function getAvailableDays(currentIdx, count = 7) {
  const days = [];
  for (let i = count - 1; i >= 0; i--) {
    days.push(currentIdx - i);
  }
  return days;
}

// Export
window.TERMO.getDayIndex = getDayIndex;
window.TERMO.getDateFromIndex = getDateFromIndex;
window.TERMO.formatDate = formatDate;
window.TERMO.formatDateBR = formatDateBR;
window.TERMO.normalizeWord = normalizeWord;
window.TERMO.denormalizeWord = denormalizeWord;
window.TERMO.getAnswerForDay = getAnswerForDay;
window.TERMO.isValidWord = isValidWord;
window.TERMO.checkGuess = checkGuess;
window.TERMO.saveState = saveState;
window.TERMO.loadState = loadState;
window.TERMO.getAvailableDays = getAvailableDays;
window.TERMO.START_DATE = START_DATE;
