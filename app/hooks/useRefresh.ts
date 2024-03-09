import { AxiosPrivate } from '../api/axios'
import useAuth from './useAuthContext'

const useRefresh = () => {
    const { auth, setAuth } = useAuth()

    const refresh = async () => {
        try {
            const response = await AxiosPrivate.get('/users/refresh')
            // Update the auth context with the new user data and access token
            setAuth((prev) => ({
                ...prev,
                user: response.data.data,
                access_token: response.data.access_token,
            }))
            // Update the Authorization header in Axios
            AxiosPrivate.defaults.headers.common['Authorization'] =
                `Bearer ${response.data.access_token}`
            return response.data
        } catch (error) {
            // Handle error
            console.error('Error refreshing token:', error)
            throw error
        }
    }
    return refresh
}

export default useRefresh
