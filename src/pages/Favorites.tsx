import { format } from 'date-fns';
import { jsPDF } from 'jspdf';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaFilePdf, FaRegHeart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import MovieCard from '../components/List/MovieCard';
import { EmptyState } from '../components/UI';
import IMovieDetails from '../Interfaces/IMovieInterface';

const formatDate = (dateString: string) => {
    if (!dateString) return 'Data desconhecida';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
};

const Favorites: React.FC = () => {
    const [favoriteMovies, setFavoriteMovies] = useState<IMovieDetails[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedFavoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies') || '[]');
        setFavoriteMovies(storedFavoriteMovies);
    }, []);

    const generatePDF = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 14;
        const maxWidth = pageWidth - margin * 2;
        let currentHeight = 20;

        const ensureSpace = (neededHeight: number) => {
            if (currentHeight + neededHeight > pageHeight - margin) {
                doc.addPage();
                currentHeight = 20;
            }
        };

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(18);
        doc.text('Meus Filmes Favoritos', margin, currentHeight);
        currentHeight += 8;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(120);
        doc.text(
            `Gerado em ${format(new Date(), 'dd/MM/yyyy')} — ${favoriteMovies.length} ${favoriteMovies.length === 1 ? 'filme' : 'filmes'}`,
            margin,
            currentHeight
        );
        doc.setTextColor(0);
        currentHeight += 12;

        favoriteMovies.forEach((movie) => {
            const genres = movie.genres && Array.isArray(movie.genres)
                ? movie.genres.map((genre) => genre.name).join(', ')
                : 'Gênero não disponível';

            const description = movie.overview || 'Descrição não disponível';
            const descriptionLines: string[] = doc.splitTextToSize(description, maxWidth);

            ensureSpace(16 + descriptionLines.length * 5 + 18);

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(12);
            doc.text(movie.title, margin, currentHeight);
            currentHeight += 7;

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            doc.text(descriptionLines, margin, currentHeight);
            currentHeight += descriptionLines.length * 5 + 3;

            doc.text(`Gêneros: ${genres}`, margin, currentHeight);
            currentHeight += 6;
            doc.text(`Data de lançamento: ${formatDate(movie.release_date)}`, margin, currentHeight);
            currentHeight += 6;

            doc.setDrawColor(200);
            doc.line(margin, currentHeight, pageWidth - margin, currentHeight);
            currentHeight += 10;
        });

        doc.save('meus-filmes-favoritos.pdf');
        toast.success('PDF gerado com sucesso!');
    };

    return (
        <>
            <Header />
            <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-8 sm:pt-10">
                <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Meus favoritos</h1>
                        <p className="mt-1 text-sm text-slate-400">
                            {favoriteMovies.length > 0
                                ? `${favoriteMovies.length} ${favoriteMovies.length === 1 ? 'filme favoritado' : 'filmes favoritados'}`
                                : 'Os filmes que você mais ama, em um só lugar'}
                        </p>
                    </div>
                    {favoriteMovies.length > 0 && (
                        <button
                            type="button"
                            onClick={generatePDF}
                            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition-colors hover:border-indigo-500 hover:text-indigo-400"
                        >
                            <FaFilePdf aria-hidden />
                            Exportar em PDF
                        </button>
                    )}
                </header>

                {favoriteMovies.length > 0 ? (
                    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 xl:grid-cols-5">
                        {favoriteMovies.map((movie) => (
                            <li key={movie.id}>
                                <MovieCard
                                    movie={movie}
                                    onClick={(movieId) => navigate(`/movies/${movieId}`)}
                                />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <EmptyState
                        icon={<FaRegHeart aria-hidden />}
                        title="Nenhum favorito ainda"
                        description="Toque no coração na página de um filme para salvá-lo aqui."
                        action={
                            <Link
                                to="/"
                                className="inline-flex min-h-[48px] items-center rounded-full bg-indigo-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-indigo-500"
                            >
                                Explorar filmes
                            </Link>
                        }
                    />
                )}
            </main>
        </>
    );
};

export default Favorites;
