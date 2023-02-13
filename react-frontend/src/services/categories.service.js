import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/category/';

class CategoriesService {
    
    deleteCateogry(id){
        return axios.delete(API_URL +'delete/'+ id, { headers: authHeader()}).then((response)=>{ return response}).catch((error)=>{return error.response});
    }


    createCategory(cat){
        return axios.post(API_URL + 'create',cat,{ headers: authHeader()}).then((response)=>{ return response}).catch((error)=>{return error.response});
    }

    updateCategory(category){
        return axios.put(API_URL,category,{ headers: authHeader()}).then((response)=>{ return response}).catch((error)=>{return error.response});
    }

}
export default new CategoriesService();