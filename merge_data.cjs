const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\guill\\.gemini\\antigravity\\brain\\58143d0b-fdf9-4f1c-a648-0d3019f433e5\\scratch';
const modulesFile = path.join(__dirname, 'src', 'data', 'modules.js');

const modulesData = [
  {
    id: 1,
    title: 'Unidad 1: Representación de Datos',
    description: 'Sistemas de numeración, punto fijo y flotante.',
    pdf: '1- Representación de Datos - Unidad 1.pdf'
  },
  {
    id: 2,
    title: 'Unidad 2: Circuitos Lógicos',
    description: 'Compuertas lógicas y álgebra de Boole.',
    pdf: '2- Circuitos Lógicos - Unidad 2.pdf'
  },
  {
    id: 3,
    title: 'Unidad 3: Circuitos Digitales',
    description: 'Circuitos combinacionales y secuenciales.',
    pdf: '3- Circuitos Digitales - Unidad 3 - Circuitos Combinacionales.pdf'
  },
  {
    id: 4,
    title: 'Unidad 4: Estructura del Computador',
    description: 'Dispositivos de almacenamiento e instrucciones.',
    pdf: '7- Estructura del Computador - Unidad 4 - Dispositivos de Almacenamiento.pdf'
  },
  {
    id: 5,
    title: 'Unidad 5: Estructura del Procesador',
    description: 'Lenguaje ensamblador e interrupciones.',
    pdf: '11- Unidad 5 - Estructura del Procesador.pdf'
  },
  {
    id: 6,
    title: 'Unidad 6: Interfaz de Entrada/Salida',
    description: 'Buses y transferencia de datos.',
    pdf: '15 - Unidad 6 - Interfaz_de_Entrada_Salida.pdf'
  },
  {
    id: 7,
    title: 'Unidad 7: Traductores',
    description: 'Arquitecturas CISC y RISC.',
    pdf: '17 - Unidad 7 Arquitectura CISC_y_RISC.pdf'
  }
];

try {
  for (let i = 1; i <= 7; i++) {
    const jsonPath = path.join(brainDir, `unit${i}.json`);
    if (fs.existsSync(jsonPath)) {
      const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      modulesData[i-1].flashcards = data.flashcards || [];
      modulesData[i-1].quiz = data.quiz || [];
    } else {
      console.warn(`Missing file for Unit ${i}`);
    }
  }

  const fileContent = `export const modules = ${JSON.stringify(modulesData, null, 2)};\n`;
  fs.writeFileSync(modulesFile, fileContent, 'utf8');
  console.log('Successfully updated modules.js with all flashcards and quizzes.');
} catch (e) {
  console.error('Error updating modules.js:', e);
}
