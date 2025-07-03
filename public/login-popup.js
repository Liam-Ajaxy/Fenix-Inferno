// document.addEventListener('DOMContentLoaded', () => {
//   const loginPopup = document.getElementById('login-required');
//   const closeBtn = document.getElementById('close-login-popup');
//   const alertSound = document.getElementById('alert-sound');
//   const body = document.body;

//   const isLoggedIn = !!localStorage.getItem('fenixToken');
//   let lastScrollY = 0; // To restore scroll position

//   if (isLoggedIn) {
//     // ✅ User is logged in: remove popup and scroll lock
//     if (loginPopup) loginPopup.remove();
//     body.classList.remove('no-scroll');
//     body.style.top = '';
//   } else {
//     // ❌ Not logged in: setup login popup behavior
//     const sensitiveItems = document.querySelectorAll('.requires-login');

//     // Handle click on restricted content
//     sensitiveItems.forEach(item => {
//       item.addEventListener('click', (e) => {
//         e.preventDefault();
//         if (loginPopup) {
//           loginPopup.classList.remove('hidden');

//           // Lock scroll but preserve position
//           lastScrollY = window.scrollY;
//           body.classList.add('no-scroll');
//           body.style.top = `-${lastScrollY}px`;

//           // Play alert sound
//           if (alertSound) {
//             alertSound.play().catch(err => console.warn("Sound error:", err));
//           }
//         }
//       });
//     });

//     // Handle Cancel button in popup
//     if (closeBtn) {
//       closeBtn.addEventListener('click', () => {
//         if (loginPopup) {
//           loginPopup.classList.add('hidden');

//           // Restore scroll
//           body.classList.remove('no-scroll');
//           body.style.top = '';
//           window.scrollTo(0, lastScrollY);
//         }
//       });
//     }

//     // Handle click outside popup content
//     if (loginPopup) {
//       loginPopup.addEventListener('click', (e) => {
//         const content = loginPopup.querySelector('.login-popup-content');
//         if (content && !content.contains(e.target)) {
//           // Force reflow to restart blink animation
//           content.classList.remove('blink');
//           void content.offsetWidth;
//           content.classList.add('blink');

//           // Play alert sound
//           if (alertSound) {
//             alertSound.play().catch(err => console.warn("Sound error:", err));
//           }
//         }
//       });
//     }
//   }
// });




// Save the original fetch function
const originalFetch = window.fetch;

// Global fetch override with spinner integration
window.fetch = async function (...args) {
  // Try to find the last clicked button with class "btn-spin"
  const activeBtn = document.activeElement?.classList.contains('btn-spin') 
    ? document.activeElement 
    : null;

  let originalHTML;
  if (activeBtn) {
    originalHTML = activeBtn.innerHTML;
    activeBtn.disabled = true;
    activeBtn.innerHTML = `
      <span class="btn-text">Processing...</span>
    `;
  }

  try {
    // Run the actual fetch call
    const response = await originalFetch(...args);
    return response;
  } catch (err) {
    console.error('Fetch failed:', err);
    throw err;
  } finally {
    // Restore button after fetch completes
    if (activeBtn) {
      activeBtn.innerHTML = originalHTML;
      activeBtn.disabled = false;
    }
  }
};
