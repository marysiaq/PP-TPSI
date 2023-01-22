import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/ingredient/';

class IngredientService {
    getIngredientList(ids) {
        //return axios.post(API_URL +'list',{ids:ids});
        return axios.post(API_URL + 'list', ids).then((response)=>{ return response}).catch((error)=>{return error.response});
      }
    getUnits(){
        return axios.get(API_URL + 'units').then((response)=>{ return response}).catch((error)=>{return error.response});
    }

    getIngredient(id){
        return axios.get(API_URL + id,{ headers: authHeader()}).then((response)=>{ return response}).catch((error)=>{return error.response});
    }
    deleteIngredient(id){
        return axios.delete(API_URL + id, id,{ headers: authHeader()}).then((response)=>{ return response}).catch((error)=>{return error.response});
    }

    updateIngredient(ingredient){
        return axios.put(API_URL,ingredient,{ headers: authHeader()}).then((response)=>{ return response}).catch((error)=>{return error.response});
    }
    createIngredient(ingredient){
        return axios.post(API_URL + 'create',ingredient,{ headers: authHeader()}).then((response)=>{ return response}).catch((error)=>{return error.response});
    }


}
export default new IngredientService();