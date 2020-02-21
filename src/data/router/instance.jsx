import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})
instance.interceptors.response.use(
    undefined,
    error => {
        return { error }
    }
)

export default instance
