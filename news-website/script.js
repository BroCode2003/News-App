document.addEventListener('DOMContentLoaded', () => {
    const url = 'https://www.heise.de/rss/heise-atom.xml';
    const newsContainer = document.getElementById('news-container');

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Netzwerkantwort war nicht ok ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            console.log('Data received:', data); // Debugging
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, 'application/xml');
            const items = xmlDoc.querySelectorAll('entry');

            items.forEach(item => {
                const title = item.querySelector('title').textContent;
                const link = item.querySelector('link').getAttribute('href');
                const summary = item.querySelector('summary') ? item.querySelector('summary').textContent : 'Keine Beschreibung verfügbar';

                // Versuche, das Bild aus dem Inhaltsbereich zu extrahieren
                let image = 'https://via.placeholder.com/300x200'; // Platzhalterbild

                const content = item.querySelector('content') ? item.querySelector('content').textContent : '';
                const imageMatch = content.match(/<img[^>]+src="([^">]+)"/);
                if (imageMatch && imageMatch[1]) {
                    image = imageMatch[1];
                }

                const newsArticle = document.createElement('div');
                newsArticle.classList.add('news-article');
                newsArticle.innerHTML = `
                    <img src="${image}" alt="News Image" onerror="this.onerror=null; this.src='https://via.placeholder.com/300x200';">
                    <h2>${title}</h2>
                    <p>${summary}</p>
                    <a href="${link}" target="_blank">Mehr lesen</a>
                `;
                newsContainer.appendChild(newsArticle);
            });
        })
        .catch(error => console.error('Es gab ein Problem mit der Fetch-Operation:', error));
});
