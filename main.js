/**
 * HANSAI SHIPPING LINE — Main Interactive Application
 * ES6+ Vanilla JavaScript with Framer Motion (Motion for JavaScript) & Fallbacks
 */

document.addEventListener('DOMContentLoaded', () => {
  initIcons();
  initNavigation();
  initFramerMotionAnimations();
  initShipmentTracker();
  initRateEstimator();
  initModals();
  initFleetTabs();
  initIndustrySlider();
  initLiveTelemetrySimulation();
});

/* ==========================================================================
   1. ICON SYSTEM (Lucide with Offline SVG Fallback)
   ========================================================================== */
function initIcons() {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }

  // Check if any icons remain unrendered (e.g. offline or CDN blocked)
  const pendingIcons = document.querySelectorAll('i[data-lucide]:empty');
  if (pendingIcons.length > 0) {
    applySvgFallbacks(pendingIcons);
  }
}

function applySvgFallbacks(elements) {
  const svgMap = {
    'phone': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    'menu': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/></svg>',
    'x': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    'crosshair': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/></svg>',
    'arrow-right': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
    'arrow-left': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
    'arrow-up-right': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>',
    'search': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    'navigation': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>',
    'anchor': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/></svg>',
    'ship': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76"/><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/><line x1="12" y1="2" x2="12" y2="5"/></svg>',
    'warehouse': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z"/><path d="M6 18h12"/><path d="M6 14h12"/><rect width="12" height="12" x="6" y="10"/></svg>',
    'box': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
    'pickaxe': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><path d="M14.531 4.268 19.732 9.47a1 1 0 0 1 0 1.414l-8.486 8.486a1 1 0 0 1-1.414 0l-5.201-5.202a1 1 0 0 1 0-1.414l8.486-8.486a1 1 0 0 1 1.414 0Z"/><path d="m21.5 2.5-3 3"/><path d="m2 22 7-7"/></svg>',
    'factory': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/></svg>',
    'shopping-bag': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
    'zap': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    'leaf': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>',
    'shield-check': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>',
    'compass': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>',
    'mail': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
    'map-pin': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>',
    'calculator': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>',
    'send': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
    'download': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    'check-circle': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    'linkedin': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>',
    'twitter': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>',
    'facebook': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
    'youtube': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><polygon points="10 15 15 12 10 9 10 15"/></svg>'
  };

  elements.forEach(el => {
    const name = el.getAttribute('data-lucide');
    if (svgMap[name]) {
      el.innerHTML = svgMap[name];
    }
  });
}

/* ==========================================================================
   2. NAVIGATION & SCROLL MANAGEMENT
   ========================================================================== */
function initNavigation() {
  const navbar = document.getElementById('main-navbar');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const navLinks = document.querySelectorAll('.nav-anchor');

  // Sticky Navbar Blur & Shrink on Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('shadow-md', 'py-3');
      navbar.classList.remove('py-4');
    } else {
      navbar.classList.remove('shadow-md', 'py-3');
      navbar.classList.add('py-4');
    }
  }, { passive: true });

  // Mobile Menu Toggle
  function openMobileMenu() {
    mobileMenu.classList.remove('hidden');
    setTimeout(() => {
      mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
      mobileMenu.querySelector('.mobile-menu-drawer')?.classList.remove('translate-x-full');
    }, 10);
    document.body.classList.add('modal-open');
  }

  function closeMobileMenu() {
    mobileMenu.querySelector('.mobile-menu-drawer')?.classList.add('translate-x-full');
    mobileMenu.classList.add('opacity-0', 'pointer-events-none');
    setTimeout(() => {
      mobileMenu.classList.add('hidden');
      document.body.classList.remove('modal-open');
    }, 300);
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
  if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });
}

/* ==========================================================================
   3. FRAMER MOTION & INTERSECTION OBSERVER ANIMATIONS
   ========================================================================== */
function initFramerMotionAnimations() {
  const animElements = document.querySelectorAll('[data-reveal]');

  // Check if Motion library is available on window
  if (window.Motion && typeof window.Motion.animate === 'function') {
    const { animate, inView } = window.Motion;

    animElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';

      inView(el, () => {
        const delay = (parseInt(el.getAttribute('data-delay') || '0', 10) / 1000);
        animate(el, {
          opacity: [0, 1],
          transform: ['translateY(28px)', 'translateY(0px)']
        }, {
          duration: 0.85,
          delay: delay,
          easing: [0.16, 1, 0.3, 1]
        });
      }, { margin: '0px 0px -50px 0px' });
    });
  } else {
    // Pure CSS & IntersectionObserver fallback
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.getAttribute('data-delay') || '0';
          
          setTimeout(() => {
            el.classList.remove('opacity-0', 'translate-y-8', 'scale-95');
            el.classList.add('opacity-100', 'translate-y-0', 'scale-100');
          }, parseInt(delay, 10));

          observer.unobserve(el);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    animElements.forEach(el => {
      el.classList.add('transition-all', 'duration-700', 'ease-out', 'opacity-0', 'translate-y-8');
      revealObserver.observe(el);
    });
  }
}

/* ==========================================================================
   4. SHIPMENT TRACKER SIMULATOR
   ========================================================================== */
const activeShipments = {
  'HNSU-849201-9': {
    containerNo: 'HNSU-849201-9',
    vessel: 'HANSAI PACIFIC STAR',
    voyage: 'HP-0428W',
    origin: 'Port of Shanghai (CNSHG)',
    destination: 'Port of Rotterdam (NLRTM)',
    status: 'In Transit — Indian Ocean Corridor',
    statusCode: 'ON_TRACK',
    progressPercent: 68,
    speed: '21.4 knots',
    heading: '268° WSW',
    coordinates: '12° 04\' 18" N, 64° 32\' 09" E',
    temperature: '+4.2°C (Dry High-Cube Ambient)',
    eta: 'Nov 22, 2026 • 14:00 CET',
    departureDate: 'Nov 04, 2026 • 08:30 CST',
    sealNumber: 'HSL-SL-908122-A',
    commodity: 'Precision High-Tech Equipment & Industrial Components',
    milestones: [
      { step: 'Gate-in Origin Terminal (Yangshan Deepwater Port Phase IV)', date: 'Nov 02, 2026', done: true },
      { step: 'Vessel Loaded & Ocean B/L Manifest Released', date: 'Nov 04, 2026', done: true },
      { step: 'Transshipment Passage — Singapore Strait', date: 'Nov 10, 2026', done: true },
      { step: 'Voyage Ocean Passage (Indian Ocean Corridor)', date: 'Nov 13, 2026', done: true, current: true },
      { step: 'Suez Canal Transit Corridor Entry Convoy', date: 'Nov 16, 2026', done: false },
      { step: 'Berth Arrival & Discharge — Rotterdam APM Terminal', date: 'Nov 22, 2026', done: false }
    ]
  },
  'HNSU-339102-4': {
    containerNo: 'HNSU-339102-4',
    vessel: 'HANSAI HORIZON',
    voyage: 'HH-1092E',
    origin: 'Port of Singapore (SGSIN)',
    destination: 'Port of Los Angeles (USLAX)',
    status: 'Arrived at Berth — Pier 400',
    statusCode: 'COMPLETED',
    progressPercent: 100,
    speed: '0.0 knots',
    heading: 'Moored at Terminal Berth',
    coordinates: '33° 43\' 22" N, 118° 14\' 35" W',
    temperature: '-20.5°C (Reefer Cold Chain Pharma)',
    eta: 'Discharged • Nov 12, 2026',
    departureDate: 'Oct 28, 2026 • 19:15 SGT',
    sealNumber: 'HSL-RF-441098-C',
    commodity: 'Pharmaceutical Cold Chain Vaccines & Biologics',
    milestones: [
      { step: 'Pre-Trip Inspection & Reefer Pre-Cooling to -20°C', date: 'Oct 26, 2026', done: true },
      { step: 'Loaded Aboard HANSAI HORIZON (PSA Tuas Mega Port)', date: 'Oct 28, 2026', done: true },
      { step: 'Trans-Pacific Ocean Transit (Great Circle Route)', date: 'Nov 06, 2026', done: true },
      { step: 'Pilot Boarding & San Pedro Bay Berth Approach', date: 'Nov 11, 2026', done: true },
      { step: 'Discharged & Custom Cleared at Pier 400 Berth 404', date: 'Nov 12, 2026', done: true, current: true }
    ]
  },
  'HNSU-551092-7': {
    containerNo: 'HNSU-551092-7',
    vessel: 'HANSAI ENTERPRISE',
    voyage: 'HE-0771S',
    origin: 'Port of Busan (KRPUS)',
    destination: 'Jebel Ali Port, Dubai (AEJEA)',
    status: 'Departed Terminal — South China Sea Corridor',
    statusCode: 'DEPARTED',
    progressPercent: 28,
    speed: '20.1 knots',
    heading: '215° SW',
    coordinates: '18° 22\' 40" N, 114° 10\' 55" E',
    temperature: 'Ambient Dry (Heavy Machinery)',
    eta: 'Nov 27, 2026 • 06:00 GST',
    departureDate: 'Nov 10, 2026 • 16:40 KST',
    sealNumber: 'HSL-HM-219483-B',
    commodity: 'Heavy Mining & Industrial Fabrication Assemblies',
    milestones: [
      { step: 'Cargo Staging & Heavy-Lift Lashing Certification', date: 'Nov 08, 2026', done: true },
      { step: 'Vessel Berthing & Gantry Stowage (Busan New Port)', date: 'Nov 10, 2026', done: true },
      { step: 'South China Sea Coastal Transit', date: 'Nov 13, 2026', done: true, current: true },
      { step: 'Bunkering & Cargo Inspection (Singapore Roads)', date: 'Nov 17, 2026', done: false },
      { step: 'Arabian Sea Passage & Gulf of Oman', date: 'Nov 24, 2026', done: false },
      { step: 'Berth Arrival & Terminal Release (Jebel Ali Terminal 2)', date: 'Nov 27, 2026', done: false }
    ]
  }
};

function initShipmentTracker() {
  const trackForm = document.getElementById('hero-track-form');
  const trackInput = document.getElementById('hero-track-input');
  const samplePills = document.querySelectorAll('.sample-track-pill');

  function handleTrack(id) {
    const cleanId = (id || '').trim().toUpperCase();
    const data = activeShipments[cleanId] || generateDynamicShipment(cleanId || 'HNSU-849201-9');
    displayShipmentInModal(data);
  }

  if (trackForm) {
    trackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleTrack(trackInput ? trackInput.value : '');
    });
  }

  samplePills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      const id = pill.getAttribute('data-id');
      if (trackInput) trackInput.value = id;
      handleTrack(id);
    });
  });
}

function generateDynamicShipment(queryId) {
  return {
    containerNo: queryId,
    vessel: 'HANSAI ATLANTIC VOYAGER',
    voyage: 'HV-0819X',
    origin: 'Port of Singapore (SGSIN)',
    destination: 'Port of Hamburg (DEHAM)',
    status: 'In Transit — Verified Satellite Telemetry',
    statusCode: 'ON_TRACK',
    progressPercent: 54,
    speed: '19.8 knots',
    heading: '290° WNW',
    coordinates: '14° 18\' 30" N, 53° 44\' 12" E',
    temperature: '+3.8°C Controlled Ambient',
    eta: 'Nov 25, 2026 • 18:00 CET',
    departureDate: 'Nov 07, 2026 • 11:20 SGT',
    sealNumber: 'HSL-VS-' + Math.floor(100000 + Math.random() * 900000),
    commodity: 'Commercial Merchandise (FCL Standardized 40HC)',
    milestones: [
      { step: 'Origin Berth Loading & Export Documentation', date: 'Nov 06, 2026', done: true },
      { step: 'Vessel Unmoored & Sea Passage Commencement', date: 'Nov 07, 2026', done: true },
      { step: 'Intermediate Waypoint Navigation & Telemetry Lock', date: 'Nov 13, 2026', done: true, current: true },
      { step: 'Gibraltar Strait Passage Corridor', date: 'Nov 19, 2026', done: false },
      { step: 'English Channel & Elbe River Pilotage', date: 'Nov 23, 2026', done: false },
      { step: 'Hamburg Container Terminal Altenwerder (CTA)', date: 'Nov 25, 2026', done: false }
    ]
  };
}

function displayShipmentInModal(data) {
  const modal = document.getElementById('tracking-modal');
  if (!modal) return;

  const containerEl = document.getElementById('track-modal-container-no');
  const vesselEl = document.getElementById('track-modal-vessel');
  const originEl = document.getElementById('track-modal-origin');
  const destEl = document.getElementById('track-modal-dest');
  const statusEl = document.getElementById('track-modal-status');
  const etaEl = document.getElementById('track-modal-eta');
  const speedEl = document.getElementById('track-modal-speed');
  const coordsEl = document.getElementById('track-modal-coords');
  const tempEl = document.getElementById('track-modal-temp');
  const progressEl = document.getElementById('track-modal-progress');
  const milestonesEl = document.getElementById('track-modal-milestones');

  if (containerEl) containerEl.textContent = data.containerNo;
  if (vesselEl) vesselEl.textContent = `${data.vessel} (Voyage ${data.voyage})`;
  if (originEl) originEl.textContent = data.origin;
  if (destEl) destEl.textContent = data.destination;
  if (statusEl) statusEl.textContent = data.status;
  if (etaEl) etaEl.textContent = data.eta;
  if (speedEl) speedEl.textContent = data.speed;
  if (coordsEl) coordsEl.textContent = data.coordinates;
  if (tempEl) tempEl.textContent = data.temperature;
  if (progressEl) {
    progressEl.style.width = `${data.progressPercent}%`;
  }

  if (milestonesEl) {
    milestonesEl.innerHTML = data.milestones.map((m) => `
      <div class="flex items-start space-x-3.5 relative pb-5 last:pb-0">
        <div class="flex flex-col items-center">
          <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
            m.done 
              ? 'bg-[#06345B] text-white shadow-sm' 
              : 'bg-gray-100 text-gray-400 border border-gray-300'
          }">
            ${m.done ? '✓' : '•'}
          </div>
          <div class="w-0.5 bg-gray-200 h-full mt-1 last:hidden"></div>
        </div>
        <div class="flex-1 pt-0.5">
          <div class="flex items-center justify-between">
            <p class="text-sm font-semibold ${m.current ? 'text-[#06345B]' : m.done ? 'text-gray-900' : 'text-gray-400'}">
              ${m.step}
              ${m.current ? '<span class="ml-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-[#0084FF] border border-blue-200">LIVE POSITION</span>' : ''}
            </p>
            <span class="text-xs text-gray-400 font-mono">${m.date}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  openModal('tracking-modal');
  initIcons();
}

/* ==========================================================================
   5. RATE ESTIMATOR & BOOKING CALCULATOR (Global Searchable Ports & WhatsApp Bot)
   ========================================================================== */
function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/[&<>"']/g, function (m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m];
  });
}

function highlightMatch(text, query) {
  if (!query || !query.trim()) return escapeHtml(text);
  const escapedQuery = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedQuery})`, 'gi');
  const safeText = escapeHtml(text);
  return safeText.replace(regex, '<span class="highlight-text">$1</span>');
}

function getPortByCode(code) {
  const list = (window.HANSAI_WORLD_PORTS && window.HANSAI_WORLD_PORTS.length)
    ? window.HANSAI_WORLD_PORTS
    : [];
  return list.find(p => p.code === code) || {
    code: code || 'UNKNOWN',
    country: 'International',
    port: code || 'Port Gateway',
    region: 'Global',
    flag: '🌐',
    lat: 0,
    lng: 0
  };
}

function calculateNauticalDistance(p1, p2) {
  if (!p1 || !p2 || p1.code === p2.code) return 0;

  // Haversine Great-Circle distance in Nautical Miles
  const R = 3440.065; // Earth radius in NM
  const dLat = (p2.lat - p1.lat) * Math.PI / 180;
  const dLng = (p2.lng - p1.lng) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(p1.lat * Math.PI / 180) * Math.cos(p2.lat * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const greatCircleNM = R * c;

  // Maritime Detour Routing Factors (canal transit, rounding continents)
  let detourFactor = 1.35;
  if (p1.region === p2.region) {
    detourFactor = 1.15;
  } else if ((p1.region === 'Asia' && p2.region === 'Europe') || (p1.region === 'Europe' && p2.region === 'Asia')) {
    detourFactor = 1.45; // Suez Canal route
  } else if ((p1.region === 'Americas' && p2.region === 'Asia') || (p1.region === 'Asia' && p2.region === 'Americas')) {
    detourFactor = 1.25; // Transpacific
  }

  return Math.round(greatCircleNM * detourFactor);
}

function setupSearchablePortDropdown({
  btnId,
  textId,
  popoverId,
  searchInputId,
  clearBtnId,
  listId,
  countId,
  hiddenSelectId,
  pillClass,
  defaultCode,
  onChange
}) {
  const btn = document.getElementById(btnId);
  const textEl = document.getElementById(textId);
  const popover = document.getElementById(popoverId);
  const searchInput = document.getElementById(searchInputId);
  const clearBtn = document.getElementById(clearBtnId);
  const listEl = document.getElementById(listId);
  const countEl = document.getElementById(countId);
  const hiddenSelect = document.getElementById(hiddenSelectId);

  if (!btn || !popover || !listEl) return;

  const ports = (window.HANSAI_WORLD_PORTS && window.HANSAI_WORLD_PORTS.length)
    ? window.HANSAI_WORLD_PORTS
    : [];

  // Populate hidden select for form consistency
  if (hiddenSelect && ports.length) {
    hiddenSelect.innerHTML = ports.map(p =>
      `<option value="${p.code}" ${p.code === defaultCode ? 'selected' : ''}>${p.country} — ${p.port} (${p.code})</option>`
    ).join('');
    hiddenSelect.value = defaultCode;
  }

  let currentSearch = '';
  let currentRegion = 'ALL';
  let activeCode = defaultCode;

  // Set default display text
  const defPort = getPortByCode(activeCode);
  if (textEl) textEl.textContent = `${defPort.flag} ${defPort.country} — ${defPort.port} (${defPort.code})`;

  function renderList() {
    const q = currentSearch.toLowerCase().trim();
    const filtered = ports.filter(p => {
      const matchRegion = currentRegion === 'ALL' || p.region === currentRegion;
      if (!matchRegion) return false;
      if (!q) return true;
      return (
        p.country.toLowerCase().includes(q) ||
        p.port.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.region.toLowerCase().includes(q)
      );
    });

    if (countEl) {
      countEl.textContent = `Menampilkan ${filtered.length} negara & pelabuhan`;
    }

    if (filtered.length === 0) {
      listEl.innerHTML = `
        <div class="p-6 text-center text-xs text-gray-400">
          <div>Tidak ada negara atau pelabuhan yang cocok dengan "<strong>${escapeHtml(currentSearch)}</strong>".</div>
          <div class="mt-1 text-[11px] text-gray-400">Coba kata kunci lain atau pilih tab region.</div>
        </div>
      `;
      return;
    }

    listEl.innerHTML = filtered.map(p => {
      const isSelected = p.code === activeCode;
      return `
        <div class="port-option flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer hover:bg-blue-50/90 transition-colors ${isSelected ? 'selected font-semibold text-[#06345B] bg-blue-50/50' : 'text-gray-800'}" data-code="${p.code}">
          <div class="flex items-center space-x-2.5 min-w-0">
            <span class="text-base flex-shrink-0 select-none">${p.flag}</span>
            <div class="min-w-0">
              <div class="text-xs truncate font-medium text-gray-900">${highlightMatch(p.country, currentSearch)}</div>
              <div class="text-[11px] text-gray-500 truncate">${highlightMatch(p.port, currentSearch)} • <span class="font-mono text-[10px] text-gray-400">${p.code}</span></div>
            </div>
          </div>
          <div class="flex items-center space-x-1.5 flex-shrink-0 ml-2">
            <span class="text-[9px] font-mono px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">${p.region}</span>
            ${isSelected ? '<span class="text-emerald-600 font-bold text-xs">✓</span>' : ''}
          </div>
        </div>
      `;
    }).join('');

    listEl.querySelectorAll('.port-option').forEach(item => {
      item.addEventListener('click', () => {
        selectItem(item.getAttribute('data-code'));
      });
    });
  }

  function selectItem(code) {
    activeCode = code;
    const p = getPortByCode(code);
    if (textEl) textEl.textContent = `${p.flag} ${p.country} — ${p.port} (${p.code})`;
    if (hiddenSelect) {
      hiddenSelect.value = code;
      hiddenSelect.dispatchEvent(new Event('change', { bubbles: true }));
    }
    close();
    btn.focus();
    if (typeof onChange === 'function') onChange(code);
  }

  function open() {
    // Close other popovers
    document.querySelectorAll('.hansai-combo-box .searchable-popover').forEach(p => {
      if (p !== popover) p.classList.add('hidden');
    });
    document.querySelectorAll('.hansai-combo-box button[aria-expanded="true"]').forEach(b => {
      if (b !== btn) b.setAttribute('aria-expanded', 'false');
    });

    popover.classList.remove('hidden');
    btn.setAttribute('aria-expanded', 'true');
    renderList();
    if (searchInput) {
      setTimeout(() => searchInput.focus(), 60);
    }
  }

  function close() {
    popover.classList.add('hidden');
    btn.setAttribute('aria-expanded', 'false');
  }

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (popover.classList.contains('hidden')) {
      open();
    } else {
      close();
    }
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value;
      if (clearBtn) {
        if (currentSearch) clearBtn.classList.remove('hidden');
        else clearBtn.classList.add('hidden');
      }
      renderList();
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        close();
        btn.focus();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const firstOpt = listEl.querySelector('.port-option');
        if (firstOpt) {
          selectItem(firstOpt.getAttribute('data-code'));
        }
      }
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      searchInput.value = '';
      currentSearch = '';
      clearBtn.classList.add('hidden');
      renderList();
      searchInput.focus();
    });
  }

  // Region tabs
  const pills = popover.querySelectorAll(`.${pillClass}`);
  pills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      pills.forEach(p => {
        p.classList.remove('bg-[#06345B]', 'text-white');
        p.classList.add('bg-gray-100', 'text-gray-600');
      });
      pill.classList.remove('bg-gray-100', 'text-gray-600');
      pill.classList.add('bg-[#06345B]', 'text-white');
      currentRegion = pill.getAttribute('data-region') || 'ALL';
      renderList();
    });
  });

  // Global click outside
  document.addEventListener('click', (e) => {
    if (!popover.contains(e.target) && !btn.contains(e.target)) {
      close();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !popover.classList.contains('hidden')) {
      close();
      btn.focus();
    }
  });
}

function initRateEstimator() {
  const form = document.getElementById('rate-calculator-form');
  if (!form) return;

  const originSelect = document.getElementById('calc-origin');
  const destSelect = document.getElementById('calc-dest');
  const containerSelect = document.getElementById('calc-container');
  const commoditySelect = document.getElementById('calc-commodity');
  const resultTransit = document.getElementById('calc-result-transit');
  const resultRate = document.getElementById('calc-result-rate');
  const resultCo2 = document.getElementById('calc-result-co2');
  const bookBtn = document.getElementById('calc-book-btn');

  // Benchmark route data for exact matching
  const routeData = {
    'SGSIN-NLRTM': { transit: '22 Days', baseRate: 2450, nauticalMiles: 8280 },
    'CNSHG-NLRTM': { transit: '26 Days', baseRate: 2850, nauticalMiles: 10500 },
    'SGSIN-USLAX': { transit: '19 Days', baseRate: 2150, nauticalMiles: 7850 },
    'CNSHG-USLAX': { transit: '14 Days', baseRate: 1950, nauticalMiles: 5800 },
    'KRPUS-AEJEA': { transit: '16 Days', baseRate: 1820, nauticalMiles: 6100 },
    'DEHAM-USNYC': { transit: '11 Days', baseRate: 1750, nauticalMiles: 3800 },
    'CNSHG-AEJEA': { transit: '18 Days', baseRate: 1980, nauticalMiles: 5950 }
  };

  const containerMultipliers = {
    '20FT_STD': 1.0,
    '40FT_HC': 1.65,
    '40FT_REEFER': 2.35
  };

  const commodityMultipliers = {
    'GEN': 1.0,
    'AUTO': 1.15,
    'ELEC': 1.10,
    'COLD': 1.25
  };

  function updateEstimate() {
    const origin = originSelect?.value || 'CNSHG';
    const dest = destSelect?.value || 'NLRTM';
    const container = containerSelect?.value || '40FT_HC';
    const commodity = commoditySelect?.value || 'GEN';

    const key = `${origin}-${dest}`;
    const reverseKey = `${dest}-${origin}`;

    if (origin === dest) {
      if (resultTransit) resultTransit.textContent = '1 - 2 Days (Feeder / Barge)';
      if (resultRate) resultRate.textContent = '$450 – $650';
      if (resultCo2) resultCo2.textContent = '0.12 MT CO2e';
      return;
    }

    let data;
    if (routeData[key]) {
      data = routeData[key];
    } else if (routeData[reverseKey]) {
      data = routeData[reverseKey];
    } else {
      // Dynamic estimation for all 200+ global countries & ports
      const p1 = getPortByCode(origin);
      const p2 = getPortByCode(dest);
      const nm = calculateNauticalDistance(p1, p2);

      // Average liner speed ~17 knots (400 NM/day) + canal/port handling
      const sailingDays = Math.round(nm / 390);
      const canalDelay = (p1.region !== p2.region) ? 2 : 0;
      const totalDays = Math.max(3, sailingDays + canalDelay);

      // Base 20FT ocean rate scaled realistically
      const calculatedBase = Math.round(580 + (nm * 0.215));

      data = {
        transit: `${totalDays} Days`,
        baseRate: calculatedBase,
        nauticalMiles: nm
      };
    }

    const contMult = containerMultipliers[container] || 1.65;
    const commMult = commodityMultipliers[commodity] || 1.0;
    const estimatedCost = Math.round(data.baseRate * contMult * commMult);

    const lowRange = Math.round(estimatedCost * 0.95);
    const highRange = Math.round(estimatedCost * 1.08);
    const co2Tonnes = ((data.nauticalMiles * 12.8) / 1000).toFixed(2);

    if (resultTransit) resultTransit.textContent = data.transit;
    if (resultRate) resultRate.textContent = `$${lowRange.toLocaleString()} – $${highRange.toLocaleString()}`;
    if (resultCo2) resultCo2.textContent = `${co2Tonnes} MT CO2e`;
  }

  // Setup Clean Searchable Dropdowns
  setupSearchablePortDropdown({
    btnId: 'combo-origin-btn',
    textId: 'combo-origin-text',
    popoverId: 'combo-origin-popover',
    searchInputId: 'combo-origin-search',
    clearBtnId: 'combo-origin-clear',
    listId: 'combo-origin-list',
    countId: 'combo-origin-count',
    hiddenSelectId: 'calc-origin',
    pillClass: 'origin-pill',
    defaultCode: 'CNSHG',
    onChange: () => updateEstimate()
  });

  setupSearchablePortDropdown({
    btnId: 'combo-dest-btn',
    textId: 'combo-dest-text',
    popoverId: 'combo-dest-popover',
    searchInputId: 'combo-dest-search',
    clearBtnId: 'combo-dest-clear',
    listId: 'combo-dest-list',
    countId: 'combo-dest-count',
    hiddenSelectId: 'calc-dest',
    pillClass: 'dest-pill',
    defaultCode: 'NLRTM',
    onChange: () => updateEstimate()
  });

  [originSelect, destSelect, containerSelect, commoditySelect].forEach(sel => {
    if (sel) sel.addEventListener('change', updateEstimate);
  });

  // Direct WhatsApp Autochat Bot Dispatch on Blue Button Click
  if (bookBtn) {
    bookBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const originVal = originSelect?.value || 'CNSHG';
      const destVal = destSelect?.value || 'NLRTM';
      const containerVal = containerSelect?.value || '40FT_HC';
      const commodityVal = commoditySelect?.value || 'GEN';

      const originPort = getPortByCode(originVal);
      const destPort = getPortByCode(destVal);

      const containerText = containerSelect?.options[containerSelect.selectedIndex]?.text || '40ft High Cube (76.4 CBM)';
      const commodityText = commoditySelect?.options[commoditySelect.selectedIndex]?.text || 'General Manufactured Cargo';

      const transitText = resultTransit ? resultTransit.textContent.trim() : '26 Days';
      const rateText = resultRate ? resultRate.textContent.trim() : '$4,468 – $5,079';
      const co2Text = resultCo2 ? resultCo2.textContent.trim() : '134.40 MT CO2e';

      const refCode = 'HSL-' + Math.floor(100000 + Math.random() * 900000);
      const now = new Date();
      const dateFormatted = now.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }) + ', ' + now.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit'
      }) + ' WIB';

      // Clean structured format tailored for Autochat Bot (0818 0588 6644)
      const waMessage = 
`*HANSAI SHIPPING LINE — OCEAN FREIGHT BOOKING*
*AUTO-BOT RATE LOCK & INSTANT BOOKING REQUEST*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*Kode Booking:* #${refCode}
*Waktu:* ${dateFormatted}
*Status:* LOCKED RATE CONFIRMATION

🚢 *SPESIFIKASI PENGIRIMAN CARGO:*
• *Pelabuhan Asal (Origin):* ${originPort.port} (${originPort.code}), ${originPort.country} ${originPort.flag}
• *Pelabuhan Tujuan (Dest):* ${destPort.port} (${destPort.code}), ${destPort.country} ${destPort.flag}
• *Tipe Kontainer:* ${containerText}
• *Klasifikasi Komoditas:* ${commodityText}
• *Estimasi Waktu Tempuh:* ${transitText}
• *Estimasi Tarif Freight:* ${rateText}
• *Jejak Karbon (CO2e):* ${co2Text}

🤖 *COMMAND AUTO-BOT:*
\`!BOOKING ${refCode} ${originPort.code} ${destPort.code} ${containerVal} ${commodityVal}\`

Halo Admin & Sistem Autochat Bot Hansai Shipping Line, saya ingin mengunci estimasi tarif dan memesan jadwal kapal untuk rute di atas. Mohon konfirmasi ketersediaan kontainer (space allocation) dan instruksi kelengkapan dokumen pengapalan. Terima kasih!`;

      const waPhone = '6281805886644';
      const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(waMessage)}`;

      // Show instant feedback toast
      showToast(`Membuka WhatsApp... Mengirim permohonan booking #${refCode} ke WhatsApp Autochat Bot (+62 818 0588 6644).`);

      // Launch WhatsApp directly
      const waTab = window.open(waUrl, '_blank');

      // Update WhatsApp Confirmation Modal elements
      const previewEl = document.getElementById('wa-modal-preview');
      const directBtn = document.getElementById('wa-modal-direct-btn');
      if (previewEl) previewEl.textContent = waMessage;
      if (directBtn) directBtn.href = waUrl;

      // If browser blocked popup, open modal immediately; otherwise open after subtle delay for confirmation
      if (!waTab || waTab.closed || typeof waTab.closed === 'undefined') {
        openModal('whatsapp-booking-modal');
      } else {
        setTimeout(() => {
          openModal('whatsapp-booking-modal');
        }, 350);
      }
    });
  }

  updateEstimate();
}

/* ==========================================================================
   6. MODALS & FORMS MANAGEMENT
   ========================================================================== */
function initModals() {
  const modalTriggers = document.querySelectorAll('[data-open-modal]');
  const modalCloseBtns = document.querySelectorAll('[data-close-modal]');
  const modalBackdrops = document.querySelectorAll('.modal-backdrop');

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = btn.getAttribute('data-open-modal');
      openModal(modalId);
    });
  });

  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = btn.closest('.modal-backdrop');
      if (modal) closeModal(modal.id);
    });
  });

  modalBackdrops.forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeModal(backdrop.id);
      }
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModalEl = document.querySelector('.modal-backdrop.active');
      if (openModalEl) closeModal(openModalEl.id);
    }
  });

  // Populate official quote modal with all countries
  const quoteOrigin = document.getElementById('quote-origin');
  const quoteDest = document.getElementById('quote-dest');
  const allPorts = (window.HANSAI_WORLD_PORTS && window.HANSAI_WORLD_PORTS.length)
    ? window.HANSAI_WORLD_PORTS
    : [];

  if (quoteOrigin && allPorts.length) {
    quoteOrigin.innerHTML = allPorts.map(p =>
      `<option value="${p.code}">${p.flag} ${p.country} — ${p.port} (${p.code})</option>`
    ).join('');
    quoteOrigin.value = 'CNSHG';
  }
  if (quoteDest && allPorts.length) {
    quoteDest.innerHTML = allPorts.map(p =>
      `<option value="${p.code}">${p.flag} ${p.country} — ${p.port} (${p.code})</option>`
    ).join('');
    quoteDest.value = 'NLRTM';
  }

  const quoteForm = document.getElementById('official-quote-form');
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal('quote-modal');

      const qOriginVal = quoteOrigin ? quoteOrigin.value : 'CNSHG';
      const qDestVal = quoteDest ? quoteDest.value : 'NLRTM';
      const originObj = getPortByCode(qOriginVal);
      const destObj = getPortByCode(qDestVal);

      const qContainer = document.getElementById('quote-container');
      const qContainerVal = qContainer ? qContainer.options[qContainer.selectedIndex]?.text : '40ft High Cube';
      const inputs = quoteForm.querySelectorAll('input');
      const countVal = inputs[0] ? inputs[0].value : '1';
      const weightVal = inputs[1] ? inputs[1].value : '-';
      const dateVal = inputs[2] ? inputs[2].value : '-';
      const nameVal = inputs[3] ? inputs[3].value : 'Client';
      const emailVal = inputs[4] ? inputs[4].value : '-';

      const refCode = 'HSL-QUO-' + Math.floor(100000 + Math.random() * 900000);

      const waMsg = 
`*HANSAI SHIPPING LINE — OFFICIAL FREIGHT QUOTE*
*AUTO-BOT QUOTE & INQUIRY REQUEST*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*Ref ID:* #${refCode}
*Customer:* ${nameVal}
*Email:* ${emailVal}

📦 *SPESIFIKASI CARGO & BOOKING:*
• *Port of Origin:* ${originObj.port} (${originObj.code}), ${originObj.country} ${originObj.flag}
• *Port of Discharge:* ${destObj.port} (${destObj.code}), ${destObj.country} ${destObj.flag}
• *Tipe Kontainer:* ${qContainerVal}
• *Jumlah Kontainer:* ${countVal} Unit
• *Estimasi Berat:* ${weightVal ? weightVal + ' Tonnes' : '-'}
• *Target Loading:* ${dateVal || '-'}

🤖 *COMMAND BOT:*
\`!OFFICIAL_QUOTE ${refCode} ${originObj.code} ${destObj.code} ${countVal}BOX\`

Halo Tim Hansai Shipping Line, mohon quotation resmi dan konfirmasi jadwal kapal untuk permohonan pengiriman di atas. Terima kasih!`;

      const waPhone = '6281805886644';
      const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(waMsg)}`;

      showToast(`Quote Request Dispatched! Reference #${refCode}. Mengalihkan ke WhatsApp Autochat Bot (+62 818 0588 6644)...`);
      window.open(waUrl, '_blank');
      quoteForm.reset();
    });
  }

  const contactForm = document.getElementById('contact-us-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal('contact-modal');
      showToast('Thank you for contacting HANSAI SHIPPING LINE. Our regional commercial desk has received your message.');
      contactForm.reset();
    });
  }

  const serviceCards = document.querySelectorAll('[data-service-key]');
  serviceCards.forEach(card => {
    const btn = card.querySelector('.service-learn-more-btn');
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const key = card.getAttribute('data-service-key');
        showServiceDetailModal(key);
      });
    }
    card.addEventListener('click', () => {
      const key = card.getAttribute('data-service-key');
      showServiceDetailModal(key);
    });
  });
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add('active');
  document.body.classList.add('modal-open');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove('active');
  document.body.classList.remove('modal-open');
}

function showToast(message) {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'fixed bottom-6 right-6 z-50 max-w-md bg-[#032746] text-white px-5 py-4 rounded-2xl shadow-2xl border border-white/10 flex items-center space-x-3 transition-all duration-300 transform translate-y-24 opacity-0';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <div class="w-8 h-8 rounded-full bg-[#0084FF]/20 flex items-center justify-center flex-shrink-0 text-[#0084FF]">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
    </div>
    <div class="flex-1 text-sm font-medium leading-snug">${message}</div>
    <button class="text-white/60 hover:text-white ml-2 text-xs" onclick="this.parentElement.classList.add('translate-y-24','opacity-0')">✕</button>
  `;

  setTimeout(() => {
    toast.classList.remove('translate-y-24', 'opacity-0');
  }, 50);

  setTimeout(() => {
    toast.classList.add('translate-y-24', 'opacity-0');
  }, 6500);
}

/* ==========================================================================
   7. SERVICE DETAIL MODALS
   ========================================================================== */
const serviceData = {
  'international-shipping': {
    title: 'International Ocean Shipping',
    subtitle: 'Global Container Transportation & Regular Liner Services',
    description: 'HANSAI SHIPPING LINE provides reliable port-to-port and door-to-port ocean container shipping connecting major industrial manufacturing hubs in Asia, Europe, North America, the Middle East, and Latin America. We operate a modern fleet of Ultra Large Container Vessels (ULCV) with weekly fixed-day departures and guaranteed vessel space.',
    features: [
      'Full Container Load (FCL) & Less than Container Load (LCL)',
      'Direct deepwater berthing windows at 140+ global tier-1 ports',
      'Advanced IMO Class 1-9 Dangerous Goods & Out-of-Gauge (OOG) handling',
      'Proprietary smart telematics monitoring onboard all dry and reefer containers'
    ],
    specs: 'Annual Volume: 1.8M+ TEU | Fleet Capacity: 85 Vessels | On-Time Index: 99.4%'
  },
  'warehousing': {
    title: 'Warehousing & Distribution',
    subtitle: 'High-Bay Automated Storage & Multimodal Logistics Centers',
    description: 'Strategically positioned near major container terminals and air cargo hubs, HANSAI warehousing facilities offer cross-docking, bonded customs storage, inventory staging, and omni-channel distribution. Every facility is integrated with our cloud Warehouse Management System (WMS) for real-time inventory visibility down to SKU level.',
    features: [
      'Temperature-controlled pharmaceutical & food-grade cold storage',
      'Bonded export staging & container stuffing/devanning operations',
      'Automated robotic sorting & pick-and-pack fulfillment',
      'Seamless EDI / API integration with enterprise ERP systems (SAP, Oracle)'
    ],
    specs: 'Storage Footprint: 2.4M sq. meters | 18 Global Logistics Hubs | 24/7 Security'
  },
  'freight-forwarding': {
    title: 'Integrated Freight Forwarding',
    subtitle: 'Multimodal Sea, Air, Rail, and Road Network Orchestration',
    description: 'Navigating complex global trade lanes requires seamless multimodal coordination. HANSAI integrates ocean transport with dedicated block trains, air charter links, and heavy-duty drayage fleets to deliver end-to-end supply chain transit without bottlenecks.',
    features: [
      'Sea-Air expedited corridors for urgent peak-season shipments',
      'Eurasian intermodal rail bridges connecting Asia and European hinterlands',
      'Dedicated port drayage fleet with automated appointment scheduling',
      'Comprehensive marine cargo insurance and voyage risk hedging'
    ],
    specs: 'Coverage: 45+ Countries | Multimodal Corridors: 320+ | Customs Clear Rate: 99.9%'
  },
  'supply-chain': {
    title: 'Supply Chain Management',
    subtitle: 'Intelligent Control Tower & Predictive Logistics Orchestration',
    description: 'Gain total control over your global flow of goods with HANSAI Supply Chain Solutions. Our proprietary digital control tower aggregates vessel AIS feeds, port congestion forecasts, weather patterns, and customs throughput data to optimize routes and eliminate costly demurrage.',
    features: [
      'End-to-end container milestone visibility with automated discrepancy alerts',
      'Demurrage and detention risk prediction algorithm',
      'Vendor management and origin order consolidation',
      'ESG carbon reporting & Scope 3 greenhouse gas emission audits'
    ],
    specs: 'Cost Reduction: ~14% Avg Savings | Real-Time Latency: < 2 seconds'
  },
  'customs-clearance': {
    title: 'Customs Clearance & Brokerage',
    subtitle: 'Regulatory Compliance, Tariff Classification & Rapid Port Release',
    description: 'Avoid costly port holds and regulatory penalties. Our team of certified in-house licensed customs brokers navigates import/export compliance across international jurisdictions, ensuring swift processing through automated customs interfaces.',
    features: [
      'Automated US AMS/ISF, EU ENS, and China CCAM manifest filings',
      'Harmonized System (HS) code classification and duty optimization audits',
      'Authorized Economic Operator (AEO) and C-TPAT certified workflows',
      'Duty drawback, free trade zone (FTZ) entry, and ATA Carnet facilitation'
    ],
    specs: 'Compliance Rate: 99.98% | Average Port Release Window: < 4 Hours'
  }
};

function showServiceDetailModal(key) {
  const data = serviceData[key];
  if (!data) return;

  const titleEl = document.getElementById('service-modal-title');
  const subEl = document.getElementById('service-modal-subtitle');
  const descEl = document.getElementById('service-modal-description');
  const featsEl = document.getElementById('service-modal-features');
  const specsEl = document.getElementById('service-modal-specs');

  if (titleEl) titleEl.textContent = data.title;
  if (subEl) subEl.textContent = data.subtitle;
  if (descEl) descEl.textContent = data.description;
  if (specsEl) specsEl.textContent = data.specs;

  if (featsEl) {
    featsEl.innerHTML = data.features.map(f => `
      <li class="flex items-start space-x-2.5 text-sm text-gray-700">
        <span class="text-[#06345B] font-bold">✓</span>
        <span>${f}</span>
      </li>
    `).join('');
  }

  openModal('service-modal');
  initIcons();
}

/* ==========================================================================
   8. FLEET & OPERATIONS TABS
   ========================================================================== */
function initFleetTabs() {
  const tabs = document.querySelectorAll('.fleet-tab-btn');
  const panels = document.querySelectorAll('.fleet-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-tab');

      tabs.forEach(t => {
        t.classList.remove('bg-[#06345B]', 'text-white', 'shadow-sm');
        t.classList.add('bg-white', 'text-gray-600', 'hover:text-[#06345B]');
      });
      tab.classList.add('bg-[#06345B]', 'text-white', 'shadow-sm');
      tab.classList.remove('bg-white', 'text-gray-600');

      panels.forEach(p => {
        if (p.id === targetId) {
          p.classList.remove('hidden');
          p.classList.add('block');
        } else {
          p.classList.add('hidden');
          p.classList.remove('block');
        }
      });
    });
  });
}

/* ==========================================================================
   9. INDUSTRY CARDS INTERACTION
   ========================================================================== */
function initIndustrySlider() {
  const cards = document.querySelectorAll('.industry-interactive-card');
  const prevBtn = document.getElementById('industry-prev');
  const nextBtn = document.getElementById('industry-next');

  let activeIndex = 1; // Default featured card: Manufacturing & Industrial

  function updateFeaturedCard(index) {
    cards.forEach((card, idx) => {
      if (idx === index) {
        card.classList.remove('bg-[#F4F5F6]', 'text-gray-900', 'border-transparent');
        card.classList.add('bg-[#032746]', 'text-white', 'shadow-xl', 'scale-[1.02]');
        
        const badge = card.querySelector('.industry-icon-badge');
        if (badge) {
          badge.classList.remove('bg-white', 'text-gray-900');
          badge.classList.add('bg-white/10', 'text-white', 'border-white/20');
        }

        const desc = card.querySelector('.industry-desc');
        if (desc) {
          desc.classList.remove('text-gray-600');
          desc.classList.add('text-white/80');
        }
      } else {
        card.classList.add('bg-[#F4F5F6]', 'text-gray-900', 'border-transparent');
        card.classList.remove('bg-[#032746]', 'text-white', 'shadow-xl', 'scale-[1.02]');

        const badge = card.querySelector('.industry-icon-badge');
        if (badge) {
          badge.classList.add('bg-white', 'text-gray-900');
          badge.classList.remove('bg-white/10', 'text-white', 'border-white/20');
        }

        const desc = card.querySelector('.industry-desc');
        if (desc) {
          desc.classList.add('text-gray-600');
          desc.classList.remove('text-white/80');
        }
      }
    });
  }

  cards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      activeIndex = idx;
      updateFeaturedCard(activeIndex);
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      activeIndex = (activeIndex - 1 + cards.length) % cards.length;
      updateFeaturedCard(activeIndex);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      activeIndex = (activeIndex + 1) % cards.length;
      updateFeaturedCard(activeIndex);
    });
  }

  updateFeaturedCard(activeIndex);
}

/* ==========================================================================
   10. LIVE SENSOR / TELEMETRY TICKER
   ========================================================================== */
function initLiveTelemetrySimulation() {
  const tempDisplay = document.getElementById('telemetry-temp');
  const speedDisplay = document.getElementById('telemetry-speed');

  if (tempDisplay || speedDisplay) {
    setInterval(() => {
      if (tempDisplay) {
        const val = (4.1 + (Math.random() * 0.4 - 0.2)).toFixed(1);
        tempDisplay.textContent = `+${val}°C`;
      }
      if (speedDisplay) {
        const speed = (21.3 + (Math.random() * 0.4 - 0.2)).toFixed(1);
        speedDisplay.textContent = `${speed} KTS`;
      }
    }, 3500);
  }
}
