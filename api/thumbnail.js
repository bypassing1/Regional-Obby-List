export default async function handler(req, res) {
    const { placeId } = req.query;

    console.log('[API] Incoming placeId:', placeId);

    try {
        const thumbnailResponse = await fetch(`https://thumbnails.roblox.com/v1/places/multiget/thumbnails?placeIds=${placeId}&size=512x512&format=Png&isCircular=false`);
        const thumbnailData = await thumbnailResponse.json();

        console.log('[API] Thumbnail Data:', thumbnailData);

        const imageUrl = thumbnailData?.data?.[0]?.imageUrl;

        if (!imageUrl) {
            console.error('[API] Thumbnail URL not found in:', thumbnailData);
            return res.status(404).json({ error: 'Thumbnail URL not found' });
        }

        res.status(200).json({ imageUrl });
    } catch (error) {
        console.error('[API] Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
