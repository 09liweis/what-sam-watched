// composables/useGlobalState.ts
export const useGlobalState = () => {
  const movies = useState<Movie[]>('movies', () => [])

  const setMovies = (val: Movie[]) => movies.value = val

  return {
    movies,
    setMovies
  }
}