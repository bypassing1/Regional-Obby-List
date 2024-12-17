const dropbutton = document.getElementById('dropbutton')
dropbutton.addEventListener('click', () => {
    const dropdownContent = document.getElementById('dropdownContent');
    dropdownContent.classList.toggle('show');
});