const appRoot = document.documentElement;
const nav = document.querySelector(".lists");
const root = document.documentElement;
const loader = document.querySelector(".loader");
const mainDiv = document.querySelector(".main");
const legacyDiv = document.querySelector(".legacy");
const typeList = document.getElementById("type-list");

const endTransition = () => {
    loader.addEventListener("transitionend", () => {
        loader.style.transform = "translateX(100%)";
        root.classList.remove("disable-hover");
    });
    loader.style.transform = "";
};

function toggleDropdown() {
    const dropdownContent = document.getElementById("dropdownContent");
    dropdownContent.classList.toggle("show");
}

const startTransition = () => {
    loader.style.transform = "translateX(100%)";
    appRoot.dataset.route = "a";
    mainDiv.style.display = "flex";
    legacyDiv.style.display = "none";
    typeList.style.opacity = "1";
};

nav.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
        let a = nav.querySelector(".active");
        root.classList.add("disable-hover");
        if (a) {
            a.classList.remove("active");
        }
        e.target.closest("a").classList.add("active");
        e.preventDefault();
    }
});

const onRouteClick = (route) => {
    if (appRoot.dataset.route === route) return;
    appRoot.dataset.route = route;
    typeList.style.opacity = "0";

    if (route === "a") {
        legacyDiv.style.opacity = "0";
        setTimeout(() => {
            legacyDiv.style.display = "none";
            mainDiv.style.display = "flex";
            mainDiv.style.opacity = "1";
            typeList.textContent = "MAIN LIST";
            typeList.style.opacity = "1";
        }, 500);
    } else if (route === "b") {
        mainDiv.style.opacity = "0";
        setTimeout(() => {
            mainDiv.style.display = "none";
            legacyDiv.style.display = "flex";
            legacyDiv.style.opacity = "1";
            typeList.textContent = "LEGACY LIST";
            typeList.style.opacity = "1";
        }, 500);
    }

    endTransition();
};

window.addEventListener("load", () => {
    startTransition();
    legacyDiv.style.opacity = "0";
    setTimeout(() => {
        legacyDiv.style.display = "none";
        mainDiv.style.display = "flex";
        mainDiv.style.opacity = "1";
        typeList.textContent = "MAIN LIST";
        typeList.style.opacity = "1";
    }, 500);
});