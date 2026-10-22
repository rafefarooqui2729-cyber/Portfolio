/* ===== Edit here ===== */
const PROJECTS = { jobmatch: { demo: null, repo: null }, twist: { demo: null, repo: null } }; // add real URLs to activate buttons
const CONTACT = [
  ["Email", "rafefarooqui2729@gmail.com", "mailto:rafefarooqui2729@gmail.com"],
  ["LinkedIn", "abdul-rafe-farooqui", "https://www.linkedin.com/in/abdul-rafe-farooqui-2285483b2/"],
  ["GitHub", "abdul-rafe2729-cyber", "https://github.com/abdul-rafe2729-cyber"]
];
const SKILLS = [
  ["Frontend", ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"]],
  ["Backend", ["Node.js", "Express.js", "REST APIs"]],
  ["Databases", ["MongoDB", "Mongoose"]],
  ["Programming", ["Java", "C", "Python"]],
  ["Engineering foundations", ["Object-oriented programming", "Data structures & algorithms", "Debugging", "API integration", "Authentication", "Responsive development"]],
  ["Tools & workflows", ["Git", "GitHub", "AI-assisted development", "Prompt engineering"]]
];
const JOURNEY = [
  ["Computer Science education", "BCA in Computer Science at Deogiri College."],
  ["Programming fundamentals", "Java, C and Python."],
  ["Object-oriented programming", "Applying OOP principles in Java."],
  ["Frontend development", "HTML, CSS, JavaScript, React and Tailwind CSS."],
  ["Full-stack development", "Node.js, Express.js, MongoDB and Mongoose."],
  ["APIs & databases", "REST APIs, authentication and data integration."],
  ["JobMatch AI", "Building a job-matching platform (in development)."],
  ["Data structures & algorithms", "Ongoing practice and strengthening."],
  ["AI-assisted development", "Exploring practical AI integration and prompt engineering."]
]; // add dates as [title,text,"Mon YYYY"]
/* ===================== */

const $ = s => document.querySelector(s);
const h = (t, c, x) => {
  const e = document.createElement(t);
  if (c) e.className = c;
  e.innerHTML = x || '';
  return e;
};

// Selected Work links
document.querySelectorAll('[data-links]').forEach(n => {
  const p = PROJECTS[n.dataset.links] || {};
  [["demo", "Live demo"], ["repo", "Repository"]].forEach(([k, l]) => {
    if (p[k]) {
      const a = h('a', 'btn' + (k == 'demo' ? ' p' : ''), l + ' ↗');
      a.href = p[k];
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      n.append(a);
    } else if (n.dataset.links == 'jobmatch') {
      const s = h('span', 'btn off', l + ' — not published yet');
      n.append(s);
    }
  });
});

// Skills Index population
SKILLS.forEach(([t, l], i) => {
  const r = h('div', 'row', `<span class="lab"><b>0${i + 1}</b></span><h3>${t}</h3><p>${l.map(x => `<span>${x}</span>`).join('')}</p>`);
  $('#idx').append(r);
});

// Journey Timeline population
JOURNEY.forEach(([t, x, d], i) => {
  $('#tl').append(h('li', '', `<span class="lab"><b>${String(i + 1).padStart(2, '0')}</b> ${d || 'Date to be added'}</span><div><h3>${t}</h3><p>${x}</p></div>`));
});

// Contact items population
CONTACT.forEach(([l, v, u]) => {
  const a = h('a', 'crow', `<span class="lab">${l}</span><strong>${v}</strong><span class="ar" aria-hidden="true">↗</span>`);
  a.href = u;
  if (!u.startsWith('mailto')) {
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
  }
  a.setAttribute('aria-label', l + ': ' + v);
  $('#cr').append(a);
});

// Footer year
$('#yr').textContent = new Date().getFullYear();

// Mobile Navigation
const nav = $('#nav'), b = $('.burger');
b.onclick = () => {
  const o = nav.classList.toggle('open');
  b.setAttribute('aria-expanded', o);
};
nav.onclick = e => {
  if (e.target.tagName == 'A') {
    nav.classList.remove('open');
    b.setAttribute('aria-expanded', false);
  }
};
document.addEventListener('keydown', e => {
  if (e.key == 'Escape') {
    nav.classList.remove('open');
    b.setAttribute('aria-expanded', false);
  }
});

// Intersection observer for section reveals
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) {
    e.target.classList.add('in');
    io.unobserve(e.target);
  }
}), { threshold: .12 });
document.querySelectorAll('.rv').forEach(e => io.observe(e));

// Active nav indicator on scroll
const links = [...nav.querySelectorAll('a')];
const so = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(a => a.classList.toggle('on', a.hash == '#' + e.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
['work', 'about', 'skills', 'journey', 'contact'].forEach(i => {
  const el = $('#' + i);
  if (el) so.observe(el);
});

// Hero portrait subtle parallax on desktop
if (matchMedia('(hover:hover) and (prefers-reduced-motion:no-preference)').matches) {
  const fig = $('#fig');
  if (fig) {
    addEventListener('pointermove', e => {
      fig.style.setProperty('--mx', (e.clientX / innerWidth - .5).toFixed(2));
      fig.style.setProperty('--my', (e.clientY / innerHeight - .5).toFixed(2));
    }, { passive: true });
  }
}

// Interactive Custom Cursor Animation
const dot = $('#cursorDot');
const ring = $('#cursorRing');

if (dot && ring && matchMedia('(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)').matches) {
  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;
  let isVisible = false;

  window.addEventListener('pointermove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

    if (!isVisible) {
      isVisible = true;
      ringX = mouseX;
      ringY = mouseY;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    }
  }, { passive: true });

  const renderRing = () => {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(renderRing);
  };
  requestAnimationFrame(renderRing);

  // Interactive hover states on clickable elements
  const hoverSelector = 'a, button, .btn, .burger, .row, .crow, .prev, input, textarea, [role="button"]';

  document.addEventListener('mouseover', e => {
    if (e.target.closest(hoverSelector)) {
      document.body.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', e => {
    if (e.target.closest(hoverSelector)) {
      document.body.classList.remove('cursor-hover');
    }
  });

  // Active / click state
  window.addEventListener('mousedown', () => document.body.classList.add('cursor-active'));
  window.addEventListener('mouseup', () => document.body.classList.remove('cursor-active'));

  // Window leave and enter
  document.addEventListener('mouseleave', () => {
    isVisible = false;
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    isVisible = true;
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });
}
