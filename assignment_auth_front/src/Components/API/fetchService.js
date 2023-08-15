import axios from 'axios'
import AuthServices from "./authServices";

export const API_URL = 'http://localhost:5000'

const api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
})

api.interceptors.request.use((config)=>{
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
    return config
})

api.interceptors.response.use( (config) => {
    return config
    } , async (error) => {
    console.log('*************** Interseptor request', error)

    if (!('response' in error)){
        throw error
    }
    const originalRequest = error.config;
    if (error.response.status == 401 && !originalRequest.isRetry ) {
        originalRequest.isRetry=true
        // console.log('!!!!!!!!!!!!!!!!!!!')
        try {
            const response = await AuthServices.checkAuth();
            localStorage.setItem('token', response.data.access_token)
            return api.request(originalRequest)
        } catch (e) {
            // console.log('+++++++++++++User not authorise')
            throw e
        }
    } else {
        throw error
    }
    })
export default api