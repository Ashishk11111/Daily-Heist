const apiKey = '90870014f5604657a8f81db2a1b7d5eb';
const urls = {
    sports: `https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=${apiKey}`,
    entertainment: `https://newsapi.org/v2/top-headlines?country=in&entertainment&apiKey=${apiKey}`,
    science: `https://newsapi.org/v2/top-headlines?country=in&category=science&apiKey=${apiKey}`,
    health: `https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=${apiKey}`,
    business: `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=${apiKey}`
};

const stocksApiKey = 'b3b75c689cmsh83906a556245dfcp10b733jsn274214697909';
const stocksUrl = `https://share-market-news-api-india.p.rapidapi.com/marketNews&apiKey=${stocksApiKey}`;

document.getElementById('sports-btn').addEventListener('click', () => {
    fetchNews(urls.sports);
});

document.getElementById('entertainment-btn').addEventListener('click', () => {
    fetchNews(urls.entertainment);
});

document.getElementById('science-btn').addEventListener('click', () => {
    fetchNews(urls.science);
});

document.getElementById('health-btn').addEventListener('click', () => {
    fetchNews(urls.health);
});

document.getElementById('business-btn').addEventListener('click', () => {
    fetchNews(urls.business);
});

// document.getElementById('stocks-btn').addEventListener('click', () => {
//     fetchStocksNews();
// });







function handleButtonClick(event) {
    // Remove 'clicked' class from all buttons
    document.querySelectorAll('button').forEach(button => {
        button.classList.remove('clicked');
    });

    // Add 'clicked' class to the clicked button
    event.target.classList.add('clicked');
}

// Attach event listeners to all buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', handleButtonClick);
});








async function fetchNews(url) {
    const response = await fetch(url);
    const data = await response.json();
    displayNews(data.articles);
}

// async function fetchStocksNews() {
//     const response = await fetch(stocksUrl);
//     const data = await response.json();
//     displayStocksNews(data);
// }

function displayNews(articles) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.className = 'article';
        
        const image = article.urlToImage ? `<img src="${article.urlToImage}" alt="Article Image">` : '';
        const description = article.description ? article.description : 'No description available.';

        articleElement.innerHTML = `
            ${image}
            <h2>${article.title}</h2>
            <p>${description}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;
        newsContainer.appendChild(articleElement);
    });
}

// function displayStocksNews(stocksData) {
//     const newsContainer = document.getElementById('news-container');
//     newsContainer.innerHTML = '';
//     stocksData.forEach(stock => {
//         const stockElement = document.createElement('div');
//         stockElement.className = 'article';
        
//         const changeColor = stock.change > 0 ? 'green' : 'red';

//         stockElement.innerHTML = `
//             <h2>${stock.name}</h2>
//             <p>Price: $${stock.price}</p>
//             <p style="color: ${changeColor};">Change: ${stock.change}%</p>
//         `;
//         newsContainer.appendChild(stockElement);
//     });
// }

// Fetch sports news by default on initial load
document.addEventListener('DOMContentLoaded', () => {
    fetchNews(urls.sports);
});
