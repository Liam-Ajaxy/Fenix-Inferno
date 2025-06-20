
/*
// Handles loading & saving dynamic content and settings
// Load Projects (Example placeholder — customize as needed)
function loadProjects() {
  fetch('http://localhost:3000/api/projects')
    .then(response => response.json())
    .then(projects => {
      const projectsGrid = document.querySelector('#projects .project-grid');
      projectsGrid.innerHTML = ''; // Clear existing

      projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-block reveal';
        projectCard.innerHTML = `
          <div class="img-wrapper"><img src="${project.image}" alt="${project.title}"></div>
          <h3>${project.title}</h3>
          <p>${project.description}</p>
        `;
        projectsGrid.appendChild(projectCard);
      });
    })
    .catch(error => console.error('Error loading projects:', error));
}

// Load Articles (Feed section)
function loadArticles() {
  fetch('http://localhost:3000/api/articles')
    .then(response => response.json())
    .then(articles => {
      const articlesGrid = document.querySelector('#feed .articles-grid');
      articlesGrid.innerHTML = ''; // Clear existing

      articles.forEach(article => {
        const articleCard = document.createElement('article');
        articleCard.className = 'article-card';
        articleCard.innerHTML = `
          <div class="icon"><i class="${article.icon}"></i></div>
          <h3>${article.title}</h3>
          <p>${article.summary}</p>
          <button class="read-more" onclick="toggleExpand(this)">Read more ▼</button>
          <div class="full-content hidden">
            <p>${article.fullContent}</p>
          </div>
        `;
        articlesGrid.appendChild(articleCard);
      });
    })
    .catch(error => console.error('Error loading articles:', error));
}

// Load Quotes
function loadQuotes() {
  fetch('http://localhost:3000/api/quotes')
    .then(response => response.json())
    .then(quotes => {
      const quotesContainer = document.querySelector('.quotes');
      quotesContainer.innerHTML = '<h3>Principles That Drive Action</h3>'; // Clear existing

      quotes.forEach(quote => {
        const blockquote = document.createElement('blockquote');
        blockquote.textContent = quote.text;
        quotesContainer.appendChild(blockquote);
      });
    })
    .catch(error => console.error('Error loading quotes:', error));
}

// Load Settings
document.getElementById('settings-btn').addEventListener('click', () => {
  loadSettings();

function loadSettings() {
  fetch('http://localhost:3000/api/settings')
    .then(response => response.json())
    .then(settings => {
      document.getElementById('colorMode').checked = settings.colorMode === 'dark';
      document.getElementById('language').value = settings.language || 'en';
      document.getElementById('fontSize').value = settings.fontSize || 'medium';
      document.getElementById('secureMode').checked = settings.secureMode || false;

      document.querySelector('#tab-advanced select:nth-of-type(1)').value = settings.interfaceDensity || 'Comfortable';
      document.querySelector('#tab-advanced input[type="checkbox"]:nth-of-type(1)').checked = settings.aiAssistantMode || false;
      document.querySelector('#tab-advanced select:nth-of-type(2)').value = settings.colorVision || 'Default';
      document.querySelector('#tab-advanced input[type="checkbox"]:nth-of-type(2)').checked = settings.soundFeedback || false;
      document.querySelector('#tab-advanced input[type="checkbox"]:nth-of-type(3)').checked = settings.reducedMotion || false;
      document.querySelector('#tab-advanced input[type="checkbox"]:nth-of-type(4)').checked = settings.realtimeSync || false;
      document.querySelector('#tab-advanced select:nth-of-type(3)').value = settings.languageStyle || 'Formal';
      document.querySelector('#tab-advanced select:nth-of-type(4)').value = settings.displayMode || 'Default';
      document.querySelector('#tab-advanced input[type="checkbox"]:nth-of-type(5)').checked = settings.energySaverMode || false;
      document.querySelector('#tab-advanced input[type="checkbox"]:nth-of-type(6)').checked = settings.stealthMode || false;
      document.querySelector('#tab-advanced input[type="checkbox"]:nth-of-type(7)').checked = settings.gestureVoiceCommands || false;
      document.querySelector('#tab-advanced input[type="checkbox"]:nth-of-type(8)').checked = settings.environmentContextAwareness || false;
    })
    .catch(error => console.error('Error loading settings:', error));
}
})

// Save All Settings
function saveAllSettings() {
  const settings = {
    colorMode: document.getElementById('colorMode').checked ? 'dark' : 'light',
    language: document.getElementById('language').value,
    fontSize: document.getElementById('fontSize').value,
    secureMode: document.getElementById('secureMode').checked,

    interfaceDensity: document.querySelector('#tab-advanced select:nth-of-type(1)').value,
    aiAssistantMode: document.querySelector('#tab-advanced input[type="checkbox"]:nth-of-type(1)').checked,
    colorVision: document.querySelector('#tab-advanced select:nth-of-type(2)').value,
    soundFeedback: document.querySelector('#tab-advanced input[type="checkbox"]:nth-of-type(2)').checked,
    reducedMotion: document.querySelector('#tab-advanced input[type="checkbox"]:nth-of-type(3)').checked,
    realtimeSync: document.querySelector('#tab-advanced input[type="checkbox"]:nth-of-type(4)').checked,
    languageStyle: document.querySelector('#tab-advanced select:nth-of-type(3)').value,
    displayMode: document.querySelector('#tab-advanced select:nth-of-type(4)').value,
    energySaverMode: document.querySelector('#tab-advanced input[type="checkbox"]:nth-of-type(5)').checked,
    stealthMode: document.querySelector('#tab-advanced input[type="checkbox"]:nth-of-type(6)').checked,
    gestureVoiceCommands: document.querySelector('#tab-advanced input[type="checkbox"]:nth-of-type(7)').checked,
    environmentContextAwareness: document.querySelector('#tab-advanced input[type="checkbox"]:nth-of-type(8)').checked
  };

  fetch('http://localhost:3000/api/settings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings)
  })
    .then(response => {
      if (response.ok) {
        alert('Settings saved successfully!');
      } else {
        throw new Error('Failed to save settings');
      }
    })
    .catch(error => console.error('Error saving settings:', error));
}

// Reset Settings
function resetSettings() {
  loadSettings();
  alert('Settings reset to default values.');
}

// Expand/Collapse Article Content (keep this in dynamic.js too)
function toggleExpand(button) {
  const fullContent = button.nextElementSibling;
  if (fullContent.classList.contains('hidden')) {
    fullContent.classList.remove('hidden');
    button.textContent = 'Read less ▲';
  } else {
    fullContent.classList.add('hidden');
    button.textContent = 'Read more ▼';
  }
}

// Optional: Run initial loads on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  loadProjects();
  loadArticles();
  loadQuotes();
});

*/
