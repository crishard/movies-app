import React from 'react';

interface IGenre {
    id: number;
    name: string;
}

interface SearchAndFilterProps {
    searchTerm: string;
    selectedGenre: number | null;
    genres: IGenre[];
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onGenreChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
    searchTerm,
    selectedGenre,
    genres,
    onSearchChange,
    onGenreChange,
}) => {
    return (
        <div className="sm:flex block justify-end mb-10">
            <div className="sm:inline-flex text-left gap-5">
                <input
                    type="text"
                    className="ml-4 p-2 border border-gray-300 rounded text-gray-900"
                    placeholder="Pesquisar filmes"
                    value={searchTerm}
                    onChange={onSearchChange}
                />
                <select
                    className="sm:mt-0 mt-3 ml-4 bg-transparent px-4 py-2 text-base border border-gray-300 text-gray-200 rounded-md focus:outline-none overflow-auto focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={onGenreChange}
                    value={selectedGenre || ''}
                >
                    <option value="" className="text-gray-900">Todos os Gêneros</option>
                    {genres.map((genre) => (
                        <option key={genre.id} value={genre.id} className="text-gray-900">{genre.name}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SearchAndFilter;
