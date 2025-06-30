
document.getElementById("secureBtn").addEventListener("click", function () {
  // Open 'securereq.html' in a new tab
  window.open("securereq.html", "_blank");
});

 
 //=================Rotating-typing anime===============
  const lines = [
    "Frank CO7 Developer. Ethical Hacker. Designer of adaptive interfaces.",
    "Merging cybersecurity with innovation — responsibly.",
    "Explore his projects, articles, and intelligent tools."
  ];

  const typingTarget = document.querySelector(".typing-rotator");
  let lineIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function rotateTyping() {
    const currentLine = lines[lineIndex];
    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    typingTarget.textContent = currentLine.substring(0, charIndex);

    if (!isDeleting && charIndex === currentLine.length) {
      setTimeout(() => {
        isDeleting = true;
        rotateTyping();
      }, 1500); // pause at end
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      lineIndex = (lineIndex + 1) % lines.length;
    }

    const delay = isDeleting ? 30 : 50; // speed
    setTimeout(rotateTyping, delay);
  }

  window.addEventListener("DOMContentLoaded", () => {
  setTimeout(rotateTyping, 1000); // Delay in milliseconds (2000 = 2s)
});

  /*==================Scroll Animation by Frank ===============*/
  const reveals = document.querySelectorAll('.reveal div, .article-card');

  window.addEventListener('scroll', () => {
    for (let i = 0; i < reveals.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = reveals[i].getBoundingClientRect().top;

      if (elementTop < windowHeight - 5) {
        reveals[i].classList.add('visible');
      } else {
        reveals[i].classList.remove('visible'); // remove if you want repeatable animation
      }
    }
  });

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');

    // Skip if href is exactly "#" to prevent error
    if (href === "#") {
      return; // Do nothing
    }

    const target = document.querySelector(href);

    if (target) {
      e.preventDefault();
      setTimeout(() => {
        target.scrollIntoView({ behavior: "auto" }); // instant jump after delay
      }, 200);
    }
  });
});


  // =================Read more toggle===============
function toggleExpand(button) {
  const content = button.nextElementSibling;
  const expanded = content.classList.toggle('expanded');
  content.classList.toggle('hidden', !expanded);
  button.textContent = expanded ? '▲' : 'Read more ▼';
  button.setAttribute('aria-expanded', expanded);
}



  //==========Color mode by Frank===============
  // Apply saved theme on page load
  document.addEventListener("DOMContentLoaded", function () {
    const savedMode = localStorage.getItem("colorMode") || "light";
    applyColorMode(savedMode);
    document.getElementById("colorMode").value = savedMode;
     document.getElementById("colorMode").checked = savedMode === "dark";
  });

  function toggleColorMode(mode) {
    applyColorMode(mode);
    localStorage.setItem("colorMode", mode);
    saveSetting("colorMode", mode);
  }

  function applyColorMode(mode) {
    document.documentElement.setAttribute("data-theme", mode);
  }

// ====================Settings======================
const settingsBtn = document.getElementById('settings-btn');
const settingsWrapper = document.getElementById('settings-wrapper');
const settingsPanel = document.getElementById('settings');
const closeSettings = document.getElementById('close-settings');

let scrollY = 0; // Store scroll position

// ✅ OPEN settings panel
settingsBtn.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent anchor from jumping to top

  scrollY = window.scrollY; // Save scroll position
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.width = '100%';

  settingsWrapper.classList.add('active');
});

// ✅ CLOSE settings panel
closeSettings.addEventListener('click', () => {
  settingsWrapper.classList.remove('active');

  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';

  window.scrollTo(0, scrollY); // Restore scroll position
});

// ✅ Close by clicking outside the panel
settingsWrapper.addEventListener('click', (e) => {
  if (!settingsPanel.contains(e.target)) {
    settingsWrapper.classList.remove('active');

    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';

    window.scrollTo(0, scrollY); // Restore scroll position
  }
});

// ========== Tabs logic ==========
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.settings-tab-content');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.add('hidden'));

    button.classList.add('active');
    const targetId = 'tab-' + button.dataset.tab;
    document.getElementById(targetId).classList.remove('hidden');
  });
});

const searchInput = document.getElementById("search-bar");
const searchWrapper = document.querySelector(".search-wrapper");
const searchButton = document.getElementById("search-btn");
const closeSearchBtn = document.getElementById("close-search-btn");
const resultsContainer = document.getElementById("search-results");
const noResults = document.getElementById("no-results");
const exitHint = document.getElementById("exit-hint");
const googleFallback = document.getElementById("google-fallback");
const googleLink = document.getElementById("google-link");
const mainContent = document.getElementById("main-content");

const allSearchables = document.querySelectorAll(
  "article, .project-block, .quote-block, .setting-item, .skills-grid div, .quotes blockquote, #contact"
);

// === Expand on focus ===
searchInput.addEventListener("focus", () => {
  searchWrapper.classList.add("active");
});

// === Shrink on blur only if input is empty ===
searchInput.addEventListener("blur", () => {
  setTimeout(() => {
    if (!searchInput.value.trim()) {
      searchWrapper.classList.remove("active");
    }
  }, 100); // small delay to allow click events to fire first
});

// === Run search on Enter key ===
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    triggerSearch();
  }
});

// === Run search on icon button (mousedown prevents layout jump) ===
searchButton.addEventListener("mousedown", (e) => {
  e.preventDefault();
  triggerSearch();
});

// === Close search on button click (mousedown avoids blur glitch) ===
closeSearchBtn.addEventListener("mousedown", (e) => {
  e.preventDefault();
  resetSearch();
});

// === Exit search with ESC key ===
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    resetSearch();
  }
});

// === Main trigger ===
function triggerSearch() {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) {
    resetSearch();
    return;
  }
  runSearch(query);
}

// === Search logic ===
function runSearch(query) {
  const queryWords = query.split(/\s+/).filter(w => w.length > 1);
  document.body.classList.add("search-mode");
  closeSearchBtn.classList.remove("hidden");
  resultsContainer.innerHTML = "";
  mainContent?.classList?.add("hidden");

  let foundAny = false;

  allSearchables.forEach(item => {
    const text = item.textContent.toLowerCase();
    const match = queryWords.some(word =>
      new RegExp(`\\b${word}\\b`).test(text)
    );

    if (match) {
      const clone = item.cloneNode(true);
      clone.classList.add("search-result-item");
      resultsContainer.appendChild(clone);
      foundAny = true;
    }
  });

  if (foundAny) {
    resultsContainer.classList.remove("hidden");
    noResults.classList.remove("show");
    exitHint.classList.add("show");
    googleFallback.classList.add("hidden");
  } else {
    resultsContainer.classList.add("hidden");
    noResults.classList.add("show");
    exitHint.classList.remove("show");

    // Update fallback link
    googleLink.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    googleFallback.classList.remove("hidden");
  }
}

// === Reset everything ===
function resetSearch() {
  searchInput.value = "";
  document.body.classList.remove("search-mode");
  searchWrapper.classList.remove("active");
  resultsContainer.classList.add("hidden");
  noResults.classList.remove("show");
  exitHint.classList.remove("show");
  googleFallback.classList.add("hidden");
  closeSearchBtn.classList.add("hidden");
  mainContent?.classList?.remove("hidden");
}

// ESC key → Exit search mode
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    searchInput.value = "";
    document.body.classList.remove("search-mode");
    resultsContainer.classList.add("hidden");
    noResults.classList.remove("show");
    exitHint.classList.remove("show");
    mainContent.classList.remove("hidden");
  }
});


// ============Global Toast/Notific================
const toastColors = {
  success: "#10b981",
  warning: "#f59e0b",
  info: "#3b82f6",
  error: "#ef4444",
  default: "#323232"
};

const toastIcons = {
  success: '✅',
  error: '❌',
  warning: '⚠️',
  info: 'ℹ️',
  neutral: '💬'
};

function showToast(icon, message, background = toastColors.default) {
  const container = document.getElementById("global-toast-container");
  if (!container) {
    console.warn("Global toast container not found.");
    return;
  }

  // Create new toast div
  const toast = document.createElement("div");
  toast.className = "global-toast";
  toast.textContent = message;
  toast.style.backgroundColor = background;

  // Build full message → icon + text
  toast.textContent = `${icon} ${message}`;

  // Add accessibility attributes (good practice)
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'assertive');

  // Append to container
  container.appendChild(toast);

  // Force reflow to trigger animation
  requestAnimationFrame(() => {
    toast.classList.add("show-toast");
  });

  // Auto remove after 6s
  setTimeout(() => {
    toast.classList.remove("show-toast");
    setTimeout(() => {
      toast.remove();
    }, 500); // match transition duration
  }, 6000);
}


// ==============Settings save changes ================
// Save a setting to localStorage
function saveSetting(key, value) {
  try {
    localStorage.setItem(key, value);
    console.log(`Saved setting: ${key} = ${value}`);
  } catch (e) {
    console.warn("Could not save setting:", key, value);
  }
}

// Load a setting from localStorage
function loadSetting(key) {
  return localStorage.getItem(key);
}

// Restore settings on page load
function restoreSettings() {
  // Color mode
  const colorMode = loadSetting("colorMode") || "light";
  document.documentElement.setAttribute("data-theme", colorMode);
  const colorModeCheckbox = document.getElementById("colorMode");
  if (colorModeCheckbox) {
    colorModeCheckbox.checked = colorMode === "dark";
  }

  // Language
  const language = loadSetting("language") || "en";
  const languageSelect = document.getElementById("language");
  if (languageSelect) {
    languageSelect.value = language;
  }

  // Font Size
  const fontSize = loadSetting("fontSize") || "medium";
  const fontSizeSelect = document.getElementById("fontSize");
  if (fontSizeSelect) {
    fontSizeSelect.value = fontSize;
    document.body.style.fontSize = fontSize === "small" ? "14px" : fontSize === "large" ? "20px" : "18px";
  }

  // Secure Mode
  const secureMode = loadSetting("secureMode") === "true";
  const secureModeCheckbox = document.getElementById("secureMode");
  if (secureModeCheckbox) {
    secureModeCheckbox.checked = secureMode;
  }
}

// Reset all settings
function resetSettings() {
  if (confirm("Reset all settings to default?")) {
  localStorage.clear();
  console.log("All settings cleared.");
  restoreSettings(); // reload defaults
  // Show global toast
  showToast(toastIcons.warning, "Settings Reset", toastColors.warning);
}}


// Save all settings (optional button)
function saveAllSettings() {
  // You can optionally re-apply settings if needed:
  restoreSettings();
  // Show global toast always
  showToast(toastIcons.success, "Settings Saved", toastColors.success);

  console.log("Settings saved.");
}

// Run on page load
document.addEventListener("DOMContentLoaded", () => {
  restoreSettings();
});




// =============== Req to Backend =====================

// Auto-switch base API URL depending on environment
const isLocal = ['localhost', '127.0.0.1'].includes(location.hostname) || location.protocol === 'file:';
const API_BASE = isLocal
  ? 'http://localhost:3000'
  : 'https://fenix-inferno-1.onrender.com';


// Handle contact form submission
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded');

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    console.log('Attaching Contact Form listener');
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      const nameRegex = /^[a-zA-Z\s'-]+$/;
      if (!nameRegex.test(name)) {
        showToast(toastIcons.error, 'Invalid name', toastColors.error);
        return;
      }

      console.log('Sending:', { name, email, message });

      fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      })
        .then(response => {
          if (response.ok) {
            showToast(toastIcons.success, 'Message sent', toastColors.success);
            contactForm.reset();
          } else {
            throw new Error('Failed to send message.');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          showToast(toastIcons.error, "An error occurred during contact", toastColors.error);
        });
    });
  } else {
    console.warn('Contact form not found!');
  }
});


// ===============AOS Header Effects=======================
// HEADER GLASS EFFECT ON SCROLL UP
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  const header = document.querySelector('header'); // adjust selector if needed

  if (!header) return; // safety check

  if (currentScrollY < lastScrollY && currentScrollY > 50) {
    // Scrolling up and not at top → add glass
    header.classList.add('header-glass');
  } else if (currentScrollY > lastScrollY) {
    // Scrolling down → remove glass
    header.classList.remove('header-glass');
  } else if (currentScrollY <= 50) {
    // Near top → remove glass
    header.classList.remove('header-glass');
  }

  lastScrollY = currentScrollY;
});



// ============HEADER DISAPPEAR WHEN FOOTER IN VIEW====================

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const footer = document.querySelector('footer'); // adjust selector if needed (your footer must have <footer> tag)

  if (!header || !footer) return; // safety check

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Footer is in view → hide header
        header.classList.add('header-hidden');
      } else {
        // Footer not in view → show header
        header.classList.remove('header-hidden');
      }
    });
  }, {
    root: null, // viewport
    threshold: 0.3, // 30% of footer must be visible to trigger → smoother
  });

  observer.observe(footer);
});

// ============= Hamburger Icon =============================
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.querySelector('nav ul');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('show-menu');
      document.body.classList.toggle('menu-open', navMenu.classList.contains('show-menu'));
    });

    // Optional: close menu when clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        document.body.classList.remove('menu-open');
      });
    });
  }
});



// =============Floating links ===================================
let lastScrollTop = 0;
const authLinks = document.querySelector('.floating-auth-links');
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', function() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  //Floating Auth Links: hide on scroll down, show on scroll up
  if (scrollTop > lastScrollTop) {
    // Scrolling down → hide auth links
    authLinks.classList.add('hide');
  } else {
    // Scrolling up → show auth links
    authLinks.classList.remove('hide');
  }


  
  //show only after scrolling down 3000px
  if (scrollTop > 3000) {
    scrollTopBtn.classList.add('show'); // You will define `.show` in CSS
  } else {
    scrollTopBtn.classList.remove('show');
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Prevent negative scroll
}, false);


document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('fenixToken');
  const userName = localStorage.getItem('userName');

  if (token && userName) {
    console.log('✅ Logged in as', userName);
    document.getElementById('user-welcome').textContent = `Welcome, ${userName}`;

    // Add "logged-in" class to floating auth links to force hide
    const authLinks = document.querySelector('.floating-auth-links');
    if (authLinks) {
      authLinks.classList.add('logged-in');
    }
  } else {
    console.warn('🔒 Not logged in');
    setTimeout(() => {
      showToast(toastIcons.info, "You need to login to access some features.", toastColors.info);
    }, 3000);
  }
});


// images slideshow
// Wait for the page to fully load
  document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.rotating-images img'); // Get all images
    let current = 0; // Start from the first image

    // Function to rotate to next image
    function rotateImages() {
      images.forEach((img, index) => {
        img.classList.remove('active'); // Remove 'active' from all
      });

      images[current].classList.add('active'); // Show the current one
      current = (current + 1) % images.length; // Move to next image, loop to start
    }

    // Start the rotation every 3 seconds
    rotateImages(); // Show the first image immediately
    setInterval(rotateImages, 3000); // Change image every 3 seconds
  });




//  ✅ JS for observing scroll visibility
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".stack-container > *");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
});
