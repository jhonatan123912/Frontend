'use client'
import Layout from '../components/Layout'
import Link from 'next/link'

export default function Dashboard () {
    

    return (
        <Layout>
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
                    Dashboard
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Quick Actions</h2>
                        <ul>
                            <li className="py-1"><Link href="/products" className="text-blue-500 hover:underline">Products</Link></li>
                            <li className="py-1"><Link href="/employees" className="text-blue-500 hover:underline">Employees</Link></li>
                        </ul>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Recent Activity</h2>
                        <p className="text-gray-600">No recent activity to display.</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Statistics</h2>
                        <p className="text-gray-600">Statistics will be shown here.</p>
                    </div>
                </div>
            </main>

        </Layout>
    )
}