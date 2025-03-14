// src/services/apiService.js
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api"; // Update based on Django URL

const apiService = {
  postBeamData: async (data) => {
    const response = await axios.post(`${API_BASE_URL}/beam-column/`, data);
    return response.data;
  },
};

export default apiService;
