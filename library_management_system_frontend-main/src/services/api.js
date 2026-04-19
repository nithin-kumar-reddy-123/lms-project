import axios from "axios";

const API = axios.create({
 baseURL: "https://lms-project-3x30.onrender.com/api"
});

export default API;