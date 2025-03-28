document.addEventListener('click', (event) => {
    const button = event.target.closest('.dropbtn');
    if (button) {
        const dropdownContent = button.nextElementSibling;
        dropdownContent.classList.toggle('show');
    }
});
