import React, { useState, useEffect } from 'react';
import { Layers, ChevronLeft, ChevronRight } from 'lucide-react';

const Flashcards = ({ flashcards, targetTerm }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (targetTerm && flashcards && flashcards.length > 0) {
      const index = flashcards.findIndex(card => card.term === targetTerm);
      if (index !== -1) {
        setCurrentIndex(index);
        setIsFlipped(false);
      }
    }
  }, [targetTerm, flashcards]);

  if (!flashcards || flashcards.length === 0) return null;

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    }, 150); // wait for flip animation to reset before changing text
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    }, 150);
  };

  const currentCard = flashcards[currentIndex];

  return (
    <div className="glass-card p-6 mb-8">
      <h3 className="flex items-center gap-2 mb-4" style={{ fontSize: '1.5rem' }}>
        <Layers className="text-accent" /> Flashcards (Conceptos Clave)
      </h3>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
        <button onClick={prevCard} className="btn-secondary" style={{ padding: '0.5rem', borderRadius: '50%' }}>
          <ChevronLeft />
        </button>
        
        <div 
          className={`flashcard-container ${isFlipped ? 'flipped' : ''}`} 
          onClick={() => setIsFlipped(!isFlipped)}
          style={{ width: '100%', maxWidth: '400px', height: '200px', perspective: '1000px', cursor: 'pointer' }}
        >
          <div className="flashcard-inner" style={{ 
            position: 'relative', width: '100%', height: '100%', textAlign: 'center', transition: 'transform 0.6s', transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}>
            {/* Front */}
            <div className="flashcard-front" style={{ 
              position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', 
              background: 'var(--surface-color)', border: '2px solid var(--accent-color)', borderRadius: '12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <h4 style={{ fontSize: '1.5rem', color: 'var(--accent-color)' }}>{currentCard.term}</h4>
              <p style={{ position: 'absolute', bottom: '10px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Haz clic para girar</p>
            </div>
            {/* Back */}
            <div className="flashcard-back" style={{ 
              position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', 
              background: 'var(--accent-color)', color: '#ffffff', borderRadius: '12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem',
              transform: 'rotateY(180deg)', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <p style={{ fontSize: '1rem', fontWeight: '500', color: '#ffffff' }}>{currentCard.definition}</p>
            </div>
          </div>
        </div>

        <button onClick={nextCard} className="btn-secondary" style={{ padding: '0.5rem', borderRadius: '50%' }}>
          <ChevronRight />
        </button>
      </div>
      
      <p style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--text-secondary)' }}>
        Tarjeta {currentIndex + 1} de {flashcards.length}
      </p>
    </div>
  );
};

export default Flashcards;
