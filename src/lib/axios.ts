import axios from "axios";

const api = axios.create({
    baseURL: 'https://thecocktaildb.com/api/json/v1/1'
})

export default api