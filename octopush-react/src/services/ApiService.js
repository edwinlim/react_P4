import axios from 'axios';
import qs from 'qs';

const baseURL = "http://localhost:5000/api/v1"

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 2000,
})

const backendAPI = {
    login: (loginInput) => {
        return axiosInstance.post('/user/login', qs.stringify({
            email: loginInput.email,
            password: loginInput.password
        }))
    },

    getSenderRequests: (senderId) => {
        return axiosInstance.post(`/getSenderRequests/${senderId}`)
    },

    batchUpdate: (list, token) => {
        return axiosInstance.post(
            '/batchUpdate', 
            qs.stringify({list}),
            {
                headers: {
                  'auth_token': token
                }
            }
        )
    }
}

export default backendAPI