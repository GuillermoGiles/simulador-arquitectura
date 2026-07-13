import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ModuleView from './pages/ModuleView';
import PracticeView from './pages/PracticeView';

function App() {
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('arqui_progress');
    return saved ? JSON.parse(saved) : [];
  });

  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const today = new Date().toDateString();
    const lastLogin = localStorage.getItem('arqui_last_login');
    let currentStreak = parseInt(localStorage.getItem('arqui_streak')) || 0;

    if (lastLogin !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (lastLogin === yesterday.toDateString()) {
        currentStreak += 1;
      } else if (lastLogin !== today) {
        currentStreak = 1;
      }
      
      localStorage.setItem('arqui_streak', currentStreak.toString());
      localStorage.setItem('arqui_last_login', today);
    }
    setStreak(currentStreak);
  }, []);

  return (
    <Router>
      <Layout progress={progress}>
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
