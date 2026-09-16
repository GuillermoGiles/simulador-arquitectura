import React, { useState, useMemo } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { BookOpen, CheckCircle, Home, FileText, Search } from 'lucide-react';
import { modules } from '../data/modules';
import { notes } from '../data/notes';

const MAX_RESULTS = 10;

// Normaliza para que la búsqueda ignore acentos y mayúsculas.
const normalize = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

function searchContent(query) {
  const q = normalize(query);
  const found = [];

  for (const mod of modules) {
    if (normalize(mod.title).includes(q)) {
      found.push({ type: 'Módulo', text: mod.title, id: mod.id });
    }
    for (const card of mod.flashcards ?? []) {
      if (normalize(card.term).includes(q) || normalize(card.definition).includes(q)) {
        found.push({ type: 'Concepto', text: card.term, id: mod.id, context: mod.title, term: card.term });
      }
    }
    for (const question of mod.quiz ?? []) {
      if (normalize(question.question).includes(q)) {
        found.push({ type: 'Pregunta', text: question.question, id: mod.id, context: mod.title });
      }
    }
    for (const section of notes[mod.id] ?? []) {
      if (normalize(section.title).includes(q) || normalize(section.content).includes(q)) {
        found.push({ type: 'Apunte', text: section.title, id: mod.id, context: mod.title, section: section.title });
      }
    }
    if (found.length >= MAX_RESULTS) break;
  }

  return found.slice(0, MAX_RESULTS);
}

const Sidebar = ({ progress, open, themeButton }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const results = useMemo(
    () => (searchQuery.trim() ? searchContent(searchQuery.trim()) : []),
    [searchQuery]
  );

  const handleSelectResult = (res) => {
    navigate(`/module/${res.id}`, { state: { targetTerm: res.term ?? null, targetSection: res.section ?? null } });
    setSearchQuery('');
  };

  return (
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h2>Arquitectura</h2>
        <p>Curso Dinámico</p>
      </div>

      <div className="search-wrap">
        <div style={{ position: 'relative' }}>
          <input
            type="search"
            className="search-input"
            placeholder="Buscar conceptos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Buscar conceptos, módulos y preguntas"
          />
          <Search size={16} className="search-icon" />
        </div>

        {results.length > 0 && (
          <div className="search-results" role="listbox">
            {results.map((res, i) => (
              <button key={i} type="button" className="search-result" onClick={() => handleSelectResult(res)}>
                <div className="search-result-type">{res.type}</div>
                <div className="search-result-text">{res.text}</div>
                {res.context && <div className="search-result-context">{res.context}</div>}
              </button>
            ))}
          </div>
        )}
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <span className="nav-link-label"><Home size={20} /> Inicio</span>
        </NavLink>

        <div className="sidebar-section">
          <small className="eyebrow">Módulos de Estudio</small>
        </div>

        {modules.map((mod) => (
          <NavLink
            key={mod.id}
            to={`/module/${mod.id}`}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            title={mod.title}
          >
            <span className="nav-link-label">
              <BookOpen size={18} style={{ flexShrink: 0 }} />
              <span>Unidad {mod.id}</span>
            </span>
            {progress.includes(mod.id.toString()) && (
              <CheckCircle size={16} className="text-success" aria-label="Completado" />
            )}
          </NavLink>
        ))}

        <div className="sidebar-section">
          <small className="eyebrow">Práctica</small>
        </div>

        <NavLink to="/practice" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <span className="nav-link-label"><FileText size={20} /> Simulador de Finales</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <span>Tema</span>
        {themeButton}
      </div>
    </aside>
  );
};

export default Sidebar;
