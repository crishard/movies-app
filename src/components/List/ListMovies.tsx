import IMovieDetails from "../../Interfaces/IMovieInterface"
import MovieCard from "./MovieCard"

interface IListMoviesProps{
  page: number,
  loading: boolean, 
  movies: IMovieDetails[],
  functionClick:  any,
  loadMore: any

}
const ListMovies = ({page, loading, movies, functionClick, loadMore}: IListMoviesProps) => {
  return (
    <div className="mt-8 sm:px-[8%] px-[4%]">
    {loading && page === 1 && (
        <div className="flex justify-center items-center mt-[10%]">
            <div className="spinner"></div>
        </div>
    )}
    {movies.length > 0 ? (
        <>
            <ul className="grid lg:grid-cols-4 cursor-pointer md:grid-cols-3 gap-6 max-[770px]:grid-cols-2 max-[500px]:grid-cols-1 ">
                {movies.map((movie) => (
                    <li key={movie.id}>
                        <MovieCard movie={movie} onClick={() => functionClick(movie.id)} />
                    </li>
                ))}
            </ul>
            <div className="flex justify-center py-12">
                <button
                    onClick={loadMore}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    disabled={loading}
                >
                    {loading ? "Carregando..." : "Ver mais"}
                </button>
            </div>
        </>
    ) : (
        <p>Nenhum filme encontrado</p>
    )}
</div>
  )
}

export default ListMovies