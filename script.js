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

// Load a quote when the page opens
fetchQuote();

// Optionally refresh quote on click
document.addEventListener('click', () => {
    fetchQuote();
});
