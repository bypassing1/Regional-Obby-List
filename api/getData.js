import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { prefix } = req.query;

    if (!prefix) {
        return res.status(400).json({ message: 'Missing prefix parameter' });
    }

    try {
        // List all files in the bucket
        const { data: files, error: listError } = await supabase.storage
            .from('your-bucket-name')
            .list('', { limit: 100 });

        if (listError) throw listError;

        // Find the file that starts with the given prefix
        const matchedFile = files.find(file => file.name.startsWith(prefix));

        if (!matchedFile) {
            return res.status(404).json({ message: 'File not found' });
        }

        // Download the file
        const { data: fileData, error: downloadError } = await supabase.storage
            .from('your-bucket-name')
            .download(matchedFile.name);

        if (downloadError) throw downloadError;

        const text = await fileData.text();
        const jsonData = JSON.parse(text);

        return res.status(200).json(jsonData);
    } catch (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}
