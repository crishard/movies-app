import { format } from 'date-fns';
import React from 'react';

interface ReleaseDateProps {
    releaseDate: string;
}

const ReleaseDate: React.FC<ReleaseDateProps> = ({ releaseDate }) => {
    if (!releaseDate) {
        return <span>Data de lançamento desconhecida</span>;
    }

    let formattedDate;
    try {
        formattedDate = format(new Date(releaseDate), 'dd/MM/yyyy');
    } catch (error) {
        console.error('Error formatting date:', error);
        return <span>Data inválida</span>;
    }

    return <span>{formattedDate}</span>;
};

export default ReleaseDate;
