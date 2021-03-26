import axios from 'axios';

// https://api.hgbrasil.com/weather?key=d1ae99ac&lat=-23.682&lon=-46.875

// ? Exporta a key para usar em outra page
export const key = 'd1ae99ac';

// ? Cria a baseUrl 
const api = axios.create({
    baseURL: 'https://api.hgbrasil.com'
});

export default api;