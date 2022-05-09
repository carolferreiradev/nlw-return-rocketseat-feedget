import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
export const apiCocktail = axios.create({
  baseURL: "https://www.thecocktaildb.com/api/json/v1/1/",
});
