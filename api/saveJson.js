import { put, del } from '@vercel/blob';
import { list } from '@vercel/blob';

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        const { prefix, updatedData } = req.body;
        const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
        if (!prefix || !updatedData) {
            res.status(400).json({ message: 'Missing prefix or updatedData' });
            return;
        }
        try {
            const listResult = await list({
                headers: {
                    'Authorization': `Bearer ${blobToken}`
                }
            });
            const matchingBlobs = listResult.blobs.filter(blob => blob.pathname.startsWith(prefix));
            for (const blob of matchingBlobs) {
                await del(blob.url, {
                    headers: {
                        'Authorization': `Bearer ${blobToken}`
                    }
                });
            }
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
                res.status(200).json({ message: 'JSON data updated successfully!', url: result.url });
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
