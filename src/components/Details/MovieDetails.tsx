import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaBookmark, FaHeart, FaRegBookmark, FaRegHeart } from 'react-icons/fa';
import { FiCalendar, FiClock } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import useFavorites from '../../hooks/useFavorites';
import useWatchLater from '../../hooks/useWatchLater';
import ICharacter from '../../Interfaces/ICharacter';
import IMovieDetails from '../../Interfaces/IMovieInterface';
import api from '../../services/api';
import { tmdbImage } from '../../utils/tmdbImage';
import { StarRating } from '../StarRatings';
import Characters from './Characters';
import Genres from './Genres';
import MovieDescription from './MovieDescription';
import MovieImage from './MovieImage';
import ReleaseDate from './ReleaseDate';

interface MovieDetailsProps {
    movie: IMovieDetails;
}

const formatRuntime = (runtime: number) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return hours > 0 ? `${hours}h ${minutes}min` : `${minutes}min`;
};

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie }) => {
    const [characters, setCharacters] = useState<ICharacter[]>([]);
    const { id } = useParams();
    const { isAddedToWatchLater, toggleWatchLater } = useWatchLater(movie);
    const { isFavorite, toggleFavorite } = useFavorites(movie);

    useEffect(() => {
        let cancelled = false;

        const getMovieCredits = async () => {
            try {
                const creditsResponse = await api.get(`/3/movie/${id}/credits`);
                if (!cancelled) {
                    setCharacters(creditsResponse.data.cast);
                }
            } catch (error) {
                console.error("Error fetching movie credits:", error);
            }
        };
        getMovieCredits();

        return () => {
            cancelled = true;
        };
    }, [id]);

    const handleWatchLater = () => {
        toggleWatchLater();
        toast.success(
            isAddedToWatchLater
                ? 'Filme removido da sua lista!'
                : 'Filme adicionado à sua lista!'
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

    const backdropUrl = tmdbImage(movie.backdrop_path, 'w1280');

    return (
        <>
            <section className="relative overflow-hidden">
                {backdropUrl && (
                    <div className="absolute inset-0" aria-hidden>
                        <img src={backdropUrl} alt="" className="h-full w-full object-cover opacity-25" />
                        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/85 to-slate-950" />
                    </div>
                )}

                <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-4 py-10 sm:px-8 sm:py-14 md:flex-row md:items-start md:gap-12">
                    <MovieImage posterPath={movie.poster_path} title={movie.title} />

                    <div className="w-full text-center md:text-left">
                        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{movie.title}</h1>
                        {movie.tagline && (
                            <p className="mt-2 italic text-slate-400">“{movie.tagline}”</p>
                        )}

                        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-slate-300 md:justify-start">
                            <span className="inline-flex items-center gap-1.5">
                                <FiCalendar aria-hidden className="text-slate-400" />
                                <ReleaseDate releaseDate={movie.release_date} />
                            </span>
                            {!!movie.runtime && (
                                <span className="inline-flex items-center gap-1.5">
                                    <FiClock aria-hidden className="text-slate-400" />
                                    {formatRuntime(movie.runtime)}
                                </span>
                            )}
                            <span className="inline-flex items-center gap-2">
                                <StarRating rating={movie.vote_average} showValue />
                                {!!movie.vote_count && (
                                    <span className="text-slate-400">
                                        ({movie.vote_count.toLocaleString('pt-BR')} avaliações)
                                    </span>
                                )}
                            </span>
                        </div>

                        <div className="mt-5 flex justify-center md:justify-start">
                            <Genres genres={movie.genres} />
                        </div>

                        <h2 className="mt-8 text-lg font-bold">Sinopse</h2>
                        <MovieDescription overview={movie.overview} />

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                            <button
                                type="button"
                                onClick={handleWatchLater}
                                className={`inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg px-5 py-3 font-semibold transition-colors ${
                                    isAddedToWatchLater
                                        ? 'border border-slate-600 text-slate-200 hover:border-red-500 hover:text-red-400'
                                        : 'bg-indigo-600 text-white hover:bg-indigo-500'
                                }`}
                            >
                                {isAddedToWatchLater ? <FaBookmark aria-hidden /> : <FaRegBookmark aria-hidden />}
                                {isAddedToWatchLater ? 'Remover da lista' : 'Adicionar à lista'}
                            </button>
                            <button
                                type="button"
                                onClick={handleFavorite}
                                className={`inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg px-5 py-3 font-semibold transition-colors ${
                                    isFavorite
                                        ? 'border border-slate-600 text-slate-200 hover:border-red-500 hover:text-red-400'
                                        : 'bg-rose-600 text-white hover:bg-rose-500'
                                }`}
                            >
                                {isFavorite ? <FaHeart aria-hidden /> : <FaRegHeart aria-hidden />}
                                {isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <Characters characters={characters} />
        </>
    );
};

export default MovieDetails;
