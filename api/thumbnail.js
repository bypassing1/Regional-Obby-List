export default async function handler(req, res) {
    const { placeId } = req.query;

    console.log('[API] Received placeId:', placeId);

    try {
        // Step 1: Get universeId from placeId
        const placeDetailsURL = `https://games.roblox.com/v1/games/multiget-place-details?placeIds=${placeId}`;
        console.log('[API] Fetching Place Details:', placeDetailsURL);

        const placeDetailsResponse = await fetch(placeDetailsURL);
        console.log('[API] Place Details Response Status:', placeDetailsResponse.status);

        const placeDetailsData = await placeDetailsResponse.json();
        console.log('[API] Place Details Data:', JSON.stringify(placeDetailsData, null, 2));

        if (!placeDetailsResponse.ok || !Array.isArray(placeDetailsData) || !placeDetailsData[0]?.universeId) {
            console.error('[API] Failed to retrieve universeId.');
            return res.status(500).json({ error: 'Failed to retrieve universeId', details: placeDetailsData });
        }

        const universeId = placeDetailsData[0].universeId;
        console.log('[API] Extracted UniverseID:', universeId);

        // Step 2: Get thumbnails using universeId
        const thumbnailsURL = `https://thumbnails.roblox.com/v1/games/multiget/thumbnails?universeIds=${universeId}&size=512x512&format=Png&isCircular=false`;
        console.log('[API] Fetching Thumbnails:', thumbnailsURL);

        const thumbnailsResponse = await fetch(thumbnailsURL);
        console.log('[API] Thumbnails Response Status:', thumbnailsResponse.status);

        const thumbnailsData = await thumbnailsResponse.json();
        console.log('[API] Thumbnails Data:', JSON.stringify(thumbnailsData, null, 2));

        if (!thumbnailsResponse.ok || !thumbnailsData.data || !thumbnailsData.data.length) {
            console.error('[API] Failed to retrieve thumbnails.');
            return res.status(500).json({ error: 'Failed to retrieve thumbnails', details: thumbnailsData });
        }

        const imageUrl = thumbnailsData.data[0].imageUrl;
        console.log('[API] Extracted Image URL:', imageUrl);

        // Success response
        return res.status(200).json({ imageUrl });

    } catch (error) {
        console.error('[API] Unexpected error:', error);
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}
