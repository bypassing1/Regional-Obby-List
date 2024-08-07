import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const newData = req.body;
        const filePath = path.join(process.cwd(), 'public', 'data', 'globaldata.json');

        try {
            // Read the existing data from the JSON file
            const fileContents = await fs.readFile(filePath, 'utf-8');
            const data = JSON.parse(fileContents);

            // Add the new data to the existing data
            data.push(newData);

            // Write the updated data back to the JSON file
            await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');

            res.status(200).json({ message: 'Data updated successfully' });
        } catch (error) {
            console.error('Error updating data:', error);
            res.status(500).json({ message: 'Error updating data' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
