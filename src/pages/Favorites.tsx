import React, { useEffect, useState } from 'react';
import IMovieDetails from '../Interfaces/IMovieInterface';
import MovieCard from '../components/List/MovieCard';

const Favorites: React.FC = () => {
    const [favoriteMovies, setFavoriteMovies] = useState<IMovieDetails[]>([]);

    useEffect(() => {
        const storedFavoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies') || '[]');
        setFavoriteMovies(storedFavoriteMovies);
    }, []);

    const handleCardClick = (movieId: number) => {
        window.location.href = `/movies/${movieId}`;
    };

    return (
        <div className="text-gray-200 h-screen">
            <h1 className="text-4xl text-center font-bold py-8">Meus Favoritos</h1>
            {favoriteMovies.length > 0 ? (
                <ul className="grid lg:grid-cols-4 cursor-pointer md:grid-cols-3 gap-6 max-[770px]:grid-cols-2 max-[500px]:grid-cols-1 ">
                    {favoriteMovies.map((movie) => (
                        <li key={movie.id}>
                            <MovieCard movie={movie} onClick={() => handleCardClick(movie.id)} />
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center">Nenhum filme favorito encontrado</p>
            )}
        </div>
    );
};

export default Favorites;
