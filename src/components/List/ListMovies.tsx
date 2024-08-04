import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Spinner.css";
import IMovieDetails from "../../Interfaces/IMovieInterface";
import api from "../../services/api";
import MovieCard from './MovieCard';

interface IGenre {
    id: number;
    name: string;
}

export const ListMovies: React.FC = () => {
    const [movies, setMovies] = useState<IMovieDetails[]>([]);
    const [genres, setGenres] = useState<IGenre[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const getMovies = async (page: number, genreId: number | null = null) => {
        try {
            setLoading(true);
            const genreParam = genreId ? `&with_genres=${genreId}` : '';
            const response = await api.get(`/3/discover/movie?page=${page}${genreParam}`);
            setMovies(prevMovies => page === 1 ? response.data.results : [...prevMovies, ...response.data.results]);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching movies:", error);
            setLoading(false);
        }
    };

    const getGenres = async () => {
        try {
            const response = await api.get('/3/genre/movie/list');
            setGenres(response.data.genres);
        } catch (error) {
            console.error("Error fetching genres:", error);
        }
    };

    useEffect(() => {
        getGenres();
        getMovies(1);
    }, []);

    useEffect(() => {
        if (page > 1) {
            getMovies(page, selectedGenre);
        }
    }, [page]);

    const handleCardClick = (movieId: number) => {
        navigate(`/movies/${movieId}`);
    };

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const genreId = parseInt(event.target.value, 10);
        setSelectedGenre(genreId);
        setPage(1);
        getMovies(1, genreId);
    };

    if (loading && page === 1) {
        return <div className="flex justify-center items-center mt-[10%]">
            <div className="spinner"></div>
        </div>
    }

    return (
        <div className="movie-list">
             <div className="flex justify-end mb-10 ">
                <div className="relative inline-block text-left ">
                    <select
                        className="w-full bg-transparent px-4 py-2 mt-1 text-base border border-gray-300 text-gray-200 rounded-md focus:outline-none overflow-auto focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={handleGenreChange}
                        value={selectedGenre || ''}
                    >
                        <option value="" className="text-gray-900">Todos os Gêneros</option>
                        {genres.map((genre) => (
                            <option key={genre.id} value={genre.id} className="text-gray-900">{genre.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            {movies.length > 0 ? (
                <>
                    <ul className="grid lg:grid-cols-4 cursor-pointer md:grid-cols-3 gap-10 max-[770px]:grid-cols-2 max-[500px]:grid-cols-1 ">
                        {movies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} onClick={() => handleCardClick(movie.id)} />
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
