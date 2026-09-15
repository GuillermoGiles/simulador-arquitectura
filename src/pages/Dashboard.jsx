import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Award, ArrowRight, Flame, History, Layers } from 'lucide-react';
import { modules } from '../data/modules';
import { useLocalStorage, STORAGE_KEYS } from '../utils/useLocalStorage';

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('es-AR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });

const Dashboard = ({ progress, streak }) => {
  const [history] = useLocalStorage(STORAGE_KEYS.examHistory, []);
  const [hardCards] = useLocalStorage(STORAGE_KEYS.hardCards, {});

  const completedCount = progress.length;
  const totalCount = modules.length;
  const progressPercentage = Math.round((completedCount / totalCount) * 100) || 0;

  const hardCount = Object.values(hardCards).reduce((acc, terms) => acc + terms.length, 0);
  const recentHistory = [...history].slice(-5).reverse();
  const average = history.length
    ? Math.round(history.reduce((acc, h) => acc + h.percentage, 0) / history.length)
    : null;

  return (
    <div className="dashboard animate-fade-in">
      <div className="glass p-6 mb-8 hero">
        <div>
          <h1>Bienvenido de nuevo</h1>
          <p>Continúa tu preparación para el final de Arquitectura de Computadoras.</p>
        </div>
        <div className="hero-stats">
          <div className="glass-card stat-pill">
            <Flame size={28} />
            <strong>{streak} {streak === 1 ? 'Día' : 'Días'}</strong>
            <small>Racha Activa</small>
          </div>
          <div className="stat-big">
            <strong>{progressPercentage}%</strong>
            <p>Progreso total</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progressPercentage}%` }} />
        </div>
        <p className="text-right mt-2 text-sm">
          {completedCount} de {totalCount} módulos completados
        </p>
      </div>

      <h2 className="section-title">Tus Módulos de Estudio</h2>
      <div className="modules-grid">
        {modules.map((mod) => {
          const isCompleted = progress.includes(mod.id.toString());
          const hard = hardCards[mod.id]?.length ?? 0;

          return (
            <Link key={mod.id} to={`/module/${mod.id}`} className="glass-card hoverable p-6 module-card">
              <div className="flex justify-between items-center mb-4">
                <span className={`icon-badge ${isCompleted ? 'success' : ''}`}>
                  <BookOpen size={24} />
                </span>
                <span className="flex gap-2 items-center">
                  {hard > 0 && <span className="chip" title="Flashcards marcadas como difíciles">{hard} difíciles</span>}
                  {isCompleted && <span className="text-success text-sm font-bold">Completado</span>}
                </span>
              </div>

              <h3>{mod.title}</h3>
              <p>{mod.description}</p>

              <div className="flex items-center gap-2 mt-4 text-accent text-sm font-bold">
                Ir al módulo <ArrowRight size={16} />
              </div>
            </Link>
          );
        })}
      </div>

      <h2 className="section-title mt-12">Simulacro de Examen</h2>
      <div className="glass-card p-6 cta-card">
        <div className="cta-card-body">
          <span className="icon-badge warning"><Award size={32} /></span>
          <div>
            <h3>Simulador de Finales</h3>
            <p>Exámenes aleatorios de 5, 10 o 20 preguntas con explicación de cada respuesta.</p>
          </div>
        </div>
        <Link to="/practice" className="btn-primary">Empezar Práctica</Link>
      </div>

      {(recentHistory.length > 0 || hardCount > 0) && (
        <div className="two-col mt-8">
          {recentHistory.length > 0 && (
            <div className="glass-card p-6">
              <h3 className="card-title" style={{ fontSize: '1.2rem' }}>
                <History className="text-accent" size={20} /> Últimos simulacros
              </h3>
              <div className="history-list">
                {recentHistory.map((h) => (
                  <div key={h.date} className="history-row">
                    <span className="muted">{formatDate(h.date)}</span>
                    <span className={`score ${h.percentage >= 60 ? 'pass' : 'fail'}`}>
                      {h.score}/{h.total} · {h.percentage}%
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-sm mt-4">
                Promedio histórico: <strong className="text-accent">{average}%</strong> en {history.length} {history.length === 1 ? 'simulacro' : 'simulacros'}.
              </p>
            </div>
          )}

          {hardCount > 0 && (
            <div className="glass-card p-6">
              <h3 className="card-title" style={{ fontSize: '1.2rem' }}>
                <Layers className="text-accent" size={20} /> Conceptos a repasar
              </h3>
              <p className="mb-4">
                Tenés <strong className="text-danger">{hardCount}</strong> flashcards marcadas como difíciles.
                Entrá a cada módulo y activá el modo <em>Repasar difíciles</em>.
              </p>
              <div className="history-list">
                {modules
                  .filter((m) => hardCards[m.id]?.length)
                  .map((m) => (
                    <Link key={m.id} to={`/module/${m.id}`} className="history-row" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <span>{m.title}</span>
                      <span className="chip">{hardCards[m.id].length}</span>
                    </Link>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
