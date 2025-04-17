
export default function handler(req, res) {
  if (req.method === 'POST') {
    return res.status(200).json({ url: '/uploads/mock-file.png'})
  }
  res.status(405).end()
}
