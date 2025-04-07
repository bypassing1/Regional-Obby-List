import { list, put } from '@vercel/blob';

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

        // Ensure playerstat.json exists
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

            const userExists = players.some(p => p.name === username);
            if (userExists) return res.status(409).json({ message: 'Username already exists' });

            // Load pending.json or create empty
            let pending = [];
            if (pendingBlob) {
                const pendingData = await fetch(pendingBlob.url).then(res => res.json());
                pending = Array.isArray(pendingData) ? pendingData : [];
            }

            // Add to pending.json
            pending.push({ name: username, password, region });

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
            // Verification from Roblox server
            const pendingData = await fetch(pendingBlob.url).then(res => res.json());
            const pending = Array.isArray(pendingData) ? pendingData : [];

            const pendingUser = pending.find(p => p.name === username);
            if (!pendingUser) return res.status(404).json({ message: 'No pending registration for this username' });

            players.push({ ...pendingUser, beaten: [] });

            // Update playerstat.json
            await put('playerstat.json', JSON.stringify(players, null, 2), {
                headers: {
                    'Authorization': `Bearer ${blobToken}`,
                    'Content-Type': 'application/json',
                },
                access: 'public',
            });

            // Remove from pending
            const updatedPending = pending.filter(p => p.name !== username);
            await put('pending.json', JSON.stringify(updatedPending, null, 2), {
                headers: {
                    'Authorization': `Bearer ${blobToken}`,
                    'Content-Type': 'application/json',
                },
                access: 'public',
            });

            return res.status(200).json({ message: 'Verification successful! Account created.' });
        }

        return res.status(400).json({ message: 'Invalid mode' });

    } catch (error) {
        console.error('Error handling account:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}