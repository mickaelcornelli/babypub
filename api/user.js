import axios from 'axios';
import {config} from '../config';

export const saveUser = (data)=>{
    return axios.post(config.api_url+"/api/v1/user/add", data)
            .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                return err;
            })
}

export const loginUser = (data)=>{
    return axios.post(config.api_url+"/api/v1/user/login", data)
            .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                return err;
            })
}

export const sendNotif = (data, token)=>{
    return axios.post(config.api_url+"/api/v1/notif", data, {headers: {'x-access-token': token}})
            .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                return err;
            })
}
