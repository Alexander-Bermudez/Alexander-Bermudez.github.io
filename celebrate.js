document.getElementById('fireworks-button').onclick = function(event) {
    event.preventDefault(); // Prevent default anchor link behavior

    // Trigger confetti
    party.confetti(this, {
        count: party.variation.range(20, 40), // Random number of confetti pieces
    });

    // Scroll to the target after 3 seconds
    setTimeout(function() {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    }, 3000); // 3000 milliseconds = 3 seconds
};