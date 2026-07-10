interface MovieDescriptionProps {
    overview: string;
}

const MovieDescription: React.FC<MovieDescriptionProps> = ({ overview }) => {
    return (
        <p className="mt-2 max-w-3xl text-base leading-relaxed text-slate-300">
            {overview || 'Sinopse não disponível.'}
        </p>
    );
};

export default MovieDescription;
