const evtSource = new EventSource(`https://petrospective-7d77.restdb.io/realtime?apikey=${process.env.VUE_APP_RESTDB_API_KEY}`);
console.log("Install Socket!");
export default evtSource;