import axios from 'axios';


const instance = axios.create({
    baseURL: 'http://localhost:5000/v1',
    withCredentials: true,
});

instance.interceptors.request.use(
    (response) => {
        return response;
    },
    
    async (error) => {
        if (error.response.status === 401) {
            await axios.get('/auth/refresh');
        }
    },
);

export default instance;