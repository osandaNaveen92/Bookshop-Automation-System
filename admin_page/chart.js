<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

async function fetchChartData(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching chart data:', error);
        return null;
    }
}

// Function to initialize the Total Profit Chart
async function initializeProfitChart() {
    const data = await fetchChartData('http://localhost:3000/profit-data'); // Replace with your API endpoint
    const profitCtx = document.getElementById('profitChart').getContext('2d');
    new Chart(profitCtx, {
        type: 'line',
        data: {
            labels: data.labels, // Dynamic labels
            datasets: [{
                label: 'Total Profit',
                data: data.values, // Dynamic data
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Function to initialize the Total Sales Chart
function initializeSalesChart() {
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    new Chart(salesCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Total Sales',
                data: [10000, 15000, 20000, 18000, 22000, 25000], // Replace with dynamic data
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Initialize all charts on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeProfitChart();
    initializeSalesChart();
});