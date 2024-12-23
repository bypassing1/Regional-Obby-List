const loader = document.getElementsByClassName("loader")[0];

    const startTransition = () => {
        loader.style.transform = "translateX(100%)";
    };

    window.addEventListener("load", () => {
        startTransition();
    });
