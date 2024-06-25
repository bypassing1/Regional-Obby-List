document.addEventListener('DOMContentLoaded', function () {
    // Fetch the JSON data
    fetch('data/globaldata.json')
        .then(response => response.json())
        .then(globaldata => {
            if (document.getElementById('index')) {
                const top1ObbyistElement = document.querySelector('.top1-obbyist');
                top1ObbyistElement.textContent = globaldata[0].verifier;
                let contributors = [
                    'itsmycrafted',
                    'galih_funfan',
                    'lcknt',
                    'zayenzoo',
                    'darkside_dammed'
                ]
                let contributorsContainer = document.querySelector('.contributors-text');
                contributors.forEach(contributor => {
                    let p = document.createElement('p');
                    p.textContent = contributor;
                    contributorsContainer.appendChild(p);
                });
            }
            if (document.getElementById('universal-list')) {
                let total = 0;
                const container = document.getElementById('cards-container');
                const legacycontainer = document.getElementById('legacy-container');

                globaldata.forEach(item => {
                    total += 1;
                    const videoId = item.link.split('v=')[1].split('&')[0];
                    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

                    // Create card element
                    const card = document.createElement('div');
                    card.className = 'card';

                    // Create background blur element
                    const bgblur = document.createElement('div');
                    bgblur.className = "background-blur";
                    bgblur.style.backgroundImage = `url(${thumbnailUrl})`;
                    card.appendChild(bgblur);

                    // Create link overlay element
                    const link = document.createElement('a');
                    link.href = item.link;
                    link.target = "_blank";
                    link.className = "link-overlay";
                    card.appendChild(link);

                    // Create image element
                    const img = document.createElement('img');
                    img.src = thumbnailUrl;
                    img.classList.add('thumbnail');
                    link.appendChild(img);

                    // Create info container
                    const info = document.createElement('div');
                    info.className = 'info';
                    card.appendChild(info);

                    // Create flag element
                    const flag = document.createElement('img');
                    flag.src = `assets/${item.region}.svg`;
                    flag.classList.add('flag');
                    info.appendChild(flag);

                    // Create title element
                    const obby = document.createElement('h1');
                    obby.id = 'after-video';
                    obby.textContent = total < 101 ? `#${total} - ${item.title}` : `${item.title}`;
                    info.appendChild(obby);

                    // Create verifier element
                    const verifier = document.createElement('p');
                    verifier.textContent = item.verifier;
                    info.appendChild(verifier);

                    // Create game link element
                    const gamelink = document.createElement('a');
                    gamelink.href = item.gamelink;
                    gamelink.target = "_blank";
                    gamelink.textContent = `Game`;
                    info.appendChild(gamelink);

                    // Append card to the appropriate container
                    if (total > 100) {
                        legacycontainer.appendChild(card);
                    } else {
                        container.appendChild(card);
                    }
                });
            }
        })
    if (document.getElementById('voc-list')) {
        let total = 0;
        const container = document.getElementById('cards-container');
        const legacycontainer = document.getElementById('legacy-container');

        // Fetch the JSON data
        fetch('data/vndata.json')
            .then(response => response.json())
            .then(vndata => {
                vndata.forEach(item => {
                    total += 1;
                    const videoId = item.link.split('v=')[1].split('&')[0];
                    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

                    // Create card element
                    const card = document.createElement('div');
                    card.className = 'card';

                    // Create background blur element
                    const bgblur = document.createElement('div');
                    bgblur.className = "background-blur";
                    bgblur.style.backgroundImage = `url(${thumbnailUrl})`;
                    card.appendChild(bgblur);

                    // Create link overlay element
                    const link = document.createElement('a');
                    link.href = item.link;
                    link.target = "_blank";
                    link.className = "link-overlay";
                    card.appendChild(link);

                    // Create image element
                    const img = document.createElement('img');
                    img.src = thumbnailUrl;
                    img.classList.add('thumbnail');
                    link.appendChild(img);

                    // Create info container
                    const info = document.createElement('div');
                    info.className = 'info';
                    card.appendChild(info);

                    // Create flag element
                    const flag = document.createElement('img');
                    flag.src = `assets/vn.svg`;
                    flag.classList.add('flag');
                    info.appendChild(flag);

                    // Create title element
                    const obby = document.createElement('h1');
                    obby.id = 'after-video';
                    obby.textContent = total < 51 ? `#${total} - ${item.title}` : `${item.title}`;
                    info.appendChild(obby);

                    // Create verifier element
                    const verifier = document.createElement('p');
                    verifier.textContent = item.verifier;
                    info.appendChild(verifier);

                    // Create game link element
                    const gamelink = document.createElement('a');
                    gamelink.href = item.gamelink;
                    gamelink.target = "_blank";
                    gamelink.textContent = `Game`;
                    info.appendChild(gamelink);

                    // Append card to the appropriate container
                    if (total > 50) {
                        legacycontainer.appendChild(card);
                    } else {
                        container.appendChild(card);
                    }
                });
            })
            .catch(error => console.error('Error fetching the JSON data:', error));
    }
    if (document.getElementById('eio-list')) {
        let total = 0;
        const container = document.getElementById('cards-container');
        const legacycontainer = document.getElementById('legacy-container');

        // Fetch the JSON data
        fetch('data/iddata.json')
            .then(response => response.json())
            .then(iddata => {
                iddata.forEach(item => {
                    total += 1;
                    const videoId = item.link.split('v=')[1].split('&')[0];
                    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

                    // Create card element
                    const card = document.createElement('div');
                    card.className = 'card';

                    // Create background blur element
                    const bgblur = document.createElement('div');
                    bgblur.className = "background-blur";
                    bgblur.style.backgroundImage = `url(${thumbnailUrl})`;
                    card.appendChild(bgblur);

                    // Create link overlay element
                    const link = document.createElement('a');
                    link.href = item.link;
                    link.target = "_blank";
                    link.className = "link-overlay";
                    card.appendChild(link);

                    // Create image element
                    const img = document.createElement('img');
                    img.src = thumbnailUrl;
                    img.classList.add('thumbnail');
                    link.appendChild(img);

                    // Create info container
                    const info = document.createElement('div');
                    info.className = 'info';
                    card.appendChild(info);

                    // Create flag element
                    const flag = document.createElement('img');
                    flag.src = `assets/id.svg`;
                    flag.classList.add('flag');
                    info.appendChild(flag);

                    // Create title element
                    const obby = document.createElement('h1');
                    obby.id = 'after-video';
                    obby.textContent = total < 51 ? `#${total} - ${item.title}` : `${item.title}`;
                    info.appendChild(obby);

                    // Create verifier element
                    const verifier = document.createElement('p');
                    verifier.textContent = item.verifier;
                    info.appendChild(verifier);

                    // Create game link element
                    const gamelink = document.createElement('a');
                    gamelink.href = item.gamelink;
                    gamelink.target = "_blank";
                    gamelink.textContent = `Game`;
                    info.appendChild(gamelink);

                    // Append card to the appropriate container
                    if (total > 50) {
                        legacycontainer.appendChild(card);
                    } else {
                        container.appendChild(card);
                    }
                });
            })
            .catch(error => console.error('Error fetching the JSON data:', error));
    }
    if (document.getElementById('ukr-list')) {
        let total = 0;
        const container = document.getElementById('cards-container');
        const legacycontainer = document.getElementById('legacy-container');

        // Fetch the JSON data
        fetch('data/ukrdata.json')
            .then(response => response.json())
            .then(ukrdata => {
                ukrdata.forEach(item => {
                    total += 1;
                    const videoId = item.link.split('v=')[1].split('&')[0];
                    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

                    // Create card element
                    const card = document.createElement('div');
                    card.className = 'card';

                    // Create background blur element
                    const bgblur = document.createElement('div');
                    bgblur.className = "background-blur";
                    bgblur.style.backgroundImage = `url(${thumbnailUrl})`;
                    card.appendChild(bgblur);

                    // Create link overlay element
                    const link = document.createElement('a');
                    link.href = item.link;
                    link.target = "_blank";
                    link.className = "link-overlay";
                    card.appendChild(link);

                    // Create image element
                    const img = document.createElement('img');
                    img.src = thumbnailUrl;
                    img.classList.add('thumbnail');
                    link.appendChild(img);

                    // Create info container
                    const info = document.createElement('div');
                    info.className = 'info';
                    card.appendChild(info);

                    // Create flag element
                    const flag = document.createElement('img');
                    flag.src = `assets/ukr.svg`;
                    flag.classList.add('flag');
                    info.appendChild(flag);

                    // Create title element
                    const obby = document.createElement('h1');
                    obby.id = 'after-video';
                    obby.textContent = total < 51 ? `#${total} - ${item.title}` : `${item.title}`;
                    info.appendChild(obby);

                    // Create verifier element
                    const verifier = document.createElement('p');
                    verifier.textContent = item.verifier;
                    info.appendChild(verifier);

                    // Create game link element
                    const gamelink = document.createElement('a');
                    gamelink.href = item.gamelink;
                    gamelink.target = "_blank";
                    gamelink.textContent = `Game`;
                    info.appendChild(gamelink);

                    // Append card to the appropriate container
                    if (total > 50) {
                        legacycontainer.appendChild(card);
                    } else {
                        container.appendChild(card);
                    }
                });
            })
            .catch(error => console.error('Error fetching the JSON data:', error));
    }
});