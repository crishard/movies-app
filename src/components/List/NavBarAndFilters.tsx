import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../css/Spinner.css";
import useDebounce from "../../hooks/UseDebounce";
import useMovies from "../../hooks/useMovies";
import { FilterByGender } from './FilterByGender';
import ListMovies from './ListMovies';
import { NavByFilter } from './NavByFilter';

const NavBarAndFilters: React.FC = () => {
    const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const navigate = useNavigate();

    const { movies, loading } = useMovies(debouncedSearchTerm, selectedGenre, page);

    const handleCardClick = (movieId: number) => {
        navigate(`/movies/${movieId}`);
    };

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setSelectedGenre(null);  
    };

    const handleGenreClick = (genreId: number) => {
        if (selectedGenre === genreId) {
            setSelectedGenre(null); 
        } else {
            setSelectedGenre(genreId);
            setSearchTerm('');  
            setPage(1); 
        }
    };

    return (
        <>
            <header
                className="relative w-full pt-3 md:h-[400px] h-[550px] sm:h-[600px] bg-cover bg-center"
                style={{ backgroundImage: "url('https://i.pinimg.com/736x/5c/65/4a/5c654a52c7e26e31527f6345bffe1c2f.jpg')" }}
            >
                <NavByFilter searchTerm={searchTerm} searchChange={handleSearchChange}/>
                <FilterByGender genderCLick={handleGenreClick} genderSelect={selectedGenre}/>
            </header>

            <ListMovies page={page} loading={loading} movies={movies} functionClick={handleCardClick} loadMore={handleLoadMore}/>

        </>
    );
};

export default NavBarAndFilters;