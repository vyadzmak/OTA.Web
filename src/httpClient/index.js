import axios from 'axios'
export const baseIp = `http://127.0.0.1:5000` // 'https://api.ota24.kz' `http://127.0.0.1:5000` // `http://31.31.219.178:81` `http://78.140.223.111:81`
export const baseUrl = baseIp + '/'
const http = axios.create({
  baseURL: baseUrl,
  auth: {
    username: 'ota_user',
    password: 'vPe0N9zb7bGK1Ng5'
  }
})

export default http
