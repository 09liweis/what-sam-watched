export const getRandomMovies = (movieList: any[], count: number) => {
  const shuffled = [...movieList].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const createQuiz = (movies: any[]) => {
  const correctAnswer = movies[0];
  const answers = movies.map(movie => movie.title).sort(() => 0.5 - Math.random());
  
  return {
    summary: correctAnswer.summary,
    correctTitle: correctAnswer.title,
    answers
  };
};