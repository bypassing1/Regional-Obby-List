
    const dropbutton = document.getElementById('dropbutton')
    dropbutton.addEventListener('click', () => {
        const dropdownContent = document.getElementById('dropdownContent');
        dropdownContent.classList.toggle('show');
    });
    const loader = document.getElementsByClassName("loader")[0];

    const startTransition = () => {
        loader.style.transform = "translateX(100%)";
    };

    window.addEventListener("load", () => {
        startTransition();
    });
