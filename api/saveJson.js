import { put } from '@vercel/blob';

export default async function handler(req, res) {
    if (req.method === 'PUT') { // Changed to PUT
        const { blobUrl, updatedData } = req.body;
        const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

        // Extract the key from the blobUrl
        const blobKey = blobUrl.split('/').pop();

        if (!blobKey || !updatedData) {
            res.status(400).json({ message: 'Missing blobKey or updatedData' });
            return;
        }

        try {
            // Parse updatedData to ensure it's a valid JSON object
            const parsedData = JSON.parse(updatedData);

            // Perform the PUT operation to update the blob
            const result = await put(blobKey, JSON.stringify(parsedData), {
                headers: {
                    'Authorization': `Bearer ${blobToken}`,
                    'Content-Type': 'application/json',
                },
                access: 'public', // Ensure the blob remains publicly accessible
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
        res.setHeader('Allow', ['PUT']); // Ensure only PUT is allowed
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
