'use client';

import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  CadEntity,
  CadLayer,
  INITIAL_CAD_LAYERS,
  SAMPLE_PLANT_PRESET
} from '@/lib/cadSimulatorEngine';
import { Practice } from '@/lib/types';
import {
  Maximize2,
  Grid,
  Download,
  Trash2,
  HelpCircle,
  Play,
  CheckCircle2,
  Award,
  Info,
  Layers,
  Terminal,
  Crosshair
} from 'lucide-react';

interface AutoCadSimulatorProps {
  practice?: Practice;
  onPracticeComplete?: (score: number, commandsUsed: string[]) => void;
  initialEntities?: CadEntity[];
}

export default function AutoCadSimulator({
  practice,
  onPracticeComplete,
  initialEntities
}: AutoCadSimulatorProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // CAD State
  const [entities, setEntities] = useState<CadEntity[]>(initialEntities || SAMPLE_PLANT_PRESET);
  const [layers, setLayers] = useState<Record<string, CadLayer>>(INITIAL_CAD_LAYERS);
  const [activeLayer, setActiveLayer] = useState<string>('01_MUROS');
  const [commandInput, setCommandInput] = useState<string>('');
  const [commandHistory, setCommandHistory] = useState<string[]>([
    "Autodesk AutoCAD 2026 - Educational Edition [Universidad Aztlán - Clave 1057]",
    "Entorno de dibujo cargado: Tema AutoCAD Rojo / Negro / Blanco.",
    "Sistemas de capas cargado bajo norma ISO 13567. Unidades: Milímetros (Decimal).",
    "Escribe un comando en la consola (LINE, PLINE, RECTANG, BLOCK, TRIM, UNITS, HELP) o usa los botones del Ribbon."
  ]);
  const [mouseCoords, setMouseCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [gridEnabled, setGridEnabled] = useState<boolean>(true);
  const [orthoEnabled, setOrthoEnabled] = useState<boolean>(true);
  const [snapEnabled, setSnapEnabled] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'draw' | 'modify' | 'blocks' | 'layers' | 'annotate'>('draw');

  // Guided Practice State
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [usedCommands, setUsedCommands] = useState<Set<string>>(new Set());
  const [missionComplete, setMissionComplete] = useState<boolean>(false);

  // Auto-scroll command history
  const logEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [commandHistory]);

  // Main Canvas Rendering Loop (AutoCAD High Contrast Black, White & Red)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // 1. Pure Pitch Black CAD Canvas Background (#080808)
    ctx.fillStyle = '#080808';
    ctx.fillRect(0, 0, width, height);

    // 2. Technical Engineering Grid (Fine Gray & Subtle Red lines)
    if (gridEnabled) {
      ctx.lineWidth = 0.5;
      const gridSize = 25;

      for (let x = 0; x <= width; x += gridSize) {
        ctx.strokeStyle = x % (gridSize * 4) === 0 ? '#262626' : '#141414';
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y <= height; y += gridSize) {
        ctx.strokeStyle = y % (gridSize * 4) === 0 ? '#262626' : '#141414';
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    }

    // 3. Origin UCS Axes Icon (AutoCAD Red for X, White for Y)
    ctx.strokeStyle = '#E51020'; // X Axis Red
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(25, height - 25);
    ctx.lineTo(65, height - 25);
    ctx.stroke();

    ctx.strokeStyle = '#FFFFFF'; // Y Axis White
    ctx.beginPath();
    ctx.moveTo(25, height - 25);
    ctx.lineTo(25, height - 65);
    ctx.stroke();

    ctx.fillStyle = '#E51020';
    ctx.font = 'bold 11px monospace';
    ctx.fillText('X', 70, height - 22);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('Y', 22, height - 70);

    // 4. Render CAD Entities with High-Contrast White & AutoCAD Red
    entities.forEach(ent => {
      const layerObj = layers[ent.layer];
      if (layerObj && !layerObj.visible) return;

      const color = ent.color || layerObj?.color || '#FFFFFF';
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 1.8;

      if (ent.type === 'line' && ent.x1 !== undefined && ent.y1 !== undefined && ent.x2 !== undefined && ent.y2 !== undefined) {
        ctx.beginPath();
        ctx.moveTo(ent.x1, ent.y1);
        ctx.lineTo(ent.x2, ent.y2);
        ctx.stroke();
      } else if (ent.type === 'rect' && ent.x !== undefined && ent.y !== undefined && ent.width && ent.height) {
        ctx.beginPath();
        ctx.rect(ent.x, ent.y, ent.width, ent.height);
        ctx.stroke();
      } else if (ent.type === 'circle' && ent.x !== undefined && ent.y !== undefined && ent.radius) {
        ctx.beginPath();
        ctx.arc(ent.x, ent.y, ent.radius, 0, Math.PI * 2);
        ctx.stroke();
      } else if (ent.type === 'hatch' && ent.x !== undefined && ent.y !== undefined && ent.width && ent.height) {
        // Hatch pattern ANSI31 in AutoCAD Red
        ctx.save();
        ctx.beginPath();
        ctx.rect(ent.x, ent.y, ent.width, ent.height);
        ctx.clip();
        ctx.strokeStyle = '#E5102070';
        ctx.lineWidth = 1.2;
        const step = 10;
        for (let i = -ent.height; i < ent.width + ent.height; i += step) {
          ctx.beginPath();
          ctx.moveTo(ent.x + i, ent.y);
          ctx.lineTo(ent.x + i + ent.height, ent.y + ent.height);
          ctx.stroke();
        }
        ctx.restore();
      } else if (ent.type === 'dimension' && ent.x1 !== undefined && ent.y1 !== undefined && ent.x2 !== undefined && ent.y2 !== undefined) {
        // Dimension line
        ctx.strokeStyle = '#9CA3AF';
        ctx.beginPath();
        ctx.moveTo(ent.x1, ent.y1);
        ctx.lineTo(ent.x2, ent.y2);
        ctx.stroke();

        // Dimension text in white
        if (ent.text) {
          ctx.fillStyle = '#FFFFFF';
          ctx.font = '11px sans-serif';
          const midX = (ent.x1 + ent.x2) / 2;
          const midY = (ent.y1 + ent.y2) / 2 - 4;
          ctx.fillText(ent.text, midX - 30, midY);
        }
      } else if (ent.type === 'block') {
        renderCadBlock(ctx, ent);
      }
    });

  }, [entities, layers, gridEnabled]);

  // Render Industrial Block Symbols (Normative ISA-5.1 / AutoCAD Red & White)
  const renderCadBlock = (ctx: CanvasRenderingContext2D, ent: CadEntity) => {
    const x = ent.x || 0;
    const y = ent.y || 0;
    const r = ent.radius || 25;
    const color = ent.color || '#E51020';

    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;

    if (ent.blockType === 'reactor') {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y - r - 8);
      ctx.lineTo(x, y + r * 0.5);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x - 14, y + r * 0.4);
      ctx.lineTo(x + 14, y + r * 0.4);
      ctx.stroke();
      ctx.strokeRect(x - 6, y - r - 16, 12, 8);
      ctx.font = 'bold 11px monospace';
      ctx.fillText(ent.blockTag || 'R-101', x - 18, y + 4);
    } else if (ent.blockType === 'tank') {
      ctx.strokeRect(x - r, y - r, r * 2, r * 2);
      ctx.beginPath();
      ctx.arc(x, y - r, r, Math.PI, 0, false);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x - 8, y);
      ctx.lineTo(x + 8, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - 4, y - 6);
      ctx.lineTo(x + 4, y - 6);
      ctx.closePath();
      ctx.fill();
      ctx.font = 'bold 10px monospace';
      ctx.fillText(ent.blockTag || 'TK-101', x - 20, y + r - 6);
    } else if (ent.blockType === 'pump') {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x, y - r);
      ctx.lineTo(x + r + 6, y - r);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x - r, y + r);
      ctx.lineTo(x + r, y + r);
      ctx.stroke();
      ctx.font = 'bold 10px monospace';
      ctx.fillText(ent.blockTag || 'P-101', x - 16, y + r + 14);
    } else if (ent.blockType === 'valve') {
      ctx.beginPath();
      ctx.moveTo(x - 12, y - 8);
      ctx.lineTo(x, y);
      ctx.lineTo(x - 12, y + 8);
      ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x + 12, y - 8);
      ctx.lineTo(x, y);
      ctx.lineTo(x + 12, y + 8);
      ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y - 14);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x, y - 14, 8, Math.PI, 0);
      ctx.closePath();
      ctx.stroke();

      ctx.font = 'bold 10px monospace';
      ctx.fillText(ent.blockTag || 'FCV-101', x - 22, y + 20);
    } else if (ent.blockType === 'transmitter') {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x - r, y);
      ctx.lineTo(x + r, y);
      ctx.stroke();
      ctx.font = 'bold 9px monospace';
      ctx.fillText(ent.blockTag || 'TIC', x - 10, y - 3);
      ctx.fillText('101', x - 8, y + 10);
    } else if (ent.blockType === 'title_block') {
      // Official AutoCAD / Universidad Aztlán Cajetín
      const w = ent.width || 250;
      const h = ent.height || 110;
      ctx.strokeStyle = '#E51020';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, w, h);
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1;
      ctx.strokeRect(x + 4, y + 4, w - 8, h - 8);

      ctx.beginPath();
      ctx.moveTo(x + 4, y + 36);
      ctx.lineTo(x + w - 4, y + 36);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x + 4, y + 72);
      ctx.lineTo(x + w - 4, y + 72);
      ctx.stroke();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText('UNIVERSIDAD AZTLÁN', x + 12, y + 20);
      ctx.fillStyle = '#E51020';
      ctx.font = 'bold 9px monospace';
      ctx.fillText('ING. INDUSTRIAL - DISEÑO DE PLANTAS', x + 12, y + 31);

      ctx.fillStyle = '#E5E7EB';
      ctx.font = '9px sans-serif';
      ctx.fillText('PLANO: LAYOUT GENERAL & P&ID', x + 12, y + 50);
      ctx.fillText('CLAVE: 1057  |  ESCALA: 1:100', x + 12, y + 64);
      ctx.fillText('ALUMNO: DÉCIMO CUATRIMESTRE', x + 12, y + 86);
      ctx.fillText('DOCENTE: DR. LUIS GARIBALDI', x + 12, y + 100);
    }

    ctx.restore();
  };

  // Mouse move handler
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const rawX = (e.clientX - rect.left) * scaleX;
    const rawY = (e.clientY - rect.top) * scaleY;

    const snapSize = snapEnabled ? 5 : 1;
    const x = Math.round(rawX / snapSize) * snapSize;
    const y = Math.round(rawY / snapSize) * snapSize;

    setMouseCoords({ x, y });
  };

  // Process typed AutoCAD command
  const executeCommand = (cmdText: string) => {
    const raw = cmdText.trim();
    if (!raw) return;

    const parts = raw.split(/\s+/);
    const cmd = parts[0].toUpperCase();

    const newHistory = [...commandHistory, `Command: _${raw}`];
    const newUsed = new Set(usedCommands);
    newUsed.add(cmd);
    setUsedCommands(newUsed);

    let feedback = "";
    let stepSatisfied = false;

    switch (cmd) {
      case 'UNITS':
        feedback = "Drawing Units dialog: Sistema Decimal (mm). Precisión: 0.00. Unidades calibradas.";
        if (practice && practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'UNITS') {
          stepSatisfied = true;
        }
        break;

      case 'LIMITS':
        feedback = "Grid Limits: Lower left corner: (0.00, 0.00), Upper right corner: (100.00, 60.00). Limits ON.";
        if (practice && practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'LIMITS') {
          stepSatisfied = true;
        }
        break;

      case 'ZOOM':
      case 'Z':
        feedback = "Regenerando modelo... Zoom All ejecutado. Vista ajustada al área total.";
        if (practice && practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'ZOOM') {
          stepSatisfied = true;
        }
        break;

      case 'RECTANG':
      case 'REC':
        const newRect: CadEntity = {
          id: `rect-${Date.now()}`,
          type: 'rect',
          layer: activeLayer,
          color: '#FFFFFF',
          x: 200,
          y: 280,
          width: 160,
          height: 100
        };
        setEntities(prev => [...prev, newRect]);
        feedback = "RECTANG: Entidad rectangular creada en la capa " + activeLayer;
        if (practice && practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'RECTANG') {
          stepSatisfied = true;
        }
        break;

      case 'LINE':
      case 'L':
        const newLine: CadEntity = {
          id: `line-${Date.now()}`,
          type: 'line',
          layer: activeLayer,
          color: '#FFFFFF',
          x1: 200,
          y1: 200,
          x2: 350,
          y2: 200
        };
        setEntities(prev => [...prev, newLine]);
        feedback = "LINE: Segmento de línea trazado en capa " + activeLayer;
        if (practice && practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'LINE') {
          stepSatisfied = true;
        }
        break;

      case 'PLINE':
      case 'PL':
        const newPline: CadEntity = {
          id: `pline-${Date.now()}`,
          type: 'rect',
          layer: '01_MUROS',
          color: '#FFFFFF',
          x: 90,
          y: 90,
          width: 480,
          height: 330
        };
        setEntities(prev => [...prev, newPline]);
        feedback = "PLINE: Polilínea perimetral cerrada. Ancho = 0.30 m de muro estructural generado.";
        if (practice && practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'PLINE') {
          stepSatisfied = true;
        }
        break;

      case 'OFFSET':
      case 'O':
        feedback = "OFFSET: Desfase concéntrico creado a 0.30 m de distancia.";
        if (practice && practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'OFFSET') {
          stepSatisfied = true;
        }
        break;

      case 'TRIM':
      case 'TR':
        feedback = "TRIM: Aristas de corte procesadas. Vanos para andenes de carga abiertos limpiamente.";
        if (practice && practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'TRIM') {
          stepSatisfied = true;
        }
        break;

      case 'FILLET':
      case 'F':
        feedback = "FILLET: Radio de curvatura 2.00 m aplicado en esquina de pasillo de montacargas.";
        if (practice && practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'FILLET') {
          stepSatisfied = true;
        }
        break;

      case 'ARRAY':
      case 'ARRAYRECT':
        feedback = "ARRAYRECT: Matriz rectangular asociativa generada (2 filas x 3 columnas).";
        if (practice && (practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'ARRAY' || practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'ARRAYRECT')) {
          stepSatisfied = true;
        }
        break;

      case 'HATCH':
      case 'H':
        const newHatch: CadEntity = {
          id: `hatch-${Date.now()}`,
          type: 'hatch',
          layer: '07_SOMBREADO',
          color: '#E51020',
          x: 230,
          y: 290,
          width: 120,
          height: 80,
          pattern: 'ANSI31'
        };
        setEntities(prev => [...prev, newHatch]);
        feedback = "HATCH: Patrón ANSI31 aplicado en área de almacenamiento de riesgo químico.";
        if (practice && practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'HATCH') {
          stepSatisfied = true;
        }
        break;

      case 'BLOCK':
      case 'B':
        feedback = "BLOCK: Bloque 'REACTOR_R101' definido con punto de inserción central.";
        if (practice && practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'BLOCK') {
          stepSatisfied = true;
        }
        break;

      case 'INSERT':
      case 'I':
        const newBlock: CadEntity = {
          id: `blk-${Date.now()}`,
          type: 'block',
          blockType: 'pump',
          blockTag: 'P-103',
          layer: '02_EQUIPOS',
          color: '#E51020',
          x: 480,
          y: 220,
          radius: 16
        };
        setEntities(prev => [...prev, newBlock]);
        feedback = "INSERT: Bloque de bomba centrífuga P-103 insertado en coordenadas designadas.";
        if (practice && practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'INSERT') {
          stepSatisfied = true;
        }
        break;

      case 'ATTDEF':
        feedback = "ATTDEF: Definición de atributo creada. Tag='EQUIP_TAG', Default='R-101'.";
        if (practice && practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'ATTDEF') {
          stepSatisfied = true;
        }
        break;

      case 'LAYER':
      case 'LA':
        feedback = "LAYER: 8 capas cargadas conforme al estándar ISO 13567. Capa actual: " + activeLayer;
        if (practice && practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'LAYER') {
          stepSatisfied = true;
        }
        break;

      case 'LAYOUT':
        feedback = "LAYOUT: Cambio a Espacio Papel (Layout 1). Formato de impresión ARCH D.";
        if (practice && practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'LAYOUT') {
          stepSatisfied = true;
        }
        break;

      case 'MVIEW':
      case 'MV':
        feedback = "MVIEW: Ventana gráfica flotante creada en la hoja de presentación.";
        if (practice && practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'MVIEW') {
          stepSatisfied = true;
        }
        break;

      case 'DIMSTYLE':
      case 'D':
        feedback = "DIMSTYLE: Estilo de cota 'PLANTA_AZTLAN_1_100' activo.";
        if (practice && practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'DIMSTYLE') {
          stepSatisfied = true;
        }
        break;

      case 'DIM':
      case 'DIMLINEAR':
      case 'DIMCONTINUE':
        feedback = "DIM: Cota lineal normalizada colocada en el plano. Valor: 80.00 m.";
        if (practice && (practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'DIMLINEAR' || practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'DIMCONTINUE' || practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'DIM')) {
          stepSatisfied = true;
        }
        break;

      case 'PLOT':
        feedback = "PLOT: Configuración de trazador 'AutoCAD PDF' lista con monochrome.ctb.";
        if (practice && practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'PLOT') {
          stepSatisfied = true;
        }
        break;

      case 'AREA':
        feedback = "AREA: Área calculada = 4000.0000 m², Perímetro = 260.0000 m.";
        if (practice && practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'AREA') {
          stepSatisfied = true;
        }
        break;

      case 'BCOUNT':
        feedback = "BCOUNT: 2x REACTOR, 2x TANK_STORAGE, 2x CENTRIFUGAL_PUMP, 1x CONTROL_VALVE.";
        if (practice && practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'BCOUNT') {
          stepSatisfied = true;
        }
        break;

      case 'DATAEXTRACTION':
      case 'EATTEXT':
        feedback = "DATAEXTRACTION: 7 componentes extraídos hacia el Catálogo de Conceptos.";
        if (practice && (practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'DATAEXTRACTION' || practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'EATTEXT')) {
          stepSatisfied = true;
        }
        break;

      case 'TABLE':
        feedback = "TABLE: Tabla paramétrica insertada con el resumen cuantitativo de obra.";
        if (practice && practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'TABLE') {
          stepSatisfied = true;
        }
        break;

      case 'HELP':
      case '?':
        feedback = "Comandos: UNITS, LIMITS, ZOOM, LINE, PLINE, RECTANG, OFFSET, TRIM, FILLET, ARRAY, HATCH, BLOCK, INSERT, ATTDEF, LAYER, LAYOUT, MVIEW, DIMSTYLE, DIMLINEAR, PLOT, AREA, BCOUNT, DATAEXTRACTION, TABLE, CLEAR.";
        break;

      case 'CLEAR':
        setEntities([]);
        feedback = "Todas las entidades borradas del espacio modelo.";
        break;

      default:
        feedback = `Comando '${cmd}' ejecutado con éxito en el entorno AutoCAD.`;
        if (practice && practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === cmd) {
          stepSatisfied = true;
        }
        break;
    }

    newHistory.push(feedback);
    setCommandHistory(newHistory);
    setCommandInput('');

    // Check practice step progression
    if (practice && stepSatisfied) {
      const nextIdx = currentStepIdx + 1;
      const newCompleted = [...completedSteps, currentStepIdx];
      setCompletedSteps(newCompleted);

      if (nextIdx >= practice.steps.length) {
        setMissionComplete(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        if (onPracticeComplete) {
          onPracticeComplete(100, Array.from(newUsed));
        }
      } else {
        setCurrentStepIdx(nextIdx);
      }
    }
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(commandInput);
  };

  const triggerQuickTool = (cmd: string) => {
    setCommandInput(cmd);
    executeCommand(cmd);
  };

  const handleExportPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `Plano_AutoCAD_Diseno_Plantas_${Date.now()}.png`;
    a.click();
  };

  return (
    <div className="flex flex-col h-full bg-[#080808] text-white rounded-2xl overflow-hidden border border-[#2E2E2E] shadow-2xl">
      {/* 1. TOP CAD RIBBON & TOOLBAR (AutoCAD Red / Charcoal / White) */}
      <div className="bg-[#121212] border-b border-[#262626] px-4 py-2 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#E51020] animate-pulse"></div>
          <span className="font-mono font-black text-xs tracking-wider text-[#E51020]">
            AUTOCAD 2026 PLANT DESIGN LAB
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded bg-[#1C1C1C] text-neutral-300 border border-[#333333]">
            Universidad Aztlán
          </span>
        </div>

        {/* Ribbon Tabs */}
        <div className="flex items-center bg-[#181818] p-1 rounded-xl border border-[#2A2A2A]">
          <button
            onClick={() => setActiveTab('draw')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
              activeTab === 'draw' ? 'bg-[#E51020] text-white shadow' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Dibujo (Draw)
          </button>
          <button
            onClick={() => setActiveTab('modify')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
              activeTab === 'modify' ? 'bg-[#E51020] text-white shadow' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Modificar (Modify)
          </button>
          <button
            onClick={() => setActiveTab('blocks')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
              activeTab === 'blocks' ? 'bg-[#E51020] text-white shadow' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Bloques P&ID
          </button>
          <button
            onClick={() => setActiveTab('layers')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
              activeTab === 'layers' ? 'bg-[#E51020] text-white shadow' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Capas (ISO 13567)
          </button>
          <button
            onClick={() => setActiveTab('annotate')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
              activeTab === 'annotate' ? 'bg-[#E51020] text-white shadow' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Anotación & Layout
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportPNG}
            title="Exportar plano en PNG"
            className="flex items-center gap-1 text-xs bg-[#1A1A1A] hover:bg-[#262626] text-white px-3 py-1.5 rounded-lg border border-[#333333] transition"
          >
            <Download className="w-3.5 h-3.5 text-[#E51020]" />
            <span>Exportar Plano</span>
          </button>
          <button
            onClick={() => triggerQuickTool('CLEAR')}
            title="Limpiar espacio de trabajo"
            className="flex items-center gap-1 text-xs bg-red-950/60 hover:bg-red-900/80 text-red-200 px-3 py-1.5 rounded-lg border border-red-800 transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Limpiar</span>
          </button>
        </div>
      </div>

      {/* 2. SECONDARY TOOLS BAR */}
      <div className="bg-[#181818] px-4 py-2 border-b border-[#2A2A2A] flex flex-wrap items-center gap-2 text-xs">
        {activeTab === 'draw' && (
          <>
            <span className="text-neutral-400 font-mono text-[11px] mr-1">Trazado Geométrico:</span>
            <button
              onClick={() => triggerQuickTool('LINE')}
              className="bg-[#242424] hover:bg-[#E51020] text-white px-3 py-1 rounded border border-[#3A3A3A] transition"
            >
              Línea (L)
            </button>
            <button
              onClick={() => triggerQuickTool('PLINE')}
              className="bg-[#242424] hover:bg-[#E51020] text-white px-3 py-1 rounded border border-[#3A3A3A] transition"
            >
              Polilínea (PL)
            </button>
            <button
              onClick={() => triggerQuickTool('RECTANG')}
              className="bg-[#242424] hover:bg-[#E51020] text-white px-3 py-1 rounded border border-[#3A3A3A] transition"
            >
              Rectángulo (REC)
            </button>
            <button
              onClick={() => triggerQuickTool('CIRCLE')}
              className="bg-[#242424] hover:bg-[#E51020] text-white px-3 py-1 rounded border border-[#3A3A3A] transition"
            >
              Círculo (C)
            </button>
            <button
              onClick={() => triggerQuickTool('HATCH')}
              className="bg-[#242424] hover:bg-[#E51020] text-white px-3 py-1 rounded border border-[#3A3A3A] transition"
            >
              Sombreado / Hatch (H)
            </button>
            <button
              onClick={() => triggerQuickTool('LIMITS')}
              className="bg-[#242424] hover:bg-[#E51020] text-white px-3 py-1 rounded border border-[#3A3A3A] transition"
            >
              Límites (LIMITS)
            </button>
          </>
        )}

        {activeTab === 'modify' && (
          <>
            <span className="text-neutral-400 font-mono text-[11px] mr-1">Edición y Precisión:</span>
            <button
              onClick={() => triggerQuickTool('OFFSET')}
              className="bg-[#242424] hover:bg-[#E51020] text-white px-3 py-1 rounded border border-[#3A3A3A] transition"
            >
              Desfase (O)
            </button>
            <button
              onClick={() => triggerQuickTool('TRIM')}
              className="bg-[#242424] hover:bg-[#E51020] text-white px-3 py-1 rounded border border-[#3A3A3A] transition"
            >
              Recortar (TR)
            </button>
            <button
              onClick={() => triggerQuickTool('FILLET')}
              className="bg-[#242424] hover:bg-[#E51020] text-white px-3 py-1 rounded border border-[#3A3A3A] transition"
            >
              Empalme (F)
            </button>
            <button
              onClick={() => triggerQuickTool('ARRAYRECT')}
              className="bg-[#242424] hover:bg-[#E51020] text-white px-3 py-1 rounded border border-[#3A3A3A] transition"
            >
              Matriz Rectangular
            </button>
            <button
              onClick={() => triggerQuickTool('MOVE')}
              className="bg-[#242424] hover:bg-[#E51020] text-white px-3 py-1 rounded border border-[#3A3A3A] transition"
            >
              Desplazar (M)
            </button>
          </>
        )}

        {activeTab === 'blocks' && (
          <>
            <span className="text-neutral-400 font-mono text-[11px] mr-1">Simbología ISA-5.1:</span>
            <button
              onClick={() => {
                const b: CadEntity = {
                  id: `blk-${Date.now()}`,
                  type: 'block',
                  blockType: 'reactor',
                  blockTag: 'R-103',
                  layer: '02_EQUIPOS',
                  color: '#E51020',
                  x: 320,
                  y: 280,
                  radius: 36
                };
                setEntities(prev => [...prev, b]);
                executeCommand('INSERT REACTOR');
              }}
              className="bg-[#242424] hover:bg-[#E51020] text-white px-3 py-1 rounded border border-[#3A3A3A] transition"
            >
              + Reactor Químico
            </button>
            <button
              onClick={() => {
                const b: CadEntity = {
                  id: `blk-${Date.now()}`,
                  type: 'block',
                  blockType: 'tank',
                  blockTag: 'TK-203',
                  layer: '02_EQUIPOS',
                  color: '#FFFFFF',
                  x: 140,
                  y: 320,
                  radius: 28
                };
                setEntities(prev => [...prev, b]);
                executeCommand('INSERT TANK');
              }}
              className="bg-[#242424] hover:bg-[#E51020] text-white px-3 py-1 rounded border border-[#3A3A3A] transition"
            >
              + Tanque Almacenamiento
            </button>
            <button
              onClick={() => {
                const b: CadEntity = {
                  id: `blk-${Date.now()}`,
                  type: 'block',
                  blockType: 'pump',
                  blockTag: 'P-103',
                  layer: '02_EQUIPOS',
                  color: '#E51020',
                  x: 230,
                  y: 280,
                  radius: 14
                };
                setEntities(prev => [...prev, b]);
                executeCommand('INSERT PUMP');
              }}
              className="bg-[#242424] hover:bg-[#E51020] text-white px-3 py-1 rounded border border-[#3A3A3A] transition"
            >
              + Bomba Centrífuga
            </button>
            <button
              onClick={() => {
                const b: CadEntity = {
                  id: `blk-${Date.now()}`,
                  type: 'block',
                  blockType: 'valve',
                  blockTag: 'TCV-102',
                  layer: '04_INSTRUMENTACION',
                  color: '#E51020',
                  x: 320,
                  y: 350,
                  radius: 12
                };
                setEntities(prev => [...prev, b]);
                executeCommand('INSERT VALVE');
              }}
              className="bg-[#242424] hover:bg-[#E51020] text-white px-3 py-1 rounded border border-[#3A3A3A] transition"
            >
              + Válvula Control (FCV)
            </button>
            <button
              onClick={() => triggerQuickTool('ATTDEF')}
              className="bg-[#242424] hover:bg-[#E51020] text-white px-3 py-1 rounded border border-[#3A3A3A] transition"
            >
              Definir Atributo (ATTDEF)
            </button>
          </>
        )}

        {activeTab === 'layers' && (
          <div className="flex items-center gap-2">
            <span className="text-neutral-400 font-mono text-[11px]">Capa Activa:</span>
            <select
              value={activeLayer}
              onChange={e => setActiveLayer(e.target.value)}
              className="bg-[#242424] text-white text-xs rounded-lg px-3 py-1 border border-[#3A3A3A] focus:outline-none"
            >
              {Object.values(layers).map(l => (
                <option key={l.name} value={l.name}>
                  {l.name} ({l.description})
                </option>
              ))}
            </select>
            <button
              onClick={() => triggerQuickTool('LAYER')}
              className="bg-[#242424] hover:bg-[#333333] text-white px-3 py-1 rounded-lg border border-[#3A3A3A]"
            >
              Admin Capas
            </button>
          </div>
        )}

        {activeTab === 'annotate' && (
          <>
            <span className="text-neutral-400 font-mono text-[11px] mr-1">Presentación & Acotado:</span>
            <button
              onClick={() => triggerQuickTool('DIMLINEAR')}
              className="bg-[#242424] hover:bg-[#E51020] text-white px-3 py-1 rounded border border-[#3A3A3A] transition"
            >
              Cota Lineal (DLI)
            </button>
            <button
              onClick={() => triggerQuickTool('DIMCONTINUE')}
              className="bg-[#242424] hover:bg-[#E51020] text-white px-3 py-1 rounded border border-[#3A3A3A] transition"
            >
              Cota Continua (DCO)
            </button>
            <button
              onClick={() => triggerQuickTool('LAYOUT')}
              className="bg-[#242424] hover:bg-[#E51020] text-white px-3 py-1 rounded border border-[#3A3A3A] transition"
            >
              Espacio Papel (Layout)
            </button>
            <button
              onClick={() => triggerQuickTool('MVIEW')}
              className="bg-[#242424] hover:bg-[#E51020] text-white px-3 py-1 rounded border border-[#3A3A3A] transition"
            >
              Ventana Gráfica (MVIEW)
            </button>
            <button
              onClick={() => triggerQuickTool('PLOT')}
              className="bg-[#242424] hover:bg-[#E51020] text-white px-3 py-1 rounded border border-[#3A3A3A] transition"
            >
              Trazar a PDF (PLOT)
            </button>
          </>
        )}
      </div>

      {/* 3. MAIN WORKSPACE (Canvas + Guided Mission Sidebar) */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Canvas Workspace in Pitch Black */}
        <div className="flex-1 relative overflow-hidden bg-[#0A0A0A] flex items-center justify-center p-2">
          <canvas
            ref={canvasRef}
            width={1280}
            height={720}
            onMouseMove={handleMouseMove}
            onClick={() => {
              if (commandInput) {
                executeCommand(commandInput);
              }
            }}
            className="w-full h-full border border-[#222222] rounded-xl bg-[#080808] cursor-crosshair shadow-inner"
          />

          {/* Coordinate HUD (Bottom-left) */}
          <div className="absolute bottom-4 left-4 bg-[#141414]/90 text-white font-mono text-[11px] px-3 py-1 rounded-lg border border-[#333333] shadow flex items-center gap-3">
            <span className="text-[#E51020] font-bold">X: {mouseCoords.x.toFixed(2)} mm</span>
            <span className="text-neutral-600">|</span>
            <span className="text-white font-bold">Y: {mouseCoords.y.toFixed(2)} mm</span>
            <span className="text-neutral-600">|</span>
            <span className="text-neutral-400">Z: 0.00</span>
          </div>

          {/* Floating HUD toggle controls */}
          <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-[#141414]/90 p-1.5 rounded-xl border border-[#333333] text-xs">
            <button
              onClick={() => setGridEnabled(!gridEnabled)}
              title="Rejilla GRID (F7)"
              className={`p-1.5 rounded-lg transition ${gridEnabled ? 'bg-[#E51020] text-white' : 'text-neutral-400'}`}
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setOrthoEnabled(!orthoEnabled)}
              title="Modo Ortogonal ORTHO (F8)"
              className={`px-2 py-0.5 rounded-lg font-mono font-bold text-[10px] transition ${
                orthoEnabled ? 'bg-[#E51020] text-white' : 'text-neutral-400'
              }`}
            >
              ORTHO
            </button>
            <button
              onClick={() => triggerQuickTool('ZOOM ALL')}
              title="Ajustar Zoom (Z A)"
              className="p-1.5 rounded-lg text-neutral-300 hover:text-white"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Guided Practice Sidebar */}
        {practice && (
          <div className="w-full lg:w-96 bg-[#111111] border-t lg:border-t-0 lg:border-l border-[#262626] flex flex-col h-auto lg:h-full overflow-y-auto">
            <div className="p-4 border-b border-[#262626] bg-[#161616]">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-red-950 text-[#FF4D5A] border border-red-800">
                  {practice.level.toUpperCase()}
                </span>
                <span className="text-xs text-neutral-400">⏱ {practice.estimatedMinutes} min</span>
              </div>
              <h3 className="font-bold text-sm text-white leading-tight">{practice.title}</h3>
              <p className="text-xs text-neutral-400 mt-1">{practice.subtitle}</p>
            </div>

            <div className="p-3 bg-[#141414] border-b border-[#262626] text-xs space-y-1.5">
              <div className="flex items-start gap-1.5 text-neutral-300">
                <Info className="w-4 h-4 text-[#E51020] shrink-0 mt-0.5" />
                <p><span className="font-semibold text-white">Objetivo:</span> {practice.objective}</p>
              </div>
              <div className="text-[11px] text-[#FF6B76] font-mono">
                📌 Norma: {practice.normativeReference}
              </div>
            </div>

            {/* Steps Checklist */}
            <div className="p-4 flex-1 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-neutral-300 mb-2">
                <span>PASOS DE LA PRÁCTICA</span>
                <span className="text-[#E51020] font-mono">
                  {completedSteps.length} / {practice.steps.length} completados
                </span>
              </div>

              {practice.steps.map((st, idx) => {
                const isCurrent = idx === currentStepIdx && !missionComplete;
                const isDone = completedSteps.includes(idx) || missionComplete;

                return (
                  <div
                    key={st.stepNumber}
                    className={`p-3 rounded-xl border transition ${
                      isCurrent
                        ? 'bg-[#1C1213] border-[#E51020] shadow-md ring-1 ring-[#E51020]/40'
                        : isDone
                        ? 'bg-[#141414] border-emerald-800/60 text-neutral-300'
                        : 'bg-[#121212] border-[#222222] text-neutral-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <div
                            className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                              isCurrent ? 'bg-[#E51020] text-white' : 'bg-[#222222] text-neutral-400'
                            }`}
                          >
                            {st.stepNumber}
                          </div>
                        )}
                        <span className={`text-xs font-semibold ${isCurrent ? 'text-white' : ''}`}>
                          Paso {st.stepNumber}
                        </span>
                      </div>
                      <span className="font-mono text-[11px] bg-[#1C1C1C] px-1.5 py-0.5 rounded text-[#FF6B76]">
                        {st.cadCommand}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                      {st.instruction}
                    </p>

                    {isCurrent && (
                      <div className="mt-2.5 pt-2 border-t border-[#2A2A2A]">
                        <div className="text-[11px] text-amber-300/90 flex items-start gap-1">
                          <HelpCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                          <span>{st.hint}</span>
                        </div>
                        <button
                          onClick={() => triggerQuickTool(st.cadCommand)}
                          className="mt-2 w-full bg-[#E51020] hover:bg-[#C40816] text-white font-bold py-1.5 px-2 rounded-lg text-xs transition flex items-center justify-center gap-1.5 shadow"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>Ejecutar {st.cadCommand}</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Completion Banner */}
              {missionComplete && (
                <div className="p-4 rounded-xl bg-gradient-to-br from-red-950/70 to-neutral-900 border border-[#E51020] text-center space-y-2 mt-4 animate-in fade-in zoom-in duration-300">
                  <Award className="w-10 h-10 text-yellow-400 mx-auto" />
                  <h4 className="font-bold text-sm text-white">¡Práctica de AutoCAD Completada!</h4>
                  <p className="text-xs text-neutral-300">
                    Has completado con éxito la práctica virtual. Tu calificación ha sido registrada al 100%.
                  </p>
                  <div className="pt-2">
                    <span className="inline-block text-xs font-mono bg-emerald-950 text-emerald-300 px-3 py-1 rounded-full border border-emerald-700">
                      ✓ Avance sincronizado con tu cuenta
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 4. AUTOCAD COMMAND LINE CONSOLE & PROMPT (Black & Red) */}
      <div className="bg-[#0A0A0A] border-t border-[#262626] p-2 font-mono">
        {/* Terminal Log */}
        <div className="h-20 overflow-y-auto text-[11px] leading-relaxed text-neutral-300 px-2 space-y-0.5 scrollbar-thin">
          {commandHistory.slice(-6).map((line, i) => (
            <div
              key={i}
              className={
                line.startsWith('Command:')
                  ? 'text-[#E51020] font-bold'
                  : line.includes('dialog') || line.includes('Wizard')
                  ? 'text-emerald-400'
                  : 'text-neutral-400'
              }
            >
              {line}
            </div>
          ))}
          <div ref={logEndRef} />
        </div>

        {/* Command Form */}
        <form onSubmit={handleCommandSubmit} className="mt-1 flex items-center gap-2 bg-[#141414] px-3 py-1.5 rounded-xl border border-[#333333]">
          <span className="text-[#E51020] font-black text-xs">Command:</span>
          <input
            type="text"
            value={commandInput}
            onChange={e => setCommandInput(e.target.value)}
            placeholder="Escribe comando (LINE, RECTANG, BLOCK, UNITS, OFFSET, TRIM, HELP) y presiona Enter..."
            className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none placeholder-neutral-500"
          />
          <button
            type="submit"
            className="bg-[#E51020] hover:bg-[#C40816] text-white text-[11px] font-bold px-3 py-1 rounded-lg font-sans transition"
          >
            Enter
          </button>
        </form>

        {/* Bottom CAD Status Bar */}
        <div className="mt-1 flex items-center justify-between text-[10px] text-neutral-500 px-1 pt-1">
          <div className="flex items-center gap-3">
            <span className={snapEnabled ? 'text-[#E51020] font-bold' : ''}>SNAP [F9]</span>
            <span className={gridEnabled ? 'text-white font-bold' : ''}>GRID [F7]</span>
            <span className={orthoEnabled ? 'text-[#E51020] font-bold' : ''}>ORTHO [F8]</span>
            <span className="text-neutral-400">POLAR</span>
            <span className="text-neutral-400">OSNAP [F3]</span>
            <span className="text-neutral-400">MODEL</span>
          </div>
          <div>
            <span className="text-neutral-400 font-mono">Escala: 1:100</span>
          </div>
        </div>
      </div>
    </div>
  );
}
