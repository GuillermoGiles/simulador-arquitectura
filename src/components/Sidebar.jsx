import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { BookOpen, CheckCircle, Home, FileText, Search } from 'lucide-react';
import { modules } from '../data/modules';

const Sidebar = ({ progress }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const found = [];

    modules.forEach(mod => {
      // Check title
      if (mod.title.toLowerCase().includes(query)) {
        found.push({ type: 'Módulo', text: mod.title, id: mod.id });
      }
      
      // Check flashcards
      if (mod.flashcards) {
        mod.flashcards.forEach(card => {
          if (card.term.toLowerCase().includes(query) || card.definition.toLowerCase().includes(query)) {
            found.push({ type: 'Concepto', text: card.term, id: mod.id, context: mod.title });
          }
        });
      }
    });

    setResults(found.slice(0, 10)); // Limit to 10 results
  }, [searchQuery]);

  const handleSelectResult = (id, term) => {
    navigate(`/module/${id}`, { state: { targetTerm: term } });
    setSearchQuery('');
  };

  return (
    <aside className="sidebar flex flex-col h-full">
      <div className="p-4 mb-2">
        <h2 className="text-accent" style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Arquitectura</h2>
        <p style={{ fontSize: '0.875rem' }}>Curso Dinámico</p>
      </div>

      <div className="mb-4" style={{ position: 'relative', zIndex: 50, padding: '0 1rem' }}>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="Buscar conceptos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              background: 'var(--surface-color)', 
              color: 'var(--text-primary)', 
              border: '1px solid var(--border-color)', 
              borderRadius: '8px', 
              padding: '0.5rem 0.5rem 0.5rem 2.5rem', 
              width: '100%', 
              fontSize: '0.875rem',
              outline: 'none'
            }}
          />
          <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
        </div>

        {results.length > 0 && (
          <div style={{ 
            position: 'absolute', 
            top: '100%', 
            left: '1rem', 
            right: '1rem', 
            marginTop: '0.5rem', 
            background: 'var(--surface-color)', 
            border: '1px solid var(--border-color)', 
            borderRadius: '8px', 
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 
            maxHeight: '250px', 
            overflowY: 'auto' 
          }}>
            {results.map((res, i) => (
              <button
                key={i}
                onClick={() => handleSelectResult(res.id, res.type === 'Concepto' ? res.text : null)}
                style={{ 
                  display: 'block',
                  width: '100%', 
                  textAlign: 'left', 
                  padding: '0.75rem 1rem', 
                  borderBottom: i === results.length - 1 ? 'none' : '1px solid var(--border-color)', 
                  background: 'transparent', 
                  cursor: 'pointer',
                  borderTop: 'none',
                  borderLeft: 'none',
                  borderRight: 'none'
                }}
              >
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-color)', fontWeight: 'bold', marginBottom: '0.25rem' }}>{res.type}</div>
                <div style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-primary)' }}>{res.text}</div>
                {res.context && <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.125rem' }}>{res.context}</div>}
              </button>
            ))}
          </div>
        )}
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flexGrow: 1, overflowY: 'auto' }}>
        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Home size={20} />
          <span>Inicio</span>
        </NavLink>

        <div style={{ marginTop: '1rem', marginBottom: '0.5rem', paddingLeft: '1rem' }}>
          <small style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700' }}>
            Módulos de Estudio
          </small>
        </div>

        {modules.map((mod) => (
          <NavLink 
            key={mod.id} 
            to={`/module/${mod.id}`} 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <div className="flex items-center gap-2" style={{ overflow: 'hidden' }}>
              <BookOpen size={18} style={{ minWidth: '18px' }} />
              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Unidad {mod.id}
              </span>
            </div>
            {progress.includes(mod.id.toString()) && (
              <CheckCircle size={16} className="text-success" />
            )}
          </NavLink>
        ))}

        <div style={{ marginTop: '1rem', marginBottom: '0.5rem', paddingLeft: '1rem' }}>
          <small style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700' }}>
            Práctica
          </small>
        </div>

        <NavLink to="/practice" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <FileText size={20} />
          <span>Simulador de Finales</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
