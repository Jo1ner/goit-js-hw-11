
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import ApiService from "./api";

const gallery = document.querySelector(".gallery");
const search = document.querySelector("#search-form");
const loadMoreBtn = document.querySelector(".load-more");

const apiService = new ApiService();
loadMoreBtn.classList.add("visually-hidden");

search.addEventListener("submit", onSearch);
function onSearch(evt) {
  evt.preventDefault();
  gallery.innerHTML = "";
  apiService.query = evt.currentTarget.elements.searchQuery.value;
  if (!apiService.query.trim()) {
    Notiflix.Notify.failure("The search field is empty");
    return;
  };
  apiService.resetPage();
  apiService.fetchArticles()
    .then(hits => {
      createMarkup(hits);
      if (apiService.totalPages) {
        Notiflix.Notify.success(`Hooray! We found ${apiService.totalPages} images.`);
      }
        else {
        Notiflix.Notify.failure("Sorry, nothing was found for your request");
        loadMoreBtn.classList.add("visually-hidden");
        return
      }
    }
    
  )
  loadMoreBtn.classList.add("visually-hidden");
}

loadMoreBtn.addEventListener("click", onLoadMore);
function onLoadMore() {
  apiService.fetchArticles().then(createMarkup);
}

function createMarkup(hits) {
 if (apiService.page !== apiService.totalPages) {
    loadMoreBtn.classList.remove("visually-hidden");
  };
  const markup = hits.reduce((acc, hit) => {
    const { likes, views, comments, downloads, largeImageURL, webformatURL, tags } = hit;
    return `${acc}
    <a href="${largeImageURL}">
    <div class="photo-card">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" width="264" height="180" />
      <div class="info">
        <p class="info-item">
          <b>Likes:</b> ${likes}
        </p>
        <p class="info-item">
          <b>Views:</b> ${views}
        </p>
        <p class="info-item">
          <b>Comments:</b> ${comments}
        </p>
        <p class="info-item">
          <b>Downloads:</b> ${downloads}
        </p>
      </div>
    </div>
    </a>`;
  }, "");
  
    gallery.insertAdjacentHTML("beforeend", markup);
     const lightbox = new SimpleLightbox('.gallery a', {
      captionDelay: 250,
  })
  lightbox.refresh();
}

