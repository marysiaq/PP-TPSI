import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/user/';

class UserService {
  deleteUser(id){
    return axios.delete(API_URL + 'delete/'+id,{ headers: authHeader()}).then((response)=>{ return response}).catch((error)=>{return error.response});
  }
}

export default new UserService();
