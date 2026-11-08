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
  softwareBase: "Autodesk AutoCAD 2026 / AutoCAD Plant 3D Industrial Tools",
};

export const COURSE_UNITS: Unit[] = [
  {
    id: "unidad-1",
    number: "UNIDAD I",
    title: "Contexto Técnico y Económico en el Diseño de una Planta",
    description: "Fundamentos epistemológicos de la ingeniería, evolución histórica desde la era industrial analógica hasta los sistemas CAD/BIM modernos, metodologías de diseño y análisis del entorno socioeconómico bajo normativas oficiales.",
    cadLevel: "Básico",
    cadFocus: "Configuración del entorno CAD, sistemas de unidades métricas/anglosajonas (UNITS), límites de dibujo (LIMITS), rejilla y forzado de cursor (GRID, SNAP), estilos de texto técnico y creación de plantilla industrial (.DWT) con cajetín normalizado.",
    practiceId: "practica-1",
    quizId: "quiz-1",
    subtopics: [
      {
        id: "1.1",
        title: "I.1 Ciencia, tecnología e ingeniería",
        content: "La ciencia genera conocimiento sistemático a través de leyes universales; la tecnología instrumentaliza dicho conocimiento en técnicas y herramientas; y la ingeniería sintetiza ambos para resolver problemas prácticos bajo restricciones de costo, tiempo, seguridad y sostenibilidad ambiental. En el diseño de plantas, el ingeniero industrial actúa como arquitecto de sistemas productivos complejos, integrando operaciones unitarias, flujos logísticos, ergonomía y rentabilidad financiera.",
        industrialExample: "En una planta química de síntesis de bioetanol, la ciencia aporta la cinética de fermentación; la tecnología provee los biorreactores y membranas de destilación; y la ingeniería diseña la integración energética, el layout de seguridad y el plan de producción continuo.",
        autocadConcept: "El dibujo asistido por computadora (CAD) es el lenguaje gráfico formal de la ingeniería. Transforma bocetos conceptuales en especificaciones geométricas exactas. El primer paso crítico en AutoCAD es parametrizar las unidades de medida (milímetros para componentes mecánicos y metros para obra civil/naves industriales) para evitar colisiones de escala.",
        autocadCommands: ["UNITS", "LIMITS", "GRID", "SNAP", "MEASUREINIT"],
        commandSyntax: "Command: UNITS\n-> Seleccionar 'Decimales', Precisión '0.00', Escala de inserción 'Milímetros' o 'Metros'.\nCommand: LIMITS\n-> Lower left: 0,0 | Upper right: 120,80",
        industrialNorms: ["NOM-008-SCFI-2002 (Sistema General de Unidades de Medida)", "ISO 128 (Principios generales de presentación en dibujos técnicos)"],
        practicalExercise: {
          title: "Configuración del Espacio de Trabajo Métrico",
          instructions: [
            "Abre un nuevo dibujo en AutoCAD con el comando NEW seleccionando 'acadiso.dwt'.",
            "Ejecuta el comando UNITS y configura precisión en 2 decimales y escala en Metros.",
            "Establece los límites del área con LIMITS: (0,0) a (120,80) metros.",
            "Activa la rejilla visible con GRID a cada 5 metros y forzado SNAP a cada 1 metro.",
            "Ejecuta ZOOM con la opción ALL para encuadrar todo el terreno."
          ],
          terminalInput: "UNITS -> LIMITS 0,0 120,80 -> GRID 5 -> SNAP 1 -> ZOOM ALL",
          expectedResult: "Espacio de trabajo calibrado a escala 1:1 métrica, preparado para el desplante de la nave industrial."
        }
      },
      {
        id: "1.2",
        title: "I.2 Evolución histórica",
        content: "El diseño de plantas industriales ha transitado por cuatro grandes hitos: 1) Primera Revolución Industrial (fábricas a vapor con distribución vertical alrededor de un eje central de transmisión); 2) Segunda Revolución Industrial (distribución lineal y producción en masa introducida por Henry Ford); 3) Tercera Revolución (manufactura celular, automatización flexible y control estadístico japonés); y 4) Industria 4.0 (plantas modulares, gemelos digitales e internet de las cosas).",
        industrialExample: "La transición de líneas rígidas automotrices a celdas modulares en 'U' redujo las distancias de transporte interno de materiales hasta en un 65% y los inventarios en proceso (WIP) a la mitad.",
        autocadConcept: "El software CAD nació en el MIT con Sketchpad (1963) de Ivan Sutherland. En 1982, Autodesk democratizó el diseño técnico con AutoCAD. Hoy, la gestión documental exige control de versiones (DWG vs DXF), uso de plantillas maestras (.DWT) y compatibilidad con modelos tridimensionales paramétricos.",
        autocadCommands: ["NEW", "SAVEAS", "OPTIONS", "WORKSPACE", "DXFOUT"],
        commandSyntax: "Command: SAVEAS\n-> Seleccionar tipo de archivo: 'AutoCAD Drawing Template (*.dwt)'\n-> Nombre: 'PLANTAS_AZTLAN_NORMALIZADA.dwt'",
        industrialNorms: ["ISO 13567 (Estructuración y denominación de capas en CAD)", "ANSI Y14.1 (Drawing Sheet Size and Format)"],
        practicalExercise: {
          title: "Creación de Plantilla Institucional de Dibujo (.DWT)",
          instructions: [
            "Configura las variables de sistema de AutoCAD para trabajo industrial en 2D.",
            "Crea los estilos de texto normalizados (técnico Arial o Romanc con altura fija).",
            "Guarda el archivo mediante SAVEAS seleccionando formato AutoCAD Template (.DWT).",
            "Asigna la descripción oficial: 'Plantilla de Plantas Industriales Universidad Aztlán 2026'."
          ],
          terminalInput: "OPTIONS -> STYLE -> SAVEAS PLANTAS_AZTLAN.dwt",
          expectedResult: "Archivo .DWT maestro que servirá como base para todos los planos del curso."
        }
      },
      {
        id: "1.3",
        title: "I.3 Diseño en Ingeniería",
        content: "El método de diseño en ingeniería es un proceso iterativo de toma de decisiones que incluye: 1) Definición del problema y metas de producción; 2) Recopilación de información técnica y regulatoria; 3) Generación de conceptos alternativos de distribución; 4) Modelado matemático y espacial; 5) Evaluación multicriterio y selección del diseño óptimo; y 6) Elaboración de planos ejecutivos y especificaciones de construcción.",
        industrialExample: "Al diseñar una planta cervecera de 500,000 hectolitros/año, se modelan flujos por gravedad para minimizar el bombeo de mosto caliente, reduciendo el consumo de energía eléctrica y tuberías inoxidables.",
        autocadConcept: "El trazado geométrico riguroso requiere el dominio de los tres sistemas de coordenadas de AutoCAD: Cartesianas absolutas (X, Y), Cartesianas relativas (@ΔX, ΔY) y Polares relativas (@Distancia<Ángulo). Combinadas con el sistema OSNAP (End, Mid, Center, Node), garantizan precisión milimétrica sin holguras indeseadas.",
        autocadCommands: ["LINE", "PLINE", "RECTANG", "OSNAP", "ORTHO", "DIST"],
        commandSyntax: "Command: LINE\n-> Specify first point: 10,10\n-> Specify next point: @80,0 (80m en X)\n-> Specify next point: @0,50 (50m en Y)\n-> Specify next point: @-80,0\n-> Specify next point: C (Close)",
        industrialNorms: ["NOM-026-STPS (Colores y señales de seguridad e higiene)", "ISO 5457 (Formatos y presentación de hojas de dibujo)"],
        practicalExercise: {
          title: "Trazado de Nave Industrial con Coordenadas Relativas",
          instructions: [
            "Inicia el comando PLINE desde el punto de origen 10,10.",
            "Traza la fachada frontal de 80 metros en el eje X (@80,0).",
            "Avanza 50 metros en el eje Y hacia el fondo de la parcela (@0,50).",
            "Regresa 80 metros hacia la izquierda (@-80,0) y cierra la polilínea con 'C'.",
            "Verifica el perímetro exacto con el comando DIST."
          ],
          terminalInput: "PLINE 10,10 -> @80,0 -> @0,50 -> @-80,0 -> C -> DIST",
          expectedResult: "Polígono perimetral de 4,000 m² cerrado y validado sin desfases angulares."
        }
      },
      {
        id: "1.4",
        title: "I.4 Contexto socio-económico y técnico",
        content: "Toda planta industrial interactúa con su entorno ecológico y social: demanda de mano de obra local, generación de residuos sólidos, descargas de aguas residuales, huella de carbono, impacto vial y cumplimiento con las normas de seguridad e higiene en el trabajo. La viabilidad económica depende de la tasa de retorno, la disponibilidad de servicios públicos (alta tensión CFE, agua potable, drenaje industrial) y las licencias ambientales (MIA y dictámenes de Protección Civil).",
        industrialExample: "Una planta de manufactura automotriz debe prever vialidades con carriles de desaceleración para 40 tráilers diarios, estacionamiento para 300 obreros y planta de tratamiento de aguas cero descargas.",
        autocadConcept: "Para que un plano tenga validez legal y técnica en licitaciones o trámites de construcción, debe contar con un Cajetín Técnico Normalizado (Title Block). Este contiene: nombre del proyecto, ubicación, razón social, clave de plano, escala, fecha, firma del proyectista y cuadro de revisiones.",
        autocadCommands: ["RECTANG", "OFFSET", "MTEXT", "STYLE", "ATTDEF", "TRIM"],
        commandSyntax: "Command: RECTANG\n-> Corner: 0,0 | Other corner: 210,110 (mm)\nCommand: OFFSET -> Distance: 5mm\nCommand: MTEXT -> Insertar datos de proyecto y acreditación",
        industrialNorms: ["NOM-001-SEDE-2012 (Instalaciones eléctricas)", "OSHA 1910 (General Industry Safety Regulations)"],
        practicalExercise: {
          title: "Construcción del Membrete y Cajetín Oficial",
          instructions: [
            "Traza el marco exterior del cajetín de 220 x 110 mm.",
            "Aplica un desfase interno de 5 mm con OFFSET para margen de seguridad.",
            "Divide horizontalmente en 3 cuadrantes: Identificación institucional, Datos del plano y Firmas de aprobación.",
            "Inserta el texto técnico institucional con MTEXT utilizando tipografía Arial técnica."
          ],
          terminalInput: "RECTANG 0,0 220,110 -> OFFSET 5 -> LINE -> MTEXT",
          expectedResult: "Cajetín institucional listo para ser incorporado en las presentaciones de Layout."
        }
      }
    ]
  },
  {
    id: "unidad-2",
    number: "UNIDAD II",
    title: "Etapas y Elementos en el Diseño de una Planta",
    description: "Metodología integral del diseño de instalaciones fabriles, desde la detección de factores iniciadores, investigación de mercado y proceso, hasta el anteproyecto y layout ejecutivo en AutoCAD.",
    cadLevel: "Básico - Intermedio",
    cadFocus: "Comandos de dibujo de entidades compuestas (PLINE, RECTANG, CIRCLE, ARC), comandos de modificación avanzada (OFFSET, TRIM, EXTEND, FILLET, CHAMFER, MOVE, COPY, ROTATE, ARRAY, MIRROR) y cálculo de pasillos y holguras según ergonomía industrial.",
    practiceId: "practica-2",
    quizId: "quiz-2",
    subtopics: [
      {
        id: "2.1",
        title: "II.1 Puntos a considerar en el diseño de una planta",
        content: "Los 6 factores clave de planeación son: 1) Flujo unidireccional de materiales sin retrocesos (evitar cruces de materias primas con productos terminados); 2) Espacios mínimos de seguridad y mantenimiento para desensamble de maquinaria; 3) Flexibilidad para ampliaciones modulares futuras al 5 o 10 años; 4) Accesibilidad para montacargas y transporte interno; 5) Confort ergonómico, iluminación y ventilación adecuada; y 6) Rutas de evacuación y salidas de emergencia expeditas.",
        industrialExample: "En una planta de alimentos, los ingredientes crudos nunca cruzan el área de empaque estéril para evitar contaminación cruzada (HACCP).",
        autocadConcept: "El trazado perimetral de naves y muros estructurales se realiza con polilíneas cerradas (PLINE) con un ancho asignado, aplicando desfases paralelos (OFFSET) para representar muros perimetrales de 0.25 a 0.30 m y divisiones internas de 0.15 m.",
        autocadCommands: ["PLINE", "OFFSET", "JOIN", "PEDIT", "BOUNDARY"],
        commandSyntax: "Command: PLINE (trazar contorno)\nCommand: OFFSET -> Distance: 0.25 -> Select polyline -> Click hacia adentro",
        industrialNorms: ["NOM-001-STPS-2008 (Edificios, locales e instalaciones)", "NOM-005-STPS (Sustancias químicas peligrosas)"],
        practicalExercise: {
          title: "Trazado de Muros Perimetrales Estructurales",
          instructions: [
            "Dibuja el perímetro de 80 x 50 metros con PLINE.",
            "Ejecuta OFFSET a una distancia de 0.30 m hacia el interior para crear el espesor del muro de carga.",
            "Crea muros divisorios para oficinas y almacén con líneas paralelas desfasadas a 0.15 m."
          ],
          terminalInput: "PLINE -> OFFSET 0.30 -> OFFSET 0.15",
          expectedResult: "Estructura arquitectónica base de la nave industrial con espesores normalizados."
        }
      },
      {
        id: "2.2",
        title: "II.2 Papel del Ingeniero y objetivos del diseño",
        content: "El ingeniero industrial actúa como director técnico interdisciplinario. Coordina a ingenieros civiles, químicos, mecánicos, eléctricos y arquitectos. Sus objetivos principales son: maximizar la productividad por metro cuadrado ($/m²), minimizar distancias de acarreo de materiales, garantizar cero accidentes laborales y optimizar el costo total de operación.",
        industrialExample: "Al redistribuir las prensas y troqueladoras en una planta metalmecánica, el ingeniero logró reducir los tiempos de ciclo en un 22% al disminuir 14 kilómetros diarios de recorrido de montacargas.",
        autocadConcept: "La coordinación de ingeniería requiere cortes exactos de accesos, portones corredizos y salidas de emergencia en muros mediante TRIM, EXTEND y FILLET con radio de curvatura para esquinas de circulación.",
        autocadCommands: ["TRIM", "EXTEND", "FILLET", "BREAK", "ALIGN"],
        commandSyntax: "Command: TRIM -> Select cutting edges -> Click en segmentos a suprimir\nCommand: FILLET -> R -> 2.5 (radio de giro montacargas)",
        industrialNorms: ["NFPA 101 (Life Safety Code)", "ISO 6385 (Principios ergonómicos)"],
        practicalExercise: {
          title: "Apertura de Andenes y Chaflanes de Tránsito",
          instructions: [
            "Traza dos líneas de referencia separadas 4.5 metros en el muro frontal para el andén de carga.",
            "Usa el comando TRIM para recortar el muro y abrir el acceso del tráiler.",
            "Aplica FILLET con radio de 2.0 m en las intersecciones de pasillos internos."
          ],
          terminalInput: "TRIM -> FILLET R 2.0",
          expectedResult: "Accesos vehiculares y pasillos con radio ergonómico para giro de montacargas."
        }
      },
      {
        id: "2.3",
        title: "II.3 Factores iniciadores",
        content: "Los factores que detonan un proyecto de planta son: incremento de demanda de mercado que sobrepasa la capacidad instalada, desarrollo de un nuevo producto, obsolescencia tecnológica de la maquinaria existente, relocalización geográfica estratégica (Nearshoring), o imposiciones legales y ambientales.",
        industrialExample: "Una empresa de dispositivos médicos decide construir una nueva planta Clase 10,000 (Cleanroom) debido a la exigencia de la FDA de certificar ambientes libres de partículas.",
        autocadConcept: "Para conceptualizar rápidamente alternativas ante factores iniciadores, se recurre a bloques y módulos espaciales de estaciones de trabajo, duplicándolos y desplazándolos con precisión mediante MOVE, COPY y STRETCH.",
        autocadCommands: ["RECTANG", "MOVE", "COPY", "STRETCH", "SCALE"],
        commandSyntax: "Command: COPY -> Select workstation -> Base point: 0,0 -> Displacement: @6,0\nCommand: MOVE -> Punto base -> Punto destino",
        industrialNorms: ["ISO 9001 (Control de diseño)", "NOM-025-STPS (Iluminación en centros de trabajo)"],
        practicalExercise: {
          title: "Modulación de Celda de Trabajo Inicial",
          instructions: [
            "Diseña un módulo de estación de trabajo de 3.0 x 2.0 metros.",
            "Copia la estación a lo largo de un eje con separación libre de 1.8 metros.",
            "Verifica que el pasillo de operadores cumpla con el estándar de 1.20 metros mínimos."
          ],
          terminalInput: "RECTANG 3,2 -> COPY @4.8,0 -> DIST",
          expectedResult: "Línea preliminar de celdas productivas con holguras ergonómicas verificadas."
        }
      },
      {
        id: "2.4",
        title: "II.4 Evolución del proyecto",
        content: "El ciclo de vida de ingeniería se estructura en etapas sucesivas (Stage-Gate): 1) Estudio de perfil o conceptual (FEL 1); 2) Ingeniería básica o prefactibilidad (FEL 2 - dimensionamiento de áreas y balances); 3) Ingeniería de detalle (FEL 3 - planos constructivos, listas de tuberías y compras); 4) Procura y construcción; y 5) Comisionamiento, puesta en marcha y rampa de producción.",
        industrialExample: "Invertir un 5% adicional en la fase de ingeniería de detalle antes de colar concreto ahorra hasta un 25% de sobrecostos por interferencias y retrabajos en campo.",
        autocadConcept: "A medida que el proyecto evoluciona, se generan agrupaciones ordenadas de componentes como bancos de silos, tanques de almacenamiento y estanterías selectivas (Racks) mediante matrices paramétricas ARRAY (rectangular o polar).",
        autocadCommands: ["ARRAYRECT", "ARRAYPOLAR", "EXPLODE", "GROUP"],
        commandSyntax: "Command: ARRAYRECT\n-> Select object -> Rows: 3, Columns: 5 -> Row spacing: 4.0m, Col spacing: 3.5m",
        industrialNorms: ["RMI MH16.1 (Especificación para racks de almacenamiento industrial)"],
        practicalExercise: {
          title: "Generación de Batería de Almacenamiento con ARRAYRECT",
          instructions: [
            "Dibuja un silo cilíndrico de materia prima con CIRCLE de radio 1.5 metros.",
            "Aplica ARRAYRECT para crear una matriz de 3 filas por 4 columnas.",
            "Fija una distancia entre centros de 5 metros en ambos ejes.",
            "Verifica la distancia libre entre envolventes (debe ser de al menos 2 metros)."
          ],
          terminalInput: "CIRCLE 1.5 -> ARRAYRECT Rows 3 Cols 4 Spacing 5",
          expectedResult: "Batería de 12 silos perfectamente alineados con holgura de seguridad."
        }
      },
      {
        id: "2.5",
        title: "II.5 Análisis de oportunidades a la prueba conceptual",
        content: "La prueba conceptual (Proof of Concept) valida la viabilidad física del proceso antes de comprometer grandes inversiones. Evalúa balances preliminares, rendimientos de materia prima y simula la disposición geométrica para comprobar que los equipos caben en el predio disponible con retiros reglamentarios.",
        industrialExample: "Para una planta recicladora de llantas, la prueba conceptual demostró que el patio de acopio requería el 60% del terreno total para evitar incendios, lo que obligó a buscar un predio más amplio.",
        autocadConcept: "Se emplean polígonos representativos de 'bultos' o cajas envolventes de maquinaria, acotados con dimensiones máximas de catálogo para validar los radios de giro y áreas de mantenimiento.",
        autocadCommands: ["POLYGON", "RECTANG", "AREA", "PROPERTIES"],
        commandSyntax: "Command: AREA -> Object -> Seleccionar polígono de la nave\nResultado: Área total construida vs superficie libre de terreno",
        industrialNorms: ["Reglamentos locales de construcción (Coeficientes de Ocupación COS y CUS)"],
        practicalExercise: {
          title: "Verificación de Huella de Desplante (COS)",
          instructions: [
            "Delimita el perímetro del terreno de 10,000 m².",
            "Traza el contorno de la nave propuesta de 4,500 m².",
            "Verifica con el comando AREA que el COS no exceda el 60% permitido por la normativa urbana local."
          ],
          terminalInput: "AREA O (seleccionar nave) -> Calcular COS = 4500/10000 = 45%",
          expectedResult: "Cumplimiento normativo de uso de suelo industrial validado."
        }
      },
      {
        id: "2.6",
        title: "II.6 Investigación de mercado",
        content: "Determina la capacidad de diseño de la planta ($Q$ en unidades/año o ton/día). Analiza el comportamiento histórico y proyectado de la oferta y la demanda, elasticidad de precios, canales de distribución, localización de los clientes y estacionalidad de la demanda para definir el tamaño de la planta y los inventarios de seguridad.",
        industrialExample: "Si el mercado demanda 12,000 ton/año con un pico estacional navideño del 35%, la planta debe dimensionarse con flexibilidad para operar a 1,400 ton/mes en temporada alta.",
        autocadConcept: "El volumen de producción define el tamaño físico de los almacenes de materia prima y producto terminado. En AutoCAD se calcula el área requerida de racks y pasillos multiplicando la cantidad de tarimas calculadas por su huella geométrica.",
        autocadCommands: ["MEASURE", "DIVIDE", "DIST", "TABLE"],
        commandSyntax: "Cálculo: Tarimas requeridas * 1.5 m² = Superficie de almacén.\nCommand: RECTANG -> Definir área de almacén calculada",
        industrialNorms: ["NOM-006-STPS (Almacenamiento y manejo de materiales)"],
        practicalExercise: {
          title: "Dimensionamiento del Almacén de Producto Terminado",
          instructions: [
            "Con una demanda de 800 tarimas y apilado a 4 niveles, se calculan 200 posiciones en piso.",
            "Calcula el área neta requerida: 200 pos * 3.2 m² (incluyendo pasillo de montacargas) = 640 m².",
            "Traza en AutoCAD un almacén de 32 metros de largo por 20 metros de fondo con RECTANG."
          ],
          terminalInput: "RECTANG 32,20 -> HATCH ANSI31",
          expectedResult: "Área de almacén trazada conforme al estudio de demanda de mercado."
        }
      },
      {
        id: "2.7",
        title: "II.7 Investigación del proceso",
        content: "Selección de la tecnología de transformación. Implica comparar diagramas de flujo de proceso (químico, mecánico o biológico), consumos energéticos específicos por tonelada, generación de efluentes, disponibilidad de refacciones y grado de automatización (manual, semiautomático o totalmente automatizado con robots/SCADA).",
        industrialExample: "En una planta de tratamiento térmico, se compara horno continuo de banda vs hornos de atmósfera controlada batch; el horno continuo ahorra 18% de gas natural para altas producciones homogéneas.",
        autocadConcept: "La secuencia de operaciones se traslada a la planta mediante el diagrama de relaciones de actividades (SLP de Richard Muther), trazando líneas de conexión de intensidad de flujo entre áreas funcionales en capas diferenciadas.",
        autocadCommands: ["LAYER", "LINETYPE", "LINE", "COLOR"],
        commandSyntax: "Command: LAYER -> Crear capa 'FLUJO_PROCESO' -> Color: Rojo\nCommand: LINETYPE -> Asignar línea continua gruesa (0.50 mm)",
        industrialNorms: ["ISO 10628 (Diagramas de proceso de plantas químicas)"],
        practicalExercise: {
          title: "Trazado del Vector de Flujo Principal de Proceso",
          instructions: [
            "Crea la capa '03_FLUJO_MATERIALES' con color Rojo y grosor 0.50 mm.",
            "Traza con PLINE la ruta de proceso: Recepción -> Molido -> Mezclado -> Envasado -> Embarque.",
            "Verifica que el flujo sea lineal continuo en 'I' o 'U' sin cruces en 'X'."
          ],
          terminalInput: "LAYER New 03_FLUJO_MATERIALES -> PLINE",
          expectedResult: "Línea de flujo principal continua trazada sin retrocesos."
        }
      },
      {
        id: "2.8",
        title: "II.8 Estudios a nivel planta piloto",
        content: "La planta piloto es una instalación a escala reducida (típicamente entre 1:10 y 1:100 de la planta comercial) que permite evaluar el comportamiento de los fluidos, corrosión de materiales, ensuciamiento de tuberías, parámetros cinéticos reales y balance de masa a régimen continuo antes de construir la planta comercial.",
        industrialExample: "Una farmacéutica opera un reactor piloto de 50 litros para validar la cristalización estéril de un antibiótico antes de construir el reactor comercial de 5,000 litros.",
        autocadConcept: "El escalamiento geométrico y volumétrico de equipos se representa en CAD aplicando factores de escala paramétricos con el comando SCALE, conservando las proporciones dimensionales normalizadas.",
        autocadCommands: ["SCALE", "BLOCK", "PROPERTIES"],
        commandSyntax: "Command: SCALE\n-> Select objects: Reactor piloto\n-> Base point: Centro del reactor\n-> Scale factor: 4.64 (Factor de escalamiento volumétrico ∛100)",
        industrialNorms: ["ASME Boiler and Pressure Vessel Code (Sección VIII)"],
        practicalExercise: {
          title: "Escalamiento Gráfico de Reactor Piloto a Industrial",
          instructions: [
            "Dibuja el bloque de reactor piloto de 0.60 m de diámetro.",
            "Aplica el comando SCALE con factor de escala 3.5 para obtener el reactor industrial de 2.10 m.",
            "Coloca ambos bloques en el plano para comparar el incremento de huella de mantenimiento."
          ],
          terminalInput: "CIRCLE 0.30 -> SCALE Factor 3.5",
          expectedResult: "Reactor escalado con dimensiones comerciales verídicas."
        }
      },
      {
        id: "2.9",
        title: "II.9 Proyectos preliminar",
        content: "El proyecto preliminar o Anteproyecto sintetiza todos los estudios anteriores en un paquete coherente: Plano de Implantación General preliminar (Plot Plan), Diagrama de Flujo en Bloques (BFD), estimación de costos preliminares de orden de magnitud (±30%) y descripción de servicios auxiliares necesarios.",
        industrialExample: "El dossier preliminar permite a la junta directiva aprobar el presupuesto de inversión (Capex) para iniciar las licitaciones de ingeniería de detalle y compra de terrenos.",
        autocadConcept: "El plano del anteproyecto integra sombreados de seguridad industrial (HATCH) para zonificar áreas clasificadas: inflamables (patrón ANSI31 rojo), almacenamiento (patrón cruzado amarillo) y áreas de circulación peatonal verde.",
        autocadCommands: ["HATCH", "HATCHEDIT", "MATCHPROP", "EXPORTPDF"],
        commandSyntax: "Command: HATCH\n-> Pattern: ANSI31 -> Scale: 1.0 -> Select area: Almacén de químicos",
        industrialNorms: ["NOM-026-STPS (Colores y señales de seguridad)", "ISO 7010"],
        practicalExercise: {
          title: "Zonificación Cromática y Achurado del Layout",
          instructions: [
            "Crea la capa '07_SOMBREADO_SEGURIDAD'.",
            "Aplica sombreado HATCH con patrón ANSI31 en la zona de almacenamiento de reactivos.",
            "Aplica sombreado sólido verde en la zona de oficinas y comedor.",
            "Añade la leyenda técnica en el membrete identificando el significado de cada textura."
          ],
          terminalInput: "HATCH ANSI31 -> HATCH SOLID -> MTEXT",
          expectedResult: "Layout anteproyecto profesional con zonificación de seguridad normalizada."
        }
      }
    ]
  },
  {
    id: "unidad-3",
    number: "UNIDAD III",
    title: "Proyecto Final",
    description: "Integración formal del dossier ejecutivo de ingeniería de la planta: memoria documentada, catálogo presupuestal, hojas de datos técnicos, juego completo de planos en AutoCAD y especificaciones de servicios de construcción.",
    cadLevel: "Avanzado",
    cadFocus: "Gestión de Espacio Modelo (Model Space) vs Espacio Papel (Layout), creación y escalado normalizado de ventanas gráficas (MVIEW, ZOOM 1/50XP), acotación normalizada (DIMSTYLE), estilos de trazado (CTB) y exportación a PDF para construcción.",
    practiceId: "practica-3",
    quizId: "quiz-3",
    subtopics: [
      {
        id: "3.1",
        title: "III.1 Reporte documentado",
        content: "La memoria descriptiva es el documento rector del proyecto. Contiene: 1) Resumen ejecutivo; 2) Bases de diseño y filosofía de operación; 3) Balances de materia y energía con tablas de corrientes; 4) Justificación técnica de la distribución física adoptada; 5) Memoria de cálculo de instalaciones electromecánicas e hidráulicas; y 6) Análisis de riesgos (HAZOP) y plan de contingencias.",
        industrialExample: "En una planta de producción de pinturas, la memoria descriptiva justifica el uso de motores a prueba de explosión (Clase I, Div 1) en el área de mezclado de solventes volátiles.",
        autocadConcept: "El reporte se complementa con la carátula y lista de planos en el Espacio Papel (Layout) de AutoCAD. Se insertan tablas de revisiones, notas de ingeniería y listas de documentos enlazados con referencias dinámicas.",
        autocadCommands: ["LAYOUT", "PSPACE", "MSPACE", "MTEXT", "FIELD"],
        commandSyntax: "Command: LAYOUT -> New -> 'PLANO_EJECUTIVO_L01'\nCommand: PAGESETUP -> Formato: ARCH D (24x36 pulg)",
        industrialNorms: ["ISO 5457 (Formatos y disposición de elementos en hojas de dibujo)"],
        practicalExercise: {
          title: "Configuración del Espacio Papel para Plano Ejecutivo",
          instructions: [
            "Crea una nueva presentación (Layout) llamada 'PLANO_GENERAL_01'.",
            "Ejecuta PAGESETUP y selecciona trazador 'AutoCAD PDF (General Documentation)'.",
            "Fija el tamaño de papel en ARCH D (914 x 610 mm) con orientación horizontal.",
            "Inserta el cajetín maestro en escala 1:1 en la esquina inferior derecha."
          ],
          terminalInput: "LAYOUT New -> PAGESETUP ARCH D -> INSERT CAJETIN",
          expectedResult: "Hoja de presentación normalizada lista para acoger las ventanas gráficas del modelo."
        }
      },
      {
        id: "3.2",
        title: "III.2 Presupuesto",
        content: "Estimación del costo total de capital (Total Capital Investment - TCI) desglosado en: Inversión fija (equipos comprados PEC, obra civil, tuberías, instrumentación, electricidad, aislamiento) e Inversión indirecta (ingeniería, supervisión de obra, contingencias del 10 al 15%). Se calculan los índices de costo actualizado utilizando el Chemical Engineering Plant Cost Index (CEPCI).",
        industrialExample: "Para estimar el costo de tuberías en una planta química se emplea el método de factores de Guthrie: Costo de tubería = 0.45 * Costo total de equipos principales.",
        autocadConcept: "AutoCAD permite crear Tablas Inteligentes (TABLE) con fórmulas dinámicas (`SUM`, `AVERAGE`) que suman automáticamente cantidades de materiales extraídos de los planos, garantizando que el presupuesto coincida con lo dibujado.",
        autocadCommands: ["TABLE", "TABLESTYLE", "FIELD", "DATALINK"],
        commandSyntax: "Command: TABLE -> Columns: 5, Rows: 8 -> Encabezados: Clave, Concepto, Unidad, Cantidad, P.U., Total",
        industrialNorms: ["AACE International (Práctica recomendada de estimación de costos)"],
        practicalExercise: {
          title: "Inserción de Tabla Presupuestal en AutoCAD",
          instructions: [
            "Ejecuta el comando TABLE y crea una tabla con 6 columnas.",
            "Agrega partidas de obra: Cimentaciones, Estructura metálica, Tanques, Bombas y Tuberías.",
            "Aplica la fórmula =SUM(F2:F6) en la celda del subtotal para cálculo automático."
          ],
          terminalInput: "TABLE -> Editar celdas -> Formato monetario MXN",
          expectedResult: "Tabla presupuestal paramétrica integrada directamente en el plano."
        }
      },
      {
        id: "3.3",
        title: "III.3 Documento de especificaciones técnicas",
        content: "Las hojas de datos (Equipment Data Sheets) contienen las condiciones de diseño de cada componente: capacidad volumétrica, presión de diseño y de operación, temperatura, materiales de construcción (ej. Acero al carbono A-36, Acero inoxidable 304/316L), tipo de sello mecánico, potencia eléctrica de motor y normas de fabricación (ASME, API, NEMA).",
        industrialExample: "La hoja de datos de una bomba centrífuga de ácido sulfúrico especifica carcasa en aleación Alloy 20, motor de 15 HP a prueba de explosión y sello mecánico doble presurizado.",
        autocadConcept: "Las especificaciones se vinculan en el plano con Estilos de Cotas Paramétricos (DIMSTYLE) y directrices múltiples (MLEADER) que señalan componentes con flechas y notas técnicas estandarizadas.",
        autocadCommands: ["DIMSTYLE", "DIMLINEAR", "DIMALIGNED", "DIMCONTINUE", "MLEADER"],
        commandSyntax: "Command: DIMSTYLE -> Modificar estilo 'PLANTA_AZTLAN'\n-> Flechas: Architectural Tick (2.5mm) -> Texto: Arial (3mm)\nCommand: DIMCONTINUE -> Acotar ejes estructurales en cadena",
        industrialNorms: ["ASME Y14.5 (Dimensionamiento y tolerancias geométricas - GD&T)"],
        practicalExercise: {
          title: "Acotación Continua de Ejes Estructurales",
          instructions: [
            "Configura el estilo de cota 'COTAS_1_100' con unidades decimales y precisión 0.00.",
            "Traza la primera cota lineal entre el eje A y el eje B con DIMLINEAR.",
            "Ejecuta DIMCONTINUE para acotar en hilera consecutiva los ejes C, D, E y F con un solo clic por eje.",
            "Añade una cota general de extremo a extremo que indique la longitud total de la nave."
          ],
          terminalInput: "DIMSTYLE -> DIMLINEAR -> DIMCONTINUE -> DIMLINEAR",
          expectedResult: "Plano arquitectónico perfectamente acotado en cadena según ASME Y14.5."
        }
      },
      {
        id: "3.4",
        title: "III.4 Diagramas y planos",
        content: "El paquete completo de planos de ingeniería se compone de: 1) Plano de Localización Geográfica (Plot Plan General 1:500 o 1:1000); 2) Plano de Implantación de Nave y Layout de Maquinaria (1:100); 3) Diagramas P&ID bajo norma ISA-5.1; 4) Planos de Tuberías e Isométricos (1:50); y 5) Plano de Rutas de Evacuación y Seguridad (NOM-026-STPS).",
        industrialExample: "En una planta automotriz se generan más de 350 planos ejecutivos para coordinar el montaje de cimientos, robots de soldadura y cabinas de pintura.",
        autocadConcept: "El dominio del comando MVIEW permite crear múltiples ventanas gráficas dentro de un mismo Layout, asignando a cada una su escala exacta de visualización mediante el factor 'XP' (ejemplo: `ZOOM 1/100XP` o `1/50XP`), asegurando que todos los textos y cotas se lean al mismo tamaño al imprimir.",
        autocadCommands: ["MVIEW", "VPORTS", "VPLAYER", "ZOOM XP"],
        commandSyntax: "Command: MVIEW -> Trazar rectángulo de ventana gráfica\n-> Doble clic dentro de ventana -> Command: ZOOM 1/100XP\n-> Doble clic fuera de ventana para regresar a espacio papel",
        industrialNorms: ["ISO 10209 (Documentación técnica de producto)", "ANSI/ISA-5.1"],
        practicalExercise: {
          title: "Composición Multiescala con Ventanas Gráficas MVIEW",
          instructions: [
            "Dentro del Layout, crea una ventana grande con MVIEW para el Layout general a escala 1:100 (`ZOOM 1/100XP`).",
            "Crea dos ventanas menores a la derecha para detalles de anclaje de bombas a escala 1:25 (`ZOOM 1/25XP`).",
            "Bloquea la vista de las ventanas gráficas en sus propiedades (Display Locked = Yes) para evitar que se descalibren al hacer zoom."
          ],
          terminalInput: "MVIEW -> ZOOM 1/100XP -> MVIEW -> ZOOM 1/25XP",
          expectedResult: "Lámina ejecutiva profesional multiescala lista para revisión."
        }
      },
      {
        id: "3.5",
        title: "III.5 Proyecto final de construcción y servicios",
        content: "Detalla las redes de distribución de servicios auxiliares (Utilities): 1) Red de vapor y retorno de condensados; 2) Agua de enfriamiento y torres de enfriamiento; 3) Aire comprimido para instrumentos y potencia (7 bar); 4) Red de agua contraincendios con hidrantes y rociadores; 5) Subestación eléctrica y transformadores; y 6) Drenajes aceitosos, sanitarios y pluviales.",
        industrialExample: "La red de rociadores contraincendios según NFPA 13 debe garantizar un caudal de 500 GPM a 100 PSI durante al menos 90 minutos de reserva hídrica.",
        autocadConcept: "Se configura el ploteo final con PLOT utilizando la tabla de asignación de plumillas `monochrome.ctb`, asignando grosores de línea diferenciados: 0.70 mm para muros perimetrales, 0.50 mm para tuberías principales, 0.25 mm para cotas y 0.18 mm para tramas de sombreado.",
        autocadCommands: ["PLOT", "PUBLISH", "PAGESETUP", "EXPORTPDF"],
        commandSyntax: "Command: PLOT\n-> Printer: 'AutoCAD PDF (General Documentation)'\n-> Plot style table: 'monochrome.ctb'\n-> Quality: High Quality (1200 dpi)\n-> Window / Layout -> Preview -> Plot to PDF",
        industrialNorms: ["NOM-002-STPS-2010 (Prevención contra incendios)", "NFPA 13 (Sistemas de rociadores)"],
        practicalExercise: {
          title: "Generación de Dossier Digital en PDF de Alta Resolución",
          instructions: [
            "Abre el cuadro de diálogo con el comando PLOT.",
            "Asigna la tabla de plumillas monochrome.ctb y activa 'Plot with plot styles'.",
            "Genera una vista previa (Preview) para verificar que los grosores de plumillas estén perfectamente contrastados.",
            "Plotea a archivo PDF con el nombre 'PROYECTO_FINAL_PLANTA_AZTLAN.pdf'."
          ],
          terminalInput: "PLOT -> monochrome.ctb -> Preview -> OK",
          expectedResult: "Archivo PDF de ingeniería de calidad profesional listo para entrega y construcción."
        }
      }
    ]
  },
  {
    id: "unidad-4",
    number: "UNIDAD IV",
    title: "Manejo de la Información en Forma de Diagramas de Flujo",
    description: "Simbología universal de instrumentación y procesos (ANSI/ISA-5.1), balances de materia y dibujo vectorial de diagramas BFD, PFD y P&ID con bloques dinámicos y atributos enlazados.",
    cadLevel: "Intermedio - Avanzado",
    cadFocus: "Creación y edición de Bloques CAD (BLOCK, WBLOCK, BEDIT), definición de atributos vinculados (ATTDEF) para codificación de equipos (KKS / TAG: TK-101, P-102A, V-103), inserción de simbología de válvulas y lazos de control.",
    practiceId: "practica-4",
    quizId: "quiz-4",
    subtopics: [
      {
        id: "4.1",
        title: "IV.1 Módulos básicos de un diagrama de flujo general",
        content: "La jerarquía de diagramas en ingeniería de procesos se divide en: 1) Diagrama de Bloques (BFD - Block Flow Diagram), que muestra las etapas globales sin tuberías; 2) Diagrama de Flujo de Proceso (PFD - Process Flow Diagram), que incluye equipos mayores, temperaturas, presiones y tabla de balances; y 3) Diagrama de Tubería e Instrumentación (P&ID - Piping & Instrumentation Diagram), que representa todas las tuberías con diámetros, válvulas, lazos de control y accesorios.",
        industrialExample: "El P&ID de un separador bifásico muestra la línea de gas de 6 pulg con placa de orificio de medición, la línea de líquido de 4 pulg con válvula de control de nivel LIC, y la válvula de seguridad y alivio PSV calibrada a 150 PSI.",
        autocadConcept: "El dibujo de diagramas esquemáticos no requiere escala física 1:1, sino proporcionalidad y estandarización. Se diseña una librería de bloques reutilizables con puntos de inserción centrados en las boquillas de conexión.",
        autocadCommands: ["BLOCK", "WBLOCK", "INSERT", "BEDIT"],
        commandSyntax: "Command: BLOCK\n-> Name: 'BOMBA_CENTRIFUGA_ISO'\n-> Base point: Centro de succión\n-> Select objects: Círculo y boquillas",
        industrialNorms: ["ISO 10628 (Diagramas de flujo de plantas de proceso)", "ANSI/ISA-5.1"],
        practicalExercise: {
          title: "Creación del Símbolo de Bomba Centrífuga como Bloque",
          instructions: [
            "Dibuja el cuerpo de la bomba con un círculo de radio 15 mm.",
            "Traza la boquilla de descarga tangencial hacia arriba con una línea de 10 mm.",
            "Ejecuta BLOCK, asígnale el nombre 'BOMBA_CENTRIFUGA' y define el punto de inserción en el centro del eje."
          ],
          terminalInput: "CIRCLE 15 -> LINE -> BLOCK Name: BOMBA_CENTRIFUGA",
          expectedResult: "Bloque paramétrico de bomba listo para su inserción repetida en P&IDs."
        }
      },
      {
        id: "4.2",
        title: "IV.2 Diagramas de flujo (PFD y P&ID)",
        content: "La norma ANSI/ISA-5.1 establece el estándar para identificación de lazos de control (TAG): primera letra indica la variable medida (T=Temperatura, P=Presión, F=Flujo, L=Nivel); letras siguientes indican la función (I=Indicador, C=Controlador, T=Transmisor, V=Válvula). Los números identifican el lazo (ej. TIC-101 = Controlador Indicador de Temperatura del lazo 101). Las líneas de señal se diferencian: línea continua gruesa para tubería de proceso, línea discontinua corta para señal eléctrica (4-20 mA) y línea con barras oblicuas para señal neumática (3-15 psi).",
        industrialExample: "Un lazo de control en cascada en un reactor químico utiliza un transmisor de temperatura TT-201 que envía señal al controlador TIC-201, el cual modula la válvula neumática TCV-201 en la camisa de enfriamiento.",
        autocadConcept: "Se utilizan Atributos de Bloque editables con ATTDEF. Al insertar el bloque de válvula o instrumento, AutoCAD solicita automáticamente el TAG y las especificaciones técnicas en una ventana emergente sin tener que descomponer el bloque.",
        autocadCommands: ["ATTDEF", "BATTMAN", "EATTEDIT", "LINETYPE"],
        commandSyntax: "Command: ATTDEF\n-> Tag: 'INSTR_TAG' -> Prompt: 'Ingrese TAG de instrumento:' -> Default: 'TIC-101'\n-> Justification: Middle Center -> Text style: Arial",
        industrialNorms: ["ANSI/ISA-5.1-2009", "ASME B31.3 (Process Piping)"],
        practicalExercise: {
          title: "Creación de Burbuja de Instrumentación con Atributos Inteligentes",
          instructions: [
            "Dibuja un círculo de radio 10 mm con una línea horizontal central que indica montaje en panel.",
            "Crea dos atributos con ATTDEF: uno superior para el tipo de instrumento ('TIC') y otro inferior para el lazo ('101').",
            "Agrupa en un bloque llamado 'BURBUJA_ISA' y pruébalo insertándolo con diferentes códigos."
          ],
          terminalInput: "CIRCLE 10 -> LINE -> ATTDEF -> BLOCK BURBUJA_ISA",
          expectedResult: "Bloque de instrumento inteligente que solicita el TAG al insertarse."
        }
      },
      {
        id: "4.3",
        title: "IV.3 Balance de masa en el proceso",
        content: "El balance de materia cuantifica las entradas, salidas, reacciones químicas y acumulaciones de materia en cada equipo ($\sum M_{entradas} = \sum M_{salidas}$). En el diagrama PFD se identifican las corrientes numeradas mediante rombos o banderas de corriente (Stream Flags). A cada corriente le corresponde una columna en la tabla de balance: temperatura (°C), presión (bar), flujo másico (kg/h), densidad y composición porcentual.",
        industrialExample: "En una columna de destilación binaria etanol-agua con alimentación de 10,000 kg/h al 15% de etanol, el balance calcula un destilado de 1,560 kg/h al 95% y fondos de 8,440 kg/h con 0.2% de etanol residual.",
        autocadConcept: "Se trazan las banderas de corriente numeradas mediante polígonos romboidales vinculados con tablas paramétricas de balance de materia en AutoCAD mediante campos de texto dinámicos (FIELDS).",
        autocadCommands: ["POLYGON", "TEXT", "TABLE", "FIELD", "QSELECT"],
        commandSyntax: "Command: POLYGON -> Number of sides: 4 -> Center point -> Circumscribed\nCommand: TEXT -> Número de corriente (1, 2, 3...)\nCommand: TABLE -> Insertar tabla resumen de balances",
        industrialNorms: ["GPSA Engineering Data Book (Sección balances de proceso)"],
        practicalExercise: {
          title: "Montaje de Banderas de Corriente y Tabla de Balances",
          instructions: [
            "Dibuja un rombo de corriente con POLYGON de 4 lados circunscrito.",
            "Inserta el número de corriente '1' en el centro y colócalo sobre la línea de alimentación.",
            "Duplica la bandera en las corrientes de salida (destilado '2' y fondos '3').",
            "Crea la tabla de balance de materia correspondiente con TABLE."
          ],
          terminalInput: "POLYGON 4 -> TEXT 1 -> COPY -> TABLE",
          expectedResult: "Diagrama PFD con corrientes identificadas y tabla de balance correlacionada."
        }
      }
    ]
  },
  {
    id: "unidad-5",
    number: "UNIDAD V",
    title: "Localización de la Planta",
    description: "Macrolocalización y microlocalización de plantas industriales utilizando capas topográficas, georreferenciación, métodos cuantitativos de selección y análisis espacial en AutoCAD.",
    cadLevel: "Intermedio",
    cadFocus: "Gestión avanzada de capas (LAYER, colores, tipos de línea, estados de capa LAS), referencias externas (XREF, IMAGEATTACH) de ortofotos y planos topográficos, cálculo de áreas y perímetros de parcelas (AREA, MEASUREGEOM).",
    practiceId: "practica-5",
    quizId: "quiz-5",
    subtopics: [
      {
        id: "5.1",
        title: "V.1 Procedimiento general",
        content: "El procedimiento metodológico de localización consta de dos fases: 1) Macrolocalización (elección de la región geográfica o país analizando cercanía a materias primas, mercados de consumo, tratados comerciales y disponibilidad de energía eléctrica); y 2) Microlocalización (selección del predio específico en un parque industrial o zona urbana analizando topografía, mecánica de suelos, accesos viales, suministro de agua, drenaje y uso de suelo industrial).",
        industrialExample: "Para una planta de ensamble de baterías de litio, la macrolocalización seleccionó el norte de México por cercanía con armadoras de EE.UU.; la microlocalización eligió un parque industrial con espuela de ferrocarril y línea de 115 kV de CFE.",
        autocadConcept: "El primer paso en AutoCAD es insertar y georreferenciar el plano catastral o topográfico del terreno mediante referencias externas (XREF) o imágenes satelitales (IMAGEATTACH), escalándolas a dimensiones reales 1:1 con el comando ALIGN.",
        autocadCommands: ["XREF", "ATTACH", "IMAGEATTACH", "ALIGN", "SCALE"],
        commandSyntax: "Command: IMAGEATTACH -> Seleccionar ortofoto satelital\nCommand: ALIGN -> Seleccionar imagen -> Par de puntos de control GPS conocidos -> Escalar objetos según puntos de alineación: Sí",
        industrialNorms: ["Reglamentos locales de zonificación urbana y ambiental (SEMARNAT)"],
        practicalExercise: {
          title: "Georreferenciación y Alineación de Plano Catastral",
          instructions: [
            "Inserta el plano topográfico del predio como referencia externa con XREF.",
            "Usa el comando ALIGN seleccionando dos esquinas conocidas del linde catastral.",
            "Indica 'Sí' en la opción de escalar para que el dibujo se adapte a las dimensiones topográficas reales en metros."
          ],
          terminalInput: "XREF Attach -> ALIGN Select P1 P1_dest P2 P2_dest Scale: Y",
          expectedResult: "Terreno topográfico insertado y escalado con precisión milimétrica."
        }
      },
      {
        id: "5.2",
        title: "V.2 Factores que intervienen en la localización de la planta",
        content: "Los factores se clasifican en: Primarios (fletes de transporte de materia prima y producto terminado, disponibilidad de gas natural y potencia eléctrica de alta tensión, mano de obra técnica capacitada, agua de proceso); Secundarios (clima, estabilidad geológica y sismicidad, impuestos locales, disponibilidad de vivienda para empleados, cercanía a aeropuertos y aduanas interiores).",
        industrialExample: "Una planta cervecera requiere un pozo de agua con aforo garantizado de al menos 40 litros por segundo y bajo contenido de sales disueltas.",
        autocadConcept: "Para analizar interferencias y factores territoriales en CAD, se implementa una estructura estricta de Capas bajo la norma ISO 13567: TOPOGRAFIA, CURVAS_NIVEL, RED_ELECTRICA, HIDRAULICA, DRENAJE, VIALIDADES y ZONA_CONSTRUCCION. Se gestiona la visibilidad rápida con LAYISO y LAYUNISO.",
        autocadCommands: ["LAYER", "LAYISO", "LAYUNISO", "LAYFRZ", "LAYLCK"],
        commandSyntax: "Command: LAYER\n-> Crear: '01_TOPOGRAFIA' (Color 8)\n-> Crear: '02_PREDIO_LIMITE' (Color Rojo)\n-> Crear: '03_SERVICIOS_CFE' (Color Amarillo)\nCommand: LAYISO -> Aislar capa activa para revisión",
        industrialNorms: ["ISO 13567 (Estructuración de capas en CAD)", "NOM-001-SEDE"],
        practicalExercise: {
          title: "Estructuración Jerárquica de Capas de Localización",
          instructions: [
            "Abre el Administrador de Propiedades de Capas con LAYER.",
            "Crea 6 capas normalizadas asignando colores contrastantes y grosores normativos.",
            "Bloquea la capa de límites de propiedad (Lock) para evitar que se mueva por accidente.",
            "Usa LAYISO para verificar únicamente la red de accesos viales."
          ],
          terminalInput: "LAYER -> New Layers -> LAYISO -> LAYUNISO",
          expectedResult: "Proyecto organizado por disciplinas con capas fácilmente filtrables."
        }
      },
      {
        id: "5.3",
        title: "V.3 Elección final de la planta",
        content: "La selección final se sustenta en métodos matemáticos de ingeniería de localización: 1) Método de Factores Ponderados ($\sum W_i \cdot C_{ij}$), ponderando costos, logística y mano de obra; 2) Método del Centro de Gravedad para minimizar distancias ponderadas de transporte ($C_x = \frac{\sum d_{ix} V_i}{\sum V_i}$); y 3) Análisis Costo-Volumen de Ubicación para encontrar el punto de equilibrio entre costos fijos y variables de cada sitio.",
        industrialExample: "Entre 3 terrenos candidatos (Parque A, Parque B y Terreno Rústico C), el Método de Factores Ponderados arrojó puntuaciones de 8.45, 7.80 y 6.90, seleccionando el Parque A debido a su conexión inmediata con la autopista y subestación eléctrica.",
        autocadConcept: "Una vez seleccionado el terreno, se traza en AutoCAD la poligonal definitiva calculando el área neta del predio, perímetro de barda y coeficientes de ocupación del suelo (COS y CUS) con el comando AREA y MEASUREGEOM.",
        autocadCommands: ["AREA", "MEASUREGEOM", "LIST", "BOUNDARY", "DIST"],
        commandSyntax: "Command: AREA\n-> Option: Object -> Seleccionar polilínea perimetral\nResultado: Área = 25,000.0000 m², Perímetro = 650.0000 m",
        industrialNorms: ["Reglamentos locales de construcción y porcentaje de absorción pluvial"],
        practicalExercise: {
          title: "Cálculo y Validación de Retiros Municipales en el Predio",
          instructions: [
            "Dibuja el terreno de 250 x 100 metros con RECTANG.",
            "Aplica un OFFSET interno de 10 metros para marcar la servidumbre de retiro frontal obligatorio.",
            "Aplica OFFSET de 5 metros en colindancias laterales.",
            "Calcula el área neta libre de construcción (área vendible) con AREA."
          ],
          terminalInput: "RECTANG 250,100 -> OFFSET 10 -> OFFSET 5 -> AREA Object",
          expectedResult: "Área neta edificable delimitada respetando los retiros municipales normativos."
        }
      }
    ]
  },
  {
    id: "unidad-6",
    number: "UNIDAD VI",
    title: "Estudio Económico",
    description: "Evaluación de costos de capital (CAPEX/OPEX), catálogo de conceptos de obra civil y electromecánica mediante extracción automatizada de datos CAD (DATAEXTRACTION) y presupuestación paramétrica.",
    cadLevel: "Avanzado",
    cadFocus: "Extracción automatizada de atributos y cantidades de obra (DATAEXTRACTION, EATTEXT), generación de tablas dinámicas de cuantificación de tuberías, válvulas y equipos, y vinculación con presupuestos.",
    practiceId: "practica-6",
    quizId: "quiz-6",
    subtopics: [
      {
        id: "6.1",
        title: "VI.1 Puntos a considerar",
        content: "La evaluación financiera de la planta considera: 1) Horizonte de planeación del proyecto (10 a 20 años); 2) Tasa Mínima Aceptable de Rendimiento (TMAR = Tasa libre de riesgo + Premio al riesgo de la industria, típicamente entre 15% y 25%); 3) Inflación y tipo de cambio en componentes importados; 4) Flujos netos de efectivo proyectados (FNE); y 5) Valor Residual o de rescate de los activos al final de su vida útil.",
        industrialExample: "Una planta que requiere una inversión de $50 millones de pesos proyecta flujos netos de $14 millones anuales a 5 años; con una TMAR del 18%, el Valor Presente Neto (VPN) es de $7.8 millones y la TIR del 24.2%, confirmando su rentabilidad.",
        autocadConcept: "Cada entidad dibujada en AutoCAD (bloques de maquinaria, luminarias, extintores, metros lineales de tubería) posee atributos y metadatos que corresponden a partidas presupuestales específicas (WBS / EDT).",
        autocadCommands: ["ATTEDIT", "PROPERTIES", "FIND", "RENAME"],
        commandSyntax: "Command: PROPERTIES -> Seleccionar bloque de reactor -> Asignar código WBS 'MEC-EQ-01'",
        industrialNorms: ["Estándares de Ingeniería de Costos AACE / PMBOK"],
        practicalExercise: {
          title: "Asignación de Códigos Presupuestales en Propiedades de Bloques",
          instructions: [
            "Selecciona los bloques de equipos de la planta.",
            "Abre la paleta PROPERTIES (Ctrl + 1).",
            "Asigna en la descripción el código de partida contable (ej. 'EQ-PROCESO-01').",
            "Verifica que todos los bloques compartan la misma estructura de metadatos."
          ],
          terminalInput: "PROPERTIES -> WBS Code MEC-01 -> Enter",
          expectedResult: "Modelo CAD estructurado para extracción contable de datos."
        }
      },
      {
        id: "6.2",
        title: "VI.2 Inversión de capital",
        content: "Se divide en: 1) Capital Fijo (Capex tangible: terrenos, urbanización, cimentaciones, naves industriales, tuberías, instrumentación, líneas eléctricas); 2) Activos Intangibles (ingeniería, patentes, software, licencias ambientales); y 3) Capital de Trabajo (Working Capital: inventarios de materia prima de 30 días, refacciones críticas y caja operativa para nóminas de arranque).",
        industrialExample: "En una planta de inyección de plástico, el 65% del Capex se concentra en las 12 máquinas inyectoras y los moldes de precisión de acero P20.",
        autocadConcept: "Conteo y metrado instantáneo: AutoCAD ofrece la herramienta BCOUNT (conteo de bloques) y comandos de medición que calculan en segundos metros cuadrados de piso de alta resistencia epóxico y metros lineales de barda perimetral.",
        autocadCommands: ["BCOUNT", "DATAEXTRACTION", "QSELECT"],
        commandSyntax: "Command: BCOUNT\nResultado consola: BLOCK NAME: REACTOR -> COUNT: 2 | BLOCK NAME: PUMP -> COUNT: 4",
        industrialNorms: ["ACI 318 (Requisitos de concreto estructural para pisos industriales)"],
        practicalExercise: {
          title: "Conteo Automatizado de Equipos de Planta con BCOUNT",
          instructions: [
            "Escribe en la línea de comandos BCOUNT y presiona Enter.",
            "Selecciona todos los objetos del plano o presiona Enter para procesar todo el dibujo.",
            "Revisa el resumen generado en la ventana de texto (F2) con la lista de activos cuantificados."
          ],
          terminalInput: "BCOUNT -> Enter -> F2 (ver consola)",
          expectedResult: "Inventario exacto de bloques de equipos listo para cotización."
        }
      },
      {
        id: "6.3",
        title: "VI.3 Forma de diseño",
        content: "El diseño de la planta condiciona directamente los costos operativos durante los 20 años de vida útil (Life Cycle Costing - LCC). Un layout bien concebido minimiza caídas de presión en tuberías (ahorro en bombas y kWh de electricidad), reduce recorridos de montacargas (ahorro en diésel y llantas) y optimiza la iluminación natural mediante láminas translúcidas en cubierta.",
        industrialExample: "Instalar el banco de compresores cerca de la subestación y de los mayores consumidores de aire redujo las pérdidas de carga en un 15% y evitó comprar un compresor adicional de 50 HP.",
        autocadConcept: "Diseño por análisis de distancias: se trazan círculos de radio de servicio alrededor de hidrantes, subestaciones y tomas de aire para garantizar cobertura total sin redundancia de tuberías costosas.",
        autocadCommands: ["CIRCLE", "OFFSET", "DIST", "MATCHPROP"],
        commandSyntax: "Command: CIRCLE -> Center: Hidrante -> Radius: 25.0m (Radio normativo de manguera)",
        industrialNorms: ["NOM-002-STPS-2010 (Prevención contra incendios)"],
        practicalExercise: {
          title: "Verificación de Cobertura de Servicios con Radios Normativos",
          instructions: [
            "Coloca los bloques de hidrantes contraincendios en las esquinas de la nave.",
            "Traza círculos con radio de 25 metros alrededor de cada hidrante (alcance de manguera).",
            "Verifica que toda la superficie de la nave quede cubierta por al menos un radio de hidrante."
          ],
          terminalInput: "CIRCLE Radius 25 -> MATCHPROP",
          expectedResult: "Cobertura de seguridad contraincendios 100% verificada geométricamente."
        }
      },
      {
        id: "6.4",
        title: "VI.4 Forma contable",
        content: "Los activos fijos se deprecian contablemente conforme a la legislación fiscal (LISR en México): Edificios y naves industriales al 5% anual (20 años de vida útil); Maquinaria y equipo de proceso al 10% anual (10 años); Equipo de cómputo y software CAD al 30% anual (3.3 años). La depreciación se deduce de impuestos, mejorando el flujo de efectivo después de impuestos (FEDI).",
        industrialExample: "Una nave industrial de $20 millones de pesos genera un escudo fiscal por depreciación de $1 millón de pesos anuales, reduciendo el pago del Impuesto Sobre la Renta (ISR).",
        autocadConcept: "Estructuración de capas con códigos contables para exportar datos limpios clasificados por tipo de activo fiscal (EDIFICIO, MAQUINARIA, EQUIPO_AUXILIAR).",
        autocadCommands: ["LAYER", "EXPORT", "DATALINK"],
        commandSyntax: "Command: EXPORT -> Seleccionar formato de intercambio CSV / DXF contable",
        industrialNorms: ["Ley del Impuesto Sobre la Renta (LISR - Art. 34 y 35)", "NIF C-6"],
        practicalExercise: {
          title: "Clasificación de Capas por Vida Fiscal de Activos",
          instructions: [
            "Agrupa las entidades del plano en 3 capas contables: 'ACTIVO_EDIF_5PCT', 'ACTIVO_MAQ_10PCT' y 'ACTIVO_COMP_30PCT'.",
            "Mueve los muros a la capa de edificios y los reactores a la de maquinaria.",
            "Exporta las cantidades clasificadas para el cálculo contable de depreciación."
          ],
          terminalInput: "LAYER -> QSELECT -> CHANGE Layer",
          expectedResult: "Plano organizado por categorías de depreciación fiscal."
        }
      },
      {
        id: "6.5",
        title: "VI.5 Cálculo de conceptos",
        content: "Integración del Precio Unitario (P.U.) para cada partida del catálogo de obra y montaje electromecánico. Fórmula general: $$P.U. = (Costo Directo) \cdot (1 + F_{Ind}) \cdot (1 + F_{Fin}) \cdot (1 + F_{Utilidad})$$. El Costo Directo suma materiales puestos en obra, mano de obra calificada (salario real con factor de salario integrado FSI del IMSS) y maquinaria/equipo de izaje por hora.",
        industrialExample: "Partida de tubería inox 316L de 3 pulg: Tubo ($1,200/m) + Soldador Argonero ($350/m) + Gas argón y consumibles ($150/m) = Costo Directo $1,700/m. Con 25% de indirectos y utilidad, el P.U. es de $2,125/m instalado.",
        autocadConcept: "Uso avanzado del asistente DATAEXTRACTION: extrae automáticamente longitudes de tubería, conteo de accesorios, nombres de bloques y áreas; y genera una tabla vinculada directamente en el plano y exportable a Microsoft Excel (.xlsx / .csv).",
        autocadCommands: ["DATAEXTRACTION", "TABLE", "DATALINKUPDATE", "EXPORT"],
        commandSyntax: "Command: DATAEXTRACTION\n-> Crear nueva extracción 'CATALOGO_PLANTA.dxe'\n-> Seleccionar objetos tipo Bloque y Líneas de tubería\n-> Marcar propiedades: Name, Count, Length, Area\n-> Salida: Insertar tabla en dibujo y exportar archivo Excel (.csv)",
        industrialNorms: ["Ley de Obras Públicas y Servicios Relacionados con las Mismas"],
        practicalExercise: {
          title: "Extracción Automática del Catálogo de Conceptos con DATAEXTRACTION",
          instructions: [
            "Ejecuta el comando DATAEXTRACTION.",
            "Crea un archivo de extracción llamado 'CATALOGO_CONCEPTOS_AZTLAN.dxe'.",
            "Filtra la extracción únicamente para objetos de la categoría 'Equipos' y 'Tuberías'.",
            "Selecciona las propiedades 'Nombre de bloque', 'Cantidad' y 'Longitud'.",
            "Inserta la tabla resultante en el espacio de dibujo y exporta el archivo CSV."
          ],
          terminalInput: "DATAEXTRACTION -> Configurar Wizard -> Insertar TABLE en plano",
          expectedResult: "Catálogo de conceptos cuantitativo generado 100% automático desde el modelo CAD."
        }
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
    autocadRule: "Trazar pasillos con línea segmentada de 10cm de espesor y verificar distancias libres de obstáculos con DIST."
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
