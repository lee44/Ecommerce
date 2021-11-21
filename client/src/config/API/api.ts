import axios from 'axios'

export const axios_api = axios.create({
  withCredentials: true,
  	headers: { "Content-Type": "application/json" },

})