import IGender from "./IGenderInterface"

interface IMovieDetails {
    adult: string,
    genres: IGender[],
    id: number,
    overview: string,
    title: string,
    release_date: string,
    vote_average: number,
    poster_path: string
}


export default IMovieDetails