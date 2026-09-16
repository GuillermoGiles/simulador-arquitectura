# Simulador de Arquitectura de Computadoras

Una plataforma web interactiva diseñada para facilitar el estudio, repaso y práctica de los temas centrales de la materia Arquitectura de Computadoras. Pensada para ayudar a estudiantes universitarios a preparar sus exámenes finales de forma dinámica y visual.

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

## Características Principales

*   **Flashcards con repaso activo:** 210 tarjetas generadas a partir de la bibliografía oficial. Marcá cada una como *La sabía* / *No la sabía*; las difíciles quedan guardadas y podés repasarlas solas. Atajos de teclado (← → espacio 1 2) y buscador global que también encuentra preguntas.
*   **Quizzes con explicación:** 10 preguntas por unidad con el *por qué* de cada respuesta. Preguntas y opciones se mezclan en cada intento; se aprueba con 60% y se puede rehacer para repasar.
*   **Simulador de Finales:** exámenes aleatorios de 5, 10 o 20 preguntas sobre todas las unidades, con historial de resultados y promedio.
*   **Representación de Datos interactiva:** conversor de bases, enteros con signo (BSS, Signo y Módulo, Ca1, Ca2, Exceso) con 4/8/16 bits, descomposición IEEE 754 paso a paso y ejercicios con resolución detallada.
*   **Simulador de CPU y Pipeline:** visualización del ciclo de instrucción (Fetch, Decode, Execute, Memory, Writeback) para instrucciones ALU, de carga y de salto.
*   **Mis Apuntes:** resumen de cursada transcripto del cuaderno (`src/data/notes.js`), por unidad y sección, con tablas y fórmulas; se abre desde el buscador global.
*   **Material integrado:** visor del PDF oficial de teoría de la cátedra (`public/pdfs/teoria.pdf`, 521 páginas); cada módulo abre directamente en la página de su unidad, con pestañas por tema. Acceso a las clases grabadas.
*   **Racha de estudio, modo oscuro y diseño responsive** para estudiar desde el celular.

## Instalación y Uso Local

1. Clona este repositorio:
   ```bash
   git clone https://github.com/guille123giles-cloud/simulador-arquitectura.git
   ```
2. Ingresa al directorio:
   ```bash
   cd simulador-arquitectura
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   ```
5. Abre `http://localhost:5173` en tu navegador.

## Tecnologías Utilizadas

*   **Frontend:** React 19, Vite, React Router.
*   **Estilos:** CSS propio con variables de diseño (tema claro/oscuro).
*   **Iconografía:** Lucide React.
*   **Despliegue:** Vercel.

## Unidades Abarcadas

1. Representación de Datos en la Computadora.
2. Circuitos Lógicos.
3. Circuitos Digitales (combinacionales, secuenciales, memorias).
4. Estructura del Computador.
5. Estructura del Procesador (Datapath & Pipeline).
6. Interfaz de Entrada/Salida.
7. Traductores y Arquitecturas (CISC vs RISC).

---
*Desarrollado como herramienta de estudio y código abierto.*
