interface MovieImageProps {
    posterPath: string;
    title: string;
  }
  
  const MovieImage: React.FC<MovieImageProps> = ({ posterPath, title }) => {
    return (
      <img
        src={`https://image.tmdb.org/t/p/original${posterPath}`}
        alt={title}
        className="w-[40%] mx-auto flex rounded pb-8"
      />
    );
  };
  
  export default MovieImage;
  