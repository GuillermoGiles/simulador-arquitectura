import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import Sidebar from './Sidebar';

const Layout = ({ children, progress, theme, onToggleTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Cerrar el menú móvil al navegar
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Bloquear scroll del fondo mientras el menú está abierto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const themeButton = (
    <button
      type="button"
      className="btn-ghost"
      onClick={onToggleTheme}
      aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );

  return (
    <div className="app-container">
      <header className="topbar">
        <button
          type="button"
          className="btn-ghost"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <span className="topbar-title">Arquitectura</span>
        {themeButton}
      </header>

      <div
        className={`sidebar-backdrop ${menuOpen ? 'visible' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      <Sidebar progress={progress} open={menuOpen} themeButton={themeButton} />

      <main className="main-content">
        <div className="content-inner">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
