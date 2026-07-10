import axios from "axios";
import { useEffect, useState } from "react";
import IMovieDetails from "../Interfaces/IMovieInterface";
import api from "../services/api";

const useMovies = (searchTerm: string, selectedGenre: number | null, page: number) => {
    const [movies, setMovies] = useState<IMovieDetails[]>([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const controller = new AbortController();

        const fetchMovies = async () => {
            try {
                setLoading(true);
                const trimmedSearch = searchTerm.trim();
                const endpoint = trimmedSearch ? '/3/search/movie' : '/3/discover/movie';
                const params: Record<string, string | number> = { page };

                if (trimmedSearch) {
                    params.query = trimmedSearch;
                } else if (selectedGenre) {
                    params.with_genres = selectedGenre;
                }

                const response = await api.get(endpoint, { params, signal: controller.signal });

                setTotalPages(response.data.total_pages ?? 1);
                setMovies(prevMovies => {
                    const newMovies: IMovieDetails[] = response.data.results;
                    if (page === 1) return newMovies;

                    const uniqueMovies = newMovies.filter(
                        newMovie => !prevMovies.some(movie => movie.id === newMovie.id)
                    );
                    return [...prevMovies, ...uniqueMovies];
                });
            } catch (error) {
                if (!axios.isCancel(error)) {
                    console.error("Error fetching movies:", error);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchMovies();

        return () => controller.abort();
    }, [searchTerm, selectedGenre, page]);

    return { movies, loading, hasMore: page < totalPages };
};

export default useMovies;
