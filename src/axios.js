import axios from "axios";

const instance = axios.create({
    baseURL:"https://restro-backend-e24-render.onrender.com/"
});

export default instance;