import React from 'react';
import ICharacter from '../../Interfaces/ICharacter';

interface CharactersProps {
  characters: ICharacter[];
}

const Characters: React.FC<CharactersProps> = ({ characters }) => {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold pb-4">Atores Principais</h2>
      <div className="grid sm:grid-cols-4 grid-cols-2 gap-4 text-center">
        {characters.slice(0, 4).map(character => (
          <div key={character.id}>
            <div className='flex justify-center'>
              <img
                src={`https://image.tmdb.org/t/p/w200${character.profile_path}`}
                alt={character.name}
                className="rounded h-32"
              />
            </div>
            <p className="text-lg font-bold">{character.name}</p>
            <p className="text-sm text-gray-400">{character.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Characters;
