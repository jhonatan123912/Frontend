'use client'
import EmployeeForm from "@/components/EmployeeForm"
import Layout from "@/components/Layout"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

 

export default function EditEmployee () {
    const router = useRouter()
    const [ initialData, setInitialData ] = useState(null)
    const { id } = router.query

    useEffect(() => {
        if (id) {
            fetch(`/api/employee`)
            .then(res => res.json())
            .then(data => {
                const employee = data.data.find(item => item.id === Number(id))
                setInitialData(employee)
            })
        }
    }, [id])

    if (!initialData) {
        return <p>Loading....</p>
    }

    const handleSucess = () => {
        router.push('/employee')
        toast.success('The employee sucessfully updated')
    }



    return (
        <Layout>
            <h1 className="text-gray-700 text-3xl mx-auto">
                Edit Employee
            </h1>
            <EmployeeForm initialData={initialData} onSuccess={handleSucess}/>
        </Layout>
    )
}