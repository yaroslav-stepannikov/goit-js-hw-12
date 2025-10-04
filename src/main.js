import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const searchText = form.elements['search-text'].value.trim();

  if (!searchText) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query',
      timeout: 3000,
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  showLoader();

  getImagesByQuery(searchText).then(data => {
    hideLoader();

    if (!data.hits || data.hits.length === 0) {
      iziToast.info({
        title: 'No results',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        timeout: 4000,
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);

    iziToast.success({
      title: 'Success',
      message: `Found ${data.hits.length} images`,
      timeout: 3000,
      position: 'topRight',
    });
  });
});
