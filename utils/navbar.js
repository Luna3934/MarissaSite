
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Apply saved theme on page load (default is dark mode)
const savedTheme = localStorage.getItem("theme");
const isLight = savedTheme === "light";

if (isLight) {
  body.classList.add("light-side");
  if (themeToggle) themeToggle.textContent = "☀️";
} else {
  body.classList.remove("light-side");
  if (themeToggle) themeToggle.textContent = "🌙";
}

// Toggle theme on click
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isNowLight = body.classList.toggle("light-side");
    localStorage.setItem("theme", isNowLight ? "light" : "dark");
    themeToggle.textContent = isNowLight ? "☀️" : "🌙";
  });
}



const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("main-nav");

menuToggle.addEventListener("click", (e) => {
  e.stopPropagation(); // Prevent this click from bubbling to the document
  navMenu.classList.toggle("hidden");
  menuToggle.classList.toggle("hidden");
});

// Close the menu if clicking anywhere else
document.addEventListener("click", (e) => {
  const clickedOutsideNav = !navMenu.contains(e.target) && e.target !== menuToggle;
  if (!navMenu.classList.contains("hidden") && clickedOutsideNav) {
    navMenu.classList.add("hidden");
    menuToggle.classList.remove("hidden");
  }
});
