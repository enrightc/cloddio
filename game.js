'use strict';

// ─── Constants ────────────────────────────────────────────────────────────────

const COLS        = 5;
const ROWS        = 4;
const TOTAL_CELLS = COLS * ROWS; // 20
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
  site:      null,  // SITES entry
  cells:     [],    // array of cell objects (length === TOTAL_CELLS)
  excavated: 0,     // cells clicked so far
  found:     0,     // artefacts uncovered so far
};

// ─── Initialisation ───────────────────────────────────────────────────────────

function initGame() {
  state.site      = SITES[Math.floor(Math.random() * SITES.length)];
  state.excavated = 0;
  state.found     = 0;
  state.cells     = buildCells(state.site);

  renderSiteMeta();
  renderStratigraphyLabels();
  renderGrid();
  updateProgress();

  console.log(`[Cloddio] Game started — "${state.site.label}" (${state.site.location})`);
  console.log(
    `[Cloddio] ${state.cells.filter(c => c.artefactId).length} finds hidden across ${TOTAL_CELLS} cells`
  );
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

// ─── Rendering ────────────────────────────────────────────────────────────────

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

  // Build ROWS labels: Topsoil, site period(s), Natural — clamped to ROWS
  const periodLabels = site.periods.map(id => getPeriod(id)?.label ?? id);
  const raw = ['Topsoil', ...periodLabels, 'Natural'];

  // Fit to exactly ROWS entries by collapsing extras into the middle
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
  }

  return el;
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
    console.log(
      `[Cloddio] Find! ${artefact.label} · ${artefact.rarity} · ` +
      `${artefact.points} pts · ${getPeriod(artefact.periodId)?.label}`
    );
  } else {
    cell.state = 'excavated';
    console.log(`[Cloddio] Cell ${cellId} (row ${cell.row}, col ${cell.col}) — nothing found.`);
  }

  // Swap the single cell element in place
  const grid  = document.querySelector('.dig-grid');
  const oldEl = grid?.querySelector(`[data-cell-id="${cellId}"]`);
  if (oldEl) oldEl.replaceWith(buildCellEl(cell));

  updateProgress();
}

// ─── Progress bar ─────────────────────────────────────────────────────────────

function updateProgress() {
  const pct = (state.excavated / TOTAL_CELLS) * 100;

  const fill      = document.querySelector('.progress-fill');
  const label     = document.querySelector('.progress-label');
  const findsEl   = document.querySelector('.js-finds-count');

  if (fill)    fill.style.width    = `${pct}%`;
  if (label)   label.textContent   = `${state.excavated} / ${TOTAL_CELLS} cells`;
  if (findsEl) findsEl.textContent = state.found;
}

// ─── Boot ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', initGame);
