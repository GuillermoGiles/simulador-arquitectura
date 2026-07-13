# Simulador de Arquitectura de Computadoras

Una plataforma web interactiva diseñada para facilitar el estudio, repaso y práctica de los temas centrales de la materia Arquitectura de Computadoras. Pensada para ayudar a estudiantes universitarios a preparar sus exámenes finales de forma dinámica y visual.

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

## Características Principales

*   **Banco de Flashcards (Spaced Repetition):** Más de 200 tarjetas de memoria interactivas generadas a partir de la bibliografía oficial, con buscador global para encontrar conceptos en segundos.
*   **Simulador de CPU y Pipeline:** Componente visual interactivo para entender el flujo del ciclo de instrucción (Fetch, Decode, Execute, Memory, Writeback) a través de la Unidad de Control, Registros y ALU.
*   **Resolutor Matemático Paso a Paso:** Conversor interactivo de bases (Binario, Decimal, Hexadecimal) que, en caso de error, muestra el desglose matemático mediante divisiones sucesivas.
*   **Simulacros de Examen:** Generador aleatorio de exámenes con preguntas teóricas y prácticas que emulan la exigencia de un examen final real.
*   **Lectura Integrada:** Visor de archivos PDF integrado para no tener que salir de la plataforma al consultar la teoría.
*   **Gamificación:** Sistema de "Racha de Estudio" que cuenta los días consecutivos de actividad para mantener la motivación alta.

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

*   **Frontend:** React 18, Vite.
*   **Estilos:** CSS Modules / Vanilla CSS con variables de diseño personalizadas.
*   **Iconografía:** Lucide React.
*   **Despliegue:** Vercel.

## Unidades Abarcadas

1. Representación de Datos en la Computadora.
2. Circuitos Lógicos.
3. Organización y Arquitectura.
4. Estructura del Computador.
5. Estructura del Procesador (Datapath & Pipeline).
6. Interfaz de Entrada/Salida.
7. Traductores y Arquitecturas (CISC vs RISC).

---
*Desarrollado como herramienta de estudio y código abierto.*
