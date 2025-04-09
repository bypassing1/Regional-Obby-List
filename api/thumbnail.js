export default async function handler(req, res) {
    const { placeId } = req.query;

    if (!placeId) {
        return res.status(400).json({ error: 'Missing placeId' });
    }

    try {
        // Step 1: Get Universe ID
        const universeRes = await fetch(`https://games.roblox.com/v1/games/multiget-place-details?placeIds=${placeId}`);
        const universeData = await universeRes.json();
        const universeId = universeData[0]?.universeId;

        if (!universeId) {
            return res.status(404).json({ error: 'Universe ID not found' });
        }

        // Step 2: Get Thumbnail
        const thumbnailRes = await fetch(`https://thumbnails.roblox.com/v1/games/multiget/thumbnails?universeIds=${universeId}&size=512x512&format=Png&isCircular=false`);
        const thumbnailData = await thumbnailRes.json();
        const imageUrl = thumbnailData?.data[0]?.thumbnails[0]?.imageUrl;

        if (!imageUrl) {
            return res.status(404).json({ error: 'Thumbnail not found' });
        }

        // Step 3: Return the thumbnail URL
        res.status(200).json({ imageUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch thumbnail' });
    }
}
