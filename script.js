const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const api_url = "https://backend-6ezq.onrender.com/api/quotes";

async function getQuote() {
    try {
        const response = await fetch(api_url, { method: "GET", redirect: "follow" });

        // Check if the response is ok
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();

        // Assuming the response structure is as shown:
        if (data && data.length > 0 && data[0].quote) {
            quoteElement.innerHTML = data[0].quote;
            authorElement.innerHTML = data[0].author || "Unknown";
        } else {
            throw new Error('Invalid data format');
        }
    } catch (error) {
        console.error('Error fetching the quote:', error);
        quoteElement.innerHTML = "Error fetching quote";
        authorElement.innerHTML = "";
    }
}

document.getElementById("new-quote").addEventListener("click", getQuote);

function tweet() {
    const tweetText = `“${quoteElement.innerHTML}” — by ${authorElement.innerHTML}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`, "Tweet Window", "width=300,height=300");
}

// Initial quote fetch on page load
getQuote();
