import React from 'react';
import { FaUser } from 'react-icons/fa';
import ICharacter from '../../Interfaces/ICharacter';
import { tmdbImage } from '../../utils/tmdbImage';

interface CharactersProps {
  characters: ICharacter[];
}

const Characters: React.FC<CharactersProps> = ({ characters }) => {
  if (characters.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-4 sm:px-8">
      <h2 className="mb-6 text-xl font-bold tracking-tight sm:text-2xl">Elenco principal</h2>
      <div className="grid grid-cols-3 gap-3 sm:gap-4 md:grid-cols-6">
        {characters.slice(0, 6).map(character => {
          const profileUrl = tmdbImage(character.profile_path, 'w185');
          return (
            <div key={character.id} className="text-center">
              {profileUrl ? (
                <img
                  loading="lazy"
                  src={profileUrl}
                  alt={character.name}
                  className="mx-auto aspect-[2/3] w-full max-w-[120px] rounded-lg object-cover ring-1 ring-slate-800"
                />
              ) : (
                <div className="mx-auto flex aspect-[2/3] w-full max-w-[120px] items-center justify-center rounded-lg bg-slate-800 text-3xl text-slate-600">
                  <FaUser aria-hidden />
                </div>
              )}
              <p className="mt-2 line-clamp-1 text-sm font-semibold">{character.name}</p>
              <p className="line-clamp-1 text-xs text-slate-400">{character.character}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Characters;
