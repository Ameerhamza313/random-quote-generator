const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");

// List of quote APIs
const apiUrls = [
    "https://api.quotable.io/random",
    "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json",
    "https://quotes.rest/qod"
];

// Function to fetch a quote
async function fetchQuote(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching quote:', error);
        throw error; // Propagate the error to try the next API
    }
}

// Function to get a quote from a list of APIs
async function getQuote() {
    for (const url of apiUrls) {
        try {
            const data = await fetchQuote(url);
            
            // Handle data based on API response format
            if (url.includes('quotable')) {
                // Quotable API
                quoteElement.innerHTML = `"${data.content}"`;
                authorElement.innerHTML = `— ${data.author}`;
            } else if (url.includes('forismatic')) {
                // Forismatic API
                quoteElement.innerHTML = `"${data.quoteText}"`;
                authorElement.innerHTML = `— ${data.quoteAuthor}`;
            } else if (url.includes('quotes.rest')) {
                // They Said So API
                quoteElement.innerHTML = `"${data.contents.quotes[0].quote}"`;
                authorElement.innerHTML = `— ${data.contents.quotes[0].author}`;
            }
            return; // Exit function after successful fetch
        } catch (error) {
            // Continue to the next API if there is an error
        }
    }
    quoteElement.innerHTML = "Failed to fetch a quote.";
    authorElement.innerHTML = "";
}

// Initialize fetching a quote
getQuote();

function tweet() {
    const tweetText = encodeURIComponent(`${quoteElement.innerHTML} — ${authorElement.innerHTML}`);
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, "Tweet Window", "width=500,height=300");
}
