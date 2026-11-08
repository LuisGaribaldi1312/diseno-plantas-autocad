// CAD Vector Entities and Interactive Engine for AutoCAD Simulator

export interface CadEntity {
  id: string;
  type: 'line' | 'rect' | 'circle' | 'text' | 'dimension' | 'hatch' | 'block';
  layer: string;
  color?: string;
  // Specific geometry properties
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  radius?: number;
  text?: string;
  fontSize?: number;
  blockType?: 'reactor' | 'tank' | 'pump' | 'valve' | 'transmitter' | 'exchanger' | 'title_block';
  blockTag?: string;
  pattern?: string;
}

export interface CadLayer {
  name: string;
  color: string;
  visible: boolean;
  locked: boolean;
  description: string;
}

export const INITIAL_CAD_LAYERS: Record<string, CadLayer> = {
  '0': { name: '0', color: '#ffffff', visible: true, locked: false, description: 'Capa base AutoCAD' },
  '01_MUROS': { name: '01_MUROS', color: '#eab308', visible: true, locked: false, description: 'Estructura y muros de nave industrial' },
  '02_EQUIPOS': { name: '02_EQUIPOS', color: '#06b6d4', visible: true, locked: false, description: 'Equipos de proceso (reactores, bombas, tanques)' },
  '03_TUBERIAS': { name: '03_TUBERIAS', color: '#22c55e', visible: true, locked: false, description: 'Líneas de tuberías de proceso (ASME B31.3)' },
  '04_INSTRUMENTACION': { name: '04_INSTRUMENTACION', color: '#ec4899', visible: true, locked: false, description: 'Lazos y burbujas de control ISA-5.1' },
  '05_COTAS': { name: '05_COTAS', color: '#38bdf8', visible: true, locked: false, description: 'Cotas y acotaciones arquitectónicas' },
  '06_TEXTOS': { name: '06_TEXTOS', color: '#f8fafc', visible: true, locked: false, description: 'Rótulos técnicos y especificaciones' },
  '07_SOMBREADO': { name: '07_SOMBREADO', color: '#a855f7', visible: true, locked: false, description: 'Achurados de áreas de riesgo y almacenaje' },
};

export const SAMPLE_PLANT_PRESET: CadEntity[] = [
  // Cajetín Institucional
  {
    id: 'ent-title-block',
    type: 'block',
    blockType: 'title_block',
    layer: '06_TEXTOS',
    x: 620,
    y: 470,
    width: 250,
    height: 110
  },
  // Nave Industrial Principal
  {
    id: 'ent-nave-ext',
    type: 'rect',
    layer: '01_MUROS',
    color: '#eab308',
    x: 60,
    y: 70,
    width: 520,
    height: 380
  },
  {
    id: 'ent-nave-int',
    type: 'rect',
    layer: '01_MUROS',
    color: '#eab308',
    x: 75,
    y: 85,
    width: 490,
    height: 350
  },
  // Andenes de Carga (Puertas recortadas)
  {
    id: 'ent-anden-1',
    type: 'rect',
    layer: '01_MUROS',
    color: '#94a3b8',
    x: 100,
    y: 435,
    width: 60,
    height: 25
  },
  {
    id: 'ent-anden-2',
    type: 'rect',
    layer: '01_MUROS',
    color: '#94a3b8',
    x: 180,
    y: 435,
    width: 60,
    height: 25
  },
  // Área de almacenamiento achurada
  {
    id: 'ent-hatch-almacen',
    type: 'hatch',
    layer: '07_SOMBREADO',
    color: '#a855f7',
    x: 80,
    y: 90,
    width: 140,
    height: 200,
    pattern: 'ANSI31'
  },
  // Reactores y Equipos Principales
  {
    id: 'ent-reactor-1',
    type: 'block',
    blockType: 'reactor',
    blockTag: 'R-101',
    layer: '02_EQUIPOS',
    color: '#06b6d4',
    x: 320,
    y: 160,
    radius: 36
  },
  {
    id: 'ent-reactor-2',
    type: 'block',
    blockType: 'reactor',
    blockTag: 'R-102',
    layer: '02_EQUIPOS',
    color: '#06b6d4',
    x: 440,
    y: 160,
    radius: 36
  },
  // Tanques de Almacenamiento
  {
    id: 'ent-tank-1',
    type: 'block',
    blockType: 'tank',
    blockTag: 'TK-201',
    layer: '02_EQUIPOS',
    color: '#06b6d4',
    x: 140,
    y: 140,
    radius: 28
  },
  {
    id: 'ent-tank-2',
    type: 'block',
    blockType: 'tank',
    blockTag: 'TK-202',
    layer: '02_EQUIPOS',
    color: '#06b6d4',
    x: 140,
    y: 220,
    radius: 28
  },
  // Bombas Centrífugas
  {
    id: 'ent-pump-1',
    type: 'block',
    blockType: 'pump',
    blockTag: 'P-101A',
    layer: '02_EQUIPOS',
    color: '#06b6d4',
    x: 230,
    y: 160,
    radius: 14
  },
  {
    id: 'ent-pump-2',
    type: 'block',
    blockType: 'pump',
    blockTag: 'P-102A',
    layer: '02_EQUIPOS',
    color: '#06b6d4',
    x: 380,
    y: 160,
    radius: 14
  },
  // Tuberías de Proceso
  {
    id: 'ent-pipe-1',
    type: 'line',
    layer: '03_TUBERIAS',
    color: '#22c55e',
    x1: 170,
    y1: 140,
    x2: 215,
    y2: 160
  },
  {
    id: 'ent-pipe-2',
    type: 'line',
    layer: '03_TUBERIAS',
    color: '#22c55e',
    x1: 245,
    y1: 160,
    x2: 284,
    y2: 160
  },
  {
    id: 'ent-pipe-3',
    type: 'line',
    layer: '03_TUBERIAS',
    color: '#22c55e',
    x1: 356,
    y1: 160,
    x2: 366,
    y2: 160
  },
  {
    id: 'ent-pipe-4',
    type: 'line',
    layer: '03_TUBERIAS',
    color: '#22c55e',
    x1: 394,
    y1: 160,
    x2: 404,
    y2: 160
  },
  // Instrumentación ISA-5.1
  {
    id: 'ent-tt-1',
    type: 'block',
    blockType: 'transmitter',
    blockTag: 'TIC-101',
    layer: '04_INSTRUMENTACION',
    color: '#ec4899',
    x: 320,
    y: 90,
    radius: 16
  },
  {
    id: 'ent-valve-1',
    type: 'block',
    blockType: 'valve',
    blockTag: 'TCV-101',
    layer: '04_INSTRUMENTACION',
    color: '#ec4899',
    x: 320,
    y: 235,
    radius: 12
  },
  // Cotas Principales
  {
    id: 'ent-dim-w',
    type: 'dimension',
    layer: '05_COTAS',
    color: '#38bdf8',
    x1: 60,
    y1: 50,
    x2: 580,
    y2: 50,
    text: '80.00 m (Ancho Nave)'
  },
  {
    id: 'ent-dim-h',
    type: 'dimension',
    layer: '05_COTAS',
    color: '#38bdf8',
    x1: 40,
    y1: 70,
    x2: 40,
    y2: 450,
    text: '50.00 m'
  }
];
