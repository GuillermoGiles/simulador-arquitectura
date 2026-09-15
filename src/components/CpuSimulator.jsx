import React, { useState, useEffect, useRef } from 'react';
import { Cpu, Play, RotateCcw } from 'lucide-react';

const STAGE_DELAY_MS = 2000;

const INSTRUCTIONS = {
  'ADD R1, R2, R3': {
    label: 'ADD R1, R2, R3 (ALU)',
    memory: '⏳ Sin Acción (Burbuja)',
    stages: {
      decode: 'La Unidad de Control traduce la instrucción y lee los registros R2 y R3.',
      execute: 'La ALU suma R2 + R3.',
      memory: 'Esta instrucción no accede a memoria de datos (etapa vacía o burbuja).',
      writeback: 'El resultado se guarda en el registro destino R1.',
    },
  },
  'LW R1, 100(R2)': {
    label: 'LW R1, 100(R2) (Carga desde Memoria)',
    memory: '📥 Leyendo Dato',
    stages: {
      decode: 'La Unidad de Control identifica una carga y lee el registro base R2.',
      execute: 'La ALU calcula la dirección efectiva: R2 + 100.',
      memory: 'Se lee la palabra ubicada en la dirección calculada.',
      writeback: 'El dato leído se guarda en R1.',
    },
  },
  'BEQ R1, R2, L1': {
    label: 'BEQ R1, R2, L1 (Salto Condicional)',
    memory: '⏳ Sin Acción (Burbuja)',
    stages: {
      decode: 'La Unidad de Control lee R1 y R2 para compararlos.',
      execute: 'La ALU resta R1 - R2; si el resultado es cero, se toma el salto a L1.',
      memory: 'No hay acceso a memoria de datos.',
      writeback: 'No escribe registros; sólo se actualiza el PC si el salto se toma.',
    },
  },
};

const STAGES = [
  { id: 'fetch', name: '1. Fetch (Búsqueda)', desc: 'La CPU obtiene la instrucción de la memoria usando el Program Counter (PC).' },
  { id: 'decode', name: '2. Decode (Decodificación)' },
  { id: 'execute', name: '3. Execute (Ejecución)' },
  { id: 'memory', name: '4. Memory (Memoria)' },
  { id: 'writeback', name: '5. Writeback (Escritura)' },
];

const CpuSimulator = () => {
  const [activeStage, setActiveStage] = useState(null);
  const [instruction, setInstruction] = useState('ADD R1, R2, R3');
  const [isRunning, setIsRunning] = useState(false);
  const timers = useRef([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  // Cancelar la animación si el componente se desmonta a mitad de camino
  useEffect(() => clearTimers, []);

  const runSimulation = () => {
    if (isRunning) return;
    clearTimers();
    setIsRunning(true);
    setActiveStage(null);

    STAGES.forEach((stage, index) => {
      timers.current.push(setTimeout(() => setActiveStage(stage.id), index * STAGE_DELAY_MS));
    });
    timers.current.push(setTimeout(() => setIsRunning(false), STAGES.length * STAGE_DELAY_MS));
  };

  const resetSimulation = () => {
    clearTimers();
    setActiveStage(null);
    setIsRunning(false);
  };

  const current = INSTRUCTIONS[instruction];
  const blockClass = (...ids) => `cpu-block ${ids.includes(activeStage) ? 'active' : ''}`;
  const stageDesc = (stage) => stage.desc ?? current.stages[stage.id];

  return (
    <div className="glass-card p-6 mb-8">
      <div className="cpu-toolbar">
        <h3 className="card-title">
          <Cpu className="text-accent" /> Simulador de Ciclo de Instrucción
        </h3>
        <div className="cpu-controls">
          <select
            className="input input-sm"
            style={{ width: 'auto' }}
            value={instruction}
            onChange={(e) => { setInstruction(e.target.value); resetSimulation(); }}
            disabled={isRunning}
            aria-label="Instrucción a simular"
          >
            {Object.entries(INSTRUCTIONS).map(([key, def]) => (
              <option key={key} value={key}>{def.label}</option>
            ))}
          </select>
          <button type="button" onClick={runSimulation} disabled={isRunning} className="btn-primary btn-sm">
            <Play size={18} /> Ejecutar
          </button>
          <button type="button" onClick={resetSimulation} className="btn-secondary btn-sm">
            <RotateCcw size={18} /> Reiniciar
          </button>
        </div>
      </div>

      <p className="mb-8">
        Observá cómo la instrucción <strong className="mono">{instruction}</strong> fluye a través de los componentes
        principales de la CPU y el pipeline de 5 etapas.
      </p>

      <div className="cpu-diagram">
        <div className="cpu-row top">
          <div className={blockClass('fetch')}>
            <strong>Memoria de Instrucciones</strong>
            <small>Provee la instrucción en base al PC.</small>
            {activeStage === 'fetch' && <div className="status animate-fade-in">➡ Extrayendo: {instruction}</div>}
          </div>
          <div className={blockClass('decode')}>
            <strong>Unidad de Control</strong>
            <small>Decodifica el OpCode.</small>
            {activeStage === 'decode' && <div className="status animate-fade-in">⚡ Decodificando OpCode</div>}
          </div>
        </div>

        <div className="cpu-row">
          <div className={blockClass('decode', 'writeback')}>
            <strong>Banco de Registros</strong>
            <small>Lee operandos. Escribe resultados.</small>
            {(activeStage === 'decode' || activeStage === 'writeback') && (
              <div className="status animate-fade-in">
                {activeStage === 'decode' ? '📖 Leyendo operandos' : '✍ Guardando resultado'}
              </div>
            )}
          </div>
          <div className="cpu-arrow">➡</div>
          <div className={blockClass('execute')}>
            <strong>A.L.U.</strong>
            <small>Unidad Aritmético-Lógica.</small>
            {activeStage === 'execute' && <div className="status animate-fade-in">⚙ Computando...</div>}
          </div>
          <div className="cpu-arrow">➡</div>
          <div className={blockClass('memory')}>
            <strong>Memoria de Datos</strong>
            <small>Lectura/Escritura de variables.</small>
            {activeStage === 'memory' && <div className="status animate-fade-in">{current.memory}</div>}
          </div>
        </div>
      </div>

      <div className="cpu-stages">
        {STAGES.map(stage => (
          <div key={stage.id} className={`cpu-stage ${activeStage === stage.id ? 'active' : ''}`}>
            <strong>{stage.name}</strong>
            <span>{activeStage === stage.id ? stageDesc(stage) : ''}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CpuSimulator;
