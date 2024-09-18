import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import useFavorites from '../../hooks/useFavorites';
import useWatchLater from '../../hooks/useWatchLater';
import ICharacter from '../../Interfaces/ICharacter';
import IMovieDetails from '../../Interfaces/IMovieInterface';
import api from '../../services/api';
import { StarRating } from '../StarRatings';
import Characters from './Characters';
import Genres from './Genres';
import MovieDescription from './MovieDescription';
import MovieImage from './MovieImage';
import ReleaseDate from './ReleaseDate';

interface MovieDetailsProps {
    movie: IMovieDetails;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie }) => {
    const [characters, setCharacters] = useState<ICharacter[]>([]);
    const { id } = useParams();
    const { isAddedToWatchLater, toggleWatchLater } = useWatchLater(movie);
    const { isFavorite, toggleFavorite } = useFavorites(movie);

    useEffect(() => {
        const getMovieDetails = async () => {
            try {
                const creditsResponse = await api.get(`/3/movie/${id}/credits`);
                setCharacters(creditsResponse.data.cast);
            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
        };
        getMovieDetails();
    }, [id]);

    const handleWatchLater = () => {
        toggleWatchLater();
        toast.success(
            isAddedToWatchLater
                ? 'Filme removido da lista para assistir mais tarde!'
                : 'Filme adicionado à lista para assistir mais tarde!'
        );
    };

    const handleFavorite = () => {
        toggleFavorite();
        toast.success(
            isFavorite
                ? 'Filme removido dos favoritos!'
                : 'Filme adicionado aos favoritos!'
        );
    };

    return (
        <div className="text-gray-200 pb-[10%] py-10 rounded-lg w-[90%] mx-auto flex flex-col">
            <h1 className="text-4xl text-center font-bold pb-8">{movie.title}</h1>
            <MovieImage posterPath={movie.poster_path} title={movie.title} />
            <MovieDescription overview={movie.overview} />
            <ReleaseDate releaseDate={movie.release_date} />
            <div className='text-lg'>
                Avaliação: <StarRating rating={movie.vote_average} />
            </div>
            <Genres genres={movie.genres} />
            <Characters characters={characters} />
            <div className='flex items-center justify-center gap-[4%] mt-8'>
                <button
                    className={`mt-4 px-4 py-2 ${isAddedToWatchLater ? 'bg-red-500' : 'bg-blue-500'} text-white rounded`}
                    onClick={handleWatchLater}
                >
                    {isAddedToWatchLater ? 'Remover da lista' : 'Adicionar à lista'}
                </button>
                <button
                    className={`mt-4 ml-4 px-4 py-2 ${isFavorite ? 'bg-red-500' : 'bg-green-500'} text-white rounded`}
                    onClick={handleFavorite}
                >
                    {isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                </button>
            </div>
        </div>
    );
};

export default MovieDetails;
