import React from 'react';
import IGender from '../../Interfaces/IGenderInterface';

interface GenresProps {
    genres: IGender[];
}

const Genres: React.FC<GenresProps> = ({ genres }) => {
    if (!genres || genres.length === 0) return null;

    return (
        <div className="flex flex-wrap justify-center gap-2 md:justify-start">
            {genres.map((genre) => (
                <span
                    key={genre.id}
                    className="rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1 text-xs font-medium text-slate-300"
                >
                    {genre.name}
                </span>
            ))}
        </div>
    );
};

export default Genres;
