import axios from 'axios';


const instance = axios.create({
    baseURL: 'http://localhost:5000/v1',
    withCredentials: true,
});

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    
    async (error) => {
        const originalRequest = error.config;

        console.log('error',error)
        if ((error.response.status === 400 || error.response.status === 401) && !originalRequest?.send) {
            originalRequest.sent = true;
            const response = await instance.post('/auth/refresh');
            return instance(originalRequest);
        }
    },
);

export default instance;