//
//  script.js
//  Rositeweb
//
//  Created by Besleaga Alexandru Marian on 02.10.2025.
//

const scrollContainer = document.querySelector('.scroll-container');
const scrollIndicator = document.querySelector('.scroll-indicator');
const textBlocks = document.querySelectorAll('.text-block');
let currentIndex = 0;
let scrolling = false;

// Initialize the first block to be visible and hide the rest
textBlocks.forEach((block, index) => {
  block.style.display = index === 0 ? 'block' : 'none';
});

scrollContainer.addEventListener('wheel', (e) => {
  if (scrolling) return;
  scrolling = true;
  e.preventDefault();
  if (e.deltaY > 0 && currentIndex < textBlocks.length - 1) {
    currentIndex++;
  } else if (e.deltaY < 0 && currentIndex > 0) {
    currentIndex--;
  }

  textBlocks.forEach((block, index) => {
    block.style.display = index === currentIndex ? 'block' : 'none';
  });

  const scrollHeight = 250 / (textBlocks.length - 1);
  scrollIndicator.style.top = `${currentIndex * scrollHeight}px`;

  setTimeout(() => {
    scrolling = false;
  }, 800);
});
