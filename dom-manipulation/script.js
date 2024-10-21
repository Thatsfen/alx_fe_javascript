const quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Get busy living or get busy dying.", category: "Life" },
];

function showRandomQuote(filteredQuotes) {
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const quote = filteredQuotes[randomIndex];
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
        populateCategories();
        form.reset();
        showRandomQuote(filterQuotes());
    });
}

function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = [...new Set(quotes.map(quote => quote.category))];
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    let filteredQuotes = quotes;
    if (selectedCategory !== 'all') {
        filteredQuotes = quotes.filter(quote => quote.category === selectedCategory);
    }
    localStorage.setItem('lastSelectedCategory', selectedCategory);
    showRandomQuote(filteredQuotes);
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
        populateCategories();
        alert('Quotes imported successfully!');
        showRandomQuote(filterQuotes());
    };
    fileReader.readAsText(event.target.files[0]);
}

document.addEventListener('DOMContentLoaded', () => {
    const lastSelectedCategory = localStorage.getItem('lastSelectedCategory') || 'all';
    document.getElementById('categoryFilter').value = lastSelectedCategory;
    filterQuotes();
    createAddQuoteForm();
    populateCategories();
    const exportButton = document.getElementById('exportQuotes');
    exportButton.addEventListener('click', exportQuotes);
});
