import React from 'react';
import IMovieDetails from "../../Interfaces/IMovieInterface";
import { StarRating } from '../StarRatings';

interface MovieCardProps {
  movie: IMovieDetails;
  onClick: (movieId: number) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  return (
    <div
      key={movie.id}
      className="text-gray-200 shadow-sm p-2 text-center rounded hover:scale-105 duration-300"
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
  );
};

export default MovieCard;
