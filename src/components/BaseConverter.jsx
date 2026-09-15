import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, CheckCircle, XCircle, Binary } from 'lucide-react';

// ---------- Helpers de representación ----------

const pad = (s, bits) => s.padStart(bits, '0');
const groupBits = (s, size = 4) => s.replace(new RegExp(`(.{${size}})(?=.)`, 'g'), '$1 ');

// Complemento a 2 de n en `bits` bits (n dentro de rango) como string binario.
const toTwosComplement = (n, bits) => pad((n & ((1 << bits) - 1)).toString(2), bits);
const invertBits = (s) => s.replace(/[01]/g, b => (b === '0' ? '1' : '0'));

// Representaciones con signo de un entero en `bits` bits. Devuelve null si no entra en el rango.
function signedRepresentations(n, bits) {
  const half = 2 ** (bits - 1);
  const abs = Math.abs(n);
  const ca2InRange = n >= -half && n <= half - 1;
  const smInRange = abs <= half - 1;

  const magnitude = smInRange ? pad(abs.toString(2), bits - 1) : null;
  return {
    bss: n >= 0 && n <= 2 ** bits - 1 ? pad(n.toString(2), bits) : null,
    signMag: smInRange ? (n < 0 ? '1' : '0') + magnitude : null,
    ca1: smInRange ? (n < 0 ? '1' + invertBits(magnitude) : '0' + magnitude) : null,
    ca2: ca2InRange ? toTwosComplement(n, bits) : null,
    excess: n + half >= 0 && n + half <= 2 ** bits - 1 ? pad((n + half).toString(2), bits) : null,
    hex: ca2InRange ? pad((n & ((1 << bits) - 1)).toString(16).toUpperCase(), bits / 4) : null,
    ranges: { ca2: `-${half} a ${half - 1}`, sm: `-${half - 1} a ${half - 1}`, excess: `-${half} a ${half - 1}` },
  };
}

// Pasos de divisiones sucesivas para convertir un entero positivo a otra base.
function divisionSteps(num, base) {
  const steps = [];
  let current = num;
  while (current > 0) {
    const remainder = current % base;
    const quotient = Math.floor(current / base);
    steps.push({ current, quotient, remainder, digit: remainder.toString(base).toUpperCase() });
    current = quotient;
  }
  return steps;
}

// Descomposición IEEE 754 simple precisión.
function ieee754(value) {
  const f32 = new Float32Array(1);
  f32[0] = value;
  const u32 = new Uint32Array(f32.buffer)[0];
  const bits = pad(u32.toString(2), 32);
  const sign = bits[0];
  const exponentBits = bits.slice(1, 9);
  const mantissaBits = bits.slice(9);
  const exponentStored = parseInt(exponentBits, 2);
  const abs = Math.abs(value);

  // Pasos didácticos: parte entera por divisiones, fraccionaria por multiplicaciones.
  const intPart = Math.floor(abs);
  let frac = abs - intPart;
  const fracSteps = [];
  let fracBits = '';
  for (let i = 0; i < 24 && frac > 0; i++) {
    const doubled = frac * 2;
    const bit = doubled >= 1 ? 1 : 0;
    fracSteps.push({ from: frac, doubled, bit });
    fracBits += bit;
    frac = doubled - bit;
  }
  const intBits = intPart.toString(2);
  const rawBinary = `${intBits}${fracBits ? '.' + fracBits : ''}`;

  // Exponente real: posición del primer 1
  let realExponent;
  if (intPart > 0) realExponent = intBits.length - 1;
  else realExponent = -(fracBits.indexOf('1') + 1);

  return {
    bits, sign, exponentBits, mantissaBits, exponentStored, realExponent,
    hex: pad(u32.toString(16).toUpperCase(), 8),
    rawBinary, intBits, fracSteps, fracTruncated: frac > 0,
    stored: f32[0],
  };
}

// ---------- Ejercicios de práctica ----------

const EXERCISE_TYPES = ['dec-bin', 'dec-hex', 'dec-ca2', 'ca2-dec'];

function makeExercise() {
  const type = EXERCISE_TYPES[Math.floor(Math.random() * EXERCISE_TYPES.length)];
  switch (type) {
    case 'dec-bin': {
      const n = Math.floor(Math.random() * 246) + 10;
      return { type, prompt: `Convertí ${n} a binario (base 2)`, value: n, answer: n.toString(2), display: n };
    }
    case 'dec-hex': {
      const n = Math.floor(Math.random() * 4000) + 16;
      return { type, prompt: `Convertí ${n} a hexadecimal (base 16)`, value: n, answer: n.toString(16).toUpperCase(), display: n };
    }
    case 'dec-ca2': {
      const n = -(Math.floor(Math.random() * 127) + 1);
      return { type, prompt: `Representá ${n} en Complemento a 2 con 8 bits`, value: n, answer: toTwosComplement(n, 8), display: n };
    }
    case 'ca2-dec':
    default: {
      const n = -(Math.floor(Math.random() * 127) + 1);
      const bin = toTwosComplement(n, 8);
      return { type, prompt: `¿Qué número decimal representa ${groupBits(bin)} en Complemento a 2 (8 bits)?`, value: n, answer: String(n), display: groupBits(bin) };
    }
  }
}

const normalizeAnswer = (s) => s.replace(/\s+/g, '').toUpperCase().replace(/^0+(?=\d)/, '');

function ExerciseSteps({ exercise }) {
  const { type, value, answer } = exercise;

  if (type === 'dec-bin' || type === 'dec-hex') {
    const base = type === 'dec-bin' ? 2 : 16;
    return (
      <div className="steps-box animate-fade-in">
        <p className="font-bold mb-2">Divisiones sucesivas por {base}:</p>
        <div className="mono">
          {divisionSteps(value, base).map((s, i) => (
            <div key={i} className="step">
              {s.current} ÷ {base} = <strong>{s.quotient}</strong> (resto: <span className="highlight">{s.digit}</span>)
            </div>
          ))}
        </div>
        <div className="final">
          Leyendo los restos de abajo hacia arriba: <br />
          <span className="big mono">{answer}</span>
        </div>
      </div>
    );
  }

  if (type === 'dec-ca2') {
    const magnitude = pad(Math.abs(value).toString(2), 8);
    const inverted = invertBits(magnitude);
    return (
      <div className="steps-box animate-fade-in">
        <p className="font-bold mb-2">Complemento a 2 de {value}:</p>
        <div className="mono">
          <div className="step">1. Módulo en binario (8 bits): |{value}| = {Math.abs(value)} → <strong>{groupBits(magnitude)}</strong></div>
          <div className="step">2. Invertir todos los bits (Ca1): <strong>{groupBits(inverted)}</strong></div>
          <div className="step">3. Sumar 1: <strong>{groupBits(answer)}</strong></div>
        </div>
        <div className="final">
          Resultado: <span className="big mono">{groupBits(answer)}</span>
        </div>
      </div>
    );
  }

  // ca2-dec
  const bin = toTwosComplement(value, 8);
  const inverted = invertBits(bin);
  const magnitude = parseInt(inverted, 2) + 1;
  return (
    <div className="steps-box animate-fade-in">
      <p className="font-bold mb-2">Decodificar {groupBits(bin)}:</p>
      <div className="mono">
        <div className="step">1. El MSB es 1 → el número es <strong>negativo</strong>.</div>
        <div className="step">2. Invertir bits: <strong>{groupBits(inverted)}</strong></div>
        <div className="step">3. Sumar 1: <strong>{groupBits(pad(magnitude.toString(2), 8))}</strong> = {magnitude}</div>
        <div className="step">4. Aplicar el signo: <strong>-{magnitude}</strong></div>
      </div>
      <div className="final">
        Resultado: <span className="big mono">{answer}</span>
      </div>
    </div>
  );
}

// ---------- Componente ----------

const TABS = [
  { id: 'calc', label: 'Calculadora' },
  { id: 'signed', label: 'Enteros con signo' },
  { id: 'float', label: 'IEEE 754' },
  { id: 'practice', label: 'Práctica paso a paso' },
];

const BaseConverter = () => {
  const [activeTab, setActiveTab] = useState('calc');

  // Calculadora
  const [decimal, setDecimal] = useState('');
  const decValue = parseInt(decimal, 10);
  const hasDec = !Number.isNaN(decValue) && decValue >= 0;

  // Enteros con signo
  const [signedInput, setSignedInput] = useState('');
  const [bits, setBits] = useState(8);
  const signedValue = parseInt(signedInput, 10);
  const signed = useMemo(
    () => (Number.isNaN(signedValue) ? null : signedRepresentations(signedValue, bits)),
    [signedValue, bits]
  );

  // IEEE 754
  const [floatInput, setFloatInput] = useState('');
  const floatValue = parseFloat(floatInput);
  const float = useMemo(
    () => (Number.isNaN(floatValue) ? null : ieee754(floatValue)),
    [floatValue]
  );

  // Práctica
  const [exercise, setExercise] = useState(makeExercise);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [showSteps, setShowSteps] = useState(false);

  const newExercise = () => {
    setExercise(makeExercise());
    setUserAnswer('');
    setFeedback(null);
    setShowSteps(false);
  };

  const checkAnswer = () => {
    if (!userAnswer.trim()) return;
    setFeedback(normalizeAnswer(userAnswer) === normalizeAnswer(exercise.answer) ? 'correct' : 'incorrect');
  };

  const cell = (label, value, note) => (
    <div>
      <label className="label label-muted">{label}</label>
      <div className={`result-box mono ${value ? '' : 'muted'}`}>
        {value ? groupBits(value) : (note ?? '—')}
      </div>
    </div>
  );

  return (
    <div className="glass-card mb-8">
      <div className="tabs" role="tablist">
        {TABS.map(tab => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-6">
        <h3 className="card-title">
          <Calculator className="text-accent" /> Representación de Datos
        </h3>

        {activeTab === 'calc' && (
          <div className="animate-fade-in">
            <p className="mb-6">Ingresá un número entero positivo en base 10 para ver su equivalente en otras bases.</p>
            <div className="two-col">
              <div>
                <label className="label" htmlFor="dec-input">Decimal (Base 10)</label>
                <input
                  id="dec-input"
                  type="number"
                  min="0"
                  className="input"
                  value={decimal}
                  onChange={(e) => setDecimal(e.target.value)}
                  placeholder="Ej. 255"
                />
              </div>
              <div className="stack">
                {cell('Binario (Base 2)', hasDec ? decValue.toString(2) : null)}
                {cell('Octal (Base 8)', hasDec ? decValue.toString(8) : null)}
                <div>
                  <label className="label label-muted">Hexadecimal (Base 16)</label>
                  <div className="result-box success mono">{hasDec ? decValue.toString(16).toUpperCase() : '—'}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'signed' && (
          <div className="animate-fade-in">
            <p className="mb-6">
              Compará las convenciones de representación de enteros con signo. Cada una tiene su propio rango.
            </p>
            <div className="two-col">
              <div className="stack">
                <div>
                  <label className="label" htmlFor="signed-input">Decimal (puede ser negativo)</label>
                  <input
                    id="signed-input"
                    type="number"
                    className="input"
                    value={signedInput}
                    onChange={(e) => setSignedInput(e.target.value)}
                    placeholder="Ej. -37"
                  />
                </div>
                <div>
                  <label className="label">Cantidad de bits</label>
                  <div className="flex gap-2">
                    {[4, 8, 16].map(b => (
                      <button key={b} type="button" className={`pdf-tab ${bits === b ? 'active' : ''}`} onClick={() => setBits(b)}>
                        {b} bits
                      </button>
                    ))}
                  </div>
                </div>
                {signed && (
                  <p className="text-sm">
                    Rangos con {bits} bits — Ca2 y Exceso: {signed.ranges.ca2} · Signo y Módulo / Ca1: {signed.ranges.sm}
                  </p>
                )}
              </div>
              <div className="stack">
                {cell('Binario sin signo (BSS)', signed?.bss, signed ? 'fuera de rango' : '—')}
                {cell('Signo y Módulo', signed?.signMag, signed ? 'fuera de rango' : '—')}
                {cell('Complemento a 1 (Ca1)', signed?.ca1, signed ? 'fuera de rango' : '—')}
                {cell('Complemento a 2 (Ca2)', signed?.ca2, signed ? 'fuera de rango' : '—')}
                {cell(`Exceso ${2 ** (bits - 1)}`, signed?.excess, signed ? 'fuera de rango' : '—')}
                {cell('Hexadecimal (del Ca2)', signed?.hex, signed ? 'fuera de rango' : '—')}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'float' && (
          <div className="animate-fade-in">
            <p className="mb-6">
              Representación en punto flotante IEEE 754 de precisión simple (32 bits): 1 bit de signo, 8 de exponente en exceso 127 y 23 de mantisa.
            </p>
            <div className="mb-6" style={{ maxWidth: '360px' }}>
              <label className="label" htmlFor="float-input">Número real</label>
              <input
                id="float-input"
                type="number"
                step="any"
                className="input"
                value={floatInput}
                onChange={(e) => setFloatInput(e.target.value)}
                placeholder="Ej. -12.375"
              />
            </div>

            {float && (
              <div className="stack">
                <div className="bit-groups">
                  <div className="bit-group sign"><small>Signo (1)</small><span className="mono">{float.sign}</span></div>
                  <div className="bit-group exp"><small>Exponente (8)</small><span className="mono">{float.exponentBits}</span></div>
                  <div className="bit-group mant"><small>Mantisa (23)</small><span className="mono" style={{ wordBreak: 'break-all' }}>{float.mantissaBits}</span></div>
                </div>
                <div>
                  <label className="label label-muted">Hexadecimal</label>
                  <div className="result-box success mono">0x{float.hex}</div>
                </div>

                <div className="steps-box">
                  <p className="font-bold mb-2">Resolución paso a paso:</p>
                  <div className="mono">
                    <div className="step">1. Signo: {floatValue < 0 ? 'negativo' : 'positivo'} → bit <strong>{float.sign}</strong></div>
                    <div className="step">
                      2. |{floatValue}| en binario: parte entera {Math.floor(Math.abs(floatValue))} = <strong>{float.intBits}</strong>
                      {float.fracSteps.length > 0 && <>, parte fraccionaria por multiplicaciones sucesivas:</>}
                    </div>
                    {float.fracSteps.slice(0, 12).map((s, i) => (
                      <div key={i} className="step" style={{ paddingLeft: '1.5rem' }}>
                        {s.from.toFixed(6).replace(/0+$/, '').replace(/\.$/, '')} × 2 = {s.doubled.toFixed(6).replace(/0+$/, '').replace(/\.$/, '')} → bit <span className="highlight">{s.bit}</span>
                      </div>
                    ))}
                    {float.fracSteps.length > 12 && <div className="step" style={{ paddingLeft: '1.5rem' }}>… ({float.fracSteps.length - 12} pasos más)</div>}
                    {float.fracTruncated && <div className="step" style={{ paddingLeft: '1.5rem' }}>La fracción no termina: se redondea a 23 bits de mantisa.</div>}
                    <div className="step">   → <strong>{float.rawBinary}</strong></div>
                    {floatValue !== 0 && (
                      <>
                        <div className="step">3. Normalizar: 1.<span className="highlight">{float.mantissaBits}</span> × 2<sup>{float.realExponent}</sup></div>
                        <div className="step">4. Exponente en exceso 127: {float.realExponent} + 127 = <strong>{float.exponentStored}</strong> = {float.exponentBits}</div>
                        <div className="step">5. Mantisa: los 23 bits después del 1 implícito.</div>
                      </>
                    )}
                  </div>
                  <div className="final">
                    Palabra de 32 bits: <br />
                    <span className="big mono" style={{ fontSize: '1rem', wordBreak: 'break-all' }}>{groupBits(float.bits)}</span>
                    {float.stored !== floatValue && (
                      <p className="text-sm mt-2" style={{ fontWeight: 400 }}>
                        Valor realmente almacenado: {float.stored} (error de redondeo de precisión simple).
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'practice' && (
          <div className="animate-fade-in">
            <div className="panel text-center mb-6">
              <p className="lead mb-2">{exercise.prompt}</p>
              <h4 className="mono text-accent mb-4" style={{ fontSize: '2.2rem' }}>{exercise.display}</h4>

              <div className="flex justify-center gap-4 items-center flex-wrap">
                <input
                  type="text"
                  className="input mono"
                  style={{ maxWidth: '260px', textAlign: 'center' }}
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Tu respuesta..."
                  onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                  disabled={feedback === 'correct'}
                  aria-label="Respuesta"
                />
                <button type="button" className="btn-primary" onClick={checkAnswer} disabled={feedback === 'correct'}>Verificar</button>
              </div>
            </div>

            {feedback && (
              <div className={`feedback-box ${feedback}`}>
                <div className="feedback-title">
                  {feedback === 'correct'
                    ? <><CheckCircle /> ¡Correcto!</>
                    : <><XCircle /> Incorrecto. La respuesta es <span className="mono">{exercise.answer}</span></>}
                </div>

                {feedback === 'incorrect' && !showSteps && (
                  <button type="button" onClick={() => setShowSteps(true)} className="btn-secondary btn-danger btn-sm">
                    <Binary size={16} /> Ver resolución paso a paso
                  </button>
                )}

                {(showSteps || feedback === 'correct') && <ExerciseSteps exercise={exercise} />}

                <div className="mt-6 flex gap-2 flex-wrap">
                  <button type="button" onClick={newExercise} className="btn-primary btn-dark">
                    Siguiente ejercicio <ArrowRight size={16} />
                  </button>
                  {feedback === 'incorrect' && (
                    <button type="button" onClick={() => { setFeedback(null); setShowSteps(false); }} className="btn-secondary">
                      Intentar de nuevo
                    </button>
                  )}
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
