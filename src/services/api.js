import axios from 'axios';

//Base da URL https://api.themoviedb.org/3/
///movie/now_playing?api_key=0383aeab6c23f8faa1ab5af96c0c9955&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api;