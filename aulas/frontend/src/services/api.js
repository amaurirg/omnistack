import axios from 'axios';  // módulo para fazer chamadas a api de backend

const api = axios.create({
    baseURL: 'http://localhost:3333',
})

export default api;
