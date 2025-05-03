import axios from 'axios';

// Change URL for the API
const BASE_URL = 'http://localhost:3100'

const imgService =  axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "multipart/form-data",
    }
})

export default imgService;