const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");
let paused = false;
let opacity = 1; // Opacity for fading out the animation

// Set canvas dimensions based on the window size
function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

setCanvasSize();

let circles = [];

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

function drawCircles() {
    circles.forEach(circle => {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = circle.color.replace(/[\d.]+\)$/g, opacity + ')'); // Adjust opacity
        ctx.fill();
    });
}

function updateCircles() {
    if (!paused) {
        circles.forEach(circle => {
            circle.x += circle.dx;
            circle.y += circle.dy;
            if (circle.x > canvas.width) circle.x = 0;
            if (circle.x < 0) circle.x = canvas.width;
            if (circle.y > canvas.height) circle.y = 0;
            if (circle.y < 0) circle.y = canvas.height;
        });
    }
}

function drawDynamicAmplitudeSineWave(amplitude, frequency, phaseShift, verticalOffset, color, speed, time, timeFactor) {
    ctx.beginPath();
    ctx.strokeStyle = color.replace(/[\d.]+\)$/g, opacity + ')'); // Adjust opacity for fading effect
    ctx.lineWidth = 2;
    const width = canvas.width;
    const height = canvas.height;

    for (let x = 0; x < width; x++) {
        const dynamicAmplitude = amplitude + Math.sin(time * timeFactor) * amplitude * 0.3;
        const y = dynamicAmplitude * Math.sin((x * frequency) + phaseShift) + verticalOffset;
        ctx.lineTo(x, y);
    }
    ctx.stroke();
}

let phaseShift1 = 0;
let phaseShift2 = 0;
let phaseShift3 = 0;
let time = 0;

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (paused && opacity > 0) {
        opacity -= 0.02; // Gradually reduce opacity for fade-out effect
    } else if (!paused && opacity < 1) {
        opacity += 0.02; // Gradually restore opacity for fade-in effect
    }

    drawDynamicAmplitudeSineWave(50, 0.02, phaseShift1, canvas.height * 0.5, 'rgba(139, 101, 0, 0.6)', 0.005, time, 0.15);
    drawDynamicAmplitudeSineWave(30, 0.03, phaseShift2, canvas.height * 0.6, 'rgba(120, 85, 0, 0.6)', 0.005, time, 0.1);
    drawDynamicAmplitudeSineWave(70, 0.015, phaseShift3, canvas.height * 0.4, 'rgba(160, 120, 0, 0.6)', 0.005, time, 0.2);

    if (!paused) {
        phaseShift1 += 0.002;
        phaseShift2 += 0.001;
        phaseShift3 += 0.0015;
        time += 0.01;
    }

    drawCircles();
    updateCircles();

    requestAnimationFrame(animate);
}

// Create circles and start animation
createCircles(100);
animate();

// Play/Pause SVG icons toggle logic
const toggleAnimationLink = document.getElementById("toggleAnimation");
const playIcon = document.getElementById("playIcon");
const pauseIcon = document.getElementById("pauseIcon");

toggleAnimationLink.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent any page reload on click

    paused = !paused;

    // Toggle visibility of SVGs
    if (paused) {
        playIcon.style.display = "block";
        pauseIcon.style.display = "none";
    } else {
        playIcon.style.display = "none";
        pauseIcon.style.display = "block";
    }
});

// Adjust canvas size and recreate circles on window resize
window.addEventListener('resize', () => {
    setCanvasSize();
    createCircles(100);
});