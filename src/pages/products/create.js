import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import { useRouter } from "next/router";

export default function CreateProduct () {
    const router = useRouter()

    const handleSuccess = () => {
        router.push('/products')
    }

    return (
        <Layout>
            <div>
                <h1 className="text-gray-700 text-3xl mx-auto">Create Product</h1>
                <ProductForm onSuccess={handleSuccess}/>
            </div>
        </Layout>
    )
}