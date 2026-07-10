import { FiX } from "react-icons/fi";
import IGender from "../../Interfaces/IGenderInterface";

interface IFilterByGenderProps {
    genres: IGender[];
    selectedGenre: number | null;
    onGenreClick: (genreId: number) => void;
}

export const FilterByGender = ({ genres, selectedGenre, onGenreClick }: IFilterByGenderProps) => {
    if (genres.length === 0) return null;

    return (
        <div className="mt-8 sm:mt-10">
            <div
                role="group"
                aria-label="Filtrar por gênero"
                className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-auto sm:max-w-4xl sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0"
            >
                {genres.map((genre) => {
                    const isSelected = selectedGenre === genre.id;
                    return (
                        <button
                            key={genre.id}
                            type="button"
                            onClick={() => onGenreClick(genre.id)}
                            aria-pressed={isSelected}
                            className={`inline-flex min-h-[40px] shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                                isSelected
                                    ? 'border-indigo-500 bg-indigo-600 text-white'
                                    : 'border-slate-700 bg-slate-900/70 text-slate-300 backdrop-blur hover:border-slate-500 hover:text-white'
                            }`}
                        >
                            {genre.name}
                            {isSelected && <FiX aria-hidden />}
                        </button>
                    );
                })}
            </div>
        </div>
    )
}
