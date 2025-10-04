const scrollContainer = document.querySelector('.scroll-container');
const scrollIndicator = document.querySelector('.scroll-indicator');
const textBlocks = document.querySelectorAll('.text-block');
const years = [4, 1918, 1939, 1976, 1989, 1990, 1991, 2013, 2017, 2025, 2026];
let currentIndex = 6;
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

  const currentYear = years[currentIndex];
  const currentText = textBlocks[currentIndex].querySelector('p').textContent;
  if (currentYear === 1918 || currentYear === 1939) {
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
    let crossIcon = scrollContainer.querySelector('.fa-plus');
    if (crossIcon) {
      crossIcon.style.display = 'none';
    }
  } else if (currentText === 'Isus Hristos') {
    scrollIndicator.style.display = 'none';
    let crossIcon = scrollContainer.querySelector('.fa-plus');
    if (!crossIcon) {
      crossIcon = document.createElement('i');
      crossIcon.classList.add('fas', 'fa-plus');
      crossIcon.style.position = 'absolute';
      crossIcon.style.left = '50%';
      crossIcon.style.top = '50%';
      crossIcon.style.transform = 'translate(-50%, -50%) scale(0.8) rotate(45deg)';
      crossIcon.style.fontSize = '12px';
      crossIcon.style.color = '#000';
      crossIcon.style.animation = 'pulse-cross 2s infinite';
      scrollContainer.appendChild(crossIcon);
    } else {
      crossIcon.style.display = 'block';
    }
    let lockIcon = scrollContainer.querySelector('.fa-lock');
    if (lockIcon) {
      lockIcon.style.display = 'none';
    }
  } else {
    let lockIcon = scrollContainer.querySelector('.fa-lock');
    if (lockIcon) {
      lockIcon.style.display = 'none';
    }
    let crossIcon = scrollContainer.querySelector('.fa-plus');
    if (crossIcon) {
      crossIcon.style.display = 'none';
    }
    scrollIndicator.style.display = 'block';
  }

  yearDisplay.textContent = currentYear || textBlocks[currentIndex].querySelector('span').textContent;

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
