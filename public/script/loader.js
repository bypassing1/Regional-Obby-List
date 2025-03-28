const loader = document.getElementsByClassName("loader")[0];

    const startTransition = () => {
        loader.style.transform = "translateX(100%)";
    };

    window.addEventListener("load", () => {
        startTransition();
    });

    function loadHTML(file, elementId) {
        fetch(file)
            .then(response => response.text())
            .then(html => {
                document.getElementById(elementId).innerHTML = html;
            })
            .catch(err => console.error(`Error loading ${file}:`, err));
    }

    document.addEventListener("DOMContentLoaded", () => {
        loadHTML("layout/header.html", "header-container");
        loadHTML("layout/footer.html", "footer-container");
    });
