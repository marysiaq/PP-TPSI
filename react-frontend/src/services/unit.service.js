import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/unit/';

class UnitService {
    
  


    createUnit(unit){
        return axios.post(API_URL + 'create',unit,{ headers: authHeader()}).then((response)=>{ return response}).catch((error)=>{return error.response});
    }

    updateUnit(unit){
        return axios.put(API_URL,unit,{ headers: authHeader()}).then((response)=>{ return response}).catch((error)=>{return error.response});
    }

}
export default new UnitService();