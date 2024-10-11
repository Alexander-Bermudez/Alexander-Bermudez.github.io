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

// Function to draw sine wave
function drawSineWave(amplitude, frequency, phaseShift, verticalOffset, color, speed) {
    const width = canvas.width;
    const height = canvas.height;

    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    for (let x = 0; x < width; x++) {
        const y = amplitude * Math.sin((x * frequency) + phaseShift) + verticalOffset;
        ctx.lineTo(x, y);
    }

    ctx.stroke();
}

// Animation variables
let phaseShift1 = 0;
let phaseShift2 = 0;
let phaseShift3 = 0;
let mouseX = 0;
let mouseY = 0;

// Mouse and touch movement listener for responsiveness
function updateWaveParams(event) {
    // Get mouse or touch position relative to canvas
    const canvasBounds = canvas.getBoundingClientRect();
    if (event.type === 'mousemove') {
        mouseX = event.clientX - canvasBounds.left;
        mouseY = event.clientY - canvasBounds.top;
    } else if (event.type === 'touchmove') {
        mouseX = event.touches[0].clientX - canvasBounds.left;
        mouseY = event.touches[0].clientY - canvasBounds.top;
    }

    // Map mouse/touch position to phase shift and amplitude
    const width = canvas.width;
    const height = canvas.height;
    
    // Adjust phase shifts and amplitudes based on input
    phaseShift1 = (mouseX / width) * 2 * Math.PI;  // Horizontal mouse movement affects phase
    phaseShift2 = (mouseY / height) * 2 * Math.PI; // Vertical movement affects phase
}

// Main animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw sine waves with interaction responsiveness
    drawSineWave(50 + (mouseY / canvas.height) * 30, 0.02, phaseShift1, canvas.height * 0.5, 'rgba(139, 101, 0, 0.6)', 0.005);
    drawSineWave(30 + (mouseX / canvas.width) * 30, 0.03, phaseShift2, canvas.height * 0.6, 'rgba(120, 85, 0, 0.6)', 0.005);
    drawSineWave(70 + (mouseY / canvas.height) * 30, 0.015, phaseShift3, canvas.height * 0.4, 'rgba(160, 120, 0, 0.6)', 0.005);

    // Draw and update circles (golden stars)
    drawCircles();
    updateCircles();

    requestAnimationFrame(animate);
}

// Initialize circles and start animation
createCircles(100); // You can increase or decrease the number of circles
animate();

// Add event listener for window resize
window.addEventListener('resize', () => {
    setCanvasSize();
});

// Event listeners for mouse and touch interactions
window.addEventListener('mousemove', updateWaveParams);
window.addEventListener('touchmove', updateWaveParams, { passive: true });