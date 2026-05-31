/* ==========================================================================
   Design DNA Script File - inspired by tejasvisurya.in
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Sticky Navbar transparency change on scroll
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check on load


  // 2. Mobile Drawer Navigation Toggle
  const hamburger = document.getElementById('hamburger');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerClose = document.getElementById('drawer-close');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const drawerLinks = document.querySelectorAll('.drawer-link, .btn-cta-drawer');

  const openDrawer = () => {
    mobileDrawer.classList.add('open');
    drawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden'; // prevent bg scroll
  };

  const closeDrawer = () => {
    mobileDrawer.classList.remove('open');
    drawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', openDrawer);
  drawerClose.addEventListener('click', closeDrawer);
  drawerBackdrop.addEventListener('click', closeDrawer);
  drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));


  // 3. Scroll Reveal Animations (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal-fade');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // only reveal once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // 4. Key Issues Section Carousel (handles 4 slides)
  const issuesSlides = document.querySelectorAll('#issues-carousel .carousel-slide');
  const issuesPrevBtn = document.getElementById('issues-prev');
  const issuesNextBtn = document.getElementById('issues-next');
  let currentIssueIndex = 0;

  const showIssueSlide = (index) => {
    issuesSlides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });
  };

  issuesPrevBtn.addEventListener('click', () => {
    currentIssueIndex = (currentIssueIndex - 1 + issuesSlides.length) % issuesSlides.length;
    showIssueSlide(currentIssueIndex);
  });

  issuesNextBtn.addEventListener('click', () => {
    currentIssueIndex = (currentIssueIndex + 1) % issuesSlides.length;
    showIssueSlide(currentIssueIndex);
  });


  // 5. Testimonial Quote Slider (with dots pagination)
  const quoteSlides = document.querySelectorAll('#quote-carousel .quote-slide');
  const paginationDots = document.querySelectorAll('#quote-pagination .dot');
  let currentQuoteIndex = 0;

  const showQuoteSlide = (index) => {
    quoteSlides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('active');
        paginationDots[i].classList.add('active');
      } else {
        slide.classList.remove('active');
        paginationDots[i].classList.remove('active');
      }
    });
  };

  paginationDots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      currentQuoteIndex = parseInt(e.target.getAttribute('data-index'));
      showQuoteSlide(currentQuoteIndex);
    });
  });

  // Auto rotate testimonials every 6 seconds
  setInterval(() => {
    currentQuoteIndex = (currentQuoteIndex + 1) % quoteSlides.length;
    showQuoteSlide(currentQuoteIndex);
  }, 6000);


  // 6. Initiatives Multi-Card Carousel
  const initiativesTrack = document.querySelector('#initiatives-carousel .multi-carousel-track');
  const initiativeCards = document.querySelectorAll('#initiatives-carousel .initiative-card');
  const initiativesPrev = document.getElementById('multi-prev');
  const initiativesNext = document.getElementById('multi-next');
  let carouselPosition = 0;

  const getCardsPerView = () => {
    const width = window.innerWidth;
    if (width <= 576) return 1;
    if (width <= 992) return 2;
    return 3;
  };

  const updateCarouselLayout = () => {
    const cardsPerView = getCardsPerView();
    const totalCards = initiativeCards.length;
    const maxIndex = Math.max(0, totalCards - cardsPerView);
    
    // Cap position if layout size changes
    if (carouselPosition > maxIndex) {
      carouselPosition = maxIndex;
    }

    const cardWidth = initiativeCards[0].getBoundingClientRect().width;
    const gap = 24; // matches styles.css grid gap
    const shift = carouselPosition * (cardWidth + gap);
    initiativesTrack.style.transform = `translateX(-${shift}px)`;
  };

  initiativesNext.addEventListener('click', () => {
    const cardsPerView = getCardsPerView();
    const maxIndex = initiativeCards.length - cardsPerView;
    if (carouselPosition < maxIndex) {
      carouselPosition++;
      updateCarouselLayout();
    } else {
      // Loop back to start
      carouselPosition = 0;
      updateCarouselLayout();
    }
  });

  initiativesPrev.addEventListener('click', () => {
    if (carouselPosition > 0) {
      carouselPosition--;
      updateCarouselLayout();
    } else {
      // Loop to end
      const cardsPerView = getCardsPerView();
      carouselPosition = Math.max(0, initiativeCards.length - cardsPerView);
      updateCarouselLayout();
    }
  });

  // Track window resize to recompute card sizing
  window.addEventListener('resize', updateCarouselLayout);


  // 7. Interactive Welfare Schemes Finder (Customized for Kundapura Cashew & Agriculture)
  const schemesInput = document.getElementById('schemes-input');
  const schemesSearchBtn = document.getElementById('schemes-search-btn');
  const schemesResults = document.getElementById('schemes-results');

  const mockSchemes = [
    { title: 'Karnataka Cashew Industry Welfare Board Fund', cat: 'cashew', desc: 'Medical subsidies and interest-free startup capital for cashew factory laborers.' },
    { title: 'Varahi Canal Phase III Farmer Subsidy', cat: 'agriculture', desc: 'Direct financial incentives for installing high-efficiency drip systems in crop fields.' },
    { title: 'Halady Srinivas Shetty Memorial Scholarship', cat: 'student', desc: 'Post-matriculation tuition subsidies for high-scoring students from agricultural families.' },
    { title: 'Cooperative Banking Agri-Credit Waiver', cat: 'cooperative', desc: 'Partial interest-rate waiver program for short-term agricultural loans in Udupi district.' },
    { title: 'Pandeshwar Grama Panchayat Health Shield', cat: 'healthcare', desc: 'Free annual physical screenings and telemedicine cards for rural local body residents.' }
  ];

  const performSchemesSearch = () => {
    const query = schemesInput.value.toLowerCase().trim();
    if (!query) {
      schemesResults.innerHTML = `
        <div style="padding: 16px; opacity: 0.6; font-size: 0.9rem; text-align: center;">
          Please type a keyword (e.g. "cashew", "farmer", "scholarship") to search.
        </div>
      `;
      return;
    }

    const filtered = mockSchemes.filter(scheme => 
      scheme.title.toLowerCase().includes(query) || 
      scheme.cat.toLowerCase().includes(query) ||
      scheme.desc.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
      schemesResults.innerHTML = `
        <div style="padding: 16px; opacity: 0.6; font-size: 0.9rem; text-align: center;">
          No matching welfare schemes found for Kundapura. Try searching for "cashew" or "farmer".
        </div>
      `;
    } else {
      schemesResults.innerHTML = filtered.map(scheme => `
        <div class="scheme-result-item">
          <div>
            <h5>${scheme.title}</h5>
            <p>${scheme.desc}</p>
          </div>
          <span style="font-size: 0.7rem; font-weight: 700; background: var(--color-saffron-light); color: var(--color-saffron-dark); padding: 4px 8px; border-radius: 12px; text-transform: uppercase;">
            ${scheme.cat}
          </span>
        </div>
      `).join('');
    }
  };

  schemesSearchBtn.addEventListener('click', performSchemesSearch);
  schemesInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      performSchemesSearch();
    }
  });

});
