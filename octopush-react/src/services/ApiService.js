import axios from 'axios';
import qs from 'qs';

const baseURL = "http://localhost:5000/api/v1"

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 1000,
})

const backendAPI = {
    login: (loginInput) => {
        return axiosInstance.post('/user/login', qs.stringify({
            email: loginInput.email,
            password: loginInput.password
        }))
    },
}

export default backendAPI