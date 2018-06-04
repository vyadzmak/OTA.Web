import axios from 'axios'

const http = axios.create({
  baseURL: `http://127.0.0.1:5000/`, // `http://31.31.219.178:81/`,
  auth: {
    username: 'cent_user',
    password: 'vPe0N9zb7bGK1Ng5'
  }
})

export default http
