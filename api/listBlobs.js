import { list } from '@vercel/blob';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
        try {
            const result = await list({
                headers: {
                    'Authorization': `Bearer ${blobToken}`
                }
            });
            res.status(200).json(result);
        } catch (error) {
            console.error('Error fetching blob list:', error);
            res.status(500).json({ message: 'Error fetching blob list.', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
