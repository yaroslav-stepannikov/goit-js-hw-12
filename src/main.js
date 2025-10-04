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
const loadBtn = document.querySelector('.load-btn');
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
    } else {
      hideLoadMoreButton();
    }

    iziToast.success({
      title: 'Success',
      message: `Found ${data.totalHits} images`,
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
  } finally {
    hideLoader();
  }
});

if (loadBtn) {
  loadBtn.addEventListener('click', async () => {
    page += 1;
    showLoader();

    try {
      const data = await getImagesByQuery(searchQuery, page);

      if (!data.hits || data.hits.length === 0) {
        hideLoadMoreButton();
        iziToast.info({
          title: 'End',
          message: `We're sorry, but you've reached the end of search results.`,
          timeout: 3000,
          position: 'topRight',
        });
        return;
      }

      createGallery(data.hits);

      const totalPages = Math.ceil(data.totalHits / PER_PAGE);

      if (page >= totalPages) {
        hideLoadMoreButton();
        iziToast.info({
          title: 'End',
          message: `You've reached the last page of results.`,
          timeout: 3000,
          position: 'topRight',
        });
      } else {
        showLoadMoreButton();
      }

      const galleryItem = document.querySelector('.gallery-item');
      if (galleryItem) {
        const { height: cardHeight } = galleryItem.getBoundingClientRect();
        window.scrollBy({
          top: cardHeight * 2,
          behavior: 'smooth',
        });
      }
    } catch (error) {
      console.error(error);
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong while loading more images.',
        position: 'topRight',
      });
    } finally {
      hideLoader();
    }
  });
}
