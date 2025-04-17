'use client'
import { useRouter } from 'next/router';

export default function Layout ({ children }) {
    const router = useRouter()

    const handleLogout = () => {
        localStorage.removeItem('token')
        router.push('/')
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow py-4">
                <div className="container mx-auto px-4 flex justify-end items-center">
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Logout
                    </button>
                </div>
            </nav>
        {children}           
        </div>
    )
}