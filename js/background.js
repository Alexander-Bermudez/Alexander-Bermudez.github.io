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
let rippleX = null;
let rippleStrength = 0;

// Function to draw sine wave with ripple effect
function drawSineWave(amplitude, frequency, phaseShift, verticalOffset, color, rippleX, rippleStrength) {
    const width = canvas.width;
    const height = canvas.height;

    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    for (let x = 0; x < width; x++) {
        let y = amplitude * Math.sin((x * frequency) + phaseShift) + verticalOffset;

        // Apply ripple effect if within a ripple zone
        if (rippleX !== null && Math.abs(x - rippleX) < 100) {
            const rippleDist = Math.abs(x - rippleX);
            const rippleEffect = rippleStrength * Math.sin(rippleDist * 0.1); // Ripple sinusoidal disturbance
            y += rippleEffect * (100 - rippleDist) / 100; // Dampens as ripple propagates outward
        }

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

let mouseX = 0;
let mouseY = 0;

// Mouse and touch movement listener for ripple effect
function createRipple(event) {
    const canvasBounds = canvas.getBoundingClientRect();
    if (event.type === 'mousemove') {
        mouseX = event.clientX - canvasBounds.left;
        mouseY = event.clientY - canvasBounds.top;
    } else if (event.type === 'touchmove') {
        mouseX = event.touches[0].clientX - canvasBounds.left;
        mouseY = event.touches[0].clientY - canvasBounds.top;
    }
    
    // Set ripple parameters
    rippleX = mouseX;
    rippleStrength = 15; // Initial ripple strength
}

// Main animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const height = canvas.height;

    // Draw sine waves with ripple effects
    drawSineWave(baseAmplitude1, 0.02, phaseShift1, height * 0.5, 'rgba(139, 101, 0, 0.6)', rippleX, rippleStrength);
    drawSineWave(baseAmplitude2, 0.03, phaseShift2, height * 0.6, 'rgba(120, 85, 0, 0.6)', rippleX, rippleStrength);
    drawSineWave(baseAmplitude3, 0.015, phaseShift3, height * 0.4, 'rgba(160, 120, 0, 0.6)', rippleX, rippleStrength);

    // Animate the phase shift for continuous movement
    phaseShift1 += 0.002;
    phaseShift2 += 0.001;
    phaseShift3 += 0.0015;

    // Gradually dampen the ripple strength
    if (rippleStrength > 0) {
        rippleStrength *= 0.95; // Reduce ripple strength over time
    }

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
window.addEventListener('mousemove', createRipple);
window.addEventListener('touchmove', createRipple, { passive: true });