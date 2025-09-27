  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const buttons = entry.target.querySelectorAll('button');
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.pointerEvents = 'auto';
        buttons.forEach((btn, i) => {
          btn.style.animation = `slideIn 0.4s forwards`;
          btn.style.animationDelay = `${i * 0.1}s`;
        });
      }
    });
  }, {
    threshold: 0.1, // 🔄 Changed from 0.3 to 0.1 for earlier scroll detection
    rootMargin: '0px 0px -100px 0px' // 🔄 Triggers when bottom of viewport is 100px above element
  });

  const target = document.querySelector('.hover-buttons');
  observer.observe(target);
