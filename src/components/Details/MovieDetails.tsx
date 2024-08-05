import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
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
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        const watchLaterMovies = JSON.parse(localStorage.getItem('watchLaterMovies') || '[]');
        const isMovieInList = watchLaterMovies.some((m: IMovieDetails) => m.id === movie.id);
        setIsAdded(isMovieInList);
    }, [movie.id]);

    const handleToggleWatchLater = () => {
        const watchLaterMovies = JSON.parse(localStorage.getItem('watchLaterMovies') || '[]');
        if (isAdded) {
            const updatedMovies = watchLaterMovies.filter((m: IMovieDetails) => m.id !== movie.id);
            localStorage.setItem('watchLaterMovies', JSON.stringify(updatedMovies));
            setIsAdded(false);
            toast.success('Filme removido da lista para assistir mais tarde!');
        } else {
            watchLaterMovies.push(movie);
            localStorage.setItem('watchLaterMovies', JSON.stringify(watchLaterMovies));
            setIsAdded(true);
            toast.success('Filme adicionado à lista para assistir mais tarde!');
        }
    };

    return (
        <div className="movie-details text-gray-200 pb-[10%] border py-10 rounded-lg">
            <h1 className="text-4xl text-center font-bold pb-8">{movie.title}</h1>
            <MovieImage posterPath={movie.poster_path} title={movie.title} />
            <MovieDescription overview={movie.overview} />
            <ReleaseDate releaseDate={movie.release_date} />

            <div className='w-[70%] mx-auto text-lg'>
                Avaliação: <StarRating rating={movie.vote_average} />
            </div>
            <Genres genres={movie.genres} />
            <div className='flex items-center justify-center mt-8'>
                <button
                    className={`mt-4 px-4 py-2 ${isAdded ? 'bg-red-500' : 'bg-blue-500'} text-white rounded`}
                    onClick={handleToggleWatchLater}
                >
                    {isAdded ? 'Remover da lista' : 'Adicionar à lista'}
                </button>
            </div>
        </div>
    );
};

export default MovieDetails;
