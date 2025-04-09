export default async function handler(req, res) {
    const { placeId } = req.query;

    console.log('[API] Incoming placeId:', placeId);

    if (!placeId) {
        console.log('[API] No placeId provided.');
        return res.status(400).json({ error: 'placeId is required' });
    }

    try {
        // Step 1: Get Universe ID
        const universeResponse = await fetch(`https://apis.roblox.com/universes/v1/places/${placeId}/universe`);
        const universeData = await universeResponse.json();

        console.log('[API] Universe Data:', universeData);

        if (!universeData.universeId) {
            console.log('[API] Failed to retrieve universeId.');
            return res.status(404).json({ error: 'Universe ID not found' });
        }

        const universeId = universeData.universeId;

        // Step 2: Get Thumbnail
        const thumbnailResponse = await fetch(`https://thumbnails.roblox.com/v1/games/multiget/thumbnails?universeIds=${universeId}&size=768x432&format=Png&isCircular=false`);
        const thumbnailData = await thumbnailResponse.json();

        console.log('[API] Thumbnail Data:', thumbnailData);

        if (!thumbnailData.data || thumbnailData.data.length === 0) {
            console.log('[API] No thumbnail found.');
            return res.status(404).json({ error: 'Thumbnail not found' });
        }

        const thumbnails = thumbnailData.data;

        return res.status(200).json({ thumbnails });
    } catch (error) {
        console.error('[API] Error fetching data:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
