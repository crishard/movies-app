import { jsPDF } from 'jspdf';
import React, { useEffect, useState } from 'react';
import IMovieDetails from '../Interfaces/IMovieInterface';
import MovieCard from '../components/List/MovieCard';

const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
};

const Favorites: React.FC = () => {
    const [favoriteMovies, setFavoriteMovies] = useState<IMovieDetails[]>([]);

    useEffect(() => {
        const storedFavoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies') || '[]');
        setFavoriteMovies(storedFavoriteMovies);
    }, []);

    const handleCardClick = (movieId: number) => {
        window.location.href = `/movies/${movieId}`;
    };


    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text('Meus Filmes Favoritos', 10, 10);
        doc.setFontSize(12);

        
        const pageWidth = 180; 
        const lineHeight = 10; 
        let currentHeight = 20;


        favoriteMovies.forEach((movie) => {
            const genres = movie.genres && Array.isArray(movie.genres)
                ? movie.genres.map((genre: any) => genre.name || genre).join(', ')
                : 'Gênero não disponível';

            doc.text(`Título: ${movie.title}`, 10, currentHeight);
            currentHeight += lineHeight;

            const description = movie.overview || 'Descrição não disponível';
            const descriptionLines = doc.splitTextToSize(description, pageWidth);
            doc.text(descriptionLines, 10, currentHeight);
            currentHeight += descriptionLines.length * 6; 

            doc.text(`Gêneros: ${genres}`, 10, currentHeight);
            currentHeight += lineHeight;
            doc.text(`Data de Lançamento: ${formatDate(movie.release_date)}`, 10, currentHeight);
            currentHeight += lineHeight * 1; 
        });

        doc.save('meus-filmes-favoritos.pdf');
    };

    return (
        <div className="text-gray-200 h-screen">
            <h1 className="text-4xl text-center font-bold py-8">Meus Favoritos</h1>
            <div className="text-center mb-8">
                <button
                    onClick={generatePDF}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Compartilhar Favoritos em PDF
                </button>
            </div>

            {favoriteMovies.length > 0 ? (
                <ul className="grid lg:grid-cols-4 cursor-pointer md:grid-cols-3 gap-6 max-[770px]:grid-cols-2 max-[500px]:grid-cols-1 ">
                    {favoriteMovies.map((movie) => (
                        <li key={movie.id}>
                            <MovieCard movie={movie} onClick={() => handleCardClick(movie.id)} />
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center">Nenhum filme favorito encontrado</p>
            )}
        </div>
    );
};

export default Favorites;
