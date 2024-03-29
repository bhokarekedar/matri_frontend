import axios from 'axios';
import { HTTP_BASE_URL } from '../constants/apiConstants';
import { isTokenExpired } from './reusableFunctions';


const unprotectedRoutes = ['/api/createUser/', 'api/getAllRelegions/','api/generalInfo/', 'api/getRelatedSubRelegions/', 'api/getRelatedCaste/', 'api/loginUser/'];

export const API = axios.create({
    baseURL: HTTP_BASE_URL,
    responseType: "json"
});


API.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');

      if (token && !unprotectedRoutes.some(route => config.url.includes(route))) {
        if (token && !isTokenExpired(token)) {
            config.headers.Authorization = `Bearer ${token}`;
          } else {
            // Token is expired or not available, redirect to login
            window.location.href = '/login';
          }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
