import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://open-weather-wrapper-api.herokuapp.com',
    timeout:30000,
  });


 export const { get } = apiClient;

