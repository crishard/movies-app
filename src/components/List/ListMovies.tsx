import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IMovieDetails from "../../Interfaces/IMovieInterface";
import api from "../../services/api";
import MovieCard from './MovieCard';

export const ListMovies = () => {
    const [movies, setMovies] = useState<IMovieDetails[]>([]);
    const [page, setPage] = useState(1); // Estado para rastrear a página atual
    const [loading, setLoading] = useState(false); // Estado para rastrear o carregamento
    const navigate = useNavigate();

    const getMovies = async (page: number) => {
        try {
            setLoading(true);
            const response = await api.get(`/3/discover/movie?page=${page}`);
            setMovies(prevMovies => page === 1 ? response.data.results : [...prevMovies, ...response.data.results]);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching movies:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getMovies(1); // Carregar a primeira página apenas uma vez
    }, []);

    useEffect(() => {
        if (page > 1) {
            getMovies(page); // Carregar páginas subsequentes quando a página for incrementada
        }
    }, [page]);

    const handleCardClick = (movieId: number) => {
        navigate(`/movies/${movieId}`);
    };

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    return (
        <div className="movie-list">
            {movies.length > 0 ? (
                <>
                    <ul className="grid lg:grid-cols-4 cursor-pointer md:grid-cols-3 gap-10 max-[770px]:grid-cols-2 max-[500px]:grid-cols-1 ">
                        {movies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} onClick={handleCardClick} />
                        ))}
                    </ul>
                    <div className="flex justify-center py-12">
                        <button
                            onClick={handleLoadMore}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            disabled={loading}
                        >
                            {loading ? "Carregando..." : "Ver mais"}
                        </button>
                    </div>
                </>
            ) : (
                <p>No movies found</p>
            )}
        </div>
    );
};
