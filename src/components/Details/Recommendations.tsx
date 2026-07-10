import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import IRecommendation from '../../Interfaces/IRecommendation';
import api from '../../services/api';
import MovieCard from '../List/MovieCard';

const Recommendations: React.FC = () => {
    const [recommendations, setRecommendations] = useState<IRecommendation[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setPage(1);
    }, [id]);

    useEffect(() => {
        let cancelled = false;

        const fetchRecommendations = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/3/movie/${id}/recommendations`, {
                    params: { page }
                });
                if (cancelled) return;

                setTotalPages(response.data.total_pages ?? 1);
                setRecommendations(prevRecommendations => {
                    const results: IRecommendation[] = response.data.results;
                    if (page === 1) return results;

                    const uniqueResults = results.filter(
                        result => !prevRecommendations.some(recommendation => recommendation.id === result.id)
                    );
                    return [...prevRecommendations, ...uniqueResults];
                });
            } catch (error) {
                console.error("Error fetching recommendations:", error);
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };
        fetchRecommendations();

        return () => {
            cancelled = true;
        };
    }, [id, page]);

    if (recommendations.length === 0) return null;

    return (
        <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-8">
            <h2 className="mb-6 text-xl font-bold tracking-tight sm:text-2xl">Você também pode gostar</h2>
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
                {recommendations.map((recommendation) => (
                    <li key={recommendation.id}>
                        <MovieCard
                            movie={recommendation}
                            onClick={(movieId) => navigate(`/movies/${movieId}`)}
                        />
                    </li>
                ))}
            </ul>
            {page < totalPages && (
                <div className="flex justify-center pt-10">
                    <button
                        type="button"
                        onClick={() => setPage(prevPage => prevPage + 1)}
                        disabled={loading}
                        className="min-h-[48px] w-full rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                    >
                        {loading ? 'Carregando...' : 'Ver mais recomendações'}
                    </button>
                </div>
            )}
        </section>
    );
};

export default Recommendations;
