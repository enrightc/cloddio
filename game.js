'use strict';

// ─── Constants ────────────────────────────────────────────────────────────────

const COLS        = 5;
const ROWS        = 4;
const TOTAL_CELLS = COLS * ROWS; // 20
const TRAY_SIZE   = 8;
const MIN_FINDS   = 4;
const MAX_FINDS   = 7;

// Layer CSS class assigned per row (top → bottom)
const ROW_LAYER_CLASS = [
  'cell--topsoil',
  'cell--medieval',
  'cell--iron-age',
  'cell--natural',
];

// ─── Game state ───────────────────────────────────────────────────────────────

const state = {
  site:       null,       // SITES entry
  cells:      [],         // array of cell objects (length === TOTAL_CELLS)
  excavated:  0,          // cells clicked so far
  found:      0,          // artefacts uncovered so far
  score:      0,          // running score
  catalogued: new Set(),  // artefact IDs successfully catalogued
  penalised:  new Set(),  // artefact IDs already penalised (penalty applied once)
};

// ─── Initialisation ───────────────────────────────────────────────────────────

function initGame() {
  state.site       = SITES[Math.floor(Math.random() * SITES.length)];
  state.excavated  = 0;
  state.found      = 0;
  state.score      = 0;
  state.catalogued = new Set();
  state.penalised  = new Set();
  state.cells      = buildCells(state.site);

  // Clear notes log from previous trench
  const log = document.getElementById('field-notes-log');
  if (log) log.innerHTML = '';

  renderSiteMeta();
  renderStratigraphyLabels();
  renderGrid();
  renderTray();
  renderCataloguePeriodSlots();
  updateProgress();
  updateScore();
  updateHintButton();

  addNote('system', `— Trench opened at ${state.site.label} (${state.site.location})`);
  console.log(`[Cloddio] Game started — "${state.site.label}" (${state.site.location})`);
  console.log(`[Cloddio] ${state.cells.filter(c => c.artefactId).length} finds hidden across ${TOTAL_CELLS} cells`);
}

// ─── Cell construction ────────────────────────────────────────────────────────

function buildCells(site) {
  const eligible = ARTEFACTS.filter(a => site.periods.includes(a.periodId));

  const findCount = Math.min(
    MIN_FINDS + Math.floor(Math.random() * (MAX_FINDS - MIN_FINDS + 1)),
    eligible.length,
  );

  const finds = [...eligible]
    .sort(() => Math.random() - 0.5)
    .slice(0, findCount);

  // Keep finds out of row 0 (topsoil) where possible
  const digCells  = Array.from({length: TOTAL_CELLS - COLS}, (_, i) => i + COLS);
  const positions = digCells
    .sort(() => Math.random() - 0.5)
    .slice(0, findCount);

  const findMap = new Map(positions.map((pos, i) => [pos, finds[i].id]));

  return Array.from({length: TOTAL_CELLS}, (_, i) => ({
    id:         i,
    row:        Math.floor(i / COLS),
    col:        i % COLS,
    artefactId: findMap.get(i) ?? null,
    state:      'unexcavated', // 'unexcavated' | 'excavated' | 'found'
  }));
}

// ─── Grid rendering ───────────────────────────────────────────────────────────

function renderSiteMeta() {
  const { site } = state;

  const nameEl   = document.querySelector('.js-site-name');
  const periodEl = document.querySelector('.js-site-period');

  if (nameEl)   nameEl.textContent   = site.label;
  if (periodEl) periodEl.textContent = site.periods
    .map(id => getPeriod(id)?.label ?? id)
    .join(', ');
}

function renderStratigraphyLabels() {
  const container = document.querySelector('.stratigraphy-labels');
  if (!container) return;

  const { site } = state;

  const periodLabels = site.periods.map(id => getPeriod(id)?.label ?? id);
  const raw = ['Topsoil', ...periodLabels, 'Natural'];

  const labels = raw.length <= ROWS
    ? [...raw, ...Array(ROWS - raw.length).fill('')]
    : [raw[0], ...raw.slice(1, ROWS - 1), raw[raw.length - 1]];

  container.innerHTML = '';
  labels.forEach((text, i) => {
    if (!text) return;
    const span = document.createElement('span');
    span.className   = 'layer-label';
    span.style.top   = `${(i / ROWS) * 100 + 3}%`;
    span.textContent = text;
    container.appendChild(span);
  });
}

function renderGrid() {
  const grid = document.querySelector('.dig-grid');
  if (!grid) return;

  grid.innerHTML = '';

  for (const cell of state.cells) {
    grid.appendChild(buildCellEl(cell));
  }
}

function buildCellEl(cell) {
  const el = document.createElement('div');
  el.dataset.cellId = cell.id;

  const layerClass = ROW_LAYER_CLASS[cell.row] ?? 'cell--natural';

  if (cell.state === 'unexcavated') {
    el.className = `cell ${layerClass}`;
    el.dataset.excavatable = '';
    el.addEventListener('click', () => handleCellClick(cell.id));

  } else if (cell.state === 'excavated') {
    el.className = `cell ${layerClass} cell--dug`;

  } else if (cell.state === 'found') {
    el.className = `cell ${layerClass} cell--find`;
    const artefact = getArtefact(cell.artefactId);
    el.textContent = artefact?.icon ?? '?';
    el.title       = artefact?.label ?? '';
    el.addEventListener('click', () => openModal(cell.artefactId));
  }

  return el;
}

// ─── Tray rendering ───────────────────────────────────────────────────────────

function renderTray() {
  const grid = document.querySelector('.tray-grid');
  if (!grid) return;

  const found = state.cells.filter(c => c.state === 'found');

  grid.innerHTML = '';

  found.forEach(c => grid.appendChild(buildTrayCard(c.artefactId)));

  // Empty placeholder slots
  for (let i = found.length; i < TRAY_SIZE; i++) {
    const slot = document.createElement('div');
    slot.className = 'tray-slot';
    grid.appendChild(slot);
  }

  const countEl = document.querySelector('.js-tray-count');
  if (countEl) countEl.textContent = found.length;
}

function buildTrayCard(artefactId) {
  const artefact = getArtefact(artefactId);
  const period   = getPeriod(artefact.periodId);

  const card = document.createElement('div');
  card.className          = 'tray-slot tray-slot--filled';
  card.draggable          = true;
  card.dataset.artefactId = artefactId;
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.title = `${artefact.label} — click to view`;

  card.innerHTML = `
    <div class="tray-slot__icon">${artefact.icon}</div>
    <div class="tray-slot__label">${artefact.label}</div>
    <div class="tray-slot__period">${period?.label ?? ''}</div>
  `;

  card.addEventListener('click', () => openModal(artefactId));
  card.addEventListener('keydown', e => { if (e.key === 'Enter') openModal(artefactId); });

  card.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', artefactId);
    card.classList.add('is-dragging');
  });
  card.addEventListener('dragend', () => card.classList.remove('is-dragging'));

  return card;
}

// ─── Interaction ──────────────────────────────────────────────────────────────

function handleCellClick(cellId) {
  const cell = state.cells[cellId];
  if (!cell || cell.state !== 'unexcavated') return;

  state.excavated++;

  if (cell.artefactId) {
    cell.state = 'found';
    state.found++;
    const artefact = getArtefact(cell.artefactId);
    addNote('find', `▲ Found: ${artefact.icon} ${artefact.label} [${getPeriod(artefact.periodId)?.label}]`);
    renderTray();
    updateHintButton();
    openModal(cell.artefactId);
  } else {
    cell.state = 'excavated';
    addNote('excavated', `· (${cell.row},${cell.col}) — nothing found`);
  }

  // Swap the single cell element in place
  const grid  = document.querySelector('.dig-grid');
  const oldEl = grid?.querySelector(`[data-cell-id="${cellId}"]`);
  if (oldEl) oldEl.replaceWith(buildCellEl(cell));

  updateProgress();
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function openModal(artefactId) {
  const artefact = getArtefact(artefactId);
  const period   = getPeriod(artefact.periodId);

  const eraEl   = document.querySelector('.js-modal-era');
  const iconEl  = document.querySelector('.js-modal-icon');
  const nameEl  = document.querySelector('.js-modal-name');
  const descEl  = document.querySelector('.js-modal-desc');
  const chipsEl = document.querySelector('.js-modal-chips');
  const consEl  = document.querySelector('.js-modal-conservation');

  if (eraEl) {
    eraEl.textContent        = period?.label ?? '';
    eraEl.style.color        = period?.colour ?? 'var(--clr-ochre)';
    eraEl.style.borderColor  = period?.colour ?? 'var(--clr-ochre)';
    eraEl.style.background   = (period?.colour ?? '#888') + '28';
  }

  if (iconEl) iconEl.textContent = artefact.icon;
  if (nameEl) nameEl.textContent = artefact.label;
  if (descEl) descEl.textContent = artefact.description;

  if (chipsEl) {
    chipsEl.innerHTML = `
      <span class="chip chip--${artefact.rarity}">${artefact.rarity}</span>
      <span class="chip chip--points">${artefact.points} pts</span>
    `;
  }

  if (consEl) {
    consEl.textContent = artefact.conservationNote
      ? `Conservation note: ${artefact.conservationNote}`
      : '';
    consEl.hidden = !artefact.conservationNote;
  }

  document.getElementById('artefact-modal').classList.add('is-open');
}

function closeModal() {
  document.getElementById('artefact-modal').classList.remove('is-open');
}

// ─── Catalogue period slots ───────────────────────────────────────────────────

function renderCataloguePeriodSlots() {
  const container = document.getElementById('period-slots');
  if (!container) return;

  container.innerHTML = '';

  for (const period of PERIODS) {
    container.appendChild(buildPeriodSlot(period));
  }

  const countEl = document.querySelector('.js-catalogue-count');
  if (countEl) countEl.textContent = state.catalogued.size;
}

function buildPeriodSlot(period) {
  const slot = document.createElement('div');
  slot.className       = 'period-slot';
  slot.dataset.periodId = period.id;

  // Header row
  const header = document.createElement('div');
  header.className = 'period-slot__header';
  header.innerHTML = `
    <span class="period-slot__label" style="color:${period.colour}">${period.label}</span>
    <span class="period-slot__date">${period.dateRange}</span>
  `;

  // Drop hint
  const hint = document.createElement('p');
  hint.className   = 'period-slot__drop-hint';
  hint.textContent = 'Drag finds here';

  // Entries list (hidden until first entry)
  const entries = document.createElement('ul');
  entries.className       = 'period-slot__entries';
  entries.dataset.periodId = period.id;

  slot.appendChild(header);
  slot.appendChild(hint);
  slot.appendChild(entries);

  // Drag-over highlight
  slot.addEventListener('dragover', e => {
    e.preventDefault();
    slot.classList.add('drag-over');
  });

  slot.addEventListener('dragleave', e => {
    if (!slot.contains(e.relatedTarget)) {
      slot.classList.remove('drag-over');
    }
  });

  slot.addEventListener('drop', e => {
    e.preventDefault();
    slot.classList.remove('drag-over');
    const artefactId = e.dataTransfer.getData('text/plain');
    if (artefactId) handleDrop(period.id, artefactId, slot);
  });

  return slot;
}

// ─── Drop handling ────────────────────────────────────────────────────────────

function handleDrop(droppedPeriodId, artefactId, slotEl) {
  // Ignore already-catalogued artefacts
  if (state.catalogued.has(artefactId)) return;

  const artefact = getArtefact(artefactId);
  if (!artefact) return;

  const period  = getPeriod(artefact.periodId);
  const correct = artefact.periodId === droppedPeriodId;

  if (correct) {
    state.score += artefact.points;
    state.catalogued.add(artefactId);
    addCatalogueEntry(droppedPeriodId, artefactId);
    markTrayCardCatalogued(artefactId);
    flashSlot(slotEl, 'correct');
    addNote('correct', `✓ ${artefact.icon} ${artefact.label} → ${period?.label} (+${artefact.points} pts)`);
    showToast(`✓ Correct — ${artefact.label} +${artefact.points} pts`, 'success');
    updateHintButton();
    checkCompletion();
  } else {
    flashSlot(slotEl, 'wrong');
    if (!state.penalised.has(artefactId)) {
      const penalty = Math.round(artefact.points * 0.2);
      state.score   = Math.max(0, state.score - penalty);
      state.penalised.add(artefactId);
      addNote('wrong', `✗ ${artefact.icon} ${artefact.label} → wrong period (−${penalty} pts)`);
      showToast(`✗ Wrong period — −${penalty} pts`, 'error');
    } else {
      addNote('wrong', `✗ ${artefact.icon} ${artefact.label} → wrong period again`);
      showToast(`✗ Wrong period again`, 'error');
    }
  }

  updateScore();
}

function flashSlot(slotEl, type) {
  slotEl.classList.remove('flash-correct', 'flash-wrong');
  // Force reflow so re-triggering the same animation works
  void slotEl.offsetWidth;
  slotEl.classList.add(`flash-${type}`);
  setTimeout(() => slotEl.classList.remove(`flash-${type}`), 700);
}

function addCatalogueEntry(periodId, artefactId) {
  const artefact = getArtefact(artefactId);

  // Remove drop hint once the first entry lands
  const slot    = document.querySelector(`.period-slot[data-period-id="${periodId}"]`);
  const hint    = slot?.querySelector('.period-slot__drop-hint');
  if (hint) hint.hidden = true;

  const entries = document.querySelector(`.period-slot__entries[data-period-id="${periodId}"]`);
  if (!entries) return;

  const li = document.createElement('li');
  li.className = 'period-slot__entry';
  li.innerHTML = `
    <span class="period-slot__entry-name">${artefact.icon} ${artefact.label}</span>
    <span class="chip chip--rare">✓ correct</span>
  `;
  entries.appendChild(li);

  // Update catalogue entry count
  const countEl = document.querySelector('.js-catalogue-count');
  if (countEl) countEl.textContent = state.catalogued.size;
}

function markTrayCardCatalogued(artefactId) {
  const card = document.querySelector(`.tray-slot--filled[data-artefact-id="${artefactId}"]`);
  if (!card) return;
  card.classList.add('tray-slot--catalogued');
  card.draggable = false;
}

// ─── Score ────────────────────────────────────────────────────────────────────

function updateScore() {
  const el = document.querySelector('.js-score');
  if (el) el.textContent = state.score;
}

// ─── Field notes log ──────────────────────────────────────────────────────────

function addNote(type, text) {
  const log = document.getElementById('field-notes-log');
  if (!log) return;

  const li = document.createElement('li');
  li.className   = `note note--${type}`;
  li.textContent = text;
  log.appendChild(li);

  // Auto-scroll to newest entry
  log.scrollTop = log.scrollHeight;
}

// ─── Toast notifications ──────────────────────────────────────────────────────

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className   = `toast toast--${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  // Double rAF ensures the element is in the DOM before transition starts
  requestAnimationFrame(() => requestAnimationFrame(() => {
    toast.classList.add('toast--visible');
  }));

  setTimeout(() => {
    toast.classList.remove('toast--visible');
    setTimeout(() => toast.remove(), 280);
  }, 3000);
}

// ─── Completion ───────────────────────────────────────────────────────────────

function checkCompletion() {
  if (state.found === 0 || state.catalogued.size < state.found) return;

  const perfectCount = state.found - state.penalised.size;
  const bonus        = 50 + (Math.max(0, perfectCount) * 10);
  state.score       += bonus;
  updateScore();

  const msg = `Trench complete! ${perfectCount}/${state.found} perfect · Bonus +${bonus} pts · Final score: ${state.score}`;
  addNote('bonus', `★ ${msg}`);
  showToast(`★ ${msg}`, 'ochre');
  console.log(`[Cloddio] ${msg}`);
}

// ─── Hint ─────────────────────────────────────────────────────────────────────

function requestHint() {
  const uncatalogued = state.cells.filter(
    c => c.state === 'found' && !state.catalogued.has(c.artefactId)
  );

  if (uncatalogued.length === 0) {
    showToast('No uncatalogued finds remaining.', 'info');
    return;
  }

  const cell     = uncatalogued[Math.floor(Math.random() * uncatalogued.length)];
  const artefact = getArtefact(cell.artefactId);
  const period   = getPeriod(artefact.periodId);
  const text     = `${artefact.icon} ${artefact.label} belongs to the ${period.label} period`;

  addNote('hint', `? ${text}`);
  showToast(`Hint: ${text}`, 'hint');
}

// ─── New Trench ───────────────────────────────────────────────────────────────

function newTrench() {
  if (!confirm('Abandon this trench and start a new one?\nAll current progress will be lost.')) return;
  initGame();
}

// ─── Hint button state ────────────────────────────────────────────────────────

function updateHintButton() {
  const btn = document.getElementById('btn-hint');
  if (!btn) return;
  btn.disabled = !state.cells.some(
    c => c.state === 'found' && !state.catalogued.has(c.artefactId)
  );
}

// ─── Progress bar ─────────────────────────────────────────────────────────────

function updateProgress() {
  const pct = (state.excavated / TOTAL_CELLS) * 100;

  const fill    = document.querySelector('.progress-fill');
  const label   = document.querySelector('.progress-label');
  const findsEl = document.querySelector('.js-finds-count');

  if (fill)    fill.style.width    = `${pct}%`;
  if (label)   label.textContent   = `${state.excavated} / ${TOTAL_CELLS} cells`;
  if (findsEl) findsEl.textContent = state.found;
}

// ─── Boot ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  // Modal close — button
  document.querySelector('.modal-close')
    ?.addEventListener('click', closeModal);

  // Modal close — overlay backdrop click
  document.getElementById('artefact-modal')
    ?.addEventListener('click', e => {
      if (e.target.id === 'artefact-modal') closeModal();
    });

  // Modal close — Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  // Tray action buttons
  document.getElementById('btn-hint')?.addEventListener('click', requestHint);
  document.getElementById('btn-new-trench')?.addEventListener('click', newTrench);

  initGame();
});
