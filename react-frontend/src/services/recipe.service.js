import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/recipe/';

class RecipeService {
  getPublicContent() {
    return axios.get(API_URL + 'list');
  }

  createRecipe(recipe) {
    return axios.post(API_URL + 'create', { headers: authHeader(), body:JSON.stringify(recipe)});
  }

}

export default new RecipeService();