export interface Movie {
  douban_id:string,
  douban_rating:string,
  poster:string,
  video?:string,
  current_episode:number,
  episodes:number,
  imdb_id:string,
  imdb_rating:string,
  loading: boolean,
  is_done:boolean
}

export interface MoviesResponse {
  movies:Movie[],
  err?: string,
  total: number,
  page: number,
  pages:number[]
}

export interface Stats {
  total:number,
  movie:number,
  tv:number,
  languages:string[],
  countries:string[],
  genres:string[],
  years:string[]
}

export interface StatsResponse {
  name:string,
  details:Stats
}