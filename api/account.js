import { list, put, del } from '@vercel/blob';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { mode, username, password, region } = req.body;
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

    if (!mode || !username) {
        return res.status(400).json({ message: 'Missing fields' });
    }

    try {
        const listResult = await list({
            headers: { 'Authorization': `Bearer ${blobToken}` }
        });

        const playerstatBlob = listResult.blobs.find(blob => blob.pathname.endsWith('playerstat.json'));
        const pendingBlob = listResult.blobs.find(blob => blob.pathname.endsWith('pending.json'));

        if (!playerstatBlob) return res.status(404).json({ message: 'playerstat.json not found' });

        const playerData = await fetch(playerstatBlob.url).then(res => res.json());
        let players = Array.isArray(playerData) ? playerData : [];

        if (mode === 'login') {
            const user = players.find(p => p.name === username && p.password === password);
            if (!user) return res.status(401).json({ message: 'Invalid username or password' });
            return res.status(200).json({ message: 'Login successful', user });
        }

        if (mode === 'register') {
            if (!password || !region) return res.status(400).json({ message: 'Missing password or region' });

            const userExists = players.some(p => p.name.toLowerCase() === username.toLowerCase());
            if (userExists) return res.status(409).json({ message: 'Username already exists' });

            let pending = [];
            if (pendingBlob) {
                const pendingData = await fetch(pendingBlob.url).then(res => res.json());
                pending = Array.isArray(pendingData) ? pendingData : [];
            }

            pending.push({ name: username, password, region });

            // ⛔ DELETE old pending.json first
            const matchingPendingBlobs = listResult.blobs.filter(blob => blob.pathname.startsWith('pending'));
            for (const blob of matchingPendingBlobs) {
                await del(blob.url, {
                    headers: { 'Authorization': `Bearer ${blobToken}` }
                });
            }

            // ✅ Upload fresh pending.json
            await put('pending.json', JSON.stringify(pending, null, 2), {
                headers: {
                    'Authorization': `Bearer ${blobToken}`,
                    'Content-Type': 'application/json',
                },
                access: 'public',
            });

            return res.status(202).json({ message: 'Pending verification. Please join the game to verify!' });
        }

        if (mode === 'verify') {
            if (!pendingBlob) return res.status(404).json({ message: 'pending.json not found' });
        
            const pendingData = await fetch(pendingBlob.url).then(res => res.json());
            const pending = Array.isArray(pendingData) ? pendingData : [];
        
            const pendingUser = pending.find(p => p.name === username);
            if (!pendingUser) return res.status(404).json({ message: 'No pending registration for this username' });
        
            // Add to playerstat
            players.push({ ...pendingUser, beaten: [] });
        
            // Remove verified player from pending list
            const updatedPending = pending.filter(p => p.name !== username);
        
            // Delete old pending.json
            const matchingPendingBlobs = listResult.blobs.filter(blob => blob.pathname.startsWith('pending'));
            for (const blob of matchingPendingBlobs) {
                await del(blob.url, {
                    headers: { 'Authorization': `Bearer ${blobToken}` }
                });
            }
        
            // Upload updated pending.json (if there are still pending users)
            if (updatedPending.length > 0) {
                await put('pending.json', JSON.stringify(updatedPending, null, 2), {
                    headers: {
                        'Authorization': `Bearer ${blobToken}`,
                        'Content-Type': 'application/json',
                    },
                    access: 'public',
                });
            }
        
            // Delete old playerstat.json
            const matchingPlayerstatBlobs = listResult.blobs.filter(blob => blob.pathname.startsWith('playerstat'));
            for (const blob of matchingPlayerstatBlobs) {
                await del(blob.url, {
                    headers: { 'Authorization': `Bearer ${blobToken}` }
                });
            }
        
            // Upload fresh playerstat.json
            await put('playerstat.json', JSON.stringify(players, null, 2), {
                headers: {
                    'Authorization': `Bearer ${blobToken}`,
                    'Content-Type': 'application/json',
                },
                access: 'public',
            });
        
            return res.status(200).json({ message: 'Verification successful! Player added.' });
        }
        

        return res.status(400).json({ message: 'Invalid mode' });

    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}
