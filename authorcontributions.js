const authorId = document.currentScript.getAttribute('author');

function loadArticlesByAuthor(authorId) {
  fetch('../data/articles.json')
    .then(res => res.json())
    .then(articles => {
      const list = document.getElementById('author-articles');
      const filtered = articles.filter(article => article.id === authorId);

      // Sort by date (most recent first)
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

      // Render each article
      filtered.forEach(article => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="../articles/${article.slug}.html">${article.title}</a> 
          <small>(${article.date})</small><br>
          <span>${article.preview}</span>`;
        list.appendChild(li);
      });
    })
    .catch(err => {
      console.error("Error loading author articles:", err);
    });
}

if (document.getElementById('author-articles')) {
  loadArticlesByAuthor(authorId);
}
