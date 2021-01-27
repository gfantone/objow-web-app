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
        var baseUrl = local.getTemporaryApiUrl()
        var token = local.getTemporaryAccessToken()

        if (!baseUrl) {
            baseUrl = local.getApiUrl()
        }

        if (!token) {
            token = local.getAccessToken()
        }

        config.url = baseUrl + config.url
        config.headers.common['Authorization'] = `Bearer ${token}`
        return config
    },
    error => Promise.reject(error)
)

instance.interceptors.response.use(
    undefined,
    error => {
        if (error.response.status == 403) {
            return forceLogout()
        }

        if (error.response.status != 401) {
            return Promise.reject(error)
        }

        if (error.response.status == 401 && error.config.url.endsWith('/token/')) {
            return {error}
        }

        var refreshToken = local.getTemporaryRefreshToken()
        var isTempToken = true

        if (!refreshToken) {
            refreshToken = local.getRefreshToken()
            isTempToken = false
        }
        if (!refreshToken) {
            return forceLogout()
        }

        return tokens.refresh(refreshToken).then(response => {
            if (!isTempToken) {
                local.setAccessToken(response.data.access)
            } else {
                local.setTemporaryAccessToken(response.data.access)
            }

            return new Promise(resolve => {
                var token = local.getTemporaryAccessToken()

                if (!token) {
                    token = local.getAccessToken()
                }

                error.config.headers.Authorization = `Bearer ${token}`
                return resolve(axios(error.config))
            })
        }).catch(() => {
            return forceLogout()
        })
    }
)

export default instance
