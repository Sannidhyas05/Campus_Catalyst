const { default: axios } = require("axios");



const clientServer = axios.create({
  baseURL: "http://localhost:9080",
  withCredentials: true,
});