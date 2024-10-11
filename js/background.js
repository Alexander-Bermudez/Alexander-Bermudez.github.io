const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");

// Function to set canvas dimensions
function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Set initial canvas size
setCanvasSize();

// Array to hold the circle "stars"
let circles = [];

// Function to create small golden circles
function createCircles(count) {
    for (let i = 0; i < count; i++) {
        circles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            color: `rgba(218,165,32,${Math.random() * 0.4 + 0.1})`,
            dx: (Math.random() - 0.5) * 0.1,
            dy: (Math.random() - 0.5) * 0.1
        });
    }
}

// Function to draw the small circles on canvas
function drawCircles() {
    circles.forEach(circle => {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = circle.color;
        ctx.fill();
    });
}

// Function to update circle positions
function updateCircles() {
    circles.forEach(circle => {
        circle.x += circle.dx;
        circle.y += circle.dy;

        if (circle.x > canvas.width) circle.x = 0;
        if (circle.x < 0) circle.x = canvas.width;
        if (circle.y > canvas.height) circle.y = 0;
        if (circle.y < 0) circle.y = canvas.height;
    });
}

// Ripple effect data
let ripples = [];

// Function to draw sine wave with ripple effect
function drawSineWave(amplitude, frequency, phaseShift, verticalOffset, color) {
    const width = canvas.width;
    const height = canvas.height;

    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    for (let x = 0; x < width; x++) {
        let y = amplitude * Math.sin((x * frequency) + phaseShift) + verticalOffset;

        // Apply ripple effect from all current ripples
        ripples.forEach(ripple => {
            const distFromRipple = Math.abs(x - ripple.x);
            if (distFromRipple < ripple.radius) {
                const rippleEffect = ripple.strength * Math.sin(distFromRipple * ripple.frequency);
                y += rippleEffect * (ripple.radius - distFromRipple) / ripple.radius; // Dampen as ripple moves outward
            }
        });

        ctx.lineTo(x, y);
    }

    ctx.stroke();
}

// Animation variables
let phaseShift1 = 0;
let phaseShift2 = 0;
let phaseShift3 = 0;
let baseAmplitude1 = 50;
let baseAmplitude2 = 30;
let baseAmplitude3 = 70;

// Function to create a new ripple
function createRipple(x) {
    ripples.push({
        x: x,
        radius: 0,
        maxRadius: 150,    // The maximum size of the ripple
        strength: 20,      // Initial ripple strength
        frequency: 0.05    // Ripple wave frequency
    });
}

// Mouse and touch movement listener for ripple effect
function handleInteraction(event) {
    const canvasBounds = canvas.getBoundingClientRect();
    let mouseX;

    if (event.type === 'mousemove') {
        mouseX = event.clientX - canvasBounds.left;
    } else if (event.type === 'touchmove') {
        mouseX = event.touches[0].clientX - canvasBounds.left;
    }

    createRipple(mouseX);
}

// Main animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const height = canvas.height;

    // Draw sine waves with ripple effects
    drawSineWave(baseAmplitude1, 0.02, phaseShift1, height * 0.5, 'rgba(139, 101, 0, 0.6)');
    drawSineWave(baseAmplitude2, 0.03, phaseShift2, height * 0.6, 'rgba(120, 85, 0, 0.6)');
    drawSineWave(baseAmplitude3, 0.015, phaseShift3, height * 0.4, 'rgba(160, 120, 0, 0.6)');

    // Animate the phase shift for continuous movement
    phaseShift1 += 0.002;
    phaseShift2 += 0.001;
    phaseShift3 += 0.0015;

    // Update ripples
    ripples.forEach((ripple, index) => {
        ripple.radius += 3; // Ripple expansion speed
        ripple.strength *= 0.98; // Dampen ripple over time

        // Remove ripple if it has reached its maximum radius or strength is too low
        if (ripple.radius > ripple.maxRadius || ripple.strength < 0.1) {
            ripples.splice(index, 1);
        }
    });

    // Draw and update circles (golden stars)
    drawCircles();
    updateCircles();

    requestAnimationFrame(animate);
}

// Initialize circles and start animation
createCircles(100);
animate();

// Add event listener for window resize
window.addEventListener('resize', () => {
    setCanvasSize();
});

// Event listeners for mouse and touch interactions
window.addEventListener('mousemove', handleInteraction);
window.addEventListener('touchmove', handleInteraction, { passive: true });