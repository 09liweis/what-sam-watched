import { defineStore } from 'pinia';
import type { Movie, MoviesResponse, StatsResponse } from '../types/movie';
import { API_ENDPOINT, API_SEARCH, API_STATS, API_UPSERT } from '~/constants/api';

const emptyMovieList:Movie[] = [];

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    movieList: emptyMovieList,
    total: 0,
    isfetchingMovieList: false,
    currentMovie: {},
    stats:{},
    curLang:'',
    curGenre:'',
    curCountry:''
  }),
  actions: {
    async getStats() {
      const response:StatsResponse = await $fetch(API_STATS);
      this.stats = response.details;
    },
    async getUpdatedMovie(movie:Movie) {
      movie.loading = true;
      const response:Movie = await $fetch(API_UPSERT, {
        method: 'POST',
        body: movie,
      });
      movie.douban_rating = response.douban_rating;
      movie.imdb_rating = response.imdb_rating;
      movie.loading = false;
    },
    async fetchMovies(name='') {
      const {query} = useRoute();
      const lang = query.lang?.toString() || '';
      const genre = query.genre?.toString() || '';
      const country = query.country?.toString() || '';
      this.curLang = lang;
      this.curGenre = genre;
      this.curCountry = country;
      this.isfetchingMovieList = true;
      const moviesResp:MoviesResponse = await $fetch(`${API_ENDPOINT}${name}?limit=50&imgserver=img9&lang=${lang}&genre=${genre}&country=${country}`);
      this.setMovieList(moviesResp.movies);
      this.total = moviesResp.total;
      this.isfetchingMovieList = false;
    },
    async searchDoubanMovies(title:string) {
      const {movies,err}:MoviesResponse = await $fetch(
        `${API_SEARCH}${title}`
      );
      return movies;
    },
    async upsertMovie(douban_id:string) {
      const body = { douban_id };
      await $fetch(API_UPSERT, {
        method: 'POST',
        body,
      });
    },
    setMovieList(movieList: Movie[]) {
      this.movieList = movieList;
    },
    setCurrentMovie(movie: {}) {
      this.currentMovie = movie;
    },
    async updateEpisode(v:Movie) {
      const response = await $fetch(`${API_ENDPOINT}/${v.douban_id}`, {
        method: 'PUT',
      });
      console.log(response);
      this.fetchMovies();
    }
  },
});
