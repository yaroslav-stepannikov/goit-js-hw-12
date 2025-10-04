import axios from 'axios';
import '../css/base.css';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '52544732-939bdd7f86cf76540eb760f6b';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 18,
  },
});

export function getImagesByQuery(query) {
  if (!query) return Promise.resolve({ hits: [] });

  return instance
    .get('', { params: { q: query } })
    .then(res => res.data)
    .catch(error => {
      console.log(error);
      return { hits: [] };
    });
}
