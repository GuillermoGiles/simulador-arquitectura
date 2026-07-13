import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { modules } from '../data/modules';

const PracticeView = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const generateSimulation = () => {
    // Collect all quizzes from all modules
    let allQuestions = [];
    modules.forEach(m => {
      if (m.quiz && Array.isArray(m.quiz)) {
        allQuestions = allQuestions.concat(m.quiz);
      }
    });

    // Shuffle and pick 5
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);
    
    setQuestions(selected);
    setAnswers({});
    setShowResults(false);
    setScore(0);
  };

  // Initialize on first mount
  useEffect(() => {
    generateSimulation();
  }, []);

  const handleSelect = (qIndex, optionIndex) => {
    if (showResults) return;
    setAnswers({
      ...answers,
      [qIndex]: optionIndex
    });
  };

  const calculateResults = () => {
    let currentScore = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.answer) {
        currentScore += 1;
      }
    });
    setScore(currentScore);
    setShowResults(true);
  };

  const getPercentage = () => {
    return Math.round((score / questions.length) * 100) || 0;
  };

  if (questions.length === 0) return null;

  return (
    <div className="animate-fade-in pb-12">
      <button 
        onClick={() => navigate('/')} 
        className="btn-secondary mb-8"
        style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
      >
        <ArrowLeft size={16} /> Volver al Inicio
      </button>

      <div className="glass p-6 mb-8" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Simulador de Finales</h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
            Examen generado aleatoriamente con 5 consignas teóricas y prácticas.
          </p>
        </div>
        <button onClick={generateSimulation} className="btn-secondary flex items-center gap-2">
          <RefreshCw size={18} /> Generar Nuevo Simulacro
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {questions.map((q, qIndex) => {
          const isAnswered = answers[qIndex] !== undefined;
          const isCorrect = answers[qIndex] === q.answer;

          return (
            <div key={qIndex} className="glass-card p-6">
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>
                {qIndex + 1}. {q.question}
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {q.options.map((opt, optIndex) => {
                  let styleClass = 'quiz-option';
                  const isSelected = answers[qIndex] === optIndex;
                  
                  if (isSelected) styleClass += ' selected';
                  
                  if (showResults) {
                    if (optIndex === q.answer) {
                      styleClass += ' correct';
                    } else if (isSelected && optIndex !== q.answer) {
                      styleClass += ' incorrect';
                    }
                  }

                  return (
                    <button
                      key={optIndex}
                      className={styleClass}
                      onClick={() => handleSelect(qIndex, optIndex)}
                      disabled={showResults}
                      style={{
                        borderColor: showResults && isSelected && !isCorrect ? '#ef4444' : '',
                        background: showResults && isSelected && !isCorrect ? 'rgba(239, 68, 68, 0.05)' : ''
                      }}
                    >
                      <div className="flex justify-between items-center text-left">
                        <span>{opt}</span>
                        {showResults && optIndex === q.answer && <CheckCircle size={18} className="text-success min-w-[18px]" />}
                        {showResults && isSelected && !isCorrect && <XCircle size={18} color="#ef4444" className="min-w-[18px]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8">
        {!showResults ? (
          <button 
            className="btn-primary w-full py-4 text-lg justify-center"
            onClick={calculateResults}
            disabled={Object.keys(answers).length < questions.length}
            style={{ opacity: Object.keys(answers).length < questions.length ? 0.5 : 1 }}
          >
            Entregar Examen
          </button>
        ) : (
          <div className="glass-card p-8 animate-fade-in" style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            textAlign: 'center',
            borderColor: getPercentage() >= 60 ? 'var(--success-color)' : 'var(--accent-color)' 
          }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: getPercentage() >= 60 ? 'var(--success-color)' : 'var(--text-primary)' }}>
              Resultado: {score} / {questions.length} ({getPercentage()}%)
            </h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
              {getPercentage() >= 60 
                ? '¡Aprobado! Estás en muy buen camino para el final.'
                : 'Desaprobado. Te recomendamos seguir repasando con las flashcards.'}
            </p>
            <button onClick={generateSimulation} className="btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1.1rem' }}>
              Realizar otra simulación
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PracticeView;
