/* ==========================================================================
   PORTFOLIO CONFIGURATION & DATA
   ========================================================================== */

// Projects Configuration
const PROJECTS = {
  jobmatch: { demo: 'https://job-match-ai-liard.vercel.app/', repo: null },
  twist:    { demo: 'https://twistin.vercel.app/', repo: null }
};

// Verified Contact Details
const CONTACT = [
  ["Email", "rafefarooqui2729@gmail.com", "mailto:rafefarooqui2729@gmail.com"],
  ["LinkedIn", "abdul-rafe-farooqui", "https://www.linkedin.com/in/abdul-rafe-farooqui-2285483b2/"],
  ["GitHub", "rafefarooqui2729-cyber", "https://github.com/rafefarooqui2729-cyber"]
];

// Technical Index Data
const SKILLS = [
  ["Frontend", ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"]],
  ["Backend", ["Node.js", "Express.js", "REST APIs"]],
  ["Databases", ["MongoDB", "Mongoose"]],
  ["Programming", ["Java", "C", "Python"]],
  ["Engineering foundations", ["Object-oriented programming", "Data structures & algorithms", "Debugging", "API integration", "Authentication", "Responsive development"]],
  ["Tools & workflows", ["Git", "GitHub", "AI-assisted development", "Prompt engineering"]]
];

// Journey Milestones Data
const JOURNEY = [
  ["Computer Science education", "BCA in Computer Science at Deogiri College, affiliated with Dr. Babasaheb Ambedkar Marathwada University."],
  ["Programming fundamentals", "Deepened problem solving with Java, C, and Python."],
  ["Object-oriented programming", "Applying OOP principles and clean design patterns in Java."],
  ["Frontend development", "Modern responsive web development with HTML, CSS, JavaScript, React, and Tailwind CSS."],
  ["Full-stack development", "Building complete server-side workflows using Node.js, Express.js, MongoDB, and Mongoose."],
  ["APIs & databases", "RESTful API design, token-based authentication, and structured database modeling."],
  ["JobMatch AI", "Architecting and developing an intelligent job-matching platform."],
  ["Data structures & algorithms", "Continuous practice and algorithmic problem solving."],
  ["AI-assisted development", "Exploring practical AI integration, intelligent workflows, and prompt engineering."]
];

/* ==========================================================================
   DOM UTILITIES & DYNAMIC RENDERING
   ========================================================================== */
const $ = selector => document.querySelector(selector);
const createElem = (tag, className, htmlContent) => {
  const el = document.createElement(tag);
  if (className) el.className = className;
  el.innerHTML = htmlContent || '';
  return el;
};

// Populate Project Action Links
document.querySelectorAll('[data-links]').forEach(container => {
  const projectKey = container.dataset.links;
  const project = PROJECTS[projectKey] || {};

  const linkDefs = [
    ["demo", "Live demo"],
    ["repo", "Repository"]
  ];

  linkDefs.forEach(([key, label]) => {
    if (project[key]) {
      const a = createElem('a', 'btn' + (key === 'demo' ? ' p' : ''), `${label} ↗`);
      a.href = project[key];
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      container.append(a);
    } else if (key === 'repo') {
      // Only show "not published" placeholder for repo, never for demo
      const span = createElem('span', 'btn off', `${label} — coming soon`);
      container.append(span);
    }
  });
});

// Populate Technical Index (Skills)
const idxContainer = $('#idx');
if (idxContainer) {
  SKILLS.forEach(([title, items], index) => {
    const row = createElem(
      'div',
      'row',
      `<span class="lab"><b>0${index + 1}</b></span>
       <h3>${title}</h3>
       <p>${items.map(item => `<span>${item}</span>`).join('')}</p>`
    );
    idxContainer.append(row);
  });
}

// Populate The Journey Timeline
const tlContainer = $('#tl');
if (tlContainer) {
  JOURNEY.forEach(([title, description, date], index) => {
    const li = createElem(
      'li',
      '',
      `<span class="lab"><b>${String(index + 1).padStart(2, '0')}</b> ${date || 'Growth milestone'}</span>
       <div>
         <h3>${title}</h3>
         <p>${description}</p>
       </div>`
    );
    tlContainer.append(li);
  });
}

// Populate Contact Links
const crContainer = $('#cr');
if (crContainer) {
  CONTACT.forEach(([label, value, url]) => {
    const a = createElem(
      'a',
      'crow',
      `<span class="lab">${label}</span>
       <strong>${value}</strong>
       <span class="ar" aria-hidden="true">↗</span>`
    );
    a.href = url;
    if (!url.startsWith('mailto:')) {
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    }
    a.setAttribute('aria-label', `${label}: ${value}`);
    crContainer.append(a);
  });
}

// Dynamic Footer Year
const yrEl = $('#yr');
if (yrEl) yrEl.textContent = new Date().getFullYear();

/* ==========================================================================
   NAVIGATION & ACCESSIBILITY
   ========================================================================== */
const nav = $('#nav');
const burger = $('.burger');

if (burger && nav) {
  burger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(isOpen));
  });

  nav.addEventListener('click', e => {
    if (e.target.tagName === 'A') {
      nav.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      burger.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 860 && nav.classList.contains('open')) {
      nav.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }
  }, { passive: true });
}

/* ==========================================================================
   SCROLL REVEALS & ACTIVE SECTION INDICATORS
   ========================================================================== */
if ('IntersectionObserver' in window) {
  // Reveal animations
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.rv').forEach(el => revealObserver.observe(el));

  // Active section nav highlighting
  const navLinks = nav ? [...nav.querySelectorAll('a')] : [];
  const sectionIds = ['work', 'about', 'skills', 'journey', 'contact'];
  
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = '#' + entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('on', link.getAttribute('href') === id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });

  sectionIds.forEach(id => {
    const section = $('#' + id);
    if (section) sectionObserver.observe(section);
  });
} else {
  // Fallback for older browsers
  document.querySelectorAll('.rv').forEach(el => el.classList.add('in'));
}

/* ==========================================================================
   DESKTOP POINTER PARALLAX (Subtle, Hardware-Accelerated)
   ========================================================================== */
if (matchMedia('(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)').matches) {
  const fig = $('#fig');
  if (fig) {
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    window.addEventListener('pointermove', e => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 8;
      targetY = (e.clientY / window.innerHeight - 0.5) * 5;
    }, { passive: true });

    const animateParallax = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      fig.style.setProperty('--mx', `${currentX.toFixed(2)}px`);
      fig.style.setProperty('--my', `${currentY.toFixed(2)}px`);
      requestAnimationFrame(animateParallax);
    };
    requestAnimationFrame(animateParallax);
  }
}

/* ==========================================================================
   INTERACTIVE CUSTOM CURSOR (Desktop Fine-Pointer Only)
   ========================================================================== */
const cursorDot = $('#cursorDot');
const cursorRing = $('#cursorRing');

if (
  cursorDot && 
  cursorRing && 
  matchMedia('(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)').matches
) {
  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;
  let isVisible = false;

  window.addEventListener('pointermove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

    if (!isVisible) {
      isVisible = true;
      ringX = mouseX;
      ringY = mouseY;
      cursorDot.style.opacity = '1';
      cursorRing.style.opacity = '1';
    }
  }, { passive: true });

  const renderCursor = () => {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(renderCursor);
  };
  requestAnimationFrame(renderCursor);

  // Interactive targets hover expansion
  const interactiveSelector = 'a, button, .btn, .burger, .row, .crow, .prev, input, textarea, [role="button"], .block-card, .badge';

  document.addEventListener('mouseover', e => {
    if (e.target.closest(interactiveSelector)) {
      document.body.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', e => {
    if (e.target.closest(interactiveSelector)) {
      document.body.classList.remove('cursor-hover');
    }
  });

  // Cursor Color Animation on Name ("Abdul Rafe Farooqui")
  const heroTitle = $('.hero-title');
  if (heroTitle) {
    heroTitle.addEventListener('pointerenter', () => {
      document.body.classList.add('cursor-name-focus');
    });

    heroTitle.addEventListener('pointermove', e => {
      const rect = heroTitle.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      heroTitle.style.setProperty('--name-mx', `${x.toFixed(1)}px`);
      heroTitle.style.setProperty('--name-my', `${y.toFixed(1)}px`);
    }, { passive: true });

    heroTitle.addEventListener('pointerleave', () => {
      document.body.classList.remove('cursor-name-focus');
      heroTitle.style.setProperty('--name-mx', '-500px');
      heroTitle.style.setProperty('--name-my', '-500px');
    });
  }

  // Universal Cursor Spotlight for Block Titles (.spotlight-text)
  const spotlightTargets = document.querySelectorAll('.spotlight-text');
  spotlightTargets.forEach(el => {
    el.addEventListener('pointermove', e => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty('--spot-x', `${x.toFixed(1)}px`);
      el.style.setProperty('--spot-y', `${y.toFixed(1)}px`);
    }, { passive: true });

    el.addEventListener('pointerleave', () => {
      el.style.setProperty('--spot-x', '-500px');
      el.style.setProperty('--spot-y', '-500px');
    });
  });

  // Dynamic Card Border Spotlight (.block-card)
  const blockCards = document.querySelectorAll('.block-card');
  blockCards.forEach(card => {
    card.addEventListener('pointermove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--card-x', `${x.toFixed(1)}px`);
      card.style.setProperty('--card-y', `${y.toFixed(1)}px`);
    }, { passive: true });

    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--card-x', '-500px');
      card.style.setProperty('--card-y', '-500px');
    });
  });

  // Active click contraction
  window.addEventListener('mousedown', () => document.body.classList.add('cursor-active'));
  window.addEventListener('mouseup', () => document.body.classList.remove('cursor-active'));

  // Window bounds detection
  document.addEventListener('mouseleave', () => {
    isVisible = false;
    cursorDot.style.opacity = '0';
    cursorRing.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    isVisible = true;
    cursorDot.style.opacity = '1';
    cursorRing.style.opacity = '1';
  });
}
