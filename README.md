# Portal Educativo de Diseño de Plantas con AutoCAD 🏭📐
### Universidad Aztlán • Décimo Cuatrimestre • Clave 1057 (6 Créditos)

Plataforma web integral desarrollada para la asignatura de **Diseño de Plantas Industriales**, orientada al dominio de **AutoCAD** desde nivel básico hasta avanzado aplicado a cada una de las 6 unidades temáticas oficiales y normativas nacionales e internacionales (NOM, ISO, ASME, ISA, OSHA, NFPA).

---

## 🌟 Características Principales

1. **Simulador / Laboratorio Virtual de AutoCAD**:
   - Espacio interactivo 2D vectorizado en Canvas con fondo CAD clásico, rejilla `GRID` (F7), modo ortogonal `ORTHO` (F8), forzado de cursor `SNAP` (F9), referencias a objetos y lectura de coordenadas $(X, Y)$ en tiempo real.
   - Consola de comandos inferior interactiva con prompt dinámico (`Command: _`) que interpreta comandos reales de AutoCAD (`LINE`, `PLINE`, `RECTANG`, `CIRCLE`, `OFFSET`, `TRIM`, `FILLET`, `ARRAY`, `HATCH`, `BLOCK`, `INSERT`, `ATTDEF`, `LAYER`, `DIM`, `LAYOUT`, `MVIEW`, `PLOT`, `DATAEXTRACTION`, `BCOUNT`, `AREA`, etc.).
   - Librería integrada de bloques normativos P&ID bajo estándar **ANSI/ISA-5.1** (reactores agitados, tanques de almacenamiento, bombas centrífugas, válvulas de control neumático FCV, transmisores de temperatura TIC).
   - Exportación de planos vectoriales y vistas renderizadas en alta resolución PNG/SVG.

2. **6 Prácticas Virtuales Guiadas (Alineadas al Programa Oficial)**:
   - **Práctica 1 (U.I)**: Configuración de Espacio de Trabajo, Unidades Métricas (`UNITS`), Límites (`LIMITS`) y Cajetín Técnico Normalizado (NOM-008 / ISO 128).
   - **Práctica 2 (U.II)**: Trazado del Plant Layout Preliminar de la Nave Industrial, Muros Perimetrales, Andenes de Carga y Pasillos Ergonómicos (NOM-001-STPS / NFPA 101).
   - **Práctica 3 (U.III)**: Montaje de Plano Ejecutivo en Espacio Papel (`LAYOUT`), Ventanas Gráficas Escaladas (`MVIEW`, escala 1:100XP), Acotación en Cadena (`DIMCONTINUE`) y Ploteo a PDF (`PLOT`).
   - **Práctica 4 (U.IV)**: Diagrama P&ID Normativo bajo ISA-5.1 con Bloques Dinámicos, Atributos (`ATTDEF`) y Lazos de Control de Proceso.
   - **Práctica 5 (U.V)**: Emplazamiento Topográfico del Terreno, Gestión de Capas Jerárquicas (`LAYER` bajo ISO 13567) y Referencias Externas (`XREF`).
   - **Práctica 6 (U.VI)**: Extracción Automatizada de Datos (`DATAEXTRACTION`, `BCOUNT`), Generación de Tablas de Metrados y Catálogo de Conceptos para Presupuesto de Inversión (CAPEX).

3. **Sistema de Roles y Autenticación**:
   - **Super Administrador (Docente / Coordinador)**:
     - Crear nuevos usuarios con asignación de matrícula, correo institucional y rol.
     - Asignar, cambiar o resetear contraseñas de cualquier estudiante en cualquier momento.
     - Monitoreo en tiempo real del progreso de cada alumno (% global, unidades leídas, prácticas de laboratorio completadas, notas de quizes y entregas de proyecto).
     - Calificar entregas de Proyecto Final de Plantas.
     - Exportación de la matriz académica completa a formato CSV.
   - **Estudiante**:
     - Dashboard personalizado con barra de avance curricular.
     - Módulos teóricos y prácticos de las Unidades I a VI.
     - Evaluaciones técnicas y cuestionarios interactivos con retroalimentación inmediata.
     - Módulo de entrega del Proyecto Final (Unidad III) vinculando repositorio de GitHub o nube.

4. **Persistencia Completa de Datos**:
   - Todo el avance realizado por los estudiantes (módulos, prácticas completadas en el simulador, notas de cuestionarios y proyecto) se almacena y sincroniza de forma persistente.

---

## 🔑 Credenciales de Acceso Predeterminadas

| Rol | Correo Institucional | Contraseña |
|---|---|---|
| **Super Administrador** | `admin@aztlan.edu.mx` | `Admin2026!` |
| **Estudiante Demo** | `estudiante@aztlan.edu.mx` | `Alumno2026!` |

---

## 🛠 Tecnologías Utilizadas

- **Framework**: Next.js 14 / React 18 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS (Paleta de Ingeniería / Blueprint Dark Mode)
- **Iconografía**: Lucide React
- **Gráficos**: HTML5 Canvas Vector Engine
- **Efectos de Gamificación**: Canvas Confetti

---

## 🚀 Despliegue en Vercel

El proyecto está preparado para compilación y despliegue continuo en [Vercel](https://vercel.com):

```bash
npm run build
```

---

*Universidad Aztlán • Coordinador del Curso: Dr. Luis Garibaldi • 2026*
