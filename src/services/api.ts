import axios from "axios";

const key = import.meta.env.VITE_API_KEY
const token = import.meta.env.VITE_TOKEN

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/',
    params: {
        api_key: key,
        language: "pt-BR"
    },
});

api.defaults.headers.common['Authorization'] = token;

export default api