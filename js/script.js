const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.onclick = function() {
    navLinks.classList.toggle('show'); // Toggle 'show' class to control visibility
};