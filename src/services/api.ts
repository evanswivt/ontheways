import axios, {AxiosRequestConfig} from "axios";
import config from "../config";

const api = axios.create({
    baseURL: config.app.apiUrl,
});

api.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
api.interceptors.request.use(function (config : AxiosRequestConfig) {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      // @ts-ignore
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

api.interceptors.response.use(
    async (response) => {
        if (response.status >= 200 && response.status < 300) {
            const data = response.data;
            return Promise.resolve(data);
        }
    },
    async (error) => {
        if (error && error.message === 'Network Error') {
            window.location.href = '/500';
        }
        const { response, request } = error;
        if (response) {
            if (response.status === 401) {
                localStorage.removeItem('accessToken');
                window.location.href = '/login';
            }
            if (response.status >= 400 && response.status < 500) {
                return Promise.reject(response.data);
            }
        } else if (request) {
            return null;
        }
        return Promise.reject(error);
    },
);


// @ts-ignore
// const user: (string | null) = JSON.parse(localStorage.getItem("persist:root"))?.user;
// // const currentUser = user && JSON.parse(user).currentUser;
// // const TOKEN = currentUser?.jwtToken;
// // console.log(TOKEN)
// //
export const userRequest = axios.create({
    baseURL: config.app.apiUrl,
});

userRequest.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
userRequest.interceptors.response.use(
    async (response) => {
        if (response.status >= 200 && response.status < 300) {
            const data = response.data;
            return Promise.resolve(data);
        }
    },
    async (error) => {
        if (error && error.message === 'Network Error') {
            window.location.href = '/500';
        }
        const { response, request } = error;
        if (response) {
            if (response.status >= 400 && response.status < 500) {
                return Promise.reject(response.data);
            }
        } else if (request) {
            return null;
        }
        return Promise.reject(error);
    },
);
export default api;
