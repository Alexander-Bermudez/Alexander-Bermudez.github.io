function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add 'visible' class when section comes into view
            entry.target.classList.add('visible');
        } else {
            // Remove 'visible' class when section goes out of view
            entry.target.classList.remove('visible');
        }
    });
}

// Create Intersection Observer
const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.1 // Trigger when 10% of the section is visible
});

// Observe all sections
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    observer.observe(section);
});