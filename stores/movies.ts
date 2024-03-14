import { defineStore } from 'pinia';

interface MoviesResponse {
  movies:[]
}

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    movieList: [],
    currentMovie: {},
  }),
  actions: {
    async fetchMovies() {
      const API_HOST ='https://samliweisen.onrender.com/api/movies';
      const moviesResp:MoviesResponse = await $fetch(`${API_HOST}?limit=50&imgserver=img9`);
      this.setMovieList(moviesResp.movies);
    },
    setMovieList(movieList: []) {
      this.movieList = movieList;
    },
    setCurrentMovie(movie: {}) {
      this.currentMovie = movie;
    },
  },
});
