import { defineStore } from 'pinia';

interface Movie {
  douban_id:string,
  douban_rating:string,
  poster:string,
  current_episode:number,
  episodes:number,
  imdb_id:string,
  imdb_rating:string,
  loading: boolean
}

interface MoviesResponse {
  movies:Movie[],
  err?: string,
  total: number,
  page: number
}

interface Stats {
  total:number,
  movie:number,
  tv:number,
  languages:string[],
  countries:string[],
  genres:string[]
}

interface StatsResponse {
  name:string,
  details:Stats
}

const API_HOST ='https://samliweisen.onrender.com/api/movies';
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
      const response:StatsResponse = await $fetch(`https://samliweisen.onrender.com/api/stats/movie`);
      this.stats = response.details;
    },
    async getUpdatedMovie(movie:Movie) {
      movie.loading = true;
      const response:Movie = await $fetch(`${API_HOST}/upsert`, {
        method: 'POST',
        body: movie,
      });
      movie.douban_rating = response.douban_rating;
      movie.imdb_rating = response.imdb_rating;
      movie.loading = false;
    },
    async fetchMovies() {
      const route = useRoute();
      const lang = route.query.lang?.toString() || '';
      const genre = route.query.genre?.toString() || '';
      const country = route.query.country?.toString() || '';
      this.curLang = lang;
      this.curGenre = genre;
      this.curCountry = country;
      this.isfetchingMovieList = true;
      const moviesResp:MoviesResponse = await $fetch(`${API_HOST}?limit=50&imgserver=img9&lang=${lang}&genre=${genre}&country=${country}`);
      this.setMovieList(moviesResp.movies);
      this.total = moviesResp.total;
      this.isfetchingMovieList = false;
    },
    async searchDoubanMovies(title:string) {
      const {movies,err}:MoviesResponse = await $fetch(
        `${API_HOST}/search?keyword=${title}`
      );
      return movies;
    },
    async upsertMovie(douban_id:string) {
      const body = { douban_id };
      await $fetch(`${API_HOST}/upsert`, {
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
      const response = await $fetch(`${API_HOST}/${v.douban_id}`, {
        method: 'PUT',
      });
      console.log(response);
      this.fetchMovies();
    }
  },
});
