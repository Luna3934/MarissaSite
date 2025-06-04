const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isLight = body.classList.toggle("light-side");
    themeToggle.textContent = isLight ? "☀️" : "🌙";
  });
}







const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
  

gsap.ticker.lagSmoothing(0);

const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xfefdfd);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
});

renderer.setClearColor(0x000000,0);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = false;
renderer.physicallyCorrectLights = false;
renderer.tonMapping = THREE.ACESFilmisToneMapping;
renderer.toneMappingExposure = 2.5;
document.querySelector(".model").appendChild(renderer.domElement);
const modelContainer = document.querySelector(".model");
modelContainer.style.zIndex = "100";
renderer.domElement.style.position = 'absolute';
renderer.domElement.style.top = '0';
renderer.domElement.style.left = '0';
renderer.domElement.style.zIndex = '9999';
renderer.domElement.style.pointerEvents = 'none';


const ambientLight = new THREE.AmbientLight(0xffffff,1);
scene.add(ambientLight);

const mainLight = new THREE.DirectionalLight(0xffffff,1);
mainLight.position.set(5,10,7.5);
// scene.add(mainLight);

const fillLight = new THREE.DirectionalLight(0xffffff,1);
fillLight.position.set(-5,0,-5);
// scene.add(fillLight);

const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
hemiLight.position.set(0,25,0);
scene.add(hemiLight);


let model;
const loader = new THREE.GLTFLoader();
loader.load("./models/red leaf.glb", function (gltf) {
    model = gltf.scene;
    model.traverse((node) => {
        if(node.isMesh) {
            if(node.material) {
                node.material.metalness = 0.3;
                node.material.roughness = 0.4;
                node.material.envMapIntensity = 1.5;
            }
        }
        node.castShadow = true;
        node.receiveShadow = true;
    });
    const box = new THREE.Box3().setFromObject(model);
    
    model.rotation.set(Math.PI*2.224, -Math.PI*1.25, -Math.PI*8);
    




    scene.add(model);

    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x,size.y,size.z);
    camera.position.z = maxDim;

    model.scale.set(.5, .5, .5);

    // playInitialAnimation();

    animate();


});

const floatAmplitude = 0.2;
const floatSpeed = 1.5;
const rotationSpeed = 0.3;
let isFloating = true;
let currentScroll = 0;




function playInitialAnimation() {
    if (model) {
        gsap.to(model.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 3,
            ease: "power2.out", 
        })
    }
}



lenis.on("scroll", (e) => {
    currentScroll = e.scroll;
});

let clock = new THREE.Clock();



function animate() {
    if (model) {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = Math.min(currentScroll / maxScroll, 1);

        // Swooping motion
        const fallDistance = 2; // total vertical drop range
        const swayAmplitude = 1.5; // side-to-side distance
        const swayFrequency = 3;   // how many sways over full scroll

        const startY = 1.15;       // starting height (on screen)
        const endY = -2.5;      // ending height (offscreen below)


        const y = startY + (endY - startY) * scrollProgress;  // interpolated fall
        const x = Math.sin(scrollProgress * Math.PI * swayFrequency) * swayAmplitude;


        // Set position: swooping fall

        model.rotation.x = (scrollProgress * Math.PI * 6) - Math.PI*2;
        model.rotation.y = Math.PI*5;

        model.position.set(x, y, model.position.z);
        model.rotation.z = Math.sin(scrollProgress * Math.PI * swayFrequency) * 0.3;

        const responsiveAmplitude = (window.innerWidth / 1000) * swayAmplitude;
        const xNew = Math.sin(scrollProgress * Math.PI * swayFrequency) * responsiveAmplitude;
        model.position.x = xNew;


    }

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}


window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
  });
  