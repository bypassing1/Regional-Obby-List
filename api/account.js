import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const bucketName = 'blob'; // replace with your Supabase bucket name

async function getFile(fileName) {
    const { data, error } = await supabase
    .storage
    .from(bucketName)
    .download(fileName);
    
    if (error) return null;
    
    const text = await data.text();
    return JSON.parse(text);
}

async function uploadFile(fileName, jsonData) {
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
    
    const { error } = await supabase
    .storage
    .from(bucketName)
    .upload(fileName, blob, {
        upsert: true,
        contentType: 'application/json',
    });
    
    if (error) throw new Error(error.message);
}

async function deleteFile(fileName) {
    await supabase
    .storage
    .from(bucketName)
    .remove([fileName]);
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    
    const { mode, username, password, region } = req.body;
    
    if (!mode || !username) {
        return res.status(400).json({ message: 'Missing fields' });
    }
    
    try {
        // Get playerstat.json
        const playerData = await getFile('playerstat.json');
        if (!playerData) return res.status(404).json({ message: 'playerstat.json not found' });
        
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
            
            let pending = await getFile('pending.json') || [];
            
            // Add to pending list
            pending.push({ name: username, password, region });
            
            // Overwrite pending.json
            await uploadFile('pending.json', pending);
            
            return res.status(200).json({ message: 'Registration pending verification' });
        }
        
        if (mode === 'verify') {
            let pending = await getFile('pending.json') || [];
            let players = await getFile('playerstat.json') || [];
        
            // Find all entries with the username
            const matchingEntries = pending.filter(p => p.name === username);
            if (matchingEntries.length === 0) {
                return res.status(404).json({ message: 'Pending account not found' });
            }
        
            // Get the latest entry (last one in list)
            const newUser = {
                ...matchingEntries[matchingEntries.length - 1],
                beaten: []
            };
        
            // Remove all pending entries with that username
            pending = pending.filter(p => p.name !== username);
        
            // Add to player list
            players.push(newUser);
        
            // Update files
            await uploadFile('playerstat.json', players);
            await uploadFile('pending.json', pending);
        
            return res.status(200).json({ message: 'Account verified successfully' });
        }
        return res.status(400).json({ message: 'Invalid mode' });
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}
