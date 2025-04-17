export default function handler (req, res) {
    if (req.method === 'POST') {
        const { username, password} = req.body
        if (username === 'admin' && password === 'password') {
            return res.status(200).json({ success: true, token: 'mockToken123'})
        }
        return res.status(401).json({ success: false, message: 'Invalid Credential'})
    }
    res.status(405).end()
}