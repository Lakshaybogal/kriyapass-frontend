import { AxiosPrivate } from '../api/axios'
import useAuth from './useAuthContext'
import { Auth } from '../context/AuthProvider'

const useRefresh = () => {
    const { setAuth } = useAuth()

    const refresh = async () => {
        try {
            const response = await AxiosPrivate.get('/refresh')
            // Update the auth context with the new user data and access token
            setAuth((prev: Auth | null) => ({
                ...prev,
                user: response.data.data,
                access_token: response.data.access_token,
            }))
            console.log('Refreshed token:')
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
