// import axios from 'axios';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import ApiService from "./api";
  
// const BASE_URL = "https://pixabay.com/api/";
// const API_KEY = "39533166-9bd7aa608c643a8dc83511a02";
// axios.defaults.headers.common['x-api-key'] = API_KEY;

const gallery = document.querySelector(".gallery");
const search = document.querySelector("#search-form");
const loadMoreBtn = document.querySelector(".load-more");

const apiService = new ApiService();

search.addEventListener("submit", onSearch);
function onSearch(evt) {
  evt.preventDefault();
  gallery.innerHTML = "";
  apiService.query = evt.currentTarget.elements.searchQuery.value;
  apiService.resetPage();
  apiService.fetchArticles().then(createMarkup);
  
}


loadMoreBtn.addEventListener("click", onLoadMore);
function onLoadMore() {
  apiService.fetchArticles().then(createMarkup);

}

  function createMarkup(hits) {
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




































// старий код 
// // import axios from 'axios';

// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";

// const BASE_URL = "https://pixabay.com/api/";
// const API_KEY = "39533166-9bd7aa608c643a8dc83511a02";
// // axios.defaults.headers.common['x-api-key'] = API_KEY;

// const gallery = document.querySelector(".gallery");
// const search = document.querySelector("#search-form");
// const loadMore = document.querySelector(".load-more");

// let lightbox = new SimpleLightbox('.gallery a', {
//       captionDelay: 250,
//     });


// let currentPage = 1;

// search.addEventListener("submit", onSearch);
// function onSearch(evt) {
//     evt.preventDefault();
//     const { searchQuery } = evt.currentTarget.elements;
//     enterSearch(searchQuery.value, page=1)
//         .then((data) => gallery.insertAdjacentHTML("beforeend", createMarkup(data.hits)))
//         .catch((err) => console.log(err))
//         .finally(() => {
//       lightbox.refresh();
//     });
// }

// function enterSearch(enteredText, page=1) {
//     return fetch(`${BASE_URL}?key=${API_KEY}&image_type=photo&orientation=horizontal&safesearch=true&q=${enteredText}&page=${page}`)
//     .then(resp => {
//       if (!resp.ok) {
//       throw new Error(resp.statusText);
//     }
//         return resp.json();
//     })
// }

// loadMore.addEventListener("click", onLoad);
// function onLoad(page) {
//   currentPage += 1;
//   enterSearch(currentPage)
//   .then((data) => gallery.insertAdjacentHTML("beforeend", createMarkup(data.hits)))
//     .catch((err) => console.log(err))
//     .finally(() => {
//       lightbox.refresh();
//     })}

  


// function createMarkup(arr) {
//     return arr.map(({ downloads, comments, views, likes, tags, largeImageURL, webformatURL }) =>
//  `<a href="${largeImageURL}">
//  <div class="photo-card">
//   <img src="${webformatURL}" alt="${tags}" loading="lazy" width="264" height="180"/>
//   <div class="info">
//     <p class="info-item">
//       <b>Likes</b>${likes}
//     </p>
//     <p class="info-item">
//       <b>Views</b>${views}
//     </p>
//     <p class="info-item">
//       <b>Comments</b>${comments}
//     </p>
//     <p class="info-item">
//       <b>Downloads</b>${downloads}
//     </p>
//   </div>
// </div></a>`).join("")
// }



