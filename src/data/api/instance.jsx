import axios from 'axios'
import local from '../local/local'
import tokens from './endpoints/tokens'

const forceLogout = () => {
    localStorage.clear()
    window.location = '/'
}

const instance = axios.create()
instance.interceptors.request.use(
    config => {
        const baseUrl = local.getApiUrl()
        config.url = baseUrl + config.url
        config.headers.common['Authorization'] = `Bearer ${local.getAccessToken()}`
        return config
    },
    error => Promise.reject(error)
)
instance.interceptors.response.use(
    undefined,
    error => {
        if (error.response.status == 403) return forceLogout()
        if (error.response.status != 401) return Promise.reject(error)
        if (error.response.status == 401 && error.config.url.endsWith('/token/')) return { error }
        const refreshToken = local.getRefreshToken()
        if (!refreshToken) return forceLogout()
        return tokens.refresh(refreshToken).then(response => {
            local.setAccessToken(response.data.access)
            return new Promise(resolve => {
                error.config.headers.Authorization = `Bearer ${local.getAccessToken()}`
                return resolve(axios(error.config))
            })
        }).catch(() => {
            return forceLogout()
        })
    }
)

export default instance