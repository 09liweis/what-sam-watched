import { defineStore } from 'pinia';

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    movieList: [],
    currentMovie: {},
  }),
  actions: {
    setMovieList(movieList: []) {
      this.movieList = movieList;
    },
    setCurrentMovie(movie: {}) {
      this.currentMovie = movie;
    },
  },
});
