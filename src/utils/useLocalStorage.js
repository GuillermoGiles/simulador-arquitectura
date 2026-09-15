import { useState, useEffect } from 'react';

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

// Estado de React sincronizado con localStorage (serializado como JSON).
export function useLocalStorage(key, fallback) {
  const [value, setValue] = useState(() => readStorage(key, fallback));

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Sin almacenamiento disponible (modo privado, cuota llena): seguimos en memoria.
    }
  }, [key, value]);

  return [value, setValue];
}

export const STORAGE_KEYS = {
  progress: 'arqui_progress',
  streak: 'arqui_streak',
  lastLogin: 'arqui_last_login',
  hardCards: 'arqui_hard_cards',
  examHistory: 'arqui_exam_history',
  theme: 'arqui_theme',
};
