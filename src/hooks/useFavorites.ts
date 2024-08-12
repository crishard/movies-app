import { useEffect, useState } from 'react';
import IMovieDetails from '../Interfaces/IMovieInterface';

const useFavorites = (movie: IMovieDetails) => {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies') || '[]');
        const isMovieInFavorites = favoriteMovies.some((m: IMovieDetails) => m.id === movie.id);
        setIsFavorite(isMovieInFavorites);
    }, [movie.id]);

    const toggleFavorite = () => {
        const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies') || '[]');
        if (isFavorite) {
            const updatedMovies = favoriteMovies.filter((m: IMovieDetails) => m.id !== movie.id);
            localStorage.setItem('favoriteMovies', JSON.stringify(updatedMovies));
            setIsFavorite(false);
        } else {
            favoriteMovies.push(movie);
            localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
            setIsFavorite(true);
        }
    };

    return { isFavorite, toggleFavorite };
};

export default useFavorites;
