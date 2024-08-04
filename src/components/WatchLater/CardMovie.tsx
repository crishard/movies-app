import { format, parseISO } from 'date-fns';
import React from 'react';
import { Link } from 'react-router-dom';
import IMovieDetails from '../../Interfaces/IMovieInterface';
import StarRating from '../StarRatings/StarRatings';

interface CardMovieProps {
    movie: IMovieDetails;
}

const CardMovie: React.FC<CardMovieProps> = ({ movie }) => {
    const formattedDate = format(parseISO(movie.release_date), 'dd/MM/yyyy');
    return (
        <Link to={`/movies/${movie.id}`} key={movie.id} className="movie-card p-4 border  border-gray-200 rounded shadow block sm:flex w-full sm:h-[320px] py-4 mb-6 hover:scale-105 duration-500 cursor-pointer">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <div className='text-gray-200 px-10'>
                <h2 className="text-2xl font-bold mt-2 sm:pb-8 pb-2">{movie.title}</h2>
                <div className='text-xl font-medium'>
                <p className='sm:pb-5 pb-2'>Data de lançamento: {formattedDate}</p>
                <p className='md:line-clamp-4 sm:line-clamp-3 line-clamp-2'>{movie.overview}</p>
                <div className='pt-5 mx-auto text-lg'>
                Avaliação: <StarRating rating={movie.vote_average} />
            </div>
                </div>
                
            </div>

        </Link>
    );
}

export default CardMovie;
