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


// const grid = document.getElementById("grid");

//   // Create 8x8 = 64 squares
//   for (let i = 0; i < 64; i++) {
//     const cell = document.createElement("div");
//     grid.appendChild(cell);
//   }

//   const cells = grid.querySelectorAll("div");

//   gsap.to(cells, {
//     opacity: 1,
//     stagger: {
//       each: 0.03,
//       from: "start",
//       grid: [8, 8]
//     },
//     ease: "power2.out",
//     duration: 0.6
//   });

function updateHeroTextOffset() {
  const vw = window.innerWidth;
  let x;

  if (vw > 1500) {
    x = 400;
  } else if (vw > 1100) {
    x = 300;
  } else if (vw > 650) {
    x = 200;
  } else {
    x = 0; // fully center for mobile
  }

  gsap.to(".hero-text", {
    x: x,
    duration: 0.5,
    ease: "power2.out"
  });
}

window.addEventListener("resize", updateHeroTextOffset);
updateHeroTextOffset();



// Step 1: Set up stroke dash offset for lines
document.querySelectorAll(".constellation line").forEach(line => {
  const length = line.getTotalLength();
  line.style.strokeDasharray = length;
  line.style.strokeDashoffset = length;
});

// Step 2: Make sure hero text starts hidden (you can also do this in CSS)
gsap.set(".hero-text", { opacity: 0, x: 50 });

// Step 3: Create timeline for animation sequence
const tl = gsap.timeline();

// 1. Animate circles (stars)
tl.to(".constellation circle", {
  opacity: 1,
  duration: 0.5,
  stagger: 0.2,
  ease: "power2.out"
})

// 2. Animate constellation lines
.to(".constellation line", {
  strokeDashoffset: 0,
  duration: 1,
  stagger: 0.3,
  ease: "power2.inOut"
})

// 3. Move constellation to the left
.to(".constellation", {
  x: "-10vw", // adjust this depending on your layout
  duration: 1.2,
  ease: "power2.inOut"
})

.add(updateHeroTextOffset)
// 4. Fade in and slide in hero text
.to(".hero-text", {
  opacity: 1,
  x: 350,
  duration: 1.2,
  ease: "power2.out"
}, "-=0.8") // slightly overlap with the constellation slide

.add(updateHeroTextOffset);



