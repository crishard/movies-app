import { format, parseISO } from 'date-fns';
import React from 'react';
import { Link } from 'react-router-dom';
import IMovieDetails from '../../Interfaces/IMovieInterface';
import StarRating from '../StarRatings/StarRatings';

interface CardMovieProps {
    movie: IMovieDetails;
    onRemove: () => void;
}

const CardMovie: React.FC<CardMovieProps> = ({ movie, onRemove }) => {
    const formattedDate = format(parseISO(movie.release_date), 'dd/MM/yyyy');
    return (
        <div className=" p-4 border border-gray-200 rounded shadow sm:flex w-full py-4 mb-6">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className='sm:h-[320px]' />

            <div className='text-gray-200 px-10'>
                <Link to={`/movies/${movie.id}`} key={movie.id} className='hover:scale-105 duration-500 cursor-pointer'>
                    <h2 className="text-2xl font-bold mt-2 sm:pb-8 pb-2">{movie.title}</h2>
                    <div className='text-xl font-medium'>
                        <p className='sm:pb-5 pb-2'>Data de lançamento: {formattedDate}</p>
                        <p className='line-clamp-2'>{movie.overview}</p>

                    </div>
                </Link>
                <div className='pt-5 mx-auto text-xl font-medium'>
                    Avaliação: <StarRating rating={movie.vote_average} />
                </div>

                <button
                    onClick={onRemove}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                >
                    Remover
                </button>
            </div>
        </div>
    );
}

export default CardMovie;
