import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/recipe/';

class RecipeService {
  getPublicContent(params) {
    return axios.get(API_URL + 'list/'+params).then((response)=>{ return response}).catch((error)=>{return error.response});
  }

  createRecipe(recipe) {
    return axios.post(API_URL + 'create', recipe,{ headers: authHeader()}).then((response)=>{ return response}).catch((error)=>{return error.response});
  }

  updateRecipe(recipe){
    return axios.put(API_URL + 'update',recipe, { headers: authHeader()}).then((response)=>{ return response}).catch((error)=>{return error.response});
  }

  getranking(){
    return axios.get(API_URL + 'getranking').then((response)=>{ return response}).catch((error)=>{return error.response});
  }
  getRecipeLikes(id){
    return axios.get(API_URL + 'getrecipelikes/'+id).then((response)=>{ return response}).catch((error)=>{return error.response});
  }
  deleteRecipe(id){
    return axios.delete(API_URL + 'delete/'+id,id,{ headers: authHeader()}).then((response)=>{ return response}).catch((error)=>{return error.response});
  }

  getRecipe(id){
    return axios.get(API_URL + 'get/'+id).then((response)=>{ return response}).catch((error)=>{return error.response});
  }
  getCategories(){
    return axios.get(API_URL + 'categories').then((response)=>{ return response}).catch((error)=>{return error.response});
  }
  getDifficulty(){
    return axios.get(API_URL + 'difficulty').then((response)=>{ return response}).catch((error)=>{return error.response});
  }

  uploadFile(formData){
    return axios.post(API_URL + 'uploadFile',formData,{ headers: authHeader()}).then((response)=>{ return response}).catch((error)=>{return error.response})
  }

  getFile(id){
    return axios.get(API_URL + 'getFile/'+id).then((response)=>{ return response}).catch((error)=>{return error.response})
  }
  deleteFile(id){
    return axios.delete(API_URL + 'deleteFile/'+id,id,{ headers: authHeader()}).then((response)=>{ return response}).catch((error)=>{return error.response})
  }
  likeRecipe(id){
    return axios.post(API_URL + 'like/'+id,id,{ headers: authHeader()}).then((response)=>{ return response}).catch((error)=>{return error.response})
  }

}

export default new RecipeService();