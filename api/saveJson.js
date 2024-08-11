import {
    put
} from '@vercel/blob';

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        const {
            blobUrl,
            updatedData
        } = req.body;
        const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

        // Keep the original blobKey (the entire path after the domain)
        const blobKey = new URL(blobUrl).pathname.substring(1); // Remove leading slash

        if (!blobKey || !updatedData) {
            res.status(400).json({
                message: 'Missing blobKey or updatedData'
            });
            return;
        }

        try {
            const parsedData = JSON.parse(updatedData);
            console.log(blobKey);
            const result = await put(blobKey, JSON.stringify(parsedData), {
                headers: {
                    'Authorization': `Bearer ${blobToken}`,
                    'Content-Type': 'application/json',
                },
                access: 'public',
            });

            if (result.url) {
                console.log(blobKey);
                console.log('JSON data updated successfully:', result.url);
                res.status(200).json({
                    message: 'JSON data updated successfully!'
                });
            } else {
                console.error('Failed to update JSON data. Result:', result);
                res.status(500).json({
                    message: 'Failed to update JSON data.'
                });
            }
        } catch (error) {
            console.error('Server error:', error);
            res.status(500).json({
                message: 'Server error.',
                error: error.message
            });
        }
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}