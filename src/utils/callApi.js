import axios from "axios";

const CallApi = axios.create({
    baseURL: 'http://localhost:5000/api'
});

export default CallApi;