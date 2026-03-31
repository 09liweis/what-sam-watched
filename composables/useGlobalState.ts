// composables/useGlobalState.ts
export const useGlobalState = () => {
  const movies = useState<Movie[]>('movies', () => [])

  const fetchMovieList = async () => {
    console.log('movieList');
  }

  return {
    movies,
    fetchMovieList
  }
}