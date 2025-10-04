import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadBtn = document.querySelector('.load-btn, .load-btn-hidden');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
    <li class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}">
        <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>
      <ul class="gallery-content-list">
        <li class="gallery-content-item">
          <div class="content-wrapper">
            <h3 class="gallery-content-title">Likes</h3>
            <p class="gallery-title-value">${likes}</p>
          </div>
          <div class="content-wrapper">
            <h3 class="gallery-content-title">Views</h3>
            <p class="gallery-title-value">${views}</p>
          </div>
          <div class="content-wrapper">
            <h3 class="gallery-content-title">Comments</h3>
            <p class="gallery-title-value">${comments}</p>
          </div>
          <div class="content-wrapper">
            <h3 class="gallery-content-title">Downloads</h3>
            <p class="gallery-title-value">${downloads}</p>
          </div>
        </li>
      </ul>
    </li>
  `
    )
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);
  showLoadMoreButton();
  lightbox.refresh();
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
}

export function showLoader() {
  loader.classList.add('is-visible');
}

export function hideLoader() {
  loader.classList.remove('is-visible');
}

export function showLoadMoreButton() {
  loadBtn.classList.replace('load-btn-hidden', 'load-btn');
}

export function hideLoadMoreButton() {
  loadBtn.classList.replace('load-btn', 'load-btn-hidden');
}
