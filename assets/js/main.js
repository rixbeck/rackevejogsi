(function() {
  "use strict";

  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader) return;
    window.scrollY > 80 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  const navMenuContainer = document.querySelector('#navmenu');
  const body = document.querySelector('body');

  function mobileNavToggle() {
    body.classList.toggle('mobile-nav-active');
    
    if (mobileNavToggleBtn) {
      if (body.classList.contains('mobile-nav-active')) {
        mobileNavToggleBtn.classList.remove('bi-list');
        mobileNavToggleBtn.classList.add('bi-x-lg');
      } else {
        mobileNavToggleBtn.classList.remove('bi-x-lg');
        mobileNavToggleBtn.classList.add('bi-list');
      }
    }
  }

  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      mobileNavToggle();
    });
  }

  document.querySelectorAll('#navmenu a').forEach(navLink => {
    navLink.addEventListener('click', () => {
      if (body.classList.contains('mobile-nav-active')) {
        mobileNavToggle();
      }
    });
  });

  if (navMenuContainer) {
    navMenuContainer.addEventListener('click', function(e) {
      if (e.target === navMenuContainer && body.classList.contains('mobile-nav-active')) {
        mobileNavToggle();
      }
    });
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && body.classList.contains('mobile-nav-active')) {
      mobileNavToggle();
    }
  });

  function aosInit() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        mirror: false
      });
      AOS.refresh();
    }
  }

  const preloader = document.querySelector('#preloader');
  const speedoCount = document.querySelector('#speedo-count');

  if (preloader) {
    let currentSpeed = 0;
    const targetSpeed = 100;
    const duration = 600; 
    const intervalTime = 20;
    const step = targetSpeed / (duration / intervalTime);

    const counterInterval = setInterval(() => {
      currentSpeed += step;
      if (currentSpeed >= targetSpeed) {
        currentSpeed = targetSpeed;
        clearInterval(counterInterval);
        if (speedoCount) speedoCount.textContent = Math.round(currentSpeed);

        setTimeout(() => {
          preloader.classList.add('loaded');
          
          aosInit();

          setTimeout(() => {
            preloader.remove();
          }, 700);
        }, 300);
      } else {
        if (speedoCount) speedoCount.textContent = Math.round(currentSpeed);
      }
    }, intervalTime);
  } else {
    
    window.addEventListener('load', aosInit);
  }

  const scrollTop = document.querySelector('.scroll-top');
  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 150 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  if (typeof GLightbox !== 'undefined') {
    GLightbox({
      selector: '.glightbox'
    });
  }

  function initSwiper() {
    if (typeof Swiper === 'undefined') return;
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let configElement = swiperElement.querySelector(".swiper-config");
      if (configElement) {
        let config = JSON.parse(configElement.innerHTML.trim());
        new Swiper(swiperElement, config);
      }
    });
  }
  window.addEventListener("load", initSwiper);

  const navmenulinks = document.querySelectorAll('.navmenu a');
  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    });
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();