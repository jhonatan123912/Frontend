import EmployeeForm from "@/components/EmployeeForm"
import Layout from "@/components/Layout"
import { useRouter } from "next/router"

export default function CreateEmployee () {
    const router = useRouter()



    const handleSuccess = () => {
        router.push('/employees')
    }
    
    
    return (
        <Layout>
            <div>
                <h1 className="text-gray-700 text-3xl mx-auto">
                    Create Employee
                </h1>
                <EmployeeForm onSuccess={handleSuccess}/>
            </div>
        </Layout>
    )
}