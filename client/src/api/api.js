import axios from "axios";

const API_URL = "https://api-of-administration.onrender.com/api/";

export const fetchProducts = () => axios.get(`${API_URL}productos`);
export const updateStock = (id, stock) =>
  axios.patch(`${API_URL}producto/${id}`, { stock });
