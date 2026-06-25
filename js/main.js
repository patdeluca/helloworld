'use strict';

// ── Data ─────────────────────────────────────────────────────────────────────
// Photos: Unsplash (free-to-use license). NPS links are official gov pages.

const PARKS = [
  {
    name:     'Yosemite',
    location: 'California',
    desc:     'Sheer granite cliffs, ancient sequoias, and valley waterfalls that inspired a nation to protect wild places.',
    photo:    'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&q=80',
    url:      'https://www.nps.gov/yose/',
  },
  {
    name:     'Grand Canyon',
    location: 'Arizona',
    desc:     'A mile deep and up to 18 miles wide — a geological record written across two billion years of Earth history.',
    photo:    'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=800&q=80',
    url:      'https://www.nps.gov/grca/',
  },
  {
    name:     'Yellowstone',
    location: 'Wyoming',
    desc:     "The world's first national park sits atop a supervolcano and holds half the planet's active geysers.",
    photo:    'https://images.unsplash.com/photo-1527489377706-5bf97e608852?w=800&q=80',
    url:      'https://www.nps.gov/yell/',
  },
  {
    name:     'Zion',
    location: 'Utah',
    desc:     'Towering Navajo sandstone cliffs carved by the Virgin River into natural cathedrals of red and cream.',
    photo:    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    url:      'https://www.nps.gov/zion/',
  },
  {
    name:     'Glacier',
    location: 'Montana',
    desc:     'Over 700 lakes, 200 waterfalls, and the legendary Going-to-the-Sun Road crown the Crown of the Continent.',
    photo:    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    url:      'https://www.nps.gov/glac/',
  },
  {
    name:     'Acadia',
    location: 'Maine',
    desc:     "New England's only national park drapes granite peaks and crashing Atlantic surf across Mount Desert Island.",
    photo:    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    url:      'https://www.nps.gov/acad/',
  },
];

const HERO_PHOTOS = [
  'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1600&q=80',
  'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=1600&q=80',
  'https://images.unsplash.com/photo-1527489377706-5bf97e608852?w=1600&q=80',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80',
];

// ── Hero slideshow ────────────────────────────────────────────────────────────

function initSlideshow() {
  const container = document.getElementById('slideshow');
  const imgs = HERO_PHOTOS.map((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = '';
    img.onerror = () => { img.style.display = 'none'; };
    if (i === 0) img.classList.add('active');
    container.appendChild(img);
    return img;
  });

  let current = 0;
  setInterval(() => {
    imgs[current].classList.remove('active');
    current = (current + 1) % imgs.length;
    imgs[current].classList.add('active');
  }, 5500);
}

// ── Park cards ────────────────────────────────────────────────────────────────

function renderCards() {
  const grid = document.getElementById('parksGrid');

  PARKS.forEach((park, i) => {
    const article = document.createElement('article');
    article.className = 'card';
    article.style.transitionDelay = `${(i % 3) * 0.12}s`;

    const img = document.createElement('img');
    img.src = park.photo;
    img.alt = `${park.name} National Park`;
    img.onerror = () => {
      img.setAttribute('data-broken', '');
    };

    const fallback = document.createElement('div');
    fallback.className = 'img-fallback';

    const overlay = document.createElement('div');
    overlay.className = 'card__overlay';
    overlay.innerHTML = `
      <p class="card__location">${park.location}</p>
      <h3 class="card__name">${park.name}</h3>
      <p class="card__desc">${park.desc}</p>
      <a class="card__link" href="${park.url}" target="_blank" rel="noopener">Visit NPS.gov</a>
    `;

    article.append(img, fallback, overlay);
    grid.appendChild(article);
  });
}

// ── Scroll-reveal ─────────────────────────────────────────────────────────────

function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.card').forEach((el) => observer.observe(el));
}

// ── Boot ──────────────────────────────────────────────────────────────────────

initSlideshow();
renderCards();
initReveal();
