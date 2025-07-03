// ============== 1️⃣ Password Strength Checker ===============================
function checkPasswordStrength() {
  const password = document.getElementById('passwordInput').value.trim();
  const resultWrapper = document.getElementById('passwordStrengthResult');
  const icon = resultWrapper.querySelector('.icon');
  const textSpan = resultWrapper.querySelector('.text');
  const spinner = resultWrapper.querySelector('.spinner');

  // Reset previous state
  textSpan.textContent = 'Analyzing...';
  icon.textContent = '';
  textSpan.classList.remove('strength-weak', 'strength-medium', 'strength-strong', 'neutral');
  spinner.classList.remove('hidden');

  setTimeout(() => {
    if (password === '') {
      icon.textContent = '⚠️';
      textSpan.textContent = 'Please enter a password.';
      textSpan.classList.add('neutral');
      spinner.classList.add('hidden');
      return;
    }

    let strength = 'Weak';
    let iconSymbol = '❌';
    let strengthClass = 'strength-weak';

    if (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /\d/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    ) {
      strength = 'Strong';
      strengthClass = 'strength-strong';
      iconSymbol = '✅';
    } else if (password.length >= 6) {
      strength = 'Medium';
      strengthClass = 'strength-medium';
      iconSymbol = '⚠️';
    }

    icon.textContent = iconSymbol;
    textSpan.textContent = `Strength: ${strength}`;
    textSpan.classList.add(strengthClass);
    spinner.classList.add('hidden');
  }, 1000);
}






// ============= 2️⃣ Cipher Decoder (ROT13) ====================================
function decodeCipher() {
  const input = document.getElementById('cipherInput').value.trim();
  const resultEl = document.getElementById('cipherResult');
  const spinner = resultEl.querySelector('.spinner');
  const textEl = resultEl.querySelector('.text');
  const iconEl = resultEl.querySelector('.icon');

  // Reset previous result
  textEl.textContent = 'Decoding...';
  iconEl.textContent = '';
  spinner.classList.remove('hidden');

  // Check for empty input
  if (input === '') {
    iconEl.textContent = '⚠️';
    textEl.textContent = 'Please enter text to decode.';
    textEl.className = 'text neutral';
    spinner.classList.add('hidden');
    return;
  }

  setTimeout(() => {
    const result = input.replace(/[a-zA-Z]/g, function (c) {
      return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
    });

    iconEl.textContent = '✅';
    textEl.textContent = result;
    textEl.className = 'text decoded';
    spinner.classList.add('hidden');
  }, 1000);
}




// ============== 3️⃣ Morse Code Generator ======================================
function generateMorse() {

  const morseCodeMap = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.',
  'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
  'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---',
  'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
  'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--',
  'Z': '--..', '0': '-----', '1': '.----', '2': '..---', '3': '...--',
  '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
  '9': '----.', ' ': '/'
};



  const input = document.getElementById('morseInput').value.toUpperCase();
  const resultWrapper = document.getElementById('morseResult');
  const textSpan = resultWrapper.querySelector('.text');
  const spinner = resultWrapper.querySelector('.spinner');

  if (!textSpan || !spinner) {
    console.error('Missing .text or .spinner inside #morseResult');
    return;
  }

  textSpan.textContent = 'Converting...';

  setTimeout(() => {
    try {
      const morse = input
        .split('')
        .map(char => morseCodeMap[char] || '')
        .join(' ')
        .trim();

      textSpan.textContent = morse || '[No valid characters]';
    } catch (err) {
      console.error('Morse conversion failed:', err);
      textSpan.textContent = '[Error generating Morse]';
    }

    spinner.classList.add('hidden');
    console.log('Spinner hidden ✅');
  }, 2000);
}




// ================= 4️⃣ Random Password Generator ===========================
function generateRandomPassword() {
  const resultEl = document.getElementById('randomPasswordResult');
  const spinner = resultEl.querySelector('.spinner');

  resultEl.textContent = 'Generating...';
  resultEl.appendChild(spinner);
  spinner.classList.remove('hidden');

  setTimeout(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    resultEl.textContent = `Generated Password: ${password}`;
    resultEl.appendChild(spinner);
    spinner.classList.add('hidden');
  }, 1000);
}

