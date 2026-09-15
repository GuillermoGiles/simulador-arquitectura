// Preguntas transversales de tipo "final" que no pertenecen a una única unidad.
// Se suman al pool de los quizzes de cada módulo en el Simulador de Finales.
export const finalQuestions = [
  {
    question: '¿Cuál es la principal diferencia entre las arquitecturas CISC y RISC?',
    options: [
      'CISC tiene pocas instrucciones simples, RISC tiene muchas instrucciones complejas.',
      'CISC busca realizar tareas complejas en pocas líneas de ensamblador, RISC utiliza instrucciones simples que se ejecutan en un ciclo de reloj.',
      'RISC no utiliza memoria caché, mientras que CISC sí.',
      'CISC es más moderno y reemplazó completamente a RISC.',
    ],
    answer: 1,
    explanation:
      'CISC prioriza instrucciones potentes y de longitud variable interpretadas por microcódigo; RISC prioriza instrucciones simples, de tamaño fijo y ejecución en un ciclo, delegando la complejidad al compilador.',
  },
  {
    question: 'En la jerarquía de memoria, ¿qué característica distingue a la memoria Caché de la memoria Principal (RAM)?',
    options: [
      'La memoria Caché es más lenta pero de mayor capacidad.',
      'La memoria Caché es más rápida, de menor capacidad y más costosa por byte.',
      'La memoria Caché es no volátil.',
      'La memoria Caché almacena el sistema operativo entero.',
    ],
    answer: 1,
    explanation:
      'La caché (SRAM) está más cerca del procesador que la RAM (DRAM): es más rápida y más cara por bit, por lo que su capacidad es mucho menor. Ambas son volátiles.',
  },
  {
    question: '¿Qué es una interrupción en el contexto del procesador?',
    options: [
      'Un error fatal que apaga la computadora.',
      'Una señal que indica al procesador que debe detener su flujo actual para atender un evento urgente.',
      'Una instrucción de salto incondicional.',
      'Un comando para vaciar la memoria caché.',
    ],
    answer: 1,
    explanation:
      'Ante una interrupción el procesador termina la instrucción en curso, guarda el contexto (IP, flags), ejecuta la rutina de servicio indicada por el vector de interrupción y luego retoma el programa.',
  },
  {
    question: '¿Qué función cumple la Unidad Aritmético Lógica (ALU)?',
    options: [
      'Controlar los dispositivos de entrada y salida.',
      'Realizar operaciones matemáticas y lógicas (como sumas, AND, OR).',
      'Almacenar los programas en ejecución.',
      'Decodificar las instrucciones del programa.',
    ],
    answer: 1,
    explanation:
      'La ALU es el bloque combinacional que realiza sumas, restas, comparaciones y operaciones lógicas bit a bit, actualizando los flags de estado según el resultado.',
  },
  {
    question: 'En los modos de direccionamiento, ¿qué significa el "direccionamiento indirecto"?',
    options: [
      'El operando está incluido dentro de la propia instrucción.',
      'El operando especifica la dirección de memoria donde se encuentra la dirección real del dato.',
      'El operando se encuentra en un registro interno del procesador.',
      'La dirección del dato se calcula sumando un desplazamiento al Program Counter.',
    ],
    answer: 1,
    explanation:
      'En direccionamiento indirecto la instrucción contiene un puntero: primero se lee la dirección efectiva desde memoria (o registro) y recién después se accede al dato. Requiere un acceso adicional a memoria.',
  },
];
