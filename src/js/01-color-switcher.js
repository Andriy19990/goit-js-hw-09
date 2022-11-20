const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.querySelector("body");
let interval = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startButton.addEventListener("click", onButtonstartClick);
function onButtonstartClick() {
  startButton.disabled = true;
  interval = setInterval(() => {
    body.style.background = getRandomHexColor();
  }, 1000);
};

stopButton.addEventListener("click", onButtonstopClick);
function onButtonstopClick() {
  startButton.disabled = false;
  clearInterval(interval);
};


