import React, { useState, useEffect, useMemo } from 'react';
import { NotebookPen, ChevronDown, ChevronUp } from 'lucide-react';

// ---------- Renderizador mínimo de Markdown para los apuntes ----------
// Soporta: ## / ###, listas "- " (anidadas con 2 espacios), tablas "| a | b |",
// citas "> ", párrafos, **negrita**, `código`.

const slug = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

function renderInline(text) {
  // Divide por negrita y código conservando los delimitadores
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('`') && part.endsWith('`')) return <code key={i} className="note-code">{part.slice(1, -1)}</code>;
    return part;
  });
}

function parseBlocks(markdown) {
  const lines = markdown.replace(/\r/g, '').split('\n');
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) { i++; continue; }

    if (trimmed.startsWith('### ')) { blocks.push({ type: 'h3', text: trimmed.slice(4) }); i++; continue; }
    if (trimmed.startsWith('## ')) { blocks.push({ type: 'h2', text: trimmed.slice(3) }); i++; continue; }
    if (trimmed.startsWith('> ')) { blocks.push({ type: 'quote', text: trimmed.slice(2) }); i++; continue; }

    if (trimmed.startsWith('|')) {
      const rows = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        const cells = lines[i].trim().slice(1, -1).split('|').map(c => c.trim().replace(/\\\|/g, '|'));
        rows.push(cells);
        i++;
      }
      const isSeparator = (r) => r.every(c => /^:?-{2,}:?$/.test(c));
      const header = rows[0];
      const body = rows.slice(1).filter(r => !isSeparator(r));
      blocks.push({ type: 'table', header, body });
      continue;
    }

    if (/^(\s*)(-|\d+\.)\s/.test(line)) {
      const items = [];
      while (i < lines.length && /^(\s*)(-|\d+\.)\s/.test(lines[i])) {
        const m = lines[i].match(/^(\s*)(-|\d+\.)\s(.*)$/);
        items.push({ depth: Math.floor(m[1].length / 2), ordered: m[2] !== '-', text: m[3] });
        i++;
      }
      blocks.push({ type: 'list', items });
      continue;
    }

    // Párrafo: junta líneas consecutivas hasta una en blanco u otro bloque
    const para = [];
    while (i < lines.length && lines[i].trim() && !/^(#{2,3} |> |\||\s*(-|\d+\.)\s)/.test(lines[i])) {
      para.push(lines[i].trim());
      i++;
    }
    blocks.push({ type: 'p', text: para.join(' ') });
  }
  return blocks;
}

// Convierte la lista plana con `depth` en <ul>/<ol> anidados
function renderList(items) {
  const build = (start, depth) => {
    const nodes = [];
    let idx = start;
    while (idx < items.length && items[idx].depth >= depth) {
      if (items[idx].depth > depth) { idx++; continue; }
      const item = items[idx];
      const childStart = idx + 1;
      let childEnd = childStart;
      while (childEnd < items.length && items[childEnd].depth > depth) childEnd++;
      const children = childEnd > childStart ? build(childStart, depth + 1) : null;
      nodes.push(
        <li key={idx}>
          {renderInline(item.text)}
          {children}
        </li>
      );
      idx = childEnd;
    }
    const Tag = items[start]?.ordered ? 'ol' : 'ul';
    return <Tag className="note-list">{nodes}</Tag>;
  };
  return build(0, 0);
}

function Block({ block }) {
  switch (block.type) {
    case 'h2': return <h4 className="note-h2">{renderInline(block.text)}</h4>;
    case 'h3': return <h5 className="note-h3">{renderInline(block.text)}</h5>;
    case 'quote': return <blockquote className="note-quote">{renderInline(block.text)}</blockquote>;
    case 'list': return renderList(block.items);
    case 'table':
      return (
        <div className="note-table-wrap">
          <table className="note-table">
            <thead><tr>{block.header.map((c, i) => <th key={i}>{renderInline(c)}</th>)}</tr></thead>
            <tbody>
              {block.body.map((row, r) => (
                <tr key={r}>{row.map((c, i) => <td key={i}>{renderInline(c)}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default: return <p className="note-p">{renderInline(block.text)}</p>;
  }
}

// ---------- Panel ----------

const NotesPanel = ({ sections, targetSection }) => {
  const [openAll, setOpenAll] = useState(false);
  const [open, setOpen] = useState(() => new Set([0]));

  const parsed = useMemo(
    () => sections.map(s => ({ ...s, id: slug(s.title), blocks: parseBlocks(s.content) })),
    [sections]
  );

  // Al cambiar de módulo, dejar sólo la primera sección abierta
  useEffect(() => {
    setOpen(new Set([0]));
    setOpenAll(false);
  }, [sections]);

  // Abrir y desplazar hasta la sección buscada desde la barra lateral
  useEffect(() => {
    if (!targetSection) return;
    const idx = parsed.findIndex(s => s.title === targetSection);
    if (idx === -1) return;
    setOpen(prev => new Set([...prev, idx]));
    const el = document.getElementById(`note-${parsed[idx].id}`);
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  }, [targetSection, parsed]);

  const toggle = (idx) => setOpen(prev => {
    const next = new Set(prev);
    if (next.has(idx)) next.delete(idx); else next.add(idx);
    return next;
  });

  const toggleAll = () => {
    setOpen(openAll ? new Set() : new Set(parsed.map((_, i) => i)));
    setOpenAll(v => !v);
  };

  if (!sections || sections.length === 0) return null;

  return (
    <div className="glass-card p-6 mb-8">
      <div className="flashcard-toolbar">
        <h3 className="card-title" style={{ margin: 0 }}>
          <NotebookPen className="text-accent" /> Mis Apuntes
        </h3>
        <button type="button" className="btn-secondary btn-sm" onClick={toggleAll}>
          {openAll ? <><ChevronUp size={16} /> Contraer todo</> : <><ChevronDown size={16} /> Expandir todo</>}
        </button>
      </div>
      <p className="text-sm mb-4">Resumen de cursada transcripto del cuaderno · {sections.length} secciones</p>

      <div className="notes">
        {parsed.map((section, idx) => {
          const isOpen = open.has(idx);
          return (
            <section key={section.id} id={`note-${section.id}`} className={`note-section ${isOpen ? 'open' : ''}`}>
              <button
                type="button"
                className="note-toggle"
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
              >
                <span className="note-index">{idx + 1}</span>
                <span className="note-title">{section.title}</span>
                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {isOpen && (
                <div className="note-body animate-fade-in">
                  {section.blocks.map((block, i) => <Block key={i} block={block} />)}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default NotesPanel;
