import axios from 'axios'
export const baseUrl = `http://127.0.0.1:5000/`// `http://31.31.219.178:82/`
const http = axios.create({
  baseURL: baseUrl,
  auth: {
    username: 'cent_user',
    password: 'vPe0N9zb7bGK1Ng5'
  }
})

export default http
