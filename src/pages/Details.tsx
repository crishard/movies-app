import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieDetails from '../components/Details/MovieDetails';
import Recommendations from '../components/Details/Recommendations';
import IMovieDetails from '../Interfaces/IMovieInterface';
import api from "../services/api";

const Details = () => {
    const [movie, setMovie] = useState<IMovieDetails>();
   
    const { id } = useParams();

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

    if (!movie) return (
        <div className="flex justify-center items-center h-screen">
            <div className="spinner"></div>
        </div>
    );
    return (
        <main className='flex flex-col items-center'>
            <MovieDetails movie={movie} />
            <Recommendations />
        </main>
    );
};

export default Details;