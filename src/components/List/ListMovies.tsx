import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Spinner.css";
import useDebounce from "../../hooks/UseDebounce";
import useGenres from "../../hooks/useGenres";
import useMovies from "../../hooks/useMovies";
import MovieCard from './MovieCard';
import SearchAndFilter from './SearchAndFilter';

export const ListMovies: React.FC = () => {
    const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const navigate = useNavigate();

    const { movies, loading } = useMovies(debouncedSearchTerm, selectedGenre, page);
    const { genres } = useGenres();

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
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="">
            <SearchAndFilter
                searchTerm={searchTerm}
                selectedGenre={selectedGenre}
                genres={genres}
                onSearchChange={handleSearchChange}
                onGenreChange={handleGenreChange}
            />
            {loading && page === 1 && (
                <div className="flex justify-center items-center mt-[10%]">
                    <div className="spinner"></div>
                </div>
            )}
            {movies.length > 0 ? (
                <>
                    <ul className="grid lg:grid-cols-4 cursor-pointer md:grid-cols-3 gap-6 max-[770px]:grid-cols-2 max-[500px]:grid-cols-1 ">
                        {movies.map((movie) => (
                            <li key={movie.id}>
                                <MovieCard movie={movie} onClick={() => handleCardClick(movie.id)} />
                            </li>
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
                <p>Nenhum filme encontrado</p>
            )}
        </div>
    );
};
