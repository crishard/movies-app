import { format, parseISO } from 'date-fns';
import React from 'react';
import { BiCameraMovie } from 'react-icons/bi';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FiCalendar } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import IMovieDetails from '../../Interfaces/IMovieInterface';
import { tmdbImage } from '../../utils/tmdbImage';
import StarRating from '../StarRatings/StarRatings';

interface CardMovieProps {
    movie: IMovieDetails;
    onRemove: () => void;
}

const CardMovie: React.FC<CardMovieProps> = ({ movie, onRemove }) => {
    const posterUrl = tmdbImage(movie.poster_path, 'w342');
    const formattedDate = movie.release_date
        ? format(parseISO(movie.release_date), 'dd/MM/yyyy')
        : 'Data desconhecida';

    return (
        <article className="flex flex-col gap-5 rounded-xl border border-slate-800 bg-slate-900/50 p-4 transition-colors hover:border-slate-600 sm:flex-row sm:p-5">
            <Link
                to={`/movies/${movie.id}`}
                className="mx-auto w-36 shrink-0 sm:mx-0 sm:w-40"
                aria-label={`Ver detalhes de ${movie.title}`}
            >
                {posterUrl ? (
                    <img
                        loading="lazy"
                        src={posterUrl}
                        alt=""
                        className="aspect-[2/3] w-full rounded-lg object-cover ring-1 ring-slate-800"
                    />
                ) : (
                    <div className="flex aspect-[2/3] w-full items-center justify-center rounded-lg bg-slate-800 text-4xl text-slate-600">
                        <BiCameraMovie aria-hidden />
                    </div>
                )}
            </Link>

            <div className="flex flex-1 flex-col text-center sm:text-left">
                <Link
                    to={`/movies/${movie.id}`}
                    className="text-xl font-bold transition-colors hover:text-indigo-400 sm:text-2xl"
                >
                    {movie.title}
                </Link>

                <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-slate-400 sm:justify-start">
                    <span className="inline-flex items-center gap-1.5">
                        <FiCalendar aria-hidden />
                        {formattedDate}
                    </span>
                    <StarRating rating={movie.vote_average} showValue />
                </div>

                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-400">
                    {movie.overview || 'Sinopse não disponível.'}
                </p>

                <div className="mt-auto pt-4">
                    <button
                        type="button"
                        onClick={onRemove}
                        className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-red-500 hover:text-red-400 sm:w-auto"
                    >
                        <FaRegTrashAlt aria-hidden />
                        Remover da lista
                    </button>
                </div>
            </div>
        </article>
    );
}

export default CardMovie;
