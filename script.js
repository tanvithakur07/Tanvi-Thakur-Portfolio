/* =========================================================
   TANVI — FASHION & LIFESTYLE CREATOR PORTFOLIO
   Vanilla JS — navigation, filtering, reveal animation, form
   ========================================================= */

/* ---------------------------------------------------------
   01 — FEATURED REELS & POSTS
   Real Instagram links only. Type ("reel"/"post") is
   detected automatically from the URL — no data invented.
   To add or remove links, edit this array only.
--------------------------------------------------------- */
const FEATURED_URLS = [
  "https://www.instagram.com/reel/Dc0yruUM9pI/",
  "https://www.instagram.com/reel/Db-Mf96MJJe/",
  "https://www.instagram.com/reel/DbutACFMG7-/",
  "https://www.instagram.com/reel/DakDxGDsiEY/",
  "https://www.instagram.com/reel/Da18h7IMU6Y/",
  "https://www.instagram.com/reel/DYgqNzdsU3t/",
  "https://www.instagram.com/reel/DYPm_-esqut/",
  "https://www.instagram.com/reel/DYZlfkYMgDQ/",
  "https://www.instagram.com/reel/DXq179jjK5M/",
  "https://www.instagram.com/reel/DU46DCQDOhE/",
  "https://www.instagram.com/reel/DTX1qvxDDmN/",
  "https://www.instagram.com/p/DPhVYdqE20h/?img_index=1",
  "https://www.instagram.com/p/DLz5kX0oZPa/?img_index=1",
  "https://www.instagram.com/p/Db3PYpaDN4Q/?img_index=1",
  "https://www.instagram.com/p/DbSUaA5DLi0/?img_index=1",
  "https://www.instagram.com/p/DYMJnbTDBkp/?img_index=1",
  "https://www.instagram.com/p/DWHNF0xjJlN/?img_index=1",
  "https://www.instagram.com/p/DVGqY-iDAWz/?img_index=1",
  "https://www.instagram.com/p/DOQykftDGge/?img_index=1",
  "https://www.instagram.com/p/DMDQF-joqOE/?img_index=1",
  "https://www.instagram.com/p/DMdAS3WINOS/?img_index=1",
  "https://www.instagram.com/p/DM2ssSoIY1G/?img_index=1"
];

const FEATURED_ITEMS = FEATURED_URLS.map(url => ({
  url,
  type: url.includes("/reel/") ? "Reel" : "Post"
}));

/* Preview media available for hover on Featured cards.
   Reel links hover-play their matching uploaded reel video.
   Post links hover-reveal their matching uploaded post image. */
const REEL_PREVIEWS = [
  "images/reel-01.mp4",
  "images/reel-02.mp4",
  "images/reel-03.mp4",
  "images/reel-04.mp4",
  "images/reel-05.mp4",
  "images/reel-06.mp4",
  "images/reel-07.mp4",
  "images/reel-08.mp4",
  "images/reel-09.mp4",
  "images/reel-10.mp4",
  "images/reel-11.mp4"
];

const POST_PREVIEWS = [
  "images/post-01.jpg",
  "images/post-02.jpg",
  "images/post-03.jpg",
  "images/post-04.jpg",
  "images/post-05.jpg",
  "images/post-06.jpg",
  "images/post-07.jpg",
  "images/post-08.jpg",
  "images/post-09.jpg",
  "images/post-10.jpg",
  "images/post-11.jpg"
];

let previewCursor = 0;
let postPreviewCursor = 0;
FEATURED_ITEMS.forEach(item => {
  if (item.type === "Reel"){
    item.previewSrc = REEL_PREVIEWS[previewCursor % REEL_PREVIEWS.length];
    previewCursor++;
  } else if (item.type === "Post"){
    item.previewImg = POST_PREVIEWS[postPreviewCursor % POST_PREVIEWS.length];
    postPreviewCursor++;
  }
});

/* ---------------------------------------------------------
   02 — PORTFOLIO GALLERY removed
--------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  initNavbarScrollState();
  initMobileMenu();
  initSmoothScroll();
  initActiveNavLink();
  renderFeatured();
  initAboutScrollPlay();
  initScrollReveal();
  initBackToTop();
  initContactForm();
});

/* ---------------------------------------------------------
   NAVBAR: solid background after scrolling past hero
--------------------------------------------------------- */
function initNavbarScrollState(){
  const navbar = document.getElementById("navbar");
  const progress = document.getElementById("scrollProgress");

  const onScroll = () => {
    const scrolled = window.scrollY;
    navbar.classList.toggle("solid", scrolled > 60);

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrolled / docHeight) * 100 : 0;
    progress.style.width = pct + "%";
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ---------------------------------------------------------
   MOBILE MENU
--------------------------------------------------------- */
function initMobileMenu(){
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("mobileMenu");

  const closeMenu = () => {
    toggle.classList.remove("open");
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    toggle.classList.toggle("open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  document.querySelectorAll("[data-nav-mobile]").forEach(link => {
    link.addEventListener("click", closeMenu);
  });
}

/* ---------------------------------------------------------
   SMOOTH SCROLL for in-page anchor links
--------------------------------------------------------- */
function initSmoothScroll(){
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const navHeight = document.getElementById("navbar").offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - (navHeight - 10);
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
}

/* ---------------------------------------------------------
   ACTIVE NAV LINK on scroll (IntersectionObserver)
--------------------------------------------------------- */
function initActiveNavLink(){
  const sections = ["home", "about", "content", "services", "contact"]
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const navLinks = document.querySelectorAll("[data-nav]");

  const setActive = (id) => {
    navLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === "#" + id);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        setActive(entry.target.id);
      }
    });
  }, { rootMargin: "-45% 0px -45% 0px", threshold: 0 });

  sections.forEach(section => observer.observe(section));
}

/* ---------------------------------------------------------
   RENDER 01 — FEATURED REELS & POSTS
   Each card links out to the exact Instagram URL provided.
   No embedding is attempted (Instagram embeds require their
   external script and a live network connection, which this
   static site can't rely on) — instead each card is an
   elegant, on-brand fallback card, never a broken iframe.
--------------------------------------------------------- */
function renderFeatured(){
  const grid = document.getElementById("featuredGrid");
  if (!grid) return;

  const igIcon = `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" stroke-width="1.4"/>
      <circle cx="12" cy="12" r="4.4" stroke="currentColor" stroke-width="1.4"/>
      <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor"/>
    </svg>`;

  const markup = FEATURED_ITEMS.map((item, i) => `
    <a class="featured-card show ${item.previewSrc ? "has-video" : ""} ${item.previewImg ? "has-image" : ""}" href="${item.url}" target="_blank" rel="noopener" style="transition-delay:${(i % 12) * 0.03}s">
      ${item.previewSrc ? `
        <video
          class="featured-video"
          src="${item.previewSrc}"
          muted
          loop
          playsinline
          preload="metadata">
        </video>
      ` : ""}
      ${item.previewImg ? `
        <img
          class="featured-image"
          src="${item.previewImg}"
          alt=""
          loading="lazy"
          onerror="this.closest('.featured-card').classList.remove('has-image')">
      ` : ""}
      <div class="featured-card-inner">
        <div class="featured-top">
          <span class="featured-type">${item.type}</span>
          <span class="featured-ig-icon" aria-hidden="true">${igIcon}</span>
        </div>
        ${item.previewSrc || item.previewImg ? "" : `<span class="featured-mark" aria-hidden="true">Tanvi</span>`}
        <div class="featured-bottom">View on Instagram</div>
      </div>
    </a>
  `).join("");

  grid.innerHTML = markup;
  initFeaturedHoverPlay();
}

/* ---------------------------------------------------------
   FEATURED CARD HOVER-TO-PLAY
   Plays the muted preview video on hover/focus (desktop) and
   on touch for mobile, mirroring the gallery behaviour.
--------------------------------------------------------- */
function initFeaturedHoverPlay(){
  const cards = document.querySelectorAll("#featuredGrid .featured-card");

  cards.forEach(card => {
    const video = card.querySelector(".featured-video");
    if (!video) return;

    const play = () => { video.currentTime = 0; video.play().catch(() => {}); };
    const pause = () => { video.pause(); };

    card.addEventListener("mouseenter", play);
    card.addEventListener("mouseleave", pause);
    card.addEventListener("touchstart", play, { passive: true });
  });
}

/* ---------------------------------------------------------
   ABOUT SECTION — AUTOPLAY ON SCROLL
   Plays the about video automatically once it's centred in
   the viewport, and pauses it the moment the section scrolls
   out of view (either upward or downward).
--------------------------------------------------------- */
function initAboutScrollPlay(){
  const video = document.getElementById("aboutVideo");
  if (!video) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.5 });

  observer.observe(video);
}

/* ---------------------------------------------------------
   SCROLL REVEAL (fade-up on scroll)
--------------------------------------------------------- */
function initScrollReveal(){
  const targets = document.querySelectorAll("[data-reveal]");
  if (!("IntersectionObserver" in window)){
    targets.forEach(t => t.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

  targets.forEach(t => observer.observe(t));
}

/* ---------------------------------------------------------
   BACK TO TOP BUTTON
--------------------------------------------------------- */
function initBackToTop(){
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.classList.toggle("show", window.scrollY > 800);
  }, { passive: true });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ---------------------------------------------------------
   CONTACT FORM
   No backend exists — show a friendly message instead
   of pretending the form was submitted anywhere.
--------------------------------------------------------- */
function initContactForm(){
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!form.checkValidity()){
      note.textContent = "Please fill in your name, email and message.";
      note.style.color = "var(--burgundy)";
      return;
    }

    note.textContent = "Thanks! Please connect with me through Instagram or email to continue the conversation.";
    note.style.color = "var(--burgundy)";
    form.reset();
  });
}