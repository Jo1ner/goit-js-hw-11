// import axios from 'axios';

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "39533166-9bd7aa608c643a8dc83511a02";

export default class ApiService{
    constructor() {
        this.searchQuery = "";
        this.page = 1;
        this.perPage = 40;
    }

fetchArticles() {
    const url = (`${BASE_URL}?key=${API_KEY}&image_type=photo&orientation=horizontal&safesearch=true&q=${this.searchQuery}&page=${this.page}&per_page=${this.perPage}`);
    return fetch(url)
.then(resp => resp.json())
.then(data => {
    console.log(data);
    console.log("apiService.page:", this.page);
    console.log("apiService.totalPages:", this.totalPages);
    console.log("apiService.totalImages:", this.totalImages)
    this.incrementPage();
    this.hits = data.hits;
    this.totalImages = data.totalHits;
    this.totalPages =  Math.ceil(this.totalImages / this.perPage);
      return data.hits;
})
    } 
incrementPage() {
    this.page += 1;
}

resetPage() {
    this.page = 1;
}

get query() {
    return this.searchQuery;
    }

set query(newQuery) {
    this.searchQuery = newQuery;
    }
}
    
    
    
   