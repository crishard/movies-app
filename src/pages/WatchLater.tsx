import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import StarRating from '../components/StarRatings/StarRatings';
import CardMovie from '../components/WatchLater/CardMovie';
import IMovieDetails from '../Interfaces/IMovieInterface';
import IRecommendation from '../Interfaces/IRecommendation';
import api from '../services/api';

const WatchLater: React.FC = () => {
    const [movies, setMovies] = useState<IMovieDetails[]>([]);
    const [recommendations, setRecommendations] = useState<IRecommendation[]>([]);
    const [recommendationsPage, setRecommendationsPage] = useState(1);
    const [hasMoreRecommendations, setHasMoreRecommendations] = useState(true);

    useEffect(() => {
        const storedMovies = JSON.parse(localStorage.getItem('watchLaterMovies') || '[]');
        setMovies(storedMovies);
    }, []);

    useEffect(() => {
        const fetchRecommendations = async (page: number) => {
            try {
                const allRecommendations: IRecommendation[] = [];

                for (const movie of movies) {
                    const response = await api.get(`/3/movie/${movie.id}/recommendations`, {
                        params: { page }
                    });
                    allRecommendations.push(...response.data.results);
                }

                const uniqueRecommendations = Array.from(new Set(allRecommendations.map(a => a.id)))
                    .map(id => allRecommendations.find(a => a.id === id))
                    .filter((recommendation): recommendation is IRecommendation => recommendation !== undefined)
                    .filter(recommendation => !movies.some(movie => movie.id === recommendation.id))
                    .slice(0, 5 * page);

                setRecommendations(prevRecommendations => [
                    ...prevRecommendations,
                    ...uniqueRecommendations
                ]);

                if (uniqueRecommendations.length < 5 * page) {
                    setHasMoreRecommendations(false);
                }
            } catch (error) {
                console.error("Error fetching recommendations:", error);
            }
        };

        if (movies.length > 0) {
            fetchRecommendations(recommendationsPage);
        }
    }, [movies, recommendationsPage]);

    const handleRemoveFromWatchLater = (movieId: number) => {
        const updatedMovies = movies.filter(movie => movie.id !== movieId);
        setMovies(updatedMovies);
        localStorage.setItem('watchLaterMovies', JSON.stringify(updatedMovies));
    };

    const loadMoreRecommendations = () => {
        setRecommendationsPage(prevPage => prevPage + 1);
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
            {recommendations.length > 0 && (
                <div className="recommendations mt-16">
                    <h2 className="text-2xl text-gray-200 font-bold text-center pb-8">Recomendações</h2>
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
                        {recommendations.map(recommendation => (
                            <div key={recommendation.id} className="flex flex-col items-center py-4 hover:scale-105 duration-300 shadow-xl p-5 bg-gray-800 rounded">
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${recommendation.poster_path}`}
                                    alt={recommendation.title}
                                    className="rounded mb-4"
                                />
                                <div className="text-center">
                                    <p className="text-lg font-bold">{recommendation.title}</p>
                                    <div className="pt-5 text-xl font-medium">
                                        <span>Data de lançamento: {new Date(recommendation.release_date).toLocaleDateString()}</span>
                                        <p>Avaliação: <StarRating rating={recommendation.vote_average} /></p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {hasMoreRecommendations && (
                        <div className="flex justify-center mt-8">
                            <button
                                onClick={loadMoreRecommendations}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Ver mais recomendações
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default WatchLater;
