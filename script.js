const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Array to hold the circle "stars"
let circles = [];

// Function to create small golden circles
function createCircles(count) {
    for (let i = 0; i < count; i++) {
        circles.push({
            x: Math.random() * canvas.width,  // Random initial x-position
            y: Math.random() * canvas.height, // Random initial y-position
            radius: Math.random() * 3 + 1,    // Small radius between 1 and 4
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

// Add the sine wave animation from previous code
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

// Main animation loop to animate both sine waves and circles
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw sine waves with darker gold
    drawSineWave(50, 0.02, phaseShift1, canvas.height * 0.5, 'rgba(139, 101, 0, 0.6)', 0.005);
    drawSineWave(30, 0.03, phaseShift2, canvas.height * 0.6, 'rgba(120, 85, 0, 0.6)', 0.005);
    drawSineWave(70, 0.015, phaseShift3, canvas.height * 0.4, 'rgba(160, 120, 0, 0.6)', 0.005);

    // Animate the phase shift for the sine waves
    phaseShift1 += 0.002;
    phaseShift2 += 0.001;
    phaseShift3 += 0.0015;

    // Draw and update circles (golden stars)
    drawCircles();
    updateCircles();

    requestAnimationFrame(animate);
}

// Initialize circles and start animation
createCircles(100); // You can increase or decrease the number of circles
animate();