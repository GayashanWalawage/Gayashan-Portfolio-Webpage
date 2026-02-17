// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // --- MOBILE MENU TOGGLE ---
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  if (hamburger && navMenu) {
    // Toggle menu on hamburger click
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
  
  // --- ACTIVE LINK HIGHLIGHTING ON SCROLL ---
  const sections = document.querySelectorAll('[id]');
  const navLinks = document.querySelectorAll('.nav-menu a');
  
  function highlightActiveLink() {
    let current = '';
    const scrollPosition = window.scrollY + 150; // Offset for navbar
    
    // Find the current section
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        current = section.getAttribute('id');
      }
    });
    
    // Special case for hero section (home)
    const heroSection = document.getElementById('home');
    if (heroSection && window.scrollY < heroSection.offsetHeight / 2) {
      current = 'home';
    }
    
    // Update active class on nav links
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href').replace('#', '');
      if (href === current) {
        link.classList.add('active');
      }
    });
  }
  
  // Throttle scroll events for better performance
  let isScrolling = false;
  window.addEventListener('scroll', function() {
    if (!isScrolling) {
      window.requestAnimationFrame(function() {
        highlightActiveLink();
        isScrolling = false;
      });
      isScrolling = true;
    }
  });
  
  // Initial call to set active link
  setTimeout(highlightActiveLink, 100);
  
  // --- SMOOTH SCROLL FOR ANCHOR LINKS ---
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;
        const targetPosition = targetElement.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // --- SCROLL INDICATOR CLICK (scroll to about section) ---
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function() {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;
        const targetPosition = aboutSection.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  }
  
  // --- ADD SKILLS-LIST CLASS TO TECHNICAL FOCUS LISTS ---
  const technicalFocusSection = document.querySelector('#technical');
  if (technicalFocusSection) {
    const lists = technicalFocusSection.querySelectorAll('ul');
    lists.forEach(list => {
      list.classList.add('skills-list');
    });
  }
  
  // --- ADD COMPETENCY-GRID CLASS TO COMPETENCIES LIST ---
  const competenciesSection = document.querySelector('#competencies');
  if (competenciesSection) {
    const list = competenciesSection.querySelector('ul');
    if (list) {
      list.classList.add('competency-grid');
    }
  }
  
  // --- ADD ACCOMPLISHMENTS-LIST CLASS TO ACCOMPLISHMENTS LIST ---
  const accomplishmentsSection = document.querySelector('#accomplishments');
  if (accomplishmentsSection) {
    const list = accomplishmentsSection.querySelector('ul');
    if (list) {
      list.classList.add('accomplishments-list');
    }
  }
  
  // --- ADD SKILLS-GRID CLASS TO SKILLS SECTION ---
  const skillsSection = document.querySelector('#skills');
  if (skillsSection) {
    const grid = skillsSection.querySelector('.skills-grid');
    if (grid) {
      // Already has class from markdown
    }
  }
  
  // --- ADD EXPERIENCE-CARD CLASS TO EXPERIENCE CARDS ---
  const experienceSection = document.querySelector('#experience');
  if (experienceSection) {
    const cards = experienceSection.querySelectorAll('.card');
    cards.forEach(card => {
      card.classList.add('experience-card');
    });
  }
  
  // --- ADD PROJECT-CARD CLASS TO PROJECT CARDS ---
  const projectsSection = document.querySelector('#projects');
  if (projectsSection) {
    const cards = projectsSection.querySelectorAll('.card');
    cards.forEach(card => {
      card.classList.add('project-card');
    });
  }
  
  // --- FIX LOGO LINK ---
  const logo = document.querySelector('.logo a');
  if (logo) {
    logo.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // --- INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS ---
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all cards and sections
  document.querySelectorAll('.card, .section h2').forEach(el => {
    observer.observe(el);
  });
  
  // --- FIX FOR IOS SAFARI 100VH ISSUE ---
  function setHeroHeight() {
    const hero = document.querySelector('.hero');
    if (hero) {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      hero.style.minHeight = `calc(100vh - var(--navbar-height))`;
    }
  }
  
  setHeroHeight();
  window.addEventListener('resize', setHeroHeight);
  
  // --- ADD ACTIVE CLASS TO HOME LINK ON PAGE LOAD ---
  if (window.scrollY < 100) {
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#home') {
        link.classList.add('active');
      }
    });
  }
  
  console.log('Script loaded successfully!');
});

// Handle window resize events for responsive adjustments
window.addEventListener('resize', function() {
  // Close mobile menu if open and screen becomes larger
  if (window.innerWidth > 768) {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger && navMenu) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
});