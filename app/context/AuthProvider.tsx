'use client'
import React, {
    createContext,
    useState,
    ReactNode,
    Dispatch,
    SetStateAction,
} from 'react'

interface User {
    username: string
    email: string
    first_name: string
    last_name: string
    phone_number: string
}

export interface Auth {
    user: User | null
    access_token: string | null
}

export interface AuthContextType {
    auth: Auth | null
    setAuth: Dispatch<SetStateAction<Auth>>
}

const initialAuthState: Auth = {
    user: null,
    access_token: null,
}

export const AuthContext = createContext<AuthContextType>({
    auth: initialAuthState,
    setAuth: () => {},
})

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [auth, setAuth] = useState<Auth>(initialAuthState)

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}
