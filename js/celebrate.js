const fireworkButton = document.getElementById('fireworks-button');
fireworkButton.onclick = function(event) {
    event.preventDefault(); // Prevent default anchor link behavior

    // Fire confetti
    let duration = 2 * 1000; // 2 seconds
    let animationEnd = Date.now() + duration;

    const goldShades = ['#FFD700', '#FFC700', '#FFA000', '#FFBF00']; // Array of gold colors

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        // Fire confetti on the left side
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: goldShades, // Set the colors to the array of gold shades
        });

        // Fire confetti on the right side
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: goldShades, // Set the colors to the array of gold shades
        });
    }, 250); // Fire every 250 milliseconds

    // Scroll to the target after the confetti animation completes
    setTimeout(function() {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    }, duration);
};