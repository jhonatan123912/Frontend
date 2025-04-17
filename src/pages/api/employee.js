let employees = [
    {id: 1,  name: 'Adi', department: 'Marketing', avatar: ''},
    {id: 2,  name: 'Sara', department: 'IT', avatar: ''}
]

export default function handler (req, res) {
    const { method } = req

    if (method === 'GET') {
        let result = [...employees]
        const { search, sort, filter, page = 1, pageSize = 10} = req.query

        if (search) {
            result = result.filter(emp => emp.name.toLowerCase().includes(search.toLowerCase()))
        } else if (sort) {
            result = result.sort((a, b) => (a[sort] > b[sort] ? 1 : -1))
        } else if (filter) {
            result = result.filter(emp => emp.department === filter)
        }

        const startIndex = (page - 1) * pageSize
        const paginatedResult = result.slice(startIndex, startIndex + Number(pageSize))

        return res.status(200).json({ data: paginatedResult, total: result.length})
    }

    if (method === 'POST') {
        const { name, department } = req.body
        const id = employees.length + 1
        const newEmployee = { id, name, department, image: ''}
        employees.push(newEmployee)
        return res.status(200).json({ data: newEmployee})
    }

    if (method === 'PUT') {
        const { id, name, department } = req.body
        employees = employees.map(emp => 
            emp.id === Number(id) ? { ...emp, name, department} : emp
        )

        return res.status(200).json({ success: true})
    }

    if (method === 'DELETE') {
        const { id } = req.body
        employees = employees.filter(emp => emp.id !== Number(id))
        return res.status(200).json({ success: true })
    }
}