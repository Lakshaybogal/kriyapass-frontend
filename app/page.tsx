// Import necessary modules
'use client'
import { useState, ChangeEvent, useEffect } from 'react'
import useAxiosPrivate from './hooks/useAxiosPrivate'
import useAuthContext from './hooks/useAuthContext'
import useRefresh from './hooks/useRefresh'

// Define the type for the user object

// Define the type for the login form state
interface LoginForm {
    email: string
    password: string
}

export default function Home() {
    // Use the user and setUser from the context
    const { auth, setAuth } = useAuthContext()
    const axios = useAxiosPrivate()
    const refresh = useRefresh()

    useEffect(() => {
        const fetchData = async () => {
            try {
                await refresh() // Call the refresh function to get the updated token
            } catch (error) {
                console.error('Error refreshing token:', error)
            }
        }
        fetchData() // Call the fetchData function inside useEffect
    }, [])
    // State variables for the login form
    const [loginForm, setLoginForm] = useState<LoginForm>({
        email: '',
        password: '',
    })
    const [error, setError] = useState<string>('')

    // Function to handle form input change
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setLoginForm({ ...loginForm, [name]: value })
    }

    // Function to handle login
    const handleLogin = async () => {
        // Send a POST request to the login endpoint
        const response = await axios.post('/users/login', loginForm, {
            withCredentials: true, // Include credentials in the request
        })
        // Update the user context with the logged-in user data
        console.log(response.data)
        setAuth({
            ...auth,
            access_token: response.data.access_token,
            user: response.data.data,
        })
        // Clear the login form fields
        setLoginForm({ email: '', password: '' })
    }

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <h1>Welcome to the Home Page</h1>
            {/* Display the logged-in user's information */}
            {auth?.user ? (
                <div>
                    <p>
                        Hello {auth.user.first_name} {auth.user.last_name}!
                    </p>
                    <button onClick={() => setAuth(null)}>Logout</button>
                </div>
            ) : (
                <div className="flex flex-col gap-2">
                    <input
                        type="text"
                        name="email" // Change "username" to "email"
                        placeholder="Email" // Adjust the placeholder if necessary
                        value={loginForm.email}
                        onChange={handleChange}
                    />
                    <input
                        className="text-black"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={loginForm.password}
                        onChange={handleChange}
                    />
                    <button onClick={handleLogin}>Login</button>
                    {error && <p>{error}</p>}
                </div>
            )}
            <button onClick={() => refresh()}>REfresh</button>
        </main>
    )
}
