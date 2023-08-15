import api, {API_URL} from "./fetchService";
import axios from "axios";

export default class AuthServices {
    static async login (email, password) {
        return api.post('/signin', {email, password} )
    }

    static async registration (email, password) {
        return api.post('/signup', {email, password} )
    }

    static async logout () {
        return api.post('/signout' )
    }

    static async checkAuth (){
        return axios.get(API_URL + '/refresh',{withCredentials:true})
    }
}