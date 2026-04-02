import { defineStore } from "pinia";
import type { Movie, MoviesResponse } from "../types/movie";
import { API_ENDPOINT, API_MOVIE_ENDPOINT } from "~/constants/api";

const emptyMovieList: Movie[] = [];
const emptyPages: number[] = [];
interface QUERY_PARAMS {
  [key: string]: boolean | number | string;
}

export const useMoviesStore = defineStore("movies", {
  state: () => ({
    movieList: emptyMovieList,
    limit: 50,
    page: "1",
    pages: emptyPages,
    isfetchingMovieList: false,
    currentMovie: {},
    stats: {},
    curLang: "",
    curGenre: "",
    curCountry: "",
    curVideo: {},
    showVideo: false,
  }),
  actions: {
    setQueryParams() {
      const { query } = useRoute();
      const lang = query.lang?.toString() || "";
      const genre = query.genre?.toString() || "";
      const country = query.country?.toString() || "";
      this.page = query.page?.toString() || "1";
      this.curLang = lang;
      this.curGenre = genre;
      this.curCountry = country;
    },
    getMoviesAPIUrl(name: string): string {
      let result = `${API_ENDPOINT}${name}?imgserver=img9`;
      const queryParams: QUERY_PARAMS = {
        page: this.page,
        limit: this.limit,
        lang: this.curLang,
        genre: this.curGenre,
        country: this.curCountry,
      };
      for (const query in queryParams) {
        if (queryParams[query]) {
          result += `&${query}=${queryParams[query]}`;
        }
      }
      return result;
    },
    async fetchMovies(name = "") {
      this.setQueryParams();
      this.isfetchingMovieList = true;
      try {
        const moviesResp: MoviesResponse = await $fetch(
          this.getMoviesAPIUrl(name)
        );
        if (moviesResp.err) {
          this.setMovieList([]);
          return;
        }
        this.setMovieList(moviesResp.movies);
        if (moviesResp.total) {
          this.pages = moviesResp.pages;
        }
      } catch (error) {
      } finally {
        this.isfetchingMovieList = false;
      }
    },
    setMovieList(movieList: Movie[]) {
      this.movieList = movieList;
    },
  },
});
