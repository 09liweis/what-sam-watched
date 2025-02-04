import { defineStore } from 'pinia';
import type { Movie, MoviesResponse, StatsResponse } from '../types/movie';
import { API_ENDPOINT, API_SEARCH, API_STATS, API_UPSERT, API_MOVIE_ENDPOINT, API_QUIZ } from '~/constants/api';

const emptyMovieList:Movie[] = [];
const emptyPages:number[] = [];
interface QUERY_PARAMS {
  [key: string]: boolean | number | string;
}

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    movieList: emptyMovieList,
    total: 0,
    limit: 50,
    page: '1',
    pages:emptyPages,
    isfetchingMovieList: false,
    currentMovie: {},
    stats:{},
    curLang:'',
    curGenre:'',
    curCountry:'',
    curVideo:{},
    showVideo:false
  }),
  actions: {
    async getMovieQuiz() {
      return await $fetch(API_QUIZ);
    },
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
    setQueryParams() {
      const {query} = useRoute();
      const lang = query.lang?.toString() || '';
      const genre = query.genre?.toString() || '';
      const country = query.country?.toString() || '';
      this.page = query.page?.toString() || '1';
      this.curLang = lang;
      this.curGenre = genre;
      this.curCountry = country;
    },
    getMoviesAPIUrl(name:string):string {
      let result = `${API_ENDPOINT}${name}?imgserver=img9`;
      const queryParams:QUERY_PARAMS = {
        page:this.page,
        limit:this.limit,
        lang:this.curLang,
        genre:this.curGenre,
        country:this.curCountry
      };
      for (const query in queryParams) {
        if (queryParams[query]) {
          result += `&${query}=${queryParams[query]}`;
        }
      }
      return result;
    },
    async fetchMovies(name='') {
      this.setQueryParams();
      this.isfetchingMovieList = true;
      const moviesResp:MoviesResponse = await $fetch(this.getMoviesAPIUrl(name));
      this.setMovieList(moviesResp.movies);
      if (moviesResp.total) {
        this.total = moviesResp.total;
        this.pages = moviesResp.pages;
      }
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
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth-token') || ''}`
        },
      });
    },
    setMovieList(movieList: Movie[]) {
      this.movieList = movieList;
    },
    setCurrentMovie(movie: {}) {
      this.currentMovie = movie;
    },
    async updateEpisode(v:Movie) {
      const response = await $fetch(`${API_MOVIE_ENDPOINT}${v.douban_id}`, {
        method: 'PUT',
      });
      this.fetchMovies();
    },
    async setCurVideo(video:any) {
      this.showVideo = true;
      this.curVideo = video;
      const response:any = await $fetch(`${API_MOVIE_ENDPOINT}video/${video.video_id}`);
      this.curVideo = response;
    },
    hideVideo() {
      this.showVideo = false;
    }
  },
});