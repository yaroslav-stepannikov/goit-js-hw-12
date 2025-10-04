import axios from 'axios';
import '../css/base.css';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '52544732-939bdd7f86cf76540eb760f6b';
export const PER_PAGE = 15;

const instance = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: PER_PAGE,
  },
});

export async function getImagesByQuery(query, page = 1) {
  if (!query) return { hits: [] };

  try {
    const { data } = await instance.get(``, { params: { q: query, page } });
    return data;
  } catch (error) {
    console.log(error);
    return { hits: [] };
  }
}
