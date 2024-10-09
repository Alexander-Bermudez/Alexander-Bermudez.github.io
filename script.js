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
    drawSineWave(50, 0.02, phaseShift1, canvas.height * 0.5, '#C68600', 0.005); // Darker gold wave 1
    drawSineWave(30, 0.03, phaseShift2, canvas.height * 0.6, '#B86A00', 0.005); // Darker gold wave 2
    drawSineWave(70, 0.015, phaseShift3, canvas.height * 0.4, '#D8A700', 0.005); // Lighter dark gold wave 3

    // Increment the phase shifts to animate the waves
    phaseShift1 += 0.02;
    phaseShift2 += 0.015;
    phaseShift3 += 0.01;

    // Repeat the animation
    requestAnimationFrame(animate);
}

// Start the animation
animate();