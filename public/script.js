document.addEventListener('DOMContentLoaded', function () {
    const listBlobsApiUrl = '/api/listBlobs';
    const globaldataPrefix = 'globaldata';
    const playerstatPrefix = 'playerstat';
    const scriptElement = document.querySelector('script[id]');
    const scriptId = scriptElement ? scriptElement.id : null;
    const prefixData = [
        { scriptId: "voc-list", prefix: "vndata" },
        { scriptId: "eio-list", prefix: "iddata" },
        { scriptId: "ukr-list", prefix: "ukrdata" },
        { scriptId: "koc-list", prefix: "krdata" },
        { scriptId: "mys-list", prefix: "mysdata" }
    ];
    const prefixList = ['vndata', 'iddata', 'krdata', 'ukrdata', 'mysdata'];
    let topVerifiersString = '';
    fetch(listBlobsApiUrl)
        .then(response => response.json())
        .then(data => {
            const globaldataBlob = data.blobs.find(blob => blob.pathname.startsWith(globaldataPrefix));
            const playerstatBlob = data.blobs.find(blob => blob.pathname.startsWith(playerstatPrefix));
            if (!globaldataBlob || !playerstatBlob) {
                throw new Error('Required blobs not found.');
            }
            return Promise.all([
                fetch(globaldataBlob.url).then(response => response.json()),
                fetch(playerstatBlob.url).then(response => response.json()),
                ...prefixList.map(prefix => {
                    const blob = data.blobs.find(blob => blob.pathname.startsWith(prefix));
                    if (blob) {
                        return fetch(blob.url).then(response => response.json()).then(listData => {
                            if (listData.length > 0) {
                                const topVerifier = listData[0].verifier;
                                topVerifiersString += `${topVerifier}ㅤㅤ`; 
                            }
                        });
                    }
                })
            ]);
        })
        .then(([globaldata, playerstat]) => {
            let points = 300;
            for (let i = 0; i < globaldata.length; i++) {
                globaldata[i].points = points.toFixed(2);
                points -= 2.77;
            }
            playerstat.forEach(player => {
                let totalPoints = 0;
                let hardestObby = '';
                let highestPoints = 0;
                player.beaten.forEach(obby => {
                    const obbyData = globaldata.find(data => data.title === obby);
                    if (obbyData && obbyData.points) {
                        const obbyPoints = parseFloat(obbyData.points);
                        totalPoints += obbyPoints;
                        if (obbyPoints > highestPoints) {
                            highestPoints = obbyPoints;
                            hardestObby = obby;
                        }
                    }
                });
                player.playerpoints = totalPoints.toFixed(2);
                player.hardestobby = hardestObby;
            });
            playerstat.sort((a, b) => parseFloat(b.playerpoints) - parseFloat(a.playerpoints));
            if (document.getElementById('statistics')) {
                const scrollableDiv = document.getElementById('scrollable');
                playerstat.forEach((player, index) => {
                    const playerDiv = document.createElement('li');
                    playerDiv.className = 'player-div';

                    const playerFlag = document.createElement('img');
                    playerFlag.src = `assets/${player.region}.svg`;
                    playerFlag.className = 'player-flag';
                    playerFlag.alt = '';

                    const playerName = document.createElement('h4');
                    playerName.textContent = `#${index + 1} - ${player.name}`;

                    playerDiv.appendChild(playerFlag);
                    playerDiv.appendChild(playerName);
                    scrollableDiv.appendChild(playerDiv);

                    playerDiv.addEventListener('click', () => {
                        const playerStatsDiv = document.querySelector('.player-stats');
                        playerStatsDiv.innerHTML = '';

                        const nationality = player.region.toUpperCase();

                        const beatenObbyHTML = player.beaten.map(obby => {
                            const obbyData = globaldata.find(data => data.title === obby);
                            const obbyPoints = obbyData ? obbyData.points : '0.00';
                            return `<p title="${obbyPoints} Points">${obby}</p>`;
                        }).join('');

                        playerStatsDiv.innerHTML = `
                            <div class="stats-header">
                                <img src="assets/${player.region}.svg" class="flag" alt="">
                                <h2 id="player">${player.name}</h2>
                            </div>
                            <div class="stats-container">
                                <span>
                                    <b>Nationality</b>
                                    <p>${nationality}</p>
                                </span>
                            </div>
                            <div class="stats-container">
                                <span>
                                    <b>Rank</b>
                                    <p>${index + 1}</p>
                                </span>
                                <span>
                                    <b>Points</b>
                                    <p>${player.playerpoints}</p>
                                </span>
                            </div>
                            <div class="stats-container">
                                <span>
                                    <b>Hardest Obby</b>
                                    <p>${player.hardestobby}</p>
                                </span>
                            </div>
                            <div class="stats-container">
                                <span>
                                    <b>Obby Beaten</b>
                                    <div class="beaten-obby">
                                        ${beatenObbyHTML}
                                    </div>
                                </span>
                            </div>
                        `;

                        playerStatsDiv.style.display = 'block';
                    });
                });
            }

            if (document.getElementById('index')) {
                const topPlayersContainer = document.getElementById('top-players-container');
topPlayersContainer.innerHTML = "";

const topVerifiersArray = topVerifiersString.split("ㅤㅤ");

topVerifiersArray.forEach(verifier => {
    if (verifier.trim() !== "") {
        const playerDiv = document.createElement("div");
        playerDiv.className = "content";
        playerDiv.textContent = verifier;
        topPlayersContainer.appendChild(playerDiv);
    }
});

topPlayersContainer.innerHTML += topPlayersContainer.innerHTML;


                const top1ObbyistElement = document.querySelector('.top1-obbyist');
                top1ObbyistElement.textContent = globaldata[0].verifier;
                let contributors = [
                    'itsmycrafted',
                    'galih_funfan',
                    'lcknt',
                    'zayenzoo',
                    'infinicator',
                    'Junebread',
                    'Banjo',
                    'AAAFanboy',
                    'vikkstar413424trt',
                    'jacky123456789000',
                    'Katozai18',
                    'jankeration'
                ];
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

                    const card = document.createElement('div');
                    card.className = 'card';

                    const bgblur = document.createElement('div');
                    bgblur.className = "background-blur";
                    bgblur.style.backgroundImage = `url(${thumbnailUrl})`;
                    card.appendChild(bgblur);

                    const link = document.createElement('a');
                    link.href = item.link;
                    link.target = "_blank";
                    link.className = "link-overlay";
                    card.appendChild(link);

                    const img = document.createElement('img');
                    img.src = thumbnailUrl;
                    img.classList.add('thumbnail');
                    link.appendChild(img);

                    const info = document.createElement('div');
                    info.className = 'info';
                    card.appendChild(info);

                    const flag = document.createElement('img');
                    flag.src = `assets/${item.region}.svg`;
                    flag.classList.add('flag');
                    info.appendChild(flag);

                    const obby = document.createElement('h1');
                    obby.id = 'after-video';
                    obby.textContent = total < 101 ? `#${total} - ${item.title}` : `${item.title}`;
                    info.appendChild(obby);

                    const verifier = document.createElement('p');
                    verifier.textContent = item.verifier;
                    info.appendChild(verifier);

                    const gamelink = document.createElement('a');
                    gamelink.href = item.gamelink;
                    gamelink.target = "_blank";
                    gamelink.textContent = `Game`;
                    info.appendChild(gamelink);

                    if (total > 100) {
                        legacycontainer.appendChild(card);
                    } else {
                        container.appendChild(card);
                    }
                });
            }
        })
        .catch(error => console.error('Error fetching data:', error));
        function loadList(prefix) {
            let total = 0
            const container = document.getElementById('cards-container')
            const legacycontainer = document.getElementById('legacy-container')
            const flagSrc = prefix.replace('data', '');
            fetch(listBlobsApiUrl)
            .then(response => response.json())
            .then(data => {
                const dataBlob = data.blobs.find(blob => blob.pathname.startsWith(prefix))
                if (!dataBlob) {
                    throw new Error(`Blob with the prefix ${prefix} not found.`);
                }
                return fetch(dataBlob.url)
            })
            .then(response => response.json())
            .then(dataList => {
                dataList.forEach(item => {
                    total += 1;
                    const videoId = item.link.split('v=')[1].split('&')[0];
                    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    
                    const card = document.createElement('div');
                    card.className = 'card';
    
                    const bgblur = document.createElement('div');
                    bgblur.className = "background-blur";
                    bgblur.style.backgroundImage = `url(${thumbnailUrl})`;
                    card.appendChild(bgblur);
    
                    const link = document.createElement('a');
                    link.href = item.link;
                    link.target = "_blank";
                    link.className = "link-overlay";
                    card.appendChild(link);
    
                    const img = document.createElement('img');
                    img.src = thumbnailUrl;
                    img.classList.add('thumbnail');
                    link.appendChild(img);
    
                    const info = document.createElement('div');
                    info.className = 'info';
                    card.appendChild(info);
    
                    const flag = document.createElement('img');
                    flag.src = `assets/${flagSrc}.svg`;
                    flag.classList.add('flag');
                    info.appendChild(flag);
    
                    const obby = document.createElement('h1');
                    obby.id = 'after-video';
                    obby.textContent = total < 51 ? `#${total} - ${item.title}` : `${item.title}`;
                    info.appendChild(obby);
    
                    const verifier = document.createElement('p');
                    verifier.textContent = item.verifier;
                    info.appendChild(verifier);
    
                    const gamelink = document.createElement('a');
                    gamelink.href = item.gamelink;
                    gamelink.target = "_blank";
                    gamelink.textContent = `Game`;
                    info.appendChild(gamelink);
    
                    if (total > 50) {
                        legacycontainer.appendChild(card);
                    } else {
                        container.appendChild(card);
                    }
                });
            })
            .catch(error => console.error('Error fetching the JSON data:', error));
        }

        if (scriptId) {
            const found = prefixData.find(item => item.scriptId === scriptId);
            if (found) {
                loadList(found.prefix);
            }
        }
});