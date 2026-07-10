import React, { useEffect, useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import useDebounce from "../../hooks/UseDebounce";
import useGenres from "../../hooks/useGenres";
import useMovies from "../../hooks/useMovies";
import { tmdbImage } from '../../utils/tmdbImage';
import { FilterByGender } from './FilterByGender';
import ListMovies from './ListMovies';

const NavBarAndFilters: React.FC = () => {
    const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [heroBackdrop, setHeroBackdrop] = useState<string | null>(null);
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const navigate = useNavigate();

    const { genres } = useGenres();
    const { movies, loading, hasMore } = useMovies(debouncedSearchTerm, selectedGenre, page);

    useEffect(() => {
        if (!heroBackdrop && movies[0]?.backdrop_path) {
            setHeroBackdrop(movies[0].backdrop_path);
        }
    }, [movies, heroBackdrop]);

    const handleCardClick = (movieId: number) => {
        navigate(`/movies/${movieId}`);
    };

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setSelectedGenre(null);
        setPage(1);
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        setPage(1);
    };

    const handleGenreClick = (genreId: number) => {
        setSelectedGenre(prevGenre => (prevGenre === genreId ? null : genreId));
        setSearchTerm('');
        setPage(1);
    };

    const filteredMovies = movies.filter(movie => !movie.adult);
    const trimmedSearch = debouncedSearchTerm.trim();
    const selectedGenreName = genres.find(genre => genre.id === selectedGenre)?.name;
    const listTitle = trimmedSearch
        ? `Resultados para "${trimmedSearch}"`
        : selectedGenreName
            ? `Filmes de ${selectedGenreName}`
            : 'Populares no momento';

    const heroUrl = tmdbImage(heroBackdrop, 'w1280');

    return (
        <>
            <section className="relative overflow-hidden">
                <div className="absolute inset-0" aria-hidden>
                    {heroUrl && (
                        <img src={heroUrl} alt="" className="h-full w-full object-cover" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/85 to-slate-950" />
                </div>

                <div className="relative mx-auto w-full max-w-7xl px-4 pb-10 pt-12 sm:px-8 sm:pb-14 sm:pt-20">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                            Descubra seu próximo <span className="text-indigo-400">filme favorito</span>
                        </h1>
                        <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:mt-4 sm:text-base">
                            Pesquise milhares de títulos, favorite os melhores e monte sua lista para assistir mais tarde.
                        </p>

                        <div className="relative mx-auto mt-6 max-w-xl sm:mt-8">
                            <FiSearch
                                aria-hidden
                                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-400"
                            />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                placeholder="Busque por um filme..."
                                aria-label="Buscar filmes"
                                className="min-h-[52px] w-full rounded-full border border-slate-700 bg-slate-900/80 py-3 pl-12 pr-12 text-base text-slate-100 placeholder-slate-500 shadow-xl backdrop-blur transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                            />
                            {searchTerm && (
                                <button
                                    type="button"
                                    onClick={handleClearSearch}
                                    aria-label="Limpar busca"
                                    className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 transition-colors hover:text-white"
                                >
                                    <FiX className="text-xl" aria-hidden />
                                </button>
                            )}
                        </div>
                    </div>

                    <FilterByGender
                        genres={genres}
                        selectedGenre={selectedGenre}
                        onGenreClick={handleGenreClick}
                    />
                </div>
            </section>

            <ListMovies
                title={listTitle}
                page={page}
                loading={loading}
                hasMore={hasMore}
                movies={filteredMovies}
                onMovieClick={handleCardClick}
                onLoadMore={handleLoadMore}
            />
        </>
    );
};

export default NavBarAndFilters;
