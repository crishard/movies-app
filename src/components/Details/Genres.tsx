import React from 'react';
import IGender from '../../Interfaces/IGenderInterface';



interface GenresProps {
    genres:  IGender[];
}

const Genres: React.FC<GenresProps> = ({ genres }) => {
    return (
        <div className="pt-4">
            <p className="flex items-center text-lg gap-2">
                Gêneros:
                <span className="flex gap-2">
                    {genres.map((genre) => (
                        <span key={genre.id}>{genre.name} |</span>
                    ))}
                </span>
            </p>
        </div>
    );
};

export default Genres;