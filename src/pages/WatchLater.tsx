import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaRegBookmark } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import MovieCard from '../components/List/MovieCard';
import { EmptyState } from '../components/UI';
import CardMovie from '../components/WatchLater/CardMovie';
import useFetchRecommendations from '../hooks/useFetchRecommendations';
import IMovieDetails from '../Interfaces/IMovieInterface';

const WatchLater: React.FC = () => {
    const [movies, setMovies] = useState<IMovieDetails[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedMovies = JSON.parse(localStorage.getItem('watchLaterMovies') || '[]');
        setMovies(storedMovies);
    }, []);

    const { recommendations, hasMoreRecommendations, loadMoreRecommendations } = useFetchRecommendations(movies);

    const handleRemoveFromWatchLater = (movieId: number) => {
        const updatedMovies = movies.filter(movie => movie.id !== movieId);
        setMovies(updatedMovies);
        localStorage.setItem('watchLaterMovies', JSON.stringify(updatedMovies));
        toast.success('Filme removido da sua lista!');
    };

    return (
        <>
            <Header />
            <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8 sm:px-8 sm:pt-10">
                <header className="mb-8">
                    <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Minha lista</h1>
                    <p className="mt-1 text-sm text-slate-400">
                        {movies.length > 0
                            ? `${movies.length} ${movies.length === 1 ? 'filme salvo' : 'filmes salvos'} para assistir mais tarde`
                            : 'Filmes salvos para assistir mais tarde'}
                    </p>
                </header>

                {movies.length > 0 ? (
                    <div className="flex flex-col gap-5">
                        {movies.map((movie) => (
                            <CardMovie
                                key={movie.id}
                                movie={movie}
                                onRemove={() => handleRemoveFromWatchLater(movie.id)}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        icon={<FaRegBookmark aria-hidden />}
                        title="Sua lista está vazia"
                        description="Explore o catálogo e salve os filmes que você quer assistir mais tarde."
                        action={
                            <Link
                                to="/"
                                className="inline-flex min-h-[48px] items-center rounded-full bg-indigo-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-indigo-500"
                            >
                                Explorar filmes
                            </Link>
                        }
                    />
                )}

                {recommendations.length > 0 && (
                    <section className="mt-16">
                        <h2 className="mb-6 text-xl font-bold tracking-tight sm:text-2xl">
                            Recomendações para você
                        </h2>
                        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
                            {recommendations.map(recommendation => (
                                <li key={recommendation.id}>
                                    <MovieCard
                                        movie={recommendation}
                                        onClick={(movieId) => navigate(`/movies/${movieId}`)}
                                    />
                                </li>
                            ))}
                        </ul>
                        {hasMoreRecommendations && (
                            <div className="flex justify-center pt-10">
                                <button
                                    type="button"
                                    onClick={loadMoreRecommendations}
                                    className="min-h-[48px] w-full rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-indigo-500 sm:w-auto"
                                >
                                    Ver mais recomendações
                                </button>
                            </div>
                        )}
                    </section>
                )}
            </main>
        </>
    );
};

export default WatchLater;
