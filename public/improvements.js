const isMobile = () => window.innerWidth <= 768;

// Fix dropdown behavior on mobile
document.querySelectorAll('.dropbtn').forEach(btn => {
  const dropdown = btn.closest('.dropdown');

  btn.addEventListener('click', (e) => {
    if (isMobile()) {
      e.preventDefault(); // 🛑 Stop jumping to #tools
      e.stopPropagation();

      // Toggle this dropdown only
      const isOpen = dropdown.classList.contains('open');
      document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
      if (!isOpen) dropdown.classList.add('open');
    }
  });
});

// Close on outside click
document.addEventListener('click', (e) => {
  document.querySelectorAll('.dropdown.open').forEach(drop => {
    if (!drop.contains(e.target)) {
      drop.classList.remove('open');
    }
  });
});

// Optional: Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.dropdown.open').forEach(drop => drop.classList.remove('open'));
  }
});

// Load the contents when DOM is ready
window.addEventListener("load", () => {
  const loader = document.getElementById("fenix-loader");

  // Wait at least 600ms before hiding
  setTimeout(() => {
    loader.classList.add("fade-out");
    setTimeout(() => {
      loader.style.display = "none";
    }, 500); // matches fade duration
  }, 600);
});

// Dropdown Toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggles = document.querySelectorAll(".mobile-dropdown-toggle");

  toggles.forEach(toggle => {
    const targetId = toggle.getAttribute("data-target");
    const target = document.getElementById(targetId);

    toggle.addEventListener("click", () => {
      const isShown = target.classList.contains("show");

      // Hide all
      document.querySelectorAll(".mobile-dropdown-content").forEach(el =>
        el.classList.remove("show")
      );

      // Toggle only this one
      if (!isShown) {
        target.classList.add("show");
      }
    });
  });

  // Auto-close when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".mobile-dropdown")) {
      document.querySelectorAll(".mobile-dropdown-content").forEach(el =>
        el.classList.remove("show")
      );
    }
  });
});

// Burger body lock-scroll
document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector("nav ul");
  const mobileMaxWidth = 768; // define your mobile breakpoint

  function updateScrollLock() {
    const isMobile = window.innerWidth <= mobileMaxWidth;
    const isOpen = menu.classList.contains("show-menu");

    // Lock scroll only if burger menu is open AND screen is mobile size
    if (isMobile && isOpen) {
      document.body.classList.add("lock-scroll");
    } else {
      document.body.classList.remove("lock-scroll");
    }
  }

  // Observe class changes on menu (burger toggle)
  const classObserver = new MutationObserver(updateScrollLock);
  classObserver.observe(menu, { attributes: true, attributeFilter: ["class"] });

  // Listen for window resize to detect screen size changes
  window.addEventListener("resize", updateScrollLock);

  // Initial check on load
  updateScrollLock();
});