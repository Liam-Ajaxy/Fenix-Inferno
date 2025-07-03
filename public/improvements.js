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
  }, 500);
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

  // Feedback logic
  const steps = [
  { q: "What brought you to FENIX?", opts: ["Explore Projects", "Read Articles", "Curious Visitor", "Tech Inspiration"] },
  { q: "Which section do you like most?", opts: ["Projects", "Articles", "Settings", "Contact"] },
  { q: "How would you rate the UI/UX?", opts: ["Excellent", "Good", "Fair", "Too Complex"] },
  { q: "Were the project explanations helpful?", opts: ["Very Helpful", "Somewhat", "Not Really"] },
  { q: "What impressed you most?", opts: ["Design", "Speed", "Content", "Innovation"] },
  { q: "Would you recommend FENIX?", opts: ["Yes", "Maybe", "No"] },
  { 
    q: "How did you find FENIX?", 
    opts: ["TikTok", "Friend", "Google", "Other"],
    icons: [
      "https://upload.wikimedia.org/wikipedia/commons/0/08/TikTok_logo.svg",
      "https://cdn-icons-png.flaticon.com/512/1077/1077012.png",
      "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      "https://cdn-icons-png.flaticon.com/512/25/25694.png"
    ]
  },
  { q: "What can we improve?", opts: ["More features", "More projects", "More speed", "Nothing"], input: true }
];

let current = 0;
const responses = [];

const modal = document.getElementById('fenix-feedback-modal');
const openBtn = document.getElementById('fenix-feedback-btn');
const closeBtn = document.getElementById('fenix-close');
const content = document.getElementById('fenix-step-content');
const dots = document.getElementById('fenix-dots');
const nextBtn = document.getElementById('fenix-next');
const backBtn = document.getElementById('fenix-back');
const error = document.getElementById('fenix-error');

openBtn.onclick = () => {
  modal.style.display = 'flex';
  renderStep();
};

closeBtn.onclick = () => {
  modal.style.display = 'none';
  current = 0;
  responses.length = 0;
  content.innerHTML = '';
  backBtn.style.display = 'inline-block';
  nextBtn.style.display = 'inline-block';
};

function renderStep() {
  dots.innerHTML = steps.map((_, i) => `<span class="dot ${i === current ? 'active' : ''}"></span>`).join('');
  const step = steps[current];
  content.innerHTML = `<h2>${step.q}</h2><div class="options"></div>`;
  const optArea = content.querySelector('.options');

  step.opts.forEach((opt, i) => {
    const div = document.createElement('div');
    div.className = 'option';
    div.innerHTML = `${step.icons ? `<img src="${step.icons[i]}" alt="icon">` : ""}${opt}`;
    if (responses[current]?.answer === opt) div.classList.add('selected');
    div.onclick = () => {
      optArea.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
      div.classList.add('selected');
      responses[current] = { answer: opt, custom: responses[current]?.custom || "" };
      error.style.display = 'none';
    };
    optArea.appendChild(div);
  });

  if (step.input) {
    const wrapper = document.createElement('div');
    wrapper.className = 'custom-input';
    wrapper.innerHTML = `<input type="text" placeholder="Write your idea (optional)" value="${responses[current]?.custom || ""}">`;
    wrapper.querySelector("input").oninput = e => {
      if (!responses[current]) responses[current] = {};
      responses[current].custom = e.target.value;
    };
    content.appendChild(wrapper);
  }

  backBtn.disabled = current === 0;
  nextBtn.innerText = current === steps.length - 1 ? "Submit" : "Next";
}

nextBtn.onclick = () => {
  if (!responses[current]?.answer) {
    error.style.display = 'block';
    return;
  }

  if (current < steps.length - 1) {
    current++;
    renderStep();
  } else {
    console.log("🧠 Final Feedback Responses:", responses);
    content.innerHTML = `<h2>✅ Thank you!</h2><p>Your feedback has been received.</p>`;
    dots.innerHTML = '';
    backBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    error.style.display = 'none';
  }
};

backBtn.onclick = () => {
  if (current > 0) {
    current--;
    renderStep();
  }
};

// Top-btn disappear on footer
 const scrollTopBtn = document.getElementById('scrollTop');
  const footer = document.getElementById('footer');

  // Show/hide based on scroll position
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const nearTop = scrollY < 3000;

    if (!nearTop && !footerVisible) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });

  // Track footer visibility
  let footerVisible = false;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      footerVisible = entry.isIntersecting;

      // Hide if footer is visible
      if (footerVisible) {
        scrollTopBtn.classList.remove('show');
      } else {
        // Recheck scroll position to decide visibility
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        if (scrollY >= 200) {
          scrollTopBtn.classList.add('show');
        }
      }
    });
  }, {
    threshold: 0.6
  });

  if (footer) observer.observe(footer);