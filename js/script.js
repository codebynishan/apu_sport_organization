    const hamburger = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active'); // [TODO - Add mobile styles for .active class in CSS]
    });
