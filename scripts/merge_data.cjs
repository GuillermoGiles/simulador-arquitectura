/**
 * Script de una sola vez usado para generar src/data/modules.js a partir de
 * archivos unit1.json ... unit7.json (cada uno con { flashcards, quiz }).
 *
 * Uso:  node scripts/merge_data.cjs <carpeta-con-unitN.json>
 *
 * Nota: modules.js ya contiene los datos finales (con `pdfs` y `explanation`);
 * este script sólo se conserva como referencia de cómo se construyó.
 */
const fs = require('fs');
const path = require('path');

const sourceDir = process.argv[2];
if (!sourceDir) {
  console.error('Uso: node scripts/merge_data.cjs <carpeta-con-unitN.json>');
  process.exit(1);
}

const modulesFile = path.join(__dirname, '..', 'src', 'data', 'modules.js');

const modulesData = [
  { id: 1, title: 'Unidad 1: Representación de Datos', description: 'Sistemas de numeración, punto fijo y flotante.', pdfs: ['1- Representación de Datos - Unidad 1.pdf'] },
  { id: 2, title: 'Unidad 2: Circuitos Lógicos', description: 'Compuertas lógicas y álgebra de Boole.', pdfs: ['2- Circuitos Lógicos - Unidad 2.pdf'] },
  { id: 3, title: 'Unidad 3: Circuitos Digitales', description: 'Circuitos combinacionales y secuenciales.', pdfs: ['3- Circuitos Digitales - Unidad 3 - Circuitos Combinacionales.pdf'] },
  { id: 4, title: 'Unidad 4: Estructura del Computador', description: 'Dispositivos de almacenamiento e instrucciones.', pdfs: ['7- Estructura del Computador - Unidad 4 - Dispositivos de Almacenamiento.pdf'] },
  { id: 5, title: 'Unidad 5: Estructura del Procesador', description: 'Lenguaje ensamblador e interrupciones.', pdfs: ['11- Unidad 5 - Estructura del Procesador.pdf'] },
  { id: 6, title: 'Unidad 6: Interfaz de Entrada/Salida', description: 'Buses y transferencia de datos.', pdfs: ['15 - Unidad 6 - Interfaz_de_Entrada_Salida.pdf'] },
  { id: 7, title: 'Unidad 7: Traductores', description: 'Arquitecturas CISC y RISC.', pdfs: ['17 - Unidad 7 Arquitectura CISC_y_RISC.pdf'] },
];

for (const mod of modulesData) {
  const jsonPath = path.join(sourceDir, `unit${mod.id}.json`);
  if (!fs.existsSync(jsonPath)) {
    console.warn(`Falta ${jsonPath}`);
    continue;
  }
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  mod.flashcards = data.flashcards || [];
  mod.quiz = data.quiz || [];
}

fs.writeFileSync(modulesFile, `export const modules = ${JSON.stringify(modulesData, null, 2)};\n`, 'utf8');
console.log(`modules.js actualizado (${modulesData.length} unidades).`);
