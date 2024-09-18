import useGenres from "../../hooks/useGenres";

interface IFilterByGenderProps {
    genderCLick: any,
    genderSelect: number | null,
}

export const FilterByGender = ({genderSelect, genderCLick }: IFilterByGenderProps) => {
    const { genres } = useGenres();
    return (
        <div className="sm:pt-16 sm:px-[8%] px-[4%]">
            <h1 className='text-2xl mb-3'>Filtre sua Busca:</h1>
            {genres.map((genre) => (
                <button
                    key={genre.id}
                    onClick={() => genderCLick(genre.id)}
                    className={`px-2.5 py-1 rounded-lg sm:m-2 m-0.5 ${genderSelect === genre.id ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
                        } transition-colors`}
                >
                    {genre.name}
                    {genderSelect === genre.id && (
                        <span
                            className="ml-2 text-red-500 cursor-pointer"
                        >
                            ✕
                        </span>
                    )}
                </button>
            ))}
        </div>
    )
}
