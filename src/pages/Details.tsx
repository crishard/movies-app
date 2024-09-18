import React from "react";
import MovieDetails from "../components/Details/MovieDetails";
import Recommendations from "../components/Details/Recommendations";
import { Header } from "../components/Header";
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
        <main className="sm:px-[8%] px-[4%]">
            <Header />
            <div className='flex flex-col items-center'>

                <MovieDetails movie={movie} />
                <Recommendations />
            </div>
        </main>

    );
};

export default Details;
