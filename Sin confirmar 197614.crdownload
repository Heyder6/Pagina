// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.gallery-card, .product-card, .testimonial-card').forEach(card => {
  card.style.opacity = 0;
  card.style.transform = 'translateY(20px)';
  observer.observe(card);
});

// Quick Buy Button
document.getElementById('quick-buy').addEventListener('click', () => {
  window.location.href = 'productos.html';
});
