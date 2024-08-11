import { put, del } from '@vercel/blob';

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        const { blobUrl, updatedData } = req.body;
        const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

        if (!blobUrl || !updatedData) {
            res.status(400).json({ message: 'Missing blobUrl or updatedData' });
            return;
        }

        try {
            // Step 1: Delete the original blob
            await del(blobUrl, {
                headers: {
                    'Authorization': `Bearer ${blobToken}`
                }
            });

            // Step 2: Put the new data into the blob with the exact same blobKey
            const parsedData = JSON.parse(updatedData);
            const blobKey = new URL(blobUrl).pathname.slice(1); // Extract the exact blobKey

            const result = await put(blobKey, JSON.stringify(parsedData), {
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
