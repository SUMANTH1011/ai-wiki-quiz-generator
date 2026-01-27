import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-wiki-quiz-generator-backend-pzys.onrender.com",
});

export default api;
