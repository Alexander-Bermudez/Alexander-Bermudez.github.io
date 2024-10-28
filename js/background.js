const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");

// Set initial canvas size
function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
setCanvasSize();

// Array to hold the circle "stars"
let circles = [];

// Create small golden circles
function createCircles(count) {
    circles = [];
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

// Draw circles
function drawCircles() {
    circles.forEach(circle => {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = circle.color;
        ctx.fill();
    });
}

// Update circle positions
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

// Draw sine waves with dynamic amplitude
function drawDynamicAmplitudeSineWave(amplitude, frequency, phaseShift, verticalOffset, color, speed, time, timeFactor) {
    const width = canvas.width;
    const height = canvas.height;

    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    for (let x = 0; x < width; x++) {
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
let animationFrameId; 

// Main animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawDynamicAmplitudeSineWave(50, 0.02, phaseShift1, canvas.height * 0.5, 'rgba(139, 101, 0, 0.6)', 0.005, time, 0.15);
    drawDynamicAmplitudeSineWave(30, 0.03, phaseShift2, canvas.height * 0.6, 'rgba(120, 85, 0, 0.6)', 0.005, time, 0.1);
    drawDynamicAmplitudeSineWave(70, 0.015, phaseShift3, canvas.height * 0.4, 'rgba(160, 120, 0, 0.6)', 0.005, time, 0.2);

    phaseShift1 += 0.002;
    phaseShift2 += 0.001;
    phaseShift3 += 0.0015;

    drawCircles();
    updateCircles();

    time += 0.01;
    animationFrameId = requestAnimationFrame(animate);
}

// Start and stop functions
function startAnimation() {
    if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(animate);
    }
}

function stopAnimation() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
}

// Initialize circles and start animation
createCircles(100);
startAnimation();

window.addEventListener('resize', () => {
    setCanvasSize();
    createCircles(100);
});

// Toggle pause and play
const toggleButton = document.getElementById('toggleButton');
const pauseIcon = document.getElementById('pauseIcon');
const playIcon = document.getElementById('playIcon');
let isPaused = false;

toggleButton.addEventListener('click', (e) => {
    e.preventDefault();

    if (isPaused) {
        startAnimation();
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    } else {
        stopAnimation();
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    }

    isPaused = !isPaused;
});