import axios from 'axios';
import {config} from '../config';


export const savePub = (data, token)=>{
    return axios.post(config.api_url+"/api/v1/pub/add", data, {headers: {'x-access-token': token}})
            .then((res)=>{
                return res.data;
            })
            .catch((err)=>{
                console.log(err);
            })
}

export const getAllPubs = (token)=>{
    return axios.get(config.api_url+"/api/v1/pub/all", {headers: {'x-access-token': token}})
            .then((res)=>{
                return res.data;
            })
            .catch((err)=>{
                console.log(err);
            })
} 

export const getPubWithFilters = (data, token)=>{
    return axios.post(config.api_url+"/api/v1/pub/getPubWithFilters", data, {headers: {'x-access-token': token}})
            .then((res)=>{
                return res.data;
            })
            .catch((err)=>{
                console.log(err);
            })
}

export const deletePub = (id, token)=>{
    return axios.delete(config.api_url+'/api/v1/pub/delete/'+id, {headers: {'x-access-token': token}})
            .then((res)=>{
                return res.data;
            })
            .catch((err)=>{
                console.log(err);
            })
}

export const getOnePub = (id, token)=>{
    return axios.get(config.api_url+"/api/v1/pub/one/"+id, {headers: {'x-access-token': token}})
            .then((res)=>{
                return res.data;
            })
            .catch((err)=>{
                console.log(err);
            })
} 


export const editPub = (id, data, token)=>{
    return axios.put(config.api_url+"/api/v1/pub/update/"+id, data, {headers: {'x-access-token': token}})
            .then((res)=>{
                return res.data;
            })
            .catch((err)=>{
                console.log(err);
            })
}