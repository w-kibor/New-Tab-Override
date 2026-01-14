// Update greeting based on time of day
function updateGreeting() {
    const greetingElement = document.getElementById('greeting');
    const hour = new Date().getHours();
    let greeting = '';

    if (hour < 12) {
        greeting = 'Good morning';
    } else if (hour < 18) {
        greeting = 'Good afternoon';
    } else {
        greeting = 'Good evening';
    }

    greetingElement.textContent = `${greeting}, Wilkister`;
}

// Load API key from config file
let unsplashAccessKey = '';

async function loadConfig() {
    try {
        const response = await fetch('/config.json');
        const config = await response.json();
        unsplashAccessKey = config.unsplashAccessKey;
    } catch (error) {
        console.error('Error loading config:', error);
    }
}

// Fetch a random background image from Unsplash
async function fetchBackground() {
    const backgroundContainer = document.getElementById('backgroundContainer');
    const attributionElement = document.getElementById('attribution');
    
    try {
        // Using Unsplash API - free access tier
        const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${unsplashAccessKey}&query=nature,landscape&orientation=landscape`);
        
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        const imageUrl = data.urls.regular;
        const photographer = data.user.name;
        const photographerLink = data.user.links.html;

        // Set background image
        backgroundContainer.style.backgroundImage = `url('${imageUrl}')`;
        
        // Add attribution
        attributionElement.innerHTML = `Photo by <a href="${photographerLink}" target="_blank" rel="noopener noreferrer">${photographer}</a> on <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">Unsplash</a>`;
    } catch (error) {
        console.error('Error fetching background:', error);
        
        // Fallback to gradient
        backgroundContainer.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
}

// Fetch top sites from Chrome API
function loadTopSites() {
    const quickLinksElement = document.getElementById('quickLinks');
    
    if (chrome.topSites) {
        chrome.topSites.get((sites) => {
            quickLinksElement.innerHTML = '';
            
            // Display top 6 sites
            const topSites = sites.slice(0, 6);
            
            topSites.forEach((site) => {
                const link = document.createElement('a');
                link.href = site.url;
                link.className = 'quick-link';
                link.title = site.title;
                
                const icon = document.createElement('div');
                icon.className = 'quick-link-icon';
                icon.textContent = site.title.charAt(0).toUpperCase();
                
                const title = document.createElement('div');
                title.className = 'quick-link-title';
                title.textContent = site.title.length > 12 ? site.title.substring(0, 12) + '...' : site.title;
                
                link.appendChild(icon);
                link.appendChild(title);
                quickLinksElement.appendChild(link);
            });
        });
    }
}

// Fetch a random quote from the API
async function fetchQuote() {
    const quoteElement = document.getElementById('quote');
    const authorElement = document.getElementById('author');

    try {
        const response = await fetch('https://api.quotable.io/random');
        
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        
        // Display the fetched quote and author
        quoteElement.textContent = `"${data.content}"`;
        authorElement.textContent = `— ${data.author}`;
    } catch (error) {
        console.error('Error fetching quote:', error);
        
        // Fallback quote in case API is down
        const fallbackQuote = "The only way to do great work is to love what you do.";
        const fallbackAuthor = "Steve Jobs";
        
        quoteElement.textContent = `"${fallbackQuote}"`;
        authorElement.textContent = `— ${fallbackAuthor}`;
    }
}

// Initialize all features on page load
document.addEventListener('DOMContentLoaded', async () => {
    await loadConfig();
    updateGreeting();
    fetchBackground();
    fetchQuote();
    loadTopSites();
});

// Refresh quote on click
document.addEventListener('click', (event) => {
    // Only refresh quote if clicking on the quote box
    if (event.target.closest('.quote-box')) {
        fetchQuote();
    }
});
