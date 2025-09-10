// ===== DROPDOWN NAV SCRIPT =====

// Grab all nav links and dropdowns
const navLinks = document.querySelectorAll(".nav-links a");
const dropdowns = document.querySelectorAll(".dropdown");

// Loop through each nav link
navLinks.forEach(link => {
  // Which dropdown this link should open
  const targetId = link.getAttribute("data-dropdown");
  const dropdown = document.getElementById(targetId);

  // When mouse enters link
  link.addEventListener("mouseenter", () => {
    // Hide all dropdowns first
    dropdowns.forEach(d => d.classList.remove("show"));

    // Show the one for this link
    dropdown.classList.add("show");
  });

  // When mouse leaves link
  link.addEventListener("mouseleave", () => {
    // Wait: keep dropdown open if hovering it
    dropdown.addEventListener("mouseenter", () => {
      dropdown.classList.add("show");
    });

    // If mouse leaves dropdown, hide it
    dropdown.addEventListener("mouseleave", () => {
      dropdown.classList.remove("show");
    });
  });
});

// ===== CLOSE DROPDOWNS IF CLICKED OUTSIDE =====
document.addEventListener("click", e => {
  if (!e.target.closest(".nav-links") && !e.target.closest(".dropdown")) {
    dropdowns.forEach(d => d.classList.remove("show"));
  }
});


document.querySelector('.fa-bars').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('mobile-menu-open');
});