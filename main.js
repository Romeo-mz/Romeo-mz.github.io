/* main.js — IntersectionObserver scroll reveal + nav scroll state */
(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Scroll reveal: add .visible to .reveal elements when they enter viewport */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length && !prefersReduced && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    /* Fallback: show everything immediately */
    reveals.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* Nav scroll state: add border shadow when scrolled past top */
  var nav = document.querySelector('.page-header');
  if (nav && 'IntersectionObserver' in window) {
    var sentinel = document.createElement('div');
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:1px;pointer-events:none;';
    document.body.prepend(sentinel);

    var navObserver = new IntersectionObserver(function (entries) {
      nav.classList.toggle('scrolled', !entries[0].isIntersecting);
    });
    navObserver.observe(sentinel);
  }

  /* Change highlight color */
    var root = document.documentElement;
    var hue = 340;
    function animateHue() {
      hue = (hue + 1) % 360;
      root.style.setProperty('--changing-color', 'hsl(' + hue + 'deg, 80%, 70%)');
      requestAnimationFrame(animateHue);
    }
    requestAnimationFrame(animateHue);
  }
)();
