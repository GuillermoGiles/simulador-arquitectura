export const practiceExams = [
  {
    id: 'final-1',
    title: 'Simulador de Final 1',
    description: 'Simulador de 5 consignas teóricas para preparar el examen final.',
    questions: [
      {
        id: 1,
        text: '¿Cuál es la principal diferencia entre las arquitecturas CISC y RISC?',
        options: [
          'CISC tiene pocas instrucciones simples, RISC tiene muchas instrucciones complejas.',
          'CISC busca realizar tareas complejas en pocas líneas de ensamblador, RISC utiliza instrucciones simples que se ejecutan en un ciclo de reloj.',
          'RISC no utiliza memoria caché, mientras que CISC sí.',
          'CISC es más moderno y reemplazó completamente a RISC.'
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        text: 'En la jerarquía de memoria, ¿qué característica distingue a la memoria Caché de la memoria Principal (RAM)?',
        options: [
          'La memoria Caché es más lenta pero de mayor capacidad.',
          'La memoria Caché es más rápida, de menor capacidad y más costosa por byte.',
          'La memoria Caché es no volátil.',
          'La memoria Caché almacena el sistema operativo entero.'
        ],
        correctAnswer: 1
      },
      {
        id: 3,
        text: '¿Qué es una interrupción en el contexto del procesador?',
        options: [
          'Un error físico en el procesador que apaga la máquina.',
          'Una señal que indica al procesador que debe detener su flujo actual para atender un evento urgente.',
          'El proceso de apagar la fuente de alimentación.',
          'Un tipo de memoria ROM.'
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        text: '¿Qué función cumple la Unidad Aritmético Lógica (ALU)?',
        options: [
          'Almacenar los datos de forma permanente.',
          'Realizar operaciones matemáticas y lógicas (como sumas, AND, OR).',
          'Controlar el bus de datos.',
          'Traducir código de alto nivel a lenguaje máquina.'
        ],
        correctAnswer: 1
      },
      {
        id: 5,
        text: 'En los modos de direccionamiento, ¿qué significa el "direccionamiento indirecto"?',
        options: [
          'El operando especifica directamente el valor a usar.',
          'El operando especifica la dirección de memoria donde se encuentra la dirección real del dato.',
          'El operando está en un registro del procesador.',
          'El dato se busca en el disco duro.'
        ],
        correctAnswer: 1
      }
    ]
  }
];
