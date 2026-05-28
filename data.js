// data.js — Static game data
// Stage 2: full periods, artefacts, and sites data layer

// ─── Periods ──────────────────────────────────────────────────────────────────

const PERIODS = [
  {
    id:          'neolithic',
    label:       'Neolithic',
    dateRange:   'c. 4000–2300 BC',
    colour:      '#6b8c6b',
    description: 'Wales\'s Neolithic communities built megalithic tombs, ' +
                 'cleared forest for farming, and traded polished stone axes ' +
                 'across Britain. Sites such as Bryn Celli Ddu and Pentre Ifan ' +
                 'survive as landmarks of this period.',
  },
  {
    id:          'bronze-age',
    label:       'Bronze Age',
    dateRange:   'c. 2300–800 BC',
    colour:      '#b87333',
    description: 'The adoption of bronze-working transformed Welsh society. ' +
                 'Burial cairns, hoards of metalwork, and the copper mines of ' +
                 'the Great Orme attest to a prosperous and well-connected ' +
                 'Atlantic-facing culture.',
  },
  {
    id:          'iron-age',
    label:       'Iron Age',
    dateRange:   'c. 800–48 BC',
    colour:      '#8c7355',
    description: 'Hundreds of hillforts dot the Welsh landscape, built and ' +
                 'occupied by communities using iron tools and weapons. ' +
                 'Craft production, long-distance trade, and an increasingly ' +
                 'complex social hierarchy are all visible in the archaeological record.',
  },
  {
    id:          'romano-british',
    label:       'Romano-British',
    dateRange:   'AD 48–383',
    colour:      '#c0a060',
    description: 'Rome\'s military occupation of Wales left forts, roads, and ' +
                 'eventually a walled civitas capital at Caerwent. Native ' +
                 'Britons adopted Roman material culture selectively while ' +
                 'maintaining their own traditions.',
  },
  {
    id:          'early-medieval',
    label:       'Early Medieval',
    dateRange:   'AD 383–1100',
    colour:      '#7a6a8c',
    description: 'After Rome\'s withdrawal, Welsh kingdoms emerged under ' +
                 'rulers commemorated on inscribed stones. Christianity spread ' +
                 'rapidly, trade with Gaul and Ireland continued, and sites ' +
                 'such as Dinas Powys reveal elite consumption of imported goods.',
  },
];

// ─── Artefacts ────────────────────────────────────────────────────────────────
// rarity: 'common' | 'uncommon' | 'rare' | 'exceptional'

const ARTEFACTS = [
  // — Neolithic ——————————————————————————————————————————————————————————————
  {
    id:               'polished-stone-axe',
    label:            'Polished Stone Axe',
    periodId:         'neolithic',
    rarity:           'rare',
    points:           50,
    icon:             '🪓',
    description:      'A finely ground igneous axe-head from the Graig Lwyd ' +
                      'quarry at Penmaenmawr. Group VIII axes from this source ' +
                      'were distributed across Britain and Ireland, evidence of ' +
                      'long-distance Neolithic exchange networks.',
    conservationNote: 'Stable. Clean with dry brush only.',
  },
  {
    id:               'leaf-arrowhead',
    label:            'Leaf-shaped Arrowhead',
    periodId:         'neolithic',
    rarity:           'uncommon',
    points:           25,
    icon:             '🏹',
    description:      'A bifacially knapped flint arrowhead with a characteristic ' +
                      'leaf-shaped profile. Diagnostic of the Neolithic period in ' +
                      'Britain; found in hunting and funerary contexts alike.',
    conservationNote: 'Fragile edges. Handle with care.',
  },
  {
    id:               'grooved-ware-sherd',
    label:            'Grooved Ware Sherd',
    periodId:         'neolithic',
    rarity:           'uncommon',
    points:           25,
    icon:             '🫙',
    description:      'A fragment of flat-based, bucket-shaped vessel decorated ' +
                      'with applied cordons and grooved geometric motifs. Grooved ' +
                      'Ware is associated with late Neolithic monument-building ' +
                      'communities across Britain.',
    conservationNote: 'Bag sherds separately. Do not wash.',
  },
  {
    id:               'flint-scraper',
    label:            'Flint Scraper',
    periodId:         'neolithic',
    rarity:           'common',
    points:           10,
    icon:             '🪨',
    description:      'An end-scraper retouched along one edge, probably used for ' +
                      'processing animal hides. Flint scrapers are among the most ' +
                      'frequently recovered Neolithic lithics at Welsh sites.',
    conservationNote: 'Stable. Record findspot accurately.',
  },

  // — Bronze Age ——————————————————————————————————————————————————————————————
  {
    id:               'bronze-palstave',
    label:            'Bronze Palstave',
    periodId:         'bronze-age',
    rarity:           'exceptional',
    points:           100,
    icon:             '🪓',
    description:      'A middle Bronze Age flanged axe-head with stop-ridge. ' +
                      'Palstaves are common in Welsh hoards such as the Guilsfield ' +
                      'hoard (Montgomeryshire) and reflect a flourishing local ' +
                      'bronze industry supplied by Cornish and Irish tin and copper.',
    conservationNote: 'Bronze disease present. Store in stable humidity. Refer to conservator.',
  },
  {
    id:               'faience-bead',
    label:            'Faience Bead',
    periodId:         'bronze-age',
    rarity:           'rare',
    points:           50,
    icon:             '🔵',
    description:      'A small segmented bead of blue-green faience — a ' +
                      'silica-based glazed material. Found in Welsh early Bronze ' +
                      'Age burials, for example at Bedd Branwen (Anglesey), ' +
                      'faience beads indicate long-range contact with Mediterranean ' +
                      'and Atlantic trade routes.',
    conservationNote: 'Extremely fragile. Micro-bag immediately.',
  },
  {
    id:               'food-vessel-sherd',
    label:            'Food Vessel Sherd',
    periodId:         'bronze-age',
    rarity:           'common',
    points:           10,
    icon:             '🏺',
    description:      'A fragment of an early Bronze Age Food Vessel, typically ' +
                      'bipartite or tripartite in form with comb or twisted-cord ' +
                      'decoration. Associated primarily with inhumation burials ' +
                      'in the early second millennium BC.',
    conservationNote: 'Bag sherds separately. Do not wash.',
  },
  {
    id:               'bronze-spearhead',
    label:            'Bronze Spearhead',
    periodId:         'bronze-age',
    rarity:           'rare',
    points:           50,
    icon:             '⚔️',
    description:      'A cast bronze spearhead with a central mid-rib and ' +
                      'integral peg-holes for securing a wooden shaft. Spearheads ' +
                      'were frequently deposited in rivers and bogs as votive ' +
                      'offerings in late Bronze Age Wales.',
    conservationNote: 'Active corrosion. Photograph in situ; lift in block if possible.',
  },

  // — Iron Age ——————————————————————————————————————————————————————————————
  {
    id:               'la-tene-brooch',
    label:            'La Tène Brooch',
    periodId:         'iron-age',
    rarity:           'rare',
    points:           50,
    icon:             '💍',
    description:      'An iron or copper-alloy fibula of La Tène type, used to ' +
                      'fasten clothing. The characteristic curved bow and foot ' +
                      'with a coiled spring reflect the pan-European Celtic ' +
                      'artistic tradition well represented at Welsh hillforts ' +
                      'such as Moel Hiraddug and Llanmelin.',
    conservationNote: 'Record orientation in situ. Clean with soft brush under magnification.',
  },
  {
    id:               'rotary-quern-fragment',
    label:            'Rotary Quern Fragment',
    periodId:         'iron-age',
    rarity:           'common',
    points:           10,
    icon:             '⭕',
    description:      'A sandstone or igneous rock fragment from a rotary quern, ' +
                      'introduced to Britain during the Iron Age and used for ' +
                      'grinding grain. Evidence of everyday food-processing, ' +
                      'common on all Welsh Iron Age settlement sites.',
    conservationNote: 'Stable. Heavy — handle with care.',
  },
  {
    id:               'sling-shot',
    label:            'Sling Shot',
    periodId:         'iron-age',
    rarity:           'common',
    points:           10,
    icon:             '🪨',
    description:      'A baked clay or shaped stone projectile used with a leather ' +
                      'sling. Large caches of sling shots are a hallmark of Welsh ' +
                      'and Marcher hillforts; Maiden Castle and Danebury parallels ' +
                      'suggest organised hillfort defence.',
    conservationNote: 'Stable. Record if found in concentration — may indicate a dump.',
  },
  {
    id:               'terret-ring',
    label:            'Terret Ring',
    periodId:         'iron-age',
    rarity:           'rare',
    points:           50,
    icon:             '🔗',
    description:      'A copper-alloy ring through which chariot reins were threaded, ' +
                      'often decorated with enamel or incised geometric ornament. ' +
                      'Terret rings signal high-status warrior identity; examples ' +
                      'from sites like Llyn Cerrig Bach (Anglesey) are among the ' +
                      'finest examples of La Tène metalwork in Britain.',
    conservationNote: 'Record enamel colour immediately — may fade. Micro-bag.',
  },

  // — Romano-British ——————————————————————————————————————————————————————————
  {
    id:               'samian-ware-sherd',
    label:            'Samian Ware Sherd',
    periodId:         'romano-british',
    rarity:           'common',
    points:           10,
    icon:             '🏺',
    description:      'A fragment of imported terra sigillata (Samian ware) with ' +
                      'its characteristic coral-red slip. Produced in Gaul at ' +
                      'centres such as La Graufesenque and Lezoux, Samian ware ' +
                      'is the most frequently recovered Roman fine pottery on ' +
                      'military and civilian sites throughout Wales.',
    conservationNote: 'Stable. Check for potter\'s stamps on the base.',
  },
  {
    id:               'denarius',
    label:            'Denarius',
    periodId:         'romano-british',
    rarity:           'uncommon',
    points:           25,
    icon:             '🪙',
    description:      'A silver Roman denarius. Individual coin finds are common ' +
                      'across Roman Wales; the issuing emperor and reverse type ' +
                      'provide a useful terminus post quem for the associated ' +
                      'stratigraphy. Coins from Caerwent frequently span the ' +
                      'late first to fourth centuries AD.',
    conservationNote: 'Do not clean. Bag individually with label. Report to Finds Liaison Officer.',
  },
  {
    id:               'hypocaust-tile',
    label:            'Hypocaust Tile Fragment',
    periodId:         'romano-british',
    rarity:           'uncommon',
    points:           25,
    icon:             '🧱',
    description:      'A fragment of box-flue tile (tubulus) from a hypocaust ' +
                      'heating system. The combed keying pattern on the surface ' +
                      'held mortar against the wall. Hypocaust tiles are diagnostic ' +
                      'of bathhouses or heated reception rooms; well attested at ' +
                      'Caerwent and Segontium (Caernarfon).',
    conservationNote: 'Stable. Note keying pattern type in record.',
  },
  {
    id:               'amphora-sherd',
    label:            'Dressel 20 Amphora Sherd',
    periodId:         'romano-british',
    rarity:           'common',
    points:           10,
    icon:             '🏺',
    description:      'A thick-walled sherd from a Dressel 20 amphora, the ' +
                      'globular vessel used to transport olive oil from the Baetica ' +
                      'region of southern Spain. These are among the most widely ' +
                      'distributed Roman amphora types in Britain; many bear ' +
                      'tituli picti giving producer names and contents.',
    conservationNote: 'Stable. Note fabric colour and wall thickness.',
  },

  // — Early Medieval ——————————————————————————————————————————————————————————
  {
    id:               'penannular-brooch',
    label:            'Penannular Brooch',
    periodId:         'early-medieval',
    rarity:           'rare',
    points:           50,
    icon:             '💍',
    description:      'A copper-alloy penannular brooch of Hiberno-Saxon type, ' +
                      'with zoomorphic or geometric decoration on the terminals. ' +
                      'Such brooches circulated widely across the Irish Sea zone ' +
                      'and are found at high-status Welsh sites, reflecting the ' +
                      'cultural connections of early medieval Welsh kingdoms.',
    conservationNote: 'Record pin position in situ. Micro-bag. Refer to specialist.',
  },
  {
    id:               'e-ware-sherd',
    label:            'E Ware Sherd',
    periodId:         'early-medieval',
    rarity:           'rare',
    points:           50,
    icon:             '🫙',
    description:      'A sherd of E Ware, a handmade pottery imported from western ' +
                      'France (probably Bordeaux region) in the fifth to seventh ' +
                      'centuries AD. Found almost exclusively at elite sites in ' +
                      'western Britain and Ireland, E Ware at Dinas Powys was ' +
                      'identified by Leslie Alcock as evidence of direct Atlantic ' +
                      'trade with post-Roman Gaul.',
    conservationNote: 'Bag separately. Distinctive coarse fabric — note inclusions.',
  },
  {
    id:               'bone-comb',
    label:            'Bone Comb',
    periodId:         'early-medieval',
    rarity:           'uncommon',
    points:           25,
    icon:             '🦴',
    description:      'A composite single-sided comb made from worked animal bone, ' +
                      'with fine teeth cut using a saw. Bone combs are recovered ' +
                      'from many early medieval Welsh sites and may indicate ' +
                      'textile production as well as personal grooming.',
    conservationNote: 'Waterlogged bone — keep wet until conservation. Do not allow to dry.',
  },
  {
    id:               'inscribed-stone-fragment',
    label:            'Inscribed Stone Fragment',
    periodId:         'early-medieval',
    rarity:           'exceptional',
    points:           100,
    icon:             '📜',
    description:      'A fragment of dressed stone bearing incised Latin lettering ' +
                      'or Ogham script. Inscribed memorial stones are numerous in ' +
                      'early medieval Wales — over 400 are recorded — and provide ' +
                      'rare named individuals from the fifth to ninth centuries AD, ' +
                      'often commemorating rulers or ecclesiastical figures.',
    conservationNote: 'Do not move without specialist advice. Record lettering with raking light.',
  },
];

// ─── Sites ────────────────────────────────────────────────────────────────────

const SITES = [
  {
    id:          'caerwent',
    label:       'Caerwent',
    subtitle:    'Venta Silurum',
    location:    'Monmouthshire',
    periods:     ['romano-british'],
    difficulty:  'medium',
    description: 'The only fully excavated Roman civitas capital in Wales. ' +
                 'Caerwent was the administrative centre of the Silures tribe ' +
                 'after their conquest and retains some of the finest standing ' +
                 'Roman town walls in Britain. Rich in Samian ware, coins, ' +
                 'mosaics, and structural remains.',
  },
  {
    id:          'bryn-celli-ddu',
    label:       'Bryn Celli Ddu',
    subtitle:    'Neolithic Passage Tomb',
    location:    'Anglesey',
    periods:     ['neolithic', 'bronze-age'],
    difficulty:  'easy',
    description: 'One of the finest Neolithic passage tombs in Wales, Bryn Celli ' +
                 'Ddu was constructed over an earlier henge monument. The ' +
                 'surrounding field system contains residual lithic scatters ' +
                 'and early Bronze Age material, making the environs of the ' +
                 'monument a productive research excavation area.',
  },
  {
    id:          'dinas-powys',
    label:       'Dinas Powys',
    subtitle:    'Early Medieval Promontory Fort',
    location:    'Vale of Glamorgan',
    periods:     ['iron-age', 'early-medieval'],
    difficulty:  'hard',
    description: 'A promontory fort reoccupied as an elite residential site in ' +
                 'the fifth to sixth centuries AD. Leslie Alcock\'s excavations ' +
                 'recovered imported E Ware, glass vessels, metalworking debris, ' +
                 'and animal bones indicating high-status feasting, making it ' +
                 'a key reference site for early medieval Wales.',
  },
  {
    id:          'castell-henllys',
    label:       'Castell Henllys',
    subtitle:    'Iron Age Hillfort',
    location:    'Pembrokeshire',
    periods:     ['iron-age'],
    difficulty:  'easy',
    description: 'A well-preserved Iron Age defended enclosure with multiple ' +
                 'phases of rampart construction. Excavations have revealed ' +
                 'roundhouse floors, storage pits, and a rich assemblage of ' +
                 'metalwork and pottery. The site is also notable for its ' +
                 'experimental reconstruction of Iron Age buildings.',
  },
  {
    id:          'llangorse-crannog',
    label:       'Llangorse Crannog',
    subtitle:    'Royal Lake Dwelling',
    location:    'Powys (Brecon Beacons)',
    periods:     ['early-medieval'],
    difficulty:  'hard',
    description: 'The only known crannog (artificial island dwelling) in Wales ' +
                 'or England, dendrochronologically dated to around AD 889–893. ' +
                 'Identified as a residence of the kings of Brycheiniog, the ' +
                 'site yielded rare organic material including textiles, leather, ' +
                 'and a unique dug-out canoe, as well as evidence of metalworking ' +
                 'and feasting.',
  },
];

// ─── Helper functions ─────────────────────────────────────────────────────────

function getArtefact(id) {
  return ARTEFACTS.find(a => a.id === id) ?? null;
}

function getPeriod(id) {
  return PERIODS.find(p => p.id === id) ?? null;
}

// ─── Load verification ────────────────────────────────────────────────────────

console.log(
  `[Cloddio] Data loaded — ` +
  `${PERIODS.length} periods, ${ARTEFACTS.length} artefacts, ${SITES.length} sites`
);
console.assert(ARTEFACTS.length === 20, 'Expected 20 artefacts');
console.assert(getPeriod('iron-age')?.label  === 'Iron Age',   'getPeriod failed');
console.assert(getArtefact('denarius')?.label === 'Denarius',  'getArtefact failed');
