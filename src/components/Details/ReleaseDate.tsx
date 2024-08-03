import { format, parseISO } from 'date-fns';

interface ReleaseDateProps {
  releaseDate: string;
}

const ReleaseDate: React.FC<ReleaseDateProps> = ({ releaseDate }) => {
  const formattedDate = format(parseISO(releaseDate), 'dd/MM/yyyy');
  return (
    <p className="text-lg pb-2 w-[70%] mx-auto">Data de lançamento: {formattedDate}</p>
  );
};

export default ReleaseDate;
