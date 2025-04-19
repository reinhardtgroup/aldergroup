function loadArticles(section = null) {
    fetch('data/articles.json')
      .then(res => res.json())
      .then(articles => {
        const list = document.getElementById('article-list');
        const filtered = section
          ? articles.filter(a => a.section === section)
          : articles;
  
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
  
  // Auto-load on homepage
  if (document.getElementById('article-list') && !window.location.pathname.includes('/sections/')) {
    loadArticles();
  }
  