import axios from 'axios';

axios.defaults.headers.common['x-apikey']= process.env.VUE_APP_RESTDB_API_KEY;

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

export const getCommentsByRoomID = (room_id)=>{
    const searchObject = JSON.stringify({
     room_id
    })
    return axios.get(`${baseurl}/card?q=${searchObject}`);
}

export const updateRoom = (data, id)=>{
    return axios.put(`${baseurl}/rooms/${id}`, data);
}

export const deleteRoomByID = (id) => {
    return axios.delete(`${baseurl}/rooms/${id}`)
}