// Get the canvas and its context
const canvas = document.getElementById('sineCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Resize canvas when window is resized
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Function to create sine wave
function drawSineWave(amplitude, frequency, phaseShift, verticalOffset, color, speed) {
    const width = canvas.width;
    const height = canvas.height;

    // Begin the drawing path for sine wave
    ctx.beginPath();
    ctx.moveTo(0, height / 2); // Start from the middle-left of the screen
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    // Loop over the canvas width to create the wave
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

// Animation loop
function animate() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw multiple sine waves with different parameters
    drawSineWave(50, 0.02, phaseShift1, canvas.height * 0.5, '#D4A000', 0.005); // Darker yellow wave 1
    drawSineWave(30, 0.03, phaseShift2, canvas.height * 0.6, '#B89000', 0.005); // Darker yellow wave 2
    drawSineWave(70, 0.015, phaseShift3, canvas.height * 0.4, '#A07800', 0.005); // Even darker yellow wave 3


    // Slow down the phase shifts to make waves move slower
    phaseShift1 += 0.002; // Much slower speed for wave 1
    phaseShift2 += 0.001; // Even slower speed for wave 2
    phaseShift3 += 0.0015; // Slower speed for wave 3

    // Repeat the animation
    requestAnimationFrame(animate);
}

// Start the animation
animate();