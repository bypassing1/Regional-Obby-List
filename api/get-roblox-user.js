export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    const { username } = req.body;
    
    try {
        // Step 1: Get user ID
        const userResponse = await fetch('https://users.roblox.com/v1/usernames/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                usernames: [username],
                excludeBannedUsers: false
            })
        });
        
        const userData = await userResponse.json();
        const user = userData.data[0];
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        const userId = user.id;
        
        // Step 2: Get avatar URL
        const avatarResponse = await fetch(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${userId}&size=420x420&format=Png&isCircular=true`);
        const avatarData = await avatarResponse.json();
        
        const avatarUrl = avatarData?.data?.[0]?.imageUrl;
        
        res.status(200).json({
            userId,
            username: user.name,
            displayName: user.displayName,
            avatarUrl
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
