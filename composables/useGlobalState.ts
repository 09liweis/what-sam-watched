import {
  API_ENDPOINT,
  API_SEARCH,
  API_STATS,
  API_UPSERT,
  API_MOVIE_ENDPOINT,
  API_QUIZ,
} from "~/constants/api";
import type { Movie, MoviesResponse, StatsResponse } from "../types/movie";

// composables/useGlobalState.ts
export const useGlobalState = () => {
  const stats = useState<StatsResponse>("stats", () => {});
  const getStats = async () => {
    const response: StatsResponse = await $fetch(API_STATS);
    stats.value = response.details;
  };

  const movies = useState<Movie[]>("movies", () => []);
  const total = useState<number>("total", () => 0);
  const curPage = useState<number>("curPage", () => 1);
  const pages = useState<number[]>("pages", () => []);
  const isfetchingMovieList = useState<boolean>(
    "isFetchingMovieList",
    () => true
  );

  const getMoviesAPIUrl = (name: string): string => {
    let result = `${API_ENDPOINT}${name}?imgserver=img9`;
    // const queryParams: QUERY_PARAMS = {
    //   page: this.page,
    //   limit: this.limit,
    //   lang: this.curLang,
    //   genre: this.curGenre,
    //   country: this.curCountry,
    // };
    // for (const query in queryParams) {
    //   if (queryParams[query]) {
    //     result += `&${query}=${queryParams[query]}`;
    //   }
    // }
    return result;
  };

  const fetchMovieList = async (name = "") => {
    isfetchingMovieList.value = true;
    try {
      const moviesResp: MoviesResponse = await $fetch(getMoviesAPIUrl(name));
      if (moviesResp.err) {
        movies.value = [];
        return;
      }
      movies.value = moviesResp.movies;
      if (moviesResp.total) {
        total.value = moviesResp.total;
        pages.value = moviesResp.pages;
      }
    } catch (error) {
      console.error(error);
    } finally {
      isfetchingMovieList.value = false;
    }
  };

  const searchDoubanMovies = async (title: string) => {
    const { movies, err }: MoviesResponse = await $fetch(
      `${API_SEARCH}${title}`
    );
    if (err) return [];
    return movies;
  };

  return {
    getStats,
    stats,
    movies,
    total,
    pages,
    curPage,
    fetchMovieList,
    isfetchingMovieList,
    searchDoubanMovies,
  };
};
