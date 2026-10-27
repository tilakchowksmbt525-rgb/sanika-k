
const stocks = [
    { name: "Reliance Industries", symbol: "RELIANCE", price: 1450.50, change: 1.25 },
    { name: "Tata Consultancy Services", symbol: "TCS", price: 3250.75, change: 0.85 },
    { name: "HDFC Bank", symbol: "HDFCBANK", price: 1680.20, change: -0.45 },
    { name: "Infosys", symbol: "INFY", price: 1520.60, change: 1.70 },
    { name: "ICICI Bank", symbol: "ICICIBANK", price: 1285.30, change: -0.60 },
    { name: "Tata Motors", symbol: "TATAMOTORS", price: 720.45, change: 2.10 },
    { name: "ITC Limited", symbol: "ITC", price: 410.80, change: 0.55 }
];

// Display stock data in the table
function displayStocks(stockList) {
    const table = document.getElementById("stockTable");
    table.innerHTML = "";

    if (stockList.length === 0) {
        table.innerHTML =
            '<tr><td colspan="4">No matching stocks found.</td></tr>';
        return;
    }

    stockList.forEach(stock => {
        const row = document.createElement("tr");
        const changeClass = stock.change >= 0 ? "green" : "red";
        const sign = stock.change >= 0 ? "+" : "";

        row.innerHTML = `
            <td>
                <span class="stock-name">${stock.name}</span>
                <span class="stock-symbol">${stock.symbol}</span>
            </td>
            <td>₹${stock.price.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}</td>
            <td class="${changeClass}">
                ${sign}${stock.change.toFixed(2)}%
            </td>
            <td>
                <button class="buy-btn"
                    onclick="tradeDemo('${stock.symbol}', 'BUY')">
                    Buy
                </button>
                <button class="sell-btn"
                    onclick="tradeDemo('${stock.symbol}', 'SELL')">
                    Sell
                </button>
            </td>
        `;

        table.appendChild(row);
    });
}

// Search stocks by company name or symbol
function searchStocks() {
    const query = document
        .getElementById("searchStock")
        .value.toLowerCase()
        .trim();

    const filteredStocks = stocks.filter(stock =>
        stock.name.toLowerCase().includes(query) ||
        stock.symbol.toLowerCase().includes(query)
    );

    displayStocks(filteredStocks);
}

// Demonstration only: no actual orders are placed
function tradeDemo(symbol, action) {
    const stock = stocks.find(item => item.symbol === symbol);

    if (!stock) return;

    alert(
        `${action} Demo\n\n` +
        `Company: ${stock.name}\n` +
        `Sample Price: ₹${stock.price.toFixed(2)}\n\n` +
        `This is a practice demonstration only. ` +
        `No real trade has been placed.`
    );
}

// Login demonstration
function showLogin() {
    alert(
        "Welcome to Vedika Enterprises!\n\n" +
        "This is a demo website. Login and account " +
        "authentication have not been implemented."
    );
}

// Sample chart data
const chartData = {
    "1D": {
        labels: ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM"],
        values: [100, 103, 101, 106, 104, 109, 112]
    },
    "1W": {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        values: [95, 99, 97, 104, 102, 108, 112]
    },
    "1M": {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        values: [85, 93, 102, 112]
    }
};

let stockChart;

// Create the chart
function createChart() {
    const canvas = document.getElementById("stockChart");

    stockChart = new Chart(canvas, {
        type: "line",
        data: {
            labels: chartData["1D"].labels,
            datasets: [{
                label: "Illustrative Price Index",
                data: chartData["1D"].values,
                borderColor: "#00d6a3",
                backgroundColor: "rgba(0, 214, 163, 0.12)",
                borderWidth: 3,
                fill: true,
                tension: 0.35,
                pointRadius: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: "#f4f7fb" }
                }
            },
            scales: {
                x: {
                    ticks: { color: "#aab8cb" },
                    grid: { color: "#24364c" }
                },
                y: {
                    ticks: { color: "#aab8cb" },
                    grid: { color: "#24364c" }
                }
            }
        }
    });
}

// Change chart period
function updateChart() {
    const period = document.getElementById("chartPeriod").value;
    const data = chartData[period];

    stockChart.data.labels = data.labels;
    stockChart.data.datasets[0].data = data.values;
    stockChart.update();
}

// Contact form demonstration
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();

    document.getElementById("formMessage").textContent =
        `Thank you, ${name}! This is a demo form. Connect a backend to receive messages.`;

    this.reset();
});

// Initialize website
displayStocks(stocks);
createChart();
