// Function to get the section from the data-section attribute
const section = document.currentScript.getAttribute('data-section');

// Original loadArticles function for general use
function loadArticles(section = null) {
  fetch('data/articles.json')
    .then(res => res.json())
    .then(articles => {
      const list = document.getElementById('article-list');
      const filtered = section
        ? articles.filter(a => a.section === section)
        : articles;

      // Sort articles by date (from recent to least)
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

      filtered.forEach(article => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="articles/${article.slug}.html">${article.title}</a> 
          <small>(${article.date})</small><br>
          <span>${article.preview}</span>`;
        list.appendChild(li);
      });
    })
    .catch(err => {
      console.error("Error loading articles:", err);
    });
}

// New function to load articles by section (e.g., "world", "politics", etc.)
function loadArticlesBySection(section) {
  fetch('../data/articles.json')
    .then(res => res.json())
    .then(articles => {
      const list = document.getElementById('article-list');
      const filtered = articles.filter(a => a.section === section);

      // Sort articles by date (from recent to least)
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

      filtered.forEach(article => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="../articles/${article.slug}.html">${article.title}</a> 
          <small>(${article.date})</small><br>
          <span>${article.preview}</span>`;
        list.appendChild(li);
      });
    })
    .catch(err => {
      console.error(`Error loading ${section} articles:`, err);
    });
}

if (document.getElementById('article-list')) {
  if (section) {
    if (section !== "all") {
      loadArticlesBySection(section);
    } else {
      loadArticles();  // Load all articles if section is "all"
    }
  }
}
