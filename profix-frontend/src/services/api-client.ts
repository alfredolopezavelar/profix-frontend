import axios from 'axios';

// Change URL for the API
const BASE_URL = 'http://localhost:3000'
//const BASE_URL = 'https://486cyq4hy8.execute-api.us-east-1.amazonaws.com/V1'

const apiClient =  axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
})


// Agregar el token cuando es necesario 
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("profix_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

export default apiClient;