export default async function handler(req, res) {
    const { placeId } = req.query;

    if (!placeId) {
        return res.status(400).json({ error: 'Missing placeId' });
    }

    try {
        // First, get Universe ID from Place ID (server-side, no CORS problem)
        const placeResponse = await fetch(`https://games.roblox.com/v1/games/multiget-place-details?placeIds=${placeId}`);
        if (!placeResponse.ok) {
            throw new Error('Failed to fetch place details');
        }
        const placeData = await placeResponse.json();
        const universeId = placeData[0]?.universeId;

        if (!universeId) {
            throw new Error('Universe ID not found');
        }

        // Next, get Thumbnail from Universe ID
        const thumbnailResponse = await fetch(`https://thumbnails.roblox.com/v1/games/multiget/thumbnails?universeIds=${universeId}&size=512x512&format=Png&isCircular=false`);
        if (!thumbnailResponse.ok) {
            throw new Error('Failed to fetch thumbnail');
        }
        const thumbnailData = await thumbnailResponse.json();
        const imageUrl = thumbnailData.data[0]?.thumbnails[0]?.imageUrl;

        if (!imageUrl) {
            throw new Error('Thumbnail URL not found');
        }

        // Success response
        return res.status(200).json({ imageUrl });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
}
