// DOM Elements
const stockForm = document.getElementById('stock-form');
const stockSymbolInput = document.getElementById('stock-symbol');
const stockAmountInput = document.getElementById('stock-amount');
const portfolioList = document.getElementById('portfolio-list');
const detailsDiv = document.getElementById('details');

// Static stock data
const stockData = {
    'AAPL': { price: 150, change: 2.5, changePercent: 1.7 },
    'GOOGL': { price: 2800, change: -10, changePercent: -0.36 },
    'AMZN': { price: 3400, change: 20, changePercent: 0.59 },
    'MSFT': { price: 290, change: 5, changePercent: 1.75 }
};

let portfolio = {};

// Event Listener for Form Submission
stockForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const symbol = stockSymbolInput.value.toUpperCase().trim(); // Ensure the symbol is in uppercase
    const amount = parseFloat(stockAmountInput.value);

    if (!portfolio[symbol]) {
        portfolio[symbol] = { amount: 0 };
    }

    portfolio[symbol].amount += amount;
    updatePortfolio();

    stockSymbolInput.value = '';
    stockAmountInput.value = '';
    displayStockDetails(symbol); // Ensure the correct symbol is displayed
});

// Function to Display Stock Details
function displayStockDetails(symbol) {
    const data = stockData[symbol];
    if (data) {
        detailsDiv.innerHTML = `
            <p><strong>Symbol:</strong> ${symbol}</p>
            <p><strong>Price:</strong> $${data.price.toFixed(2)}</p>
            <p><strong>Change:</strong> ${data.change.toFixed(2)} (${data.changePercent.toFixed(2)}%)</p>
        `;
    } else {
        detailsDiv.innerHTML = '<p>No data available for this stock symbol.</p>';
    }
}


// Function to Update Portfolio Display
function updatePortfolio() {
    portfolioList.innerHTML = '';
    for (const [symbol, info] of Object.entries(portfolio)) {
        const listItem = document.createElement('li');
        listItem.textContent = `${symbol}: ${info.amount} shares`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            delete portfolio[symbol];
            updatePortfolio();
        });

        listItem.appendChild(removeButton);
        portfolioList.appendChild(listItem);
    }
}
