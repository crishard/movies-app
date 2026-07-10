import React from 'react';
import { BiCameraMovie } from 'react-icons/bi';
import { FaStar } from 'react-icons/fa';
import { tmdbImage } from '../../utils/tmdbImage';

interface IMovieCardData {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
}

interface MovieCardProps {
  movie: IMovieCardData;
  onClick: (movieId: number) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const posterUrl = tmdbImage(movie.poster_path, 'w342');
  const releaseYear = movie.release_date?.slice(0, 4);

  return (
    <button
      type="button"
      onClick={() => onClick(movie.id)}
      aria-label={`Ver detalhes de ${movie.title}`}
      className="group w-full text-left focus:outline-none"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-slate-800 shadow-lg ring-1 ring-slate-800 transition duration-300 group-hover:ring-2 group-hover:ring-indigo-500 group-focus-visible:ring-2 group-focus-visible:ring-indigo-400">
        {posterUrl ? (
          <img
            loading="lazy"
            src={posterUrl}
            alt=""
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-5xl text-slate-600">
            <BiCameraMovie aria-hidden />
          </div>
        )}
        <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-md bg-slate-950/80 px-2 py-1 text-xs font-bold text-amber-400 backdrop-blur">
          <FaStar className="text-[10px]" aria-hidden />
          {(movie.vote_average ?? 0).toFixed(1)}
        </span>
      </div>
      <div className="pt-3">
        <h3 className="line-clamp-1 text-sm font-semibold text-slate-100 transition-colors group-hover:text-indigo-400 sm:text-base">
          {movie.title}
        </h3>
        <p className="mt-0.5 text-xs text-slate-400 sm:text-sm">{releaseYear || 'Sem data'}</p>
      </div>
    </button>
  );
};

export default MovieCard;
