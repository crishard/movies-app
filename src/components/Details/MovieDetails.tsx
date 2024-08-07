import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
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
    const [isAdded, setIsAdded] = useState(false);
    const [characters, setCharacters] = useState<ICharacter[]>([]);
    const { id } = useParams();

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
        <div className=" text-gray-200 pb-[10%] py-10 rounded-lg w-[90%] mx-auto flex flex-col ">
            <h1 className="text-4xl text-center font-bold pb-8">{movie.title}</h1>
            <MovieImage posterPath={movie.poster_path} title={movie.title} />
            <MovieDescription overview={movie.overview} />
            <ReleaseDate releaseDate={movie.release_date} />

            <div className=' text-lg'>
                Avaliação: <StarRating rating={movie.vote_average} />
            </div>
            <Genres genres={movie.genres} />
            <Characters characters={characters} />
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
