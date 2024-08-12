import { useEffect, useState } from "react";
import api from "../services/api";

interface IGenre {
    id: number;
    name: string;
}

const useGenres = () => {
    const [genres, setGenres] = useState<IGenre[]>([]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await api.get('/3/genre/movie/list');
                setGenres(response.data.genres);
            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        };

        fetchGenres();
    }, []);

    return { genres };
};

export default useGenres;
