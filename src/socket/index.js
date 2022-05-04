console.log("Socket")
const evtSource = new EventSource('https://petrospective-7d77.restdb.io/realtime?apikey=626576aafcf9897eb1119eab');

const socket = {
    post(){
        evtSource.addEventListener('post', function (e) {
            const {data} = e;
            return JSON.parse(data)?.data;
        }, false);
    },
    put(){
        evtSource.addEventListener('put', function (e) {
            const {data} = e;
            return data;
        }, false);
    },
    publish(){
        evtSource.addEventListener('publish', function (e) {
            const {data} = e;
            return data;
        }, false);
    },
}

export default evtSource;