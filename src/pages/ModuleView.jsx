import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { modules } from '../data/modules';
import { CheckCircle, Circle, Video, FileText, ArrowLeft, ExternalLink } from 'lucide-react';
import MiniQuiz from '../components/MiniQuiz';
import BaseConverter from '../components/BaseConverter';
import Flashcards from '../components/Flashcards';
import CpuSimulator from '../components/CpuSimulator';

const RECORDINGS = [
  { label: 'Teoría', href: 'http://tinyurl.com/CsGrabadas-ArquiTeoria' },
  { label: 'Práctica', href: 'http://tinyurl.com/CsGrabadas-ArquiPractica' },
];

// Único PDF de teoría (todo el material de la cátedra). Cada módulo apunta a sus páginas.
const THEORY_PDF = '/pdfs/teoria.pdf';
const pdfUrl = (page) => `${THEORY_PDF}#page=${page}&view=FitH`;

const ModuleView = ({ progress, setProgress }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const module = modules.find(m => m.id.toString() === id);
  const [sectionIndex, setSectionIndex] = useState(0);

  // Al cambiar de módulo, volver a la primera sección y al tope de la página
  useEffect(() => {
    setSectionIndex(0);
    window.scrollTo({ top: 0 });
  }, [id]);

  if (!module) {
    return (
      <div className="glass-card p-8 text-center">
        <h2>Módulo no encontrado</h2>
        <button className="btn-primary mt-4" onClick={() => navigate('/')}>Volver al inicio</button>
      </div>
    );
  }

  const isCompleted = progress.includes(id);
  const hasQuiz = Array.isArray(module.quiz) && module.quiz.length > 0;
  const targetTerm = location.state?.targetTerm;
  const sections = module.sections ?? [];
  const currentSection = sections[sectionIndex] ?? sections[0];

  const markComplete = () => {
    if (!isCompleted) setProgress(prev => [...prev, id]);
  };

  const unmarkComplete = () => {
    setProgress(prev => prev.filter(p => p !== id));
  };

  return (
    <div className="animate-fade-in pb-12">
      <button onClick={() => navigate('/')} className="btn-secondary btn-sm mb-8">
        <ArrowLeft size={16} /> Volver al Inicio
      </button>

      <div className="glass p-6 mb-8 module-header">
        <div>
          <h1 className="page-title">{module.title}</h1>
          <p className="lead">{module.description}</p>
        </div>
        <div className="module-header-action">
          {isCompleted ? (
            <button onClick={unmarkComplete} className="btn-secondary btn-success" title="Quitar la marca de completado">
              <CheckCircle size={20} /> Completado
            </button>
          ) : (
            <button onClick={markComplete} className="btn-primary" disabled={hasQuiz}>
              <Circle size={20} /> Marcar como Completado
            </button>
          )}
          {!isCompleted && hasQuiz && (
            <small>Se completa automáticamente al aprobar el cuestionario (60% o más).</small>
          )}
        </div>
      </div>

      {module.id === 1 && <BaseConverter />}
      {module.id === 5 && <CpuSimulator />}

      {module.flashcards && (
        <Flashcards moduleId={module.id} flashcards={module.flashcards} targetTerm={targetTerm} />
      )}

      <div className="module-body">
        <div className="glass-card p-6">
          <h2 className="card-title">
            <FileText className="text-accent" /> Material de Estudio
          </h2>

          {sections.length > 1 && (
            <div className="pdf-tabs" role="tablist">
              {sections.map((section, i) => (
                <button
                  key={section.page}
                  type="button"
                  role="tab"
                  aria-selected={i === sectionIndex}
                  className={`pdf-tab ${i === sectionIndex ? 'active' : ''}`}
                  onClick={() => setSectionIndex(i)}
                >
                  {section.label}
                </button>
              ))}
            </div>
          )}

          {currentSection ? (
            <>
              <p className="mb-4 text-sm flex items-center gap-2 flex-wrap">
                <span>
                  <strong>{currentSection.label}</strong> · página {currentSection.page} del material teórico
                </span>
                <a href={pdfUrl(currentSection.page)} target="_blank" rel="noreferrer" className="text-accent flex items-center gap-1">
                  Abrir en pestaña nueva <ExternalLink size={14} />
                </a>
              </p>
              <div className="pdf-frame">
                {/* key fuerza el remontaje: cambiar sólo el #page del src no siempre mueve el visor */}
                <iframe key={`${id}-${currentSection.page}`} src={pdfUrl(currentSection.page)} title={`Teoría: ${currentSection.label}`} />
              </div>
            </>
          ) : (
            <p>Este módulo aún no tiene material asociado.</p>
          )}
        </div>

        <div className="module-aside">
          <div className="glass-card p-6">
            <h3 className="card-title" style={{ fontSize: '1.2rem' }}>
              <Video className="text-accent" size={20} /> Clases Grabadas
            </h3>
            <p className="mb-4 text-sm">Accede a las grabaciones de teoría y práctica.</p>
            <div className="stack" style={{ gap: '0.5rem' }}>
              {RECORDINGS.map(r => (
                <a key={r.label} href={r.href} target="_blank" rel="noreferrer" className="btn-secondary w-full">
                  {r.label} <ExternalLink size={14} />
                </a>
              ))}
            </div>
          </div>

          {hasQuiz && (
            <MiniQuiz quizData={module.quiz} isCompleted={isCompleted} onPass={markComplete} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ModuleView;
