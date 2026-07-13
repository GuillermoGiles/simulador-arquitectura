import React, { useState } from 'react';
import { Calculator, ArrowRight, CheckCircle, XCircle } from 'lucide-react';

const BaseConverter = () => {
  const [activeTab, setActiveTab] = useState('calc'); // 'calc' or 'practice'
  const [decimal, setDecimal] = useState('');
  
  // Practice Mode State
  const [targetNum, setTargetNum] = useState(() => Math.floor(Math.random() * 255) + 10);
  const [targetBase, setTargetBase] = useState(2); // 2 or 16
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null); // 'correct' or 'incorrect'
  const [showSteps, setShowSteps] = useState(false);

  const decValue = parseInt(decimal, 10);
  const binaryValue = isNaN(decValue) ? '' : decValue.toString(2);
  const hexValue = isNaN(decValue) ? '' : decValue.toString(16).toUpperCase();

  const generateNewPractice = () => {
    setTargetNum(Math.floor(Math.random() * 255) + 10);
    setTargetBase(Math.random() > 0.5 ? 2 : 16);
    setUserAnswer('');
    setFeedback(null);
    setShowSteps(false);
  };

  const checkAnswer = () => {
    if (!userAnswer.trim()) return;
    const correctAnswer = targetNum.toString(targetBase).toUpperCase();
    if (userAnswer.trim().toUpperCase() === correctAnswer) {
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
  };

  const getSteps = (num, base) => {
    let steps = [];
    let current = num;
    while (current > 0) {
      let remainder = current % base;
      let quotient = Math.floor(current / base);
      let hexChar = base === 16 && remainder >= 10 ? String.fromCharCode(55 + remainder) : remainder;
      steps.push({ current, base, quotient, remainder, hexChar });
      current = quotient;
    }
    return steps;
  };

  return (
    <div className="glass-card mb-8">
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)' }}>
        <button 
          onClick={() => setActiveTab('calc')}
          style={{ flex: 1, padding: '1rem', background: activeTab === 'calc' ? 'rgba(59, 130, 246, 0.1)' : 'transparent', border: 'none', borderBottom: activeTab === 'calc' ? '3px solid var(--accent-color)' : '3px solid transparent', fontWeight: 'bold', color: activeTab === 'calc' ? 'var(--accent-color)' : 'var(--text-secondary)', cursor: 'pointer' }}
        >
          Calculadora Rápida
        </button>
        <button 
          onClick={() => { setActiveTab('practice'); generateNewPractice(); }}
          style={{ flex: 1, padding: '1rem', background: activeTab === 'practice' ? 'rgba(59, 130, 246, 0.1)' : 'transparent', border: 'none', borderBottom: activeTab === 'practice' ? '3px solid var(--accent-color)' : '3px solid transparent', fontWeight: 'bold', color: activeTab === 'practice' ? 'var(--accent-color)' : 'var(--text-secondary)', cursor: 'pointer' }}
        >
          Modo Práctica (Paso a Paso)
        </button>
      </div>

      <div className="p-6">
        <h3 className="flex items-center gap-2 mb-4" style={{ fontSize: '1.5rem' }}>
          <Calculator className="text-accent" /> Conversor de Bases
        </h3>

        {activeTab === 'calc' && (
          <>
            <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
              Herramienta rápida para Representación de Datos. Ingresa un número en base 10 para ver su equivalente.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'start' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Decimal (Base 10)</label>
                <input 
                  type="number" 
                  value={decimal}
                  onChange={(e) => setDecimal(e.target.value)}
                  placeholder="Ej. 255"
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-primary)', fontSize: '1.1rem' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold', color: 'var(--text-secondary)' }}>Binario (Base 2)</label>
                  <div style={{ padding: '0.75rem', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '8px', border: '1px solid var(--accent-color)', minHeight: '45px', fontWeight: '500', wordBreak: 'break-all' }}>
                    {binaryValue || '-'}
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold', color: 'var(--text-secondary)' }}>Hexadecimal (Base 16)</label>
                  <div style={{ padding: '0.75rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '8px', border: '1px solid var(--success-color)', minHeight: '45px', fontWeight: '500' }}>
                    {hexValue || '-'}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'practice' && (
          <div className="animate-fade-in">
            <div style={{ background: 'var(--bg-color)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '1.5rem', textAlign: 'center' }}>
              <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Convierte el siguiente número a <strong>Base {targetBase} ({targetBase === 2 ? 'Binario' : 'Hexadecimal'})</strong>:</p>
              <h4 style={{ fontSize: '2.5rem', color: 'var(--accent-color)', marginBottom: '1rem' }}>{targetNum}</h4>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center' }}>
                <input 
                  type="text" 
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder={`Respuesta en base ${targetBase}...`}
                  style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', width: '250px', fontSize: '1.1rem', textAlign: 'center' }}
                  onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                />
                <button className="btn-primary" onClick={checkAnswer}>Verificar</button>
              </div>
            </div>

            {feedback && (
              <div style={{ padding: '1.5rem', borderRadius: '8px', background: feedback === 'correct' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', border: `1px solid ${feedback === 'correct' ? 'var(--success-color)' : '#ef4444'}`, marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontWeight: 'bold', fontSize: '1.2rem', color: feedback === 'correct' ? 'var(--success-color)' : '#ef4444' }}>
                  {feedback === 'correct' ? <><CheckCircle /> ¡Correcto!</> : <><XCircle /> Incorrecto.</>}
                </div>
                
                {feedback === 'incorrect' && !showSteps && (
                  <button onClick={() => setShowSteps(true)} className="btn-secondary" style={{ borderColor: '#ef4444', color: '#ef4444' }}>
                    Ver resolución paso a paso
                  </button>
                )}

                {(showSteps || feedback === 'correct') && (
                  <div className="animate-fade-in" style={{ marginTop: '1rem', background: '#fff', padding: '1rem', borderRadius: '8px' }}>
                    <p style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Desglose de Divisiones Sucesivas:</p>
                    <div style={{ fontFamily: 'monospace', fontSize: '1rem', color: 'var(--text-secondary)' }}>
                      {getSteps(targetNum, targetBase).map((step, idx) => (
                        <div key={idx} style={{ padding: '0.25rem 0' }}>
                          {step.current} ÷ {step.base} = <strong>{step.quotient}</strong> (Resto: <span style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>{step.hexChar}</span>)
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                      Resultado leyendo los restos de abajo hacia arriba: <br/>
                      <span style={{ fontSize: '1.5rem', color: 'var(--accent-color)' }}>
                        {targetNum.toString(targetBase).toUpperCase()}
                      </span>
                    </div>
                  </div>
                )}
                
                <div style={{ marginTop: '1.5rem' }}>
                  <button onClick={generateNewPractice} className="btn-primary" style={{ background: 'var(--text-primary)' }}>
                    Siguiente Ejercicio <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BaseConverter;
