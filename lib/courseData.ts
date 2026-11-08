import { Unit, Practice, QuizQuestion } from './types';

export const COURSE_INFO = {
  institution: "UNIVERSIDAD AZTLÁN",
  courseName: "DISEÑO DE PLANTAS",
  clave: "1057",
  ciclo: "DÉCIMO CUATRIMESTRE",
  creditos: 6,
  horasDocente: 14,
  horasIndependientes: 82,
  objetivoGeneral: "Analizar y explicar la metodología para el diseño de plantas, integrando los conocimientos adquiridos en cursos previos sobre tecnología, ingeniería, economía y áreas relacionadas. A efecto de aplicarlas en el ámbito laboral mediante el dominio asistido por computadora (AutoCAD) de nivel básico a avanzado bajo normativas nacionales e internacionales.",
  softwareBase: "AutoCAD / AutoCAD Plant 3D Industrial Tools",
};

export const COURSE_UNITS: Unit[] = [
  {
    id: "unidad-1",
    number: "UNIDAD I",
    title: "Contexto Técnico y Económico en el Diseño de una Planta",
    description: "Fundamentos de ingeniería, evolución del diseño industrial y configuración del entorno de trabajo CAD bajo normas oficiales (NOM/ISO).",
    cadLevel: "Básico",
    cadFocus: "Configuración del entorno CAD, sistemas de unidades métricas/anglosajonas (UNITS), límites de dibujo (LIMITS), rejilla y forzado de cursor (GRID, SNAP), estilos de texto técnico y creación de plantilla industrial (.DWT) con cajetín normalizado.",
    practiceId: "practica-1",
    quizId: "quiz-1",
    subtopics: [
      {
        id: "1.1",
        title: "I.1 Ciencia, tecnología e ingeniería",
        content: "Diferenciación entre el conocimiento científico, el desarrollo tecnológico y la praxis de la ingeniería industrial y de procesos. La ingeniería como agente transformador de materias primas en productos útiles mediante plantas de producción sostenibles y seguras.",
        autocadConcept: "El dibujo asistido por computadora (CAD) como lenguaje unificado de la ingeniería. Transición del dibujo analógico en restirador a modelos vectoriales paramétricos y normalizados.",
        autocadCommands: ["NEW", "UNITS", "LIMITS", "GRID", "SNAP"],
        industrialNorms: ["NOM-008-SCFI (Sistema General de Unidades de Medida)", "ISO 128 (Principios generales de presentación en dibujos técnicos)"],
        practicalExercise: "Configurar el espacio de trabajo en sistema métrico decimal (milímetros), definir límites de dibujo para una nave industrial de 100m x 50m y verificar el modo SNAP a 1 metro."
      },
      {
        id: "1.2",
        title: "I.2 Evolución histórica",
        content: "De las fábricas de la primera revolución industrial hasta las plantas inteligentes de la Industria 4.0. Evolución de los sistemas de distribución física: layout artesanal, líneas de producción en masa (Fordismo), manufactura celular y plantas automatizadas modulares.",
        autocadConcept: "Evolución histórica del software CAD desde el sistema Sketchpad (1963) hasta Autodesk AutoCAD 2D/3D y AutoCAD Plant 3D. Gestión de archivos DWG, DXF y compatibilidad con software BIM.",
        autocadCommands: ["SAVEAS", "OPEN", "OPTIONS", "WORKSPACE"],
        industrialNorms: ["ISO 13567 (Estructuración y denominación de capas en CAD)", "ANSI Y14.1 (Drawing Sheet Size and Format)"],
        practicalExercise: "Explorar la interfaz de usuario de AutoCAD (Cinta Ribbon, Barra de Estado, Línea de Comandos) y guardar una plantilla institucional de la Universidad Aztlán con extensión .DWT."
      },
      {
        id: "1.3",
        title: "I.3 Diseño en Ingeniería",
        content: "Fases metodológicas del diseño: formulación del problema, especificación de requerimientos de producción, síntesis de alternativas de proceso, análisis de viabilidad técnica y optimización de flujos de materiales.",
        autocadConcept: "Precisión geométrica y uso del sistema de coordenadas cartesianas absolutas (X, Y), relativas (@X, Y) y polares (@Distancia<Ángulo). Configuración de modos de referencia a objetos (OSNAP: ENDpoint, MIDpoint, CENter, INTersection).",
        autocadCommands: ["LINE", "PLINE", "RECTANG", "OSNAP", "ZOOM"],
        industrialNorms: ["NOM-026-STPS (Colores y señales de seguridad e higiene)", "ISO 5457 (Formatos y presentación de las hojas de dibujo)"],
        practicalExercise: "Trazar con coordenadas relativas el polígono base del área de recepción y control de calidad de la planta."
      },
      {
        id: "1.4",
        title: "I.4 Contexto socio-económico y técnico",
        content: "Evaluación del impacto social, ambiental y económico del emplazamiento industrial. Regulaciones laborales de seguridad e higiene, planes de contingencia y diseño sustentable (huella de carbono e hídrica).",
        autocadConcept: "Cajetines técnicos normalizados (Title Blocks): rotulación técnica de datos de proyecto, escala, diseñador, aprobador, clave de plano y fecha. Atributos de texto editables.",
        autocadCommands: ["TEXT", "MTEXT", "STYLE", "OFFSET", "TRIM"],
        industrialNorms: ["NOM-001-SEDE (Instalaciones eléctricas)", "OSHA 1910 (General Industry Safety Standards)"],
        practicalExercise: "Diseñar el cajetín oficial de ingeniería en el cuadrante inferior derecho de la hoja tamaño Tabloide/Doble Carta (A3)."
      }
    ]
  },
  {
    id: "unidad-2",
    number: "UNIDAD II",
    title: "Etapas y Elementos en el Diseño de una Planta",
    description: "Metodología de diseño desde el concepto hasta el anteproyecto, aplicando comandos avanzados de dibujo geométrico y distribución física (Layout).",
    cadLevel: "Básico - Intermedio",
    cadFocus: "Comandos de dibujo de entidades compuestas (PLINE, RECTANG, CIRCLE, ARC), comandos de modificación avanzada (OFFSET, TRIM, EXTEND, FILLET, CHAMFER, MOVE, COPY, ROTATE, ARRAY, MIRROR) y cálculo de pasillos y holguras según ergonomía industrial.",
    practiceId: "practica-2",
    quizId: "quiz-2",
    subtopics: [
      {
        id: "2.1",
        title: "II.1 Puntos a considerar en el diseño de una planta",
        content: "Flujo de materiales unidireccional, minimización de cuellos de botella, flexibilidad para futuras expansiones, accesibilidad para mantenimiento de maquinaria pesada y confort ergonómico de los operarios.",
        autocadConcept: "Trazado perimetral de naves y muros estructurales utilizando polilíneas con grosor (PLINE) y desfases paralelos (OFFSET) para delimitar muros perimetrales de 20cm y tabiques divisorios.",
        autocadCommands: ["PLINE", "OFFSET", "PEDIT", "JOIN"],
        industrialNorms: ["NOM-005-STPS (Manejo de sustancias peligrosas)", "NOM-001-STPS (Condiciones de seguridad en edificios y locales)"],
        practicalExercise: "Trazar la envolvente de la nave industrial principal con PLINE y aplicar OFFSET a 0.20m para representar el espesor de muro perimetral."
      },
      {
        id: "2.2",
        title: "II.2 Papel del Ingeniero y objetivos del diseño",
        content: "Liderazgo técnico multidisciplinario. Coordinación entre ingeniería química, civil, mecánica, eléctrica y ambiental para sintetizar el diseño de la planta dentro del presupuesto y cronograma fijados.",
        autocadConcept: "Edición precisa de intersecciones y aberturas para accesos de montacargas y salidas de emergencia mediante TRIM, EXTEND y FILLET con radio controlado.",
        autocadCommands: ["TRIM", "EXTEND", "FILLET", "BREAK"],
        industrialNorms: ["NFPA 101 (Life Safety Code - Anchos mínimos de pasillos de evacuación)"],
        practicalExercise: "Generar accesos vehiculares de 4.0 metros para andenes de carga en el muro perimetral mediante cortes limpios con TRIM."
      },
      {
        id: "2.3",
        title: "II.3 Factores iniciadores",
        content: "Demandas de mercado, obsolescencia tecnológica, necesidad de reducción de costos operativos, requerimientos regulatorios ambientales o lanzamiento de nuevos productos.",
        autocadConcept: "Modelado preliminar de estaciones de trabajo modulares mediante RECTANG, COPY y MOVE con puntos base de desplazamiento precisos.",
        autocadCommands: ["RECTANG", "MOVE", "COPY", "ALIGN"],
        industrialNorms: ["ISO 6385 (Principios ergonómicos para el diseño de sistemas de trabajo)"],
        practicalExercise: "Diseñar una estación de ensamble y clonarla a lo largo de la línea productiva con un espaciamiento de 3.5 metros."
      },
      {
        id: "2.4",
        title: "II.4 Evolución del proyecto",
        content: "De la conceptualización a la ingeniería básica y de detalle. Gates de aprobación técnica y económica (Stage-Gate Process).",
        autocadConcept: "Patrones repetitivos y matrices de equipos industriales: uso de ARRAYRECT (matriz rectangular) para bancos de silos, tanques de almacenamiento y estanterías de almacén (Racks).",
        autocadCommands: ["ARRAYRECT", "ARRAYPOLAR", "EXPLODE"],
        industrialNorms: ["RMI MH16.1 (Especificación para diseño de estanterías industriales para paletizado)"],
        practicalExercise: "Crear una matriz rectangular de 4 filas x 6 columnas de silos de materia prima con separación de seguridad de 2.0 metros entre ejes."
      },
      {
        id: "2.5",
        title: "II.5 a II.9 Estudio conceptual a Proyecto preliminar",
        content: "Análisis de oportunidad, investigación de mercado (volumen de producción Q), ingeniería de procesos (dimensionamiento preliminar de reactores y columnas), escalamiento en planta piloto y entrega del anteproyecto (preliminary design).",
        autocadConcept: "Zonificación cromática y achurado industrial (HATCH) para distinguir áreas: producción (patrón ANSI31), almacén (AR-B816), oficinas (SOLID) y áreas de circulación vehicular.",
        autocadCommands: ["HATCH", "HATCHEDIT", "MATCHPROP", "DIST"],
        industrialNorms: ["NOM-026-STPS (Identificación de tuberías y fluidos)", "ISO 7010 (Símbolos gráficos de seguridad)"],
        practicalExercise: "Aplicar texturas y sombreados (HATCH) para codificar áreas según la norma de seguridad y medir distancias de seguridad con DIST."
      }
    ]
  },
  {
    id: "unidad-3",
    number: "UNIDAD III",
    title: "Proyecto Final de Diseño de Plantas",
    description: "Integración de planos ejecutivos en AutoCAD, memorias de cálculo, especificaciones técnicas de equipos y preparación para ploteo profesional.",
    cadLevel: "Avanzado",
    cadFocus: "Gestión de Espacio Modelo (Model Space) vs Espacio Papel (Layout), creación y escalado normalizado de ventanas gráficas (MVIEW, ZOOM 1/50XP), acotación normalizada (DIMSTYLE), estilos de trazado (CTB) y exportación a PDF para construcción.",
    practiceId: "practica-3",
    quizId: "quiz-3",
    subtopics: [
      {
        id: "3.1",
        title: "III.1 Reporte documentado",
        content: "Estructura de la memoria descriptiva y de cálculo del proyecto de planta industrial: resumen ejecutivo, bases de diseño, balance de materia y energía, y justificación técnica de la disposición de equipos.",
        autocadConcept: "Vinculación de notas técnicas, leyendas de simbología y listas de revisiones en el espacio papel (Layout) de AutoCAD.",
        autocadCommands: ["LAYOUT", "MVIEW", "PSPACE", "MSPACE"],
        industrialNorms: ["ISO 5457 (Tamaños de formato y disposición de elementos gráficos)"],
        practicalExercise: "Configurar un Layout tamaño ARCH D (24\"x36\" o 610x914mm) e insertar el cajetín maestro del proyecto final."
      },
      {
        id: "3.2",
        title: "III.2 Presupuesto",
        content: "Estimación de costos de inversión: equipos principales comprados (PEC), costos de instalación, tuberías, instrumentación, obras civiles y contingencias.",
        autocadConcept: "Tablas automáticas en AutoCAD (TABLE) para enlazar metrados y cantidades calculadas directamente desde las áreas y longitudes de dibujo.",
        autocadCommands: ["TABLE", "TABLESTYLE", "FIELD"],
        industrialNorms: ["AACE International (Cost Engineering Recommended Practices)"],
        practicalExercise: "Insertar una tabla dinámica en AutoCAD con el resumen de costos por área funcional de la planta."
      },
      {
        id: "3.3",
        title: "III.3 Documento de especificaciones técnicas",
        content: "Hojas de datos (Datasheets) de equipos mecánicos, eléctricos y de proceso (materiales de construcción como acero inoxidable 316L, presiones y temperaturas de diseño).",
        autocadConcept: "Estilos de cotas normalizados (DIMSTYLE): configuración de tamaño de flecha, texto de cota, unidades alternas y tolerancias geométricas.",
        autocadCommands: ["DIMSTYLE", "DIMLINEAR", "DIMALIGNED", "DIMCONTINUE"],
        industrialNorms: ["ASME Y14.5 (Dimensioning and Tolerancing)", "NOM-008-SCFI"],
        practicalExercise: "Crear un estilo de cota 'PLANTA-1_100' y acotar los ejes estructurales de la nave en cadena continua con DIMCONTINUE."
      },
      {
        id: "3.4",
        title: "III.4 Diagramas y planos",
        content: "El paquete completo de planos de ingeniería: Diagramas de Bloques (BFD), Diagramas de Tuberías e Instrumentación (P&ID), Plano de Implantación General (Plot Plan), Planos de Áreas y Rutas de Evacuación.",
        autocadConcept: "Gestión de múltiples ventanas gráficas (Viewports) a diferentes escalas (1:500 para Plot Plan general, 1:100 para nave de proceso, 1:25 para detalle de anclaje de equipos).",
        autocadCommands: ["MVIEW", "VPORTS", "VPLAYER", "ZOOM XP"],
        industrialNorms: ["ISO 10209 (Documentación técnica de producto - Vocabulario)", "ANSI/ISA-5.1"],
        practicalExercise: "Crear 3 viewports en un plano: el primero a escala 1:200 para el Layout general y dos más a 1:50 para detalles de reactores."
      },
      {
        id: "3.5",
        title: "III.5 Proyecto final de construcción y servicios",
        content: "Redes de servicios auxiliares (vapor, agua de enfriamiento, aire comprimido, red contraincendios y drenajes industriales). Entrega del dossier final de ingeniería para licitación y construcción.",
        autocadConcept: "Ploteo avanzado e impresión (PLOT / PUBLISH), configuración de tablas de plumillas monocromáticas (monochrome.ctb) y generación de archivo digital PDF para contratistas.",
        autocadCommands: ["PLOT", "PAGESETUP", "PUBLISH", "EXPORTPDF"],
        industrialNorms: ["NOM-002-STPS (Prevención y protección contra incendios)", "NFPA 13 (Sistemas de rociadores)"],
        practicalExercise: "Generar el entregable en PDF de alta resolución con grosores de línea diferenciados según la tabla de asignación de plumillas."
      }
    ]
  },
  {
    id: "unidad-4",
    number: "UNIDAD IV",
    title: "Manejo de la Información en Forma de Diagramas de Flujo",
    description: "Simbología estandarizada de procesos (ISA-5.1), balances de materia y dibujo técnico de diagramas BFD, PFD y P&ID con bloques y atributos.",
    cadLevel: "Intermedio - Avanzado",
    cadFocus: "Creación y edición de Bloques CAD (BLOCK, WBLOCK, BEDIT), definición de atributos vinculados (ATTDEF) para codificación de equipos (KKS / TAG: TK-101, P-102A, V-103), inserción de simbología de válvulas y lazos de control.",
    practiceId: "practica-4",
    quizId: "quiz-4",
    subtopics: [
      {
        id: "4.1",
        title: "IV.1 Módulos básicos de un diagrama de flujo general",
        content: "Estructura jerárquica de la información de proceso: Diagrama de Bloques (BFD) para visualización global, Diagrama de Flujo de Procesos (PFD) para balances térmicos y de masa, y P&ID para ingeniería de detalle.",
        autocadConcept: "Diseño modular y creación de biblioteca de símbolos estándar de equipos (bombas, intercambiadores, columnas, tanques) con puntos de inserción y de conexión (Snap Points).",
        autocadCommands: ["BLOCK", "WBLOCK", "INSERT", "BEDIT"],
        industrialNorms: ["ANSI/ISA-5.1 (Instrumentation Symbols and Identification)", "ISO 10628 (Diagramas de flujo de plantas de proceso)"],
        practicalExercise: "Dibujar el símbolo normalizado de una bomba centrífuga según ISO 10628 y convertirlo en bloque permanente con WBLOCK."
      },
      {
        id: "4.2",
        title: "IV.2 Diagramas de flujo (PFD y P&ID)",
        content: "Codificación y nomenclatura de tuberías (Diámetro nominal, servicio, clase de tubería, aislamiento) y lazos de instrumentación (Transmisores, controladores, válvulas de control neumático/eléctrico).",
        autocadConcept: "Definición de atributos interactivos con ATTDEF (TAG del equipo, capacidad, presión de operación) y trazado de líneas de proceso (línea continua gruesa) vs líneas de señal de control (línea discontinua).",
        autocadCommands: ["ATTDEF", "BATTMAN", "EATTEDIT", "LINETYPE"],
        industrialNorms: ["ASME B31.3 (Process Piping)", "ISA-5.1 (Nomenclatura: PI, TI, FIC, LIC)"],
        practicalExercise: "Crear un bloque de Válvula de Control Neumático con atributos editables de TAG (FCV-101) y diámetro (3 pulg)."
      },
      {
        id: "4.3",
        title: "IV.3 Balance de masa en el proceso",
        content: "Principios de conservación de la materia (Entradas = Salidas + Acumulación). Corrientes de recirculación, purga y tablas resumen de balance de materia (temperatura, presión, caudal másico y fracción molar).",
        autocadConcept: "Inserción de rombos de corrientes de balance (Stream Flags) numerados y vinculación con tablas de balance en el dibujo mediante campos de texto automático (FIELDS).",
        autocadCommands: ["POLYGON", "TEXT", "FIELD", "QSELECT"],
        industrialNorms: ["GPSA Engineering Data Book (Process Flow Schematics)"],
        practicalExercise: "Dibujar rombos de identificación de corrientes de proceso numeradas del 1 al 8 e interconectarlas con las líneas principales."
      }
    ]
  },
  {
    id: "unidad-5",
    number: "UNIDAD V",
    title: "Localización de la Planta",
    description: "Macrolocalización y microlocalización de plantas industriales utilizando capas topográficas, georreferenciación y análisis espacial en AutoCAD.",
    cadLevel: "Intermedio",
    cadFocus: "Gestión avanzada de capas (LAYER, colores, tipos de línea, estados de capa LAS), referencias externas (XREF, IMAGEATTACH) de ortofotos y planos topográficos, cálculo de áreas y perímetros de parcelas (AREA, MEASUREGEOM).",
    practiceId: "practica-5",
    quizId: "quiz-5",
    subtopics: [
      {
        id: "5.1",
        title: "V.1 Procedimiento general",
        content: "Metodología sistemática de localización de plantas: preselección de regiones candidatas (macrolocalización) y selección del predio específico (microlocalización). Criterios técnicos, legales y logísticos.",
        autocadConcept: "Inserción y escalado de planos topográficos y catastrales en formato vectorial o raster mediante IMAGEATTACH y ALIGN.",
        autocadCommands: ["IMAGEATTACH", "ALIGN", "SCALE", "GEOGRAPHICLOCATION"],
        industrialNorms: ["Reglamentos locales de construcción y uso de suelo industrial (SEMARNAT / SEDATU)"],
        practicalExercise: "Insertar la imagen satelital del parque industrial propuesto y alinearla a escala 1:1 con dos puntos de control conocidos con ALIGN."
      },
      {
        id: "5.2",
        title: "V.2 Factores que intervienen en la localización de la planta",
        content: "Factores primarios: cercanía a materias primas, cercanía a mercados de consumo, disponibilidad de energía eléctrica de alta tensión, suministro de agua industrial, mano de obra calificada y vías férreas/carreteras. Factores secundarios: clima, incentivos fiscales y manejo de residuos.",
        autocadConcept: "Estructuración del proyecto por capas normalizadas (ISO 13567): TOPOGRAFIA, VIAS_ACCESO, RED_ELECTRICA, HIDRAULICA, RETIRO_MUNICIPAL, CONSTRUCCION.",
        autocadCommands: ["LAYER", "LAYISO", "LAYUNISO", "LAYFRZ"],
        industrialNorms: ["NOM-001-SEDE", "NOM-081-SEMARNAT (Límites máximos permisibles de emisión de ruido)"],
        practicalExercise: "Crear una estructura jerárquica de 8 capas con colores normalizados y bloquear la capa de curvas de nivel para evitar desplazamientos accidentales."
      },
      {
        id: "5.3",
        title: "V.3 Elección final de la planta",
        content: "Métodos cuantitativos de decisión: Método de los Factores Ponderados, Método del Centro de Gravedad y Análisis Costo-Volumen de Ubicación.",
        autocadConcept: "Cálculo preciso de áreas construidas, áreas verdes, superficies de rodamiento y coeficiente de ocupación del suelo (COS/CUS) mediante comandos de medición.",
        autocadCommands: ["AREA", "MEASUREGEOM", "LIST", "BOUNDARY"],
        industrialNorms: ["Normas de impacto urbano y porcentajes de área verde obligatoria"],
        practicalExercise: "Calcular el área neta del predio y el porcentaje de superficie ocupada por la nave industrial utilizando el comando AREA."
      }
    ]
  },
  {
    id: "unidad-6",
    number: "UNIDAD VI",
    title: "Estudio Económico",
    description: "Evaluación de costos de capital, catálogo de conceptos de obra civil y electromecánica mediante extracción automática de datos CAD.",
    cadLevel: "Avanzado",
    cadFocus: "Extracción automatizada de atributos y cantidades de obra (DATAEXTRACTION, EATTEXT), generación de tablas dinámicas de cuantificación de tuberías, válvulas y equipos, y vinculación con presupuestos.",
    practiceId: "practica-6",
    quizId: "quiz-6",
    subtopics: [
      {
        id: "6.1",
        title: "VI.1 Puntos a considerar",
        content: "Horizonte del proyecto, vida útil económica de los equipos industriales, inflación, tasa de descuento (TMAR), valor de rescate y flujos de caja proyectados.",
        autocadConcept: "Estandarización de nomenclaturas y códigos de costo en los atributos de cada componente dibujado en el plano para facilitar su inventario.",
        autocadCommands: ["ATTEDIT", "FIND", "RENAME", "PROPERTIES"],
        industrialNorms: ["Estándares de Ingeniería de Costos AACE / PMBOK"],
        practicalExercise: "Asignar códigos de partida presupuestaria (ej. 'EQ-ME-01', 'TUB-INOX-02') en las propiedades extendidas de cada bloque."
      },
      {
        id: "6.2",
        title: "VI.2 Inversión de capital",
        content: "Capital Fijo (Tierras, edificios, equipos principales, tuberías, instrumentación) vs Capital de Trabajo (Inventario inicial, materias primas, nómina operativa de arranque).",
        autocadConcept: "Cuantificación de metros cuadrados de piso industrial de alta resistencia, metros lineales de barda perimetral y volumen de concreto para cimentaciones de maquinaria.",
        autocadCommands: ["DATAEXTRACTION", "QSELECT", "BCOUNT"],
        industrialNorms: ["ACI 318 (Requisitos de reglamento para concreto estructural)"],
        practicalExercise: "Ejecutar BCOUNT para obtener el conteo exacto de luminarias industriales y extintores ubicados en el plano."
      },
      {
        id: "6.3",
        title: "VI.3 Forma de diseño y VI.4 Forma contable",
        content: "Impacto del diseño en los costos de ciclo de vida (LCC). Métodos de depreciación contable (Línea recta, suma de dígitos de los años) y amortización de activos diferidos.",
        autocadConcept: "Generación de leyendas y tablas de resumen contable dentro del archivo DWG exportables a hojas de cálculo de Excel (.xlsx / .csv).",
        autocadCommands: ["EXPORT", "TABLE", "DATALINK"],
        industrialNorms: ["NIF C-6 (Normas de Información Financiera - Propiedades, planta y equipo)"],
        practicalExercise: "Exportar el reporte de conteo de válvulas y motores a formato CSV para su integración en la hoja de cálculo presupuestaria."
      },
      {
        id: "6.4",
        title: "VI.5 Cálculo de conceptos",
        content: "Integración del Precio Unitario (PU): Costo directo (Materiales, mano de obra, equipo/maquinaria), Costo indirecto (Administración de obra, seguros, fianzas), Financiamiento y Utilidad.",
        autocadConcept: "Elaboración del Catálogo de Conceptos Definitivo vinculado bidireccionalmente con el modelo CAD de la planta.",
        autocadCommands: ["TABLE", "FIELD", "DATALINKUPDATE"],
        industrialNorms: ["Ley de Obras Públicas y Servicios Relacionados con las Mismas"],
        practicalExercise: "Crear la tabla final del catálogo de conceptos en AutoCAD con columnas: Clave, Descripción, Unidad, Cantidad, P.U. e Importe Total."
      }
    ]
  }
];

export const VIRTUAL_PRACTICES: Practice[] = [
  {
    id: "practica-1",
    unitId: "unidad-1",
    title: "Práctica 1: Configuración del Espacio de Trabajo y Cajetín Industrial",
    subtitle: "Iniciación en AutoCAD y Normativas NOM-008 / ISO 128",
    level: "Básico",
    estimatedMinutes: 25,
    objective: "Configurar un entorno de dibujo técnico profesional en AutoCAD para diseño de plantas: fijar unidades métricas, límites del terreno, rejilla de precisión y trazar el cajetín de rotulación oficial con texto técnico.",
    normativeReference: "NOM-008-SCFI-2002 y Norma ISO 5457 (Formatos y presentación de hojas)",
    commandsLearned: ["UNITS", "LIMITS", "GRID", "SNAP", "RECTANG", "OFFSET", "TEXT", "ZOOM"],
    deliverable: "Plantilla industrial (.DWT) con límites de nave y cajetín institucional normalizado.",
    steps: [
      {
        stepNumber: 1,
        instruction: "Configura las unidades del proyecto en sistema decimal milímetros tecleando el comando UNITS.",
        cadCommand: "UNITS",
        hint: "Escribe UNITS en la consola y presiona Enter para establecer precisión a 2 decimales y escala en milímetros.",
        validationKey: "units_set"
      },
      {
        stepNumber: 2,
        instruction: "Establece los límites del espacio de trabajo para una nave industrial de 100 por 60 metros con el comando LIMITS.",
        cadCommand: "LIMITS",
        expectedInput: "0,0 100,60",
        hint: "Teclea LIMITS y especifica la esquina inferior izquierda 0,0 y superior derecha 100,60.",
        validationKey: "limits_set"
      },
      {
        stepNumber: 3,
        instruction: "Ajusta la visualización completa del área de trabajo usando ZOOM con la opción ALL.",
        cadCommand: "ZOOM",
        expectedInput: "ALL",
        hint: "Escribe ZOOM y luego pulsa Enter o escribe ALL (o A) para centrar los límites en pantalla.",
        validationKey: "zoom_all"
      },
      {
        stepNumber: 4,
        instruction: "Traza el marco perimetral del cajetín técnico en la esquina con el comando RECTANG.",
        cadCommand: "RECTANG",
        hint: "Escribe RECTANG y define las esquinas para construir el recuadro del pie de plano.",
        validationKey: "rectang_drawn"
      },
      {
        stepNumber: 5,
        instruction: "Aplica un desfase interno de seguridad de 10 mm al cajetín utilizando el comando OFFSET.",
        cadCommand: "OFFSET",
        hint: "Escribe OFFSET (u O), indica la distancia y selecciona el rectángulo exterior.",
        validationKey: "offset_applied"
      },
      {
        stepNumber: 6,
        instruction: "Inserta el rótulo técnico oficial 'UNIVERSIDAD AZTLAN - DISENO DE PLANTAS' usando el comando TEXT.",
        cadCommand: "TEXT",
        hint: "Escribe TEXT, haz clic en el cajetín y escribe el texto institucional.",
        validationKey: "text_added"
      }
    ]
  },
  {
    id: "practica-2",
    unitId: "unidad-2",
    title: "Práctica 2: Trazado del Layout Preliminar de la Nave Industrial",
    subtitle: "Distribución física de áreas, accesos y andenes de carga",
    level: "Básico - Intermedio",
    estimatedMinutes: 35,
    objective: "Diseñar la distribución física (Plant Layout) preliminar de una nave de producción: delimitar muros perimetrales de 20cm, vanos para andenes de carga de tráiler, pasillos de montacargas de 3.5m y zonificación de áreas con sombreado.",
    normativeReference: "NOM-001-STPS-2008 (Edificios, locales e instalaciones) y NFPA 101",
    commandsLearned: ["PLINE", "OFFSET", "TRIM", "FILLET", "ARRAYRECT", "HATCH"],
    deliverable: "Plano del Layout 2D con muros perimetrales, accesos limpios y áreas diferenciadas por achurado.",
    steps: [
      {
        stepNumber: 1,
        instruction: "Traza el polígono exterior de la nave industrial (80m x 40m) utilizando una polilínea cerrada con PLINE.",
        cadCommand: "PLINE",
        hint: "Escribe PLINE (o PL) y traza el contorno rectangular de la nave.",
        validationKey: "pline_outline"
      },
      {
        stepNumber: 2,
        instruction: "Genera el espesor de muro de 0.30 metros hacia el interior mediante el comando OFFSET.",
        cadCommand: "OFFSET",
        hint: "Escribe OFFSET, introduce 0.30 y selecciona la polilínea hacia adentro.",
        validationKey: "wall_offset"
      },
      {
        stepNumber: 3,
        instruction: "Abre los vanos de 4 metros para los andenes de carga en la fachada frontal usando el comando TRIM.",
        cadCommand: "TRIM",
        hint: "Escribe TRIM (o TR) y corta los segmentos de muro donde se colocarán las puertas seccionales de carga.",
        validationKey: "trim_doors"
      },
      {
        stepNumber: 4,
        instruction: "Suaviza las esquinas de los pasillos de circulación de montacargas con un radio de 2.0m usando FILLET.",
        cadCommand: "FILLET",
        hint: "Escribe FILLET (o F), escribe R, introduce 2.0 y selecciona las dos líneas de esquina.",
        validationKey: "fillet_corners"
      },
      {
        stepNumber: 5,
        instruction: "Distribuye la batería de 6 estaciones de ensamble continuo usando ARRAYRECT (matriz rectangular).",
        cadCommand: "ARRAYRECT",
        hint: "Escribe ARRAYRECT, selecciona la estación y genera 2 filas por 3 columnas con espaciado de 5m.",
        validationKey: "array_stations"
      },
      {
        stepNumber: 6,
        instruction: "Aplica sombreado normativo de seguridad industrial en el área de almacenamiento químico con HATCH.",
        cadCommand: "HATCH",
        hint: "Escribe HATCH (o H), selecciona el patrón ANSI31 o SOLID y haz clic dentro de la zona delimitada.",
        validationKey: "hatch_zone"
      }
    ]
  },
  {
    id: "practica-3",
    unitId: "unidad-3",
    title: "Práctica 3: Montaje de Plano Ejecutivo en Layout, Escalas y Ploteo",
    subtitle: "Espacio Papel, Ventanas Gráficas MVIEW y Acotación Normalizada",
    level: "Avanzado",
    estimatedMinutes: 40,
    objective: "Preparar el plano ejecutivo final para construcción: configurar el espacio papel (Layout) en tamaño ARCH D / A1, crear ventanas gráficas escaladas a 1:100 y 1:50, generar acotaciones arquitectónicas en cadena y plotear a PDF.",
    normativeReference: "ISO 5457, ASME Y14.5M y Prácticas de Dibujo de Ingeniería",
    commandsLearned: ["LAYOUT", "MVIEW", "DIMSTYLE", "DIMLINEAR", "DIMCONTINUE", "PLOT"],
    deliverable: "Plano arquitectónico e industrial acotado, con viewport a escala normalizada y exportado a PDF listo para obra.",
    steps: [
      {
        stepNumber: 1,
        instruction: "Pasa del Espacio Modelo al Espacio Papel creando un nuevo plano con el comando LAYOUT.",
        cadCommand: "LAYOUT",
        hint: "Escribe LAYOUT y activa una pestaña de presentación para configurar la hoja de impresión.",
        validationKey: "layout_active"
      },
      {
        stepNumber: 2,
        instruction: "Crea una ventana gráfica rectangular en la hoja para visualizar el modelo con MVIEW.",
        cadCommand: "MVIEW",
        hint: "Escribe MVIEW (o MV) y define una ventana que ocupe el 80% de la hoja de presentación.",
        validationKey: "mview_created"
      },
      {
        stepNumber: 3,
        instruction: "Entra a la ventana gráfica y fija la escala normalizada 1:100 utilizando ZOOM con factor 1/100XP.",
        cadCommand: "ZOOM",
        expectedInput: "1/100XP",
        hint: "Escribe ZOOM y teclea 1/100XP (o 10xp según unidades de papel) para fijar la escala de ingeniería.",
        validationKey: "scale_set"
      },
      {
        stepNumber: 4,
        instruction: "Configura el estilo de cotas industriales con texto legible y flechas de 2.5mm tecleando DIMSTYLE.",
        cadCommand: "DIMSTYLE",
        hint: "Escribe DIMSTYLE (o D) para cargar el estándar de acotación de ingeniería de plantas.",
        validationKey: "dimstyle_loaded"
      },
      {
        stepNumber: 5,
        instruction: "Acota la longitud total de la nave y los claros estructurales en cadena continua con DIMCONTINUE.",
        cadCommand: "DIMCONTINUE",
        hint: "Escribe DIMCONTINUE (o DCO) tras trazar una primera cota lineal para acotar todos los ejes en hilera.",
        validationKey: "dims_placed"
      },
      {
        stepNumber: 6,
        instruction: "Inicia la configuración de impresión y exportación del plano en PDF de alta resolución con PLOT.",
        cadCommand: "PLOT",
        hint: "Escribe PLOT (o Ctrl+P), selecciona 'AutoCAD PDF (General Documentation)' y haz clic en trazado.",
        validationKey: "plot_generated"
      }
    ]
  },
  {
    id: "practica-4",
    unitId: "unidad-4",
    title: "Práctica 4: Diagrama P&ID Normativo ISA-5.1 con Bloques Dinámicos",
    subtitle: "Simbología de reactores, bombas, válvulas de control y lazos TAG",
    level: "Intermedio - Avanzado",
    estimatedMinutes: 35,
    objective: "Construir un diagrama de instrumentación y tuberías (P&ID) riguroso bajo la norma ANSI/ISA-5.1: crear bloques de equipos con atributos (TAGs editables), trazar líneas de proceso vs señales neumáticas y enlazar lazos de control TIC/PIC.",
    normativeReference: "ANSI/ISA-5.1-2009 (Identificación y símbolos de instrumentación) y ASME B31.3",
    commandsLearned: ["BLOCK", "INSERT", "ATTDEF", "BEDIT", "LINETYPE", "LEADER"],
    deliverable: "Diagrama P&ID con reactor agitado R-101, bomba centrífuga P-102, lazo de control de temperatura y válvula FCV.",
    steps: [
      {
        stepNumber: 1,
        instruction: "Dibuja el reactor químico con chaqueta térmica y conviértelo en bloque reutilizable con el comando BLOCK.",
        cadCommand: "BLOCK",
        hint: "Escribe BLOCK (o B), asígnale el nombre 'REACTOR_R101' y selecciona su punto de inserción central.",
        validationKey: "block_created"
      },
      {
        stepNumber: 2,
        instruction: "Define atributos editables para el TAG del equipo (ejemplo: 'R-101') utilizando ATTDEF.",
        cadCommand: "ATTDEF",
        hint: "Escribe ATTDEF, define el Tag como 'EQUIP_TAG' y el valor por defecto 'R-101'.",
        validationKey: "attdef_added"
      },
      {
        stepNumber: 3,
        instruction: "Inserta el bloque de la bomba centrífuga de recirculación P-102A con el comando INSERT.",
        cadCommand: "INSERT",
        hint: "Escribe INSERT (o I), selecciona la bomba de la librería e insértala en la coordenada designada.",
        validationKey: "insert_pump"
      },
      {
        stepNumber: 4,
        instruction: "Carga y asigna el tipo de línea discontinua (HIDDEN o DASHED) para representar la señal de instrumentación eléctrica.",
        cadCommand: "LINETYPE",
        hint: "Escribe LINETYPE, pulsa Load y selecciona una línea punteada para señales de transmisores a controladores.",
        validationKey: "linetype_dashed"
      },
      {
        stepNumber: 5,
        instruction: "Conecta el transmisor de temperatura TT-101 con la válvula neumática TCV-101 trazando una línea de señal.",
        cadCommand: "LINE",
        hint: "Escribe LINE (o L) y conecta la burbuja de instrumentación con el actuador de la válvula de control.",
        validationKey: "signal_connected"
      },
      {
        stepNumber: 6,
        instruction: "Añade directrices de anotación técnica de especificación de tubería (ejemplo: 4\"-CS-150#) con LEADER.",
        cadCommand: "LEADER",
        hint: "Escribe LEADER (o QLEADER) y señala la línea de proceso para rotular el diámetro y material de la tubería.",
        validationKey: "leader_labeled"
      }
    ]
  },
  {
    id: "practica-5",
    unitId: "unidad-5",
    title: "Práctica 5: Emplazamiento Topográfico y Zonificación con Capas (LAYERS)",
    subtitle: "Superposición de capas catastrales, viales y referencias externas (XREF)",
    level: "Intermedio",
    estimatedMinutes: 30,
    objective: "Gestionar el proyecto de implantación en el terreno mediante capas especializadas según la norma ISO 13567, insertar un plano topográfico como referencia externa (XREF) y calcular áreas de desplante y coeficientes de ocupación (COS).",
    normativeReference: "Norma ISO 13567 (Organización de capas CAD) y Reglamentos de Desarrollo Urbano",
    commandsLearned: ["LAYER", "XREF", "ATTACH", "AREA", "LAYISO", "MEASUREGEOM"],
    deliverable: "Plano de localización general con capas cromáticas ordenadas y reporte de área total del predio vs área construida.",
    steps: [
      {
        stepNumber: 1,
        instruction: "Abre el Administrador de Capas tecleando LAYER para crear la estructura de ingeniería del proyecto.",
        cadCommand: "LAYER",
        hint: "Escribe LAYER (o LA). Crea capas: 01_TOPOGRAFIA, 02_NAVE, 03_EQUIPOS, 04_VIALES, 05_COTAS.",
        validationKey: "layers_created"
      },
      {
        stepNumber: 2,
        instruction: "Enlaza el plano topográfico y curvas de nivel del predio como referencia externa con XREF.",
        cadCommand: "XREF",
        hint: "Escribe XREF (o XR) y adjunta el plano base del terreno para mantener el archivo principal ligero.",
        validationKey: "xref_attached"
      },
      {
        stepNumber: 3,
        instruction: "Aísla temporalmente la capa de la nave industrial para verificar interferencias con LAYISO.",
        cadCommand: "LAYISO",
        hint: "Escribe LAYISO y selecciona un elemento de la nave. Todas las demás capas se ocultarán o bloquearán.",
        validationKey: "layer_isolated"
      },
      {
        stepNumber: 4,
        instruction: "Restaura la visibilidad de todas las capas del dibujo utilizando el comando LAYUNISO.",
        cadCommand: "LAYUNISO",
        hint: "Escribe LAYUNISO para volver a visualizar todo el conjunto del proyecto de localización.",
        validationKey: "layer_unisolate"
      },
      {
        stepNumber: 5,
        instruction: "Calcula el área exacta y perímetro del polígono del predio industrial con el comando AREA.",
        cadCommand: "AREA",
        hint: "Escribe AREA, selecciona la opción Object (O) y haz clic en el perímetro del terreno.",
        validationKey: "area_computed"
      },
      {
        stepNumber: 6,
        instruction: "Verifica las distancias mínimas de retiro a colindancias vecinas (mínimo 10m por norma) con MEASUREGEOM.",
        cadCommand: "MEASUREGEOM",
        hint: "Escribe MEASUREGEOM (o DIST) y mide desde el muro de la nave hasta la línea del lindero.",
        validationKey: "distance_verified"
      }
    ]
  },
  {
    id: "practica-6",
    unitId: "unidad-6",
    title: "Práctica 6: Extracción Automatizada de Datos y Catálogo de Conceptos",
    subtitle: "DATAEXTRACTION de bloques y generación de tablas para presupuesto",
    level: "Avanzado",
    estimatedMinutes: 30,
    objective: "Extraer automáticamente la información técnica cuantitativa desde el plano CAD (conteo de equipos, longitudes de tubería, válvulas e instrumentación) para alimentar el catálogo de conceptos y el estudio económico de la planta.",
    normativeReference: "Estándares AACE de Estimación de Costos de Capital y NIF C-6",
    commandsLearned: ["DATAEXTRACTION", "TABLE", "BCOUNT", "FIELD", "DATALINK"],
    deliverable: "Tabla de metrados generada automáticamente en el plano y exportada a CSV para el presupuesto de inversión.",
    steps: [
      {
        stepNumber: 1,
        instruction: "Ejecuta un conteo preliminar rápido de todos los bloques de equipos insertados en el plano con BCOUNT.",
        cadCommand: "BCOUNT",
        hint: "Escribe BCOUNT y presiona Enter. La consola listará la cantidad de cada equipo identificado en el dibujo.",
        validationKey: "bcount_run"
      },
      {
        stepNumber: 2,
        instruction: "Inicia el asistente de extracción inteligente de datos de ingeniería tecleando DATAEXTRACTION.",
        cadCommand: "DATAEXTRACTION",
        hint: "Escribe DATAEXTRACTION (o EATTEXT) para abrir el asistente de filtrado de objetos y atributos.",
        validationKey: "dataextract_started"
      },
      {
        stepNumber: 3,
        instruction: "Filtra la extracción seleccionando únicamente los bloques de la categoría EQUIPOS_PROCESO.",
        cadCommand: "FILTER",
        hint: "Marca únicamente los objetos tipo Bloque y excluye líneas auxiliares y cotas.",
        validationKey: "filter_applied"
      },
      {
        stepNumber: 4,
        instruction: "Inserta la tabla de resumen de cantidades directamente en el espacio de dibujo con el comando TABLE.",
        cadCommand: "TABLE",
        hint: "Escribe TABLE, elige insertar a partir de los datos extraídos y colócala junto al cajetín.",
        validationKey: "table_inserted"
      },
      {
        stepNumber: 5,
        instruction: "Inserta un campo dinámico (FIELD) en el cajetín que refleje el área total construida calculada por AutoCAD.",
        cadCommand: "FIELD",
        hint: "Escribe FIELD, selecciona Objeto -> Polilínea de nave -> Propiedad 'Area' con formato decimal.",
        validationKey: "field_linked"
      },
      {
        stepNumber: 6,
        instruction: "Exporta la relación de conceptos cuantificados a formato de hoja de cálculo con el comando EXPORT.",
        cadCommand: "EXPORT",
        hint: "Escribe EXPORT y genera el archivo CSV con la lista de insumos para el cálculo del CAPEX.",
        validationKey: "export_completed"
      }
    ]
  }
];

export const COURSE_QUIZZES: Record<string, QuizQuestion[]> = {
  "quiz-1": [
    {
      id: 1,
      question: "¿Cuál es el comando en AutoCAD utilizado para configurar las unidades de longitud a sistema métrico y definir la precisión decimal?",
      options: ["UNITS", "LIMITS", "SCALE", "DIMSTYLE"],
      correctIndex: 0,
      explanation: "El comando UNITS permite definir el tipo de unidades (decimales, fraccionarias, científicas) y la unidad de escala de inserción (milímetros, metros, pulgadas).",
      cadRelated: true
    },
    {
      id: 2,
      question: "Según la norma NOM-008-SCFI y las buenas prácticas en dibujo de plantas industriales, ¿en qué formato de plantilla se deben guardar las configuraciones de cajetín y capas institucionales?",
      options: [".DWG", ".DWT", ".DXF", ".BAK"],
      correctIndex: 1,
      explanation: "Los archivos con extensión .DWT (AutoCAD Drawing Template) son las plantillas base estandarizadas que conservan capas, estilos de texto, cotas y cajetines.",
      cadRelated: true
    },
    {
      id: 3,
      question: "En el diseño de una planta, ¿qué función cumple el cajetín técnico normalizado (Title Block) según la norma ISO 5457?",
      options: [
        "Decorar la presentación del plano",
        "Identificar legal y técnicamente el proyecto, autor, escala, clave y revisiones",
        "Aumentar el peso del archivo vectorial",
        "Reducir el tamaño de las cotas"
      ],
      correctIndex: 1,
      explanation: "El cajetín técnico concentra los metadatos oficiales del plano: razón social, título de obra, escala, aprobador y control de cambios para validez legal y de construcción.",
      cadRelated: false
    },
    {
      id: 4,
      question: "¿Qué combinación de teclas o comando en AutoCAD activa el modo ortogonal (ORTHO) para garantizar trazos perfectamente perpendiculares a 90 grados?",
      options: ["F3", "F8 o comando ORTHO", "F7", "Ctrl + Z"],
      correctIndex: 1,
      explanation: "La tecla F8 activa/desactiva el modo ORTHOMODE, restringiendo el movimiento del cursor a los ejes X e Y perpendiculares.",
      cadRelated: true
    },
    {
      id: 5,
      question: "Para delimitar el área máxima de trabajo en el Espacio Modelo de una nave de 120 x 80 metros, ¿qué comando de límites se debe utilizar?",
      options: ["ZOOM", "LIMITS", "RECTANG", "PAN"],
      correctIndex: 1,
      explanation: "El comando LIMITS establece las coordenadas de la cuadrícula límite del dibujo (esquina inferior izquierda y superior derecha).",
      cadRelated: true
    }
  ],
  "quiz-2": [
    {
      id: 1,
      question: "Para trazar el espesor de 0.25 metros de un muro perimetral continuo a partir de una polilínea base en AutoCAD, ¿cuál es el comando más eficiente?",
      options: ["MOVE", "OFFSET (Desfase)", "COPY", "SCALE"],
      correctIndex: 1,
      explanation: "OFFSET (tecla rápida O) crea geometrías concéntricas o paralelas a una distancia exacta especificada por el diseñador.",
      cadRelated: true
    },
    {
      id: 2,
      question: "¿Cuál es el ancho mínimo libre recomendado según la norma NOM-001-STPS y NFPA para un pasillo principal donde transitan montacargas en ambos sentidos?",
      options: ["1.20 metros", "2.00 metros", "Mínimo 3.00 a 3.50 metros (ancho de montacargas x 2 + 1m)", "0.90 metros"],
      correctIndex: 2,
      explanation: "La norma de seguridad en edificios y locales estipula que los pasillos de tránsito vehicular deben considerar el ancho de los vehículos más una holgura de seguridad de al menos 0.5 a 1.0 m a cada lado.",
      cadRelated: false
    },
    {
      id: 3,
      question: "¿Qué comando de AutoCAD permite recortar los sobrantes de líneas en intersecciones de muros y vanos de puertas?",
      options: ["EXTEND", "TRIM (Recortar)", "CHAMFER", "EXPLODE"],
      correctIndex: 1,
      explanation: "TRIM (tecla rápida TR) recorta segmentos de objetos que intersectan los bordes de corte seleccionados.",
      cadRelated: true
    },
    {
      id: 4,
      question: "Para clonar una fila de 8 silos de materia prima idénticos con una separación fija entre centros de 4.0 metros, ¿qué herramienta es la más adecuada?",
      options: ["ARRAYRECT (Matriz Rectangular)", "MIRROR", "ROTATE", "STRETCH"],
      correctIndex: 0,
      explanation: "ARRAYRECT permite crear distribuciones ordenadas en filas y columnas con espaciados paramétricos exactos.",
      cadRelated: true
    },
    {
      id: 5,
      question: "¿Qué comando se utiliza para rellenar un área cerrada con patrones gráficos para identificar zonas de riesgo o materiales en un Layout?",
      options: ["GRADIENT", "HATCH (Sombreado)", "SOLID", "COLOR"],
      correctIndex: 1,
      explanation: "El comando HATCH rellena áreas cerradas con tramas estándar (ANSI, ISO) o colores sólidos para señalización industrial.",
      cadRelated: true
    }
  ],
  "quiz-3": [
    {
      id: 1,
      question: "¿En qué espacio de AutoCAD se deben realizar las composiciones finales de láminas, membretes y ventanas gráficas a escala para entrega de planos?",
      options: ["Model Space (Espacio Modelo)", "Layout (Espacio Papel / Presentación)", "3D Navigation Workspace", "Command Prompt"],
      correctIndex: 1,
      explanation: "El espacio Layout o Papel está diseñado específicamente para maquetar láminas de impresión con carátulas a escala 1:1 de la hoja física.",
      cadRelated: true
    },
    {
      id: 2,
      question: "Si una ventana gráfica (Viewport) creada con MVIEW debe mostrar la nave industrial a escala 1:100 (estando el modelo dibujado en milímetros), ¿qué comando y factor se aplica dentro de la ventana?",
      options: ["ZOOM 100", "ZOOM 1/100XP (o 10XP)", "SCALE 100", "PAN 1:100"],
      correctIndex: 1,
      explanation: "El sufijo 'XP' en el comando ZOOM escala la visualización del espacio modelo respecto a las unidades del espacio papel.",
      cadRelated: true
    },
    {
      id: 3,
      question: "¿Qué comando de AutoCAD abre el administrador de estilos de cotas para configurar tamaño de flechas, texto y precisión de acotado?",
      options: ["DIMLINEAR", "DIMSTYLE", "STYLE", "DIMALIGNED"],
      correctIndex: 1,
      explanation: "DIMSTYLE (tecla rápida D) permite crear, modificar y estandarizar familias de cotas para planos de ingeniería.",
      cadRelated: true
    },
    {
      id: 4,
      question: "¿Qué archivo de tabla de estilos de trazado (Plot Style Table) en AutoCAD se utiliza universalmente para imprimir todos los colores del plano en color negro con espesores por plumilla?",
      options: ["acad.ctb", "monochrome.ctb", "color.ctb", "screening50.ctb"],
      correctIndex: 1,
      explanation: "monochrome.ctb asigna salida en tinta negra a todos los colores del dibujo, respetando los grosores asignados a cada color de capa.",
      cadRelated: true
    },
    {
      id: 5,
      question: "En el documento de especificaciones técnicas del proyecto final de una planta, ¿qué estándar rige las tolerancias geométricas y dimensionales?",
      options: ["ASME Y14.5", "NOM-002-SCT", "ISO 9001", "IEEE 802.3"],
      correctIndex: 0,
      explanation: "ASME Y14.5 es la norma internacional de Dimensionamiento y Tolerancias Geométricas (GD&T).",
      cadRelated: false
    }
  ],
  "quiz-4": [
    {
      id: 1,
      question: "De acuerdo con la norma ANSI/ISA-5.1, ¿qué significa un círculo que encierra las letras 'TIC' atravesado por una línea continua horizontal?",
      options: [
        "Transmisor Indicador de Presión en campo",
        "Controlador Indicador de Temperatura montado en panel principal accesible al operador",
        "Válvula de seguridad de caudal",
        "Termómetro analógico bimetálico"
      ],
      correctIndex: 1,
      explanation: "T = Temperatura, I = Indicador, C = Controlador. La línea horizontal en el centro del círculo de instrumentación indica que el instrumento está montado en panel principal accesible al operador.",
      cadRelated: false
    },
    {
      id: 2,
      question: "¿Qué comando de AutoCAD permite definir textos inteligentes y variables dentro de un bloque de equipo (como el TAG o capacidad)?",
      options: ["MTEXT", "ATTDEF (Definición de Atributos)", "TEXTEDIT", "LABEL"],
      correctIndex: 1,
      explanation: "ATTDEF (Attribute Definition) define etiquetas y valores por defecto que se solicitan al usuario cada vez que se inserta el bloque.",
      cadRelated: true
    },
    {
      id: 3,
      question: "¿Cuál es la diferencia entre el comando BLOCK y WBLOCK en AutoCAD?",
      options: [
        "BLOCK crea un bloque que solo existe dentro del archivo actual; WBLOCK lo exporta como un archivo DWG independiente en disco",
        "BLOCK solo funciona con círculos; WBLOCK con polilíneas",
        "WBLOCK es solo para 3D",
        "No hay diferencia, son idénticos"
      ],
      correctIndex: 0,
      explanation: "WBLOCK (Write Block) guarda la geometría y atributos en un archivo .DWG externo para usarlo como librería en cualquier otro proyecto.",
      cadRelated: true
    },
    {
      id: 4,
      question: "¿Cómo se representan convencionalmente las líneas de señal eléctrica de instrumentación en un diagrama P&ID según ISA-5.1?",
      options: [
        "Línea sólida continua muy gruesa",
        "Línea discontinua con trazos cortos o línea con tres barras transversales oblicuas",
        "Línea ondulada en zigzag",
        "Doble línea paralela"
      ],
      correctIndex: 1,
      explanation: "ISA-5.1 define la línea discontinua (dashed line) para señales eléctricas y la línea con marcas de cruz oblicua para señales neumáticas.",
      cadRelated: false
    },
    {
      id: 5,
      question: "¿Qué comando permite editar rápidamente los valores de atributos de un bloque ya insertado en el diagrama?",
      options: ["EATTEDIT", "EXPLODE", "PURGE", "REGEN"],
      correctIndex: 0,
      explanation: "EATTEDIT (Enhanced Attribute Editor) permite modificar el TAG, descripción y propiedades de los atributos de un bloque.",
      cadRelated: true
    }
  ],
  "quiz-5": [
    {
      id: 1,
      question: "¿Cuál es la principal ventaja de utilizar Referencias Externas (XREF) al trabajar con planos topográficos de localización en lugar de copiarlos directamente?",
      options: [
        "Hace que el archivo pese 10 veces más",
        "Mantiene el archivo ligero y actualiza automáticamente los cambios realizados por el topógrafo en el archivo maestro",
        "Convierte los planos vectoriales en imágenes fijas",
        "Borra las capas no utilizadas"
      ],
      correctIndex: 1,
      explanation: "XREF vincula dinámicamente un archivo sin duplicar su geometría en la base de datos local, asegurando sincronización de cambios colaborativos.",
      cadRelated: true
    },
    {
      id: 2,
      question: "En el método de los Factores Ponderados para macrolocalización de plantas, ¿qué representa el peso relativo (ponderación) de cada factor?",
      options: [
        "El costo en dólares de cada terreno",
        "La importancia porcentual asignada a cada criterio estratégico (sumatoria total igual a 1.0 o 100%)",
        "La distancia en kilómetros al puerto más cercano",
        "El número de habitantes del municipio"
      ],
      correctIndex: 1,
      explanation: "Cada factor crítico (energía, mano de obra, logística) recibe un peso según su criticidad para el éxito de la planta, y la suma de pesos ponderados totaliza 100%.",
      cadRelated: false
    },
    {
      id: 3,
      question: "¿Qué comando de AutoCAD calcula el área exacta y perímetro de un predio delimitado por una polilínea cerrada con un solo clic?",
      options: ["LENGTH", "AREA (Opción Object)", "SUM", "PROPERTIES"],
      correctIndex: 1,
      explanation: "El comando AREA con la opción 'Object' calcula instantáneamente el área neta en metros cuadrados y el perímetro.",
      cadRelated: true
    },
    {
      id: 4,
      question: "Para ocultar temporalmente todas las capas del dibujo excepto la capa de límites catastrales y vialidades, ¿qué comando de capas es el más rápido?",
      options: ["LAYOFF", "LAYISO (Aislar capa)", "LAYFRZ", "LAYLCK"],
      correctIndex: 1,
      explanation: "LAYISO aisla la capa seleccionada apagando o bloqueando todas las demás capas del proyecto.",
      cadRelated: true
    },
    {
      id: 5,
      question: "¿Qué comando permite alinear y escalar simultáneamente un plano escaneado del terreno con las coordenadas reales de dos puntos GPS de control?",
      options: ["ALIGN", "MOVE", "ROTATE", "SCALE"],
      correctIndex: 0,
      explanation: "El comando ALIGN traslada, rota y escala una entidad en función de uno, dos o tres pares de puntos de origen y destino.",
      cadRelated: true
    }
  ],
  "quiz-6": [
    {
      id: 1,
      question: "¿Qué potente herramienta de AutoCAD permite generar automáticamente un inventario y listado de todos los equipos, motores y válvulas dibujados en el plano?",
      options: ["DATAEXTRACTION (Extracción de Datos)", "PLOT", "AUDIT", "RENDER"],
      correctIndex: 0,
      explanation: "DATAEXTRACTION examina el dibujo, extrae las propiedades geométricas y atributos de bloques y genera tablas en el dibujo o archivos Excel/CSV.",
      cadRelated: true
    },
    {
      id: 2,
      question: "En la evaluación económica de plantas industriales, ¿qué comprende el CAPEX (Capital Expenditure)?",
      options: [
        "Los sueldos mensuales del personal de intendencia",
        "La inversión de capital en activos fijos tangibles (terrenos, edificios, maquinaria y líneas de proceso)",
        "El pago bimestral de recibo de energía eléctrica",
        "Los gastos de publicidad en redes sociales"
      ],
      correctIndex: 1,
      explanation: "CAPEX es el gasto en bienes de capital necesario para adquirir, construir o mejorar los activos fijos físicos de la planta.",
      cadRelated: false
    },
    {
      id: 3,
      question: "¿Qué comando crea una tabla paramétrica dentro de AutoCAD con filas, columnas y fórmulas matemáticas similares a Excel?",
      options: ["GRID", "TABLE", "SPREADSHEET", "MATRIX"],
      correctIndex: 1,
      explanation: "El comando TABLE crea tablas nativas que admiten fórmulas (SUM, AVERAGE), estilos de celda y enlaces a hojas de cálculo externas.",
      cadRelated: true
    },
    {
      id: 4,
      question: "¿Qué comando rápido de la consola de AutoCAD cuenta en segundos la cantidad exacta de bloques insertados en el dibujo actual?",
      options: ["COUNT / BCOUNT", "SUM", "TOTAL", "STATS"],
      correctIndex: 0,
      explanation: "BCOUNT (Block Count) lista en la consola de comandos el nombre de cada bloque y la cantidad total de ocurrencias en el plano.",
      cadRelated: true
    },
    {
      id: 5,
      question: "En la integración del Precio Unitario (P.U.) para el catálogo de conceptos de una planta, ¿qué elemento NO forma parte del costo directo?",
      options: [
        "El costo del acero inoxidable para la tubería",
        "El salario del soldador calificado que instala la tubería",
        "Los honorarios del director general y seguros de la oficina central (Costo indirecto)",
        "La renta de la grúa utilizada para izar el reactor"
      ],
      correctIndex: 2,
      explanation: "Los gastos de administración central, seguros corporativos y fianzas pertenecen a los Costos Indirectos, no a los directos de la partida.",
      cadRelated: false
    }
  ]
};

export const INDUSTRIAL_NORMS = [
  {
    code: "NOM-001-STPS-2008",
    title: "Edificios, locales, instalaciones y áreas en los centros de trabajo",
    scope: "Dimensiones mínimas de pasillos (mínimo 1.20m para peatones, ancho de montacargas + 1.0m para vehículos), escaleras industriales, plataformas y salidas de emergencia.",
    autocadRule: "Trazar pasillos con línea segmentada de 10cm de espesor y verificar distancias libres de obstáculos."
  },
  {
    code: "NOM-026-STPS-2008",
    title: "Colores y señales de seguridad e higiene, e identificación de fluidos conducidos en tuberías",
    scope: "Código cromático de tuberías: Verde (Agua potable/industrial), Rojo (Red contraincendios), Amarillo (Gases tóxicos o combustibles/vapor), Azul (Aire comprimido).",
    autocadRule: "Configurar capas (LAYERS) con los colores RGB oficiales de la norma para la identificación de servicios en P&ID y planos de planta."
  },
  {
    code: "ANSI/ISA-5.1-2009",
    title: "Instrumentation Symbols and Identification",
    scope: "Simbología internacional para diagramas de tubería e instrumentación (P&ID). Nomenclatura TAG (F=Flujo, L=Nivel, P=Presión, T=Temperatura, V=Válvula, C=Controlador).",
    autocadRule: "Creación de bloques normalizados con círculos de 10mm a escala de impresión y atributos ATTDEF centrados."
  },
  {
    code: "ASME B31.3",
    title: "Process Piping (Tuberías de Proceso Industrial)",
    scope: "Criterios de diseño, materiales, presiones de operación y radios de curvatura mínimos para tuberías en plantas químicas, petroquímicas y de manufactura.",
    autocadRule: "Uso del comando FILLET con radios estándar correspondientes a codos de radio largo (1.5 x Diámetro nominal) y radio corto (1.0 x Diámetro)."
  },
  {
    code: "ISO 13567",
    title: "Estructuración y organización de capas en CAD",
    scope: "Estructura universal de codificación de capas por disciplina: ARQ (Arquitectura), MEC (Mecánica/Equipos), ELE (Eléctrica), TUB (Tuberías), TOP (Topografía).",
    autocadRule: "Nombrar capas con prefijos claros y asignar plumillas en base a función en lugar de color arbitrario."
  },
  {
    code: "NOM-008-SCFI-2002",
    title: "Sistema General de Unidades de Medida",
    scope: "Obligatoriedad del uso del Sistema Internacional (SI) en planos técnicos y proyectos oficiales en territorio mexicano (mm, m, kg, Pa, °C).",
    autocadRule: "Configuración obligatoria del comando UNITS en sistema métrico con precisión de 2 decimales."
  }
];
