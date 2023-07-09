import { defineStore } from 'pinia';

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    movieList: [],
  }),
  actions: {
    setMovieList(movieList: []) {
      this.movieList = movieList;
    },
  },
});
