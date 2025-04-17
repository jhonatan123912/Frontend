'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import { toast } from 'react-toastify'

export default function EmployeesList () {
    const [employees, setEmployees] = useState([])
    const [total, setTotal] = useState(0)
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [sort, setSort] = useState('')
    const pageSize = 10
    const [deletingId, setDeletingId] = useState(null)


    const fetchEmployees = async() => {
        try {
            const res = await fetch(`/api/employee?search=${search}&sort${sort}$page${page}&pageSize${pageSize}`)
            const data = await res.json()
            setEmployees(data.data)
            setTotal(data.total)
        } catch (error) {
            console.error(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchEmployees()
    }, [search, sort, page])


    const handleDelete = async(id, name) => {
        if (!confirm(`Are you sure want to delete ${name}`)) {
            return
        }

        setDeletingId(id)
        try {
            const response = await fetch(`api/employee`, {
                method: 'DELETE',
                headers: {
                    'Content-type' : 'application/json'
                }, 
                body: JSON.stringify({ id })
            })
            if (!response.ok) {
                const errData = await response.json()
                toast.error(errData || 'Failed to Delete Employee')
            } else {
                toast.success('Employee Delete Successfully')
                setEmployees(prev => prev.filter(emp => emp.id !== id))
                setTotal(prev => prev - 1)
            }

        } catch (error) {
         console.error(error)
         toast.error(error.message)   
        }finally{
            setDeletingId(null)
        }


    }



 
    return (
        <Layout>
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
                Employees
            </h1>
            <div className="flex justify-between items-center mb-6">
                <input
                    type='text'
                    placeholder='Search Products...'
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className='w-full md:w-1/3 p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:border-blue-500'
                />
                <div className="flex items-center space-x-4">
                    <select
                        onChange={e => setSort(e.target.value)}
                        value={sort}
                        className="p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
                    >
                        <option value=''>Sort By</option>
                        <option value='name'>Name</option>
                        <option value='department'>Department</option>
                    </select>
                    <Link href='/employees/create' className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline">
                        Create
                    </Link>
                </div>
            </div>
            <div className="overflow-x-auto"> 
                <table className="min-w-full border border-gray-300 shadow-md rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                ID
                            </th>
                            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Department
                            </th>
                            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {employees.map(emp => (
                            <tr key={emp.id}>
                                <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-500">{emp.id}</td>
                                <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-900">{emp.name}</td>
                                <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-500">{emp.department}</td>
                                <td className="py-3 px-4 whitespace-nowrap text-sm font-medium flex items-center gap-2">
                                    <Link href={`employees/${emp.id}`} className="text-blue-500 hover:text-blue-700">
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(emp.id, emp.name)}
                                        disabled={deletingId === emp.id}
                                        className={`font-bold ${deletingId === emp.id ? 'text-gray-400 cursor-not-allowed' : 'text-red-500 hover:text-red-700'}`}
                                        >
                                        {deletingId === emp.id ? 'Deleting…' : 'Delete'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {employees.length === 0 && (
                            <tr>
                                <td colSpan="4" className="py-4 px-4 text-center text-gray-500">No Employees found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between items-center mt-6">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className={`px-4 py-2 rounded-md ${
                        page === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white focus:outline-none focus:shadow-outline'
                    }`}
                >
                    Previous
                </button>
                <span>Page {page}</span>
                <button
                    disabled={page * pageSize >= total}
                    onClick={() => setPage(page + 1)}
                    className={`px-4 py-2 rounded-md ${
                        page * pageSize >= total
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-500 hover:bg-blue-700 text-white focus:outline-none focus:shadow-outline'
                    }`}
                >
                    Next    
                </button>
            </div>
        </main>
    </Layout>
    )
}