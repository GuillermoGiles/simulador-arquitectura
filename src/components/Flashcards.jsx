import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Layers, ChevronLeft, ChevronRight, ThumbsUp, ThumbsDown, Shuffle, RotateCcw, AlertTriangle } from 'lucide-react';
import { useLocalStorage, STORAGE_KEYS } from '../utils/useLocalStorage';
import { shuffle } from '../utils/shuffle';

const Flashcards = ({ moduleId, flashcards, targetTerm }) => {
  // { [moduleId]: [term, term, ...] } — términos marcados como "no la sabía"
  const [hardCards, setHardCards] = useLocalStorage(STORAGE_KEYS.hardCards, {});
  const hardTerms = useMemo(() => hardCards[moduleId] ?? [], [hardCards, moduleId]);

  const [onlyHard, setOnlyHard] = useState(false);
  const [order, setOrder] = useState(() => flashcards.map((_, i) => i));
  const [position, setPosition] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Baraja el mazo actual (todas o sólo las difíciles)
  const deck = useMemo(() => {
    const base = onlyHard
      ? order.filter(i => hardTerms.includes(flashcards[i].term))
      : order;
    return base;
  }, [order, onlyHard, hardTerms, flashcards]);

  // Si el mazo cambia (p. ej. la última difícil se marcó como sabida) mantener posición válida
  useEffect(() => {
    if (position >= deck.length) setPosition(Math.max(0, deck.length - 1));
  }, [deck.length, position]);

  // Reiniciar al cambiar de módulo
  useEffect(() => {
    setOrder(flashcards.map((_, i) => i));
    setPosition(0);
    setIsFlipped(false);
    setOnlyHard(false);
  }, [flashcards]);

  // Saltar al término buscado desde la barra lateral
  useEffect(() => {
    if (!targetTerm) return;
    const index = flashcards.findIndex(card => card.term === targetTerm);
    if (index === -1) return;
    setOnlyHard(false);
    setOrder(flashcards.map((_, i) => i));
    setPosition(index);
    setIsFlipped(false);
  }, [targetTerm, flashcards]);

  const goTo = useCallback((next) => {
    if (deck.length === 0) return;
    setIsFlipped(false);
    setPosition(((next % deck.length) + deck.length) % deck.length);
  }, [deck.length]);

  const nextCard = useCallback(() => goTo(position + 1), [goTo, position]);
  const prevCard = useCallback(() => goTo(position - 1), [goTo, position]);

  const currentCard = deck.length > 0 ? flashcards[deck[position]] : null;
  const isHard = currentCard ? hardTerms.includes(currentCard.term) : false;

  const setHard = useCallback((term, hard) => {
    setHardCards(prev => {
      const current = prev[moduleId] ?? [];
      const updated = hard
        ? (current.includes(term) ? current : [...current, term])
        : current.filter(t => t !== term);
      return { ...prev, [moduleId]: updated };
    });
  }, [moduleId, setHardCards]);

  const markKnown = useCallback(() => {
    if (!currentCard) return;
    setHard(currentCard.term, false);
    // En modo difíciles la tarjeta sale del mazo y la siguiente ocupa su lugar:
    // no hay que avanzar la posición (el efecto de arriba la acota si era la última).
    if (onlyHard) setIsFlipped(false);
    else nextCard();
  }, [currentCard, setHard, nextCard, onlyHard]);

  const markUnknown = useCallback(() => {
    if (!currentCard) return;
    setHard(currentCard.term, true);
    nextCard();
  }, [currentCard, setHard, nextCard]);

  const shuffleDeck = () => {
    setOrder(shuffle(flashcards.map((_, i) => i)));
    setPosition(0);
    setIsFlipped(false);
  };

  const resetHard = () => {
    setHardCards(prev => ({ ...prev, [moduleId]: [] }));
    setOnlyHard(false);
  };

  // Atajos: ← → navegar, espacio/enter girar, 1 = no la sabía, 2 = la sabía
  useEffect(() => {
    const onKey = (e) => {
      const tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      switch (e.key) {
        case 'ArrowRight': e.preventDefault(); nextCard(); break;
        case 'ArrowLeft': e.preventDefault(); prevCard(); break;
        case ' ':
        case 'Enter': e.preventDefault(); setIsFlipped(f => !f); break;
        case '1': markUnknown(); break;
        case '2': markKnown(); break;
        default:
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [nextCard, prevCard, markKnown, markUnknown]);

  if (!flashcards || flashcards.length === 0) return null;

  return (
    <div className="glass-card p-6 mb-8">
      <div className="flashcard-toolbar">
        <h3 className="card-title" style={{ margin: 0 }}>
          <Layers className="text-accent" /> Flashcards (Conceptos Clave)
        </h3>
        <div className="flex gap-2 flex-wrap">
          <button
            type="button"
            className={`btn-secondary btn-sm ${onlyHard ? 'btn-danger' : ''}`}
            onClick={() => { setOnlyHard(v => !v); setPosition(0); setIsFlipped(false); }}
            disabled={hardTerms.length === 0}
            title={hardTerms.length === 0 ? 'Marcá tarjetas como "No la sabía" para usar este modo' : ''}
          >
            <AlertTriangle size={16} /> Repasar difíciles ({hardTerms.length})
          </button>
          <button type="button" className="btn-secondary btn-sm" onClick={shuffleDeck} title="Mezclar el mazo">
            <Shuffle size={16} /> Mezclar
          </button>
          {hardTerms.length > 0 && (
            <button type="button" className="btn-ghost btn-sm" onClick={resetHard} title="Limpiar la lista de difíciles">
              <RotateCcw size={16} />
            </button>
          )}
        </div>
      </div>

      {currentCard ? (
        <>
          <div className="flashcard-stage">
            <button type="button" onClick={prevCard} className="btn-secondary btn-icon" aria-label="Tarjeta anterior">
              <ChevronLeft />
            </button>

            <div
              className={`flashcard-container ${isFlipped ? 'flipped' : ''}`}
              onClick={() => setIsFlipped(f => !f)}
              role="button"
              tabIndex={0}
              aria-label={isFlipped ? 'Ver término' : 'Ver definición'}
            >
              <div className="flashcard-inner">
                <div className={`flashcard-face flashcard-front ${isHard ? 'hard' : ''}`}>
                  <h4>{currentCard.term}</h4>
                  <p className="hint">Haz clic o presioná espacio para girar</p>
                </div>
                <div className="flashcard-face flashcard-back">
                  <p>{currentCard.definition}</p>
                </div>
              </div>
            </div>

            <button type="button" onClick={nextCard} className="btn-secondary btn-icon" aria-label="Tarjeta siguiente">
              <ChevronRight />
            </button>
          </div>

          <div className="flashcard-actions">
            <button type="button" className="btn-secondary btn-sm btn-danger" onClick={markUnknown}>
              <ThumbsDown size={16} /> No la sabía
            </button>
            <button type="button" className="btn-secondary btn-sm btn-success" onClick={markKnown}>
              <ThumbsUp size={16} /> La sabía
            </button>
          </div>

          <p className="flashcard-meta">
            Tarjeta {position + 1} de {deck.length}
            {onlyHard && ' (modo difíciles)'}
            {isHard && !onlyHard && <span className="chip" style={{ marginLeft: '0.5rem' }}>Difícil</span>}
          </p>
          <p className="flashcard-keys">
            <kbd>←</kbd> <kbd>→</kbd> navegar · <kbd>Espacio</kbd> girar · <kbd>1</kbd> no la sabía · <kbd>2</kbd> la sabía
          </p>
        </>
      ) : (
        <div className="text-center p-6">
          <p className="mb-4">¡No quedan tarjetas difíciles en este módulo!</p>
          <button type="button" className="btn-primary" onClick={() => setOnlyHard(false)}>Ver todas las tarjetas</button>
        </div>
      )}
    </div>
  );
};

export default Flashcards;
