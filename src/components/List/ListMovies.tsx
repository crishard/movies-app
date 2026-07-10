import { FiSearch } from "react-icons/fi"
import IMovieDetails from "../../Interfaces/IMovieInterface"
import { EmptyState } from "../UI"
import MovieCard from "./MovieCard"

interface IListMoviesProps {
  title: string,
  page: number,
  loading: boolean,
  hasMore: boolean,
  movies: IMovieDetails[],
  onMovieClick: (movieId: number) => void,
  onLoadMore: () => void
}

const SkeletonGrid = () => (
  <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 xl:grid-cols-5" aria-hidden>
    {Array.from({ length: 10 }).map((_, index) => (
      <li key={index} className="animate-pulse">
        <div className="aspect-[2/3] rounded-xl bg-slate-800" />
        <div className="mt-3 h-4 w-3/4 rounded bg-slate-800" />
        <div className="mt-2 h-3 w-1/2 rounded bg-slate-800" />
      </li>
    ))}
  </ul>
)

const ListMovies = ({ title, page, loading, hasMore, movies, onMovieClick, onLoadMore }: IListMoviesProps) => {
  const isInitialLoading = loading && page === 1;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-16 pt-10 sm:px-8">
      <h2 className="mb-6 text-xl font-bold tracking-tight sm:text-2xl">{title}</h2>

      {isInitialLoading ? (
        <SkeletonGrid />
      ) : movies.length > 0 ? (
        <>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 xl:grid-cols-5">
            {movies.map((movie) => (
              <li key={movie.id}>
                <MovieCard movie={movie} onClick={onMovieClick} />
              </li>
            ))}
          </ul>
          {hasMore && (
            <div className="flex justify-center pt-10">
              <button
                type="button"
                onClick={onLoadMore}
                disabled={loading}
                className="min-h-[48px] w-full rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {loading ? "Carregando..." : "Ver mais filmes"}
              </button>
            </div>
          )}
        </>
      ) : (
        <EmptyState
          icon={<FiSearch aria-hidden />}
          title="Nenhum filme encontrado"
          description="Tente ajustar sua busca ou escolher outro gênero."
        />
      )}
    </section>
  )
}

export default ListMovies
