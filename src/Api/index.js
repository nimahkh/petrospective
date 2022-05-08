import axios from 'axios';

axios.defaults.headers.common['x-apikey']= '626576aafcf9897eb1119eab';

const baseurl = 'https://petrospective-7d77.restdb.io/rest'

export const addNewRoom = (data)=>{
    return axios.post(`${baseurl}/rooms`, data);
}

export const addNewComment = (data)=>{
    return axios.post(`${baseurl}/card`, data);
}

export const getRoom = (room)=>{
    const searchObject = JSON.stringify({
     room_name: room
    })
    return axios.get(`${baseurl}/rooms?q=${searchObject}`);
}

export const getRoomByID = (id)=>{
    const searchObject = JSON.stringify({
     _id: id
    })
    return axios.get(`${baseurl}/rooms?q=${searchObject}`);
}

export const updateRoom = (data, id)=>{
    return axios.put(`${baseurl}/rooms/${id}`, data);
}