import axios from 'axios'
import store from './store'

const token = store.state.token;

axios.get('http://localhost:8000/sanctum/csrf-cookie');
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  },
});

export default api;
