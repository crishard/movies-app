import { useEffect, useState } from 'react';
import IMovieDetails from '../Interfaces/IMovieInterface';
import IRecommendation from '../Interfaces/IRecommendation';
import api from '../services/api';

const PAGE_SIZE = 10;

const useFetchRecommendations = (movies: IMovieDetails[]) => {
    const [recommendations, setRecommendations] = useState<IRecommendation[]>([]);
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    useEffect(() => {
        if (movies.length === 0) {
            setRecommendations([]);
            return;
        }

        let cancelled = false;

        const fetchRecommendations = async () => {
            try {
                const responses = await Promise.all(
                    movies.map(movie => api.get(`/3/movie/${movie.id}/recommendations`))
                );
                if (cancelled) return;

                const allRecommendations = responses.flatMap(
                    response => response.data.results as IRecommendation[]
                );

                const uniqueRecommendations = allRecommendations.filter(
                    (recommendation, index) =>
                        allRecommendations.findIndex(item => item.id === recommendation.id) === index &&
                        !movies.some(movie => movie.id === recommendation.id)
                );

                setRecommendations(uniqueRecommendations);
            } catch (error) {
                console.error("Error fetching recommendations:", error);
            }
        };

        fetchRecommendations();

        return () => {
            cancelled = true;
        };
    }, [movies]);

    const visibleRecommendations = recommendations.slice(0, visibleCount);
    const hasMoreRecommendations = visibleCount < recommendations.length;
    const loadMoreRecommendations = () => setVisibleCount(count => count + PAGE_SIZE);

    return { recommendations: visibleRecommendations, hasMoreRecommendations, loadMoreRecommendations };
};

export default useFetchRecommendations;
