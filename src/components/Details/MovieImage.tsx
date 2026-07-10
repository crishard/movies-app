import { BiCameraMovie } from 'react-icons/bi';
import { tmdbImage } from '../../utils/tmdbImage';

interface MovieImageProps {
  posterPath: string;
  title: string;
}

const MovieImage: React.FC<MovieImageProps> = ({ posterPath, title }) => {
  const posterUrl = tmdbImage(posterPath, 'w500');

  if (!posterUrl) {
    return (
      <div className="flex aspect-[2/3] w-48 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-6xl text-slate-600 sm:w-64 md:w-72">
        <BiCameraMovie aria-hidden />
      </div>
    );
  }

  return (
    <img
      src={posterUrl}
      alt={`Pôster de ${title}`}
      className="w-48 shrink-0 rounded-xl shadow-2xl ring-1 ring-slate-800 sm:w-64 md:w-72"
    />
  );
};

export default MovieImage;
