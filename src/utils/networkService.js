import axios from 'axios';
import { HTTP_BASE_URL } from '../constants/apiConstants';

// const API = (methodType, payload, authRequired, timeOut) => {
//     const headers = {
//         'Content-Type': 'application/json'
//     };
//     if(authRequired){
//         const store = get
//     }

// }

export const API = axios.create({
    baseURL: HTTP_BASE_URL,
    responseType: "json"
});



