const quote = document.getElementById("quote");
const author = document.getElementById("author");
const api_url = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

async function getQuote(url) {
    try {
        const response = await fetch(url, { method: "GET", redirect: "follow" });
        
        // Check if the response is ok
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();

        // Check if the API response has the expected structure
        if (data.quoteText) {
            quote.innerHTML = data.quoteText;
            author.innerHTML = data.quoteAuthor || "Unknown";
        } else {
            throw new Error('Invalid data format');
        }
    } catch (error) {
        console.error('Error fetching the quote:', error);
        quote.innerHTML = "Error fetching quote";
        author.innerHTML = "";
    }
}

getQuote(api_url);

function tweet() {
    const tweetText = `“${quote.innerHTML}” — by ${author.innerHTML}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`, "Tweet Window", "width=300,height=300");
}