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
    circles = []; // Clear the previous circles
    for (let i = 0; i < count; i++) {
        circles.push({
            x: Math.random() * canvas.width,  // Random initial x-position
            y: Math.random() * canvas.height, // Random initial y-position
            radius: Math.random() * 2 + 1,    // Small radius between 1 and 3
            color: `rgba(218,165,32,${Math.random() * 0.4 + 0.1})`, // Golden color with random lower opacity (between 0.1 and 0.5)
            dx: (Math.random() - 0.5) * 0.1,  // **Slower horizontal movement speed**
            dy: (Math.random() - 0.5) * 0.1   // **Slower vertical movement speed**
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

        // Wrap the circles around the edges of the canvas
        if (circle.x > canvas.width) circle.x = 0;
        if (circle.x < 0) circle.x = canvas.width;
        if (circle.y > canvas.height) circle.y = 0;
        if (circle.y < 0) circle.y = canvas.height;
    });
}

// Function to draw a sine wave with dynamic amplitude
function drawDynamicAmplitudeSineWave(amplitude, frequency, phaseShift, verticalOffset, color, speed, time, timeFactor) {
    const width = canvas.width;
    const height = canvas.height;

    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    for (let x = 0; x < width; x++) {
        // Dynamic amplitude changes based on timeFactor for each wave
        const dynamicAmplitude = amplitude + Math.sin(time * timeFactor) * amplitude * 0.3;
        const y = dynamicAmplitude * Math.sin((x * frequency) + phaseShift) + verticalOffset;
        ctx.lineTo(x, y);
    }

    ctx.stroke();
}

// Animation variables
let phaseShift1 = 0;
let phaseShift2 = 0;
let phaseShift3 = 0;
let time = 0;
let animationFrameId; // Variable to store the animation frame ID

// Main animation loop to animate both sine waves and circles
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw sine waves with different amplitude breathing patterns
    drawDynamicAmplitudeSineWave(50, 0.02, phaseShift1, canvas.height * 0.5, 'rgba(139, 101, 0, 0.6)', 0.005, time, 0.15); // Slower breathing
    drawDynamicAmplitudeSineWave(30, 0.03, phaseShift2, canvas.height * 0.6, 'rgba(120, 85, 0, 0.6)', 0.005, time, 0.1);  // Slightly faster breathing
    drawDynamicAmplitudeSineWave(70, 0.015, phaseShift3, canvas.height * 0.4, 'rgba(160, 120, 0, 0.6)', 0.005, time, 0.2); // Moderate breathing

    // Animate the phase shift for the sine waves
    phaseShift1 += 0.002;
    phaseShift2 += 0.001;
    phaseShift3 += 0.0015;

    // Draw and update circles (golden stars)
    drawCircles();
    updateCircles();

    // Update time for dynamic amplitude behavior
    time += 0.01;

    animationFrameId = requestAnimationFrame(animate);
}

// Function to start the animation
function startAnimation() {
    if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(animate);
    }
}

// Function to stop the animation
function stopAnimation() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
}

// Initialize circles and start animation
createCircles(100); // You can increase or decrease the number of circles
startAnimation(); // Start animation initially

// Add event listener for window resize
window.addEventListener('resize', () => {
    setCanvasSize(); // Resize the canvas
    createCircles(100); // Recreate circles based on the new size
});

// Reference the toggle button and SVG icons
const toggleButton = document.getElementById('toggleButton');
const pauseIcon = document.getElementById('pauseIcon');
const playIcon = document.getElementById('playIcon');

// Add a variable to keep track of the canvas display status
let isPaused = false;

// Event listener for button click
toggleButton.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default action of <a> tag

    // Toggle canvas display
    if (isPaused) {
        canvas.style.display = 'block'; // Show canvas
        startAnimation(); // Start animation
        playIcon.style.display = 'none'; // Hide play icon
        pauseIcon.style.display = 'block'; // Show pause icon
    } else {
        canvas.style.display = 'none'; // Hide canvas
        stopAnimation(); // Stop animation
        playIcon.style.display = 'block'; // Show play icon
        pauseIcon.style.display = 'none'; // Hide pause icon
    }

    // Toggle paused state
    isPaused = !isPaused;
});