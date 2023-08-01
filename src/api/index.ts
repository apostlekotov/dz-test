import axios from 'axios';

const api = axios.create({
  baseURL: 'https://collectionapi.metmuseum.org/public/collection/v1'
});

export default api;
