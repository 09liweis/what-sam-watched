import {
  API_ENDPOINT,
  API_SEARCH,
  API_STATS,
  API_UPSERT,
  API_MOVIE_ENDPOINT,
} from "~/constants/api";
import type { Movie, MoviesResponse, StatsResponse } from "../types/movie";
interface QUERY_PARAMS {
  [key: string]: boolean | number | string;
}

const HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token") || ""}`
}

// composables/useGlobalState.ts
export const useGlobalState = () => {
  const stats = useState<StatsResponse>("stats", () => {});
  const getStats = async () => {
    const response: StatsResponse = await $fetch(API_STATS);
    stats.value = response.details;
  };

  const movies = useState<Movie[]>("movies", () => []);
  const total = useState<number>("total", () => 0);
  const curPage = useState<string>("curPage", () => "1");
  const pages = useState<number[]>("pages", () => []);
  const isfetchingMovieList = useState<boolean>(
    "isFetchingMovieList",
    () => true
  );
  const curCountry = useState<string>('curCountry',()=>"");
  const curLang = useState<string>('curLang',()=>"");
  const curGenre = useState<string>('curGenre',()=>"");

  const getMoviesAPIUrl = (name: string): string => {
    const {
      query: { page,country,genre,lang },
    } = useRoute();
    if (page) {
      curPage.value = page.toString() || "";
    }
    if (lang) {
      curLang.value = lang.toString() || "";
    }
    if (country) {
      curCountry.value = country.toString() || "";
    }
    if (genre) {
      curGenre.value = genre.toString() || "";
    }
    let result = `${API_ENDPOINT}${name}?imgserver=img9`;
    const queryParams: QUERY_PARAMS = {
      page: curPage.value,
      limit: 50,
      lang: curLang.value,
      genre: curGenre.value,
      country: curCountry.value,
    };
    for (const query in queryParams) {
      if (queryParams[query]) {
        result += `&${query}=${queryParams[query]}`;
      }
    }
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

  const upsertMovie = async (movie: Movie) => {
    await $fetch(API_UPSERT, {
      method: "POST",
      body: movie,
      headers: HEADERS
    });
  }

  const deleteMovie = async(movieId: string) => {
    try {
      await $fetch(`${API_MOVIE_ENDPOINT}${movieId}`, {
        method: "DELETE",
        headers: HEADERS
      });
      // Refresh the movie list after deletion
      fetchMovieList();
    } catch (error) {
      console.error("Failed to delete movie:", error);
    }
  }

  const updateEpisode = async(v: Movie) => {
    const response = await $fetch(`${API_MOVIE_ENDPOINT}${v.douban_id}`, {
      method: "PUT",
    });
    fetchMovieList();
  }

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
    upsertMovie,
    deleteMovie,
    updateEpisode,
    curCountry,
    curLang,
    curGenre
  };
};
