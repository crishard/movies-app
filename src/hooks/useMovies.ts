import { useEffect, useState } from "react";
import IMovieDetails from "../Interfaces/IMovieInterface";
import api from "../services/api";

const useMovies = (searchTerm: string, selectedGenre: number | null, page: number) => {
    const [movies, setMovies] = useState<IMovieDetails[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                const genreParam = selectedGenre ? `&with_genres=${selectedGenre}` : '';
                const searchParam = searchTerm ? `/3/search/movie?query=${searchTerm}&page=${page}` : `/3/discover/movie?page=${page}${genreParam}`;
                const response = await api.get(searchParam);
                setMovies(prevMovies => {
                    const newMovies = response.data.results;
                    const uniqueMovies = newMovies.filter(
                        (newMovie: { id: number; }) => !prevMovies.some(movie => movie.id === newMovie.id)
                    );
                    return page === 1 ? newMovies : [...prevMovies, ...uniqueMovies];
                });
            } catch (error) {
                console.error("Error fetching movies:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [searchTerm, selectedGenre, page]);

    return { movies, loading };
};

export default useMovies;
