import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
    if (req.method !== 'PUT') {
        res.setHeader('Allow', ['PUT']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const { prefix, updatedData } = req.body;

    if (!prefix || !updatedData) {
        return res.status(400).json({ message: 'Missing prefix or updatedData' });
    }

    try {
        const bucketName = 'blob'; // replace with your Supabase bucket name
        const filePath = `${prefix}.json`; // simple clean name!

        // Upload (will overwrite if exists)
        const { error } = await supabase.storage
            .from(bucketName)
            .upload(filePath, updatedData, {
                contentType: 'application/json',
                upsert: true, // this will overwrite existing file!
            });

        if (error) {
            console.error('Error uploading:', error);
            return res.status(500).json({ message: 'Upload failed', error: error.message });
        }

        // Get the public URL (optional)
        const { data: publicUrlData } = supabase.storage.from(bucketName).getPublicUrl(filePath);

        res.status(200).json({
            message: 'JSON data updated successfully!',
            url: publicUrlData.publicUrl,
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
}
