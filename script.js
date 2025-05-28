// GSAP Scroll Animations
gsap.registerPlugin(ScrollTrigger);

// Fade-in animations for home section
gsap.from(".profile-pic", { duration: 1, opacity: 0, x: -50 });
gsap.from(".home-text h1", { duration: 1, opacity: 0, x: 50 });
gsap.from(".home-text p", { duration: 1, opacity: 0, x: 50, stagger: 0.3 });

// gsap.to(".skill-circle", {
//     opacity: 1,
//     y: 0,
//     duration: 1,
//     stagger: 0.2,
//     scrollTrigger: {
//         trigger: ".skills-container",
//         start: "top 80%",
//     }
// });

// Dark Mode Toggle
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

document.addEventListener("DOMContentLoaded", function () {
AOS.init();

new Typed('#typed-text', {
    strings: ["Software Developer.", "Problem Solver.", "Innovator."],
    typeSpeed: 60,
    backSpeed: 30,
    loop: true
});
});



document.addEventListener("mousemove", parallax);
function parallax(event) {
  this.querySelectorAll(".parallax-wrap span").forEach((shift) => {
    const position = shift.getAttribute("value");
    const x = (window.innerWidth - event.pageX * position) / 120;
    const y = (window.innerHeight - event.pageY * position) / 120;

    shift.style.transform = `translateX(${x}px) translateY(${y}px)`;
  });
}

  
  
  
//   document.addEventListener("DOMContentLoaded", function () {
//   AOS.init();
//   new Typed('#typed-text', {
//     strings: ["Software Developer.", "Problem Solver.", "Innovator."],
//     typeSpeed: 60,
//     backSpeed: 30,
//     loop: true
//   });

//   new Rellax('.layer');
// });


window.addEventListener("DOMContentLoaded", () => {
    const tl = gsap.timeline({ defaults: { duration: 1, ease: "back.out(1.7)" } });
  
    tl.from(".name-title", {
      opacity: 0,
      scale: 0.2,
      x: -30,
      y: 0
    })
    .from(".work-title", {
      opacity: 0,
      scale: 0.2,
      x: 30,
      y: 0
    }, "-=0.8")
    .from(".atm-pic", {
      opacity: 0,
      scale: 0.2,
      y: -30
    }, "-=0.8");
  });
  

  

  const profile = document.querySelector(".profile-pic");
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


