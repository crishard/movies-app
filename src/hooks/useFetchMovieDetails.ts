import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IMovieDetails from "../Interfaces/IMovieInterface";
import api from "../services/api";

const useFetchMovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState<IMovieDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        const getMovieDetails = async () => {
            try {
                setLoading(true);
                setMovie(null);
                const movieResponse = await api.get(`/3/movie/${id}`);
                if (!cancelled) {
                    setMovie(movieResponse.data);
                }
            } catch (error) {
                console.error("Error fetching movie details:", error);
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        getMovieDetails();

        return () => {
            cancelled = true;
        };
    }, [id]);

    return { movie, loading };
};

export default useFetchMovieDetails;
