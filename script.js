// ===== Navbar scroll effect =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// Close mobile nav when clicking a link
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

// ===== Scroll animations =====
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

// Fade up animations (service cards, section headers)
document.querySelectorAll('.section-header').forEach((el, i) => {
  el.classList.add('scale-in');
  observer.observe(el);
});

// Staggered service cards
document.querySelectorAll('.service-card').forEach((el, i) => {
  el.classList.add('fade-in');
  el.style.transitionDelay = `${i * 0.1}s`;
  observer.observe(el);
});

// Staggered testimonial cards
document.querySelectorAll('.testimonial-card').forEach((el, i) => {
  el.classList.add('fade-in');
  el.style.transitionDelay = `${i * 0.15}s`;
  observer.observe(el);
});

// About section - image from left, content from right
document.querySelectorAll('.about-image').forEach(el => {
  el.classList.add('fade-in-left');
  observer.observe(el);
});
document.querySelectorAll('.about-content').forEach(el => {
  el.classList.add('fade-in-right');
  observer.observe(el);
});

// Contact section - info from left, form from right
document.querySelectorAll('.contact-info').forEach(el => {
  el.classList.add('fade-in-left');
  observer.observe(el);
});
document.querySelectorAll('.contact-form-wrapper').forEach(el => {
  el.classList.add('fade-in-right');
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

// Fallback: make all animated elements visible after 2s
setTimeout(() => {
  document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in').forEach(el => {
    el.classList.add('visible');
  });
}, 2000);

// ===== Smooth counter animation for stats =====
const animateStats = () => {
  const stats = document.querySelectorAll('.stat-number');
  stats.forEach(stat => {
    const text = stat.textContent;
    if (text.includes('+')) {
      const num = parseInt(text);
      let current = 0;
      const increment = Math.ceil(num / 30);
      const timer = setInterval(() => {
        current += increment;
        if (current >= num) {
          current = num;
          clearInterval(timer);
        }
        stat.textContent = current + '+';
      }, 50);
    }
  });
};

// Trigger stat animation when hero section is visible
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

// ===== Active nav link highlight on scroll =====
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

    if (navLink) {
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLink.style.color = '';
        navLink.classList.add('active-link');
      } else {
        navLink.classList.remove('active-link');
      }
    }
  });
});
