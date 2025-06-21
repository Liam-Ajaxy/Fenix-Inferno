document.addEventListener('DOMContentLoaded', function () {
  const API_BASE = location.hostname === 'localhost'
    ? 'http://localhost:3000'
    : 'https://fenix-inferno-1.onrender.com';

  console.log('DOM fully loaded');

  // --- Load user info ---
  const storedUserName = localStorage.getItem('userName');
  const storedUserEmail = localStorage.getItem('userEmail');
  const storedToken = localStorage.getItem('fenixToken');

  console.log('Token:', storedToken);
  console.log('Username:', storedUserName);
  console.log('Email:', storedUserEmail);

  // --- Profile Panel Elements ---
  const profileBtn = document.getElementById('profile-btn');
  const profilePanel = document.getElementById('profile-panel');
  const profileUsername = document.getElementById('profile-username');
  const profileEmail = document.getElementById('profile-email');
  const logoutBtn = document.getElementById('logout-btn');

  // --- Show/hide Profile button ---
  if (profileBtn) {
    if (storedToken) {
      profileBtn.style.display = 'block';
    } else {
      profileBtn.style.display = 'none';
    }
  }

  // --- Update Profile Panel info ---
  if (profileUsername) {
    profileUsername.textContent = storedUserName || 'Unknown';
  }
  if (profileEmail) {
    profileEmail.textContent = storedUserEmail || 'Unknown';
  }

  // --- Toggle Profile Panel ---
  if (profileBtn && profilePanel) {
    profileBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      profilePanel.classList.toggle('hidden');
    });

    // Hide Profile Panel when clicking outside
    document.addEventListener('click', function (e) {
      if (!profilePanel.contains(e.target) && e.target !== profileBtn) {
        profilePanel.classList.add('hidden');
      }
    });
  }

  // --- Logout ---
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
      localStorage.removeItem('fenixToken');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');

      showToast(toastIcons.warning, "You've been logged out.", toastColors.warning);
      window.location.href = 'login.html';
    });
  }

  // --- Login Form ---
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    console.log('Attaching Login Form listener');

    loginForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;

      try {
        const response = await fetch(`${API_BASE}/api/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('fenixToken', data.token);
          localStorage.setItem('userName', data.userName);
          localStorage.setItem('userEmail', data.email);

          alert('Login successful! Welcome ' + data.userName);
          window.location.href = 'index.html';
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error('Login error:', error);
        alert("An error occurred during login");
      }
    });
  }

  // --- Signup Form ---
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    console.log('Attaching Signup Form listener');

    signupForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const name = document.getElementById('signup-name').value;
      const email = document.getElementById('signup-email').value;
      const password = document.getElementById('signup-password').value;
      const confirmPassword = document.getElementById('signup-confirm-password').value;

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      try {
        const response = await fetch(`${API_BASE}/api/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (response.ok) {
          alert("Signup successful! You can now log in.");
          window.location.href = 'login.html';
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error('Signup error:', error);
        alert('An error occurred during signup.');
      }
    });
  }
});
