import axios from 'axios';

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "39533166-9bd7aa608c643a8dc83511a02";

export default class ApiService {
  constructor() {
    this.searchQuery = "";
    this.page = 1;
    this.perPage = 40;
    this.totalPages = 0;
    this.totalImages = 0;
  }

  async fetchArticles() {
    const url = `${BASE_URL}?key=${API_KEY}&image_type=photo&orientation=horizontal&safesearch=true&q=${this.searchQuery}&page=${this.page}&per_page=${this.perPage}`;
    try {
      const response = await axios.get(url);
      const data = response.data;
      this.incrementPage();
      this.totalImages = data.totalHits;
      this.totalPages = Math.ceil(this.totalImages / this.perPage);
      console.log("data", data);
      console.log("page:", this.page);
      console.log("totalPages", this.totalPages);
      return data.hits;
    } catch (error) {
      console.log(error);
      throw new Error("An error occurred while fetching articles.");
    }
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
    
    
   