import { put } from '@vercel/blob';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { blobUrl, updatedData } = req.body;
        const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

        if (!blobUrl || !updatedData) {
            res.status(400).json({ message: 'Missing blobUrl or updatedData' });
            return;
        }

        try {
            const response = await put(blobUrl, updatedData, {
                headers: {
                    'Authorization': `Bearer ${blobToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                res.status(200).json({ message: 'JSON data updated successfully!' });
            } else {
                console.error(`Failed with status: ${response.status}`);
                const errorText = await response.text();
                console.error('Response error text:', errorText);
                res.status(response.status).json({ message: 'Failed to update JSON data.', error: errorText });
            }
        } catch (error) {
            console.error('Server error:', error);
            res.status(500).json({ message: 'Server error.', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
