// ============== 1️⃣ Password Strength Checker ===============================
function checkPasswordStrength() {
  const password = document.getElementById('passwordInput').value.trim();
  let strength = 'Weak';

  if (password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password) && /[^A-Za-z0-9]/.test(password)) {
    strength = 'Strong';
  } else if (password.length >= 6) {
    strength = 'Medium';
  }

  document.getElementById('passwordStrengthResult').textContent = `Strength: ${strength}`;
}



// ============= 2️⃣ Cipher Decoder (ROT13) ====================================
function decodeCipher() {
  const input = document.getElementById('cipherInput').value;
  const result = input.replace(/[a-zA-Z]/g, function(c) {
    return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
  });

  document.getElementById('cipherResult').textContent = result;
}



// ============== 3️⃣ Morse Code Generator ======================================
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

function generateMorse() {
  const text = document.getElementById('morseInput').value.toUpperCase();
  const morse = text.split('').map(char => morseCodeMap[char] || '').join(' ');
  document.getElementById('morseResult').textContent = morse;
}



// ================= 4️⃣ Random Password Generator ===========================
function generateRandomPassword() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
  let password = '';
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  document.getElementById('randomPasswordResult').textContent = `Generated Password: ${password}`;
}
