const fireworkButton = document.getElementById('fireworks-button');
fireworkButton.onclick = function(event) {
    event.preventDefault(); // Prevent default anchor link behavior

    // Fire confetti
    let duration = 2 * 1000; // 2 seconds
    let animationEnd = Date.now() + duration;

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        // Start confetti
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
        });
    }, 250); // Fire every 250 milliseconds

    // Scroll to the target after 3 seconds
    setTimeout(function() {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    }, duration);
};