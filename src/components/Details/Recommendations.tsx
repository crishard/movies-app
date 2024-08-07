import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import IRecommendation from '../../Interfaces/IRecommendation';
import api from '../../services/api';
import StarRating from '../StarRatings/StarRatings';
import ReleaseDate from './ReleaseDate';

const Recommendations: React.FC = () => {
    const [recommendations, setRecommendations] = useState<IRecommendation[]>([]);
    const [page, setPage] = useState(1);
    const { id } = useParams();

    useEffect(() => {
        const getMovieDetails = async () => {
            try {
                const recommendationsResponse = await api.get(`/3/movie/${id}/recommendations`, {
                    params: { page }
                });
                setRecommendations(prevRecommendations => [
                    ...prevRecommendations,
                    ...recommendationsResponse.data.results
                ]);
            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
        };
        getMovieDetails();
    }, [id, page]);

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const loadMoreRecommendations = () => {
        setPage(prevPage => prevPage + 1);
    };

    return (
        <div className="mt-32 text-gray-200">
            <h2 className="text-2xl font-bold pb-4">Recomendações</h2>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
                {recommendations.map((recommendation, index) => (
                    <Link
                        onClick={handleClick}
                        to={`/movies/${recommendation.id}`}
                        key={`${recommendation.id}-${index}`}
                        className="flex flex-col items-center py-4 hover:scale-105 duration-300 shadow-xl p-5 bg-gray-800 rounded"
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/w200${recommendation.poster_path}`}
                            alt={recommendation.title}
                            className="rounded mb-4"
                        />
                        <div className="text-center">
                            <p className="text-lg font-bold">{recommendation.title}</p>
                            <div className="pt-5 text-xl font-medium">
                                <ReleaseDate releaseDate={recommendation.release_date} />
                                Avaliação: <StarRating rating={recommendation.vote_average} />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="flex justify-center mt-8">
                <button
                    onClick={loadMoreRecommendations}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Carregar Mais Recomendações
                </button>
            </div>
        </div>
    );
};

export default Recommendations;
