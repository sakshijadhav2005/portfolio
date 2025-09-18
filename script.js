// Theme toggle with persistence
const themeToggle = document.getElementById('theme-toggle');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');
const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;

document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nowDark = document.documentElement.dataset.theme !== 'dark';
    document.documentElement.dataset.theme = nowDark ? 'dark' : 'light';
    localStorage.setItem('theme', nowDark ? 'dark' : 'light');
    const icon = themeToggle.querySelector('i');
    if (icon) icon.className = nowDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  });
}

// Typing effect for tagline
const typingEl = document.getElementById('typing');
const phrases = ['I build Websites', 'AI Apps', 'Scalable Systems'];
let pi = 0, ci = 0, deleting = false;
function tick(){
  if (!typingEl) return;
  const full = phrases[pi];
  typingEl.textContent = deleting ? full.slice(0, ci--) : full.slice(0, ci++);
  if (!deleting && ci === full.length + 5) deleting = true;
  if (deleting && ci === 0){ deleting = false; pi = (pi + 1) % phrases.length; }
  setTimeout(tick, deleting ? 60 : 100);
}
tick();

// Reveal on scroll
const revealEls = Array.from(document.querySelectorAll('[data-reveal], .card, .project, .skill-card'));
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if (e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }});
},{ threshold: 0.15 });
revealEls.forEach(el=>io.observe(el));

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const id = a.getAttribute('href');
    if (id && id.length > 1){
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Set footer year
document.getElementById('year').textContent = new Date().getFullYear();

// 3D tilt for project cards
const projects = document.querySelectorAll('.project');
projects.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left; const y = e.clientY - r.top;
    const rx = ((y - r.height / 2) / r.height) * -10; // tilt X
    const ry = ((x - r.width / 2) / r.width) * 10;  // tilt Y
    card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// Scroll progress bar + back to top
const progressBar = document.getElementById('progress-bar');
const backToTop = document.getElementById('backToTop');
function onScrollUI(){
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight);
  if (progressBar) progressBar.style.width = `${Math.max(0, Math.min(1, scrolled)) * 100}%`;
  if (backToTop){
    if (h.scrollTop > 500) backToTop.classList.add('show'); else backToTop.classList.remove('show');
  }
}
window.addEventListener('scroll', onScrollUI, { passive: true });
onScrollUI();
if (backToTop){ backToTop.addEventListener('click', ()=> window.scrollTo({ top: 0, behavior: 'smooth' })); }

 
