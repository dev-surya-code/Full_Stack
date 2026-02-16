// Dark Mode Toggle
const toggle = document.getElementById("themeToggle");
toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggle.innerHTML = document.body.classList.contains("dark")
        ? '<i class="bi bi-sun"></i>'
        : '<i class="bi bi-moon"></i>';
});

// Scroll Animations
const animated = document.querySelectorAll(".animate");

window.addEventListener("scroll", () => {
    animated.forEach(el => {
        const pos = el.getBoundingClientRect().top;
        if (pos < window.innerHeight - 100) {
            el.classList.add("show");
        }
    });
});

// Initial load animation
window.dispatchEvent(new Event("scroll"));
