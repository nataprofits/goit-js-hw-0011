import refs from './refs';
import { getImages } from './getImages';
import { renderMarcup } from './renderMarcup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { slowScrolling } from './slowScrolling';

let page = 1;
let lightBox = new SimpleLightbox('.photo-card-link', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 300,
});

let options = {
  root: null,
  rootMargin: '100px',
  threshold: 1.0,
};

let observer = new IntersectionObserver(onLoadMoreClick, options);

export async function onSubmit(evt) {
  evt.preventDefault();
  page = 1;
  refs.gallery.innerHTML = '';

  try {
    const resp = await getImages();
    if (resp.data.total === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      Notify.success(`Hooray! We found ${resp.data.totalHits} images.`);
      refs.gallery.insertAdjacentHTML(
        'beforeend',
        renderMarcup(resp.data.hits)
      );
      observer.observe(refs.target);
      lightBox.refresh();
      slowScrolling();
    }
  } catch (error) {
    console.log(error);
  }
}

export async function onLoadMoreClick(entries, observer) {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      page += 1;

      try {
        const resp = await getImages(page);
        if (page * 40 > resp.data.totalHits) {
          observer.unobserve(refs.target);
          Notify.info(
            "We're sorry, but you've reached the end of search results."
          );
          return;
        }
        refs.gallery.insertAdjacentHTML(
          'beforeend',
          renderMarcup(resp.data.hits)
        );
        lightBox.refresh();
        slowScrolling();
      } catch (error) {
        console.error(error);
        Notify.failure('Failed to load more images. Please try again later.');
      }
    }
  }
}