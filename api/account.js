import { list, del, put } from '@vercel/blob';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const { mode, username, password, region } = req.body;
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

    if (!mode || !username) {
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        const listResult = await list({
            headers: { 'Authorization': `Bearer ${blobToken}` }
        });

        const playerstatBlob = listResult.blobs.find(blob => blob.pathname.endsWith('playerstat.json'));
        const pendingBlob = listResult.blobs.find(blob => blob.pathname.endsWith('pending.json'));

        if (!playerstatBlob) return res.status(404).json({ message: 'playerstat.json not found.' });

        const playerData = await fetch(playerstatBlob.url).then(res => res.json());
        let players = Array.isArray(playerData) ? playerData : [];

        if (mode === 'login') {
            const user = players.find(p => p.name === username && p.password === password);
            if (!user) return res.status(401).json({ message: 'Invalid username or password.' });

            return res.status(200).json({ message: 'Login successful!', user });
        }

        if (mode === 'register') {
            if (!password || !region) {
                return res.status(400).json({ message: 'Missing password or region.' });
            }

            const userExists = players.some(p => p.name === username);
            if (userExists) {
                return res.status(409).json({ message: 'Username already exists.' });
            }

            // Fetch current pending data
            let pending = [];
            if (pendingBlob) {
                const pendingData = await fetch(pendingBlob.url).then(res => res.json());
                pending = Array.isArray(pendingData) ? pendingData : [];
            }

            // Add user to pending if not already there
            if (!pending.some(p => p.name === username)) {
                pending.push({ name: username, password, region });
            }

            // Clean up existing pending.json blobs
            const pendingPrefix = 'pending';
            const matchingPendingBlobs = listResult.blobs.filter(blob => blob.pathname.startsWith(pendingPrefix));
            for (const blob of matchingPendingBlobs) {
                await del(blob.url, {
                    headers: { 'Authorization': `Bearer ${blobToken}` }
                });
            }

            // Upload fresh pending.json
            const pendingUpload = await put(`${pendingPrefix}.json`, JSON.stringify(pending, null, 2), {
                headers: {
                    'Authorization': `Bearer ${blobToken}`,
                    'Content-Type': 'application/json',
                },
                access: 'public',
            });

            if (pendingUpload.url) {
                return res.status(200).json({ message: 'Registration pending! Join the game to verify.', url: pendingUpload.url });
            } else {
                return res.status(500).json({ message: 'Failed to update pending.json.' });
            }
        }

        return res.status(400).json({ message: 'Invalid mode.' });

    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ message: 'Server error.', error: error.message });
    }
}
