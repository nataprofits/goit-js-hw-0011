export function renderMarcup(images) {
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
      }) => `<div class="photo-card">
      <a href="${largeImageURL}" class="photo-card-link">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      <div class="info">
        <p class="info-img">${likes}
          <b>Likes</b>
        </p>
        <p class="info-img">${views}
          <b>Views</b>
        </p>
        <p class="info-img">${comments}
          <b>Comments</b>
        </p>
        <p class="info-img">${downloads}
          <b>Downloads</b>
        </p>
      </div>
      </a>
    </div>`
    )
    .join('');
  return markup;
}