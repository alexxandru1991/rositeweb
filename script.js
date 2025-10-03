const scrollContainer = document.querySelector('.scroll-container');
const scrollIndicator = document.querySelector('.scroll-indicator');
const textBlocks = document.querySelectorAll('.text-block');
const years = [1918, 1945, 1976, 1989, 1990, 1991, 2013, 2017];
let currentIndex = 5;
let scrolling = false;
let startY = 0;
let lastY = 0;
const threshold = 10; // Define the threshold value

// Initialize the first block to be visible and hide the rest
textBlocks.forEach((block, index) => {
  block.style.display = index === currentIndex ? 'block' : 'none';
});

function handleScroll(delta) {
  if (scrolling) return;
  scrolling = true;

  if (delta > 0 && currentIndex < textBlocks.length - 1) {
    currentIndex++;
  } else if (delta < 0 && currentIndex > 0) {
    currentIndex--;
  }

  textBlocks.forEach((block, index) => {
    block.style.display = index === currentIndex ? 'block' : 'none';
  });

  let yearDisplay = document.querySelector('.year-display');
  if (!yearDisplay) {
    yearDisplay = document.createElement('div');
    yearDisplay.classList.add('year-display');
    scrollContainer.appendChild(yearDisplay);
  }

  yearDisplay.textContent = years[currentIndex] === 2013 || years[currentIndex] === 2017 ? years[currentIndex].toString().substring(0, 4) : years[currentIndex].toString();

  setTimeout(() => {
    scrolling = false;
  }, 800);
}

scrollContainer.addEventListener('wheel', (e) => {
  e.preventDefault();
  handleScroll(e.deltaY);
});

scrollContainer.addEventListener('touchstart', (e) => {
  startY = e.touches[0].clientY;
  lastY = startY;
});

scrollContainer.addEventListener('touchmove', (e) => {
  e.preventDefault();
  const currentY = e.touches[0].clientY;
  const delta = lastY - currentY;
  lastY = currentY;

  if (Math.abs(startY - currentY) > threshold) {
    handleScroll(delta);
    startY = currentY;
  }
});

scrollContainer.addEventListener('touchend', () => {
  lastY = 0;
});

document.body.addEventListener('touchmove', function(e) {
  if (e.target.closest('.scroll-container') === null) {
    e.preventDefault();
  }
}, { passive: false });
