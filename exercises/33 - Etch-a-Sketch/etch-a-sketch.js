const canvas = document.querySelector('#etch-a-sketch');
const shakeBtn = document.querySelector('.shake');

const ctx = canvas.getContext('2d');

// Setup up our canvas for drawing
const { width, height } = canvas;
const MOVE_AMOUNT = 30;
let hue = 0;
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 50;

ctx.beginPath();
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// Write a draw funciton
function draw({ key }) {
  // Increment hue value
  hue += 10;
  ctx.strokeStyle = `hsl(${hue},100%,50%)`;

  // Start the path
  ctx.beginPath();
  ctx.moveTo(x, y);
  // Move our x and y values depending what the user did
  switch (key) {
    case 'ArrowUp':
      y -= MOVE_AMOUNT;
      break;
    case 'ArrowDown':
      y += MOVE_AMOUNT;
      break;
    case 'ArrowLeft':
      x -= MOVE_AMOUNT;
      break;
    case 'ArrowRight':
      x += MOVE_AMOUNT;
      break;
    default:
      break;
  }

  ctx.lineTo(x, y);
  ctx.stroke();
}

// Write a handler for the keys

function handleKey(e) {
  if (e.key.includes('Arrow')) {
    e.preventDefault();
    draw({ key: e.key });
  }
}

// CLear/Shake function
function clearCanvas() {
  ctx.clearRect(0, 0, width, height);
  canvas.classList.add('shake');
  canvas.addEventListener(
    'animationend',
    () => {
      canvas.classList.remove('shake');
    },
    { once: true }
  );
}

// Listen for the shake button
shakeBtn.addEventListener('click', clearCanvas);

// List4en for the arrow keys
window.addEventListener('keydown', handleKey);
