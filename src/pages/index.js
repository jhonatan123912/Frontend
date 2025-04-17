'use client'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function LoginPage (){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const [error, setError] = useState(null)

    const handleLogin = async(e) => {
        e.preventDefault()
        const res = await fetch('/api/auth', {
            method: 'POST',
            headers: { 'Content-type' : 'application/json'},
            body: JSON.stringify({username, password})
        })

        const data = await res.json()
        if (data.success) {
            localStorage.setItem('token', data.token)
            router.push('/dashboard')
        } else {
            setError('Invalid Credentials'); // Corrected typo
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg"> 
                <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Login</h2> 
                <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-gray-800"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-gray-800"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 active:bg-blue-700 font-medium" // Added active state and font-medium
                    >
                        Submit
                    </button>
                </form>
                {error && (
                    <p className="text-red-500 mt-4 text-sm">{error}</p> // Display error message
                )}
            </div>
        </div>
    )
}