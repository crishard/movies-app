import { useEffect, useState } from 'react';
import IMovieDetails from '../Interfaces/IMovieInterface';
import IRecommendation from '../Interfaces/IRecommendation';
import api from '../services/api';

const useFetchRecommendations = (movies: IMovieDetails[], initialPage = 1) => {
    const [recommendations, setRecommendations] = useState<IRecommendation[]>([]);
    const [recommendationsPage, setRecommendationsPage] = useState(initialPage);
    const [hasMoreRecommendations, setHasMoreRecommendations] = useState(true);

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

    const loadMoreRecommendations = () => {
        setRecommendationsPage(prevPage => prevPage + 1);
    };

    return { recommendations, hasMoreRecommendations, loadMoreRecommendations };
};

export default useFetchRecommendations;
