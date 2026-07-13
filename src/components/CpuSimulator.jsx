import React, { useState, useEffect } from 'react';
import { Cpu, Play, RotateCcw } from 'lucide-react';

const CpuSimulator = () => {
  const [activeStage, setActiveStage] = useState(null); // 'fetch', 'decode', 'execute', 'memory', 'writeback'
  const [instruction, setInstruction] = useState('ADD R1, R2, R3');
  const [isRunning, setIsRunning] = useState(false);

  const stages = [
    { id: 'fetch', name: '1. Fetch (Búsqueda)', desc: 'La CPU obtiene la instrucción de la memoria usando el Program Counter (PC).' },
    { id: 'decode', name: '2. Decode (Decodificación)', desc: 'La Unidad de Control traduce la instrucción y lee los registros (R2, R3).' },
    { id: 'execute', name: '3. Execute (Ejecución)', desc: 'La ALU realiza la operación (Suma) con los datos.' },
    { id: 'memory', name: '4. Memory (Memoria)', desc: 'Esta instrucción no requiere acceso a memoria de datos (burbuja o paso en vacío).' },
    { id: 'writeback', name: '5. Writeback (Escritura)', desc: 'El resultado se guarda de vuelta en el registro de destino (R1).' }
  ];

  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStage(null);

    const delays = [0, 2000, 4000, 6000, 8000];
    
    stages.forEach((stage, index) => {
      setTimeout(() => {
        setActiveStage(stage.id);
      }, delays[index]);
    });

    setTimeout(() => {
      setIsRunning(false);
    }, 10000);
  };

  const resetSimulation = () => {
    setActiveStage(null);
    setIsRunning(false);
  };

  const getStageColor = (stageId) => {
    if (activeStage === stageId) return 'var(--accent-color)';
    return 'var(--border-color)';
  };

  const getStageBg = (stageId) => {
    if (activeStage === stageId) return 'rgba(59, 130, 246, 0.1)';
    return 'var(--surface-color)';
  };

  return (
    <div className="glass-card p-6 mb-8">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h3 className="flex items-center gap-2 mb-4" style={{ fontSize: '1.5rem', margin: 0 }}>
          <Cpu className="text-accent" /> Simulador de Ciclo de Instrucción
        </h3>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <select 
            value={instruction}
            onChange={(e) => { setInstruction(e.target.value); resetSimulation(); }}
            disabled={isRunning}
            style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-color)' }}
          >
            <option value="ADD R1, R2, R3">ADD R1, R2, R3 (ALU)</option>
            <option value="LW R1, 100(R2)">LW R1, 100(R2) (Carga en Memoria)</option>
            <option value="BEQ R1, R2, L1">BEQ R1, R2, L1 (Salto Condicional)</option>
          </select>
          <button onClick={runSimulation} disabled={isRunning} className="btn-primary" style={{ padding: '0.5rem 1rem' }}>
            <Play size={18} /> Ejecutar
          </button>
          <button onClick={resetSimulation} disabled={isRunning} className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>
            <RotateCcw size={18} /> Reiniciar
          </button>
        </div>
      </div>

      <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
        Observa cómo la instrucción <strong>{instruction}</strong> fluye a través de los componentes principales de la CPU y el Pipeline de 5 etapas.
      </p>

      {/* Visual Diagram */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem', background: 'var(--bg-color)', borderRadius: '12px', border: '1px solid var(--border-color)', overflowX: 'auto' }}>
        
        {/* Top layer (Memory & Control) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '2rem', minWidth: '600px' }}>
          <div style={{ flex: 1, border: `2px solid ${getStageColor('fetch')}`, background: getStageBg('fetch'), padding: '1.5rem', borderRadius: '8px', textAlign: 'center', transition: 'all 0.3s' }}>
            <strong>Memoria de Instrucciones</strong>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Provee la instrucción en base al PC.</div>
            {activeStage === 'fetch' && <div className="text-accent mt-4 animate-fade-in" style={{ fontWeight: 'bold' }}>➡ Extrayendo: {instruction}</div>}
          </div>
          <div style={{ flex: 1, border: `2px solid ${getStageColor('decode')}`, background: getStageBg('decode'), padding: '1.5rem', borderRadius: '8px', textAlign: 'center', transition: 'all 0.3s' }}>
            <strong>Unidad de Control</strong>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Decodifica el OpCode.</div>
            {activeStage === 'decode' && <div className="text-accent mt-4 animate-fade-in" style={{ fontWeight: 'bold' }}>⚡ Decodificando OpCode</div>}
          </div>
        </div>

        {/* Middle Layer (Datapath) */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', minWidth: '600px' }}>
          <div style={{ flex: 1, border: `2px solid ${getStageColor('decode')}`, background: getStageBg('decode'), padding: '1.5rem', borderRadius: '8px', textAlign: 'center', transition: 'all 0.3s' }}>
            <strong>Banco de Registros</strong>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Lee operandos. Escribe resultados.</div>
            {(activeStage === 'decode' || activeStage === 'writeback') && <div className="text-accent mt-4 animate-fade-in" style={{ fontWeight: 'bold' }}>
              {activeStage === 'decode' ? '📖 Leyendo operandos' : '✍ Guardando resultado'}
            </div>}
          </div>
          
          <div style={{ padding: '0 1rem', color: 'var(--text-secondary)' }}>➡</div>

          <div style={{ flex: 1, border: `2px solid ${getStageColor('execute')}`, background: getStageBg('execute'), padding: '1.5rem', borderRadius: '8px', textAlign: 'center', transition: 'all 0.3s' }}>
            <strong>A.L.U.</strong>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Unidad Aritmético-Lógica.</div>
            {activeStage === 'execute' && <div className="text-accent mt-4 animate-fade-in" style={{ fontWeight: 'bold' }}>⚙ Computando...</div>}
          </div>
          
          <div style={{ padding: '0 1rem', color: 'var(--text-secondary)' }}>➡</div>

          <div style={{ flex: 1, border: `2px solid ${getStageColor('memory')}`, background: getStageBg('memory'), padding: '1.5rem', borderRadius: '8px', textAlign: 'center', transition: 'all 0.3s' }}>
            <strong>Memoria de Datos</strong>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Lectura/Escritura de variables.</div>
            {activeStage === 'memory' && <div className="text-accent mt-4 animate-fade-in" style={{ fontWeight: 'bold' }}>
              {instruction.includes('LW') ? '📥 Leyendo Dato' : '⏳ Sin Acción (Burbuja)'}
            </div>}
          </div>
        </div>
      </div>

      {/* Description Panel */}
      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {stages.map(stage => (
          <div 
            key={stage.id} 
            style={{ 
              flex: '1 1 150px', 
              padding: '1rem', 
              borderRadius: '8px', 
              border: '1px solid',
              borderColor: activeStage === stage.id ? 'var(--accent-color)' : 'var(--border-color)',
              background: activeStage === stage.id ? 'rgba(59, 130, 246, 0.05)' : 'var(--surface-color)',
              transition: 'all 0.3s'
            }}
          >
            <div style={{ fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.5rem', color: activeStage === stage.id ? 'var(--accent-color)' : 'var(--text-primary)' }}>
              {stage.name}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              {activeStage === stage.id ? stage.desc : ''}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CpuSimulator;
