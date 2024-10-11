const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

// Toggle the 'show' class to control visibility when the hamburger is clicked
hamburger.onclick = function() {
    navLinks.classList.toggle('show'); // Toggle 'show' class to control visibility

    if (navLinks.classList.contains('show')) {
        // Calculate the height dynamically and apply it
        const linksHeight = navLinks.scrollHeight + 'px'; // Get the height of the content
        navLinks.style.height = linksHeight; // Set the height to the content height
    } else {
        navLinks.style.height = '0'; // Collapse back to height 0
    }
};

// Close the menu when a link is clicked
const links = navLinks.getElementsByTagName('a'); // Get all anchor links in the nav menu

for (let i = 0; i < links.length; i++) {
    links[i].onclick = function() {
        navLinks.classList.remove('show'); // Remove 'show' class to hide the menu
        navLinks.style.height = '0'; // Collapse back to height 0
    };
}