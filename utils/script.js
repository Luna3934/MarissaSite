// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {

  // ── 1. Hero Constellation Animation ────────────
  document.querySelectorAll(".constellation line").forEach(line => {
    const length = line.getTotalLength();
    line.style.strokeDasharray = length;
    line.style.strokeDashoffset = length;
  });

  const tl = gsap.timeline();

  tl.to(".constellation circle", {
    opacity: 1,
    duration: 0.4,
    stagger: 0.15,
    ease: "power2.out"
  });

  tl.to(".constellation line", {
    strokeDashoffset: 0,
    duration: 0.9,
    stagger: 0.2,
    ease: "power2.inOut"
  });

  tl.to(".constellation", {
    x: "-10vw",
    duration: 1.1,
    ease: "power2.inOut"
  });

  gsap.set(".hero-text", { opacity: 0, x: 40 });
  tl.to(".hero-text", {
    opacity: 1,
    x: 0,
    duration: 1,
    ease: "power2.out"
  }, "-=0.7")
  .add(updateHeroTextOffset);

  // ── 2. AOS Init ────────────────────────────────
  AOS.init({
    offset: 400,
    duration: 600,
    once: false,
  });

  // ── 3. Skills scroll animation ─────────────────
  gsap.from(".skill-circle", {
    opacity: 0,
    y: 30,
    scale: 0.85,
    duration: 0.5,
    stagger: 0.1,
    ease: "back.out(1.4)",
    clearProps: "all",
    scrollTrigger: {
      trigger: "#skills",
      start: "top 75%",
      toggleActions: "play none none none",
    }
  });

});

// ── Responsive Hero Text Offset ──────────────────
function updateHeroTextOffset() {
  const vw = window.innerWidth;
  const x = vw > 1500 ? 380 : vw > 1100 ? 280 : vw > 650 ? 180 : 0;
  gsap.to(".hero-text", { x, duration: 0.5, ease: "power2.out" });
}
window.addEventListener("resize", updateHeroTextOffset);