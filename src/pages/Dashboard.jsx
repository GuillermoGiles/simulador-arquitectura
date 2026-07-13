import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Award, ArrowRight, Flame } from 'lucide-react';
import { modules } from '../data/modules';

const Dashboard = ({ progress, streak }) => {
  const completedCount = progress.length;
  const totalCount = modules.length;
  const progressPercentage = Math.round((completedCount / totalCount) * 100) || 0;

  return (
    <div className="dashboard animate-fade-in">
      <div className="glass p-6 mb-8" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Bienvenido de nuevo</h1>
          <p>Continúa tu preparación para el final de Arquitectura de Computadoras.</p>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0.5rem 1rem', borderColor: '#f97316' }}>
            <Flame size={28} color="#f97316" />
            <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#f97316', lineHeight: '1.2' }}>
              {streak} {streak === 1 ? 'Día' : 'Días'}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Racha Activa</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-color)', lineHeight: '1' }}>
              {progressPercentage}%
            </div>
            <p style={{ color: 'var(--text-secondary)' }}>Progreso total</p>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <div style={{ height: '8px', background: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
          <div 
            style={{ 
              height: '100%', 
              width: `${progressPercentage}%`, 
              background: 'var(--accent-color)',
              transition: 'width 1s ease-in-out' 
            }} 
          />
        </div>
        <p style={{ textAlign: 'right', marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          {completedCount} de {totalCount} módulos completados
        </p>
      </div>

      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Tus Módulos de Estudio</h2>
      <div className="modules-grid">
        {modules.map((mod) => {
          const isCompleted = progress.includes(mod.id.toString());
          
          return (
            <Link 
              key={mod.id} 
              to={`/module/${mod.id}`}
              style={{ textDecoration: 'none' }}
            >
              <div className="glass-card p-6" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div className="flex justify-between items-center mb-4">
                  <div 
                    style={{ 
                      background: isCompleted ? 'rgba(16, 185, 129, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                      color: isCompleted ? 'var(--success-color)' : 'var(--accent-color)',
                      padding: '0.5rem',
                      borderRadius: '8px'
                    }}
                  >
                    <BookOpen size={24} />
                  </div>
                  {isCompleted && <span className="text-success text-sm font-bold">Completado</span>}
                </div>
                
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{mod.title}</h3>
                <p style={{ fontSize: '0.9rem', flexGrow: 1 }}>{mod.description}</p>
                
                <div className="flex items-center gap-2 mt-4 text-accent" style={{ fontSize: '0.9rem', fontWeight: '600' }}>
                  Ir al módulo <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <h2 style={{ fontSize: '1.5rem', marginTop: '3rem', marginBottom: '1.5rem' }}>Simulacro de Examen</h2>
      <div className="glass-card p-6" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="flex items-center gap-4">
          <div style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', padding: '1rem', borderRadius: '12px' }}>
            <Award size={32} />
          </div>
          <div>
            <h3>Simulador de Finales</h3>
            <p>Pon a prueba tus conocimientos con exámenes de 5 consignas teóricas.</p>
          </div>
        </div>
        <Link to="/practice" className="btn-primary" style={{ textDecoration: 'none' }}>
          Empezar Práctica
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
