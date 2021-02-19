import axios from 'axios';
import qs from 'qs';
require('dotenv').config()

const baseURL = process.env.BACKEND_HOST + "api/v1"

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
            qs.stringify({ list }),
            {
                headers: {
                    'auth_token': token
                }
            }
        )
    },

    validatePickupCode: (otpInput) => {
        console.log(otpInput)
        return axiosInstance.post('/otpValidtor', qs.stringify(otpInput))
        
    }
}

export default backendAPI