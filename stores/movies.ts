import { defineStore } from 'pinia';

interface Movie {
  douban_id:string,
  douban_rating:string,
  poster:string,
  current_episode:number,
  episodes:number,
  imdb_rating:string
}

interface MoviesResponse {
  movies:Movie[]
}

const API_HOST ='https://samliweisen.onrender.com/api/movies';
const emptyMovieList:Movie[] = [];

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    movieList: emptyMovieList,
    currentMovie: {},
  }),
  actions: {
    async fetchMovies() {
      const moviesResp:MoviesResponse = await $fetch(`${API_HOST}?limit=50&imgserver=img9`);
      this.setMovieList(moviesResp.movies);
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
