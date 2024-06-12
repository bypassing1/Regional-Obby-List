document.addEventListener('DOMContentLoaded', function() {
    const vndata = [
        { title: `Sundarkened World`, verifier: `Darkside_Dammed`, link: `https://www.youtube.com/watch?v=hhnIKUr1xps`, gamelink: `https://www.roblox.com/games/6704089238/Sundarkened-World` },
        { title: `Drowning`, verifier: `hehe9709_2`, link: `https://www.youtube.com/watch?v=R92TCuzWwBI`, gamelink: `https://www.roblox.com/games/7156683685/Drowning` },
        { title: `Haze`, verifier: `Darkside_Dammed`, link: `https://www.youtube.com/watch?v=i94Sdwy0_-M`, gamelink: `https://www.roblox.com/games/7278772458/Haze` },
        { title: `Shinku no Naraku`, verifier: `RenVinh`, link: `https://www.youtube.com/watch?v=DhpPhcY8hqA`, gamelink: `https://www.roblox.com/games/5130666899/Shinku-no-naraku` },
        { title: `Arcrux`, verifier: `hehe9709_2`, link: `https://www.youtube.com/watch?v=NdhrRxYLHW8`, gamelink: `https://www.roblox.com/games/9432231942/Arcrux` },
        { title: `Hope For Amendment`, verifier: `hehe9709_2`, link: `https://www.youtube.com/watch?v=KDmw4_npy0s`, gamelink: `https://www.roblox.com/games/5224741716/Hope-For-Amendment` },
        { title: `Comatose`, verifier: `zW_lf`, link: `https://www.youtube.com/watch?v=oAXcx0j1EiM`, gamelink: `https://www.roblox.com/games/5956184387/Comatose` },
        { title: `The Forgotten`, verifier: `Darkside_Dammed`, link: `https://www.youtube.com/watch?v=Rhy4vpv-PfA`, gamelink: `https://www.roblox.com/games/6704089238/The-Forgotten` },
        { title: `Somewhere In Nowhere`, verifier: `pro47147abcd`, link: `https://www.youtube.com/watch?v=bmAp-owNhro&t=16s`, gamelink: `https://www.roblox.com/games/8420630976/Somewhere-in-Nowhere` },
        { title: `Room of Rose`, verifier: `WilliamDuc_06`, link: `https://www.youtube.com/watch?v=muKrLbFOem8`, gamelink: `https://www.roblox.com/games/5278030366/Room-of-Rose` },
        { title: `Tower of Glory`, verifier: `MyDayToBeat`, link: `https://www.youtube.com/watch?v=G0VPpKy9E9A`, gamelink: `https://www.roblox.com/games/2516649497/Tower-Of-Glory` },
        { title: `Amaranthine`, verifier: `WilliamDuc_06`, link: `https://www.youtube.com/watch?v=ADQ-PV8qefE`, gamelink: `https://www.roblox.com/games/6746025955/Amaranthine` },
        { title: `Refraction`, verifier: `Darkside_Dammed`, link: `https://www.youtube.com/watch?v=ZHgs2PTkwI0`, gamelink: `https://www.roblox.com/games/8687594674/Holographic` },
        { title: `Purge`, verifier: `WilliamDuc_06`, link: `https://www.youtube.com/watch?v=ZHgs2PTkwI0`, gamelink: `https://www.roblox.com/games/8473837404/Purge` },
        { title: `TARTARUS`, verifier: `tastygrave7896`, link: `https://www.youtube.com/watch?v=sVUpHk0v4Do`, gamelink: `https://www.roblox.com/games/5767147154/TARTARUS` },
        { title: `Moonlit Cosmos`, verifier: `hehe9709_2`, link: `https://www.youtube.com/watch?v=dMrODkTAUQg`, gamelink: `https://www.roblox.com/games/6088201347/Moonlit-Cosmos` },
        { title: `Denial`, verifier: `WilliamDuc_06`, link: `https://www.youtube.com/watch?v=zI9RBLzyDUw`, gamelink: `https://www.roblox.com/games/5382768129/Denial` },
        { title: `Happy Pill`, verifier: `z1nterlude`, link: `https://www.youtube.com/watch?v=czLTWzPoAZA`, gamelink: `https://www.roblox.com/games/9762643182/happy` },
        { title: `Cosmic Dismay`, verifier: `baconnoobatobbies`, link: `https://www.youtube.com/watch?v=QBBJUJB8EdQ`, gamelink: `https://www.roblox.com/games/7166334901/Cosmic-Dismay` },
        { title: `Scarlet Paracosm`, verifier: `DmncdfggN`, link: `https://www.youtube.com/watch?v=_FAgdgWodDU`, gamelink: `https://www.roblox.com/games/4905465293/Scarlet-Paracosm` },
        { title: `FOR THE; Sakura`, verifier: `DucBaoNguyen2006110`, link: `https://www.youtube.com/watch?v=QifmgNeUDfs`, gamelink: `https://www.roblox.com/games/5112826908/FOR-THE-Sakura` },
        { title: `Noxious Hollow`, verifier: `hehe9709_2`, link: `https://www.youtube.com/watch?v=s2R6CpQoqDw`, gamelink: `https://www.roblox.com/games/6349281093/Noxious-Hollow` },
        { title: `Nescience`, verifier: `oNi_ck`, link: `https://www.youtube.com/watch?v=WVQjg2TtRMI`, gamelink: `https://www.roblox.com/games/8167197490/Nescience` },
        { title: `Lemon Juice`, verifier: `WilliamDuc_06`, link: `https://www.youtube.com/watch?v=nSf4E0Jnvxg`, gamelink: `https://www.roblox.com/games/9185353172/Lemon-Juice` },
        { title: `Spleen 2.0`, verifier: `WilliamDuc_06`, link: `https://www.youtube.com/watch?v=3-xCJcS5lS0`, gamelink: `https://www.roblox.com/games/7239180611/Spleen-2-0` },
        { title: `Adalora`, verifier: `hehe9709_2`, link: `https://www.youtube.com/watch?v=RJEL52QruMQ`, gamelink: `https://www.roblox.com/games/7221949036/Adalora` },
        { title: `Pleasant Pastel Parkour`, verifier: `Darkside_Dammed`, link: `https://www.youtube.com/watch?v=GeTPgynfLWQ`, gamelink: `https://www.roblox.com/games/8129227935/Pleasant-Pastel-Parkour` },
        { title: `Goliad`, verifier: `baconnoobatobbies`, link: `https://www.youtube.com/watch?v=fRSg5v1wdvA`, gamelink: `https://www.roblox.com/games/8845166410/Goliad` },
        { title: `Malachite`, verifier: `De22_picc`, link: `https://www.youtube.com/watch?v=kVKGv_MdyNg`, gamelink: `https://www.roblox.com/games/7200902470/Malachite` },
        { title: `Tower of Toilsome`, verifier: `WilliamDuc_06`, link: `https://www.youtube.com/watch?v=1_zaMBj2U5Q`, gamelink: `https://www.roblox.com/games/6027826183/Tower-of-Toilsome` },
        { title: `Bluestification`, verifier: `DmncdfggN`, link: `https://www.youtube.com/watch?v=ORoO-dIb79U`, gamelink: `https://www.roblox.com/games/5150836146/Bluestification` },
        { title: `Spleen`, verifier: `WilliamDuc_06`, link: `https://www.youtube.com/watch?v=-3j7BrcXRF8`, gamelink: `https://www.roblox.com/games/6063015812/Spleen` },
        { title: `Flourite`, verifier: `z1nterlude`, link: `https://www.youtube.com/watch?v=_o2jupr_adw&t=17s`, gamelink: `https://www.roblox.com/games/8517699538/Fluorite` },
        { title: `Fractured`, verifier: `MapleJokes`, link: `https://www.youtube.com/watch?v=Q9QYG_9legY`, gamelink: `https://www.roblox.com/games/5242498841/Fractured` },
        { title: `The Remains`, verifier: `DmncdfggN`, link: `https://www.youtube.com/watch?v=cnZpnu8pGJY`, gamelink: `https://www.roblox.com/games/5768084723/The-Remains` },
        { title: `Firework`, verifier: `baconnoobatobbies`, link: `https://www.youtube.com/watch?v=s28Rqj4rdv8`, gamelink: `https://www.roblox.com/games/10216972000/Firework` },
        { title: `Site0`, verifier: `Darkside_Dammed`, link: `https://www.youtube.com/watch?v=WxpjCN876wo`, gamelink: `https://www.roblox.com/games/4641587911/Site0` },
        { title: `LOVE;`, verifier: `WilliamDuc_06`, link: `https://www.youtube.com/watch?v=nuTYDhHfd8M`, gamelink: `https://www.roblox.com/games/5315536918/Love` },
        { title: `Sea of Clouds`, verifier: `oNi_ck`, link: `https://www.youtube.com/watch?v=kzfk1DfP7SU`, gamelink: `https://www.roblox.com/games/10048662636/Sea-of-Clouds` },
        { title: `nthree`, verifier: `Sarkdide_Manded`, link: `https://www.youtube.com/watch?v=D55jfayuDvg`, gamelink: `https://www.roblox.com/games/4601576708/nthree` },
        { title: `Chronological`, verifier: `Darkside_Dammed`, link: `https://www.youtube.com/watch?v=tEsySAzwVeE`, gamelink: `https://www.roblox.com/games/5989945139/Chronological` },
        { title: `Tower of Skywing`, verifier: `hehe9709_2`, link: `https://www.youtube.com/watch?v=h1H7o2QSSXQ`, gamelink: `https://www.roblox.com/games/5843157218/Tower-of-Skywing` },
        { title: `Exile`, verifier: `WilliamDuc_06`, link: `https://www.youtube.com/watch?v=FTbfQGT1Uyo`, gamelink: `https://www.roblox.com/games/6593357081/Exile` },
        { title: `Agony`, verifier: `zW_lf`, link: `https://www.youtube.com/watch?v=leHDJRj-nS8`, gamelink: `https://www.roblox.com/games/6605366008/agony` },
        { title: `Half-Hearted Imaginary Entreatment`, verifier: `DucBaoNguyen200610`, link: `https://www.youtube.com/watch?v=x6EBD7RK-ik`, gamelink: `https://www.roblox.com/games/6502779039/Half-hearted-Imaginary-Entreatment` },
        { title: "Forsaken", verifier: "baconnoobatobbies", link: "https://www.youtube.com/watch?v=tNr-e3xEXbs", gamelink: "https://www.roblox.com/games/10133397923/Forsaken-Tier-15-Obby" },
        { title: "Alluring Sonet", verifier: "oNi_ck", link: "https://www.youtube.com/watch?v=p290zYyjkVE", gamelink: "https://www.roblox.com/games/7528328974/Alluring-Sonet" },
        { title: "Short but hard", verifier: "oNi_ck", link: "https://www.youtube.com/watch?v=1kHagq8_Fpc", gamelink: "https://www.roblox.com/games/7834140228/Untitled-Game" }
    ];
    
    const iddata = [
        { title: `Honor`, verifier: `itsmycrafted`, link: `https://www.youtube.com/watch?v=AJIPS8X7Ew8`, gamelink: `https://www.roblox.com/games/7233295548/Honor` },
        { title: `Anata wa horobimasu`, verifier: `proprpod`, link: `https://youtube.com/watch?v=PN8jR22Imus`, gamelink: `https://www.roblox.com/games/5805830267/Anata-wa-horobimasu` },
        { title: `Frostbite`, verifier: `itsmycrafted`, link: `https://www.youtube.com/watch?v=ojTLAGUtmGE`, gamelink: `https://www.roblox.com/games/6549205615/Frostbite` },
        { title: "Tower of Cruel Punishment", verifier: "Ariouss", link: "https://www.youtube.com/watch?v=6gtV1mIjcEU", gamelink: "https://www.roblox.com/games/8562822414/Jukes-Towers-of-Hell-Black-Friday-Sale" },
        { title: `Tower of Vacant Hindrances`, verifier: `itsmycrafted`, link: `https://www.youtube.com/watch?v=-yzCfH72i5A`, gamelink: `https://www.roblox.com/games/4827159348/Tower-of-Vacant-Hindrances` },
        { title: `Tower of Terse Persecution`, verifier: `itsmycrafted`, link: `https://www.youtube.com/watch?v=vmKetDkveig`, gamelink: `https://www.roblox.com/games/5894331183/Tower-of-Terse-Persecution` },
        { title: `Magnetic`, verifier: `itsmycrafted`, link: `https://www.youtube.com/watch?v=Kl3WQlqFuMo`, gamelink: `https://www.roblox.com/games/9943643725/Magnetic` },
        { title: `Longhopping`, verifier: `proprpod`, link: `https://www.youtube.com/watch?v=f_sw0qtYUoU`, gamelink: `https://www.roblox.com/games/7243286067/Longhopping` },
        { title: `The Nightmare`, verifier: `itsmycrafted`, link: `https://www.youtube.com/watch?v=-tFpxAtDfHg`, gamelink: `https://www.roblox.com/games/5643065356/The-Nightmare` },
        { title: `The Conquering`, verifier: `proprpod`, link: `https://www.youtube.com/watch?v=0HUACqQXkoU`, gamelink: `https://www.roblox.com/games/5433278136/The-Conquering` },
        { title: `Tower of Honor`, verifier: `itsmycrafted`, link: `https://www.youtube.com/watch?v=pGS_Kq3PWdY`, gamelink: `https://www.roblox.com/games/6310894976/Tower-Of-Honor` },
        { title: `Goldstone`, verifier: `proprpod`, link: `https://www.youtube.com/watch?v=OX4UsLK_gG8`, gamelink: `https://www.roblox.com/games/6057050367/Goldstone` },
        { title: `Hope for Amendment`, verifier: `proprpod`, link: `https://www.youtube.com/watch?v=A1VMxX1QQbk`, gamelink: `https://www.roblox.com/games/5224741716/Hope-For-Amendment` },
        { title: `Forgotten Obby 2`, verifier: `proprpod`, link: `https://www.youtube.com/watch?v=8wnbTzPMVb4`, gamelink: `https://www.roblox.com/games/6508985294/Forgotten-Obby-2` },
        { title: `Dysphoria`, verifier: `galih_funfan`, link: `https://www.youtube.com/watch?v=h0LtkHfy-WY`, gamelink: `https://www.roblox.com/games/6603931766/` },
        { title: `Tower of Elongated Runs`, verifier: `Ariouss`, link: `https://www.youtube.com/watch?v=lyIn8NU0ZGk`, gamelink: `https://www.roblox.com/games/8562822414/Jukes-Towers-of-Hell-Black-Friday-Sale`},
        { title: `Shinku no Naraku`, verifier: `proprpod`, link: `https://www.youtube.com/watch?v=8Tq4_UXp6s0`, gamelink: `https://www.roblox.com/games/5130666899/Shinku-no-naraku` },
        { title: `Arcrux`, verifier: `galih_funfan`, link: `https://www.youtube.com/watch?v=knmS-MY-oyw`, gamelink: `https://www.roblox.com/games/9432231942/Arcrux` },
        { title: `Tower of Champion's Road`, verifier: `galih_funfan`, link: `https://youtube.com/watch?v=nHPSsPimktE`, gamelink: `https://www.roblox.com/games/8562822414/Jukes-Towers-of-Hell-Black-Friday-Sale` },
        { title: `Affliction`, verifier: `galih_funfan`, link: `https://www.youtube.com/watch?v=2PHRXW57My4`, gamelink: `https://www.roblox.com/games/10073518661/affliction` },
        { title: `Asiruuus`, verifier: `itsmycrafted`, link: `https://www.youtube.com/watch?v=Yad5q00uW38`, gamelink: `https://www.roblox.com/games/11751954628/Asiruuus` },
        { title: `Cobalt Paradox`, verifier: `galih_funfan`, link: `https://www.youtube.com/watch?v=W_cxMZO8JWk`, gamelink: `https://www.roblox.com/games/5956487097/Cobalt-Paradox` },
        { title: `Comatose`, verifier: `proprpod`, link: `https://www.youtube.com/watch?v=ls_exRdAiFU`, gamelink: `https://www.roblox.com/games/5956184387/Comatose` },
        { title: `Aurora`, verifier: `proprpod`, link: `https://www.youtube.com/watch?v=UM_m9PabMNM`, gamelink: `https://www.roblox.com/games/8517938734/Aroura` },
        { title: `Clouds`, verifier: `luzghifal`, link: `https://www.youtube.com/watch?v=pRwzJh2MqjM`, gamelink: `https://www.roblox.com/games/4171325576/Clouds` },
        { title: `Promethean`, verifier: `proprpod`, link: `https://www.youtube.com/watch?v=lRrXe-0cbT8`, gamelink: `https://www.roblox.com/games/7546279761/Promethean` },
        { title: `Tower of Glory`, verifier: `proprpod`, link: `https://www.youtube.com/watch?v=wuSukJGYo40`, gamelink: `https://www.roblox.com/games/2516649497/Tower-Of-Glory` },
        { title: `Amaranthine`, verifier: `galih_funfan`, link: `https://www.youtube.com/watch?v=eauvHQ5k7OE`, gamelink: `https://www.roblox.com/games/6746025955/Amaranthine` },
        { title: `Room of Rose`, verifier: `Marvel2232`, link: `https://www.youtube.com/watch?v=68H1nLN32R4`, gamelink: `https://www.roblox.com/games/5278030366/Room-of-Rose` },
        { title: `rh`, verifier: `Marvel2232`, link: `https://www.youtube.com/watch?v=oOu2-EAS9wI`, gamelink: `https://www.roblox.com/games/5278030366/Room-of-Rose` },
        { title: `Homage`, verifier: `luzghifal`, link: `https://www.youtube.com/watch?v=aTRBDWpP4d0`, gamelink: `https://www.roblox.com/games/8334382645/rh` },
        { title: `Somewhere in Nowhere.`, verifier: `galih_funfan`, link: `https://www.youtube.com/watch?v=cFbMrXIbUDw`, gamelink: `https://www.roblox.com/games/8420630976/Somewhere-in-Nowhere` },
        { title: `Refraction`, verifier: `ikanpedas`, link: `https://www.youtube.com/watch?v=sFUMDFeTBPA`, gamelink: `https://www.roblox.com/games/8687594674/Holographic` },
        { title: `Nevasca`, verifier: `luzghifal`, link: `https://www.youtube.com/watch?v=TeEJQtnQGo4`, gamelink: `https://www.roblox.com/games/5023171502` },
        { title: `Cotton`, verifier: `ikanpedas`, link: `https://www.youtube.com/watch?v=etwMbsWBRzA`, gamelink: `https://www.roblox.com/games/6236417875/cotton` },
        { title: `Nature's Art`, verifier: `galih_funfan`, link: `https://www.youtube.com/watch?v=1UvQXv5dMBg`, gamelink: `https://www.roblox.com/games/6777921600/natures-art` },
        { title: "TARTARUS", verifier: "galih_funfan", link: "https://www.youtube.com/watch?v=rUwyP3G6rL8", gamelink: "https://www.roblox.com/games/5767147154/TARTARUS" },
        { title: "Tritanopia", verifier: "Marvel2232", link: "https://www.youtube.com/watch?v=MuQ6gYJJ2A0", gamelink: "https://www.roblox.com/games/6606307045/Tritanopia" },
        { title: "Divine Intervention", verifier: "galih_funfan", link: "https://www.youtube.com/watch?v=bjYt8Bij5nE", gamelink: "https://www.roblox.com/games/7112567664/divine-intervention" },
        { title: "Nescience", verifier: "galih_funfan", link: "https://www.youtube.com/watch?v=99p8GfuUwaM", gamelink: "https://www.roblox.com/games/8167197490/Nescience" },
        { title: "Moonlit Cosmos", verifier: "proprpod", link: "https://www.youtube.com/watch?v=DbpqUwMUovk", gamelink: "https://www.roblox.com/games/6088201347/Moonlit-Cosmos" },
        { title: "A Monolith", verifier: "Marvel2232", link: "https://www.youtube.com/watch?v=nG0zPAbGv8I", gamelink: "https://www.roblox.com/games/5057397635/A-Monolith" },
        { title: "Scarlet Paracosm", verifier: "galih_funfan", link: "https://www.youtube.com/watch?v=wQ2GhuXbMPU", gamelink: "https://www.roblox.com/games/5057397635/A-Monolith" },
        { title: "Desolate", verifier: "galih_funfan", link: "https://www.youtube.com/watch?v=7fIbyFvW2lg", gamelink: "https://www.roblox.com/games/4923500978/Desolate" },
        { title: "Abyss Room", verifier: "galih_funfan", link: "https://www.youtube.com/watch?v=mXFVWg0RKHo", gamelink: "https://www.roblox.com/games/6468606995/Abyss-room" },
        { title: "Cosmic Dismay", verifier: "galih_funfan", link: "https://www.youtube.com/watch?v=R4aHL2OqNZ4", gamelink: "https://www.roblox.com/games/6468606995/Abyss-room" },
        { title: "Denial", verifier: "MasteronaOof", link: "https://www.youtube.com/watch?v=0UNLjh1JXVM", gamelink: "https://www.roblox.com/games/5382768129/Denial" },
        { title: "Cupid Delight", verifier: "Marvel2232", link: "https://youtube.com/watch?v=pV3K3VXL3lA", gamelink: "https://www.roblox.com/games/10127428972/Cupid-Delight" },
        { title: "Lucid Dream", verifier: "Marvel2232", link: "https://www.youtube.com/watch?v=Jxvliu77vVA", gamelink: "https://www.roblox.com/games/4936120433/Lucid-Dream" },
        { title: "FOR THE; Sakura", verifier: "RaxRB75", link: "https://www.youtube.com/watch?v=rz_lfuaAL3k", gamelink: "https://www.roblox.com/games/5112826908/FOR-THE-Sakura" },
        { title: "a", verifier: "Herfdiug", link: "https://www.youtube.com/watch?v=xFxzyn_78ik", gamelink: "https://www.roblox.com/games/4527777977/a" },
        { title: "Room of Honor", verifier: "proprpod", link: "https://www.youtube.com/watch?v=fZjyBdwMKOw", gamelink: "https://www.roblox.com/games/13543962068/Room-of-Honor" },
        { title: "Purge", verifier: "proprpod", link: "https://www.youtube.com/watch?v=EJ-7qKSj0QA", gamelink: "https://www.roblox.com/games/8473837404/Purge" },
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
        { title: `Tower of Abandoned Pillars`, verifier: `itsmycrafted`, link: `https://www.youtube.com/watch?v=GUiTczXwnjw`, gamelink: `https://www.roblox.com/games/6854048128/Tower-of-Abandoned-Pillars` },
        { title: `Blind Desert`, verifier: `nahlclea`, link: `https://www.youtube.com/watch?v=uSPnaoSdTk4`, gamelink: `https://www.roblox.com/games/4725120919/Blind-desert` },
        { title: `Chronological`, verifier: `ikanpedas`, link: `https://www.youtube.com/watch?v=p2Phc-t9HB0`, gamelink: `https://www.roblox.com/games/5989945139/Chronological` },
        { title: `Concussion`, verifier: `Marvel2232`, link: `https://www.youtube.com/watch?v=tiyqyD3fDGk`, gamelink: `https://www.roblox.com/games/6090615826/Concussion` },
        { title: `Tower of Skywing`, verifier: `galih_funfan`, link: `https://www.youtube.com/watch?v=TXwcyxXGI6k`, gamelink: `https://www.roblox.com/games/5843157218/Tower-of-Skywing` },
        { title: `Malachite`, verifier: `proprpod`, link: `https://www.youtube.com/watch?v=h8jBA2YblUQ`, gamelink: `https://www.roblox.com/games/7200902470/Malachite` },
        { title: `Ice`, verifier: `itsmycrafted`, link: `https://www.youtube.com/watch?v=c1b3cD__hqg`, gamelink: `https://www.roblox.com/games/6291343801/Ice` },
        { title: `Another World`, verifier: `itsmycrafted`, link: `https://www.youtube.com/watch?v=tTKjWJ30iY0`, gamelink: `https://www.roblox.com/games/5675911420/Another-World` },
        { title: `Rise of Colors`, verifier: `galih_funfan`, link: `https://www.youtube.com/watch?v=aabnf_-3Dwc`, gamelink: `https://www.roblox.com/games/8499226517/Rise-of-Colors` },
        { title: `Exile`, verifier: `proprpod`, link: `https://www.youtube.com/watch?v=hFGs-lCMJSc`, gamelink: `https://www.roblox.com/games/6593357081/Exile` },
        { title: `Fluorite`, verifier: `ikanpedas`, link: `https://www.youtube.com/watch?v=eohLlbgtnew`, gamelink: `https://www.roblox.com/games/8517699538/Fluorite` },
        { title: `Pleasant Pastel Parkour`, verifier: `ikanpedas`, link: `https://www.youtube.com/watch?v=zJJQC0gtLj4`, gamelink: `https://www.roblox.com/games/8129227935/Pleasant-Pastel-Parkour` },
        { title: `Dramatic Dimension 2`, verifier: `ikanpedas`, link: `https://www.youtube.com/watch?v=OHxzvi422Z0`, gamelink: `https://www.roblox.com/games/9050507239/Dramatic-Dimensions-2` },
        { title: `Tower of Maltael`, verifier: `itsmycrafted`, link: `https://www.youtube.com/watch?v=VHbWFaSNGfA`, gamelink: `https://www.roblox.com/games/6563428756/Tower-of-Maltael` },
        { title: `Lighting of Alcazar!`, verifier: `millanSURF`, link: `https://www.youtube.com/watch?v=d_KgYglkTzE`, gamelink: `https://www.roblox.com/games/6206744504/Lightning-of-Alcazar` },
        { title: `Epiphany`, verifier: `itsmycrafted`, link: `https://www.youtube.com/watch?v=R25M2D7STnA`, gamelink: `https://www.roblox.com/games/3297930790/Epiphany-Camfix` },
        { title: `Take Myself as a Worthy Wretch`, verifier: `Marvel2232`, link: `https://www.youtube.com/watch?v=P9IiB8bUx74`, gamelink: `https://www.roblox.com/games/4892986209/Take-myself-as-a-worthy-wretch` },
        { title: `Tower of Contraposition`, verifier: `nahlclea`, link: `https://www.youtube.com/watch?v=jolXrX7_Dv4`, gamelink: `https://www.roblox.com/games/7593639579/Purist-Towers-of-Hell` },
        { title: `Obbyists Home`, verifier: `Marvel2232`, link: `https://www.youtube.com/watch?v=e8XoSQRGfg4`, gamelink: `https://www.roblox.com/games/4616343089/Obbyists-Home` },
        { title: `Tower of Stigmatism`, verifier: `nahlclea`, link: `https://www.youtube.com/watch?v=muVNijgfjOE`, gamelink: `https://www.roblox.com/games/7593639579/Purist-Towers-of-Hell` }
    ];
    if (document.getElementById('voc-list')) {
        let total = 0;
        const container = document.getElementById('cards-container');
        const legacycontainer = document.getElementById('legacy-container');
        vndata.forEach(item => {
            total += 1;
            const card = document.createElement('div');
            card.className = 'card';
            const link = document.createElement('a');
            link.href = item.link;
            link.target = "_blank";
            link.className = "link-overlay";
            card.appendChild(link);
            const videoId = item.link.split('v=')[1].split('&')[0];
            const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            const img = document.createElement('img');
            img.src = thumbnailUrl;
            img.classList.add('thumbnail');
            link.appendChild(img);
            const info = document.createElement('div');
            info.className = 'info';
            card.appendChild(info);
            const flag = document.createElement('img');
            flag.src = `assets/vn.svg`;
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
    }if (document.getElementById('eio-list')) {
    let total = 0;
    const container = document.getElementById('cards-container');
    const legacycontainer = document.getElementById('legacy-container');
    iddata.forEach(item => {
        total += 1;
        const card = document.createElement('div');
        card.className = 'card';
        const link = document.createElement('a');
        link.href = item.link;
        link.target = "_blank";
        link.className = "link-overlay";
        card.appendChild(link);
        const videoId = item.link.split('v=')[1].split('&')[0];
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        const img = document.createElement('img');
        img.src = thumbnailUrl;
        img.classList.add('thumbnail');
        link.appendChild(img);
        const info = document.createElement('div');
        info.className = 'info';
        card.appendChild(info);
        const flag = document.createElement('img');
        flag.src = `assets/id.svg`;
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
}
    if (document.getElementById('eio-list')) {
        let total = 0;
        const container = document.getElementById('cards-container');
        const legacycontainer = document.getElementById('legacy-container');
        iddata.forEach(item => {
            total += 1;
            const card = document.createElement('div');
            card.className = 'card';
            const link = document.createElement('a');
            link.href = item.link;
            link.target = "_blank";
            link.className = "link-overlay";
            card.appendChild(link);
            const videoId = item.link.split('v=')[1].split('&')[0];
            const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            const img = document.createElement('img');
            img.src = thumbnailUrl;
            img.classList.add('thumbnail');
            link.appendChild(img);
            const info = document.createElement('div');
            info.className = 'info';
            card.appendChild(info);
            const flag = document.createElement('img');
            flag.src = `assets/id.svg`;
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
    }
});