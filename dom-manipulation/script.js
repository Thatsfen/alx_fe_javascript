const quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Get busy living or get busy dying.", category: "Life" },
];

function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    const quoteDisplay = document.getElementById('quote-display');
    quoteDisplay.innerHTML = `<p>"${quote.text}"</p><p><em>— ${quote.category}</em></p>`;
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(quote));
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
        localStorage.setItem('quotes', JSON.stringify(quotes));
        form.reset();
        showRandomQuote();
    });
}

function exportQuotes() {
    const blob = new Blob([JSON.stringify(quotes)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
    URL.revokeObjectURL(url);
}

function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        localStorage.setItem('quotes', JSON.stringify(quotes));
        alert('Quotes imported successfully!');
        showRandomQuote();
    };
    fileReader.readAsText(event.target.files[0]);
}

document.addEventListener('DOMContentLoaded', () => {
    showRandomQuote();
    createAddQuoteForm();
    const exportButton = document.createElement('button');
    exportButton.textContent = 'Export Quotes';
    exportButton.addEventListener('click', exportQuotes);
    document.body.appendChild(exportButton);
    const importInput = document.createElement('input');
    importInput.type = 'file';
    importInput.id = 'importFile';
    importInput.accept = '.json';
    importInput.onchange = importFromJsonFile;
    document.body.appendChild(importInput);
});
