import axios from 'axios';


const apiClient = axios.create({
    baseURL: "http://localhost:8000",
    timeout:30000,
  });


 export const { get } = apiClient;

