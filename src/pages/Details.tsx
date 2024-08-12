import React from "react";
import MovieDetails from "../components/Details/MovieDetails";
import Recommendations from "../components/Details/Recommendations";
import useFetchMovieDetails from "../hooks/useFetchMovieDetails";

const Details: React.FC = () => {
    const movie = useFetchMovieDetails();

    if (!movie) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <main className='flex flex-col items-center'>
            <MovieDetails movie={movie} />
            <Recommendations />
        </main>
    );
};

export default Details;
