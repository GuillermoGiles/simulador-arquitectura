import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { modules } from '../data/modules';
import { CheckCircle, Circle, Video, FileText, ArrowLeft } from 'lucide-react';
import MiniQuiz from '../components/MiniQuiz';
import BaseConverter from '../components/BaseConverter';
import Flashcards from '../components/Flashcards';
import CpuSimulator from '../components/CpuSimulator';

const ModuleView = ({ progress, setProgress }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const module = modules.find(m => m.id.toString() === id);
  
  if (!module) return <div>Módulo no encontrado</div>;

  const isCompleted = progress.includes(id);
  const targetTerm = location.state?.targetTerm;

  const toggleComplete = () => {
    // Only allow manual untoggle or manual toggle if no quiz
    // If it has a quiz, they must pass it to mark as complete (handled by onPass)
    if (isCompleted) {
      const newProgress = progress.filter(p => p !== id);
      setProgress(newProgress);
      localStorage.setItem('arqui_progress', JSON.stringify(newProgress));
    }
  };

  const handlePassQuiz = () => {
    if (!isCompleted) {
      const newProgress = [...progress, id];
      setProgress(newProgress);
      localStorage.setItem('arqui_progress', JSON.stringify(newProgress));
    }
  };

  return (
    <div className="animate-fade-in pb-12">
      <button 
        onClick={() => navigate('/')} 
        className="btn-secondary mb-8"
        style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
      >
        <ArrowLeft size={16} /> Volver al Inicio
      </button>

      <div className="glass p-6 mb-8" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{module.title}</h1>
          <p style={{ fontSize: '1.1rem' }}>{module.description}</p>
        </div>
        <button 
          onClick={toggleComplete}
          className={isCompleted ? "btn-secondary" : "btn-primary"}
          style={{ borderColor: isCompleted ? 'var(--success-color)' : '', color: isCompleted ? 'var(--success-color)' : '', opacity: (!isCompleted && module.quiz) ? 0.5 : 1, cursor: (!isCompleted && module.quiz) ? 'not-allowed' : 'pointer' }}
          disabled={!isCompleted && module.quiz !== undefined}
          title={!isCompleted && module.quiz ? "Debes aprobar el Mini-Quiz para completar" : ""}
        >
          {isCompleted ? <><CheckCircle size={20} /> Completado</> : <><Circle size={20} /> Marcar como Completado</>}
        </button>
      </div>
      
      {/* Interactive Components Section */}
      {module.id === 1 && <BaseConverter />}
      {module.id === 5 && <CpuSimulator />}
      
      {module.flashcards && <Flashcards flashcards={module.flashcards} targetTerm={targetTerm} />}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
        <div className="glass-card p-6" style={{ minHeight: '600px' }}>
          <h2 className="flex items-center gap-2 mb-4" style={{ fontSize: '1.5rem' }}>
            <FileText className="text-accent" /> Material de Estudio
          </h2>
          <p className="mb-4">
            El archivo correspondiente es: <strong>{module.pdf}</strong>
          </p>
          <div style={{ height: '600px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
            <iframe 
              src={`/pdfs/${module.pdf}`} 
              width="100%" 
              height="100%" 
              style={{ border: 'none' }}
              title={`PDF de ${module.title}`}
            />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-card p-6">
            <h3 className="flex items-center gap-2 mb-4">
              <Video className="text-accent" /> Clases Grabadas
            </h3>
            <p className="mb-4" style={{ fontSize: '0.9rem' }}>
              Accede a las grabaciones de teoría y práctica.
            </p>
            <a 
              href="http://tinyurl.com/CsGrabadas-ArquiTeoria" 
              target="_blank" 
              rel="noreferrer" 
              className="btn-secondary w-full mb-2"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Teoría
            </a>
            <a 
              href="http://tinyurl.com/CsGrabadas-ArquiPractica" 
              target="_blank" 
              rel="noreferrer" 
              className="btn-secondary w-full"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Práctica
            </a>
          </div>

          {module.quiz && (
            <MiniQuiz 
              quizData={module.quiz} 
              isCompleted={isCompleted}
              onPass={handlePassQuiz}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ModuleView;
