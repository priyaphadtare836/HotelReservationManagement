import axios from "axios";
const api = axios.create({
    baseURL: 'https://hotelreservationmanagement-backend.onrender.com'
});
export default api;
