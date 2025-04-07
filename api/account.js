import { list, put } from '@vercel/blob';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { mode, username, password, region } = req.body;
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

    if (!mode || !username || !password || (mode === 'register' && !region)) {
        return res.status(400).json({ message: 'Missing fields' });
    }

    try {
        const listResult = await list({
            headers: { 'Authorization': `Bearer ${blobToken}` }
        });

        const playerstatBlob = listResult.blobs.find(blob => blob.pathname.endsWith('playerstat.json'));

        if (!playerstatBlob) {
            return res.status(404).json({ message: 'playerstat.json not found' });
        }

        const response = await fetch(playerstatBlob.url);
        const data = await response.json();

        let players = Array.isArray(data) ? data : [];

        if (mode === 'login') {
            const user = players.find(p => p.name === username && p.password === password);

            if (!user) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            return res.status(200).json({ message: 'Login successful', user });
        }

        if (mode === 'register') {
            const userExists = players.some(p => p.name === username);

            if (userExists) {
                return res.status(409).json({ message: 'Username already exists' });
            }

            const newUser = {
                name: username,
                password,
                region,
                beaten: []
            };

            players.push(newUser);

            const result = await put('playerstat.json', JSON.stringify(players, null, 2), {
                headers: {
                    'Authorization': `Bearer ${blobToken}`,
                    'Content-Type': 'application/json',
                },
                access: 'public',
            });

            return res.status(201).json({ message: 'Registration successful', user: newUser, url: result.url });
        }

        return res.status(400).json({ message: 'Invalid mode' });

    } catch (error) {
        console.error('Error handling account:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}
