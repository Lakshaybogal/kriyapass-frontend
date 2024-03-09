'use client'
import React, { createContext, useState } from 'react'

interface User {
    username: string
    email: string
    first_name: string
    last_name: string
    phone_number: string
}

interface AuthContextType {
    auth: Auth | null
    setAuth: React.Dispatch<React.SetStateAction<Auth | null>>
}

interface Auth {
    user: User | null
    access_token: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC = ({ children }) => {
    const [auth, setAuth] = useState<Auth | null>(null)

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
