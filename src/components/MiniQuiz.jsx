import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, RotateCcw, Lightbulb } from 'lucide-react';
import { shuffle, shuffleQuestionOptions } from '../utils/shuffle';

const PASS_RATIO = 0.6;

// Cada intento baraja las preguntas y el orden de sus opciones.
const buildAttempt = (quizData) => {
  const questions = Array.isArray(quizData) ? quizData : [quizData];
  return shuffle(questions).map(shuffleQuestionOptions);
};

const MiniQuiz = ({ quizData, isCompleted, onPass }) => {
  const [questions, setQuestions] = useState(() => buildAttempt(quizData));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  // Si el módulo ya está aprobado, mostramos el resumen hasta que el usuario decida rehacerlo.
  const [retaking, setRetaking] = useState(false);

  const restart = (data = quizData) => {
    setQuestions(buildAttempt(data));
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowResult(false);
    setCorrectCount(0);
    setFinished(false);
  };

  useEffect(() => {
    restart(quizData);
    setRetaking(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizData]);

  const total = questions.length;
  const needed = Math.ceil(total * PASS_RATIO);
  const currentQuestion = questions[currentIndex];

  if (isCompleted && !retaking) {
    return (
      <div className="glass-card p-6" style={{ background: 'var(--success-soft)', borderColor: 'var(--success-color)' }}>
        <h3 className="flex items-center gap-2 text-success">
          <CheckCircle /> Cuestionario de Módulo Aprobado
        </h3>
        <p className="mt-2 mb-4">Ya superaste la prueba de conocimientos de este módulo. Podés rehacerla para repasar.</p>
        <button type="button" className="btn-secondary btn-sm" onClick={() => { restart(); setRetaking(true); }}>
          <RotateCcw size={16} /> Rehacer cuestionario
        </button>
      </div>
    );
  }

  if (!currentQuestion) return null;

  const isCorrect = selectedOption === currentQuestion.answer;

  const handleVerify = () => {
    setShowResult(true);
    if (isCorrect) setCorrectCount(c => c + 1);
  };

  const handleNext = () => {
    if (currentIndex + 1 < total) {
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
      setShowResult(false);
      return;
    }
    setFinished(true);
    if (correctCount >= needed) onPass();
  };

  if (finished) {
    const passed = correctCount >= needed;
    return (
      <div className={`glass-card p-6 result-card ${passed ? 'pass' : 'fail'}`}>
        <h3 style={{ fontSize: '1.5rem' }}>Resultado: {correctCount} / {total}</h3>
        <p className="mb-4">
          {passed
            ? '¡Felicitaciones! Demostraste tener los conocimientos necesarios.'
            : `No alcanzaste el ${Math.round(PASS_RATIO * 100)}% necesario (${needed} de ${total}). Te sugerimos repasar la teoría y las flashcards.`}
        </p>
        {passed && (
          <p className="text-success font-bold flex items-center justify-center gap-2 mb-4">
            <CheckCircle /> Módulo completado
          </p>
        )}
        <button type="button" onClick={() => restart()} className={passed ? 'btn-secondary' : 'btn-primary'}>
          <RotateCcw size={16} /> {passed ? 'Rehacer para repasar' : 'Reintentar cuestionario'}
        </button>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-center mb-4 gap-2 flex-wrap">
        <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{isCompleted ? 'Repaso del módulo' : 'Requisito de Completado'}</h3>
        <span className="text-sm muted">Pregunta {currentIndex + 1} de {total}</span>
      </div>

      <p className="mb-6" style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{currentQuestion.question}</p>

      <div className="quiz-options">
        {currentQuestion.options.map((opt, index) => {
          const isSelected = selectedOption === index;
          const isAnswer = index === currentQuestion.answer;
          let cls = 'quiz-option';
          if (isSelected && !showResult) cls += ' selected';
          if (showResult && isAnswer) cls += ' correct';
          if (showResult && isSelected && !isAnswer) cls += ' incorrect';

          return (
            <button
              key={index}
              type="button"
              className={cls}
              onClick={() => !showResult && setSelectedOption(index)}
              disabled={showResult}
            >
              <div className="quiz-option-inner">
                <span>{opt}</span>
                {showResult && isAnswer && <CheckCircle size={18} className="text-success" />}
                {showResult && isSelected && !isAnswer && <XCircle size={18} className="text-danger" />}
              </div>
            </button>
          );
        })}
      </div>

      {!showResult && selectedOption !== null && (
        <button type="button" onClick={handleVerify} className="btn-primary w-full mt-6">
          Verificar Respuesta
        </button>
      )}

      {showResult && (
        <div className="quiz-feedback">
          <p className={`quiz-verdict ${isCorrect ? 'ok' : 'ko'}`}>
            {isCorrect ? '¡Correcto!' : 'Incorrecto.'}
          </p>
          {currentQuestion.explanation && (
            <div className="explanation">
              <strong className="flex items-center gap-1 mb-1"><Lightbulb size={14} /> Por qué</strong>
              {currentQuestion.explanation}
            </div>
          )}
          <button type="button" onClick={handleNext} className="btn-primary w-full mt-4">
            {currentIndex + 1 < total ? 'Siguiente Pregunta' : 'Ver Resultados'}
          </button>
        </div>
      )}
    </div>
  );
};

export default MiniQuiz;
