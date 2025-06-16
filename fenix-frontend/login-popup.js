// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
  const popup = document.getElementById('login-required');
  const closeBtn = document.getElementById('close-login-popup');
  const alertSound = document.getElementById('alert-sound');

  // Show the popup
  function showLoginPopup() {
    popup.classList.remove('hidden');
    document.body.classList.add('no-scroll');

    // Play warning beep
    if (alertSound) {
      alertSound.currentTime = 0;
      alertSound.play().catch(err => {
        console.warn("Audio play failed:", err);
      });
    }
    
    // Blink border
    popup.classList.add('blink');
    setTimeout(() => popup.classList.remove('blink'), 300);
  }

  // Close the popup
  closeBtn.addEventListener('click', () => {
    popup.classList.add('hidden');
    document.body.classList.remove('no-scroll');
  });

  // OPTIONAL: Protect interactive content
  document.querySelectorAll('.requires-login').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      showLoginPopup();
    });
  });

  // Close popup on outside click (optional warning again)
  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      showLoginPopup(); // Replay blink/sound
    }
  });
});
