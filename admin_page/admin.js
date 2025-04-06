document.addEventListener("DOMContentLoaded", function() {
    // Simulated Data Fetch
    document.getElementById("total-books").innerText = "1500";
    document.getElementById("daily-sales").innerText = "$500";
    document.getElementById("monthly-sales").innerText = "$15,000";
    document.getElementById("yearly-sales").innerText = "$180,000";

    // Simulated Employee List
    const employees = ["John Doe - Sales Clerk", "Jane Smith - Manager", "Bob Johnson - Inventory Manager"];
    let employeeList = document.getElementById("employee-list");
    employees.forEach(emp => {
        let li = document.createElement("li");
        li.textContent = emp;
        employeeList.appendChild(li);
    });

    // Simulated Low Stock Books
    const lowStockBooks = [
        "Book A (5 copies left) - Publisher: XYZ",
        "Book B (3 copies left) - Publisher: ABC"
    ];
    let bookList = document.getElementById("low-stock-books");
    lowStockBooks.forEach(book => {
        let li = document.createElement("li");
        li.textContent = book;
        bookList.appendChild(li);
    });

    // Initialize Order Chart
    const orderCtx = document.getElementById('orderChart').getContext('2d');
    new Chart(orderCtx, {
        type: 'bar',
        data: {
            labels: ['2 Jan', '3 Jan', '4 Jan', '5 Jan', '6 Jan', '7 Jan', '8 Jan'],
            datasets: [{
                label: 'Orders',
                data: [500, 300, 400, 600, 700, 200, 300],
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
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

    // Initialize Sales Chart
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    new Chart(salesCtx, {
        type: 'line',
        data: {
            labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            datasets: [{
                label: 'Sales',
                data: [15000, 20000, 18000, 22000, 25000, 23000, 24000],
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
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
});

function accessDatabase() {
    alert("Database access granted. Loading data...");
}
function generateReport() {
    alert("Generating report. Please wait...");
    // Simulate report generation
    setTimeout(() => {
        alert("Report generated successfully!");
    }, 2000);
}

let salesChart;

// Function to initialize the sales chart
function initializeSalesChart() {
    const ctx = document.getElementById('salesChart').getContext('2d');
    salesChart = new Chart(ctx, {
        type: 'line', // Line chart
        data: {
            labels: [], // Dates will be added dynamically
            datasets: [{
                label: 'Sales',
                data: [], // Sales data will be added dynamically
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
                fill: true,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Date',
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Sales Amount',
                    },
                },
            },
        },
    });
}

// Function to update the sales report and graph
async function updateSalesReport() {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    if (!startDate || !endDate) {
        alert('Please select both start and end dates.');
        return;
    }

    try {
        // Fetch sales data from the server (replace with your API endpoint)
        const response = await fetch(`http://localhost:3000/sales-report?start=${startDate}&end=${endDate}`);
        const data = await response.json();

        // Update the sales summary
        document.getElementById('daily-sales').textContent = data.dailySales || '0';
        document.getElementById('monthly-sales').textContent = data.monthlySales || '0';
        document.getElementById('yearly-sales').textContent = data.yearlySales || '0';

        // Update the chart
        salesChart.data.labels = data.dates; // Dates for the x-axis
        salesChart.data.datasets[0].data = data.sales; // Sales data for the y-axis
        salesChart.update();
    } catch (error) {
        console.error('Error fetching sales data:', error);
        alert('Failed to fetch sales data. Please try again.');
    }
}

// Initialize the chart on page load
document.addEventListener('DOMContentLoaded', initializeSalesChart);

// Function to show the selected section
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
}

// Initialize Dashboard as the default section
document.addEventListener('DOMContentLoaded', () => {
    showSection('dashboard');
});

// Initialize Dashboard as the default section
document.addEventListener('DOMContentLoaded', () => {
    showSection('dashboard');

    // Initialize Total Profit and Total Sales Charts
    const profitCtx = document.getElementById('profitChart').getContext('2d');
    new Chart(profitCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Total Profit',
                data: [5000, 7000, 8000, 6000, 9000, 10000],
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

    const salesCtx = document.getElementById('salesChart').getContext('2d');
    new Chart(salesCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Total Sales',
                data: [10000, 15000, 20000, 18000, 22000, 25000],
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
});