const navLinks = Array.from(document.querySelectorAll(".category-nav a"));
const sections = Array.from(document.querySelectorAll(".menu-section"));
const toTopBtn = document.getElementById("toTopBtn");

function getOffset() {
  const nav = document.querySelector(".category-nav");
  return nav ? nav.offsetHeight + 10 : 0;
}

function smoothScrollToSection(targetId) {
  const section = document.querySelector(targetId);
  if (!section) return;

  const top = section.getBoundingClientRect().top + window.scrollY - getOffset();
  window.scrollTo({ top, behavior: "smooth" });
}

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    smoothScrollToSection(link.getAttribute("href"));
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 }
);

sections.forEach((section) => observer.observe(section));

function updateActiveNavLink() {
  const scrollMid = window.scrollY + window.innerHeight * 0.35;
  let currentId = sections[0]?.id;

  sections.forEach((section) => {
    const top = section.offsetTop - getOffset();
    if (scrollMid >= top) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${currentId}`;
    link.classList.toggle("active", isActive);
  });
}

function updateToTopButton() {
  if (window.scrollY > 380) {
    toTopBtn.classList.add("show");
  } else {
    toTopBtn.classList.remove("show");
  }
}

window.addEventListener("scroll", () => {
  updateActiveNavLink();
  updateToTopButton();
});

toTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("resize", updateActiveNavLink);
window.addEventListener("load", () => {
  updateActiveNavLink();
  updateToTopButton();
});
