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

// JavaScript to handle fade-up on smaller screens for hero
document.addEventListener("DOMContentLoaded", function () {
    const lines = document.querySelectorAll(".line");

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("fade-up");
                } else {
                    entry.target.classList.remove("fade-up");
                }
            });
        },
        {
            threshold: 0.1, // Trigger when 10% of the element is visible
        }
    );

    // Apply observer only if screen width is less than or equal to 768px
    if (window.innerWidth <= 768) {
        lines.forEach(line => observer.observe(line));
    }
});