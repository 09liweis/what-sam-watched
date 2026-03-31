import {
  API_ENDPOINT,
  API_SEARCH,
  API_STATS,
  API_UPSERT,
  API_MOVIE_ENDPOINT,
  API_QUIZ,
} from "~/constants/api";

// composables/useGlobalState.ts
export const useGlobalState = () => {
  const movies = useState<Movie[]>('movies', () => []);
  const isfetchingMovieList = useState<boolean>('isFetchingMovieList', ()=>true);

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

  const fetchMovieList = async (name='') => {
    isfetchingMovieList.value = true;
    try {
      const moviesResp: MoviesResponse = await $fetch(
        getMoviesAPIUrl(name)
      );
      if (moviesResp.err) {
        movies.value = [];
        return;
      }
      movies.value = moviesResp.movies;
    } catch (error) {
      console.error(error);
    } finally {
      isfetchingMovieList.value = false;
    }
  }

  return {
    movies,
    fetchMovieList,
    isfetchingMovieList
  }
}