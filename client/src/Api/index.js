import axios from 'axios';

axios.defaults.headers.common['x-apikey']= '626576aafcf9897eb1119eab';

const baseurl = 'https://petrospective-7d77.restdb.io/rest'

export const addNewRoom = (data)=>{
    return axios.post(`${baseurl}/rooms`, data);
}

export const getRoom = (room)=>{
    const searchOject = JSON.stringify({
     room_name: room
    })
    return axios.get(`${baseurl}/rooms?q=${searchOject}`);
}