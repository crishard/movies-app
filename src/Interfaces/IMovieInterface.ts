import IGender from "./IGenderInterface"

interface IMovieDetails {
    adult: boolean,
    genres: IGender[],
    id: number,
    overview: string,
    title: string,
    release_date: string,
    vote_average: number,
    vote_count?: number,
    poster_path: string,
    backdrop_path?: string,
    runtime?: number,
    tagline?: string
}

export default IMovieDetails
