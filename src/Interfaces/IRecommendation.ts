import IGender from "./IGenderInterface";

export default interface IRecommendation {
    genre_ids: IGender[];
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    genres_ids: IGender[];
    release_date: string
}