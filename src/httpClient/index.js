import axios from 'axios'
export const baseUrl = `http://127.0.0.1:5000/` // `http://127.0.0.1:5000/` // `http://31.31.219.178:81/` `http://78.140.223.111:81/`
const http = axios.create({
  baseURL: baseUrl,
  auth: {
    username: 'ota_user',
    password: 'vPe0N9zb7bGK1Ng5'
  }
})

export default http
