'use client'
import Link from 'next/link'
import useAuthContext from '../hooks/useAuthContext'
import useRefresh from '../hooks/useRefresh'
import { useEffect } from 'react'

const Navbar: React.FC = () => {
    const { auth } = useAuthContext()
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

        return () => {
            console.log('Component unmounted. Cleanup logic executed.')
        }
    }, [])

    return (
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Link href="/">
                                <span className="cursor-pointer font-bold text-white">
                                    Navbar
                                </span>
                            </Link>
                        </div>
                        <div className="ml-10 hidden space-x-4 md:flex ">
                            <NavItem href="/" label="Home" />
                            <NavItem
                                href="/events/yourevents"
                                label="Your Events"
                            />
                            <NavItem href="/pricing" label="Pricing" />
                            <NavItem href="#" label="Disabled" />
                        </div>
                    </div>
                    <div className="hidden md:flex">
                        {auth?.user ? (
                            <>
                                <NavItem href="/dashboard" label="Dashboard" />
                                <NavItem
                                    href="/projfile"
                                    label={auth?.user.first_name}
                                />
                            </>
                        ) : (
                            <>
                                <NavItem href="/login" label="Login" />
                                <NavItem href="/register" label="Register" />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

interface NavItemProps {
    href: string
    label: string
}

const NavItem: React.FC<NavItemProps> = ({ href, label }) => {
    return (
        <Link href={href}>
            <span className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                {label}
            </span>
        </Link>
    )
}

export default Navbar
