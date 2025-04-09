export default async function handler(req, res) {
    const { placeId } = req.query;

    console.log('[API] Incoming placeId:', placeId);

    try {
        const universeResponse = await fetch(`https://games.roblox.com/v1/games/multiget-place-details?placeIds=${placeId}`);
        const universeData = await universeResponse.json();

        console.log('[API] Universe Data:', universeData);

        if (!Array.isArray(universeData) || universeData.length === 0) {
            console.error('[API] Universe Data is empty:', universeData);
            return res.status(404).json({ error: 'Universe data is empty' });
        }

        const universeId = universeData[0]?.universeId;

        if (!universeId) {
            console.error('[API] Universe ID not found in:', universeData[0]);
            return res.status(404).json({ error: 'Universe ID not found' });
        }

        const thumbnailResponse = await fetch(`https://thumbnails.roblox.com/v1/games/multiget/thumbnails?universeIds=${universeId}&size=512x512&format=Png&isCircular=false`);
        const thumbnailData = await thumbnailResponse.json();

        console.log('[API] Thumbnail Data:', thumbnailData);

        const imageUrl = thumbnailData?.data?.[0]?.thumbnails?.[0]?.imageUrl;

        if (!imageUrl) {
            console.error('[API] Thumbnail URL not found in:', thumbnailData);
            return res.status(404).json({ error: 'Thumbnail URL not found' });
        }

        return res.status(200).json({ imageUrl });
    } catch (error) {
        console.error('[API] Error:', error);
        return res.status(500).json({ error: error.message });
    }
}
