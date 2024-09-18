import React from 'react';
import IMovieDetails from "../../Interfaces/IMovieInterface";
import { StarRating } from '../StarRatings';

interface MovieCardProps {
  movie: IMovieDetails;
  onClick: (movieId: number) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button onClick={handleClick}>
      <div
        className="shadow-sm p-2 text-center rounded-full hover:scale-105 duration-300"
        onClick={() => onClick(movie.id)}
      >
        <img
          className="w-full rounded"
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={movie.title}
        />
        <li className="text-base font-medium line-clamp-3 pt-2">{movie.title}</li>
        <StarRating rating={movie.vote_average} />
      </div>
    </button>

  );
};

export default MovieCard;
