const dropbutton = document.getElementsByClassName('dropbtn')[0]
dropbutton.addEventListener('click', () => {
    const dropdownContent = document.getElementsByClassName('dropdown-content')[0];
    dropdownContent.classList.toggle('show');
});