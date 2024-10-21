const quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Get busy living or get busy dying.", category: "Life" },
];

function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    const quoteDisplay = document.getElementById('quote-display');
    quoteDisplay.innerHTML = `<p>"${quote.text}"</p><p><em>— ${quote.category}</em></p>`;
}

function createAddQuoteForm() {
    const formContainer = document.getElementById('add-quote-form');
    const form = document.createElement('form');
    form.innerHTML = `
        <input type="text" id="quote-text" required />
        <input type="text" id="quote-category" required />
        <button type="submit">Add Quote</button>
    `;
    formContainer.appendChild(form);
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const quoteText = document.getElementById('quote-text').value;
        const quoteCategory = document.getElementById('quote-category').value;
        const newQuote = { text: quoteText, category: quoteCategory };
        quotes.push(newQuote);
        form.reset();
        showRandomQuote();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    showRandomQuote();
    createAddQuoteForm();
});
