import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IMovieDetails from "../Interfaces/IMovieInterface";
import api from "../services/api";

const useFetchMovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState<IMovieDetails | null>(null);

    useEffect(() => {
        const getMovieDetails = async () => {
            try {
                const movieResponse = await api.get(`/3/movie/${id}`);
                setMovie(movieResponse.data);
            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
        };
        getMovieDetails();
    }, [id]);

    return movie;
};

export default useFetchMovieDetails;
