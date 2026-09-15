// Fisher-Yates: mezcla uniforme, devuelve un array nuevo.
export function shuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Mezcla las opciones de una pregunta y recalcula el índice de la respuesta correcta.
export function shuffleQuestionOptions(question) {
  const indexed = question.options.map((text, index) => ({ text, index }));
  const shuffled = shuffle(indexed);
  return {
    ...question,
    options: shuffled.map(o => o.text),
    answer: shuffled.findIndex(o => o.index === question.answer),
  };
}
