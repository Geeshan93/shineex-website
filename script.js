// ===== Scroll Progress Bar =====
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.prepend(progressBar);

// ===== Custom Cursor Glow =====
const cursorGlow = document.createElement('div');
cursorGlow.className = 'cursor-glow';
document.body.appendChild(cursorGlow);

let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  glowX += (mouseX - glowX) * 0.15;
  glowY += (mouseY - glowY) * 0.15;
  cursorGlow.style.left = glowX + 'px';
  cursorGlow.style.top = glowY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// ===== Navbar scroll effect =====
const navbar = document.getElementById('navbar');

// ===== Scroll handler (progress bar + navbar + parallax) =====
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollY / docHeight) * 100;

      // Progress bar
      progressBar.style.width = scrollPercent + '%';

      // Navbar
      navbar.classList.toggle('scrolled', scrollY > 50);

      // Parallax hero
      const hero = document.querySelector('.hero');
      if (hero) {
        const heroHeight = hero.offsetHeight;
        if (scrollY < heroHeight) {
          const rate = scrollY * 0.4;
          hero.style.setProperty('--parallax-y', rate + 'px');

          // Hero fade out on scroll
          const opacity = 1 - (scrollY / heroHeight) * 1.2;
          const heroContent = document.querySelector('.hero-content');
          if (heroContent) {
            heroContent.style.opacity = Math.max(0, opacity);
            heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
          }
        }
      }

      // Active nav link
      const sections = document.querySelectorAll('section[id]');
      const scrollPos = scrollY + 100;
      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (navLink) {
          if (scrollPos >= top && scrollPos < top + height) {
            navLink.classList.add('active-link');
          } else {
            navLink.classList.remove('active-link');
          }
        }
      });

      ticking = false;
    });
    ticking = true;
  }
});

// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  navToggle.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// ===== Smooth scroll for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== Scroll Reveal Animations =====
const observerOptions = {
  threshold: 0.05,
  rootMargin: '0px 0px 0px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Section headers
document.querySelectorAll('.section-header').forEach(el => {
  el.classList.add('scale-in');
  observer.observe(el);
});

// Service cards - staggered with alternating directions
document.querySelectorAll('.service-card').forEach((el, i) => {
  el.classList.add('fade-in');
  el.style.transitionDelay = `${i * 0.12}s`;
  observer.observe(el);
});

// Testimonial cards - staggered
document.querySelectorAll('.testimonial-card').forEach((el, i) => {
  el.classList.add('fade-in');
  el.style.transitionDelay = `${i * 0.1}s`;
  observer.observe(el);
});

// About section
document.querySelectorAll('.about-image').forEach(el => {
  el.classList.add('fade-in-left');
  observer.observe(el);
});
document.querySelectorAll('.about-content').forEach(el => {
  el.classList.add('fade-in-right');
  observer.observe(el);
});

// About features - staggered
document.querySelectorAll('.feature').forEach((el, i) => {
  el.classList.add('fade-in');
  el.style.transitionDelay = `${0.3 + i * 0.15}s`;
  observer.observe(el);
});

// Contact section
document.querySelectorAll('.contact-info').forEach(el => {
  el.classList.add('fade-in-left');
  observer.observe(el);
});
document.querySelectorAll('.contact-form-wrapper').forEach(el => {
  el.classList.add('fade-in-right');
  observer.observe(el);
});

// Contact items - staggered slide in
document.querySelectorAll('.contact-item').forEach((el, i) => {
  el.classList.add('fade-in-left');
  el.style.transitionDelay = `${0.2 + i * 0.15}s`;
  observer.observe(el);
});

// CTA section
document.querySelectorAll('.cta-content').forEach(el => {
  el.classList.add('scale-in');
  observer.observe(el);
});

// Partner section
document.querySelectorAll('.partner-text').forEach(el => {
  el.classList.add('fade-in-left');
  observer.observe(el);
});
document.querySelectorAll('.partner-logo-wrapper').forEach(el => {
  el.classList.add('fade-in-right');
  observer.observe(el);
});

// Footer columns - staggered
document.querySelectorAll('.footer-links, .footer-brand').forEach((el, i) => {
  el.classList.add('fade-in');
  el.style.transitionDelay = `${i * 0.1}s`;
  observer.observe(el);
});

// Fallback: make all animated elements visible after 2s
setTimeout(() => {
  document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in').forEach(el => {
    el.classList.add('visible');
  });
}, 2000);

// ===== 3D Card Tilt Effect =====
const tiltCards = document.querySelectorAll('.service-card, .testimonial-card');

tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / centerY * -5;
    const rotateY = (x - centerX) / centerX * 5;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
    card.style.transition = 'transform 0.1s ease';

    // Move shine overlay
    const shine = card.querySelector('.card-shine');
    if (shine) {
      shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.15), transparent 60%)`;
    }
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    const shine = card.querySelector('.card-shine');
    if (shine) shine.style.background = 'transparent';
  });
});

// Add shine overlay to tilt cards
tiltCards.forEach(card => {
  const shine = document.createElement('div');
  shine.className = 'card-shine';
  card.style.position = 'relative';
  card.appendChild(shine);
});

// ===== Magnetic Button Effect =====
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.setProperty('--btn-x', x * 0.3 + 'px');
    btn.style.setProperty('--btn-y', y * 0.3 + 'px');
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.setProperty('--btn-x', '0px');
    btn.style.setProperty('--btn-y', '0px');
  });
});

// ===== Smooth Counter Animation with easing =====
const easeOutExpo = (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

const animateStats = () => {
  const stats = document.querySelectorAll('.stat-number');
  stats.forEach(stat => {
    const text = stat.textContent;
    if (text.includes('+')) {
      const num = parseInt(text);
      const duration = 2000;
      const start = performance.now();

      const animate = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutExpo(progress);
        const current = Math.round(num * eased);

        stat.textContent = current + '+';

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          stat.textContent = num + '+';
          // Ping effect when done
          stat.classList.add('counter-done');
        }
      };

      requestAnimationFrame(animate);
    }
  });
};

const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(animateStats, 1200);
      heroObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

const heroSection = document.querySelector('.hero');
if (heroSection) heroObserver.observe(heroSection);

// ===== Text Reveal Animation for Hero =====
const heroH1 = document.querySelector('.hero h1');
if (heroH1) {
  // Process text nodes only, preserve HTML elements like <span> and <br>
  const processNode = (node, delay) => {
    let currentDelay = delay;
    node.childNodes.forEach(child => {
      if (child.nodeType === 3) { // Text node
        const words = child.textContent.split(/(\s+)/);
        const fragment = document.createDocumentFragment();
        words.forEach(word => {
          if (word.trim() === '') {
            fragment.appendChild(document.createTextNode(word));
          } else {
            const span = document.createElement('span');
            span.className = 'word-reveal';
            span.style.animationDelay = currentDelay + 's';
            span.textContent = word;
            fragment.appendChild(span);
            currentDelay += 0.08;
          }
        });
        child.replaceWith(fragment);
      } else if (child.nodeType === 1 && child.tagName !== 'BR') { // Element node
        currentDelay = processNode(child, currentDelay);
      }
    });
    return currentDelay;
  };
  processNode(heroH1, 0.4);
}

// ===== Gradient Text Animation on Section Headers =====
document.querySelectorAll('.section-header h2, .about-content h2, .cta h2, .partner-text h2').forEach(el => {
  el.classList.add('gradient-text-reveal');
});

// ===== Contact form handling (Formspree) =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      contactForm.innerHTML = `
        <div class="form-success show">
          <div class="form-success-icon">&#10003;</div>
          <h3>Thank You!</h3>
          <p>We've received your message and will get back to you within 24 hours.</p>
        </div>
      `;
    } else {
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;
      alert('Something went wrong. Please try again or email us directly at info@shineex.com.au');
    }
  } catch (err) {
    submitBtn.textContent = 'Send Message';
    submitBtn.disabled = false;
    alert('Something went wrong. Please try again or email us directly at info@shineex.com.au');
  }
});

// ===== Disable expensive effects on mobile =====
if (window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window) {
  cursorGlow.style.display = 'none';
  tiltCards.forEach(card => {
    card.removeEventListener('mousemove', () => {});
    card.removeEventListener('mouseleave', () => {});
  });
}

// ===== Prefers reduced motion =====
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  cursorGlow.style.display = 'none';
  progressBar.style.display = 'none';
  document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in').forEach(el => {
    el.classList.add('visible');
  });
}
