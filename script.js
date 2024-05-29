document.addEventListener('DOMContentLoaded', function() {
    const data = [
    { p: `#1`, title: `Honor`, verifier: `itsmycrafted`, link: `https://www.youtube.com/watch?v=AJIPS8X7Ew8`, gamelink: `https://www.roblox.com/games/7233295548/Honor` },
    { p: `#2`, title: `Anata wa horobimasu`, verifier: `proprpod`, link: `https://youtube.com/watch?v=PN8jR22Imus`, gamelink: `https://www.roblox.com/games/5805830267/Anata-wa-horobimasu` },
    { p: `#3`, title: `Frostbite`, verifier: `itsmycrafted`, link: `https://www.youtube.com/watch?v=ojTLAGUtmGE`, gamelink: `https://www.roblox.com/games/6549205615/Frostbite` },
    { p: `#4`, title: `Tower of Vacant Hindrances`, verifier: `itsmycrafted`, link: `https://www.youtube.com/watch?v=-yzCfH72i5A`, gamelink: `https://www.roblox.com/games/4827159348/Tower-of-Vacant-Hindrances` },
    { p: `#5`, title: `Tower of Terse Persecution`, verifier: `itsmycrafted`, link: `https://www.youtube.com/watch?v=vmKetDkveig`, gamelink: `https://www.roblox.com/games/5894331183/Tower-of-Terse-Persecution` },
    { p: `#6`, title: `Magnetic`, verifier: `itsmycrafted`, link: `https://www.youtube.com/watch?v=Kl3WQlqFuMo`, gamelink: `https://www.roblox.com/games/9943643725/Magnetic` },
    { p: `#7`, title: `Longhopping`, verifier: `proprpod`, link: `https://www.youtube.com/watch?v=f_sw0qtYUoU`, gamelink: `https://www.roblox.com/games/7243286067/Longhopping` },
    { p: `#8`, title: `The Nightmare`, verifier: `itsmycrafted`, link: `https://www.youtube.com/watch?v=-tFpxAtDfHg`, gamelink: `https://www.roblox.com/games/5643065356/The-Nightmare` },
    { p: `#9`, title: `The Conquering`, verifier: `proprpod`, link: `https://www.youtube.com/watch?v=0HUACqQXkoU`, gamelink: `https://www.roblox.com/games/5433278136/The-Conquering` },
    { p: `#10`, title: `Tower of Honor`, verifier: `itsmycrafted`, link: `https://www.youtube.com/watch?v=pGS_Kq3PWdY`, gamelink: `https://www.roblox.com/games/6310894976/Tower-Of-Honor` },
    { p: `#11`, title: `Goldstone`, verifier: `proprpod`, link: `https://www.youtube.com/watch?v=OX4UsLK_gG8`, gamelink: `https://www.roblox.com/games/6057050367/Goldstone` },
    { p: `#12`, title: `Hope for Amendment`, verifier: `proprpod`, link: `https://www.youtube.com/watch?v=A1VMxX1QQbk`, gamelink: `https://www.roblox.com/games/5224741716/Hope-For-Amendment` },
    { p: `#13`, title: `Forgotten Obby 2`, verifier: `proprpod`, link: `https://www.youtube.com/watch?v=8wnbTzPMVb4`, gamelink: `https://www.roblox.com/games/6508985294/Forgotten-Obby-2` },
    { p: `#14`, title: `Dysphoria`, verifier: `galih_funfan`, link: `https://www.youtube.com/watch?v=h0LtkHfy-WY`, gamelink: `https://www.roblox.com/games/6603931766/` },
    { p: `#15`, title: `Shinku no Naraku`, verifier: `proprpod`, link: `https://www.youtube.com/watch?v=8Tq4_UXp6s0`, gamelink: `https://www.roblox.com/games/5130666899/Shinku-no-naraku` },
    { p: `#16`, title: `Arcrux`, verifier: `galih_funfan`, link: `https://www.youtube.com/watch?v=knmS-MY-oyw`, gamelink: `https://www.roblox.com/games/9432231942/Arcrux` },
    { p: `#17`, title: `Tower of Champion's Road`, verifier: `galih_funfan`, link: `https://youtube.com/watch?v=nHPSsPimktE`, gamelink: `https://www.roblox.com/games/8562822414/Jukes-Towers-of-Hell-Black-Friday-Sale` },
    { p: `#18`, title: `Affliction`, verifier: `galih_funfan`, link: `https://www.youtube.com/watch?v=2PHRXW57My4`, gamelink: `https://www.roblox.com/games/10073518661/affliction` },
    { p: `#19`, title: `Asiruuus`, verifier: `itsmycrafted`, link: `https://www.youtube.com/watch?v=Yad5q00uW38`, gamelink: `https://www.roblox.com/games/11751954628/Asiruuus` },
    { p: `#20`, title: `Cobalt Paradox`, verifier: `galih_funfan`, link: `https://www.youtube.com/watch?v=W_cxMZO8JWk`, gamelink: `https://www.roblox.com/games/5956487097/Cobalt-Paradox` },
    { p: `#21`, title: `Comatose`, verifier: `proprpod`, link: `https://www.youtube.com/watch?v=ls_exRdAiFU`, gamelink: `https://www.roblox.com/games/5956184387/Comatose` },
    { p: `#22`, title: `Aurora`, verifier: `proprpod`, link: `https://www.youtube.com/watch?v=UM_m9PabMNM`, gamelink: `https://www.roblox.com/games/8517938734/Aroura` },
    { p: `#23`, title: `Clouds`, verifier: `luzghifal`, link: `https://www.youtube.com/watch?v=pRwzJh2MqjM`, gamelink: `https://www.roblox.com/games/4171325576/Clouds` },
    { p: `#24`, title: `Promethean`, verifier: `proprpod`, link: `https://www.youtube.com/watch?v=lRrXe-0cbT8`, gamelink: `https://www.roblox.com/games/7546279761/Promethean` },
    { p: `#25`, title: `Tower of Glory`, verifier: `proprpod`, link: `https://www.youtube.com/watch?v=wuSukJGYo40`, gamelink: `https://www.roblox.com/games/2516649497/Tower-Of-Glory` },
    { p: `#26`, title: `Amaranthine`, verifier: `galih_funfan`, link: `https://www.youtube.com/watch?v=eauvHQ5k7OE`, gamelink: `https://www.roblox.com/games/6746025955/Amaranthine` },
    { p: `#27`, title: `Room of Rose`, verifier: `Marvel2232`, link: `https://www.youtube.com/watch?v=68H1nLN32R4`, gamelink: `https://www.roblox.com/games/5278030366/Room-of-Rose` },
    { p: `#28`, title: `rh`, verifier: `Marvel2232`, link: `https://www.youtube.com/watch?v=oOu2-EAS9wI`, gamelink: `https://www.roblox.com/games/5278030366/Room-of-Rose` },
    { p: `#29`, title: `Homage`, verifier: `luzghifal`, link: `https://www.youtube.com/watch?v=aTRBDWpP4d0`, gamelink: `https://www.roblox.com/games/8334382645/rh` },
    { p: `#30`, title: `Somewhere in Nowhere.`, verifier: `galih_funfan`, link: `https://www.youtube.com/watch?v=cFbMrXIbUDw`, gamelink: `https://www.roblox.com/games/8420630976/Somewhere-in-Nowhere` },
    { p: `#31`, title: `Refraction`, verifier: `ikanpedas`, link: `https://www.youtube.com/watch?v=sFUMDFeTBPA`, gamelink: `https://www.roblox.com/games/8687594674/Holographic` },
    { p: `#32`, title: `Nevasca`, verifier: `luzghifal`, link: `https://www.youtube.com/watch?v=TeEJQtnQGo4`, gamelink: `https://www.roblox.com/games/5023171502` },
    { p: `#33`, title: `Cotton`, verifier: `ikanpedas`, link: `https://www.youtube.com/watch?v=etwMbsWBRzA`, gamelink: `https://www.roblox.com/games/6236417875/cotton` },
    { p: `#34`, title: `Nature's Art`, verifier: `galih_funfan`, link: `https://www.youtube.com/watch?v=1UvuyAeDu5A`, gamelink: `https://www.roblox.com/games/6943169605/Obbyray-the-best-2` },
    { p: `#35`, title: `TARTARUS`, verifier: `galih_funfan`, link: `https://www.youtube.com/watch?v=rUwyP3G6rL8`, gamelink: `https://www.roblox.com/games/5767147154/TARTARUS` },
    { p: `#36`, title: `Tritanopia`, verifier: `Marvel2232`, link: `https://www.youtube.com/watch?v=MuQ6gYJJ2A0`, gamelink: `https://www.roblox.com/games/6606307045/Tritanopia` },
    { p: `#37`, title: `Divine Intervention`, verifier: `galih_funfan`, link: `https://www.youtube.com/watch?v=bjYt8Bij5nE`, gamelink: `https://www.roblox.com/games/7112567664/divine-intervention` },
    { p: `#38`, title: `Nescience`, verifier: `galih_funfan`, link: `https://www.youtube.com/watch?v=99p8GfuUwaM`, gamelink: `https://www.roblox.com/games/8167197490/Nescience` },
    { p: `#39`, title: `Moonlit Cosmos`, verifier: `proprpod`, link: `https://www.youtube.com/watch?v=DbpqUwMUovk`, gamelink: `https://www.roblox.com/games/6088201347/Moonlit-Cosmos` },
    { p: `#40`, title: `A Monolith`, verifier: `Marvel2232`, link: `https://www.youtube.com/watch?v=nG0zPAbGv8I`, gamelink: `https://www.roblox.com/games/5057397635/A-Monolith` },
    { p: `#41`, title: `Scarlet Paracosm`, verifier: `galih_funfan`, link: `https://www.youtube.com/watch?v=wQ2GhuXbMPU`, gamelink: `https://www.roblox.com/games/5057397635/A-Monolith` },
    { p: `#42`, title: `Desolate`, verifier: `galih_funfan`, link: `https://www.youtube.com/watch?v=7fIbyFvW2lg`, gamelink: `https://www.roblox.com/games/4923500978/Desolate` },
    { p: `#43`, title: `Abyss Room`, verifier: `galih_funfan`, link: `https://www.youtube.com/watch?v=mXFVWg0RKHo`, gamelink: `https://www.roblox.com/games/6468606995/Abyss-room` },
    { p: `#44`, title: `Cosmic Dismay`, verifier: `galih_funfan`, link: `https://www.youtube.com/watch?v=R4aHL2OqNZ4`, gamelink: `https://www.roblox.com/games/6468606995/Abyss-room` },
    { p: `#45`, title: `Denial`, verifier: `MasteronaOof`, link: `https://www.youtube.com/watch?v=0UNLjh1JXVM`, gamelink: `https://www.roblox.com/games/5382768129/Denial` },
    { p: `#46`, title: `Cupid Delight`, verifier: `Marvel2232`, link: `https://youtube.com/watch?v=pV3K3VXL3lA`, gamelink: `https://www.roblox.com/games/10127428972/Cupid-Delight` },
    { p: `#47`, title: `Lucid Dream`, verifier: `Marvel2232`, link: `https://www.youtube.com/watch?v=Jxvliu77vVA`, gamelink: `https://www.roblox.com/games/4936120433/Lucid-Dream` },
    { p: `#48`, title: `FOR THE; Sakura`, verifier: `RaxRB75`, link: `https://www.youtube.com/watch?v=rz_lfuaAL3k`, gamelink: `https://www.roblox.com/games/5112826908/FOR-THE-Sakura` },
    { p: `#49`, title: `a`, verifier: `Herfdiug`, link: `https://www.youtube.com/watch?v=xFxzyn_78ik`, gamelink: `https://www.roblox.com/games/4527777977/a` },
    { p: `#50`, title: `Room of Honor`, verifier: `proprpod`, link: `https://www.youtube.com/watch?v=fZjyBdwMKOw`, gamelink: `https://www.roblox.com/games/13543962068/Room-of-Honor` }
    ];
    const legacydata = [
        { title: `Purge`, verifier: `proprpod`, link: `https://www.youtube.com/watch?v=EJ-7qKSj0QA`, gamelink: `https://www.roblox.com/games/8473837404/Purge` },
        { title: `Oblivion`, verifier: `galih_funfan`, link: `https://www.youtube.com/watch?v=PpIdbeK6WpY`, gamelink: `https://www.roblox.com/games/8550972831/Oblivion` },
        { title: `Keen Attainment`, verifier: `nahlclea`, link: `https://www.youtube.com/watch?v=dRdvOzcixso`, gamelink: `https://www.roblox.com/games/7093307585/Keen-Attainment` },
        { title: `Alluring Sonet`, verifier: `proprpod`, link: `https://www.youtube.com/watch?v=BvY8jOpTH78`, gamelink: `https://www.roblox.com/games/7528328974/Alluring-Sonet` },
        { title: `Bluestification`, verifier: `xs_1R`, link: `https://www.youtube.com/watch?v=8tjEwjILknE`, gamelink: `https://www.roblox.com/games/5150836146/Bluestification` },
        { title: `Neptune`, verifier: `Marvel2232`, link: `https://www.youtube.com/watch?v=i5xp1x6ib-Q`, gamelink: `https://www.roblox.com/games/6786290287/Neptune` },
        { title: `Mt. Benj`, verifier: `Herfdiug`, link: `https://www.youtube.com/watch?v=AOCTOBpXbnY`, gamelink: `https://www.roblox.com/games/4778316908/mt-benj` },
        { title: `The Remains`, verifier: `RaxRB75`, link: `https://www.youtube.com/watch?v=ryMDW41tPPE`, gamelink: `https://www.roblox.com/games/5768084723/The-Remains` },
        { title: `Site0`, verifier: `Marvel2232`, link: `https://www.youtube.com/watch?v=HnSpPGbfy9g`, gamelink: `https://www.roblox.com/games/4641587911/Site0` },
        { title: `Tower of Upended Vapor`, verifier: `nahlclea`, link: `https://www.youtube.com/watch?v=APK9pQo4Ffs`, gamelink: `https://www.roblox.com/games/7593639579/Purist-Towers-of-Hell` },
        { title: `Last Resort`, verifier: `Herfdiug`, link: `https://www.youtube.com/watch?v=VswO_B7i79c`, gamelink: `https://www.roblox.com/games/5745499661/Last-Resort` },
        { title: `Adalora`, verifier: `luzghifal`, link: `https://www.youtube.com/watch?v=1zyYeNUxMX8`, gamelink: `https://www.roblox.com/games/7221949036/Adalora` },
        { title: `Tower of Abandoned Pillars`, verifier: `ItsMyCrafted`, link: `https://www.youtube.com/watch?v=GUiTczXwnjw`, gamelink: `https://www.roblox.com/games/6854048128/Tower-of-Abandoned-Pillars` },
        { title: `Blind Desert`, verifier: `nahlclea`, link: `https://www.youtube.com/watch?v=uSPnaoSdTk4`, gamelink: `https://www.roblox.com/games/4725120919/Blind-desert` },
        { title: `Chronological`, verifier: `ikanpedas`, link: `https://www.youtube.com/watch?v=p2Phc-t9HB0`, gamelink: `https://www.roblox.com/games/5989945139/Chronological` },
        { title: `Concussion`, verifier: `Marvel2232`, link: `https://www.youtube.com/watch?v=tiyqyD3fDGk`, gamelink: `https://www.roblox.com/games/6090615826/Concussion` },
        { title: `Tower of Skywing`, verifier: `galih_funfan`, link: `https://www.youtube.com/watch?v=TXwcyxXGI6k`, gamelink: `https://www.roblox.com/games/5843157218/Tower-of-Skywing` },
        { title: `Malachite`, verifier: `proprpod`, link: `https://www.youtube.com/watch?v=h8jBA2YblUQ`, gamelink: `https://www.roblox.com/games/7200902470/Malachite` },
        { title: `Ice`, verifier: `ItsMyCrafted`, link: `https://www.youtube.com/watch?v=c1b3cD__hqg`, gamelink: `https://www.roblox.com/games/6291343801/Ice` },
        { title: `Another World`, verifier: `itsmycrafted`, link: `https://www.youtube.com/watch?v=tTKjWJ30iY0`, gamelink: `https://www.roblox.com/games/5675911420/Another-World` },
        { title: `Rise of Colors`, verifier: `galih_funfan`, link: `https://www.youtube.com/watch?v=aabnf_-3Dwc`, gamelink: `https://www.roblox.com/games/8499226517/Rise-of-Colors` },
        { title: `Exile`, verifier: `proprpod`, link: `https://www.youtube.com/watch?v=hFGs-lCMJSc`, gamelink: `https://www.roblox.com/games/6593357081/Exile` },
        { title: `Fluorite`, verifier: `ikanpedas`, link: `https://www.youtube.com/watch?v=eohLlbgtnew`, gamelink: `https://www.roblox.com/games/8517699538/Fluorite` },
        { title: `Pleasant Pastel Parkour`, verifier: `ikanpedas`, link: `https://www.youtube.com/watch?v=zJJQC0gtLj4`, gamelink: `https://www.roblox.com/games/8129227935/Pleasant-Pastel-Parkour` },
        { title: `Dramatic Dimension 2`, verifier: `ikanpedas`, link: `https://www.youtube.com/watch?v=OHxzvi422Z0`, gamelink: `https://www.roblox.com/games/9050507239/Dramatic-Dimensions-2` },
        { title: `Tower of Maltael`, verifier: `itsmycrafted`, link: `https://www.youtube.com/watch?v=VHbWFaSNGfA`, gamelink: `https://www.roblox.com/games/6563428756/Tower-of-Maltael` },
        { title: `Lighting of Alcazar!`, verifier: `millanSURF`, link: `https://www.youtube.com/watch?v=d_KgYglkTzE`, gamelink: `https://www.roblox.com/games/6206744504/Lightning-of-Alcazar` },
        { title: `Epiphany`, verifier: `ItsMyCrafted`, link: `https://www.youtube.com/watch?v=R25M2D7STnA`, gamelink: `https://www.roblox.com/games/3297930790/Epiphany-Camfix` },
        { title: `Take Myself as a Worthy Wretch`, verifier: `Marvel2232`, link: `https://www.youtube.com/watch?v=P9IiB8bUx74`, gamelink: `https://www.roblox.com/games/4892986209/Take-myself-as-a-worthy-wretch` },
        { title: `Tower of Contraposition`, verifier: `nahlclea`, link: `https://www.youtube.com/watch?v=jolXrX7_Dv4`, gamelink: `https://www.roblox.com/games/7593639579/Purist-Towers-of-Hell` },
        { title: `Obbyists Home`, verifier: `Marvel2232`, link: `https://www.youtube.com/watch?v=e8XoSQRGfg4`, gamelink: `https://www.roblox.com/games/4616343089/Obbyists-Home` },
        { title: `Tower of Stigmatism`, verifier: `nahlclea`, link: `https://www.youtube.com/watch?v=muVNijgfjOE`, gamelink: `https://www.roblox.com/games/7593639579/Purist-Towers-of-Hell` }
        ];
    const container = document.getElementById('cards-container');
    const legacycontainer = document.getElementById('legacy-container')
    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        const info = document.createElement('div');
        info.className = 'info';
        card.appendChild(info);
        const videoId = item.link.split('v=')[1].split('&')[0];
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        const link = document.createElement('a')
        link.href = item.link
        link.target = "_blank"
        link.className = "link-overlay"
        card.appendChild(link)
        const img = document.createElement('img');
        img.src = thumbnailUrl;
        img.classList.add('thumbnail');
        link.appendChild(img);
        const obby = document.createElement('h1');
        obby.id = 'after-video'
        obby.textContent = `${item.p} - ${item.title}`;
        info.appendChild(obby)
        const verifier = document.createElement('p')
        verifier.textContent = item.verifier
        info.appendChild(verifier)
        const gamelink = document.createElement('a')
        gamelink.href = item.gamelink
        gamelink.target = "_blank"
        gamelink.textContent = `Game`
        info.appendChild(gamelink)
        container.appendChild(card);
    });
    legacydata.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        const info = document.createElement('div');
        info.className = 'info';
        card.appendChild(info);
        const videoId = item.link.split('v=')[1].split('&')[0];
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        const link = document.createElement('a')
        link.href = item.link
        link.target = "_blank"
        link.className = "link-overlay"
        card.appendChild(link)
        const img = document.createElement('img');
        img.src = thumbnailUrl;
        img.classList.add('thumbnail');
        link.appendChild(img);
        const obby = document.createElement('h1');
        obby.id = 'after-video'
        obby.textContent = item.title
        info.appendChild(obby)
        const verifier = document.createElement('p')
        verifier.textContent = item.verifier
        info.appendChild(verifier)
        const gamelink = document.createElement('a')
        gamelink.href = item.gamelink
        gamelink.target = "_blank"
        gamelink.textContent = `Game`
        info.appendChild(gamelink)
        legacycontainer.appendChild(card);
    });
});