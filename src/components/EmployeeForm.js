'use client'
import { useState } from 'react'


export default function EmployeeForm ({ initialData = {}, onSuccess}) {
    const [name, setName] = useState( initialData.name||'')
    const [department, setDepartment] = useState( initialData.department||'')
    const [file, setFile] = useState(null)

    const handleSubmit = async(e) => {
        e.preventDefault()
        let imageUrl = initialData.image || ''
        if (file) {
            const formData = new FormData()
            formData.append('file', file)
            const uploadRes = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            })
            const uploadData = await uploadRes.json()
            imageUrl = uploadData.url
        }

        const payload = { name, department, image: imageUrl}
        const method = initialData.id ? 'PUT' : 'POST'
        const apiUrl = '/api/employee'
        const res = await fetch (apiUrl, { 
            method,
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(initialData.id ? {...payload, id: initialData.id} : payload)
        })
        if (res.ok) onSuccess();
        else {
            console.error("Error submitting form");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
        <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Employee Name:
            </label>
            <input
                type="text"
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
        <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
                Department:
            </label>
            <input
                type="text"
                id="department"
                value={department}
                onChange={e => setDepartment(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
        <div className="mb-4">
            <label htmlFor="file" className="block text-gray-700 text-sm font-bold mb-2">
                Upload Image:
            </label>
            <input
                type="file"
                id="file"
                onChange={e => setFile(e.target.files[0])}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
        <div className="flex items-center justify-between">
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Submit
            </button>
        </div>
    </form>
    )
}