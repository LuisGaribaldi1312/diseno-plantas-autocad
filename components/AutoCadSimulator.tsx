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
  Minimize2,
  Grid,
  Download,
  Trash2,
  Layers,
  HelpCircle,
  Play,
  CheckCircle2,
  ChevronRight,
  Flame,
  Award,
  Undo2,
  RotateCcw,
  Sparkles,
  Info
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
    "Inicializando entorno de dibujo para Diseño de Plantas Industriales...",
    "Sistemas de capas cargado bajo norma ISO 13567. Unidades: Milímetros (Decimal).",
    "Escribe un comando en la consola inferior (ej. LINE, RECTANG, BLOCK, TRIM, UNITS, HELP) o selecciona una herramienta."
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

  // Main Canvas Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvas size
    const width = canvas.width;
    const height = canvas.height;

    // 1. Dark CAD Background (#161b22)
    ctx.fillStyle = '#111822';
    ctx.fillRect(0, 0, width, height);

    // 2. Draw Grid (if enabled)
    if (gridEnabled) {
      ctx.lineWidth = 0.5;
      const gridSize = 25;

      for (let x = 0; x <= width; x += gridSize) {
        ctx.strokeStyle = x % (gridSize * 4) === 0 ? '#1e293b' : '#17202e';
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y <= height; y += gridSize) {
        ctx.strokeStyle = y % (gridSize * 4) === 0 ? '#1e293b' : '#17202e';
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    }

    // 3. Draw Origin Axes (UCS Icon in lower left corner)
    ctx.strokeStyle = '#ef4444'; // X Axis Red
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(25, height - 25);
    ctx.lineTo(65, height - 25);
    ctx.stroke();

    ctx.strokeStyle = '#22c55e'; // Y Axis Green
    ctx.beginPath();
    ctx.moveTo(25, height - 25);
    ctx.lineTo(25, height - 65);
    ctx.stroke();

    ctx.fillStyle = '#ef4444';
    ctx.font = '10px monospace';
    ctx.fillText('X', 70, height - 22);
    ctx.fillStyle = '#22c55e';
    ctx.fillText('Y', 22, height - 70);

    // 4. Render All CAD Entities
    entities.forEach(ent => {
      const layerObj = layers[ent.layer];
      if (layerObj && !layerObj.visible) return; // Layer turned off

      const color = ent.color || layerObj?.color || '#ffffff';
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
        // Hatch pattern ANSI31 (diagonal lines)
        ctx.save();
        ctx.beginPath();
        ctx.rect(ent.x, ent.y, ent.width, ent.height);
        ctx.clip();
        ctx.strokeStyle = `${color}40`; // Transparent
        ctx.lineWidth = 1;
        const step = 12;
        for (let i = -ent.height; i < ent.width + ent.height; i += step) {
          ctx.beginPath();
          ctx.moveTo(ent.x + i, ent.y);
          ctx.lineTo(ent.x + i + ent.height, ent.y + ent.height);
          ctx.stroke();
        }
        ctx.restore();
      } else if (ent.type === 'dimension' && ent.x1 !== undefined && ent.y1 !== undefined && ent.x2 !== undefined && ent.y2 !== undefined) {
        // Dimension line with witness lines and arrows
        ctx.beginPath();
        ctx.moveTo(ent.x1, ent.y1);
        ctx.lineTo(ent.x2, ent.y2);
        ctx.stroke();

        // Dimension text
        if (ent.text) {
          ctx.fillStyle = '#38bdf8';
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

  // Render Industrial Block Symbols (Normative ISA-5.1 / P&ID / Equipment)
  const renderCadBlock = (ctx: CanvasRenderingContext2D, ent: CadEntity) => {
    const x = ent.x || 0;
    const y = ent.y || 0;
    const r = ent.radius || 25;
    const color = ent.color || '#06b6d4';

    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;

    if (ent.blockType === 'reactor') {
      // Reactor vessel with dish heads and agitator
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.stroke();
      // Agitator shaft
      ctx.beginPath();
      ctx.moveTo(x, y - r - 8);
      ctx.lineTo(x, y + r * 0.5);
      ctx.stroke();
      // Agitator impeller blades
      ctx.beginPath();
      ctx.moveTo(x - 14, y + r * 0.4);
      ctx.lineTo(x + 14, y + r * 0.4);
      ctx.stroke();
      // Motor on top
      ctx.strokeRect(x - 6, y - r - 16, 12, 8);
      // TAG
      ctx.font = 'bold 11px monospace';
      ctx.fillText(ent.blockTag || 'R-101', x - 18, y + 4);
    } else if (ent.blockType === 'tank') {
      // Storage tank with flat bottom and dished roof
      ctx.strokeRect(x - r, y - r, r * 2, r * 2);
      ctx.beginPath();
      ctx.arc(x, y - r, r, Math.PI, 0, false);
      ctx.stroke();
      // Liquid level triangle symbol
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
      // TAG
      ctx.font = 'bold 10px monospace';
      ctx.fillText(ent.blockTag || 'TK-101', x - 20, y + r - 6);
    } else if (ent.blockType === 'pump') {
      // Centrifugal pump with tangential discharge
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.stroke();
      // Impeller eye
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
      // Tangential discharge line
      ctx.beginPath();
      ctx.moveTo(x, y - r);
      ctx.lineTo(x + r + 6, y - r);
      ctx.stroke();
      // Motor/Base triangle
      ctx.beginPath();
      ctx.moveTo(x - r, y + r);
      ctx.lineTo(x + r, y + r);
      ctx.stroke();
      // TAG
      ctx.font = 'bold 10px monospace';
      ctx.fillText(ent.blockTag || 'P-101', x - 16, y + r + 14);
    } else if (ent.blockType === 'valve') {
      // Two opposing triangles with stem & pneumatic actuator (ISA-5.1)
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

      // Stem & Diaphragm Actuator
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y - 14);
      ctx.stroke();
      // Half-circle actuator
      ctx.beginPath();
      ctx.arc(x, y - 14, 8, Math.PI, 0);
      ctx.closePath();
      ctx.stroke();

      // TAG
      ctx.font = 'bold 10px monospace';
      ctx.fillText(ent.blockTag || 'FCV-101', x - 22, y + 20);
    } else if (ent.blockType === 'transmitter') {
      // ISA-5.1 Instrument Bubble (circle with dividing line)
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.stroke();
      // Panel mounted dividing line
      ctx.beginPath();
      ctx.moveTo(x - r, y);
      ctx.lineTo(x + r, y);
      ctx.stroke();
      // TAG (ex: TIC / 101)
      ctx.font = 'bold 9px monospace';
      ctx.fillText(ent.blockTag || 'TIC', x - 10, y - 3);
      ctx.fillText('101', x - 8, y + 10);
    } else if (ent.blockType === 'title_block') {
      // Institutional Cajetín Universidad Aztlán
      const w = ent.width || 250;
      const h = ent.height || 110;
      ctx.strokeStyle = '#e2e8f0';
      ctx.strokeRect(x, y, w, h);
      ctx.strokeRect(x + 4, y + 4, w - 8, h - 8);

      // Internal dividing lines
      ctx.beginPath();
      ctx.moveTo(x + 4, y + 36);
      ctx.lineTo(x + w - 4, y + 36);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x + 4, y + 72);
      ctx.lineTo(x + w - 4, y + 72);
      ctx.stroke();

      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText('UNIVERSIDAD AZTLÁN', x + 12, y + 20);
      ctx.fillStyle = '#06b6d4';
      ctx.font = '9px monospace';
      ctx.fillText('ING. INDUSTRIAL - DISEÑO DE PLANTAS', x + 12, y + 31);

      ctx.fillStyle = '#e2e8f0';
      ctx.font = '9px sans-serif';
      ctx.fillText('PLANO: LAYOUT GENERAL & P&ID', x + 12, y + 50);
      ctx.fillText('CLAVE: 1057  |  ESCALA: 1:100', x + 12, y + 64);
      ctx.fillText('ALUMNO: DÉCIMO CUATRIMESTRE', x + 12, y + 86);
      ctx.fillText('DOCENTE: DR. LUIS GARIBALDI', x + 12, y + 100);
    }

    ctx.restore();
  };

  // Mouse move handler for coordinates and crosshair
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const rawX = e.clientX - rect.left;
    const rawY = e.clientY - rect.top;

    // Optional snap to grid
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
    const args = parts.slice(1);

    const newHistory = [...commandHistory, `Command: _${raw}`];
    const newUsed = new Set(usedCommands);
    newUsed.add(cmd);
    setUsedCommands(newUsed);

    let feedback = "";
    let stepSatisfied = false;

    switch (cmd) {
      case 'UNITS':
        feedback = "Drawing Units dialog: Metric system (mm). Precision: 0.00. Angle: Decimal Degrees.";
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
        feedback = "Regenerating model... Zoom All executed. Window extents fitted to display.";
        if (practice && practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'ZOOM') {
          stepSatisfied = true;
        }
        break;

      case 'RECTANG':
      case 'REC':
        // Draw a new rectangle on active layer
        const newRect: CadEntity = {
          id: `rect-${Date.now()}`,
          type: 'rect',
          layer: activeLayer,
          x: 200,
          y: 280,
          width: 160,
          height: 100
        };
        setEntities(prev => [...prev, newRect]);
        feedback = "Specify first corner point or [Chamfer/Elevation/Fillet/Thickness/Width]: Rectangle entity created.";
        if (practice && practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'RECTANG') {
          stepSatisfied = true;
        }
        break;

      case 'LINE':
      case 'L':
        // Add a line entity
        const newLine: CadEntity = {
          id: `line-${Date.now()}`,
          type: 'line',
          layer: activeLayer,
          x1: 200,
          y1: 200,
          x2: 350,
          y2: 200
        };
        setEntities(prev => [...prev, newLine]);
        feedback = "Specify first point: Specify next point: Line entity drawn on layer " + activeLayer;
        if (practice && practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'LINE') {
          stepSatisfied = true;
        }
        break;

      case 'PLINE':
      case 'PL':
        // Add polyline outline
        const newPline: CadEntity = {
          id: `pline-${Date.now()}`,
          type: 'rect',
          layer: '01_MUROS',
          color: '#eab308',
          x: 90,
          y: 90,
          width: 480,
          height: 330
        };
        setEntities(prev => [...prev, newPline]);
        feedback = "PLINE: Polyline boundary closed. Width = 0.25m perimetric structural wall generated.";
        if (practice && practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'PLINE') {
          stepSatisfied = true;
        }
        break;

      case 'OFFSET':
      case 'O':
        feedback = "Specify offset distance <0.30>: Select object to offset: Concentric wall offset created at 0.30m.";
        if (practice && practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'OFFSET') {
          stepSatisfied = true;
        }
        break;

      case 'TRIM':
      case 'TR':
        feedback = "Current settings: Projection=UCS, Edge=Extend. Select cutting edges... Opening for loading docks trimmed.";
        if (practice && practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'TRIM') {
          stepSatisfied = true;
        }
        break;

      case 'FILLET':
      case 'F':
        feedback = "Current settings: Mode = TRIM, Radius = 2.0000. Corner fillet applied for forklift clearance.";
        if (practice && practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'FILLET') {
          stepSatisfied = true;
        }
        break;

      case 'ARRAY':
      case 'ARRAYRECT':
        feedback = "Select objects: Associative Array created. 2 rows x 3 columns. Spacing: 5.0m. Total 6 workstations.";
        if (practice && (practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'ARRAY' || practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'ARRAYRECT')) {
          stepSatisfied = true;
        }
        break;

      case 'HATCH':
      case 'H':
        // Add hatch entity
        const newHatch: CadEntity = {
          id: `hatch-${Date.now()}`,
          type: 'hatch',
          layer: '07_SOMBREADO',
          color: '#a855f7',
          x: 230,
          y: 290,
          width: 120,
          height: 80,
          pattern: 'ANSI31'
        };
        setEntities(prev => [...prev, newHatch]);
        feedback = "Pick internal point: Analyzing boundaries... Hatch pattern ANSI31 applied (Safety hazard zoning).";
        if (practice && practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'HATCH') {
          stepSatisfied = true;
        }
        break;

      case 'BLOCK':
      case 'B':
        feedback = "Block definition dialog: Block 'REACTOR_R101' created with insertion point at (0,0). Attributes attached.";
        if (practice && practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'BLOCK') {
          stepSatisfied = true;
        }
        break;

      case 'INSERT':
      case 'I':
        // Insert a new pump or equipment block
        const newBlock: CadEntity = {
          id: `blk-${Date.now()}`,
          type: 'block',
          blockType: 'pump',
          blockTag: 'P-103',
          layer: '02_EQUIPOS',
          x: 480,
          y: 220,
          radius: 16
        };
        setEntities(prev => [...prev, newBlock]);
        feedback = "Specify insertion point for block PUMP_ISO: Block inserted at (480, 220). Tag: P-103.";
        if (practice && practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'INSERT') {
          stepSatisfied = true;
        }
        break;

      case 'ATTDEF':
        feedback = "Attribute Definition: Tag = EQUIP_TAG, Prompt = 'Ingrese el TAG del equipo:', Default = 'R-101'.";
        if (practice && practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'ATTDEF') {
          stepSatisfied = true;
        }
        break;

      case 'LAYER':
      case 'LA':
        feedback = "Layer Properties Manager: 8 layers loaded according to ISO 13567. Current layer: " + activeLayer;
        if (practice && practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'LAYER') {
          stepSatisfied = true;
        }
        break;

      case 'LAYOUT':
        feedback = "Switching to Paper Space (Layout 1). Drawing format: ARCH D (24x36\"). Scale 1:1 on sheet.";
        if (practice && practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'LAYOUT') {
          stepSatisfied = true;
        }
        break;

      case 'MVIEW':
      case 'MV':
        feedback = "Specify corner of viewport: Floating Model Space Viewport created. Ready for scale adjustment.";
        if (practice && practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'MVIEW') {
          stepSatisfied = true;
        }
        break;

      case 'DIMSTYLE':
      case 'D':
        feedback = "Dimension Style Manager: Active style 'PLANTA_AZTLAN_1_100'. Arrow size: 2.5mm, Text height: 3.0mm.";
        if (practice && practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'DIMSTYLE') {
          stepSatisfied = true;
        }
        break;

      case 'DIM':
      case 'DIMLINEAR':
      case 'DIMCONTINUE':
        feedback = "Specify first extension line origin: Linear continuous dimension attached. Value: 80.00m.";
        if (practice && (practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'DIMLINEAR' || practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'DIMCONTINUE' || practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'DIM')) {
          stepSatisfied = true;
        }
        break;

      case 'PLOT':
        feedback = "Plot dialog: Printer = 'AutoCAD PDF (General Documentation)'. Quality: 600 DPI monochrome.ctb. Ready to publish.";
        if (practice && practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'PLOT') {
          stepSatisfied = true;
        }
        break;

      case 'AREA':
        feedback = "Area = 4000.0000 m² (4.0000 ha), Perimeter = 260.0000 m. Net industrial floor space calculated.";
        if (practice && practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'AREA') {
          stepSatisfied = true;
        }
        break;

      case 'BCOUNT':
        feedback = "Block Count Summary: 2x REACTOR, 2x TANK_STORAGE, 2x CENTRIFUGAL_PUMP, 1x CONTROL_VALVE, 1x TITLE_BLOCK.";
        if (practice && practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'BCOUNT') {
          stepSatisfied = true;
        }
        break;

      case 'DATAEXTRACTION':
      case 'EATTEXT':
        feedback = "Data Extraction Wizard: 7 equipment objects processed. 14 attributes mapped to Bill of Materials (BOM).";
        if (practice && (practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'DATAEXTRACTION' || practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'EATTEXT')) {
          stepSatisfied = true;
        }
        break;

      case 'TABLE':
        feedback = "Table entity inserted: 6 columns x 8 rows linked with process equipment count and unit costs.";
        if (practice && practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'TABLE') {
          stepSatisfied = true;
        }
        break;

      case 'XREF':
      case 'XR':
        feedback = "External References Manager: Attached 'TOPOGRAFIA_TERRENO_AZTLAN.dwg' as Overlay at (0,0).";
        if (practice && practice.steps[currentStepIdx]?.cadCommand.toUpperCase() === 'XREF') {
          stepSatisfied = true;
        }
        break;

      case 'HELP':
      case '?':
        feedback = "Comandos disponibles: UNITS, LIMITS, ZOOM, LINE, PLINE, RECTANG, OFFSET, TRIM, FILLET, ARRAY, HATCH, BLOCK, INSERT, ATTDEF, LAYER, LAYOUT, MVIEW, DIMSTYLE, DIMLINEAR, PLOT, AREA, BCOUNT, DATAEXTRACTION, TABLE, CLEAR.";
        break;

      case 'CLEAR':
        setEntities([]);
        feedback = "All entities erased from model space.";
        break;

      default:
        feedback = `Comando '${cmd}' reconocido en el entorno CAD de Diseño de Plantas. Parámetros aceptados.`;
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

  // Quick Action Buttons
  const triggerQuickTool = (cmd: string) => {
    setCommandInput(cmd);
    executeCommand(cmd);
  };

  // Export CAD Canvas as Image
  const handleExportPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `Plano_Diseno_Plantas_AutoCAD_${Date.now()}.png`;
    a.click();
  };

  return (
    <div className="flex flex-col h-full bg-[#0d1117] text-slate-100 rounded-xl overflow-hidden border border-slate-700 shadow-2xl">
      {/* 1. TOP CAD RIBBON & TOOLBAR */}
      <div className="bg-[#161f2c] border-b border-slate-700 px-4 py-2 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
          <span className="font-mono font-bold text-xs tracking-wider text-cyan-400">
            AUTOCAD 2026 PLANT VIRTUAL LAB
          </span>
          <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
            Universidad Aztlán
          </span>
        </div>

        {/* Ribbon Tabs */}
        <div className="flex items-center bg-slate-800/80 p-0.5 rounded-lg border border-slate-700">
          <button
            onClick={() => setActiveTab('draw')}
            className={`px-3 py-1 rounded text-xs font-semibold transition ${
              activeTab === 'draw' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Dibujo (Draw)
          </button>
          <button
            onClick={() => setActiveTab('modify')}
            className={`px-3 py-1 rounded text-xs font-semibold transition ${
              activeTab === 'modify' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Edición (Modify)
          </button>
          <button
            onClick={() => setActiveTab('blocks')}
            className={`px-3 py-1 rounded text-xs font-semibold transition ${
              activeTab === 'blocks' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Bloques P&ID
          </button>
          <button
            onClick={() => setActiveTab('layers')}
            className={`px-3 py-1 rounded text-xs font-semibold transition ${
              activeTab === 'layers' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Capas (ISO 13567)
          </button>
          <button
            onClick={() => setActiveTab('annotate')}
            className={`px-3 py-1 rounded text-xs font-semibold transition ${
              activeTab === 'annotate' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Anotación & Layout
          </button>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportPNG}
            title="Descargar plano en PNG"
            className="flex items-center gap-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1.5 rounded border border-slate-700 transition"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Exportar Plano</span>
          </button>
          <button
            onClick={() => triggerQuickTool('CLEAR')}
            title="Limpiar espacio de trabajo"
            className="flex items-center gap-1 text-xs bg-red-950/60 hover:bg-red-900/80 text-red-300 px-2.5 py-1.5 rounded border border-red-800 transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Limpiar</span>
          </button>
        </div>
      </div>

      {/* 2. SECONDARY TOOLS BAR (Contextual by Tab) */}
      <div className="bg-[#1a2332] px-4 py-2 border-b border-slate-800 flex flex-wrap items-center gap-2 text-xs">
        {activeTab === 'draw' && (
          <>
            <span className="text-slate-400 font-mono text-[11px] mr-1">Herramientas de Trazo:</span>
            <button
              onClick={() => triggerQuickTool('LINE')}
              className="bg-slate-800 hover:bg-cyan-700 text-slate-200 px-2.5 py-1 rounded border border-slate-700"
            >
              Línea (L)
            </button>
            <button
              onClick={() => triggerQuickTool('PLINE')}
              className="bg-slate-800 hover:bg-cyan-700 text-slate-200 px-2.5 py-1 rounded border border-slate-700"
            >
              Polilínea (PL)
            </button>
            <button
              onClick={() => triggerQuickTool('RECTANG')}
              className="bg-slate-800 hover:bg-cyan-700 text-slate-200 px-2.5 py-1 rounded border border-slate-700"
            >
              Rectángulo (REC)
            </button>
            <button
              onClick={() => triggerQuickTool('CIRCLE')}
              className="bg-slate-800 hover:bg-cyan-700 text-slate-200 px-2.5 py-1 rounded border border-slate-700"
            >
              Círculo (C)
            </button>
            <button
              onClick={() => triggerQuickTool('HATCH')}
              className="bg-slate-800 hover:bg-cyan-700 text-slate-200 px-2.5 py-1 rounded border border-slate-700"
            >
              Sombreado / Hatch (H)
            </button>
            <button
              onClick={() => triggerQuickTool('LIMITS')}
              className="bg-slate-800 hover:bg-cyan-700 text-slate-200 px-2.5 py-1 rounded border border-slate-700"
            >
              Límites (LIMITS)
            </button>
          </>
        )}

        {activeTab === 'modify' && (
          <>
            <span className="text-slate-400 font-mono text-[11px] mr-1">Modificación Geométrica:</span>
            <button
              onClick={() => triggerQuickTool('OFFSET')}
              className="bg-slate-800 hover:bg-amber-600 text-slate-200 px-2.5 py-1 rounded border border-slate-700"
            >
              Desfase (O)
            </button>
            <button
              onClick={() => triggerQuickTool('TRIM')}
              className="bg-slate-800 hover:bg-amber-600 text-slate-200 px-2.5 py-1 rounded border border-slate-700"
            >
              Recortar (TR)
            </button>
            <button
              onClick={() => triggerQuickTool('FILLET')}
              className="bg-slate-800 hover:bg-amber-600 text-slate-200 px-2.5 py-1 rounded border border-slate-700"
            >
              Empalme (F)
            </button>
            <button
              onClick={() => triggerQuickTool('ARRAYRECT')}
              className="bg-slate-800 hover:bg-amber-600 text-slate-200 px-2.5 py-1 rounded border border-slate-700"
            >
              Matriz Rectangular
            </button>
            <button
              onClick={() => triggerQuickTool('MOVE')}
              className="bg-slate-800 hover:bg-amber-600 text-slate-200 px-2.5 py-1 rounded border border-slate-700"
            >
              Desplazar (M)
            </button>
          </>
        )}

        {activeTab === 'blocks' && (
          <>
            <span className="text-slate-400 font-mono text-[11px] mr-1">Equipos & Simbología ISA-5.1:</span>
            <button
              onClick={() => {
                const b: CadEntity = {
                  id: `blk-${Date.now()}`,
                  type: 'block',
                  blockType: 'reactor',
                  blockTag: 'R-103',
                  layer: '02_EQUIPOS',
                  x: 320,
                  y: 280,
                  radius: 36
                };
                setEntities(prev => [...prev, b]);
                executeCommand('INSERT REACTOR');
              }}
              className="bg-slate-800 hover:bg-cyan-700 text-slate-200 px-2.5 py-1 rounded border border-slate-700"
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
                  x: 140,
                  y: 320,
                  radius: 28
                };
                setEntities(prev => [...prev, b]);
                executeCommand('INSERT TANK');
              }}
              className="bg-slate-800 hover:bg-cyan-700 text-slate-200 px-2.5 py-1 rounded border border-slate-700"
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
                  x: 230,
                  y: 280,
                  radius: 14
                };
                setEntities(prev => [...prev, b]);
                executeCommand('INSERT PUMP');
              }}
              className="bg-slate-800 hover:bg-cyan-700 text-slate-200 px-2.5 py-1 rounded border border-slate-700"
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
                  x: 320,
                  y: 350,
                  radius: 12
                };
                setEntities(prev => [...prev, b]);
                executeCommand('INSERT VALVE');
              }}
              className="bg-slate-800 hover:bg-cyan-700 text-slate-200 px-2.5 py-1 rounded border border-slate-700"
            >
              + Válvula Control (FCV)
            </button>
            <button
              onClick={() => triggerQuickTool('ATTDEF')}
              className="bg-slate-800 hover:bg-cyan-700 text-slate-200 px-2.5 py-1 rounded border border-slate-700"
            >
              Definir Atributo (ATTDEF)
            </button>
          </>
        )}

        {activeTab === 'layers' && (
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-mono text-[11px]">Capa Activa:</span>
            <select
              value={activeLayer}
              onChange={e => setActiveLayer(e.target.value)}
              className="bg-slate-800 text-slate-200 text-xs rounded px-2 py-1 border border-slate-700 focus:outline-none"
            >
              {Object.values(layers).map(l => (
                <option key={l.name} value={l.name}>
                  {l.name} ({l.description})
                </option>
              ))}
            </select>
            <button
              onClick={() => triggerQuickTool('LAYER')}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-2 py-1 rounded border border-slate-700"
            >
              Admin Capas
            </button>
          </div>
        )}

        {activeTab === 'annotate' && (
          <>
            <span className="text-slate-400 font-mono text-[11px] mr-1">Anotación & Layout:</span>
            <button
              onClick={() => triggerQuickTool('DIMLINEAR')}
              className="bg-slate-800 hover:bg-sky-600 text-slate-200 px-2.5 py-1 rounded border border-slate-700"
            >
              Cota Lineal (DLI)
            </button>
            <button
              onClick={() => triggerQuickTool('DIMCONTINUE')}
              className="bg-slate-800 hover:bg-sky-600 text-slate-200 px-2.5 py-1 rounded border border-slate-700"
            >
              Cota Continua (DCO)
            </button>
            <button
              onClick={() => triggerQuickTool('LAYOUT')}
              className="bg-slate-800 hover:bg-sky-600 text-slate-200 px-2.5 py-1 rounded border border-slate-700"
            >
              Espacio Papel (Layout)
            </button>
            <button
              onClick={() => triggerQuickTool('MVIEW')}
              className="bg-slate-800 hover:bg-sky-600 text-slate-200 px-2.5 py-1 rounded border border-slate-700"
            >
              Ventana Gráfica (MVIEW)
            </button>
            <button
              onClick={() => triggerQuickTool('PLOT')}
              className="bg-slate-800 hover:bg-sky-600 text-slate-200 px-2.5 py-1 rounded border border-slate-700"
            >
              Trazar a PDF (PLOT)
            </button>
          </>
        )}
      </div>

      {/* 3. MAIN WORKSPACE (Canvas + Guided Practice Sidebar) */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Canvas Workspace */}
        <div className="flex-1 relative overflow-hidden bg-[#111822] flex items-center justify-center p-2">
          <canvas
            ref={canvasRef}
            width={880}
            height={590}
            onMouseMove={handleMouseMove}
            onClick={() => {
              // Canvas click feedback
              if (commandInput) {
                executeCommand(commandInput);
              }
            }}
            className="w-full h-full max-h-[590px] border border-slate-800 rounded bg-[#111822] cursor-crosshair shadow-inner"
          />

          {/* Coordinate HUD (Floating bottom-left in model space) */}
          <div className="absolute bottom-4 left-4 bg-slate-900/90 text-cyan-400 font-mono text-[11px] px-3 py-1 rounded border border-slate-700/80 backdrop-blur-sm shadow flex items-center gap-3">
            <span>X: {mouseCoords.x.toFixed(2)} mm</span>
            <span className="text-slate-600">|</span>
            <span>Y: {mouseCoords.y.toFixed(2)} mm</span>
            <span className="text-slate-600">|</span>
            <span>Z: 0.00</span>
          </div>

          {/* Floating HUD toggle controls */}
          <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-slate-900/80 p-1 rounded-lg border border-slate-700 text-xs backdrop-blur-sm">
            <button
              onClick={() => setGridEnabled(!gridEnabled)}
              title="Rejilla GRID (F7)"
              className={`p-1.5 rounded transition ${gridEnabled ? 'bg-cyan-600 text-white' : 'text-slate-400'}`}
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setOrthoEnabled(!orthoEnabled)}
              title="Modo Ortogonal ORTHO (F8)"
              className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] transition ${
                orthoEnabled ? 'bg-amber-600 text-white' : 'text-slate-400'
              }`}
            >
              ORTHO
            </button>
            <button
              onClick={() => triggerQuickTool('ZOOM ALL')}
              title="Ajustar Zoom (Z A)"
              className="p-1.5 rounded text-slate-300 hover:text-white"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Guided Practice Step Sidebar (If practice is active) */}
        {practice && (
          <div className="w-full lg:w-96 bg-[#151c28] border-t lg:border-t-0 lg:border-l border-slate-700 flex flex-col h-auto lg:h-full overflow-y-auto">
            <div className="p-4 border-b border-slate-700 bg-slate-800/40">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-cyan-900 text-cyan-300 border border-cyan-700">
                  {practice.level.toUpperCase()}
                </span>
                <span className="text-xs text-slate-400">⏱ {practice.estimatedMinutes} min</span>
              </div>
              <h3 className="font-bold text-sm text-white leading-tight">{practice.title}</h3>
              <p className="text-xs text-slate-400 mt-1">{practice.subtitle}</p>
            </div>

            {/* Objective & Norm */}
            <div className="p-3 bg-slate-900/60 border-b border-slate-800 text-xs space-y-1.5">
              <div className="flex items-start gap-1.5 text-slate-300">
                <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <p><span className="font-semibold text-white">Objetivo:</span> {practice.objective}</p>
              </div>
              <div className="text-[11px] text-amber-300/90 font-mono">
                📌 Norma: {practice.normativeReference}
              </div>
            </div>

            {/* Steps Checklist */}
            <div className="p-4 flex-1 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2">
                <span>PASOS DE LA PRÁCTICA</span>
                <span className="text-cyan-400">
                  {completedSteps.length} / {practice.steps.length} completados
                </span>
              </div>

              {practice.steps.map((st, idx) => {
                const isCurrent = idx === currentStepIdx && !missionComplete;
                const isDone = completedSteps.includes(idx) || missionComplete;

                return (
                  <div
                    key={st.stepNumber}
                    className={`p-3 rounded-lg border transition ${
                      isCurrent
                        ? 'bg-cyan-950/40 border-cyan-500 shadow-md ring-1 ring-cyan-500/30'
                        : isDone
                        ? 'bg-slate-800/30 border-emerald-800/60 text-slate-300'
                        : 'bg-slate-900/40 border-slate-800 text-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <div
                            className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                              isCurrent ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {st.stepNumber}
                          </div>
                        )}
                        <span className={`text-xs font-semibold ${isCurrent ? 'text-white' : ''}`}>
                          Paso {st.stepNumber}
                        </span>
                      </div>
                      <span className="font-mono text-[11px] bg-slate-800 px-1.5 py-0.5 rounded text-cyan-300">
                        {st.cadCommand}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {st.instruction}
                    </p>

                    {isCurrent && (
                      <div className="mt-2.5 pt-2 border-t border-slate-800">
                        <div className="text-[11px] text-amber-400/90 flex items-start gap-1">
                          <HelpCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                          <span>{st.hint}</span>
                        </div>
                        <button
                          onClick={() => triggerQuickTool(st.cadCommand)}
                          className="mt-2 w-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-1 px-2 rounded text-xs transition flex items-center justify-center gap-1.5 shadow"
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
                <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-900/60 to-cyan-900/40 border border-emerald-500/60 text-center space-y-2 mt-4 animate-in fade-in zoom-in duration-300">
                  <Award className="w-10 h-10 text-yellow-400 mx-auto" />
                  <h4 className="font-bold text-sm text-emerald-300">¡Práctica Virtual Completada!</h4>
                  <p className="text-xs text-slate-300">
                    Has aplicado los comandos normativos de AutoCAD con éxito. Tu calificación ha sido registrada al 100%.
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

      {/* 4. AUTOCAD COMMAND LINE CONSOLE & PROMPT */}
      <div className="bg-[#0b0f14] border-t border-slate-800 p-2 font-mono">
        {/* Terminal Log */}
        <div className="h-20 overflow-y-auto text-[11px] leading-relaxed text-slate-300 px-2 space-y-0.5 scrollbar-thin">
          {commandHistory.slice(-6).map((line, i) => (
            <div
              key={i}
              className={
                line.startsWith('Command:')
                  ? 'text-cyan-400 font-semibold'
                  : line.includes('dialog') || line.includes('Wizard')
                  ? 'text-emerald-400'
                  : 'text-slate-400'
              }
            >
              {line}
            </div>
          ))}
          <div ref={logEndRef} />
        </div>

        {/* Input prompt form */}
        <form onSubmit={handleCommandSubmit} className="mt-1 flex items-center gap-2 bg-[#141b24] px-3 py-1.5 rounded border border-slate-700">
          <span className="text-cyan-400 font-bold text-xs">Command:</span>
          <input
            type="text"
            value={commandInput}
            onChange={e => setCommandInput(e.target.value)}
            placeholder="Escribe comando (LINE, RECTANG, BLOCK, UNITS, OFFSET, TRIM, HELP) y presiona Enter..."
            className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none"
          />
          <button
            type="submit"
            className="bg-cyan-600 hover:bg-cyan-500 text-white text-[11px] px-2.5 py-0.5 rounded font-sans transition"
          >
            Enter
          </button>
        </form>

        {/* Bottom CAD Status Bar */}
        <div className="mt-1 flex items-center justify-between text-[10px] text-slate-500 px-1 pt-1">
          <div className="flex items-center gap-3">
            <span className={snapEnabled ? 'text-cyan-400 font-bold' : ''}>SNAP [F9]</span>
            <span className={gridEnabled ? 'text-cyan-400 font-bold' : ''}>GRID [F7]</span>
            <span className={orthoEnabled ? 'text-amber-400 font-bold' : ''}>ORTHO [F8]</span>
            <span className="text-slate-400">POLAR</span>
            <span className="text-slate-400">OSNAP [F3]</span>
            <span className="text-slate-400">MODEL</span>
          </div>
          <div>
            <span>Escala: 1:100</span>
          </div>
        </div>
      </div>
    </div>
  );
}
