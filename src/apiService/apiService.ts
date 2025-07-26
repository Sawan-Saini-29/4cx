// src/services/apiService.ts

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { Alert } from 'react-native';

// Define base URL
const BASE_URL = "https://api.4cx.io/";

// Axios instance
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 99999,
});

// Optional: Add interceptors
axiosInstance.interceptors.request.use(
    async config => {
        return config;
    },
    error => Promise.reject(error)
);

// Type for content type
type ContentType = 'json' | 'form';

interface RequestOptions {
    requireToken?: boolean;
}

// Generic API request method
const request = async <T>(
    method: Method,
    url: string,
    data: Record<string, any> = {},
    contentType: ContentType = 'json',
    options: RequestOptions = {requireToken : false }
): Promise<T> => {
    const headers: Record<string, string> = {};

    let payload: any = data;

    const getToken = async ()=>{
       let token = await AsyncStorage.getItem('userToken')
       return token
    }

    if (contentType === 'form') {
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });
        payload = formData;
        headers['Content-Type'] = 'multipart/form-data';
    } else {
        headers['Content-Type'] = 'application/json';
    }

    if (options.requireToken) {
        const token = await getToken();
        if (token) {
            headers['authorization'] = `Bearer ${token}`;
        } else {
            throw new Error("Authentication token not found");
        }
    }

    const config: AxiosRequestConfig = {
        method,
        url,
        headers,
    };

    if (method === 'get' || method === 'delete') {
        config.params = data;
    } else {
        config.data = payload;
    }

    try {
        const response: AxiosResponse<T> = await axiosInstance(config);
        return response.data;
    } catch (error: any) {
        Alert.alert(error?.response?.data || error.message);
        throw error?.response?.data || error.message;
    }
};

// Exported methods
const ApiService = {
    get: <T>(url: string, params?: Record<string, any>, contentType: ContentType = 'json',options?: RequestOptions) =>
        request<T>('get', url, params, contentType,options),
    post: <T>(url: string, data?: Record<string, any>, contentType: ContentType = 'json',options?: RequestOptions) =>
        request<T>('post', url, data, contentType,options),
    put: <T>(url: string, data?: Record<string, any>, contentType: ContentType = 'json',options?: RequestOptions) =>
        request<T>('put', url, data, contentType,options),
    patch: <T>(url: string, data?: Record<string, any>, contentType: ContentType = 'json',options?: RequestOptions) =>
        request<T>('patch', url, data, contentType,options),
    delete: <T>(url: string, params?: Record<string, any>, contentType: ContentType = 'json',options?: RequestOptions) =>
        request<T>('delete', url, params, contentType,options),
};

export default ApiService;
