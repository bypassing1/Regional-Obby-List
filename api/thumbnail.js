import { NextResponse } from 'next/server';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const placeId = searchParams.get('placeId');

    console.log('[API] placeId:', placeId);

    try {
        const universeResponse = await fetch(`https://games.roblox.com/v1/games/multiget-place-details?placeIds=${placeId}`);
        const universeData = await universeResponse.json();

        console.log('[API] Universe Data:', universeData);

        const universeId = universeData[0]?.universeId;

        if (!universeId) {
            console.error('[API] Universe ID not found');
            return NextResponse.json({ error: 'Universe ID not found' }, { status: 404 });
        }

        const thumbnailResponse = await fetch(`https://thumbnails.roblox.com/v1/games/multiget/thumbnails?universeIds=${universeId}&size=512x512&format=Png&isCircular=false`);
        const thumbnailData = await thumbnailResponse.json();

        console.log('[API] Thumbnail Data:', thumbnailData);

        const imageUrl = thumbnailData?.data?.[0]?.thumbnails?.[0]?.imageUrl;

        if (!imageUrl) {
            console.error('[API] Thumbnail URL not found');
            return NextResponse.json({ error: 'Thumbnail URL not found' }, { status: 404 });
        }

        return NextResponse.json({ imageUrl });
    } catch (error) {
        console.error('[API] Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
