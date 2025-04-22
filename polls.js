function loadArticles(section = null) {
  fetch('../data/polls.json')
    .then(res => res.json())
    .then(articles => {
      const list = document.getElementById('polling-list');
      const filtered = section
        ? articles.filter(a => a.section === section)
        : articles;

      // Sort articles by date (from recent to least)
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

      filtered.forEach(article => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="../polling/${article.slug}.html">${article.title}</a> 
          <small>(${article.date})</small><br>
          <span>${article.preview}</span>`;
        list.appendChild(li);
      });
    })
    .catch(err => {
      console.error("Error loading polls:", err);
    });
}

// Auto-load on homepage
if (document.getElementById('polling-list')) {
  loadArticles();
}
