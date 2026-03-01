// ── Lenis smooth scroll ──────────────────────────
const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);
gsap.ticker.lagSmoothing(0);

// ── Three.js setup ───────────────────────────────
const scene    = new THREE.Scene();
const camera   = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setClearColor(0x000000, 0);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const modelContainer = document.querySelector(".model");
modelContainer.style.zIndex = "100";
modelContainer.appendChild(renderer.domElement);
renderer.domElement.style.position = 'absolute';
renderer.domElement.style.top = '0';
renderer.domElement.style.left = '0';
renderer.domElement.style.zIndex = '9999';
renderer.domElement.style.pointerEvents = 'none';

// ── Lighting ─────────────────────────────────────
const ambientLight = new THREE.AmbientLight(0xffffff, 1.15);
scene.add(ambientLight);

// ── Star primitive ────────────────────────────────
function createStarShape(outerR, innerR, points) {
  const shape = new THREE.Shape();
  for (let i = 0; i < points * 2; i++) {
    const angle  = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
    const radius = i % 2 === 0 ? outerR : innerR;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    i === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y);
  }
  shape.closePath();
  return shape;
}

const starGeo = new THREE.ExtrudeGeometry(createStarShape(0.18, 0.08, 5), {
  depth: 0,
  bevelEnabled: true,
  bevelThickness: 0.02,
  bevelSize: 0.02,
  bevelSegments: 4,
});

const starMat = new THREE.MeshStandardMaterial({
  color: 0xc8d8e8,
  metalness: 0.2,
  roughness: 0.6,
  emissive: 0xc8d8e8,
  emissiveIntensity: 0.15,
});

const model = new THREE.Mesh(starGeo, starMat);
model.rotation.set(Math.PI * 2.224, -Math.PI * 1.25, -Math.PI * 8);
model.scale.set(1, 1, 1);
scene.add(model);

camera.position.z = 1.2;

// ── Scroll tracking ───────────────────────────────
let currentScroll = 0;
lenis.on("scroll", (e) => { currentScroll = e.scroll; });

// ── Animate ───────────────────────────────────────
function animate() {
  if (model) {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = Math.min(currentScroll / maxScroll, 1);

    const swayAmplitude = 0.8;
    const swayFrequency = 3;
    const startY = 0.6;
    const endY   = -0.6;

    const y = startY + (endY - startY) * scrollProgress;

    model.rotation.x = (scrollProgress * Math.PI * 6) - Math.PI * 2;
    model.rotation.y = Math.PI * 5;

    const responsiveAmplitude = (window.innerWidth / 1000) * swayAmplitude;
    const x = Math.sin(scrollProgress * Math.PI * swayFrequency) * responsiveAmplitude;
    model.position.set(x, y, model.position.z);
    model.rotation.z = Math.sin(scrollProgress * Math.PI * swayFrequency) * 0.3 + Math.PI;
  }

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

// ── Resize ────────────────────────────────────────
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});