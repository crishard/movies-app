import React, { useEffect } from "react";
import { BiCameraMovie } from "react-icons/bi";
import { Link } from "react-router-dom";
import MovieDetails from "../components/Details/MovieDetails";
import Recommendations from "../components/Details/Recommendations";
import { Header } from "../components/Header";
import { EmptyState, Spinner } from "../components/UI";
import useFetchMovieDetails from "../hooks/useFetchMovieDetails";

const Details: React.FC = () => {
    const { movie, loading } = useFetchMovieDetails();

    useEffect(() => {
        if (movie) {
            document.title = `${movie.title} — Filmes`;
        }
        return () => {
            document.title = 'Filmes — Descubra seu próximo filme favorito';
        };
    }, [movie]);

    if (loading) {
        return (
            <>
                <Header />
                <div className="flex min-h-[60vh] items-center justify-center">
                    <Spinner />
                </div>
            </>
        );
    }

    if (!movie) {
        return (
            <>
                <Header />
                <EmptyState
                    icon={<BiCameraMovie aria-hidden />}
                    title="Filme não encontrado"
                    description="Não foi possível carregar os detalhes deste filme."
                    action={
                        <Link
                            to="/"
                            className="inline-flex min-h-[48px] items-center rounded-full bg-indigo-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-indigo-500"
                        >
                            Voltar para a Home
                        </Link>
                    }
                />
            </>
        );
    }

    return (
        <>
            <Header />
            <main>
                <MovieDetails movie={movie} />
                <Recommendations />
            </main>
        </>
    );
};

export default Details;
