const canvas = document.getElementById('matrix');
const context = canvas.getContext('2d');

// Set canvas size to cover the entire screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';

const alphabet = katakana + latin + nums;

const fontsize = 16; // Font size for the characters
const columns = canvas.width / fontsize; // Number of columns based on canvas width

// Create an array to store y-position for each column
const rainDrops = Array.from({ length: columns }, () => 1);

// Function to draw the Matrix effect
const draw = () => {
    // Black background with slight transparency for the fade effect
    context.fillStyle = 'rgba(0, 0, 0, 0.05)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Green characters
    context.fillStyle = "#39FF14";
    context.font = `${fontsize}px monospace`;

    // Draw each character at its respective column position
    for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        context.fillText(text, i * fontsize, rainDrops[i] * fontsize);

        // Reset drop to the top after reaching the bottom or randomly
        if (rainDrops[i] * fontsize > canvas.height && Math.random() > 0.975) {
            rainDrops[i] = 0;
        }
        rainDrops[i]++;
    }
};

// Repeatedly draw the effect at a fixed interval
setInterval(draw, 50);

// Adjust canvas size dynamically on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Recalculate the number of columns and reset rainDrops
    const newColumns = Math.floor(canvas.width / fontsize);
    rainDrops.length = newColumns;
    for (let i = 0; i < newColumns; i++) {
        if (!rainDrops[i]) rainDrops[i] = 1;
    }
});
