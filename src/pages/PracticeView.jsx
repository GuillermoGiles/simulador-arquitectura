import React, { useState, useMemo } from 'react';
import { ArrowLeft, CheckCircle, XCircle, RefreshCw, Lightbulb, History, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { modules } from '../data/modules';
import { finalQuestions } from '../data/finalQuestions';
import { shuffle, shuffleQuestionOptions } from '../utils/shuffle';
import { useLocalStorage, STORAGE_KEYS } from '../utils/useLocalStorage';

const SIZES = [5, 10, 20];
const PASS_PERCENTAGE = 60;
const MAX_HISTORY = 50;

// Pool completo: quizzes de cada unidad (etiquetados) + preguntas transversales de final.
const questionPool = [
  ...modules.flatMap(m => (m.quiz ?? []).map(q => ({ ...q, topic: m.title }))),
  ...finalQuestions.map(q => ({ ...q, topic: 'Final integrador' })),
];

const buildExam = (size) => shuffle(questionPool).slice(0, size).map(shuffleQuestionOptions);

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: '2-digit', hour: '2-digit', minute: '2-digit' });

const PracticeView = () => {
  const navigate = useNavigate();
  const [size, setSize] = useState(5);
  const [questions, setQuestions] = useState(() => buildExam(5));
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [history, setHistory] = useLocalStorage(STORAGE_KEYS.examHistory, []);

  const generateSimulation = (newSize = size) => {
    setSize(newSize);
    setQuestions(buildExam(newSize));
    setAnswers({});
    setShowResults(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const score = useMemo(
    () => questions.reduce((acc, q, i) => acc + (answers[i] === q.answer ? 1 : 0), 0),
    [questions, answers]
  );
  const percentage = Math.round((score / questions.length) * 100) || 0;
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === questions.length;
  const passed = percentage >= PASS_PERCENTAGE;

  const handleSelect = (qIndex, optionIndex) => {
    if (showResults) return;
    setAnswers(prev => ({ ...prev, [qIndex]: optionIndex }));
  };

  const submitExam = () => {
    setShowResults(true);
    setHistory(prev => [
      ...prev,
      { date: new Date().toISOString(), score, total: questions.length, percentage },
    ].slice(-MAX_HISTORY));
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const recentHistory = [...history].slice(-8).reverse();

  return (
    <div className="animate-fade-in pb-12">
      <button onClick={() => navigate('/')} className="btn-secondary btn-sm mb-8">
        <ArrowLeft size={16} /> Volver al Inicio
      </button>

      <div className="glass p-6 mb-8 module-header">
        <div>
          <h1 className="page-title">Simulador de Finales</h1>
          <p className="lead">
            Examen aleatorio sobre las {modules.length} unidades. Se aprueba con {PASS_PERCENTAGE}% o más.
          </p>
        </div>
        <div className="flex flex-col gap-2 items-start">
          <div className="flex gap-2 items-center flex-wrap">
            <span className="text-sm muted">Preguntas:</span>
            {SIZES.map(n => (
              <button
                key={n}
                type="button"
                className={`pdf-tab ${size === n ? 'active' : ''}`}
                onClick={() => generateSimulation(n)}
              >
                {n}
              </button>
            ))}
          </div>
          <button onClick={() => generateSimulation()} className="btn-secondary btn-sm">
            <RefreshCw size={16} /> Generar Nuevo Simulacro
          </button>
        </div>
      </div>

      {!showResults && (
        <p className="text-sm text-right mb-4 muted">
          {answeredCount} de {questions.length} respondidas
        </p>
      )}

      <div className="stack" style={{ gap: '2rem' }}>
        {questions.map((q, qIndex) => {
          const selected = answers[qIndex];
          const isCorrect = selected === q.answer;

          return (
            <div key={qIndex} className="glass-card p-6">
              <span className="eyebrow">{q.topic}</span>
              <h3 className="quiz-question mt-2">{qIndex + 1}. {q.question}</h3>

              <div className="quiz-options">
                {q.options.map((opt, optIndex) => {
                  const isSelected = selected === optIndex;
                  const isAnswer = optIndex === q.answer;
                  let cls = 'quiz-option';
                  if (isSelected && !showResults) cls += ' selected';
                  if (showResults && isAnswer) cls += ' correct';
                  if (showResults && isSelected && !isAnswer) cls += ' incorrect';

                  return (
                    <button
                      key={optIndex}
                      type="button"
                      className={cls}
                      onClick={() => handleSelect(qIndex, optIndex)}
                      disabled={showResults}
                    >
                      <div className="quiz-option-inner">
                        <span>{opt}</span>
                        {showResults && isAnswer && <CheckCircle size={18} className="text-success" />}
                        {showResults && isSelected && !isAnswer && <XCircle size={18} className="text-danger" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {showResults && (
                <div className="quiz-feedback">
                  <p className={`quiz-verdict ${isCorrect ? 'ok' : 'ko'}`}>
                    {isCorrect ? '¡Correcto!' : 'Incorrecto.'}
                  </p>
                  {q.explanation && (
                    <div className="explanation">
                      <strong className="flex items-center gap-1 mb-1"><Lightbulb size={14} /> Por qué</strong>
                      {q.explanation}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8">
        {!showResults ? (
          <button
            type="button"
            className="btn-primary btn-lg w-full"
            onClick={submitExam}
            disabled={!allAnswered}
            title={allAnswered ? '' : 'Respondé todas las preguntas para entregar'}
          >
            Entregar Examen {!allAnswered && `(${answeredCount}/${questions.length})`}
          </button>
        ) : (
          <div className={`glass-card p-8 animate-fade-in result-card ${passed ? 'pass' : 'fail'}`}>
            <h2>Resultado: {score} / {questions.length} ({percentage}%)</h2>
            <p className="text-lg mb-6">
              {passed
                ? '¡Aprobado! Estás en muy buen camino para el final.'
                : 'Desaprobado. Revisá las explicaciones de arriba y repasá con las flashcards.'}
            </p>
            <button type="button" onClick={() => generateSimulation()} className="btn-primary btn-lg">
              <RefreshCw size={18} /> Realizar otra simulación
            </button>
          </div>
        )}
      </div>

      {recentHistory.length > 0 && (
        <div className="glass-card p-6 mt-8">
          <div className="flex justify-between items-center mb-4 gap-2 flex-wrap">
            <h3 className="card-title" style={{ fontSize: '1.2rem', margin: 0 }}>
              <History className="text-accent" size={20} /> Historial de simulacros
            </h3>
            <button type="button" className="btn-ghost btn-sm" onClick={() => setHistory([])} title="Borrar historial">
              <Trash2 size={16} /> Borrar
            </button>
          </div>
          <div className="history-list">
            {recentHistory.map(h => (
              <div key={h.date} className="history-row">
                <span className="muted">{formatDate(h.date)}</span>
                <span className="muted text-sm">{h.total} preguntas</span>
                <span className={`score ${h.percentage >= PASS_PERCENTAGE ? 'pass' : 'fail'}`}>
                  {h.score}/{h.total} · {h.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PracticeView;
