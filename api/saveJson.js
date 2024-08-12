import { put, del } from '@vercel/blob';

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        const { blobUrl, prefix, updatedData } = req.body;
        const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

        if (!blobUrl || !prefix || !updatedData) {
            res.status(400).json({ message: 'Missing blobUrl, prefix, or updatedData' });
            return;
        }

        try {
            await del(blobUrl, {
                headers: {
                    'Authorization': `Bearer ${blobToken}`
                }
            });

            const parsedData = JSON.parse(updatedData);
            const newBlobKey = `${prefix}.json`;

            const result = await put(newBlobKey, JSON.stringify(parsedData), {
                headers: {
                    'Authorization': `Bearer ${blobToken}`,
                    'Content-Type': 'application/json',
                },
                access: 'public',
            });

            if (result.url) {
                console.log('JSON data updated successfully:', result.url);
                res.status(200).json({ message: 'JSON data updated successfully!' });
            } else {
                console.error('Failed to update JSON data. Result:', result);
                res.status(500).json({ message: 'Failed to update JSON data.' });
            }
        } catch (error) {
            console.error('Server error:', error);
            res.status(500).json({ message: 'Server error.', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
