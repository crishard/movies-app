import { useEffect, useState } from 'react';
import IMovieDetails from '../Interfaces/IMovieInterface';

const useWatchLater = (movie: IMovieDetails) => {
    const [isAddedToWatchLater, setIsAddedToWatchLater] = useState(false);

    useEffect(() => {
        const watchLaterMovies = JSON.parse(localStorage.getItem('watchLaterMovies') || '[]');
        const isMovieInWatchLaterList = watchLaterMovies.some((m: IMovieDetails) => m.id === movie.id);
        setIsAddedToWatchLater(isMovieInWatchLaterList);
    }, [movie.id]);

    const toggleWatchLater = () => {
        const watchLaterMovies = JSON.parse(localStorage.getItem('watchLaterMovies') || '[]');
        if (isAddedToWatchLater) {
            const updatedMovies = watchLaterMovies.filter((m: IMovieDetails) => m.id !== movie.id);
            localStorage.setItem('watchLaterMovies', JSON.stringify(updatedMovies));
            setIsAddedToWatchLater(false);
        } else {
            watchLaterMovies.push(movie);
            localStorage.setItem('watchLaterMovies', JSON.stringify(watchLaterMovies));
            setIsAddedToWatchLater(true);
        }
    };

    return { isAddedToWatchLater, toggleWatchLater };
};

export default useWatchLater;
