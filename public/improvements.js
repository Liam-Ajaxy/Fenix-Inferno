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