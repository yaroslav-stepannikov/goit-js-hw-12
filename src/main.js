import { getImagesByQuery, PER_PAGE } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const loadBtn = document.querySelector('.load-btn, .load-btn-hidden');
let searchQuery = '';
let page = 1;

form.addEventListener('submit', async event => {
  event.preventDefault();
  searchQuery = form.elements['search-text'].value.trim();
  page = 1;

  if (!searchQuery) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query',
      timeout: 3000,
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(searchQuery, page);
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
    if (data.totalHits > page * PER_PAGE) {
      showLoadMoreButton();
    }

    iziToast.success({
      title: 'Success',
      message: `Found ${data.hits.length} images`,
      timeout: 3000,
      position: 'topRight',
    });
  } catch (error) {
    console.log(error);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong while fetching images.',
      position: 'topRight',
    });
  }
});

loadBtn.addEventListener('click', async () => {
  page += 1;
  showLoader();

  try {
    const data = await getImagesByQuery(searchQuery, page);
    const totalPages = Math.ceil(data.totalHits / PER_PAGE);

    hideLoader();

    if (!data.hits || data.hits.length === 0 || page >= totalPages) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'End',
        message: `We're sorry, but you've reached the end of search results`,
        timeout: 3000,
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);

    const galleryItem = document.querySelector('.gallery-item'); // після створення галереї
    if (galleryItem) {
      const { height: cardHeight } = galleryItem.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 3,
        behavior: 'smooth',
      });
    }
  } catch (error) {
    console.log(error);
    hideLoader();
  }
});
