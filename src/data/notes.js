// Apuntes de cursada transcritos del cuaderno, por unidad.
// Formato ligero tipo Markdown (ver components/NotesPanel.jsx):
//   ## Sección   ### Subsección   - ítem (2 espacios para anidar)   | tabla |
//   **negrita**  `código`   > nota destacada   líneas en blanco separan párrafos.

export const notes = {
  1: [
    {
      title: 'Introducción y sistemas de numeración',
      content: `
En **informática** se trabaja con un conjunto de datos para elaborarlo, procesarlo y obtener un resultado en un proceso de:

> Entrada → Memoria → Proceso → Salida

- Las computadoras almacenan **datos e instrucciones** en memoria. Utilizan el **sistema binario** (0 ó 1).
- **Bit** (Binary Digit): unidad mínima de información que viaja y se almacena en un computador.
- **8 bits** se denominan **Byte** (es el número de bits necesarios para representar un carácter).

**Sistema de numeración:** conjunto de reglas y convenciones que permiten la representación de todos los números mediante varios signos o varias palabras.

| Sistema | Base | Dígitos |
| --- | --- | --- |
| Decimal | 10 | 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 |
| Binario | 2 | 0, 1 |
| Octal | 8 | 0, 1, 2, 3, 4, 5, 6, 7 |
| Hexadecimal | 16 | 0 … 9, A, B, C, D, E, F |

**Ecuación general:** \`N = Σ (i = -k … h) dᵢ · 10ⁱ\`, donde 10 es la "base".

Ej: \`212)₁₀ = 2·10² + 1·10¹ + 2·10⁰\`
`,
    },
    {
      title: 'Tabla de equivalencias y agrupaciones',
      content: `
| Decimal | Binario | Octal | Hexadecimal |
| --- | --- | --- | --- |
| 0 | 0 | 0 | 0 |
| 1 | 1 | 1 | 1 |
| 2 | 10 | 2 | 2 |
| 3 | 11 | 3 | 3 |
| 4 | 100 | 4 | 4 |
| 5 | 101 | 5 | 5 |
| 6 | 110 | 6 | 6 |
| 7 | 111 | 7 | 7 |
| 8 | 1000 | 10 | 8 |
| 9 | 1001 | 11 | 9 |
| 10 | 1010 | 12 | A |
| 11 | 1011 | 13 | B |
| 12 | 1100 | 14 | C |
| 13 | 1101 | 15 | D |
| 14 | 1110 | 16 | E |
| 15 | 1111 | 17 | F |
| 16 | 10000 | 20 | 10 |

- \`2⁴ = 16\` → **4 cifras binarias** se corresponden con **una hexadecimal**.
- \`2³ = 8\` → **3 cifras binarias** se corresponden con **una octal**.

Ej: \`29E5)₁₆ = 0010 1001 1110 0101)₂\` (2 · 9 · E · 5)

Ej: \`106)₈ = 001 000 110)₂\` (1 · 0 · 6)
`,
    },
    {
      title: 'Conversión entre números de distintas bases',
      content: `
### a) Parte entera
Se **divide** el número por la nueva base. El cociente se escribe debajo del número original y repetimos el procedimiento hasta que el residuo sea menor al divisor.
El nuevo número se forma **de derecha a izquierda** a partir del último cociente, tomando todos los residuos de las divisiones anteriores.

Ej: pasar \`42)₁₀\` a binario:

| División | Cociente | Resto |
| --- | --- | --- |
| 42 ÷ 2 | 21 | 0 |
| 21 ÷ 2 | 10 | 1 |
| 10 ÷ 2 | 5 | 0 |
| 5 ÷ 2 | 2 | 1 |
| 2 ÷ 2 | 1 | 0 |
| 1 ÷ 2 | 0 | 1 |

> 42)₁₀ = 101010)₂ (restos leídos de abajo hacia arriba)

### b) Parte decimal
La parte fraccionaria se convierte **multiplicando** el número por la base; tomamos la parte entera del resultado y la parte fraccionaria la volvemos a multiplicar sucesivamente hasta llegar a **cero**.

Ej: pasar \`1,375)₁₀\` a binario:

- 0,375 · 2 = **0**,75
- 0,75 · 2 = **1**,50
- 0,50 · 2 = **1**,00

> 1,375)₁₀ = 1,011)₂

### Conversión a base decimal
Tomamos los dígitos y los multiplicamos por la base elevada a la posición que ocupa cada dígito.

Ej: \`204)₈ = 2·8² + 0·8¹ + 4·8⁰ = 132)₁₀\`

### Mapa de conversiones
- Binario ↔ Octal: **agrupación de 3** bits.
- Binario ↔ Hexadecimal: **agrupación de 4** bits.
- Binario / Octal / Hexadecimal ↔ Decimal: **sumatorias y divisiones**.

**Operaciones aritméticas binarias:** suma, resta y multiplicación.
`,
    },
    {
      title: 'Números sin signo (BSS) y con signo (BCS)',
      content: `
### Números sin signo (BSS)
- Número mínimo: **0**
- Número máximo: **2ⁿ − 1**
- Rango: **2ⁿ** valores

Ej: con 4 bits puedo representar 16 números y el 15 es el mayor.

### Números con signo (BCS)
Con n bits, **1 bit representa el signo** y **n − 1 bits la magnitud**.

| bₙ₋₁ | bₙ₋₂ … b₀ |
| --- | --- |
| Signo | Magnitud |

- Un **0** en el bit de signo indica que el número es **positivo** y un **1** que es **negativo**.
- El rango depende de la convención (SyM, Ca2, Ca1).

### Representación de números con signo
- Signo y Módulo
- Complemento a la Base (Ca2)
- Complemento a la Base − 1 (Ca1)
- Exceso
`,
    },
    {
      title: 'Signo y Módulo',
      content: `
- Se asigna un bit para representar el signo: **0 = positivo**, **1 = negativo**.
- Los n − 1 bits restantes se utilizan para representar la magnitud del número en valor absoluto (**módulo**).

| Desventajas | Ventajas |
| --- | --- |
| Es más complejo operar aritméticamente. | Posee un **rango simétrico**. |
| Posee **doble representación del cero** (+0 y −0). | Para n bits el rango decimal es ±(2ⁿ⁻¹ − 1). |
`,
    },
    {
      title: 'Complemento a la base (Ca2) y a la base − 1 (Ca1)',
      content: `
### Complemento a la base (Ca2)
- El complemento a la base de un número N es **lo que le falta a N para llegar al módulo 10ⁿ**.
- Los números positivos comienzan con **0** y los negativos con **1**.
- El rango es **asimétrico** y va desde −(2ⁿ⁻¹) a +(2ⁿ⁻¹ − 1).
- Existe **una sola representación del 0**.

**Expresión general:** \`C_B = 10ⁿ − N\` → \`Ca2 = 2ⁿ − N\`

### Complemento a la base − 1 (Ca1)
- El complemento a la base menos uno de un número N es lo que le falta a N para llegar al módulo 10ⁿ − 1.
- En base 2, Ca1 se obtiene **invirtiendo todos los bits**.
- El rango: −(2ⁿ⁻¹ − 1) a +(2ⁿ⁻¹ − 1), con **doble representación del cero** (+0 y −0).

**Expresión general:** \`C_(B−1) = (10ⁿ − 1) − N\` → \`Ca1 = (2ⁿ − 1) − N\`
`,
    },
    {
      title: 'Punto flotante: Exceso 127 IEEE normalizado',
      content: `
Es una convención utilizada para trabajar con **números reales de alto rango**. Sería como una representación exponencial de los números decimales convencional, semejante a la notación científica.

> N = ±m · 10^±e

### Formato (32 bits, precisión sencilla)

| S | Característica | Mantisa |
| --- | --- | --- |
| 1 bit | 8 bits | 23 bits |

- S: **0 = positivo**, **1 = negativo**.
- Doble precisión: **64 bits**. Extendida: **80 bits**.

Ej: \`5)₁₀ = 101)₂ = +1,01 · 2¹⁰\` → se desplazó la coma 2 lugares a la izquierda para normalizar.

\`C = 127 ± P = 127 + 2 = 129)₁₀ = 10000001)₂\`

| S | Característica | Mantisa |
| --- | --- | --- |
| 0 | 10000001 | 01000000000000000000000 |

### Casos especiales

| Característica | Mantisa | Significado |
| --- | --- | --- |
| 1111 1111 | M = 0 | ±∞ |
| 1111 1111 | M ≠ 0 | Operaciones inválidas (NaN) |
| 0000 0000 | M = 0 y S = 1 | 0 |
| 0000 0000 | M ≠ 0 | El número está desnormalizado |

Intervalo del exponente: **[−128, +127]**.
`,
    },
    {
      title: 'Banderas (flags) y códigos de representación',
      content: `
### Banderas (flags)

| Flag | Valor 0 | Valor 1 |
| --- | --- | --- |
| Signo (S) | Resultado positivo | Resultado negativo |
| Cero (Z) | Resultado ≠ 0 | Resultado = 0 |
| Carry (C) | No existe acarreo | Existe acarreo |
| Overflow (V) | No existe overflow | Existe overflow |

### Códigos de representación
- **BCD** (Binary-Coded Decimal): es el sistema decimal codificado en binario, donde **cada dígito decimal se reemplaza de forma independiente por exactamente 4 bits** binarios según la tabla de equivalencias.
- **Código ASCII** (normal y extendido): convención utilizada para **traducir caracteres de texto a valores binarios o hexadecimales** legibles por la máquina.
`,
    },
  ],

  2: [
    {
      title: 'Sistema digital y Álgebra de Boole',
      content: `
**Sistema digital:** es aquel cuyos elementos sólo pueden adoptar valores **discretos**. Trabajan con elementos binarios.

### Álgebra de George Boole (1854)
- Permite **expresar en forma algebraica las operaciones lógicas** que realizan los circuitos digitales y **determinar su respuesta**.
- Consiste en un conjunto de **axiomas** (premisas que se aceptan como base del sistema y no se deducen de otras) y **teoremas** (una proposición que afirma una verdad demostrable).
- El álgebra es un **conjunto de elementos binarios** relacionados entre sí mediante las **operaciones lógicas producto "·" y suma "+"**, que cumplen con los siguientes postulados.
`,
    },
    {
      title: 'Postulados',
      content: `
### 1) Existe el elemento identidad
- \`A + 0 = A\`
- \`A · 1 = A\`

### 2) Propiedad conmutativa
- \`A + B = B + A\`
- \`A · B = B · A\`

### 3) Propiedad distributiva
- a) \`A · (B + C) = (A · B) + (A · C)\`
- b) \`A + (B · C) = (A + B) · (A + C)\`
- c) \`(A · B) + C = (A + C) · (B + C)\`
- d) \`A + Ā · B = A + B\` → \`(A + Ā) · (A + B) = 1 · (A + B) = A + B\`

### 4) Complementación o inversión lógica
- \`A + Ā = 1\`
- \`A · Ā = 0\`

### 5) Cancelación
- \`(A · B) + A = A\` → \`A · (1 + B) = A · 1 = A\`
- \`(A + B) · A = A\` → \`A · A + A · B = A + A · B = A · (B + 1) = A · 1 = A\`
`,
    },
    {
      title: 'Teoremas',
      content: `
- **Principio de dualidad:** toda igualdad lógica sigue siendo válida si se intercambian los operadores ("+" y "·") y los elementos de identidad (0 y 1).
- **El álgebra es un conjunto cerrado:** los resultados de aplicar las operaciones lógicas a las variables pertenecen al álgebra.
- **En el álgebra se cumple que:** \`A + 1 = 1\` y \`A · 0 = 0\`
- **Ley de idempotencia:** \`A + A = A\` y \`A · A = A\`
- **Ley de involución:** \`Ā̄ = A\`
- **Asociativa:** \`A + (B + C) = (A + B) + C\` y \`A · (B · C) = (A · B) · C\`
- **Leyes de De Morgan:** \`(A + B)‾ = Ā · B̄\` y \`(A · B)‾ = Ā + B̄\`

### Jerarquía de operadores
- Si existen paréntesis: de adentro hacia afuera.
- Si **no** existen paréntesis: **1° NOT** (negación), **2° AND** (producto), **3° OR** (suma).
`,
    },
    {
      title: 'Compuertas lógicas',
      content: `
Permite **conmutar el nivel de tensión** de un cable conectado a su salida.

- **Compuerta:** porque se relaciona con el hecho de que este dispositivo puede usarse para **permitir o no** que el nivel alto o bajo de un cable que llega a una de sus entradas se repita en su salida.
- **Lógica:** en esencia realiza electrónicamente una operación lógica. Para cada combinación de valores lógicos existentes en las entradas, resultará un valor lógico en su salida.

| Compuerta | Función | 00 | 01 | 10 | 11 |
| --- | --- | --- | --- | --- | --- |
| OR | X = A + B | 0 | 1 | 1 | 1 |
| AND | X = A · B | 0 | 0 | 0 | 1 |
| XOR (OR exclusivo) | X = A ⊕ B = Ā·B + A·B̄ | 0 | 1 | 1 | 0 |
| NOR | X = (A + B)‾ | 1 | 0 | 0 | 0 |
| NAND | X = (A · B)‾ | 1 | 1 | 1 | 0 |

| Compuerta | Función | A = 0 | A = 1 |
| --- | --- | --- | --- |
| Inversor (NOT) | X = Ā | 1 | 0 |
`,
    },
    {
      title: 'Formas canónicas',
      content: `
**Término canónico de una función lógica:** es todo producto o suma en los cuales aparecen **todas las variables** en su forma directa o inversa.
Las funciones lógicas son expresables en forma canónica, ya sea como **"suma de mintérminos"** o como **"producto de maxtérminos"**.

### Mintérminos
- Dado un número de n variables, un mintérmino es un **producto lógico** cuyos factores son **todas** las variables, negadas o no.
- Ej: \`Ā · B̄ · C = 001\` (3 variables)
- Para cada mintérmino existe **una sola combinación** para la cual el producto resulta 1, y en forma recíproca, dada una combinación de valores de las variables, existe **un solo mintérmino** que resulta igual a 1 para dicha combinación.

### Maxtérminos
- Es una expresión lógica de n variables que consiste únicamente en la **disyunción lógica** (OR) y el operador complemento o negación. Son una expresión **dual** de los mintérminos: en lugar de AND utilizamos OR.
- Ej: \`A + B̄ + C\`
- **Dualización:** el complemento de un mintérmino es su respectivo maxtérmino.
`,
    },
    {
      title: 'Minimización de funciones: Mapas de Karnaugh',
      content: `
- Son formas **modificadas de tablas de verdad** que permiten **minimizar** funciones.
- Permiten el **diseño rápido de circuitos combinacionales de mínimo costo**, es decir, con el mínimo número de compuertas.

### Diagrama de Karnaugh
Es una matriz de n × m con variables adecuadamente dispuestas que permite obtener **funciones mínimas** a partir del **agrupamiento de celdas adyacentes**. Los grupos resultantes pueden ser de 1, 2, 4, 8 ó 16 celdas; cuanto mayor sea el agrupamiento, más variables serán eliminadas.

| Agrupando | Efecto |
| --- | --- |
| 1 | No se elimina ninguna variable |
| 2 | Se elimina 1 variable |
| 4 | Se eliminan 2 variables |
| 8 | Se eliminan 3 variables |
| 16 | El resultado es "1" |

Mapa de 4 variables (AB en filas, CD en columnas, orden Gray 00-01-11-10):

| AB \\ CD | 00 | 01 | 11 | 10 |
| --- | --- | --- | --- | --- |
| 00 | 0 | 1 | 3 | 2 |
| 01 | 4 | 5 | 7 | 6 |
| 11 | 12 | 13 | 15 | 14 |
| 10 | 8 | 9 | 11 | 10 |

**Código de Gray:** sistema utilizado para organizar el mapa asegurando que las filas y columnas adyacentes **cambien una sola variable a la vez**.
`,
    },
  ],

  3: [
    {
      title: 'Sistema digital, combinacional y secuencial',
      content: `
**Sistema digital:** es un conjunto de elementos binarios que se encuentran relacionados entre sí de alguna manera. Tiene dos tipos de variables:

- **Variables de salida** (dependientes de las variables de entrada).
- **Variables de entrada:**
  - **De proceso:** son aquellas con las que el circuito puede realizar una determinada función u operación.
  - **De control:** son aquellas que **influyen en la forma en que el circuito actúa** sobre las variables de proceso o sobre el nivel lógico de las variables de salida.

### Sistema combinacional
Cuando cada combinación de las variables de entrada se corresponde con **una y sólo una** combinación de las variables de salida.

### Sistema secuencial
- Cuando un mismo vector de entrada puede corresponder a **más de uno de salida**.
- Deben poseer **memoria interna** ya que sus salidas son consecuencia de la evolución de sus entradas.

### Circuito combinacional
- Son aquellos cuyas **salidas** en un determinado instante son función exclusivamente del valor de las **entradas** en dicho instante.
- Están compuestos por operaciones booleanas básicas (AND, OR, NOT).

**Bloques combinacionales estándares principales:** sumadores y restadores, decodificadores, multiplexores.
`,
    },
    {
      title: 'Sumadores',
      content: `
### a) Semisumador elemental (Half Adder)
Es un circuito que **suma dos bits** de entrada "a" y "b" y devuelve un bit de resultado "S" y un bit de acarreo "Cout".

- \`S = a ⊕ b\`
- \`C = a · b\`

| a | b | S | C |
| --- | --- | --- | --- |
| 0 | 0 | 0 | 0 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 1 |

### b) Sumador elemental completo (Full Adder)
Es un circuito que suma dos bits de entrada "a" y "b", **más un acarreo de entrada "Cin"**, y devuelve un bit de resultado "S" y un bit de acarreo "Cout".

- \`S = a ⊕ b ⊕ Cin\`
- \`Cout = a·b + a·Cin + b·Cin\`

| a | b | Cin | Cout | S |
| --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 0 | 1 |
| 0 | 1 | 0 | 0 | 1 |
| 0 | 1 | 1 | 1 | 0 |
| 1 | 0 | 0 | 0 | 1 |
| 1 | 0 | 1 | 1 | 0 |
| 1 | 1 | 0 | 1 | 0 |
| 1 | 1 | 1 | 1 | 1 |

### c) Sumador / Restador
Los circuitos que realizan operaciones en **paralelo** son más **rápidos** en sus respuestas, casi inmediatos para dar un resultado.
`,
    },
    {
      title: 'Escalas de integración',
      content: `
El diseño de hardware evoluciona desde el uso de compuertas básicas hacia bloques constructores de mayor complejidad, clasificándose según su escala de integración:

| Escala | Nombre | Compuertas |
| --- | --- | --- |
| SSI | Small Scale Integration | Diseños básicos con un número pequeño de transistores / compuertas |
| MSI | Medium Scale Integration | 12 a 100 |
| LSI | Large Scale Integration | ~1.000 |
| VLSI | Very Large Scale Integration | > 1.000 |
| ULSI | Ultra Large Scale Integration | > 100.000 |
`,
    },
    {
      title: 'Decodificador, multiplexor y demultiplexor',
      content: `
### Decodificador
Módulo combinacional que **convierte** un código de entrada de n bits en un código de salida de m bits (donde n ≤ m ≤ 2ⁿ), asignando un **único código de salida para cada entrada válida**.

Posee **n entradas** y **2ⁿ salidas** (compuertas AND).

| A₁ | A₂ | D₃ | D₂ | D₁ | D₀ |
| --- | --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 0 | 0 | 1 |
| 0 | 1 | 0 | 0 | 1 | 0 |
| 1 | 0 | 0 | 1 | 0 | 0 |
| 1 | 1 | 1 | 0 | 0 | 0 |

### Multiplexor
Es un circuito combinacional que **selecciona** información de entre varias entradas y la **canaliza** hacia una única salida. Tiene:

- **2ⁿ entradas de datos** ("k" canales: 2, 4, 8, 16, etc.).
- **n líneas de selección:** la combinación de sus bits determina qué entrada se transmite a la salida.
- **1 salida** ("S").

Ej: dada \`F(R,S,T,U) = Σm(0, 1, 6, 7, 10, 11, 13)\`, realizar un multiplexor con 3 variables de control → MUX (8 × 3): 1 variable de residuo (U) y 3 variables de control (R, S, T). Cada entrada del MUX se conecta a 0, 1, U o Ū según lo que indique el mapa de Karnaugh para esa combinación de R, S, T.

### Demultiplexor
- Realiza la función **inversa** de un multiplexor.
- El valor lógico de la línea de entrada puede ser direccionado mediante **n entradas de selección**, para que aparezca en una de sus **2ⁿ líneas de salida**.
`,
    },
  ],

  4: [
    {
      title: 'Dispositivos del sistema e interfaz de E/S',
      content: `
### Clasificación de dispositivos del sistema
- **Entrada:** teclado, mouse, scanner.
- **Salida:** monitor, impresora.
- **Comunicación:** tarjeta de red.
- **Almacenamiento:** disco rígido, CD, DVD.
- **Cómputo:** unidad central de procesamiento.

### Interfaz de Entrada / Salida (E/S)
- Establece la **comunicación entre la CPU y el proceso**, filtrando, adaptando y codificando las señales precedentes de la entrada para hacerlas comprensibles por la CPU, y decodificando y amplificando las señales de salida.
- El **propósito** es resolver las diferencias operativas y de velocidad que existen entre la computadora central y cada periférico.

**Funciones principales de la interfaz:**
- Almacenar los datos y realizar las conversiones que se requieran.
- Detectar errores en la transmisión.
- Ser capaz de reiniciar la transacción en casos de error.
- Testear, arrancar y detener el dispositivo según las directivas impartidas por la CPU.
- Consultar a la CPU si algún dispositivo requiere atención urgente.
`,
    },
    {
      title: 'Almacenamiento auxiliar o secundario',
      content: `
Dispositivos y soportes que conforman el subsistema de **almacenamiento masivo y permanente (no volátil)** de una computadora.

### Diferencia entre unidades y soportes
- **Dispositivos o unidades:** aparatos que **leen o escriben** los datos almacenados (ej: HDD, lectora óptica, lector de tarjeta).
- **Soportes o medios:** superficies o materiales físicos en donde **residen** los datos (ej: CD/DVD, cintas, tarjetas de memoria flash / SSD).

### Características principales
- Gran capacidad de almacenamiento.
- No volátil.
- Altas velocidades de transferencia.
- Conserva el mismo formato de almacenamiento de la memoria principal.
- Es independiente de la CPU y de la memoria principal.

### Tecnologías principales
- **Magnética:** aplica campos magnéticos sobre materiales magnetizables (discos rígidos HDD, cintas magnéticas).
- **Óptica:** lectura/escritura mediante haz láser en espiral (CD, DVD, Blu-ray).
- **Electrónica / estado sólido:** basada en tecnologías de memoria flash (tarjetas flash, SSD).
`,
    },
    {
      title: 'Almacenamiento magnético y óptico',
      content: `
### Almacenamiento magnético
Aplicación de campos magnéticos sobre partículas para orientar sus dominios magnéticos representando bits.

**Composición interna:**
- **Caras:** cada plato posee **2 caras** de lectura/escritura.
- **Pistas:** círculos concéntricos en los que se divide cada cara. La pista de **mayor radio es la número 0**.
- **Cilindros:** conjunto de pistas situadas en el **mismo radio** a través de todos los platos.
- **Sectores:** divisiones en forma de cuña. Todas las pistas se dividen en el mismo número de sectores y de igual área.

**Clúster (unidad de asignación):**
- Es la **cantidad mínima de espacio que el sistema operativo puede asignar a un archivo**.
- Representa la menor unidad de almacenamiento en disco.

### Almacenamiento óptico
- Los datos se almacenan de forma **secuencial** en una **espira que comienza en el centro** del disco.
- **Ventajas:** alta capacidad, alta fiabilidad, resistencia a los arañazos, la suciedad y a los efectos de los campos magnéticos.
`,
    },
    {
      title: 'Jerarquía de memoria',
      content: `
Se trata de la **organización piramidal** de la memoria en niveles.

- **Objetivo:** lograr un rendimiento de una memoria de **gran velocidad** al costo de una memoria de **baja velocidad**. Se fundamenta en el **principio de cercanía de referencias**: las referencias a programas y datos tienden a agruparse en regiones pequeñas durante ciertos intervalos de tiempo.
- La determinación de una jerarquía de memoria se basa en **tres atributos**: 1. velocidad de acceso, 2. costo de celda (bit), 3. capacidad de almacenamiento.

### Reglas de la jerarquía
- A **menor tiempo de acceso** → **mayor costo por bit**.
- A **mayor capacidad** → **menor costo por bit**.
- A **mayor capacidad** → **menor velocidad de acceso**.

### Pirámide (de arriba hacia abajo: ↑ velocidad y costo por bit, ↓ capacidad)
1. Registros del procesador
2. Memoria caché (L1, L2, L3)
3. Memoria RAM
4. Disco duro / almacenamiento secundario
5. Copias de seguridad (cinta magnética, disco duro extraíble, almacenamiento de red)

### Registros internos del procesador
- Un registro es una memoria de **alta velocidad y poca capacidad**, integrada en el microprocesador.
- Son la manera **más rápida** que tiene el sistema de almacenar datos.
- Se miden por el **número de bits** que almacenan (ej: 8 ó 16 bits) e incluyen registros indexados para instrucciones y de propósito específico.
`,
    },
    {
      title: 'Memoria caché',
      content: `
- Una caché es un **sistema especial de almacenamiento de alta velocidad**.
- Puede ser un área reservada de la memoria principal o un dispositivo de almacenamiento independiente.
- **Tipos:** memoria caché y caché de disco.
- **SRAM (Static RAM):** memoria **rápida, costosa y de baja densidad**, basada en transistores. Se utiliza principalmente como **memoria caché**.
- **DRAM (Dynamic RAM):** memoria **más lenta, económica y de alta densidad**. Se utiliza como **memoria principal (RAM)**.
- Posee un **"controlador de memoria caché"** que lee de forma anticipada las próximas instrucciones/datos probables y los mantiene listos para la CPU.

### Niveles de caché
- **Caché L1 (nivel 1):** está **integrada dentro de los circuitos del microprocesador**, y eso la hace más costosa y más complicada en el diseño, pero también mucho más eficiente ya que funciona a la **misma velocidad** que él. Se divide en:
  - **L1 DC** (Level 1 Data Cache): encargada de almacenar **datos** usados frecuentemente y cuando sea necesario volver a utilizarlos.
  - **L1 IC** (Level 1 Instruction Cache): encargada de almacenar **instrucciones** usadas frecuentemente y cuando sea necesario volver a utilizarlas.
- **Caché L2 (nivel 2):** está integrada en el microprocesador; almacena datos frecuentes para **respaldar a la L1**.
- **Caché L3 (nivel 3):** está integrada en la **placa base**. Se utiliza para alimentar a la memoria caché L2, y es más rápida que la memoria principal.
`,
    },
    {
      title: 'Mapeo y formatos de almacenamiento de bytes (endianness)',
      content: `
### Mapeo
- La capacidad de **direccionamiento lógico no es congruente** con la capacidad física real de la memoria.
- Como las direcciones en los programas no son direcciones físicas sino **lógicas**, para lograr el acceso deberán **traducirse (mapearse)**.
- El procedimiento de "mapeo" consiste en aplicar un **algoritmo** para establecer la correspondencia entre direcciones "lógicas" y "físicas", que a veces incluyen una o más tablas que contienen "una parte" de la dirección.

### Formatos de almacenamiento de bytes (endianness)
Determinan el **orden en que se guardan los bytes** de un dato multipalabra en la memoria.

- **Little Endian:** el byte de **menor peso** se almacena en la dirección **más baja** de memoria, y el byte de mayor peso en la dirección más alta. Utilizado por procesadores **Intel** y **DEC Alpha RISC**.
- **Big Endian:** el byte de **mayor peso** se almacena en la dirección **más baja** de memoria y el byte de menor peso en la dirección más alta. Utilizado en sistemas **UNIX**, protocolo **TCP/IP**, etc.
`,
    },
    {
      title: 'Gestión de memoria y modos de operación del procesador',
      content: `
### Objetivos del sistema de gestión de memoria (SO)
- Asignar a cada proceso un **espacio lógico propio**.
- Garantizar **protección e aislamiento** entre distintos procesos.
- Permitir **compartir** memoria cuando sea requerido.
- **Maximizar el rendimiento** global del sistema.

### Espacio de direcciones de un proceso
Es el conjunto de direcciones a las que se hace referencia.

- **Dirección física:** posición real en las celdas de la memoria RAM.
- **Dirección lógica:** dirección usada por el proceso, compuesta por **segmento + desplazamiento (offset)**.
- **Dirección lineal / virtual:** dirección obtenida tras el mapeo / transformación realizado por la **MMU**.

Ej: \`3A2B:1301\` (dirección segmentada) → base de segmento 3A2B, desplazamiento 1301

\`3A2B · 10 = 3A2B0\`  →  \`3A2B0 + 1301 = 3B5B1\` (dirección física o absoluta)

### Modos de operación
- **Modo real:** operación **sin protección de memoria** adecuada.
- **Modo protegido:** resguardo completo de la **integridad de memoria**, aislamiento de tareas e intercambio entre modos mediante el procesador.

### Memoria virtual
Técnica del SO y HW que brinda la **ilusión de contar con una memoria principal más amplia**, fraccionando el ejecutable en disco.

### Swapping
Mover temporalmente un proceso o páginas desde la RAM al disco (**swap out**) y devolverlo a la RAM (**swap in**) cuando se necesita ejecutar.

### Administración de memoria
Existen dos formas de organizar la memoria:

| | Paginación | Segmentación |
| --- | --- | --- |
| Bloques | De **tamaño fijo** (ej: 4 KB), contiguos | Lógicos de **tamaño variable**, no contiguos (código, datos, pila) |
| Ventajas | Administración simple | Reubicación simple de código y estructuras, mínimo desperdicio |
| Desventajas | Desperdicio de memoria por fragmentación pura | Administración más compleja por tamaños variables |
`,
    },
    {
      title: 'Gestión de memoria en la familia 8086/8088',
      content: `
El 8086/8088 usa un esquema llamado **"segmentación"** para acceder correctamente a un **megabyte completo de memoria**, con referencias de direcciones de **sólo 16 bits**.

### Registros claves
- **CS** (Code Segment) + **IP** (Instruction Pointer): acceso a **instrucciones**.
- **DS** (Data Segment): registro por defecto para **datos**.
- **SS** (Stack Segment) + **SP** (Stack Pointer): manejo de la **pila** (PUSH, POP, llamadas).

### Algoritmo de cálculo de direcciones físicas en modo real

> Dirección física = (Base del segmento × 16₍dec₎) + Desplazamiento

En hexadecimal: multiplicar la base por 10₍hex₎ y sumar el offset.

Ej: \`3A2B:1301 → (3A2B × 10ₕₑₓ) + 1301 = 3A2B0 + 1301 = 3B5B1\`
`,
    },
  ],

  5: [
    {
      title: 'Estructura del procesador: BIU',
      content: `
Esta unidad describe la arquitectura interna del microprocesador clásico (**Intel 8086/8088**), cuya clave es el diseño es dividir el procesador en **dos bloques funcionales independientes** que trabajan en **paralelo**: la **BIU** y la **EU**.

### 1. BIU (Unidad de Interfaz con el Bus)
Es la parte del procesador que se une al resto del hardware y se encarga de **acceder a la memoria principal y a los dispositivos de E/S**. Se denomina así porque realiza los movimientos de datos hacia el bus de datos del procesador, siendo el primer conducto de información hacia y desde la CPU. Es la responsable de responder a todas las señales que van al procesador y de generar todas las que van hacia las demás partes del sistema.

**Buses externos administrados:**
- **Bus de direcciones (20 bits):** indica las localidades de memoria hacia o desde las cuales el microprocesador enviará o recibirá datos. Su tamaño define la **cantidad de memoria RAM que puede direccionar** el procesador.
- **Bus de datos:** transporta el significado de los datos de las instrucciones, determinando el conjunto de bits transferidos simultáneamente (**8 bits en el 8088 y 16 bits en el 8086**).
- **Bus de control:** inmerso en la Unidad de Control (UC), envía señales de control tales como lectura o carga de registros y corrimientos.

**Sumador de direcciones:** la BIU se relaciona con los registros de segmento y registros punteros como el IP. El sumador interno acopla el valor del registro de segmento con el offset (desplazamiento) para generar la **dirección física resultante en el bus de direcciones de 20 bits**.

**Cola de instrucciones (FIFO):** las instrucciones son leídas previamente por la BIU de la memoria y almacenadas en una cola con estructura **FIFO**. La BIU sirve además de paso a las instrucciones y a los datos para que alcancen los registros de la UC y de la ALU.
`,
    },
    {
      title: 'EU (Unidad de Ejecución)',
      content: `
Es la encargada de realizar las **operaciones aritméticas y lógicas**, **decodificar** la instrucción leída, hacer que se ejecute, resolver situaciones de conflicto y **suministrar las direcciones lógicas a la BIU**.

**Información utilizada para sus tareas:**
- La instrucción en ejecución.
- El registro de estados.
- El contador de períodos, accionado por el clock.
- Las señales de control y estado externas a la CPU.

**Operaciones elementales:** son los pequeños pasos requeridos para ejecutar una instrucción (ej: suma de base + desplazamiento, lectura de un operando o incrementar el IP). Cada operación elemental exige la activación de señales de control específicas.
El **objetivo de la Unidad de Control (UC)** es la generación de secuencias de señales de control que permitan realizar dichas operaciones.

**Clasificación de operaciones elementales en sistemas digitales sincrónicos:**
- **Operaciones de transferencia:** requieren dos elementos de almacenamiento (como registros), uno de origen y otro de destino. Primero establecen un camino físico entre la salida del origen y la entrada del destino a través del **bus interno de 16 bits**; una vez establecido, se envía una señal al destino para que cargue lo que tiene en su entrada.
- **Operaciones de proceso:** tienen un planteamiento básico similar a las de transferencia, pero la diferencia fundamental radica en que la información **sufre una transformación** al pasar a través de un **operador combinacional** en su camino hacia el destino.
`,
    },
    {
      title: 'ALU (Unidad Aritmético-Lógica)',
      content: `
Funciona como la **"calculadora del sistema"**, encargada de ejecutar las operaciones aritméticas y lógicas necesarias entre los datos que llegan a la CPU.

**Componentes principales:**
- **Registros:** integrados por el **Acumulador**, registros temporales y el registro de estado. Utilizados para contener operandos, resultados parciales y resultados finales.
- **Dispositivo de adición:** circuito electrónico que calcula las operaciones de suma, resta, multiplicación y división.
- **Comparador:** circuito capaz de detectar si dos datos son **iguales**, o determinar cuál es el mayor o el menor.
- **Dispositivo de control de cálculo:** dirige y controla las operaciones de cálculo realizadas en la ALU.

**Relación con la UC y el flujo:** la Unidad de Control se encarga de transportar los resultados, proporcionar operandos y comenzar la operación siguiente.
`,
    },
  ],
};
