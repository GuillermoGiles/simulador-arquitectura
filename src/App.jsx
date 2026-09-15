import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ModuleView from './pages/ModuleView';
import PracticeView from './pages/PracticeView';
import { useLocalStorage, STORAGE_KEYS } from './utils/useLocalStorage';

// Calcula la racha de días consecutivos y la persiste. Se ejecuta una vez por carga.
function updateStreak() {
  const today = new Date().toDateString();
  const lastLogin = localStorage.getItem(STORAGE_KEYS.lastLogin);
  let streak = parseInt(localStorage.getItem(STORAGE_KEYS.streak), 10) || 0;

  if (lastLogin !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    streak = lastLogin === yesterday.toDateString() ? streak + 1 : 1;
    localStorage.setItem(STORAGE_KEYS.streak, String(streak));
    localStorage.setItem(STORAGE_KEYS.lastLogin, today);
  }
  return streak;
}

function getInitialTheme() {
  const saved = localStorage.getItem(STORAGE_KEYS.theme);
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function App() {
  const [progress, setProgress] = useLocalStorage(STORAGE_KEYS.progress, []);
  const [streak, setStreak] = useState(0);
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    setStreak(updateStreak());
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEYS.theme, theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

  return (
    <Router>
      <Layout progress={progress} theme={theme} onToggleTheme={toggleTheme}>
        <Routes>
          <Route path="/" element={<Dashboard progress={progress} streak={streak} />} />
          <Route path="/module/:id" element={<ModuleView progress={progress} setProgress={setProgress} />} />
          <Route path="/practice" element={<PracticeView />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
