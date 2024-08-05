import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import IMovieDetails from '../Interfaces/IMovieInterface';
import CardMovie from '../components/WatchLater/CardMovie';

const WatchLater: React.FC = () => {
    const [movies, setMovies] = useState<IMovieDetails[]>([]);

    useEffect(() => {
        const storedMovies = JSON.parse(localStorage.getItem('watchLaterMovies') || '[]');
        setMovies(storedMovies);
    }, []);

    const handleRemoveFromWatchLater = (movieId: number) => {
        const updatedMovies = movies.filter(movie => movie.id !== movieId);
        setMovies(updatedMovies);
        localStorage.setItem('watchLaterMovies', JSON.stringify(updatedMovies));
    };

    return (
        <div className="watch-later min-h-[1100px]">
            <h1 className="text-4xl text-gray-200 font-bold text-center py-4 pb-16">Lista para Assistir Mais Tarde</h1>
            <div className="movie-list">
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <CardMovie
                            key={movie.id}
                            movie={movie}
                            onRemove={() => {
                                handleRemoveFromWatchLater(movie.id);
                                toast.success('Filme removido da lista para assistir mais tarde!');
                            }}
                        />
                    ))
                ) : (
                    <p className="text-center col-span-full">Nenhum filme na lista para assistir mais tarde.</p>
                )}
            </div>
        </div>
    );
};

export default WatchLater;
