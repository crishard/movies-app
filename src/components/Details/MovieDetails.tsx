import IMovieDetails from '../../Interfaces/IMovieInterface';
import { StarRating } from '../StarRatings';
import Genres from './Genres';
import MovieDescription from './MovieDescription';
import MovieImage from './MovieImage';
import ReleaseDate from './ReleaseDate';

interface MovieDetailsProps {
    movie: IMovieDetails;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie }) => {
    return (
        <div className="movie-details text-gray-200 pb-10">
            <h1 className="text-4xl text-center font-bold pb-8">{movie.title}</h1>
            <MovieImage posterPath={movie.poster_path} title={movie.title} />
            <MovieDescription overview={movie.overview} />
            <ReleaseDate releaseDate={movie.release_date} />
            <div className='w-[70%] mx-auto text-lg'>
                Avaliação: <StarRating rating={movie.vote_average} />
            </div>
            <Genres genres={movie.genres} />
        </div>
    );
};

export default MovieDetails;
