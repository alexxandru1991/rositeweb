//
//  script.js
//  Rositeweb
//
//  Created by Besleaga Alexandru Marian on 01.10.2025.
//

let lastScrollTop = 0;
const subHeader = document.querySelector('.sub-header');
const headerHeight = document.querySelector('.header').offsetHeight;

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  if (scrollTop <= 0) {
    subHeader.style.top = `${headerHeight}px`; // show full sub-header
  } else {
    subHeader.style.top = `${headerHeight - 34}px`; // show only 6px of sub-header
  }
  lastScrollTop = scrollTop;
});
