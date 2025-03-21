import axios from "axios";



export const clientServer = axios.create({
  baseURL: "http://localhost:9080",
  headers: {
    "Content-type": "application/json"
  }
});