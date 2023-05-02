import axios from 'axios';
import refs from './refs.js';

const API_URL = 'https://pixabay.com/api/';
const API_KEY = '35827087-065bf158987f45118dc560d26';
const params = new URLSearchParams({
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  per_page: '40',
});

export function getImages(page = 1) {
  return axios.get(
    `${API_URL}?key=${API_KEY}&q=${refs.searchInput.value}&${params}&page=${page}`
  );
}
