const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "39533166-9bd7aa608c643a8dc83511a02";

export default class ApiService{
    constructor() {
        this.searchQuery = "";
        this.page = 1;
        this.totalPages = 0;
    }

fetchArticles() {
    const url = `${BASE_URL}?key=${API_KEY}&image_type=photo&orientation=horizontal&safesearch=true&q=${this.searchQuery}&page=${this.page}&per_page=40`;
    return fetch(url)
.then(resp => resp.json())
.then(data => {
      console.log(data);
      this.incrementPage();
    this.totalPages = data.totalHits;
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
    
    
    
   