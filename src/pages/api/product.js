let products = [
    { id : 1, name: 'Product One', price: 100, image: ''},
    { id : 2, name: 'Product Two', price: 200, image: ''}   
]

export default function handler (req, res) {
   const { method } = req

    if (method === 'GET') {
        let result = [...products]
        const { search, sort, filter,page = 1, pageSize = 10} = req.query
    
        if (search) {
            result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
        } else if (sort) {
            result = result.sort((a, b) => {
                a[sort] > b[sort] ? 1 : -1
            })
        } else if (filter) {
        }
    
        const startIndex = (page - 1) * pageSize
        const paginatedResult = result.slice(startIndex, startIndex + Number(pageSize))
    
        return res.status(200).json({ data: paginatedResult, total: result.length})
    } 

    if (method === 'POST') {
        const { name, price } = req.body
        const id = products.length + 1  
        const newProduct = { id, name, price, image: ''}
        products.push(newProduct)
        return res.status(201).json({ data: newProduct})
    }   

    if (method === 'PUT') {
        const { id, name, price } = req.body
        products = products.map(prod => 
            prod.id === Number(id) ? { ...prod, name, price} : prod
        )
        return res.status(200).json({ success: true})
    }

    if (method === 'DELETE') {
        const { id } = req.body
        products = products.filter(prod => prod.id !== Number(id))
        return res.status(200).json({ success: true })
    }

    res.setHeader('Allow', ['GET', 'PUT', 'DELETE', 'POST'])
    res.status(405).end(`Method${method} Not Allowed`)
    
}