interface MovieDescriptionProps {
    overview: string;
}

const MovieDescription: React.FC<MovieDescriptionProps> = ({ overview }) => {
    return (
        <p className="text-xl font-medium pb-2 ">{overview}</p>
    );
};

export default MovieDescription;
