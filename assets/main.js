// 1. intro animation trigger
window.addEventListener('load', () => {
  document.body.classList.remove('is-preload');
});
// Chat massively rec: this is a simple way to trigger CSS animations on page load. By adding the 'is-preload' class to the body, you can define your initial styles for elements that should be animated. Once the page has fully loaded, the 'is-preload' class is removed, allowing your CSS animations to run as intended.


// 2. scroll reveal (Massively style light version)
const els = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15
});

els.forEach(el => observer.observe(el));


// lightbox for images

document.querySelectorAll('.lightbox-trigger').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const src = a.getAttribute('href');
    document.getElementById('lightbox-img').src = src;
    document.getElementById('lightbox').classList.add('open');
  });
});

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.getElementById('lightbox-img').src = '';
}

// 배경 클릭으로 닫기
document.getElementById('lightbox').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeLightbox();
});

// ESC 키로 닫기
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});