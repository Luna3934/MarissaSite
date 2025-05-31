// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// ------------------------------
// 1. Hero Intro Animation Setup
// ------------------------------
document.addEventListener("DOMContentLoaded", () => {
  // Animate Hero Stars and Lines
  const tl = gsap.timeline();

  // Animate constellation stars
  tl.to(".constellation circle", {
    opacity: 1,
    duration: 0.5,
    stagger: 0.2,
    ease: "power2.out"
  });

  // Animate constellation lines
  tl.to(".constellation line", {
    strokeDashoffset: 0,
    duration: 1,
    stagger: 0.3,
    ease: "power2.inOut"
  });

  // Slide constellation left
  tl.to(".constellation", {
    x: "-10vw",
    duration: 1.2,
    ease: "power2.inOut"
  });

  // Reveal hero text
  gsap.set(".hero-text", { opacity: 0, x: 50 }); // Ensure starts hidden
  tl.to(".hero-text", {
    opacity: 1,
    x: 0,
    duration: 1.2,
    ease: "power2.out"
  }, "-=0.8") // Overlap timing slightly

  .add(updateHeroTextOffset); // Initial positioning
});

// ------------------------------
// 2. Responsive Hero Text Offset
// ------------------------------
function updateHeroTextOffset() {
  const vw = window.innerWidth;
  const x = vw > 1500 ? 400 : vw > 1100 ? 300 : vw > 650 ? 200 : 0;

  gsap.to(".hero-text", {
    x: x,
    duration: 0.5,
    ease: "power2.out"
  });
}

window.addEventListener("resize", updateHeroTextOffset);

// ------------------------------
// 3. Parallax Mouse Movement
// ------------------------------
document.addEventListener("mousemove", function (event) {
  document.querySelectorAll(".parallax-wrap span").forEach((shift) => {
    const pos = shift.getAttribute("value");
    const x = (window.innerWidth - event.pageX * pos) / 120;
    const y = (window.innerHeight - event.pageY * pos) / 120;
    shift.style.transform = `translateX(${x}px) translateY(${y}px)`;
  });
});

// ------------------------------
// 4. AOS + Typed.js Init
// ------------------------------
document.addEventListener("DOMContentLoaded", () => {
  AOS.init();

  new Typed('#typed-text', {
    strings: ["Software Developer.", "Problem Solver.", "Innovator."],
    typeSpeed: 60,
    backSpeed: 30,
    loop: true
  });
});

// ------------------------------
// 5. Profile Hover Animation
// ------------------------------
const profile = document.querySelector(".profile-pic");
if (profile) {
  profile.addEventListener("mouseenter", () => {
    gsap.to([".name-title", ".work-title", ".atm-pic"], {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: "power2.inOut"
    });
  });

  profile.addEventListener("mouseleave", () => {
    gsap.to(".name-title", { x: 120, y: -80 });
    gsap.to(".work-title", { x: -140, y: 100 });
    gsap.to(".atm-pic", { x: -150, y: -100 });
  });
}

// ------------------------------
// 6. Dark Mode Toggle
// ------------------------------
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isLight = body.classList.toggle("light-side");
    themeToggle.textContent = isLight ? "☀️" : "🌙";
  });
}


// ------------------------------
// 7. Sunrise Overlay Scroll Fade
// ------------------------------
gsap.to(".sunrise-overlay", {
  opacity: 1,
  scrollTrigger: {
    trigger: ".sky-fade-transition",
    start: "top bottom",
    end: "top center",
    scrub: true
  }
});

// ------------------------------
// 8. Setup Constellation Line Dash
// ------------------------------
document.querySelectorAll(".constellation line").forEach(line => {
  const length = line.getTotalLength();
  line.style.strokeDasharray = length;
  line.style.strokeDashoffset = length;
});
