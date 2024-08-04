import React, { useEffect, useState } from 'react';
import IMovieDetails from '../Interfaces/IMovieInterface';
import { CardMovie } from '../components/WatchLater';

const WatchLater: React.FC = () => {
    const [movies, setMovies] = useState<IMovieDetails[]>([]);

    useEffect(() => {
        const storedMovies = JSON.parse(localStorage.getItem('watchLaterMovies') || '[]');
        setMovies(storedMovies);
    }, []);

    return (
        <div className="watch-later min-h-[1100px]">
            <h1 className="text-4xl text-gray-200 font-bold text-center py-4 pb-16">Lista para Assistir Mais Tarde</h1>
            <div className="movie-list">
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <CardMovie key={movie.id} movie={movie} />
                    ))
                ) : (
                    <p className="text-center col-span-full">Nenhum filme na lista para assistir mais tarde.</p>
                )}
            </div>
        </div>
    );
};

export default WatchLater;
