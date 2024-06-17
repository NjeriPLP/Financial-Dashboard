document.addEventListener('DOMContentLoaded', () => {
    const fetchDataBtn = document.getElementById('fetch-data-btn');
    const symbolInput = document.getElementById('symbol-input');
    const chartContainer = document.getElementById('chart-container');
  
    fetchDataBtn.addEventListener('click', () => {
      const symbol = symbolInput.value.toUpperCase();
      if (symbol) {
        fetchFinancialData(symbol);
      }
    });
  
    async function fetchFinancialData(symbol) {
      try {
        const response = await fetch(`http://localhost:3000/api/data/${symbol}`);
        const data = await response.json();
        renderCharts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    function renderCharts(data) {
      chartContainer.innerHTML = ''; // Clear existing charts
  
      const labels = data.map(entry => entry.date);
      const openPrices = data.map(entry => entry.open);
      const closePrices = data.map(entry => entry.close);
      const highPrices = data.map(entry => entry.high);
      const lowPrices = data.map(entry => entry.low);
      const volumes = data.map(entry => entry.volume);
  
      createChart('Open Prices', labels, openPrices);
      createChart('Close Prices', labels, closePrices);
      createChart('High Prices', labels, highPrices);
      createChart('Low Prices', labels, lowPrices);
      createChart('Volumes', labels, volumes, 'bar');
    }
  
    function createChart(title, labels, data, type = 'line') {
      const canvas = document.createElement('canvas');
      canvas.classList.add('chart');
      chartContainer.appendChild(canvas);
  
      new Chart(canvas, {
        type: type,
        data: {
          labels: labels,
          datasets: [{
            label: title,
            data: data,
            backgroundColor: 'rgba(0, 123, 255, 0.5)',
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }
  });