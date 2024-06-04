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

        if ((error.response.status === 400 || error.response.status === 401) && !originalRequest._retry) {
            originalRequest.retry = true;
            try {
                const response = await axios.post('http://localhost:5000/v1/auth/refresh', null, {
                    withCredentials: true
                });
                return instance(originalRequest);

            } catch {
                return Promise.reject(error);
            }
        }


        return Promise.reject(error.response.data);
    },
);

export default instance;