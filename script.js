const scrollContainer = document.querySelector('.scroll-container');
const scrollIndicator = document.querySelector('.scroll-indicator');
const textBlocks = document.querySelectorAll('.text-block');
const years = [1918, 1939, 1976, 1989, 1990, 1991, 2013, 2017];
let currentIndex = 5;
let scrolling = false;
let startY = 0;
let lastY = 0;
const threshold = 10; // Define the threshold value

// Initialize the first block to be visible and hide the rest
textBlocks.forEach((block, index) => {
  block.style.display = index === currentIndex ? 'block' : 'none';
});

function extractYear(text) {
  const regex = /\d{4}/g;
  const matches = text.match(regex);
  return matches ? parseInt(matches[matches.length - 1]) : null;
}

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

  const currentYear = extractYear(textBlocks[currentIndex].textContent);
  if (currentYear === 1918) {
    scrollIndicator.style.display = 'none';
    let lockIcon = scrollContainer.querySelector('.fa-lock');
    if (!lockIcon) {
      lockIcon = document.createElement('i');
      lockIcon.classList.add('fas', 'fa-lock');
      lockIcon.style.position = 'absolute';
      lockIcon.style.left = '50%';
      lockIcon.style.top = '50%';
      lockIcon.style.transform = 'translate(-50%, -50%) scale(0.8)';
      lockIcon.style.fontSize = '12px';
      lockIcon.style.color = '#333';
      lockIcon.style.animation = 'pulse-lock 2s infinite';
      scrollContainer.appendChild(lockIcon);
    } else {
      lockIcon.style.display = 'block';
    }
  } else {
    let lockIcon = scrollContainer.querySelector('.fa-lock');
    if (lockIcon) {
      lockIcon.style.display = 'none';
    }
    scrollIndicator.style.display = 'block';
  }

  yearDisplay.textContent = currentYear;

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
