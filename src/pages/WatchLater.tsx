import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import StarRating from '../components/StarRatings/StarRatings';
import CardMovie from '../components/WatchLater/CardMovie';
import useFetchRecommendations from '../hooks/useFetchRecommendations';
import IMovieDetails from '../Interfaces/IMovieInterface';

const WatchLater: React.FC = () => {
    const [movies, setMovies] = useState<IMovieDetails[]>([]);

    useEffect(() => {
        const storedMovies = JSON.parse(localStorage.getItem('watchLaterMovies') || '[]');
        setMovies(storedMovies);
    }, []);

    const { recommendations, hasMoreRecommendations, loadMoreRecommendations } = useFetchRecommendations(movies);

    const handleRemoveFromWatchLater = (movieId: number) => {
        const updatedMovies = movies.filter(movie => movie.id !== movieId);
        setMovies(updatedMovies);
        localStorage.setItem('watchLaterMovies', JSON.stringify(updatedMovies));
    };

    return (
        <div className="watch-later min-h-[1100px] sm:px-[8%] px-[4%]">
            <Header />
            <h1 className="text-4xl text-gray-200 font-bold text-center pb-16">Lista para Assistir Mais Tarde</h1>
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
                            <Link to={`/movies/${recommendation.id}`} key={recommendation.id} className="flex flex-col items-center py-4 hover:scale-105 duration-300 shadow-xl p-5rounded">
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
                            </Link>
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
