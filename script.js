// Function to create sine wave
function drawSineWave(amplitude, frequency, phaseShift, verticalOffset, color, speed) {
    const width = canvas.width;
    const height = canvas.height;

    // Begin the drawing path for sine wave
    ctx.beginPath();
    ctx.moveTo(0, height / 2); // Start from the middle-left of the screen
    ctx.strokeStyle = color; // Set wave color
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

    // Draw multiple sine waves with different parameters and lighter gray color
    drawSineWave(50, 0.02, phaseShift1, canvas.height * 0.5, '#d3d3d3', 0.005); // Lighter gray wave 1
    drawSineWave(30, 0.03, phaseShift2, canvas.height * 0.6, '#c0c0c0', 0.005); // Slightly darker lighter gray wave 2
    drawSineWave(70, 0.015, phaseShift3, canvas.height * 0.4, '#b0b0b0', 0.005); // Slightly darker gray wave 3

    // Slow down the phase shifts to make waves move slower
    phaseShift1 += 0.005; // Slower speed for wave 1
    phaseShift2 += 0.003; // Even slower speed for wave 2
    phaseShift3 += 0.004; // Slower speed for wave 3

    // Repeat the animation
    requestAnimationFrame(animate);
}

// Start the animation
animate();