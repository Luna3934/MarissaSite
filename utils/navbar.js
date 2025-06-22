const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isLight = body.classList.toggle("light-side");
    themeToggle.textContent = isLight ? "☀️" : "🌙";
  });
}