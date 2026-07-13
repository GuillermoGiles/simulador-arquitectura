export const modules = [
  {
    "id": 1,
    "title": "Unidad 1: Representación de Datos",
    "description": "Sistemas de numeración, punto fijo y flotante.",
    "pdf": "1- Representación de Datos - Unidad 1.pdf",
    "flashcards": [
      {
        "term": "Informática",
        "definition": "Proceso de tratar información automáticamente, involucrando entrada, memoria, proceso y salida."
      },
      {
        "term": "Bit",
        "definition": "Acrónimo de Binary Digit, es la mínima unidad de información que se representa con un impulso eléctrico (1 o 0)."
      },
      {
        "term": "Byte",
        "definition": "Grupo de 8 bits que representa el número de bits necesarios para codificar un carácter."
      },
      {
        "term": "Sistema Binario",
        "definition": "Sistema de numeración en el que los datos y números se representan utilizando únicamente dos símbolos: 0 y 1."
      },
      {
        "term": "Sistema Octal",
        "definition": "Sistema de numeración de base 8, cuyos símbolos permitidos son los dígitos del 0 al 7."
      },
      {
        "term": "Sistema Hexadecimal",
        "definition": "Sistema de numeración de base 16, utiliza los dígitos del 0 al 9 y las letras A, B, C, D, E y F."
      },
      {
        "term": "Binario Sin Signo (BSS)",
        "definition": "Representación de números donde todos los bits disponibles se utilizan para expresar la magnitud, sin poder representar números negativos."
      },
      {
        "term": "Rango en BSS",
        "definition": "Para n bits, el número mínimo es 0 y el número máximo es (2^n) - 1."
      },
      {
        "term": "Binario Con Signo (BCS)",
        "definition": "Representaciones binarias diseñadas para poder expresar tanto números positivos como negativos."
      },
      {
        "term": "Bit de Signo",
        "definition": "En BCS, el bit más significativo (MSB) donde '0' indica un número positivo y '1' indica un número negativo."
      },
      {
        "term": "Signo y Módulo",
        "definition": "Representación con signo en la cual 1 bit es el signo y los restantes n-1 bits representan la magnitud en valor absoluto."
      },
      {
        "term": "Desventaja de Signo y Módulo",
        "definition": "Operatoria aritmética compleja y la existencia de una doble representación para el cero (+0 y -0)."
      },
      {
        "term": "Complemento a 1 (Ca1)",
        "definition": "Representación de un número negativo invirtiendo todos los bits (cambiando 0 por 1 y 1 por 0) de su magnitud positiva."
      },
      {
        "term": "Complemento a 2 (Ca2)",
        "definition": "Método para representar números con signo que elimina la doble representación del cero y simplifica la aritmética sumando 1 al Ca1."
      },
      {
        "term": "Rango en Complemento a 2",
        "definition": "Para n bits, el rango es asimétrico y va desde -(2^(n-1)) hasta +(2^(n-1) - 1)."
      },
      {
        "term": "Punto Flotante",
        "definition": "Convención utilizada para representar números reales de gran rango mediante notación exponencial (mantisa y exponente)."
      },
      {
        "term": "Norma IEEE 754",
        "definition": "Estándar que define los formatos de Punto Flotante, incluyendo Precisión Sencilla (32 bits) y Doble (64 bits)."
      },
      {
        "term": "Formato Precisión Sencilla (IEEE 754)",
        "definition": "Estructura de 32 bits compuesta por: 1 bit de signo, 8 bits de exponente (exceso 127) y 23 bits de mantisa."
      },
      {
        "term": "Exceso 127",
        "definition": "Notación utilizada en el exponente del formato IEEE 754 de 32 bits, donde se le suma 127 al exponente real."
      },
      {
        "term": "Bit Implícito",
        "definition": "En Punto Flotante IEEE 754, la parte entera de la mantisa normalizada se sobreentiende que es '1' y no se almacena."
      },
      {
        "term": "Flag Z (Cero)",
        "definition": "Bandera de estado que se activa (Z=1) cuando el resultado de una operación aritmética es exactamente cero."
      },
      {
        "term": "Flag S (Signo)",
        "definition": "Bandera de estado que refleja el bit más significativo del resultado, indicando si es positivo (S=0) o negativo (S=1)."
      },
      {
        "term": "Flag C (Carry / Acarreo)",
        "definition": "Bandera que se activa (C=1) cuando una operación genera un acarreo fuera del bit más significativo."
      },
      {
        "term": "Flag V (Overflow / Desbordamiento)",
        "definition": "Bandera que se activa (V=1) cuando el resultado de sumar dos números del mismo signo cambia de signo, quedando truncado."
      },
      {
        "term": "Código BCD",
        "definition": "Acrónimo de Binary Coded Decimal, método donde cada dígito decimal se representa individualmente con bloques de 4 bits."
      },
      {
        "term": "Ventaja del código BCD",
        "definition": "Evita errores de redondeo en aplicaciones mercantiles y facilita la representación en visualizadores digitales de 7 segmentos."
      },
      {
        "term": "BCD Puro 8421",
        "definition": "Código ponderado donde los pesos de los 4 bits coinciden con el binario puro (8, 4, 2 y 1)."
      },
      {
        "term": "Conversión Binario a Octal",
        "definition": "Agrupación directa de a 3 bits de derecha a izquierda para representar su equivalente dígito en base 8."
      },
      {
        "term": "Conversión Binario a Hexadecimal",
        "definition": "Agrupación directa de a 4 bits de derecha a izquierda para representar su equivalente dígito en base 16."
      },
      {
        "term": "Kilobyte (KB)",
        "definition": "Unidad de almacenamiento de datos que equivale a 1024 Bytes (2^10 Bytes)."
      }
    ],
    "quiz": [
      {
        "question": "¿Cuál de los siguientes sistemas de representación posee doble representación para el número cero?",
        "options": [
          "Binario Sin Signo (BSS)",
          "Complemento a 2 (Ca2)",
          "Signo y Módulo",
          "Exceso 127"
        ],
        "answer": 2
      },
      {
        "question": "¿Cuántos números distintos se pueden representar en Binario Sin Signo (BSS) utilizando 8 bits?",
        "options": [
          "128",
          "255",
          "256",
          "512"
        ],
        "answer": 2
      },
      {
        "question": "En el formato IEEE 754 de Precisión Simple (32 bits), ¿cuántos bits se destinan a la mantisa?",
        "options": [
          "1 bit",
          "8 bits",
          "16 bits",
          "23 bits"
        ],
        "answer": 3
      },
      {
        "question": "¿Cómo se representa el número decimal -5 utilizando 4 bits en la convención de Complemento a 2?",
        "options": [
          "1101",
          "1010",
          "1011",
          "1111"
        ],
        "answer": 2
      },
      {
        "question": "¿Qué significa el acrónimo BCD?",
        "options": [
          "Base Code Decimal",
          "Binary Coded Decimal",
          "Bit Control Data",
          "Byte Coded Digit"
        ],
        "answer": 1
      },
      {
        "question": "En una conversión directa de binario a hexadecimal, ¿de a cuántos bits se realizan las agrupaciones?",
        "options": [
          "2 bits",
          "3 bits",
          "4 bits",
          "8 bits"
        ],
        "answer": 2
      },
      {
        "question": "¿Qué indica la bandera (flag) V en la aritmética de una computadora?",
        "options": [
          "Resultado igual a cero",
          "Acarreo final",
          "Signo del resultado",
          "Desbordamiento u Overflow"
        ],
        "answer": 3
      },
      {
        "question": "¿Cuál es el rango de representación para números de 8 bits en Complemento a 2?",
        "options": [
          "-127 a +127",
          "-128 a +127",
          "0 a 255",
          "-128 a +128"
        ],
        "answer": 1
      },
      {
        "question": "En la representación por Signo y Módulo, ¿qué indica un '1' en el bit más significativo (MSB)?",
        "options": [
          "Que el número es positivo",
          "Que el número es negativo",
          "Que existe acarreo",
          "Que el resultado es cero"
        ],
        "answer": 1
      },
      {
        "question": "Un Gigabyte (GB) equivale matemáticamente a:",
        "options": [
          "1000 Megabytes",
          "1024 Kilobytes",
          "1024 Megabytes",
          "1000000 Bytes"
        ],
        "answer": 2
      }
    ]
  },
  {
    "id": 2,
    "title": "Unidad 2: Circuitos Lógicos",
    "description": "Compuertas lógicas y álgebra de Boole.",
    "pdf": "2- Circuitos Lógicos - Unidad 2.pdf",
    "flashcards": [
      {
        "term": "Sistema",
        "definition": "Conjunto de elementos que guardan relación entre sí, donde un elemento puede ser otro sistema (subsistema)."
      },
      {
        "term": "Clasificación de Sistemas Electrónicos",
        "definition": "Analógicos y Digitales."
      },
      {
        "term": "Sistemas Digitales",
        "definition": "Aquellos cuyos elementos sólo pueden adoptar valores discretos (usando generalmente elementos binarios en base 2)."
      },
      {
        "term": "Álgebra de Boole",
        "definition": "Formalización matemática introducida en 1854 para representar información digital y expresar algebraicamente operaciones lógicas."
      },
      {
        "term": "Claude Shannon",
        "definition": "Científico que adaptó el álgebra de Boole en 1938 para su aplicación en sistemas digitales."
      },
      {
        "term": "Axiomas (Postulados)",
        "definition": "Premisas que se aceptan como base del sistema y no se deducen de otras."
      },
      {
        "term": "Teoremas",
        "definition": "Proposiciones que afirman una verdad demostrable dentro de un álgebra."
      },
      {
        "term": "Elemento Identidad",
        "definition": "Propiedad que establece que a + 0 = a y a . 1 = a."
      },
      {
        "term": "Propiedad Conmutativa",
        "definition": "Propiedad que indica que el orden no altera el resultado: a + b = b + a y a . b = b . a."
      },
      {
        "term": "Propiedad Distributiva",
        "definition": "Establece que a . (b + c) = (a . b) + (a . c) y a + (b . c) = (a + b) . (a + c)."
      },
      {
        "term": "Complementación o Inversión Lógica",
        "definition": "Axioma que define que a + a' = 1 y a . a' = 0."
      },
      {
        "term": "Principio de Dualidad",
        "definition": "Toda igualdad lógica sigue siendo válida si se intercambian los operadores (+ y .) y las identidades (0 y 1)."
      },
      {
        "term": "Álgebra como conjunto cerrado",
        "definition": "Los resultados de aplicar operaciones lógicas a las variables pertenecen siempre al mismo álgebra."
      },
      {
        "term": "Ley de Idempotencia",
        "definition": "Establece que operar una variable consigo misma no la altera: a + a = a y a . a = a."
      },
      {
        "term": "Ley de Involución",
        "definition": "La doble negación de una variable resulta en la misma variable original."
      },
      {
        "term": "Leyes de De Morgan",
        "definition": "Leyes que permiten transformar sumas lógicas negadas en productos de variables negadas y viceversa."
      },
      {
        "term": "Jerarquía de Operadores Lógicos",
        "definition": "Orden de evaluación en expresiones sin paréntesis: 1° NOT, 2° AND, 3° OR."
      },
      {
        "term": "Compuerta Lógica",
        "definition": "Dispositivo electrónico que realiza una operación lógica conmutando el nivel de tensión en su salida."
      },
      {
        "term": "Compuerta OR",
        "definition": "Compuerta que realiza la suma lógica (X = A + B). Solo es 0 si todas sus entradas son 0."
      },
      {
        "term": "Compuerta AND",
        "definition": "Compuerta que realiza el producto lógico (X = A . B). Solo es 1 si todas sus entradas son 1."
      },
      {
        "term": "Compuerta INVERSOR (NOT)",
        "definition": "Compuerta que invierte o niega el valor lógico de su entrada."
      },
      {
        "term": "Compuerta XOR (OR Exclusivo)",
        "definition": "Compuerta cuya salida es 1 solo si sus entradas son diferentes entre sí."
      },
      {
        "term": "Compuertas NOR y NAND",
        "definition": "Representan la negación directa de las funciones OR y AND, respectivamente."
      },
      {
        "term": "Diagramas Temporales",
        "definition": "Representaciones gráficas del comportamiento de un circuito digital a través del tiempo."
      },
      {
        "term": "Equivalencia de Funciones Lógicas",
        "definition": "Dos expresiones son equivalentes si poseen igual tabla de verdad."
      },
      {
        "term": "Término Canónico",
        "definition": "Todo producto o suma lógica en los que aparecen todas las variables en su forma directa o inversa."
      },
      {
        "term": "Mintérmino",
        "definition": "Producto lógico de todas las variables (negadas o no) que da como resultado 1 para una sola combinación."
      },
      {
        "term": "Maxtérmino",
        "definition": "Suma lógica de todas las variables (negadas o no), considerado como la expresión dual de los mintérminos."
      },
      {
        "term": "Mapas de Karnaugh",
        "definition": "Matriz modificada de la tabla de verdad empleada para minimizar funciones lógicas de forma gráfica."
      },
      {
        "term": "Código de Gray en Mapas de Karnaugh",
        "definition": "Sistema utilizado para organizar el mapa asegurando que las filas y columnas adyacentes cambien una sola variable a la vez."
      }
    ],
    "quiz": [
      {
        "question": "¿Qué caracteriza fundamentalmente a un Sistema Digital?",
        "options": [
          "Sus elementos adoptan cualquier valor analógico.",
          "Sus elementos sólo pueden adoptar valores discretos.",
          "Utiliza exclusivamente compuertas mecánicas.",
          "No guarda relación entre sus elementos."
        ],
        "answer": 1
      },
      {
        "question": "¿Quién adaptó el Álgebra de Boole en 1938 para su aplicación en sistemas digitales?",
        "options": [
          "George Boole",
          "Alan Turing",
          "Claude Shannon",
          "John von Neumann"
        ],
        "answer": 2
      },
      {
        "question": "En el álgebra de Boole, ¿cuál es el resultado del postulado de complementación lógica 'a + a\\''?",
        "options": [
          "a",
          "0",
          "1",
          "a'"
        ],
        "answer": 2
      },
      {
        "question": "¿Qué afirma el Principio de Dualidad en álgebra binaria?",
        "options": [
          "Toda compuerta AND equivale a una NOR.",
          "La doble negación siempre invierte la variable.",
          "Toda igualdad sigue siendo válida si se intercambian (+) y (.), y (0) y (1).",
          "Los mapas de Karnaugh siempre son matrices simétricas."
        ],
        "answer": 2
      },
      {
        "question": "De acuerdo a la jerarquía de operadores lógicos (si no existen paréntesis), ¿qué operación se realiza primero?",
        "options": [
          "Suma (OR)",
          "Negación (NOT)",
          "Producto (AND)",
          "Equivalencia (XOR)"
        ],
        "answer": 1
      },
      {
        "question": "¿Cuál es la compuerta lógica que implementa la operación producto X = A . B?",
        "options": [
          "OR",
          "NAND",
          "AND",
          "XOR"
        ],
        "answer": 2
      },
      {
        "question": "¿Qué es un mintérmino?",
        "options": [
          "Una suma lógica de variables donde ninguna está negada.",
          "Un producto lógico en el que aparecen todas las variables, negadas o no.",
          "Una técnica para minimizar funciones en mapas de Karnaugh.",
          "Un postulado utilizado para demostrar teoremas."
        ],
        "answer": 1
      },
      {
        "question": "¿Cómo se obtiene la función lógica a partir de la tabla de verdad al analizar dónde la función vale 1?",
        "options": [
          "Mediante el producto de maxtérminos.",
          "Mediante la suma de mintérminos.",
          "Mediante la suma de maxtérminos.",
          "Mediante diagramas temporales."
        ],
        "answer": 1
      },
      {
        "question": "Al minimizar usando Mapas de Karnaugh, ¿qué ocurre si agrupamos 4 celdas adyacentes?",
        "options": [
          "No se elimina ninguna variable.",
          "Se elimina 1 variable.",
          "Se eliminan 2 variables.",
          "Se eliminan 4 variables."
        ],
        "answer": 2
      },
      {
        "question": "¿Por qué se utiliza el código de Gray en la construcción de Mapas de Karnaugh?",
        "options": [
          "Para que las filas y columnas sean adyacentes cambiando solo una variable a la vez.",
          "Para convertir las señales digitales en analógicas.",
          "Para realizar sumas binarias de mayor velocidad.",
          "Para incrementar la tensión eléctrica en la salida de las compuertas."
        ],
        "answer": 0
      }
    ]
  },
  {
    "id": 3,
    "title": "Unidad 3: Circuitos Digitales",
    "description": "Circuitos combinacionales y secuenciales.",
    "pdf": "3- Circuitos Digitales - Unidad 3 - Circuitos Combinacionales.pdf",
    "flashcards": [
      {
        "term": "Sistema digital",
        "definition": "Conjunto de elementos binarios que se encuentran relacionados entre sí de alguna manera."
      },
      {
        "term": "Variables de entrada",
        "definition": "Variables independientes en un sistema digital."
      },
      {
        "term": "Variables de salida",
        "definition": "Variables que dependen de las variables de entrada en un sistema digital."
      },
      {
        "term": "Variables de proceso",
        "definition": "Variables de entrada con las que el circuito puede realizar una determinada función u operación."
      },
      {
        "term": "Variables de control",
        "definition": "Variables que influyen en la forma en que el circuito actúa sobre las variables de proceso o sobre la salida."
      },
      {
        "term": "Sistema Combinacional",
        "definition": "Sistema donde cada combinación de entrada se corresponde con una y sólo una combinación de salida."
      },
      {
        "term": "Propiedad fundamental del Sistema Combinacional",
        "definition": "Siempre que se repita un conjunto de valores de entrada, se repetirá la salida del sistema."
      },
      {
        "term": "Sistema Secuencial",
        "definition": "Sistema en el que a un mismo vector de entrada le puede corresponder más de una salida."
      },
      {
        "term": "Memoria en Sistemas Secuenciales",
        "definition": "Es indispensable porque las salidas son consecuencia de la evolución anterior de sus entradas."
      },
      {
        "term": "Circuitos Combinacionales",
        "definition": "Son aquellos cuyas salidas en un determinado instante son función exclusivamente del valor de las entradas en dicho instante."
      },
      {
        "term": "Diseño de Circuito Combinacional",
        "definition": "Consiste en minimizar las funciones requeridas e implementarlas con compuertas lógicas."
      },
      {
        "term": "Compuertas lógicas básicas",
        "definition": "AND, OR, NOT, que componen los circuitos combinacionales."
      },
      {
        "term": "Bloques Combinacionales Estándares",
        "definition": "Sumadores, restadores, decodificadores y multiplexores."
      },
      {
        "term": "Semisumador (Half Adder)",
        "definition": "Circuito que suma dos bits de entrada (a y b) y devuelve un bit de resultado (S) y un bit de acarreo (Cout)."
      },
      {
        "term": "Ecuación de Suma en Semisumador",
        "definition": "S = a ⊕ b (a XOR b)."
      },
      {
        "term": "Ecuación de Acarreo (Cout) en Semisumador",
        "definition": "Cout = a * b (a AND b)."
      },
      {
        "term": "Sumador Completo (Full Adder)",
        "definition": "Circuito que suma dos bits de entrada más un acarreo de entrada (Cin)."
      },
      {
        "term": "Ecuación de Suma en Sumador Completo",
        "definition": "S = a ⊕ b ⊕ Cin."
      },
      {
        "term": "Ecuación de Acarreo (Cout) en Sumador Completo",
        "definition": "Cout = a.b + a.Cin + b.Cin."
      },
      {
        "term": "Sumador/Restador",
        "definition": "Circuito en paralelo que permite sumar o restar dependiendo de una variable de control (Modo)."
      },
      {
        "term": "SSI (Small Scale of Integration)",
        "definition": "Circuitos con un número pequeño de transistores, basados en compuertas lógicas básicas."
      },
      {
        "term": "MSI (Medium Scale of Integration)",
        "definition": "Circuitos que contienen entre 12 y 100 compuertas lógicas."
      },
      {
        "term": "LSI (Large Scale of Integration)",
        "definition": "Sistemas o circuitos integrados que contienen aproximadamente 1000 compuertas lógicas."
      },
      {
        "term": "VLSI (Very Large Scale of Integration)",
        "definition": "Circuitos con escala de integración mayor a 1000 compuertas lógicas."
      },
      {
        "term": "ULSI (Ultra Large Scale of Integration)",
        "definition": "Circuitos con una integración masiva superior a 100000 compuertas lógicas."
      },
      {
        "term": "Decodificador",
        "definition": "Módulo combinacional que convierte un código de n bits de entrada en un código de salida de m bits."
      },
      {
        "term": "Estructura del Decodificador Completo",
        "definition": "Consta de 2^n compuertas AND de n entradas, activando solo una salida por combinación."
      },
      {
        "term": "Multiplexor",
        "definition": "Circuito que selecciona información binaria de una de múltiples entradas y la envía a una sola línea de salida."
      },
      {
        "term": "Entradas de un Multiplexor",
        "definition": "Posee 2^n líneas de datos y n líneas de selección que determinan qué entrada pasa a la salida."
      },
      {
        "term": "Demultiplexor",
        "definition": "Circuito combinacional que realiza la función inversa de un multiplexor, direccionando una entrada a una de sus 2^n salidas."
      }
    ],
    "quiz": [
      {
        "question": "¿Qué caracteriza a un sistema combinacional?",
        "options": [
          "Posee memoria interna para recordar estados pasados.",
          "A un mismo vector de entrada le puede corresponder más de uno de salida.",
          "Cada combinación de entrada se corresponde con una y sólo una combinación de salida.",
          "Depende exclusivamente de una señal de reloj."
        ],
        "answer": 2
      },
      {
        "question": "En un semisumador (Half Adder), ¿cuál es la operación lógica que define el bit de resultado S?",
        "options": [
          "S = a AND b",
          "S = a OR b",
          "S = a NOT b",
          "S = a XOR b"
        ],
        "answer": 3
      },
      {
        "question": "¿Qué función cumplen las variables de control en un sistema digital?",
        "options": [
          "Realizan la función matemática principal del circuito.",
          "Influyen en la forma en que el circuito actúa sobre las variables de proceso o salidas.",
          "Son las únicas variables que determinan el resultado de la salida.",
          "Almacenan los datos procesados en la memoria interna."
        ],
        "answer": 1
      },
      {
        "question": "¿Cómo se diferencia un sumador completo (Full Adder) de un semisumador (Half Adder)?",
        "options": [
          "El sumador completo incluye un acarreo de entrada (Cin).",
          "El sumador completo solo tiene una salida.",
          "El semisumador puede sumar tres bits a la vez.",
          "El semisumador no genera acarreo de salida."
        ],
        "answer": 0
      },
      {
        "question": "¿Qué cantidad de compuertas lógicas componen un circuito de escala MSI (Medium Scale of Integration)?",
        "options": [
          "Menos de 12",
          "Entre 12 y 100",
          "Alrededor de 1000",
          "Más de 100000"
        ],
        "answer": 1
      },
      {
        "question": "¿Cuál es la función de un circuito decodificador?",
        "options": [
          "Sumar dos números binarios de n bits.",
          "Seleccionar una de muchas líneas de entrada para enviarla a una sola salida.",
          "Reconocer qué combinación está presente en sus n entradas para activar una sola de sus 2^n salidas.",
          "Almacenar n bits de información de forma secuencial."
        ],
        "answer": 2
      },
      {
        "question": "En un multiplexor con n variables de selección, ¿cuántas líneas de entrada de datos (k) tiene el circuito?",
        "options": [
          "k = n",
          "k = 2 * n",
          "k = n^2",
          "k = 2^n"
        ],
        "answer": 3
      },
      {
        "question": "¿Cuál de las siguientes definiciones describe a un Demultiplexor?",
        "options": [
          "Realiza la función inversa de un multiplexor, direccionando una entrada hacia una de múltiples salidas.",
          "Realiza la función de suma y resta en paralelo.",
          "Minimiza funciones lógicas usando simplificación booleana.",
          "Mantiene estados previos mediante memoria interna."
        ],
        "answer": 0
      },
      {
        "question": "En el diseño de un sumador/restador en paralelo, ¿qué sucede cuando la variable 'Modo' invierte los bits (Bi) y alimenta el acarreo de entrada (Cin-1)?",
        "options": [
          "El circuito multiplica los bits.",
          "Se realiza una suma directa sin considerar el acarreo.",
          "La operación queda configurada como una resta.",
          "Las salidas se vuelven cero inmediatamente."
        ],
        "answer": 2
      },
      {
        "question": "¿Por qué los sistemas secuenciales necesitan poseer memoria interna?",
        "options": [
          "Para reducir el tamaño del circuito y la cantidad de transistores.",
          "Porque sus salidas son consecuencia de la evolución anterior de sus entradas.",
          "Para simplificar el uso de compuertas lógicas exclusivas (XOR).",
          "Para acelerar la decodificación de datos."
        ],
        "answer": 1
      }
    ]
  },
  {
    "id": 4,
    "title": "Unidad 4: Estructura del Computador",
    "description": "Dispositivos de almacenamiento e instrucciones.",
    "pdf": "7- Estructura del Computador - Unidad 4 - Dispositivos de Almacenamiento.pdf",
    "flashcards": [
      {
        "term": "Interfaz de Entrada-Salida",
        "definition": "Método que establece la comunicación entre la unidad central y los periféricos, resolviendo sus diferencias."
      },
      {
        "term": "Memoria Secundaria",
        "definition": "Tipo de almacenamiento masivo y permanente (no volátil), con mayor capacidad pero más lento que la memoria principal."
      },
      {
        "term": "Tecnologías de almacenamiento",
        "definition": "Las tres principales son: Magnética (disco duro), Óptica (CD, DVD) y Electrónica o de Estado Sólido (Memoria Flash)."
      },
      {
        "term": "Caras de un disco",
        "definition": "Superficies de los platos del disco duro donde es posible leer y escribir información (enumeradas como 0, 1, 2, etc.)."
      },
      {
        "term": "Pistas (Tracks)",
        "definition": "Círculos concéntricos en las caras de un disco magnético donde se guardan los datos."
      },
      {
        "term": "Cilindros",
        "definition": "Conjunto de pistas de igual radio en todos los platos de un disco duro, formando un cilindro imaginario."
      },
      {
        "term": "Sectores",
        "definition": "Partes en forma de cuña en las que se divide una pista de un disco; su agrupación forma clústeres."
      },
      {
        "term": "Clúster",
        "definition": "Cantidad mínima de espacio o unidad de asignación que se puede otorgar a un archivo en un disco."
      },
      {
        "term": "Almacenamiento Óptico",
        "definition": "Tecnología donde la información se guarda de forma secuencial en una espiral desde el centro, utilizando tecnología láser."
      },
      {
        "term": "Blu-Ray",
        "definition": "Disco óptico de alta densidad que utiliza un láser azul (405 nm), siendo más rápido y de mayor capacidad que el DVD."
      },
      {
        "term": "Jerarquía de Memoria",
        "definition": "Organización piramidal de la memoria en niveles con el objetivo de equilibrar velocidad, capacidad y costo."
      },
      {
        "term": "Principio de cercanía de referencias",
        "definition": "Principio que afirma que las referencias a datos y programas en un proceso tienden a agruparse en tiempo y espacio."
      },
      {
        "term": "Registros del procesador",
        "definition": "El tipo de memoria más rápida, costosa y de menor capacidad, ubicada en la cima de la jerarquía de memoria."
      },
      {
        "term": "Memoria Caché",
        "definition": "Sistema especial de almacenamiento de alta velocidad (SRAM) que guarda los datos e instrucciones de uso frecuente."
      },
      {
        "term": "Caché L1",
        "definition": "Caché de tamaño reducido integrada dentro de los circuitos del microprocesador, que funciona a su misma velocidad."
      },
      {
        "term": "L1 DC y L1 IC",
        "definition": "Divisiones de la caché L1 para almacenar respectivamente datos (Data Cache) e instrucciones (Instruction Cache) frecuentes."
      },
      {
        "term": "Caché L2",
        "definition": "Nivel de caché que actualmente viene integrada en el microprocesador, agilizando procesos al almacenar datos de uso frecuente."
      },
      {
        "term": "Caché L3",
        "definition": "Memoria integrada en la placa base (o procesador) utilizada para alimentar la caché L2, más rápida que la RAM principal."
      },
      {
        "term": "Mapeo de memoria",
        "definition": "Procedimiento algorítmico que traduce y establece la correspondencia entre direcciones lógicas y físicas."
      },
      {
        "term": "Little Endian",
        "definition": "Formato de almacenamiento donde el byte de menor peso se almacena en la dirección más baja de memoria."
      },
      {
        "term": "Big Endian",
        "definition": "Formato de almacenamiento donde el byte de mayor peso se almacena en la dirección más baja de memoria."
      },
      {
        "term": "Gestión de memoria",
        "definition": "Proceso del sistema operativo encargado de administrar el espacio lógico, proteger procesos y maximizar el rendimiento."
      },
      {
        "term": "Modo Real",
        "definition": "Forma de operar el procesador sin una protección adecuada de memoria, lo que puede causar conflictos entre tareas."
      },
      {
        "term": "Modo Protegido",
        "definition": "Modo de operación del procesador que garantiza el resguardo y la integridad de la memoria entre diferentes procesos."
      },
      {
        "term": "Memoria Virtual",
        "definition": "Técnica que simula tener una memoria principal mucho más amplia alojando partes de programas en el disco secundario."
      },
      {
        "term": "Swapping",
        "definition": "Proceso del sistema operativo para intercambiar páginas o procesos temporalmente entre la memoria principal y el disco de apoyo."
      },
      {
        "term": "Paginación",
        "definition": "Administración de memoria que divide la memoria en bloques contiguos de tamaño fijo llamados páginas (ej. 4 Kbytes)."
      },
      {
        "term": "Segmentación",
        "definition": "Administración de memoria que utiliza bloques lógicos de tamaño variable llamados segmentos, no necesariamente contiguos."
      },
      {
        "term": "Desventaja de la Paginación",
        "definition": "Si se requiere poca memoria (ej. 1 byte), el sistema de todos modos asigna una página completa, desperdiciando el resto."
      },
      {
        "term": "Registros de Segmento (8086/8088)",
        "definition": "Registros como CS (Code Segment), SS (Stack Segment) y DS (Data Segment) que permiten direccionar memoria con desplazamientos (offsets)."
      }
    ],
    "quiz": [
      {
        "question": "¿Cuál de las siguientes tecnologías NO es mencionada como principal para el almacenamiento de información en la actualidad?",
        "options": [
          "Magnética",
          "Óptica",
          "Cuántica",
          "Memoria Flash / Estado Sólido"
        ],
        "answer": 2
      },
      {
        "question": "En la estructura interna de un disco duro, ¿cómo se denomina al conjunto de pistas de igual radio vistas de forma vertical?",
        "options": [
          "Sectores",
          "Cilindros",
          "Clústeres",
          "Platos"
        ],
        "answer": 1
      },
      {
        "question": "Según las reglas de la Jerarquía de Memoria, ¿qué afirmación es correcta?",
        "options": [
          "A mayor capacidad, mayor velocidad.",
          "A menor tiempo de acceso, menor costo.",
          "A menor tiempo de acceso, mayor costo.",
          "A mayor capacidad, mayor costo por bit."
        ],
        "answer": 2
      },
      {
        "question": "¿Cuál es el nivel más alto, rápido y de menor capacidad en la jerarquía de memoria?",
        "options": [
          "Memoria Principal (RAM)",
          "Memoria Caché L2",
          "Registros Internos del Procesador",
          "Almacenamiento Secundario"
        ],
        "answer": 2
      },
      {
        "question": "¿Qué tecnología de memoria se utiliza habitualmente para construir la memoria caché debido a su alta velocidad?",
        "options": [
          "DRAM",
          "SRAM",
          "ROM",
          "Memoria Flash"
        ],
        "answer": 1
      },
      {
        "question": "Si el byte de menor peso de un dato se almacena en la dirección más baja de la memoria, ¿qué formato se está utilizando?",
        "options": [
          "Big Endian",
          "Little Endian",
          "Middle Endian",
          "Segmentado"
        ],
        "answer": 1
      },
      {
        "question": "¿Cuál es el propósito de la técnica de 'Swapping'?",
        "options": [
          "Mover un proceso temporalmente al disco para liberar memoria principal.",
          "Dividir un archivo en partes iguales llamadas páginas.",
          "Aumentar físicamente la memoria RAM instalando más módulos.",
          "Evitar que los virus accedan al almacenamiento secundario."
        ],
        "answer": 0
      },
      {
        "question": "En relación a los modos de operación de los procesadores, ¿qué modo provee resguardo de la integridad y protección de la memoria?",
        "options": [
          "Modo Real",
          "Modo Básico",
          "Modo Lógico",
          "Modo Protegido"
        ],
        "answer": 3
      },
      {
        "question": "¿Cuál es una desventaja característica de usar 'Paginación' (tamaño fijo) en la memoria?",
        "options": [
          "Es imposible usarla con memoria virtual.",
          "Si se requiere un bloque muy pequeño (ej. 1 byte), se desperdicia gran parte de la página asignada.",
          "Requiere que el programador gestione el movimiento de datos manualmente.",
          "Es exclusiva de la familia de procesadores 8086/8088."
        ],
        "answer": 1
      },
      {
        "question": "En los procesadores 8086/8088, ¿qué registro de segmento se utiliza por defecto para las instrucciones que usan la pila (como PUSH y POP)?",
        "options": [
          "CS (Code Segment)",
          "DS (Data Segment)",
          "SS (Stack Segment)",
          "ES (Extra Segment)"
        ],
        "answer": 2
      }
    ]
  },
  {
    "id": 5,
    "title": "Unidad 5: Estructura del Procesador",
    "description": "Lenguaje ensamblador e interrupciones.",
    "pdf": "11- Unidad 5 - Estructura del Procesador.pdf",
    "flashcards": [
      {
        "term": "Unidad de Ejecución (EU)",
        "definition": "Se encarga de realizar las operaciones aritméticas y lógicas, y proporcionar direcciones lógicas a la BIU."
      },
      {
        "term": "Funciones básicas de la EU",
        "definition": "Leer e incrementar el IP, decodificar, ejecutar instrucciones y resolver conflictos."
      },
      {
        "term": "Unidad de Interfaz del Bus (BIU)",
        "definition": "Es la parte del procesador encargada de acceder a memoria y a otros dispositivos de E/S."
      },
      {
        "term": "Información utilizada por la EU",
        "definition": "La instrucción en ejecución, registro de estados, contador de períodos y señales externas."
      },
      {
        "term": "Operaciones elementales",
        "definition": "Los pequeños pasos que se realizan para ejecutar instrucciones (ej. incremento del IP)."
      },
      {
        "term": "Unidad de Control",
        "definition": "Su objetivo es generar secuencias de señales de control que permitan realizar operaciones elementales."
      },
      {
        "term": "Operaciones de transferencia",
        "definition": "Requieren elementos de origen y destino, estableciendo un camino físico para copiar datos sin modificarlos."
      },
      {
        "term": "Operaciones de proceso",
        "definition": "Operaciones donde la información sufre una transformación mediante un operador combinacional."
      },
      {
        "term": "Cola de instrucciones",
        "definition": "Estructura donde la BIU almacena previamente las instrucciones leídas del programa."
      },
      {
        "term": "FIFO (First In, First Out)",
        "definition": "Estructura de la cola de instrucciones; la primera que ingresa es la primera que sale y se ejecuta."
      },
      {
        "term": "Instruction Pointer (IP)",
        "definition": "Registro puntero utilizado por la BIU para saber la dirección de la próxima instrucción."
      },
      {
        "term": "Bus de Direcciones",
        "definition": "Conexiones que indican las localidades de memoria hacia o desde las cuales se enviarán o recibirán datos."
      },
      {
        "term": "Tamaño del Bus de Direcciones",
        "definition": "Define la cantidad de memoria RAM que puede direccionar un microprocesador."
      },
      {
        "term": "Bus de Datos",
        "definition": "Conexiones que transportan el significado de los datos de las instrucciones."
      },
      {
        "term": "Tamaño del Bus de Datos",
        "definition": "Determina el tamaño del conjunto de bits que se transferirán en simultáneo."
      },
      {
        "term": "Bus de Control",
        "definition": "Inmerso en la U.C., sirve para enviar señales de control como carga o lectura de registros."
      },
      {
        "term": "Unidad Aritmético-Lógica (ALU)",
        "definition": "Es la calculadora del sistema, encargada de ejecutar operaciones aritméticas y lógicas."
      },
      {
        "term": "Componentes principales de la ALU",
        "definition": "Registros (Acumulador, temporales, de estado) y la unidad de cálculo."
      },
      {
        "term": "Funciones aritméticas de la ALU",
        "definition": "Realización de operaciones como suma, resta, multiplicación y división."
      },
      {
        "term": "Funciones lógicas de la ALU",
        "definition": "Ejecución de operaciones como la comparación de dos datos."
      },
      {
        "term": "Dispositivo de Adición",
        "definition": "Calcula las operaciones matemáticas en la ALU mediante sumas sucesivas o cambios de signo."
      },
      {
        "term": "Registros de la ALU",
        "definition": "Se utilizan para contener operandos, resultados parciales y finales de las operaciones."
      },
      {
        "term": "Dispositivo de Control de Cálculo",
        "definition": "Componente de la ALU que dirige y controla las operaciones de cálculo."
      },
      {
        "term": "Comparador",
        "definition": "Circuito de la ALU que detecta si dos datos son iguales, o cuál es mayor o menor."
      },
      {
        "term": "Reloj del Sistema",
        "definition": "Accionado por un cristal de cuarzo que vibra para medir operaciones de procesamiento."
      },
      {
        "term": "Ciclo de reloj",
        "definition": "Tiempo que le lleva a un transistor en apagarse y encenderse."
      },
      {
        "term": "Velocidad del procesador",
        "definition": "Está determinada por el ritmo de los impulsos de su reloj, expresada en Hz o ciclos por segundo."
      },
      {
        "term": "Nanosegundo (10^-9 segundos)",
        "definition": "Orden de tiempo que separa los impulsos del reloj en los sistemas modernos."
      },
      {
        "term": "Metrónomo",
        "definition": "Dispositivo al que se asemeja el funcionamiento oscilante del reloj del sistema para definir un ciclo."
      },
      {
        "term": "Sincronización del hardware",
        "definition": "Función de la BIU y el reloj digital para alinear las señales de los circuitos internos con el sistema."
      }
    ],
    "quiz": [
      {
        "question": "¿Cuál de las siguientes es una función principal de la Unidad de Ejecución (EU)?",
        "options": [
          "Leer e incrementar el IP",
          "Acceder a los dispositivos de E/S",
          "Almacenar instrucciones en memoria",
          "Transportar señales de direcciones"
        ],
        "answer": 0
      },
      {
        "question": "¿Qué tipo de estructura utiliza la cola de instrucciones de la BIU?",
        "options": [
          "LIFO (Last In, First Out)",
          "FIFO (First In, First Out)",
          "Árbol Binario",
          "Hash Table"
        ],
        "answer": 1
      },
      {
        "question": "¿Qué característica del sistema está definida por el tamaño del Bus de Direcciones?",
        "options": [
          "La cantidad de bits transferidos simultáneamente",
          "La frecuencia del procesador",
          "La cantidad de memoria RAM que se puede direccionar",
          "El tamaño de la Unidad Aritmético-Lógica"
        ],
        "answer": 2
      },
      {
        "question": "¿Cuál es el objetivo principal de la Unidad de Control (UC)?",
        "options": [
          "Realizar sumas sucesivas",
          "Generar secuencias de señales de control para operaciones elementales",
          "Conectar el procesador a los periféricos externos",
          "Almacenar los resultados finales de un programa"
        ],
        "answer": 1
      },
      {
        "question": "¿Qué circuito de la ALU se encarga de detectar si dos datos son iguales?",
        "options": [
          "Dispositivo de adición",
          "Registro Acumulador",
          "Comparador",
          "Registro de Estado"
        ],
        "answer": 2
      },
      {
        "question": "¿Qué tipo de operación elemental transforma la información al pasarla por un operador combinacional?",
        "options": [
          "Operación de transferencia",
          "Operación de bus",
          "Operación de proceso",
          "Operación de memoria"
        ],
        "answer": 2
      },
      {
        "question": "¿Qué elemento del microprocesador es considerado básicamente como la 'calculadora del sistema'?",
        "options": [
          "Unidad de Interfaz del Bus (BIU)",
          "Unidad Aritmético-Lógica (ALU)",
          "Bus de Control",
          "Registro Instruction Pointer (IP)"
        ],
        "answer": 1
      },
      {
        "question": "Según el texto, ¿a qué se denomina 'ciclo de reloj'?",
        "options": [
          "Al tiempo que tarda en escribirse un dato en disco",
          "Al tamaño total de la memoria RAM",
          "Al tiempo que le lleva a un transistor en apagarse y encenderse",
          "A la velocidad con que gira el disco duro"
        ],
        "answer": 2
      },
      {
        "question": "¿Qué determina el tamaño del Bus de Datos?",
        "options": [
          "El número de periféricos conectados",
          "El tamaño de la placa madre",
          "La velocidad máxima de la computadora",
          "El tamaño del conjunto de bits que se transferirán en simultáneo"
        ],
        "answer": 3
      },
      {
        "question": "¿Cuál de estos registros forma parte de la Unidad Aritmético-Lógica (ALU)?",
        "options": [
          "Registro de segmento CS",
          "Acumulador",
          "Registro IP",
          "Cola de instrucciones"
        ],
        "answer": 1
      }
    ]
  },
  {
    "id": 6,
    "title": "Unidad 6: Interfaz de Entrada/Salida",
    "description": "Buses y transferencia de datos.",
    "pdf": "15 - Unidad 6 - Interfaz_de_Entrada_Salida.pdf",
    "flashcards": [
      {
        "term": "Subsistema de E/S",
        "definition": "Consiste en las interfaces de E/S y los dispositivos periféricos."
      },
      {
        "term": "Interfaz de E/S",
        "definition": "Controla la operatoria de los dispositivos conectados a ella y establece la comunicación con la CPU."
      },
      {
        "term": "Periférico",
        "definition": "Cualquier elemento capaz de realizar un intercambio de datos con la CPU o la Memoria."
      },
      {
        "term": "Problemática del Sistema de E/S",
        "definition": "El sistema debe resolver problemas de direccionamiento, diferentes velocidades y tipos de acceso (lectura/escritura)."
      },
      {
        "term": "Transferencia Elemental",
        "definition": "Intercambio de una única unidad de información con el periférico."
      },
      {
        "term": "Operación de E/S",
        "definition": "Transferencia de un conjunto de datos, requiere sincronización de velocidades y detección de errores."
      },
      {
        "term": "Pasos de Transferencia de E/S",
        "definition": "1. Sincronización CPU-Dispositivo. 2. Transferencia del dato."
      },
      {
        "term": "Métodos principales de E/S",
        "definition": "Polling (Encuesta), Interrupciones y DMA (Acceso Directo a Memoria)."
      },
      {
        "term": "Polling (Sondeo)",
        "definition": "Método de E/S donde la CPU consulta constantemente el estado del dispositivo. Causa pérdida de tiempo por espera activa."
      },
      {
        "term": "Interrupciones Externas",
        "definition": "Interrupciones asíncronas producidas por los dispositivos de E/S."
      },
      {
        "term": "Interrupciones Internas",
        "definition": "Interrupciones síncronas generadas por la CPU, por ejemplo, anomalías en instrucciones o traps."
      },
      {
        "term": "Interrupciones No Enmascarables",
        "definition": "Interrupciones que siempre deben ser atendidas, como RESET, Error de Bus (BERR) o NMI."
      },
      {
        "term": "Interrupciones Enmascarables",
        "definition": "Interrupciones que pueden ser ignoradas usando un flag de habilitación en el registro de estado."
      },
      {
        "term": "DMA (Acceso Directo a Memoria)",
        "definition": "El periférico se comunica directamente con la memoria principal sin la intervención de la CPU en la transferencia."
      },
      {
        "term": "Modos de DMA",
        "definition": "Modo Bloque (Burst), Robo de Ciclo y Bus Transparente."
      },
      {
        "term": "DMA: Modo Bloque (Burst)",
        "definition": "El DMA toma control del bus para transferir un bloque de datos mientras la CPU queda detenida (estado HALT o STOP)."
      },
      {
        "term": "DMA: Robo de Ciclo",
        "definition": "El DMA toma el bus para transferir una única palabra y luego lo devuelve a la CPU. Ralentiza a ambos componentes."
      },
      {
        "term": "DMA: Bus Transparente",
        "definition": "El DMA usa el bus solamente cuando la CPU no lo necesita (por ejemplo, cuando está decodificando instrucciones)."
      },
      {
        "term": "Señales de Control y Tiempo",
        "definition": "Regulan la transferencia elemental indicando cómo y cuándo debe ocurrir."
      },
      {
        "term": "Señales de Dirección",
        "definition": "Permiten representar la dirección del emisor y receptor (contestan ¿De quién? y ¿A quién?)."
      },
      {
        "term": "Señales de Datos (Ancho de Bus)",
        "definition": "Representan los bits del mensaje a transferir. El ancho de bus indica la capacidad de transferencia."
      },
      {
        "term": "Controlador",
        "definition": "Unidad de hardware que gobierna a un periférico, compuesto típicamente por un buffer interno y lógica de control."
      },
      {
        "term": "Manejador de Dispositivo (Driver)",
        "definition": "Programa que la CPU ejecuta para administrar la entrada/salida aislando los detalles de hardware."
      },
      {
        "term": "Interfaz",
        "definition": "Hardware que actúa de nexo entre un periférico y el bus, preparando la transferencia elemental y adecuando las señales."
      },
      {
        "term": "Interfaz Paralela",
        "definition": "Hardware que controla la transferencia en paralelo de múltiples bits simultáneos entre el sistema y el periférico."
      },
      {
        "term": "Ports",
        "definition": "Registros de una interfaz (ej. registro de dato y registro de control) que reciben comandos y devuelven estados."
      },
      {
        "term": "Interfaz Serie",
        "definition": "Hardware que controla la transferencia bit a bit (en serie) mediante registros de desplazamiento."
      },
      {
        "term": "Bus Sincrónico",
        "definition": "Bus donde la actividad está regulada por una señal de reloj (clock) en intervalos fijos de tiempo."
      },
      {
        "term": "Desventaja de transmisión serie",
        "definition": "Genera dificultad en la delimitación de caracteres al enviarse los bits uno tras otro."
      },
      {
        "term": "Handshaking (Apretón de manos)",
        "definition": "Técnica de señales de reconocimiento que permite el diálogo de los dispositivos durante la transferencia."
      }
    ],
    "quiz": [
      {
        "question": "¿Cuál de las siguientes NO es una función principal de la interfaz de E/S?",
        "options": [
          "Almacenar datos y realizar conversiones.",
          "Ejecutar los programas de usuario en memoria.",
          "Establecer la comunicación con la CPU.",
          "Detectar errores en la transmisión."
        ],
        "answer": 1
      },
      {
        "question": "¿Qué método de E/S requiere que la CPU consulte repetidamente el estado del dispositivo, provocando pérdida de tiempo por 'espera activa'?",
        "options": [
          "Acceso Directo a Memoria (DMA)",
          "Interrupciones",
          "Polling (Encuesta / Sondeo)",
          "Bus Transparente"
        ],
        "answer": 2
      },
      {
        "question": "¿Qué tipo de interrupción se genera por una anomalía en una instrucción, como una división por cero?",
        "options": [
          "Interrupción Externa",
          "Interrupción Interna (Síncrona)",
          "Interrupción No Enmascarable (NMI)",
          "Interrupción de Reloj"
        ],
        "answer": 1
      },
      {
        "question": "En el DMA 'Modo Bloque' (Burst), ¿qué le ocurre a la CPU durante la transferencia de datos?",
        "options": [
          "Sigue ejecutando instrucciones normalmente en paralelo.",
          "Queda en estado de HALT o STOP sin usar los buses.",
          "Supervisa directamente cada bit que se transmite.",
          "Pasa a modo seguro de solo lectura."
        ],
        "answer": 1
      },
      {
        "question": "¿Cómo se llama el modo de DMA donde el controlador transfiere una única palabra de datos, cediendo y retomando el control del bus intercaladamente con la CPU?",
        "options": [
          "Bus Transparente",
          "Modo Bloque",
          "Robo de Ciclo",
          "Polling Intercalado"
        ],
        "answer": 2
      },
      {
        "question": "¿Qué indica el 'ancho de bus' de las señales de datos en una transferencia?",
        "options": [
          "La dirección en memoria del periférico.",
          "La capacidad de la memoria caché del procesador.",
          "El número de bits transferidos en paralelo, es decir, el potencial de trabajo.",
          "La frecuencia del reloj (clock) en el bus sincrónico."
        ],
        "answer": 2
      },
      {
        "question": "¿Cómo está constituido fundamentalmente un controlador de periférico?",
        "options": [
          "Por un buffer interno (memoria RAM) y una lógica de control.",
          "Solo por un puerto paralelo de salida.",
          "Por un cable de datos y una antena receptora.",
          "Por la unidad aritmético-lógica (ALU) y un disco."
        ],
        "answer": 0
      },
      {
        "question": "¿De qué manera gestiona los datos una interfaz serie?",
        "options": [
          "Envía múltiples bytes simultáneamente usando puertos DB25.",
          "Transfiere bloques directos a la memoria RAM de a 32 bits.",
          "Recibe o envía la información bit tras bit utilizando registros de desplazamiento.",
          "Usa solo la CPU para enviar datos de a un byte por ciclo."
        ],
        "answer": 2
      },
      {
        "question": "¿Qué técnica utiliza las señales de reconocimiento para el diálogo entre los dispositivos durante una transferencia de E/S?",
        "options": [
          "Handshaking (Apretón de manos)",
          "Desplazamiento a derecha",
          "Enmascaramiento de interrupción",
          "Ejecución en pipeline"
        ],
        "answer": 0
      },
      {
        "question": "¿Cuál de las siguientes interrupciones suele ser considerada 'No Enmascarable'?",
        "options": [
          "Terminación del movimiento de un disco",
          "Reset (RESET) o Error de Bus (BERR)",
          "Pulsación de tecla del teclado",
          "Entrada de un puerto paralelo"
        ],
        "answer": 1
      }
    ]
  },
  {
    "id": 7,
    "title": "Unidad 7: Traductores",
    "description": "Arquitecturas CISC y RISC.",
    "pdf": "17 - Unidad 7 Arquitectura CISC_y_RISC.pdf",
    "flashcards": [
      {
        "term": "CISC (Significado)",
        "definition": "Complex Instruction Set Computer (Computadora con un Conjunto de Instrucciones Complejo)."
      },
      {
        "term": "Característica principal de los microprocesadores CISC",
        "definition": "Poseen un conjunto de instrucciones muy amplio que permite operaciones complejas entre operandos en memoria o registros."
      },
      {
        "term": "Unidad de Control en CISC",
        "definition": "Utiliza una ROM de microcódigo, ya que una instrucción compleja emplea varias microinstrucciones."
      },
      {
        "term": "Modos de direccionamiento en CISC",
        "definition": "Admite múltiples modos, lo que aumenta el número de instrucciones y su complejidad para acceder al dato."
      },
      {
        "term": "Fase FETCH en CISC",
        "definition": "Las instrucciones no se obtienen de la memoria en el mismo número de ciclos para cada una de sus variantes."
      },
      {
        "term": "Paralelismo en arquitectura CISC",
        "definition": "Se dificulta el paralelismo entre instrucciones, por lo que muchos CISC modernos convierten sus instrucciones a simples tipo RISC."
      },
      {
        "term": "Microprogramación (Definición)",
        "definition": "Técnica donde cada instrucción de máquina es interpretada por un microprograma en una memoria del procesador (común en CISC)."
      },
      {
        "term": "Origen e impacto de la microprogramación",
        "definition": "Surgió en los '60, permitiendo procesadores con compatibilidad ascendente y poderosos conjuntos de instrucciones."
      },
      {
        "term": "Ciclos de reloj por instrucción en CISC",
        "definition": "Las instrucciones compuestas requieren de varios ciclos de reloj (al menos uno por microinstrucción)."
      },
      {
        "term": "Propósito original de la Arquitectura CISC",
        "definition": "Proporcionar una única instrucción de máquina para cada instrucción que esté escrita en un lenguaje de alto nivel."
      },
      {
        "term": "Formato de instrucciones CISC",
        "definition": "Posee formatos de instrucciones de tamaño variable (por ejemplo, de dos a cinco bytes)."
      },
      {
        "term": "Manipulación de operandos en CISC",
        "definition": "Las instrucciones proporcionan manipulación directa de los operandos que residen en la memoria."
      },
      {
        "term": "RISC (Significado)",
        "definition": "Reduced Instruction Set Computer (Computadora con Conjunto de Instrucciones Reducido)."
      },
      {
        "term": "Transferencia de datos en RISC",
        "definition": "Están limitadas a las instrucciones de cargar (Load) y almacenar (Store) empleando direccionamiento directo por registro."
      },
      {
        "term": "Memorias separadas en RISC",
        "definition": "Utiliza canales separados para almacenar instrucciones y datos, evitando conflictos de acceso (memoria cache)."
      },
      {
        "term": "Velocidad de ejecución en RISC",
        "definition": "Su principal ventaja es la capacidad de ejecutar una instrucción por cada ciclo de reloj gracias al paralelismo."
      },
      {
        "term": "Segmentación en RISC vs CISC",
        "definition": "RISC aprovecha mejor los segmentos paralelos (1 ciclo por segmento), mientras CISC requiere múltiples ciclos en sus segmentos."
      },
      {
        "term": "Instrucciones de memoria en RISC",
        "definition": "Solo existen dos: Load y Store, que se usan para cargar operandos en su gran cantidad de registros."
      },
      {
        "term": "Operaciones aritméticas en RISC",
        "definition": "Son operaciones registro a registro, típicamente con tres operandos (dos de origen y uno para el resultado)."
      },
      {
        "term": "Ventaja de los tres operandos en RISC",
        "definition": "El resultado no sobrescribe los operandos origen, permitiendo reutilizarlos sin acceder nuevamente a la memoria."
      },
      {
        "term": "Independencia de actividades en RISC",
        "definition": "Separar el acceso a memoria de los cálculos facilita la concurrencia y el procesamiento segmentado."
      },
      {
        "term": "Formato de instrucción RISC",
        "definition": "Tienen formato fijo y codificación uniforme, con el código de operación siempre en la misma posición para una decodificación más rápida."
      },
      {
        "term": "Conjunto de registros en RISC",
        "definition": "Es homogéneo, permitiendo que cualquier registro se use en cualquier contexto y simplificando el compilador."
      },
      {
        "term": "Modos de direccionamiento en RISC",
        "definition": "Son simples; los modos complejos de CISC se reemplazan en RISC por secuencias de instrucciones aritméticas simples."
      },
      {
        "term": "Tipos de datos soportados en hardware",
        "definition": "CISC soporta tipos complejos (byte, cadena) nativamente, mientras que RISC no suele incluirlos en el hardware."
      },
      {
        "term": "Ubicación de la complejidad (RISC vs CISC)",
        "definition": "En CISC la complejidad reside en el microprograma (hardware), mientras que en RISC la complejidad está en el compilador."
      },
      {
        "term": "Ejecución de instrucciones (Hardware/Software)",
        "definition": "RISC ejecuta instrucciones directamente por hardware, CISC las interpreta mediante microprogramas."
      },
      {
        "term": "Fases de procesamiento (Serie vs Etapas)",
        "definition": "CISC realiza poco procesamiento en serie (varios ciclos), RISC hace procesamiento en serie de varias etapas (pipeline)."
      },
      {
        "term": "Ejemplos de Arquitectura CISC",
        "definition": "Intel 8086, 8088, 80286, 80386, 80486 y Motorola 68000, 68010, 68020, 68030, 6840."
      },
      {
        "term": "Ejemplos de Arquitectura RISC",
        "definition": "POWERPC, DEC ALPHA, MIPS, ARM, APPLE."
      }
    ],
    "quiz": [
      {
        "question": "¿Cuál es el significado de la sigla CISC?",
        "options": [
          "Complex Instruction Set Computer",
          "Central Instruction System Controller",
          "Common Instruction Set Cache",
          "Computer Instruction Standard Code"
        ],
        "answer": 0
      },
      {
        "question": "¿Qué componente utiliza una Unidad de Control CISC para interpretar las instrucciones?",
        "options": [
          "Un conjunto de registros homogéneos",
          "Una ROM de microcódigo",
          "Memoria cache separada para datos y códigos",
          "Segmentación de cauce pura"
        ],
        "answer": 1
      },
      {
        "question": "¿Qué característica es propia del formato de instrucciones en la arquitectura CISC?",
        "options": [
          "Son siempre de 32 bits",
          "Su tamaño es fijo",
          "Poseen formatos de tamaño variable",
          "Sólo ocupan un byte"
        ],
        "answer": 2
      },
      {
        "question": "¿Cuál es el significado de la sigla RISC?",
        "options": [
          "Random Instruction System Core",
          "Reduced Instruction Set Computer",
          "Rapid Instruction Speed Controller",
          "Registry In System Cache"
        ],
        "answer": 1
      },
      {
        "question": "¿Qué instrucciones se utilizan en la arquitectura RISC para acceder a la memoria?",
        "options": [
          "PUSH y POP",
          "ADD y SUB",
          "JUMP y CALL",
          "LOAD y STORE"
        ],
        "answer": 3
      },
      {
        "question": "¿Cómo es el conjunto de registros en la arquitectura RISC?",
        "options": [
          "Homogéneo, cualquier registro se usa en cualquier contexto",
          "Heterogéneo, registros dedicados estrictamente por instrucción",
          "Limitado a un solo registro acumulador",
          "Inexistente, todas las operaciones son en memoria"
        ],
        "answer": 0
      },
      {
        "question": "En las arquitecturas CISC, ¿dónde reside principalmente la complejidad del diseño?",
        "options": [
          "En el compilador",
          "En el microprograma",
          "En el sistema operativo",
          "En la memoria principal"
        ],
        "answer": 1
      },
      {
        "question": "¿Qué familia de procesadores es un ejemplo clásico de arquitectura CISC?",
        "options": [
          "ARM",
          "POWERPC",
          "Intel 8086, 80286, 80386",
          "MIPS"
        ],
        "answer": 2
      },
      {
        "question": "En una instrucción aritmética típica de RISC, ¿cuántos operandos se especifican generalmente?",
        "options": [
          "Uno",
          "Dos",
          "Tres (dos de origen y uno de resultado)",
          "Cuatro"
        ],
        "answer": 2
      },
      {
        "question": "¿Por qué RISC suele utilizar dos memorias separadas?",
        "options": [
          "Para almacenar registros de enteros y de punto flotante por separado",
          "Para procesar instrucciones CISC emuladas",
          "Una para instrucciones y otra para datos, evitando conflictos de acceso",
          "Para respaldar la memoria virtual en caso de fallos"
        ],
        "answer": 2
      }
    ]
  }
];
