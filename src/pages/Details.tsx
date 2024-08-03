import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MovieDetails } from '../components/Details';
import IMovieDetails from '../Interfaces/IMovieInterface';
import api from "../services/api";

const Details = () => {
    const [movie, setMovie] = useState<IMovieDetails>();
    const { id } = useParams();

    useEffect(() => {
        const getMovieDetails = async () => {
            try {
                const response = await api.get(`/3/movie/${id}`);
                setMovie(response.data);
            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
        };
        getMovieDetails();
    }, [id]);

    if (!movie) return <div className="flex justify-center items-center h-svh">
        <div className="spinner"></div>
    </div>

    return (
        <main className='flex justify-center items-center '>
            <MovieDetails movie={movie} />
        </main>
    );
};

export default Details;
