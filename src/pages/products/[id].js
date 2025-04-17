'use client'

import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
export default function EditProduct () {
    const router = useRouter()
    const { id } = router.query
    const [ initialData, setInitialData ] = useState(null)


    useEffect(() => {
        if (id) {
            fetch(`/api/product`)
            .then(res => res.json())
            .then(data => {
                const product = data.data.find(item => item.id === Number(id))
                setInitialData(product)
            })
        }
    }, [id])

    if (!initialData) {
        return <p>Loading...</p>
    }



    const handleSuccess = () => {
        router.push('/products')
        toast.success('The product successfully updated')
    }




    return (
        <Layout>
                <h1 className="text-gray-700 text-3xl mx-auto">Edit Product</h1>
                <ProductForm initialData={initialData} onSuccess={handleSuccess}/>
                
        </Layout>
    )
}