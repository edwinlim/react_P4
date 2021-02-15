import axios from "axios";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const BACKEND_HOST = "http://localhost:5000/"

const axiosInstance = axios.create({
    baseURL: BACKEND_HOST,
    timeout: 10000,  // 5seconds
})

export function getApiUrl(apiName, version) {
    let url = ''
    if (version) {
        url += version
    }
    if (apiName) {
        url += apiName
    }
    return url.trim()
}

export async function postHttpRequest(url, data) {
    let result = await axiosInstance.post(url, JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return result.data
}

export function removeDuplicatesFromList(data) {
    return data.filter(function (item, pos) {
        return data.indexOf(item) === pos
    })
}

export function showToastMessage(type, msg) {
    if (type === 'error') {
        toastr.error(msg)
    }

    if (type === 'success') {
        toastr.success(msg)
    }

    return
}