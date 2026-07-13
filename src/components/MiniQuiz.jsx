import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const MiniQuiz = ({ quizData, isCompleted, onPass }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    // Reset state when quiz changes
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowResult(false);
    setCorrectAnswersCount(0);
    setQuizFinished(false);
  }, [quizData]);

  if (isCompleted) {
    return (
      <div className="glass-card p-6" style={{ background: 'rgba(16, 185, 129, 0.05)', borderColor: 'var(--success-color)' }}>
        <h3 className="flex items-center gap-2 text-success">
          <CheckCircle /> Cuestionario de Módulo Aprobado
        </h3>
        <p style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
          Ya has superado la prueba de conocimientos de este módulo.
        </p>
      </div>
    );
  }

  // Si quizData es un array de preguntas (nuevo formato)
  const questions = Array.isArray(quizData) ? quizData : [quizData];
  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) return null;

  const handleSelect = (index) => {
    if (showResult) return;
    setSelectedOption(index);
  };

  const isCorrect = selectedOption === currentQuestion.answer;

  const handleVerify = () => {
    setShowResult(true);
    if (isCorrect) {
      setCorrectAnswersCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setQuizFinished(true);
      // Requerimos al menos un 60% para aprobar (6/10)
      const isPassed = (correctAnswersCount + (isCorrect ? 1 : 0)) >= Math.ceil(questions.length * 0.6);
      if (isPassed) {
        onPass();
      }
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowResult(false);
    setCorrectAnswersCount(0);
    setQuizFinished(false);
  };

  if (quizFinished) {
    const totalCorrect = correctAnswersCount;
    const passed = totalCorrect >= Math.ceil(questions.length * 0.6);
    return (
      <div className="glass-card p-6" style={{ textAlign: 'center', borderColor: passed ? 'var(--success-color)' : 'var(--accent-color)' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
          Resultado: {totalCorrect} / {questions.length}
        </h3>
        <p className="mb-4">
          {passed 
            ? '¡Felicitaciones! Has demostrado tener los conocimientos necesarios.' 
            : 'No has alcanzado el 60% necesario para aprobar. Te sugerimos repasar la teoría.'}
        </p>
        {!passed && (
          <button onClick={handleRetry} className="btn-secondary">
            Reintentar Cuestionario
          </button>
        )}
        {passed && (
          <p className="text-success font-bold flex items-center justify-center gap-2">
            <CheckCircle /> Módulo completado
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 style={{ fontSize: '1.2rem' }}>Requisito de Completado</h3>
        <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Pregunta {currentQuestionIndex + 1} de {questions.length}
        </span>
      </div>
      
      <p style={{ marginBottom: '1.5rem', fontWeight: '500' }}>{currentQuestion.question}</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {currentQuestion.options.map((opt, index) => {
          let styleClass = 'quiz-option';
          if (selectedOption === index) styleClass += ' selected';
          
          if (showResult && selectedOption === index) {
            if (isCorrect) styleClass += ' correct';
            else styleClass += ' incorrect';
          }
          if (showResult && index === currentQuestion.answer && !isCorrect) {
            styleClass += ' correct'; 
          }

          return (
            <button
              key={index}
              className={styleClass}
              onClick={() => handleSelect(index)}
              disabled={showResult}
              style={{
                borderColor: showResult && selectedOption === index && !isCorrect ? '#ef4444' : '',
                background: showResult && selectedOption === index && !isCorrect ? 'rgba(239, 68, 68, 0.05)' : ''
              }}
            >
              <div className="flex justify-between items-center">
                <span>{opt}</span>
                {showResult && index === currentQuestion.answer && <CheckCircle size={18} className="text-success" />}
                {showResult && selectedOption === index && !isCorrect && <XCircle size={18} color="#ef4444" />}
              </div>
            </button>
          );
        })}
      </div>

      {!showResult && selectedOption !== null && (
        <button onClick={handleVerify} className="btn-primary" style={{ marginTop: '1.5rem', width: '100%', justifyContent: 'center' }}>
          Verificar Respuesta
        </button>
      )}

      {showResult && (
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          {isCorrect ? (
            <p style={{ color: 'var(--success-color)', marginBottom: '1rem', fontWeight: 'bold' }}>¡Correcto!</p>
          ) : (
            <p style={{ color: '#ef4444', marginBottom: '1rem', fontWeight: 'bold' }}>Incorrecto.</p>
          )}
          
          <button onClick={handleNext} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            {currentQuestionIndex + 1 < questions.length ? 'Siguiente Pregunta' : 'Ver Resultados'}
          </button>
        </div>
      )}
    </div>
  );
};

export default MiniQuiz;
