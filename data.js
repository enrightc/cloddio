// data.js — Static game data (artefacts, features, contexts, strata)
// Stage 1: placeholder structure only

const STRATA = [
  { id: 'topsoil',  label: 'Topsoil',  depth_cm: [0,  15],  colour: '#4a3c28' },
  { id: 'medieval', label: 'Medieval', depth_cm: [15, 40],  colour: '#3d3220' },
  { id: 'iron-age', label: 'Iron Age', depth_cm: [40, 70],  colour: '#362c1c' },
  { id: 'natural',  label: 'Natural',  depth_cm: [70, 100], colour: '#2e2614' },
];

const ARTEFACT_TYPES = [
  { id: 'pottery-sherd',  label: 'Pottery Sherd',  period: 'Iron Age',       icon: '🫙' },
  { id: 'bone-fragment',  label: 'Bone Fragment',   period: 'Unknown',        icon: '🦴' },
  { id: 'bronze-brooch',  label: 'Bronze Brooch',   period: 'Romano-British', icon: '💍' },
  { id: 'flint-flake',    label: 'Flint Flake',     period: 'Prehistoric',    icon: '🪨' },
  { id: 'coin',           label: 'Roman Coin',      period: 'Romano-British', icon: '🪙' },
  { id: 'glass-bead',     label: 'Glass Bead',      period: 'Iron Age',       icon: '🔵' },
];

const FEATURE_TYPES = [
  { id: 'post-hole',  label: 'Post Hole',  description: 'Circular cut with dark fill.' },
  { id: 'pit',        label: 'Pit',        description: 'Sub-rectangular cut feature.' },
  { id: 'ditch',      label: 'Ditch',      description: 'Linear cut, undated.' },
  { id: 'hearth',     label: 'Hearth',     description: 'Burnt deposit, reddened clay.' },
];
