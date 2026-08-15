/* =============================================
   PRELOADER
============================================= */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => preloader.classList.add('hide'), 400);
});

/* =============================================
   DARK / LIGHT MODE TOGGLE
============================================= */
const modeToggle = document.getElementById('modeToggle');
const body = document.body;

function applyMode(mode) {
  if (mode === 'light') {
    body.classList.add('light-mode');
    modeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
  } else {
    body.classList.remove('light-mode');
    modeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }
}

const savedMode = localStorage.getItem('nocturne-mode') || 'dark';
applyMode(savedMode);

modeToggle.addEventListener('click', () => {
  const isLight = body.classList.contains('light-mode');
  const newMode = isLight ? 'dark' : 'light';
  applyMode(newMode);
  localStorage.setItem('nocturne-mode', newMode);
});

/* =============================================
   MOBILE NAV TOGGLE
============================================= */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const icon = navToggle.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-xmark');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.querySelector('i').classList.add('fa-bars');
    navToggle.querySelector('i').classList.remove('fa-xmark');
  });
});

/* =============================================
   STICKY NAVBAR + ACTIVE LINK ON SCROLL
============================================= */
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  backToTop.classList.toggle('visible', window.scrollY > 600);

  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 140) current = section.getAttribute('id');
  });
  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
});

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* =============================================
   SCROLL REVEAL ANIMATIONS
============================================= */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

/* =============================================
   ANIMATED COUNTERS
============================================= */
const statNums = document.querySelectorAll('.stat__num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 60));
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = current;
      }, 25);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.4 });
statNums.forEach(el => counterObserver.observe(el));

/* =============================================
   DYNAMIC MENU DATA + FILTERING
============================================= */
const menuData = [
  { name: "Charred Peach & Burrata", price: 18, category: "breakfast", rating: 4.8, img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=200&q=80", desc: "Wood-fired peach, whipped burrata, aged balsamic, torn basil." },
  { name: "Morning Brioche Toast", price: 12, category: "breakfast", rating: 4.6, img: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=200&q=80", desc: "Cultured butter, honeycomb, sea salt, espresso reduction." },
  { name: "Roasted Beet Salad", price: 16, category: "lunch", rating: 4.7, img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=200&q=80", desc: "Citrus-cured beets, whipped goat cheese, candied walnuts." },
  { name: "Seared Scallop Bowl", price: 24, category: "lunch", rating: 4.9, img: "https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=200&q=80", desc: "Brown butter scallops, saffron risotto, micro herbs." },
  { name: "Wood-Fired Ribeye", price: 42, category: "dinner", rating: 5.0, img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=200&q=80", desc: "36-day aged ribeye, bone marrow butter, charred shallot." },
  { name: "Slow Duck Confit", price: 34, category: "dinner", rating: 4.8, img: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=200&q=80", desc: "Five-hour duck leg, cherry gastrique, fondant potato." },
  { name: "Truffle Smash Burger", price: 19, category: "fastfood", rating: 4.7, img: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=200&q=80", desc: "Double smash patty, truffle aioli, aged cheddar, brioche." },
  { name: "Crispy Duck Tacos", price: 17, category: "fastfood", rating: 4.6, img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=200&q=80", desc: "Shredded confit duck, pickled shallot, hoisin glaze." },
  { name: "Dark Chocolate Fondant", price: 14, category: "desserts", rating: 4.9, img: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=200&q=80", desc: "Molten 70% chocolate, salted caramel, vanilla bean ice cream." },
  { name: "Burnt Basque Cheesecake", price: 13, category: "desserts", rating: 4.8, img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=200&q=80", desc: "Caramelised crust, citrus zest, rosemary honey." },
];

const menuList = document.getElementById('menuList');
const filterBtns = document.querySelectorAll('.filter-btn');

function renderMenu(filter) {
  const items = filter === 'all' ? menuData : menuData.filter(i => i.category === filter);
  menuList.innerHTML = items.map(item => `
    <div class="menu-item reveal is-visible">
      <img class="menu-item__img" src="${item.img}" alt="${item.name}">
      <div class="menu-item__body">
        <div class="menu-item__top">
          <h3>${item.name}</h3>
          <span class="menu-item__dots"></span>
          <span class="menu-item__price">$${item.price}</span>
        </div>
        <p class="menu-item__desc">${item.desc}</p>
        <span class="menu-item__rating">
          ${'<i class="fa-solid fa-star"></i>'.repeat(Math.round(item.rating))}
          ${'<i class="fa-regular fa-star"></i>'.repeat(5 - Math.round(item.rating))}
          &nbsp;${item.rating}
        </span>
      </div>
    </div>
  `).join('');
}

renderMenu('all');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderMenu(btn.dataset.filter);
  });
});

/* =============================================
   COUNTDOWN TIMER
============================================= */
const countdownTarget = new Date();
countdownTarget.setDate(countdownTarget.getDate() + 3);
countdownTarget.setHours(23, 59, 59, 0);

function updateCountdown() {
  const now = new Date().getTime();
  const distance = countdownTarget.getTime() - now;

  if (distance < 0) {
    document.getElementById('cd-days').textContent = '00';
    document.getElementById('cd-hours').textContent = '00';
    document.getElementById('cd-mins').textContent = '00';
    document.getElementById('cd-secs').textContent = '00';
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById('cd-days').textContent = String(days).padStart(2, '0');
  document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('cd-mins').textContent = String(mins).padStart(2, '0');
  document.getElementById('cd-secs').textContent = String(secs).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

/* =============================================
   GALLERY + LIGHTBOX
============================================= */
const galleryImages = [
  { src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80", size: "wide" },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80", size: "tall" },
  { src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=80", size: "" },
  { src: "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=600&q=80", size: "" },
  { src: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=600&q=80", size: "" },
  { src: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=600&q=80", size: "wide" },
  { src: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=600&q=80", size: "" },
  { src: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=600&q=80", size: "tall" },
];

const galleryGrid = document.getElementById('galleryGrid');
galleryGrid.innerHTML = galleryImages.map((img, i) => `
  <div class="gallery-item gallery-item--${img.size}" data-index="${i}">
    <img src="${img.src}" alt="Nocturne restaurant gallery image ${i + 1}">
  </div>
`).join('');

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
let currentImgIndex = 0;

function openLightbox(index) {
  currentImgIndex = index;
  lightboxImg.src = galleryImages[index].src;
  lightbox.classList.add('open');
}
function closeLightbox() { lightbox.classList.remove('open'); }
function showNext() { currentImgIndex = (currentImgIndex + 1) % galleryImages.length; lightboxImg.src = galleryImages[currentImgIndex].src; }
function showPrev() { currentImgIndex = (currentImgIndex - 1 + galleryImages.length) % galleryImages.length; lightboxImg.src = galleryImages[currentImgIndex].src; }

galleryGrid.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => openLightbox(parseInt(item.dataset.index, 10)));
});
document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
document.getElementById('lightboxNext').addEventListener('click', showNext);
document.getElementById('lightboxPrev').addEventListener('click', showPrev);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') showNext();
  if (e.key === 'ArrowLeft') showPrev();
});

/* =============================================
   TESTIMONIAL SLIDER
============================================= */
const testimonials = [
  { name: "Amelia Ross", role: "Food Critic", rating: 5, img: "https://randomuser.me/api/portraits/women/65.jpg", text: "Nocturne is the rare restaurant that trusts silence. No music, no rush — just extraordinary food in a room built for it." },
  { name: "James Okafor", role: "Regular Guest", rating: 5, img: "https://randomuser.me/api/portraits/men/54.jpg", text: "I've booked the same corner table eleven times this year. The tasting menu never repeats, and it never disappoints." },
  { name: "Sofia Marchetti", role: "Anniversary Dinner", rating: 5, img: "https://randomuser.me/api/portraits/women/33.jpg", text: "Candlelight, a five-course surprise menu, and a server who remembered we don't eat shellfish without being asked twice." },
];

const track = document.getElementById('testimonialTrack');
const dotsWrap = document.getElementById('testimonialDots');
let activeSlide = 0;
let sliderInterval;

track.innerHTML = testimonials.map((t, i) => `
  <div class="testimonial-slide ${i === 0 ? 'active' : ''}">
    <p>"${t.text}"</p>
    <div class="testimonial-slide__author">
      <img src="${t.img}" alt="${t.name}">
      <div style="text-align:left">
        <strong>${t.name}</strong>
        <span>${t.role}</span>
      </div>
    </div>
  </div>
`).join('');

dotsWrap.innerHTML = testimonials.map((_, i) => `<span class="${i === 0 ? 'active' : ''}" data-index="${i}"></span>`).join('');

const slideEls = track.querySelectorAll('.testimonial-slide');
const dotEls = dotsWrap.querySelectorAll('span');

function goToSlide(index) {
  slideEls.forEach(s => s.classList.remove('active'));
  dotEls.forEach(d => d.classList.remove('active'));
  slideEls[index].classList.add('active');
  dotEls[index].classList.add('active');
  activeSlide = index;
}

dotEls.forEach(dot => {
  dot.addEventListener('click', () => {
    goToSlide(parseInt(dot.dataset.index, 10));
    resetSliderInterval();
  });
});

function startSliderInterval() {
  sliderInterval = setInterval(() => {
    goToSlide((activeSlide + 1) % testimonials.length);
  }, 5000);
}
function resetSliderInterval() { clearInterval(sliderInterval); startSliderInterval(); }
startSliderInterval();

/* =============================================
   RESERVATION MODAL
============================================= */
const reservationModal = document.getElementById('reservationModal');
const openReservationBtn = document.getElementById('openReservation');
const closeReservationBtn = document.getElementById('closeReservation');
const reservationForm = document.getElementById('reservationForm');
const reservationSuccess = document.getElementById('reservationSuccess');
const closeSuccessBtn = document.getElementById('closeSuccess');

function openModal() {
  reservationModal.classList.add('open');
  reservationForm.style.display = 'block';
  reservationSuccess.classList.remove('show');
}
function closeModal() { reservationModal.classList.remove('open'); }

openReservationBtn.addEventListener('click', openModal);
document.querySelectorAll('a[href="#reserve"]').forEach(a => {
  // allow default scroll, modal opens via button only inside section
});
closeReservationBtn.addEventListener('click', closeModal);
closeSuccessBtn.addEventListener('click', closeModal);
reservationModal.addEventListener('click', (e) => { if (e.target === reservationModal) closeModal(); });

function setError(id, message) {
  const field = document.getElementById(id);
  const errorEl = document.querySelector(`[data-error="${id}"]`);
  if (message) {
    field.classList.add('invalid');
    if (errorEl) errorEl.textContent = message;
  } else {
    field.classList.remove('invalid');
    if (errorEl) errorEl.textContent = '';
  }
}

reservationForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;

  const name = document.getElementById('resName').value.trim();
  const email = document.getElementById('resEmail').value.trim();
  const phone = document.getElementById('resPhone').value.trim();
  const guests = document.getElementById('resGuests').value.trim();
  const date = document.getElementById('resDate').value;
  const time = document.getElementById('resTime').value;

  if (!name) { setError('resName', 'Please enter your name.'); valid = false; } else setError('resName', '');
  if (!/^\S+@\S+\.\S+$/.test(email)) { setError('resEmail', 'Enter a valid email.'); valid = false; } else setError('resEmail', '');
  if (!/^[\d\s()+-]{7,}$/.test(phone)) { setError('resPhone', 'Enter a valid phone number.'); valid = false; } else setError('resPhone', '');
  if (!guests || guests < 1 || guests > 12) { setError('resGuests', 'Guests must be 1–12.'); valid = false; } else setError('resGuests', '');
  if (!date) { setError('resDate', 'Please pick a date.'); valid = false; } else setError('resDate', '');
  if (!time) { setError('resTime', 'Please pick a time.'); valid = false; } else setError('resTime', '');

  if (!valid) return;

  reservationForm.style.display = 'none';
  reservationSuccess.classList.add('show');
  reservationForm.reset();
});

/* =============================================
   CONTACT FORM VALIDATION
============================================= */
const contactForm = document.getElementById('contactForm');
const contactNote = document.getElementById('contactNote');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;

  const name = document.getElementById('cName').value.trim();
  const email = document.getElementById('cEmail').value.trim();
  const message = document.getElementById('cMessage').value.trim();

  if (!name) { setError('cName', 'Please enter your name.'); valid = false; } else setError('cName', '');
  if (!/^\S+@\S+\.\S+$/.test(email)) { setError('cEmail', 'Enter a valid email.'); valid = false; } else setError('cEmail', '');
  if (!message || message.length < 5) { setError('cMessage', 'Message is too short.'); valid = false; } else setError('cMessage', '');

  if (!valid) { contactNote.textContent = ''; return; }

  contactNote.textContent = "Thanks — your message has been noted. We'll reply soon.";
  contactForm.reset();
});

/* =============================================
   FOOTER YEAR
============================================= */
document.getElementById('year').textContent = new Date().getFullYear();
